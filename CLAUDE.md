# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ju-jeop Generator (주접멘트 생성기) is a React web application that generates humorous, exaggerated Korean compliments ("주접") using Google's Gemini AI. The app transforms sincere feelings into over-the-top, comedic messages based on relationship type, tone, and intensity.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Create a `.env.local` file with:
```
GEMINI_API_KEY=your_api_key_here
```

The Vite config maps `GEMINI_API_KEY` to `process.env.API_KEY` in the application code.

## Architecture

### Core Flow
1. User fills form in [App.tsx](App.tsx) with name, relationship, description (optional), tone, and intensity
2. Form data is validated (name and relationship required)
3. On submit, [services/geminiService.ts](services/geminiService.ts) creates a detailed Korean prompt
4. Gemini API (gemini-2.5-flash model) generates the "ju-jeop" response
5. Result displays in [components/ResultCard.tsx](components/ResultCard.tsx)

### Key Components Structure
- [App.tsx](App.tsx): Main component with form state management
- [components/](components/): Reusable UI components (InputField, SelectField, IntensitySelector, ToneSelector, Button, ResultCard)
- [services/geminiService.ts](services/geminiService.ts): Gemini API integration and prompt engineering
- [types.ts](types.ts): TypeScript enums and interfaces (Intensity, Tone, Relationship, FormData)
- [constants.ts](constants.ts): UI option configurations for selectors

### Prompt Engineering System

The core value is in [services/geminiService.ts:5-169](services/geminiService.ts#L5-L169) which contains an extensive Korean prompt template with:
- Writing techniques (scale jumping, reversal structure, fan culture immersion)
- Tone-specific guidelines (casual, polite, historical, manic, etc.)
- Relationship-specific examples (parents, friends, crush, lover, idol, senior/junior)
- Intensity levels (mild, spicy, hell)
- Expression libraries (scale keywords, fandom terms, reaction words)

When modifying the AI behavior, edit the `createPrompt` function. The prompt is the primary product differentiator.

### Environment Variable Handling

Vite config ([vite.config.ts](vite.config.ts)) uses `loadEnv` to inject `GEMINI_API_KEY` as `process.env.API_KEY` at build time. The service expects `process.env.API_KEY` to exist.

### Styling Approach

Uses Tailwind CSS via inline className strings. No separate CSS files. Design is mobile-first with a pink/rose theme matching the affectionate concept.

### Error Handling

[services/geminiService.ts:171-224](services/geminiService.ts#L171-L224) handles:
- Missing API key
- Gemini safety blocks (with Korean error message suggesting lower intensity)
- Empty responses
- General API errors

All errors are caught and displayed in the UI with friendly Korean messages.

### TypeScript Configuration

Path alias `@/*` maps to project root ([tsconfig.json:21-24](tsconfig.json#L21-L24)). Can import like `import { Foo } from '@/types'` instead of relative paths.

## Key Enums

- **Intensity**: MILD (순한맛), SPICY (매운맛), HELL (지옥맛)
- **Tone**: BASIC, SWEET, CASUAL, POLITE, SAGEUK, MANIC, TSUNDERE, NOVEL
- **Relationship**: PARENT, FRIEND, CRUSH, LOVER, IDOL, SENIOR, JUNIOR, OTHER

These drive the prompt generation logic and must match the Korean labels in [constants.ts](constants.ts).
