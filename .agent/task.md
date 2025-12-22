# AI Integration Plan

## Current Status

- User requested connection to real AI API (Gemini Pro).
- Current implementation is simulated.

## Todo

- [ ] Install `@google/generative-ai` SDK <!-- id: 0 -->
- [ ] Create API route `src/app/api/generate/route.ts` to handle AI requests securely <!-- id: 1 -->
- [ ] Update `composer/page.tsx` to call this API route instead of simulating <!-- id: 2 -->
- [ ] Ensure `.env.local` is set up for `GEMINI_API_KEY` <!-- id: 3 -->
