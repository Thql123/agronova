"use client";
import { useActionState } from "react";
import { ButtonSpinner } from "@/app/_components/loading";
import { returnToLogin } from "../actions";

export function ReturnToLogin() {
  const [state, action, pending] = useActionState(returnToLogin, undefined);
  return <form action={action} className="mt-6">
    <button type="submit" disabled={pending} aria-busy={pending} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2">{pending && <ButtonSpinner />}{pending ? "Returning to Login..." : "Return to Login"}</button>
    {state?.error && <p role="alert" className="mt-3 text-sm text-red-700">{state.error}</p>}
  </form>;
}
