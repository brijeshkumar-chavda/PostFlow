# Debugging Media Asset Upload

## Current Status

- User reports bug: Plus button file selection doesn't update the UI.
- Identified potential file: `src/app/(dashboard)/composer/page.tsx`.

## Todo

- [x] Analyze `composer/page.tsx` for upload handlers <!-- id: 0 -->
  - Check "click to upload" vs "plus button" logic.
  - Look for `onChange` handlers on file inputs.
- [x] Verify if state is being updated correctly <!-- id: 1 -->
- [x] Fix the issue <!-- id: 2 -->
  - Added `e.target.value = ""` to `handleFileChange` to reset the input.
