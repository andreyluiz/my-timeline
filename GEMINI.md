This is a web application to create timelines. Examples of timeline: my life timeline, The Queen band timeline, the WWII timeline.

# Timeline

It starts from a given initial date until a given final date. Or until today, if the timeline didn't yet. The timeline is divided by years, and with enough zoom, it can be divided by months. The zoom only widens or narrows the timeline sub-divisions. Markers for years are more evident than markers for months.

## Events

Events are represented as circles connected by lines to the main timeline line. The circles are slightly above the timeline. The circles are colored according to their importance. Each event has a title that shows above the circle. When hovering over the circle, a card shows more details about the event. Click an event locks the card in place and the timeline cannot be moved. When the card is closed, the timeline can be moved again. Buttons should provide some fast navigation: Go to first event, Go to last event, Go to previous event, Go to next event. Today should be a an event as well, and it is automatically added to the timeline.

## Privacy

The timelines can be marked as private. A user can choose to make a timeline publicly available. In this case, a link to the timeline will direct a user who is not the owner to the timeline in question. The owner of the timeline should have means of editting events.

## Users

The application should use the Supabase authentication system. Users should be able to sign up, sign in, and sign out. Users should be able to create, edit, and delete their timelines. Users should be able to share their timelines with other users. Users should be able to view other users' timelines.

## User Interface

The user interface should be intuitive and easy to use. It should be responsive and work well on different devices. The user interface should be customizable and allow users to personalize their experience. The user interface should be accessible and follow best practices for accessibility. Shadcn UI components should be used for the user interface. The timeline should use a sleek design and a clean layout.

## Technology

The application is a Next.js application using TypeScript, React and Tailwind CSS. The timeline is made with Pixi.js. Bun is the package manager. The timeline data should be stored in Supabase. Zod and react-hook-form for form validation.

## Basic directory structure

```
my-timeline/
├── src/                    # Folder
│   ├── app/                # The main app directory
│   ├── components/         # ShadCN components and custom components
│   └── lib/                # Mainly TS files for utility functions
├── components.json         # Shadcn definition file
```
