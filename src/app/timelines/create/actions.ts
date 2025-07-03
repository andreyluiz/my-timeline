"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import type { CreateTimelineSchema } from "@/lib/schemas";
import { getUser } from "@/lib/supabase/server";

export async function createTimeline(data: CreateTimelineSchema) {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  const timeline = await prisma.timeline.create({
    data: {
      title: data.title,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      ownerId: user.id,
    },
  });

  revalidatePath("/timelines");
  redirect(`/timelines/${timeline.id}`);
}
