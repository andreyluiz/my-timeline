"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { CreateEventSchema } from "@/lib/schemas";

export async function createEvent(
  timelineId: string,
  data: CreateEventSchema,
) {
  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      importance: data.importance,
      timelineId,
    },
  });

  revalidatePath(`/timelines/${timelineId}`);

  return event;
}