import * as PIXI from "pixi.js";

import type { Event as PrismaEvent, Timeline } from "@/generated/prisma";

interface Event extends PrismaEvent {}

export class TimelineGame {
  private app: PIXI.Application;
  private container: HTMLDivElement;
  private events: Event[] = [];
  private currentEventIndex: number = 0;
  private timeline: PIXI.Container;
  private startDate: number;
  private endDate: Date | null;
  private pixelsPerDay: number = 12;
  private zoomLevelText: PIXI.Text | null = null;
  public onEventHover?: (
    event: Event | null,
    x: number,
    y: number,
    pixelsPerDay: number,
  ) => void;
  public onEventClick?: (event: Event | null) => void;
  private disableInteractions: boolean = false;

  constructor(container: HTMLDivElement, timelineData: Timeline & { events: Event[] }) {
    this.container = container;
    this.app = new PIXI.Application();
    this.timeline = new PIXI.Container();
    this.events = timelineData.events;
    this.startDate = new Date(timelineData.startDate).getTime();
    this.endDate = timelineData.endDate;

    // Add today as an event if the timeline has no end date
    if (!timelineData.endDate) {
      const todayEvent: Event = {
        id: "today",
        title: "Today",
        description: "Current date",
        date: new Date(),
        importance: 5,
        timelineId: timelineData.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.events.push(todayEvent);
    }

    this.events.sort(
      (a: Event, b: Event) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }

  private _drawTimelineElements() {
    this.timeline.removeChildren(); // Clear existing elements

    const timelineStartDate = new Date(this.startDate).getTime();
    const timelineEndDate =
      this.endDate === null
        ? Date.now()
        : new Date(this.endDate).getTime();

    const timelineDuration = timelineEndDate - timelineStartDate;
    const timelineWidth =
      (timelineDuration / (1000 * 60 * 60 * 24)) * this.pixelsPerDay;

    const line = new PIXI.Graphics();
    line.rect(0, 0, timelineWidth, 4).fill(0x4a5568);
    this.timeline.addChild(line);

    // Year and Month Markers
    const startDate = new Date(this.startDate);
    const endDate = new Date(timelineEndDate);
    for (
      let year = startDate.getFullYear();
      year <= endDate.getFullYear();
      year++
    ) {
      const yearStartTimestamp = new Date(year, 0, 1).getTime();
      const yearX =
        ((yearStartTimestamp - timelineStartDate) / (1000 * 60 * 60 * 24)) *
        this.pixelsPerDay;

      // Only draw year marker if it's within the timeline's start and end dates
      if (
        yearStartTimestamp >= timelineStartDate &&
        yearStartTimestamp <= timelineEndDate
      ) {
        const yearMarker = new PIXI.Graphics();
        yearMarker.rect(yearX, -40, 4, 40).fill(0x90cdf4);
        const yearLabel = new PIXI.Text(year.toString(), {
          fill: "white",
          fontSize: 24,
        });
        yearLabel.x = yearX - yearLabel.width / 2;
        yearLabel.y = -80;
        this.timeline.addChild(yearMarker, yearLabel);
      }

      const startMonth =
        year === startDate.getFullYear() ? startDate.getMonth() : 0;
      const endMonth = year === endDate.getFullYear() ? endDate.getMonth() : 11;
      for (let month = startMonth; month <= endMonth; month++) {
        const monthStartTimestamp = new Date(year, month, 1).getTime();
        const monthX =
          ((monthStartTimestamp - timelineStartDate) /
            (1000 * 60 * 60 * 24)) *
          this.pixelsPerDay;

        // Only draw month marker if it's within the timeline's start and end dates
        if (
          monthStartTimestamp >= timelineStartDate &&
          this.pixelsPerDay > 5 &&
          monthStartTimestamp <= timelineEndDate
        ) {
          const monthMarker = new PIXI.Graphics();
          monthMarker.rect(monthX, -20, 2, 20).fill(0x63b3ed);
          this.timeline.addChild(monthMarker);

          if (this.pixelsPerDay > 5) {
            // Show month label if month marker is visible
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            if (month !== 0) {
              // Do not add Jan marker
              const monthLabel = new PIXI.Text(monthNames[month], {
                fill: 0x4a5568,
                fontSize: 12,
              }); // Darker color
              monthLabel.x = monthX - monthLabel.width / 2;
              monthLabel.y = -40;
              this.timeline.addChild(monthLabel);
            }
          }
        }
      }
    }

    this.events.forEach((event) => {
      const eventDate = new Date(event.date).getTime();
      const eventX =
        ((eventDate - this.startDate) / (1000 * 60 * 60 * 24)) *
        this.pixelsPerDay;

      const eventY = -120; // Y position for the event circle, above the timeline

      const eventCircle = new PIXI.Graphics();
      eventCircle.circle(eventX, eventY, event.importance * 8).fill(0x4299e1);
      eventCircle.eventMode = "static";
      eventCircle.cursor = "pointer";

      // Draw the connecting line
      const connectingLine = new PIXI.Graphics();
      connectingLine.moveTo(eventX, eventY + event.importance * 8); // Start from bottom of circle
      connectingLine.lineTo(eventX, 0); // End at the timeline
      connectingLine.stroke({ width: 2, color: 0x4299e1 });
      this.timeline.addChild(connectingLine);

      if (this.pixelsPerDay > 2) {
        const label = new PIXI.Text(event.title, {
          fill: "white",
          fontSize: 20,
        });
        label.x = eventX - label.width / 2;
        label.y = eventY - 70; // Adjust label position relative to the new eventY
        this.timeline.addChild(label);
      }

      eventCircle.on("pointerover", () => {
        const eventGlobalX = this.timeline.x + eventX * this.timeline.scale.x;
        const timelineGlobalY = this.timeline.y;
        const popupX = eventGlobalX;
        const popupY = timelineGlobalY + 20; // 20px below the timeline line
        this.onEventHover?.(event, popupX, popupY, this.pixelsPerDay);
      });
      eventCircle.on("pointerout", () =>
        this.onEventHover?.(null, 0, 0, this.pixelsPerDay),
      );
      eventCircle.on("pointertap", () => this.onEventClick?.(event));

      this.timeline.addChild(eventCircle);
    });
  }

  public async init() {
    await this.app.init({
      background: "#1a202c",
      resizeTo: this.container || window,
    });
    this.container.appendChild(this.app.view as unknown as Node);

    this.app.stage.addChild(this.timeline);

    this.zoomLevelText = new PIXI.Text(
      `Zoom: ${this.pixelsPerDay.toFixed(2)}`,
      { fill: "white", fontSize: 16 },
    );
    this.zoomLevelText.x = this.app.screen.width - this.zoomLevelText.width - 10;
    this.zoomLevelText.y = this.app.screen.height - this.zoomLevelText.height - 10;
    this.app.stage.addChild(this.zoomLevelText);

    this._drawTimelineElements();

    this.timeline.x = this.app.screen.width / 2;
    this.timeline.y = this.app.screen.height / 2;

    // Panning and Zooming
    let dragging = false;
    let prevX = 0;

    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;
    this.app.stage.on("pointerdown", (event) => {
      if (this.disableInteractions) return;
      dragging = true;
      prevX = event.global.x;
    });

    this.app.stage.on("pointerup", () => {
      dragging = false;
    });
    this.app.stage.on("pointerupoutside", () => {
      dragging = false;
    });

    this.app.stage.on("pointermove", (event) => {
      if (this.disableInteractions) return;
      if (dragging) {
        const newX = event.global.x;
        this.timeline.x += newX - prevX;
        prevX = newX;
      }
    });

    this.container.addEventListener("wheel", (event) => {
      if (this.disableInteractions) return;
      event.preventDefault();
      const zoomFactor = 1.1;
      const oldPixelsPerDay = this.pixelsPerDay;
      this.pixelsPerDay =
        event.deltaY < 0
          ? oldPixelsPerDay * zoomFactor
          : oldPixelsPerDay / zoomFactor;

      // Clamp pixelsPerDay to reasonable values
      this.pixelsPerDay = Math.max(0.2, Math.min(25, this.pixelsPerDay));

      // Adjust timeline position to zoom around the mouse pointer
      const mouseX =
        event.clientX - this.container.getBoundingClientRect().left;
      const worldX = (mouseX - this.timeline.x) / oldPixelsPerDay;
      this.timeline.x = mouseX - worldX * this.pixelsPerDay;

      this._drawTimelineElements();
      if (this.zoomLevelText) {
        this.zoomLevelText.text = `Zoom: ${this.pixelsPerDay.toFixed(2)}`;
      }
    });

    this.app.ticker.add(this.animateTimeline.bind(this));
  }

  private targetX: number | null = null;
  private animationSpeed: number = 0.1;

  public setInteractionsEnabled(enabled: boolean) {
    this.disableInteractions = !enabled;
  }

  private jumpToEvent(index: number) {
    if (index >= 0 && index < this.events.length) {
      this.currentEventIndex = index;
      const eventDate = new Date(this.events[index].date).getTime();
      const eventX =
        ((eventDate - this.startDate) / (1000 * 60 * 60 * 24)) *
        this.pixelsPerDay;
      // Calculate the target X to center the event on the screen
      this.targetX = -eventX + this.app.screen.width / 2;
    }
  }

  public centerEvent(event: Event) {
    const eventDate = new Date(event.date).getTime();
    const eventX =
      ((eventDate - this.startDate) / (1000 * 60 * 60 * 24)) *
      this.pixelsPerDay;
    this.targetX = -eventX + this.app.screen.width / 2;
  }

  private animateTimeline() {
    if (this.targetX !== null) {
      this.timeline.x += (this.targetX - this.timeline.x) * this.animationSpeed;
      if (Math.abs(this.targetX - this.timeline.x) < 0.5) {
        this.timeline.x = this.targetX;
        this.targetX = null;
      }
    }
  }

  public jumpToNextEvent() {
    this.jumpToEvent(this.currentEventIndex + 1);
  }

  public jumpToPreviousEvent() {
    this.jumpToEvent(this.currentEventIndex - 1);
  }

  public jumpToBirth() {
    this.jumpToEvent(0);
  }

  public jumpToToday() {
    const todayEventIndex = this.events.findIndex(
      (event) => event.title === "Today",
    );
    if (todayEventIndex !== -1) {
      this.jumpToEvent(todayEventIndex);
    }
  }

  public jumpToLastEvent() {
    this.jumpToEvent(this.events.length - 1);
  }

  public destroy() {
    if (this.app) {
      this.app.destroy(true, true);
    }
  }

  public addEvent(event: Event) {
    this.events.push(event);
    this.events.sort(
      (a: Event, b: Event) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    this._drawTimelineElements();
  }
}
