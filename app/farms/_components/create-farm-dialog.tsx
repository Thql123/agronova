"use client";
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ButtonSpinner } from "@/app/_components/loading";
import { nigerianStates, validateFarmInput, type FarmInputErrors } from "@/lib/farm-input";
import { farmTypes } from "@/lib/farm-types";
import { createFarm } from "../actions";

export function CreateFarmDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const busy = useRef(false);
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FarmInputErrors>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const data = new FormData(event.currentTarget);
    const validation = validateFarmInput(data);
    setErrors(validation.errors); setMessage("");
    if (Object.keys(validation.errors).length) {
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(validation.errors)[0]}"]`)?.focus();
      return;
    }
    busy.current = true;
    setPending(true); setMessage(""); setErrors({});
    try {
      const result = await createFarm(data);
      if (result.success) {
        dialog.current?.close(); form.current?.reset(); router.refresh();
      } else {
        setMessage(result.message ?? "Check the highlighted fields."); setErrors(result.errors ?? {});
        const field = Object.keys(result.errors ?? {})[0];
        if (field) requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus());
      }
    } catch { setMessage("Unable to create your farm. Please try again."); }
    finally { busy.current = false; setPending(false); }
  }
  const inputClass = "mt-1.5 h-[38px] w-full min-w-0 rounded-lg border border-[#d3d3d3] bg-white px-2.5 text-sm focus:outline-none focus-visible:border-black focus-visible:inset-ring-1 focus-visible:inset-ring-black";
  const error = (field: keyof FarmInputErrors) => errors[field] && <p id={`farm-${field}-error`} className="mt-1 text-xs text-red-700">{errors[field]}</p>;
  const accessibility = (field: keyof FarmInputErrors) => ({ "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `farm-${field}-error` : undefined });
  const dismiss = () => { if (!busy.current) dialog.current?.close(); };
  return <>
    <button ref={trigger} type="button" aria-haspopup="dialog" aria-controls="create-farm-dialog" onClick={() => { setErrors({}); setMessage(""); form.current?.reset(); dialog.current?.showModal(); form.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus(); }} className="flex h-10 w-fit shrink-0 items-center gap-2 rounded-lg bg-black px-4 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2">+ <span>Add farm</span></button>
    <dialog ref={dialog} id="create-farm-dialog" aria-labelledby="create-farm-title" aria-describedby="create-farm-description"
      onCancel={(event) => { if (busy.current) event.preventDefault(); }}
      onClose={() => trigger.current?.focus()}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dismiss();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[470px] overflow-y-auto rounded-[20px] border border-[#dedede] bg-white p-0 font-sans text-[#292929] shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-[3px] [color-scheme:light]">
      <div className="relative px-6 pt-6">
        <h2 id="create-farm-title" className="pr-8 text-xl font-semibold">Add Farm</h2>
        <p id="create-farm-description" className="mt-1.5 text-xs text-[#606060]">Enter the details of your new farm.</p>
        <button type="button" disabled={pending} onClick={dismiss} aria-label="Close Add Farm" className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-lg text-[#606060] focus-visible:outline-2"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
      </div>
      <form noValidate aria-busy={pending} ref={form} onSubmit={submit}>
        <div className="px-6 pt-6 pb-6">
          <fieldset disabled={pending} className="min-w-0 space-y-4">
            <div><label htmlFor="farm-name" className="text-xs font-medium">Farm name *</label><input id="farm-name" name="name" required maxLength={200} autoComplete="organization" placeholder="Enter farm name" {...accessibility("name")} className={inputClass} />{error("name")}</div>
            <div><label htmlFor="farm-type" className="text-xs font-medium">Farm type *</label><select id="farm-type" name="farm_type" required defaultValue="" {...accessibility("farm_type")} className={inputClass}><option value="" disabled>Select farm type</option>{farmTypes.map(type => <option key={type}>{type}</option>)}</select>{error("farm_type")}</div>
            <div className="grid min-w-0 grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              <div className="min-w-0"><label htmlFor="farm-state" className="text-xs font-medium">State *</label><select id="farm-state" name="state" required defaultValue="" autoComplete="address-level1" {...accessibility("state")} className={inputClass}><option value="" disabled>Select state</option>{nigerianStates.map(state => <option key={state}>{state}</option>)}</select>{error("state")}</div>
              <div className="min-w-0"><label htmlFor="farm-city" className="text-xs font-medium">City / town *</label><input id="farm-city" name="city" required maxLength={250} autoComplete="address-level2" placeholder="Enter city or town" {...accessibility("city")} className={inputClass} />{error("city")}</div>
            </div>
          </fieldset>
          <p className="mt-6 rounded-lg bg-[#f7f7f7] px-3 py-3 text-xs leading-5 text-[#606060]">You can add livestock and financial records after creating your farm.</p>
          {message && <p role="alert" className="mt-4 text-sm text-red-700">{message}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dedede] bg-[#f7f7f7] px-6 py-[18px]">
          <p className="text-[11px] text-[#606060]">* Required fields</p>
          <div className="flex flex-wrap gap-2"><button type="button" disabled={pending} onClick={dismiss} className="rounded-lg border border-[#d3d3d3] bg-white px-4 py-2.5 text-xs font-medium focus-visible:outline-2">Cancel</button><button type="submit" disabled={pending} aria-busy={pending} className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-xs font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2">{pending && <ButtonSpinner />}{pending ? "Adding farm..." : "Add Farm"}</button></div>
        </div>
      </form>
    </dialog>
  </>;
}
