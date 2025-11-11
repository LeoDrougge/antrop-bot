# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive AI-powered hero block for Antrop design agency built with Next.js, shadcn/ui, and Claude AI. Features an inline contentEditable UX where users "write themselves into" a sentence, getting personalized, structured responses.

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Server runs on http://localhost:3000

## Environment Setup

Required before first run:
```bash
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY
```

The API key must be valid and have sufficient credits.

## Key Architecture

### 1. Inline ContentEditable UX
The hero uses contentEditable spans for a seamless "write-in" experience ([app/page.tsx:102-171](app/page.tsx#L102-L171)):
- `roleRef`, `needRef`, `toneRef` - React refs for focus management
- Each field has different color coding (indigo, blue, purple)
- Feels like a word processor, not a form
- Smooth transitions and focus states

### 2. Structured AI Response (JSON Mode)
Claude returns structured JSON, not HTML strings ([app/api/ask-antrop/route.ts:31-60](app/api/ask-antrop/route.ts#L31-L60)):

```typescript
interface AIResponse {
  greeting: string;           // Personlig hälsning (1 mening)
  understanding: string;      // Visa förståelse (2-3 meningar)
  approach: string[];         // 3-4 steg hur Antrop närmar sig
  caseExample: {              // Relevant case
    name: string;
    description: string;
  };
  nextSteps: string[];        // 2-3 konkreta steg
  closing: string;            // Uppmuntrande avslut (1 mening)
}
```

### 3. Pedagogical Response Rendering
Each section has specific styling ([app/page.tsx:199-290](app/page.tsx#L199-L290)):
- **Understanding**: Blue gradient box with left border
- **Approach**: Numbered steps with gradient badges (1, 2, 3)
- **Case Example**: Purple gradient box with emoji
- **Next Steps**: Green boxes with checkmarks
- **Closing**: Italic, centered

### 4. Content Source
All Antrop data is in [antrop-content.json](antrop-content.json):
- Company info, services, cases, value propositions
- Loaded at API route runtime
- Stringified into Claude's system prompt

## Design Philosophy

### Colors
- **Gradients**: slate-50 → blue-50 → indigo-50 (background)
- **Field colors**: Indigo (role), Blue (need), Purple (tone)
- **Section colors**: Blue (understanding), numbered (approach), Purple (case), Green (next steps)

### Typography
- **Hero text**: 4xl-5xl, font-light, generous line-height
- **Response**: 2xl-3xl greeting, lg body text, structured hierarchy

### Animations
- Hero fades out when response shows (`opacity-40 scale-95`)
- Response fades in with slide-up (`animate-in fade-in slide-in-from-bottom-4`)
- 300ms delay before showing response (anticipation)

## Tech Stack

- **Next.js 15** - App Router, TypeScript
- **shadcn/ui** - Button, Card components
- **Tailwind CSS** - All styling
- **lucide-react** - Icons (Loader2, ArrowRight, Sparkles, CheckCircle2)
- **Claude Sonnet 4.5** - AI model (`claude-sonnet-4-5-20250929`)

## API Route

POST `/api/ask-antrop` expects:
```json
{
  "role": "produktägare",
  "need": "bygga en app",
  "tone": "professionell ton"
}
```

Returns structured JSON (see AIResponse interface above).

Error handling: Tries to parse JSON, throws error if invalid format.

## Deployment to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add `ANTHROPIC_API_KEY` environment variable
4. Deploy

Auto-deploys on push to main branch.

## Key Files

- [app/page.tsx](app/page.tsx) - Main component with inline UX
- [app/api/ask-antrop/route.ts](app/api/ask-antrop/route.ts) - Claude API integration
- [antrop-content.json](antrop-content.json) - Antrop data source
- [components/ui/](components/ui/) - shadcn components

## Notes

- contentEditable is tricky - use `suppressContentEditableWarning`
- Claude doesn't always return perfect JSON - have error handling
- Delay showing response for better UX (anticipation)
- Focus management with refs for keyboard navigation
