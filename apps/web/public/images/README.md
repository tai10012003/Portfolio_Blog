# Personal avatar

The homepage avatar is configured by `profile.avatar` in `src/features/home/data.ts`.

To use your photo:
1. Add `avatar.jpg` (or `.png`, `.webp`) to this directory.
2. Change `profile.avatar` to `"/images/avatar.jpg"`.

A portrait of at least 560 × 640 pixels works well. The image is cropped with `object-fit: cover`; adjust `.portrait-image` in `src/app/globals.css` if needed.
The included SVG is a neutral placeholder, not a photograph.
