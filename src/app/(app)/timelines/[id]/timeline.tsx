"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import type { Event, Timeline } from "@/generated/prisma";
import { TimelineGame } from "./pixi-timeline";

interface PixiTimelineProps {
  timeline: Timeline & { events: Event[] };
}

export const PixiTimeline: React.FC<PixiTimelineProps> = ({ timeline }) => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<TimelineGame | null>(null);

  useEffect(() => {
    if (pixiContainerRef.current) {
      gameRef.current = new TimelineGame(pixiContainerRef.current, timeline);
      gameRef.current.init();
    }

    return () => {
      gameRef.current?.destroy();
    };
  }, [timeline]);

  return <div ref={pixiContainerRef} className="w-full h-full" />;
};
