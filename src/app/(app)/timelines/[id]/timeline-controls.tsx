'use client'

import { ArrowLeftIcon, ArrowRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import type { MutableRefObject } from "react";
import { Button } from "@/components/ui/button";
import type { TimelineGame } from "./pixi-timeline";

interface TimelineControlsProps {
  gameRef: MutableRefObject<TimelineGame | null>;
}

export function TimelineControls({ gameRef }: TimelineControlsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <Button onClick={() => gameRef.current?.jumpToBirth()}>
        <ChevronsLeftIcon className="h-4 w-4 mr-2" />
        Go to Start
      </Button>
      <Button onClick={() => gameRef.current?.jumpToPreviousEvent()}>
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Previous Event
      </Button>
      <Button onClick={() => gameRef.current?.jumpToNextEvent()}>
        <ArrowRightIcon className="h-4 w-4 mr-2" />
        Next Event
      </Button>
      <Button onClick={() => gameRef.current?.jumpToLastEvent()}>
        <ChevronsRightIcon className="h-4 w-4 mr-2" />
        Last Event
      </Button>
    </div>
  );
}
