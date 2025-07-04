
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getTimelines } from "@/lib/data";
import { CreateTimelineDialog } from "./create-timeline-dialog";
import { TimelineCard } from "./timeline-card";

export default async function TimelinesPage() {
  const timelines = await getTimelines();

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">My Timelines</h1>
        </div>
        <CreateTimelineDialog />
      </div>
      {timelines.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-xl font-semibold">No timelines yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating a new timeline.
          </p>
          <div className="mt-4">
            <CreateTimelineDialog />
          </div>
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

