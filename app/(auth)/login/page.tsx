import type { Metadata } from "next";
import { AuthScreen } from "../_components/auth-screen";

export const metadata: Metadata = { title: "Log in | Agriflow" };

export default function LoginPage() {
  return <AuthScreen mode="login" />;
}
