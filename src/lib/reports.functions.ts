import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

function getClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
}

export const listReports = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getClient();
  const { data, error } = await sb.from("reports").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});
