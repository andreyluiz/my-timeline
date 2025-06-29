import { Button } from "@/components/ui/button";
import { getTimelines } from "@/lib/data";
import { getUser } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  const timelines = await getTimelines();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Timelines</h1>
        <Button asChild>
          <Link href="/timelines/create">Create Timeline</Link>
        </Button>
      </div>
      {timelines.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-xl font-semibold">No timelines yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating a new timeline.
          </p>
          <Button asChild className="mt-4">
            <Link href="/timelines/create">Create Timeline</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {timelines.map((timeline) => (
            <div key={timeline.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{timeline.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(timeline.startDate).toLocaleDateString()} -{" "}
                {timeline.endDate
                  ? new Date(timeline.endDate).toLocaleDateString()
                  : "Present"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
