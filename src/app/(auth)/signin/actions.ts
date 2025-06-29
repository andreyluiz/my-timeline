"use server";

import { revalidatePath } from "next/cache";
import type { SigninSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function signin(data: SigninSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  return true;
}
