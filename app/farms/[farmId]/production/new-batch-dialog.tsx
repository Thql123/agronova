"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ButtonSpinner } from "@/app/_components/loading";
import { healthStatuses, validateBatch, type BatchErrors } from "@/lib/batch-types";
import { createBatch, reserveBatchCode } from "./actions";

export function NewBatchDialog({ farmId }: { farmId: string }) {
  const dialog = useRef<HTMLDialogElement>(null), form = useRef<HTMLFormElement>(null), trigger = useRef<HTMLButtonElement>(null), busy = useRef(false);
  const [pending, setPending] = useState(false), [errors, setErrors] = useState<BatchErrors>({}), [message, setMessage] = useState("");
  const [reservation, setReservation] = useState<{ batchCode: string; expiresAt: string } | null>(null);
  const [reserving, setReserving] = useState(false), [reservationError, setReservationError] = useState("");
  const generation = useRef(0), reservingRef = useRef(false);
  const router = useRouter();
  useEffect(() => () => { generation.current++; }, []);
  useEffect(() => {
    if (!reservation) return;
    const timer = window.setTimeout(() => {
      setReservation(null); setReservationError("This reservation has expired. Reserve a new ID to continue.");
    }, Math.max(0, Date.parse(reservation.expiresAt) - Date.now()));
    return () => window.clearTimeout(timer);
  }, [reservation]);
  async function reserve() {
    if (reservingRef.current || busy.current) return;
    const request = ++generation.current;
    reservingRef.current = true; setReserving(true); setReservation(null); setReservationError("");
    try {
      const result = await reserveBatchCode(farmId);
      if (request !== generation.current || !dialog.current?.open) return;
      if (result.success) setReservation({ batchCode: result.batchCode, expiresAt: result.expiresAt });
      else setReservationError(result.message);
    } catch {
      if (request === generation.current && dialog.current?.open) setReservationError("Unable to reserve a batch ID. Please retry.");
    } finally {
      if (request === generation.current) { reservingRef.current = false; setReserving(false); }
    }
  }
  function closed() {
    generation.current++; reservingRef.current = false; setReserving(false); setReservation(null); setReservationError(""); trigger.current?.focus();
  }
  const dismiss = () => { if (!busy.current) dialog.current?.close(); };
  const focusError = (errors: BatchErrors) => form.current?.querySelector<HTMLElement>(`[name="${Object.keys(errors)[0]}"]`)?.focus();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || reservingRef.current) return;
    if (!reservation || Date.parse(reservation.expiresAt) <= Date.now()) {
      setReservation(null); setReservationError("Reserve a valid batch ID before creating the batch."); return;
    }
    const data = new FormData(event.currentTarget), validation = validateBatch(data);
    data.set("batch_code", reservation.batchCode);
    setErrors(validation.errors); setMessage("");
    if (Object.keys(validation.errors).length) { focusError(validation.errors); return; }
    busy.current = true; setPending(true);
    try {
      const result = await createBatch(farmId, data);
      if (result.success) { dialog.current?.close(); form.current?.reset(); router.refresh(); }
      else { setErrors(result.errors ?? {}); setMessage(result.message ?? "Check the highlighted fields."); requestAnimationFrame(() => focusError(result.errors ?? {})); }
    } catch { setMessage("Unable to create the batch. Check your connection and try again."); }
    finally { busy.current = false; setPending(false); }
  }
  const input = "mt-1 h-[36px] w-full min-w-0 rounded-md border border-[#d3d3d3] bg-white px-2.5 text-xs focus-visible:outline-2 focus-visible:outline-black";
  const attrs = (field: keyof BatchErrors) => ({ "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `batch-${field}-error` : undefined });
  const error = (field: keyof BatchErrors) => errors[field] && <p id={`batch-${field}-error`} className="mt-1 text-xs text-red-700">{errors[field]}</p>;
  return <>
    <button ref={trigger} type="button" aria-haspopup="dialog" aria-controls="new-batch-dialog" onClick={() => { form.current?.reset(); setErrors({}); setMessage(""); dialog.current?.showModal(); void reserve(); form.current?.querySelector<HTMLInputElement>('[name="breed"]')?.focus(); }} className="flex h-8 w-fit shrink-0 items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2">+ New Batch</button>
    <dialog ref={dialog} id="new-batch-dialog" aria-labelledby="new-batch-title" aria-describedby="new-batch-description" onClose={closed} onCancel={event => { if (busy.current) event.preventDefault(); }} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dismiss();
    }} className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[480px] overflow-y-auto rounded-xl border border-[#dedede] bg-white p-0 font-sans text-[#292929] shadow-xl backdrop:bg-black/40 [color-scheme:light]">
      <div className="relative px-6 pt-5"><h2 id="new-batch-title" className="pr-8 text-xl font-semibold">New Batch</h2><p id="new-batch-description" className="mt-1 text-xs text-[#606060]">Register a livestock batch to start tracking production.</p><button type="button" disabled={pending} onClick={dismiss} aria-label="Close New Batch" className="absolute top-4 right-4 flex size-8 items-center justify-center rounded text-[#606060] focus-visible:outline-2">×</button></div>
      <form ref={form} noValidate onSubmit={submit} aria-busy={pending}>
        <fieldset disabled={pending} className="min-w-0 space-y-4 px-6 py-5">
          <div><label htmlFor="batch-code" className="text-xs font-medium">Batch ID</label><div className="relative"><input id="batch-code" readOnly value={reservation?.batchCode ?? (reserving ? "Reserving batch ID..." : "Batch ID unavailable")} aria-busy={reserving} aria-describedby="batch-code-hint batch-reservation-status" className={`${input} bg-[#f7f7f7] pr-9 text-[#606060]`} />{reserving && <span aria-hidden="true" className="absolute inset-y-0 right-3 flex items-center"><ButtonSpinner /></span>}</div><div id="batch-reservation-status" role="status" className="text-xs"><span className="sr-only">{reserving ? "Reserving batch ID" : reservation ? `Reserved batch ID ${reservation.batchCode}` : ""}</span>{reservationError && <p className="mt-1 text-red-700">{reservationError}</p>}{!reserving && !pending && <button type="button" onClick={() => void reserve()} className="mt-1 underline focus-visible:outline-2">{reservation ? "Reserve a new ID" : "Retry reservation"}</button>}</div><p id="batch-code-hint" className="mt-1.5 text-[11px] text-[#606060]">Generated automatically. Each batch has a unique ID.</p></div>
          <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">
            <div><label htmlFor="batch-species" className="text-xs font-medium">Species</label><select id="batch-species" name="species" required {...attrs("species")} className={input}><option>Poultry</option></select>{error("species")}</div>
            <div><label htmlFor="batch-breed" className="text-xs font-medium">Breed *</label><input id="batch-breed" name="breed" required maxLength={200} placeholder="Enter breed" {...attrs("breed")} className={input} />{error("breed")}</div>
            {([{ name: "initial_count", label: "Count", unit: "animals", min: 1, step: "1", max: 2147483647 }, { name: "initial_age_weeks", label: "Age", unit: "weeks", min: 0, step: "0.01", max: 999999.99 }, { name: "initial_average_weight_kg", label: "Average weight", unit: "kg", min: 0, step: "0.001", max: 9999999.999 }] as const).map(field => <div key={field.name}><label htmlFor={`batch-${field.name}`} className="text-xs font-medium">{field.label} *</label><div className="relative"><input id={`batch-${field.name}`} name={field.name} type="number" required min={field.min} max={field.max} step={field.step} {...attrs(field.name)} className={`${input} pr-16`} /><span aria-hidden="true" className="pointer-events-none absolute top-1 right-2.5 flex h-[36px] items-center text-[11px] text-[#606060]">{field.unit}</span></div>{error(field.name)}</div>)}
            <div><label htmlFor="batch-health" className="text-xs font-medium">Status</label><select id="batch-health" name="health_status" required defaultValue="Healthy" {...attrs("health_status")} className={input}>{healthStatuses.map(status => <option key={status}>{status}</option>)}</select>{error("health_status")}</div>
          </div>
          {message && <p role="alert" className="text-xs text-red-700">{message}</p>}
        </fieldset>
        <footer className="flex flex-wrap justify-end gap-2 border-t border-[#dedede] bg-[#f7f7f7] px-6 py-4"><button type="button" disabled={pending} onClick={dismiss} className="rounded-lg border border-[#d3d3d3] bg-white px-4 py-2.5 text-xs focus-visible:outline-2">Cancel</button><button type="submit" disabled={pending || reserving || !reservation} aria-busy={pending} className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-xs font-medium text-white disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2">{pending && <ButtonSpinner />}{pending ? "Creating batch..." : "Create Batch"}</button></footer>
      </form>
    </dialog>
  </>;
}
