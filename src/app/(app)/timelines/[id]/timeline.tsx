"use client";

import { useEffect, useRef, useState } from "react";
import type { Event, Timeline } from "@/generated/prisma";
import { AddEventDialog } from "./add-event-dialog";
import { TimelineGame } from "./pixi-timeline";

interface PixiTimelineProps {
  timeline: Timeline & { events: Event[] };
}

interface TooltipData {
  event: Event;
  x: number;
  y: number;
}

export const PixiTimeline: React.FC<PixiTimelineProps> = ({ timeline }) => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<TimelineGame | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  useEffect(() => {
    if (pixiContainerRef.current) {
      const game = new TimelineGame(pixiContainerRef.current, timeline);
      game.onEventHover = (event, x, y, pixelsPerDay) => {
        if (event && pixelsPerDay <= 2) {
          setTooltip({ event, x, y });
        } else {
          setTooltip(null);
        }
      };
      game.init();
      gameRef.current = game;
    }

    return () => {
      gameRef.current?.destroy();
    };
  }, [timeline]);

  return (
    <div className="w-full h-full relative">
      <div ref={pixiContainerRef} className="w-full h-full" />
      {tooltip && (
        <div
          className="absolute bg-gray-800 text-white p-2 rounded shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <h3 className="font-bold">{tooltip.event.title}</h3>
          <p>{tooltip.event.description}</p>
        </div>
      )}
      <div className="absolute top-0 right-0 p-8">
        <AddEventDialog timelineId={timeline.id} gameRef={gameRef} />
      </div>
    </div>
  );
};
