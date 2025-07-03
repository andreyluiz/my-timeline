"use client";

import { type RefObject, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEventForm } from "./add-event-form";
import type { TimelineGame } from "./pixi-timeline";

interface AddEventDialogProps {
  timelineId: string;
  gameRef: RefObject<TimelineGame | null>;
}

export function AddEventDialog({ timelineId, gameRef }: AddEventDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new event</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new event to the timeline.
          </DialogDescription>
        </DialogHeader>
        <AddEventForm
          timelineId={timelineId}
          setOpen={setOpen}
          gameRef={gameRef}
        />
      </DialogContent>
    </Dialog>
  );
}
