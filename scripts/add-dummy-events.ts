import prisma from "../src/lib/prisma";

function getRandomDate(start: Date, end: Date) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

function getRandomImportance() {
  return Math.floor(Math.random() * 5) + 1; // 1 to 5
}

function getRandomTitle() {
  const titles = [
    "Discovery",
    "Invention",
    "Milestone",
    "Event",
    "Achievement",
    "Beginning",
    "End",
    "Crisis",
    "Celebration",
    "Meeting",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomDescription() {
  const descriptions = [
    "A significant moment in history.",
    "This marked a turning point.",
    "An important development occurred.",
    "A new era began.",
    "The culmination of years of effort.",
    "A challenging period.",
    "A joyous occasion.",
    "Key figures gathered.",
    "The initial phase of a project.",
    "The final stage of a process.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

async function addDummyEvents(timelineId: string, numberOfEvents: number) {
  const startDate = new Date(2000, 0, 1);
  const endDate = new Date();

  for (let i = 0; i < numberOfEvents; i++) {
    const eventData = {
      title: getRandomTitle(),
      description: getRandomDescription(),
      date: new Date(getRandomDate(startDate, endDate)),
      importance: getRandomImportance(),
      timelineId,
    };
    try {
      await prisma.event.create({ data: eventData });
      console.log(`Event ${i + 1} added successfully.`);
    } catch (error) {
      console.error(`Failed to add event ${i + 1}:`, error);
    }
  }
  console.log(`Added ${numberOfEvents} dummy events to timeline ${timelineId}.`);
}

const args = process.argv.slice(2);
const timelineId = args[0];
const numberOfEvents = parseInt(args[1], 10);

if (!timelineId || isNaN(numberOfEvents)) {
  console.log("Usage: bun run scripts/add-dummy-events.ts <timelineId> <numberOfEvents>");
} else {
  addDummyEvents(timelineId, numberOfEvents);
}
