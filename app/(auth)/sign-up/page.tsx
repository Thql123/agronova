import type { Metadata } from "next";
import { AuthScreen } from "../_components/auth-screen";

export const metadata: Metadata = { title: "Sign up | Agriflow" };

export default function SignUpPage() {
  return <AuthScreen mode="sign-up" />;
}
