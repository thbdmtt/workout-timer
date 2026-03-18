# Lafay App

Lafay App is a mobile-first workout timer built with Vite, React and React Router.

It is designed as a small installable PWA for workout sessions, with:

- a home screen for quick navigation
- workout pages for `Upper Body`, `Lower Body` and `Core`
- a 25-second default rest timer with custom presets
- a stretch stopwatch with an audio cue every 30 seconds
- offline support after the first load

No backend, no database and no external state management are used. App state lives in React and static data lives in [`src/data/workouts.js`](./src/data/workouts.js).

## Stack

- Vite 7
- React 19
- React Router DOM 6
- CSS Modules
- `vite-plugin-pwa`

## Features

### Home

- `LAFAY` landing screen
- 4 navigation cards
- Responsive layout: single column on mobile, 2x2 grid on wider screens

### Workout pages

- Routes: `/workout/arms`, `/workout/legs`, `/workout/abs`
- Workout config loaded from [`src/data/workouts.js`](./src/data/workouts.js)
- Large timer display
- Rest preset buttons such as `90` and `3:00`
- Checkbox-based set tracking
- Floating reset button `⏎`
- Audio beep when the countdown reaches `0`

### Stretch

- Route: `/stretch`
- Stopwatch display in `mm:ss`
- `Play`, `Stop` and `Reset` controls
- Audio cue every 30 seconds

### PWA

- Installable manifest
- Generated service worker
- Static assets cached for offline use
- Includes offline access to `alarm.mp3`

## Timer behavior

Workout pages follow this logic:

- Default timer value is `25`
- Checking any set starts a new 25-second countdown
- Starting a new timer cancels the previous one
- Preset buttons start their own countdown immediately
- When the timer reaches `0`, the app plays `alarm.mp3` and resets to `25`
- Pressing `⏎` stops the timer and clears all checked sets

Stretch mode uses a stopwatch:

- `Play` starts or resumes counting up
- `Stop` pauses without resetting
- `Reset` stops and goes back to `00:00`
- The alarm plays every 30 seconds elapsed

## Routes

- `/` -> Home
- `/workout/:id` -> Workout page
- `/stretch` -> Stretch page

Unknown workout ids redirect back to `/`.

## Getting started

### Requirements

- Node.js `20.19+` or `22.12+`
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

To test the built PWA with a static server:

```bash
npx serve dist
```

## Available scripts

- `npm run dev` starts the Vite dev server
- `npm run build` builds the production bundle and service worker
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint

## Project structure

```text
lafay-app/
├── public/
│   ├── alarm.mp3
│   ├── icons/
│   └── manifest.webmanifest
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   └── styles/
├── index.html
├── package.json
└── vite.config.js
```

Main folders:

- `src/data` contains the workout source of truth
- `src/hooks` contains timer and audio side effects
- `src/pages` contains route-level screens
- `src/components` contains reusable UI pieces
- `src/styles` contains CSS Modules and global tokens

## Workout data

The current workouts are:

- `arms` -> Upper Body
- `legs` -> Lower Body
- `abs` -> Core

To update exercises or rest presets, edit [`src/data/workouts.js`](./src/data/workouts.js).

## Notes

- The app is intentionally frontend-only.
- Styling uses CSS Modules plus global design tokens in [`src/styles/global.css`](./src/styles/global.css).
- The generated icons are simple local assets intended for app installation and offline support.
