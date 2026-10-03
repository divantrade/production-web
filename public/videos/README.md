# Hero Video

The home page hero plays a muted, looping cut of `PROMO 03.mp4`, with `/images/hero-poster.jpg` shown while it loads. The browser picks the first source it can play:

| File | Codec | Used by |
|---|---|---|
| `hero-720-av1.mp4` | AV1 | phones that support AV1 |
| `hero-720.mp4` | H.264 | other phones |
| `hero-1080-av1.mp4` | AV1 | desktops that support AV1 (Chrome, Edge, Firefox, newer Safari) |
| `hero-1080.mp4` | H.264 | other desktops (e.g. Safari on Macs without AV1 decoding) |

To replace the video, re-encode the new source (no audio, `faststart`) and regenerate the poster:

```bash
ffmpeg -i source.mp4 -an -c:v libsvtav1 -preset 4 -crf 20 -g 125 -pix_fmt yuv420p -movflags +faststart -vf scale=1920:-2 hero-1080-av1.mp4
ffmpeg -i source.mp4 -an -c:v libsvtav1 -preset 4 -crf 24 -g 125 -pix_fmt yuv420p -movflags +faststart -vf scale=1280:-2 hero-720-av1.mp4
ffmpeg -i source.mp4 -an -c:v libx264 -preset slower -tune film -crf 24 -pix_fmt yuv420p -movflags +faststart -vf scale=1920:-2 hero-1080.mp4
ffmpeg -i source.mp4 -an -c:v libx264 -preset slow -crf 27 -profile:v main -pix_fmt yuv420p -movflags +faststart -vf scale=1280:-2 hero-720.mp4
ffmpeg -i hero-1080.mp4 -frames:v 1 -q:v 4 ../images/hero-poster.jpg
```

If you change resolution, update the AV1 `codecs` strings in `components/HeroSection.tsx` to match the encoded level (`ffprobe -show_entries stream=level`).
