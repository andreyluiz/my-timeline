'use client';

import { Calendar, GitCommitHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { getTimelines } from "@/lib/data";

type Timeline = Awaited<ReturnType<typeof getTimelines>>[number];

export function TimelineCard({ timeline }: { timeline: Timeline }) {
  return (
    <Card key={timeline.id}>
      <CardHeader>
        <CardTitle>{timeline.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(timeline.startDate).toLocaleDateString()} -{" "}
              {timeline.endDate
                ? new Date(timeline.endDate).toLocaleDateString()
                : "Present"}
            </span>
          </div>
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link href={`/timelines/${timeline.id}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <GitCommitHorizontal className="w-4 h-4" />
          <span>{timeline._count.events} events</span>
        </div>
      </CardContent>
    </Card>
  );
}
