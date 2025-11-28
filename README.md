# Thelin Orchestrator - Frontend

Jason Thelin's Cognitive Prosthetic Dashboard

## Overview

This Next.js application serves as the frontend for the Thelin Note Orchestration System. It provides Jason with a dashboard to review AI-processed lifelogs from his Limitless Pendant, captured insights for his book on AI-era leadership, and business ideas extracted from his conversations.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

1. Node.js 18+
2. A Clerk account with an application set up
3. Access to the Mac Studio 1 backend API

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk dashboard
- `CLERK_SECRET_KEY` - From Clerk dashboard
- `BACKEND_API_URL` - Mac Studio 1 API endpoint

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deployment to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Architecture

```
src/
├── app/
│   ├── layout.tsx      # Root layout with Clerk provider
│   ├── page.tsx        # Main dashboard
│   ├── sign-in/        # Clerk sign-in page
│   └── sign-up/        # Clerk sign-up page
├── middleware.ts       # Clerk authentication middleware
```

## Backend Connection

The frontend connects to the Mac Studio 1 backend via Tailscale. The backend API runs on port 3001 and provides:

- `/api/stats` - Today's dashboard statistics
- `/api/book-additions` - Pending book content
- `/api/business-ideas` - Captured business ideas
- `/api/questions` - Clarifying questions for Jason
- `/api/lifelogs` - Raw lifelog data

## Features

- **Dashboard**: Today's capture statistics
- **Book Additions**: AI-extracted content for the leadership book
- **Business Ideas**: Captured ideas with venture synergies
- **Questions**: Clarifying questions from the AI agents
- **Real-time Updates**: Refresh button for latest data

## Related Repositories

- Backend (Mac Studio 1): `~/thelin-orchestrator/`
- Book Repository: `h3ro-dev/thelin-book-ai-leadership` (planned)
