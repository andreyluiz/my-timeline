"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { CreateTimelineSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function createTimeline(values: CreateTimelineSchema) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a timeline.");
  }

  await prisma.timeline.create({
    data: {
      ...values,
      ownerId: user.id,
    },
  });

  revalidatePath("/timelines");
}
