"use server";

import { revalidatePath } from "next/cache";
import type { SignupSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function signup(data: SignupSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/signin");
  return true;
}
