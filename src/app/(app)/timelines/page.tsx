import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getTimelines } from "@/lib/data";
import { TimelineCard } from "./timeline-card";

export default async function TimelinesPage() {
  const timelines = await getTimelines();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">My Timelines</h1>
        </div>
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
        <div className="flex flex-col gap-4">
          {timelines.map((timeline) => (
            <TimelineCard key={timeline.id} timeline={timeline} />
          ))}
        </div>
      )}
    </div>
  );
}
