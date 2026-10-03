# Hero Video

The home page hero plays `hero-1080.mp4` (desktop) and `hero-720.mp4` (phones), muted and looping, with `/images/hero-poster.jpg` shown while it loads. Source: `PROMO 03.mp4`.

To replace it, re-encode the new source with no audio and `faststart`, then regenerate the poster from the first frame:

```bash
ffmpeg -i source.mp4 -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -vf scale=1920:-2 hero-1080.mp4
ffmpeg -i source.mp4 -an -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -profile:v main -movflags +faststart -vf scale=1280:-2 hero-720.mp4
ffmpeg -i hero-1080.mp4 -frames:v 1 -q:v 4 ../images/hero-poster.jpg
```

Keep each file well under 15 MB.
