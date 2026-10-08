import Loading from "./loading";
import { Suspense } from "react";
import { requireUser } from "@/lib/supabase/require-user";
import { getFarms } from "@/lib/farms";
import { PortfolioShell } from "./_components/portfolio-shell";
import { FarmPortfolio } from "./_components/farm-portfolio";
import { connection } from "next/server";

async function Welcome() {
  await connection();
  const user = await requireUser();
  const farms = await getFarms();
  const userName = typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : user.email ?? "Your account";
  return <PortfolioShell farms={farms} userName={userName} active="farms"><FarmPortfolio farms={farms} /></PortfolioShell>;
}

export default function FarmsPage() {
  return <Suspense fallback={<Loading />}><Welcome /></Suspense>;
}
