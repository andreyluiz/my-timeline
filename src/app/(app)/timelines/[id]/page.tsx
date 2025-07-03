import { notFound } from "next/navigation";
import { getTimeline } from "@/lib/data";
import { PixiTimeline } from "./timeline"; // Assuming this will be a React component

interface TimelinePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const timeline = await getTimeline((await params).id);

  if (!timeline) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="absolute top-0 left-0 w-full h-full z-20 p-8 pointer-events-none">
        <h1 className="text-4xl font-bold mb-8">{timeline.title}</h1>
      </div>
      <div className="absolute inset-0 z-10">
        <PixiTimeline timeline={timeline} />
      </div>
    </div>
  );
}
