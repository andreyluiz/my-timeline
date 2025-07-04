'use client'

import type { Event } from "@/generated/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface EventPanelProps {
  event: Event;
  onClose: () => void;
}

export function EventPanel({ event, onClose }: EventPanelProps) {
  return (
    <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {event.title}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <XIcon className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
