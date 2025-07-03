import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getUser } from "./supabase/server";

export async function getTimelines() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  return prisma.timeline.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      _count: {
        select: { events: true },
      },
    },
  });
}

export async function getTimeline(id: string) {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  return prisma.timeline.findUnique({
    where: {
      id,
      ownerId: user.id,
    },
    include: {
      events: true,
    },
  });
}