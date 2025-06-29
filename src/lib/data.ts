import prisma from "./prisma";
import { getUser } from "./supabase/server";

export async function getTimelines() {
  const user = await getUser();

  if (!user) {
    return [];
  }

  return prisma.timeline.findMany({
    where: {
      ownerId: user.id,
    },
  });
}
