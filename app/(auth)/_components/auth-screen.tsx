import Link from "next/link";
import { AuthForm } from "./auth-form";

export function AuthScreen({ mode }: { mode: "login" | "sign-up" }) {
  const isSignUp = mode === "sign-up";
  return <>
    <nav aria-label="Authentication navigation" className="flex flex-wrap justify-end gap-1.5 text-xs text-[#606060] min-[90rem]:text-sm">
      <span>{isSignUp ? "Already have an account?" : "New to Agriflow?"}</span>
      <Link href={isSignUp ? "/login" : "/sign-up"} className="rounded-sm font-semibold text-black focus-visible:outline-2 focus-visible:outline-offset-2">{isSignUp ? "Log in" : "Create an account"}<span aria-hidden="true" className="ml-2">↗</span></Link>
    </nav>
    <main data-auth-mode={mode} className="flex flex-1 items-center justify-center py-10 md:py-8 min-[90rem]:py-10">
      <div className="w-full min-w-0 max-w-[400px] lg:max-w-[420px] min-[90rem]:max-w-[480px]">
        <p className="mb-2 text-[10px] tracking-[0.12em] uppercase min-[90rem]:text-xs">{isSignUp ? "Get started with Agriflow" : "Welcome to Agriflow"}</p>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight lg:text-[30px] min-[90rem]:text-[36px]">{isSignUp ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-3 mb-6 text-sm leading-6 text-[#606060] min-[90rem]:mb-7 min-[90rem]:text-base">{isSignUp ? <>Bring your farms into one workspace.<br />Start with your details below.</> : "Log in to see how your farms are doing."}</p>
        <AuthForm mode={mode} />
        <p className="mt-7 text-center text-xs text-[#606060] min-[90rem]:mt-8 min-[90rem]:text-sm">{isSignUp ? "Already have an account?" : "Don’t have an account?"} <Link href={isSignUp ? "/login" : "/sign-up"} className="rounded-sm font-semibold text-black underline focus-visible:outline-2 focus-visible:outline-offset-2">{isSignUp ? "Log in" : "Sign up"}</Link></p>
        {!isSignUp && <p className="mt-7 flex items-center justify-center gap-1.5 text-xs text-[#888888]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4M12 14v3" /></svg>A secure home for your farm data.</p>}
      </div>
    </main>
  </>;
}
