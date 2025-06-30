'use client';

import { Calendar, GitCommitHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { getTimelines } from '@/lib/data';

type Timeline = Awaited<ReturnType<typeof getTimelines>>[number];

export function TimelineCard({ timeline }: { timeline: Timeline }) {
  return (
    <div
      key={timeline.id}
      className="border p-4 rounded-lg w-full flex justify-between items-center"
    >
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{timeline.title}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(timeline.startDate).toLocaleDateString()} -{' '}
              {timeline.endDate
                ? new Date(timeline.endDate).toLocaleDateString()
                : 'Present'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <GitCommitHorizontal className="w-4 h-4" />
            <span>{timeline._count.events} events</span>
          </div>
        </div>
      </div>
      <Button asChild>
        <Link href={`/timelines/${timeline.id}`}>View</Link>
      </Button>
    </div>
  );
}
