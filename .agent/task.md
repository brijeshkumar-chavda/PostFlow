# AI Integration Plan

## Current Status

- User requested connection to real AI API (Gemini Pro).
- Current implementation is simulated.

## Todo

- [x] Remove "Generate Hook" button <!-- id: 5 -->
- [x] Add "Suggest Hashtags" functionality <!-- id: 6 -->
- [x] Add "Magic Post" functionality (simulated) <!-- id: 7 -->
- [x] Add "Media Generation" functionality (simulated) <!-- id: 8 -->
- [x] Integrate Real AI (Azure OpenAI) <!-- id: 9 -->
- [x] Debug Magic Post generation failure <!-- id: 10 -->
  - [x] Verify API Key loading
  - [x] Check API route error handling
  - [x] Verify Gemini Model name validity
- [ ] Refine "Magic Post" UI/UX <!-- id: 11 -->

- [ ] Create API route `src/app/api/generate/route.ts` to handle AI requests securely <!-- id: 1 -->
- [ ] Update `composer/page.tsx` to call this API route instead of simulating <!-- id: 2 -->
- [ ] Ensure `.env.local` is set up for `GEMINI_API_KEY` <!-- id: 3 -->
