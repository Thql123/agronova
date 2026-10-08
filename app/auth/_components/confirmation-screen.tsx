import { ReturnToLogin } from "./return-to-login";
import "./confirmation.css";

export function ConfirmationScreen({ success }: { success: boolean }) {
  return <main className="flex min-h-dvh items-center justify-center bg-[#f4f4f4] px-5 py-10 font-sans text-[#292929] [color-scheme:light]">
    <section className="w-full max-w-md rounded-3xl border border-[#dedede] bg-white p-7 text-center sm:p-9">
      <div aria-hidden="true" className={`mx-auto flex size-20 items-center justify-center rounded-full ${success ? "bg-[#ecfcf5] text-[#008017]" : "bg-[#fff2f4] text-[#b20e13]"}`}>
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{success ? <path className="confirmation-check" pathLength="1" d="m10 25 9 9 20-22" /> : <><circle cx="24" cy="24" r="18" /><path d="M24 14v12m0 7h.01" /></>}</svg>
      </div>
      <h1 className="mt-6 text-2xl font-semibold">{success ? "Email Verified Successfully!" : "Unable to Confirm Your Email"}</h1>
      <p className="mt-3 text-sm leading-6 text-[#606060]">{success ? "Your email address has been confirmed. You can now log in to your Agriflow account." : "We couldn’t complete this confirmation link. It may have already been used, or the verification request could not be completed."}</p>
      {!success && <p className="mt-3 text-xs leading-5 text-[#606060]">Your email may already be verified. Return to Login and try signing in. Open a fresh confirmation link in the browser where you signed up; if confirmation is still required, request a new email through your administrator or support contact.</p>}
      <ReturnToLogin />
    </section>
  </main>;
}
