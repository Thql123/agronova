import Link from "next/link";

export default function AuthErrorPage() {
  return <main className="min-h-dvh bg-white p-6 font-sans text-black [color-scheme:light] sm:p-10">
    <h1 className="text-2xl font-semibold">Unable to confirm your email</h1>
    <p className="mt-3 max-w-lg text-sm text-[#606060]">This link may be invalid, expired, or already used. For a standard confirmation link, open it in the browser where you signed up. Try logging in if your email is already confirmed.</p>
    <Link href="/login" className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-sm text-white">Return to login</Link>
  </main>;
}
