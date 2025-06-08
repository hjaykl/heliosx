# MedExpress Genovia

Hello HeliosX Devs! Thank you for reviewing my take home exercise.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Features

- Progressive question flow
- Responsive design
- Reusable consultation component
- PicoCSS styling

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code linting
- `npm test` - Run unit tests

## Architecture

The `ConsultationForm` component accepts questions and a submit handler as props, making it reusable for different medical conditions.

Questions are defined in `src/data/questions.ts` and submission is handled via `src/services/consultationService.ts`.

I've chosen [PicoCSS](https://picocss.com/) to add some minimal styling while focusing on the core logic of the assignment.
