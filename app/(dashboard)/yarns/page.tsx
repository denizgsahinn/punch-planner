import { supabase } from "@/lib/supabase";
import { Yarn } from "@/lib/types";
import YarnsClient from "./YarnsClient";

export default async function YarnsPage() {
  const { data: yarns } = await supabase
    .from("yarns")
    .select("*")
    .order("brand", { ascending: true });

  return <YarnsClient initialYarns={(yarns as Yarn[]) ?? []} />;
}