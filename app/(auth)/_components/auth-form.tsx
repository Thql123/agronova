"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type FieldName = "fullName" | "email" | "farmName" | "password" | "confirmPassword";
type Errors = Partial<Record<FieldName | "terms", string>>;

function AuthInput({ name, label, placeholder, autoComplete, password = false, hint, error }: {
  name: FieldName; label: string; placeholder: string; autoComplete: string;
  password?: boolean; hint?: string; error?: string;
}) {
  const [visible, setVisible] = useState(false);
  const description = [hint ? `${name}-hint` : "", error ? `${name}-error` : ""].filter(Boolean).join(" ");
  return <div>
    <label htmlFor={name} className="mb-1.5 block text-xs min-[90rem]:text-sm text-black">{label}</label>
    <div className="relative">
      <input id={name} name={name} required type={password ? (visible ? "text" : "password") : name === "email" ? "email" : "text"} autoComplete={autoComplete} placeholder={placeholder} aria-invalid={!!error} aria-describedby={description || undefined} className={`h-12 w-full min-w-0 rounded-lg border bg-white px-3.5 text-base md:text-sm min-[90rem]:h-[52px] min-[90rem]:text-base text-black placeholder:text-[#888888] focus:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-black ${password ? "pr-12" : ""} ${error ? "border-red-700" : "border-[#d3d3d3]"}`} />
      {password && <button type="button" aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={visible} onClick={() => setVisible(!visible)} className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded text-[#606060] focus-visible:outline-2 focus-visible:outline-offset-[-2px]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{visible && <path d="m3 3 18 18" />}</svg>
      </button>}
    </div>
    {hint && <p id={`${name}-hint`} className="mt-2 text-xs leading-5 text-[#606060]">{hint}</p>}
    {error && <p id={`${name}-error`} className="mt-1 text-xs leading-5 text-red-700">{error}</p>}
  </div>;
}

export function AuthForm({ mode }: { mode: "login" | "sign-up" }) {
  const isSignUp = mode === "sign-up";
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: FieldName) => String(data.get(name) ?? "");
    const next: Errors = {};
    if (!value("email").trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email").trim())) next.email = "Enter a valid email address.";
    if (!value("password")) next.password = "Enter your password.";
    if (isSignUp) {
      if (!value("fullName").trim()) next.fullName = "Enter your full name.";
      if (!value("farmName").trim()) next.farmName = "Enter your farm or business name.";
      if (value("password") && (value("password").length < 8 || !/\d/.test(value("password")))) next.password = "Use at least 8 characters, including a number.";
      if (!value("confirmPassword")) next.confirmPassword = "Confirm your password.";
      else if (value("password") !== value("confirmPassword")) next.confirmPassword = "Passwords must match.";
      if (!data.has("terms")) next.terms = "Agree to the Terms of Service to continue.";
    }
    setErrors(next);
    setNotice("");
    setAuthError("");
    const firstError = Object.keys(next)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    inFlight.current = true;
    setSubmitting(true);
    try {
      const supabase = createClient();
      const credentials = { email: value("email").trim(), password: value("password") };
      const result = isSignUp
        ? await supabase.auth.signUp({ ...credentials, options: {
          data: { full_name: value("fullName").trim(), farm_name: value("farmName").trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        } })
        : await supabase.auth.signInWithPassword(credentials);
      if (result.error) {
        const code = result.error.code;
        setAuthError(code === "invalid_credentials" ? "Your email or password is incorrect."
          : code === "email_not_confirmed" ? "Please confirm your email before logging in. Check your inbox."
          : result.error.message);
        return;
      }
      if (result.data.session) {
        router.replace("/farms");
        router.refresh();
      } else if (isSignUp) {
        setNotice("Check your email for a confirmation link before logging in. If this address is already registered, try logging in instead.");
      } else {
        setAuthError("No session was returned. Please try logging in again.");
      }
    } catch {
      setAuthError("Unable to reach authentication. Check your connection and try again.");
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return <form noValidate onSubmit={submit} onChange={(event) => {
    if (event.target instanceof HTMLInputElement) {
      const field = event.target.name;
      if (field) setErrors((current) => ({ ...current, [field]: undefined }));
    }
    setNotice("");
    setAuthError("");
  }}>
    <div className="space-y-4 min-[90rem]:space-y-5">
      {isSignUp && <AuthInput name="fullName" label="Full name" placeholder="Enter your full name" autoComplete="name" error={errors.fullName} />}
      <AuthInput name="email" label="Email address" placeholder="you@example.com" autoComplete="email" error={errors.email} />
      {isSignUp && <AuthInput name="farmName" label="Farm or business name" placeholder="Enter your farm or business name" autoComplete="organization" error={errors.farmName} />}
      <AuthInput name="password" label="Password" placeholder={isSignUp ? "Create a password" : "Enter your password"} autoComplete={isSignUp ? "new-password" : "current-password"} password hint={isSignUp ? "Use at least 8 characters, including a number." : undefined} error={errors.password} />
      {isSignUp && <AuthInput name="confirmPassword" label="Confirm password" placeholder="Re-enter your password" autoComplete="new-password" password error={errors.confirmPassword} />}
    </div>
    {isSignUp ? <div className="mt-5">
      <label className="flex items-start gap-2 text-xs leading-5 min-[90rem]:text-sm text-[#606060]"><input type="checkbox" name="terms" required aria-invalid={!!errors.terms} aria-describedby={errors.terms ? "terms-error" : undefined} className="mt-0.5 size-4 shrink-0 accent-black" /><span>I agree to Agriflow’s <span className="text-black underline" title="Terms of Service are not available yet">Terms of Service</span> and <span className="text-black underline" title="Privacy Policy is not available yet">Privacy Policy</span>.</span></label>
      {errors.terms && <p id="terms-error" className="mt-1 text-xs text-red-700">{errors.terms}</p>}
    </div> : <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs min-[90rem]:text-sm">
      <label title="Session persistence options are coming later; sessions currently persist by default" className="flex items-center gap-1.5 text-[#606060]"><input type="checkbox" name="remember" disabled aria-label="Remember me (coming soon; sessions persist by default)" className="size-4 accent-black" />Remember me (coming soon)</label>
      <button type="button" disabled title="Password reset is not available yet" className="text-black">Forgot password?</button>
    </div>}
    <button type="submit" disabled={submitting} aria-busy={submitting} className="mt-6 flex h-12 w-full min-[90rem]:h-[52px] items-center justify-center gap-2 rounded-lg bg-black text-sm font-medium min-[90rem]:text-base text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">{submitting ? (isSignUp ? "Creating account…" : "Logging in…") : isSignUp ? "Create account" : "Log in"}<span aria-hidden="true">→</span></button>
    {authError && <p role="alert" className="mt-3 text-xs leading-5 text-red-700">{authError}</p>}
    <p role="status" className="mt-1 text-xs leading-5 text-[#606060]">{notice}</p>
  </form>;
}
