// Generates the site icons and the social share image from the brand colors.
// Run after changing the brand mark or the share photo:
//   node scripts/generate-brand-assets.mjs
// Requires ffmpeg (PNG -> ICO/JPEG conversion) and network access (loads Inter from Google Fonts).
import { ImageResponse } from 'next/og.js';
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import React from 'react';

const GOLD = '#D4AF37';
const BLACK = '#0A0A0A';
const h = React.createElement;

async function loadInter(weight) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`, {
      // An old user agent makes Google Fonts return TTF, which the renderer supports
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko)' },
    })
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error('Could not find an Inter TTF in the Google Fonts response');
  return (await fetch(url)).arrayBuffer();
}

async function render(element, width, height, fonts) {
  const response = new ImageResponse(element, { width, height, fonts });
  return Buffer.from(await response.arrayBuffer());
}

function monogram(size) {
  return h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: BLACK,
        borderRadius: size * 0.18,
        fontFamily: 'Inter',
        fontWeight: 800,
        fontSize: size * 0.56,
        letterSpacing: -size * 0.03,
      },
    },
    h('span', { style: { color: GOLD } }, 'L'),
    h('span', { style: { color: '#FFFFFF' } }, 'F')
  );
}

function shareImage(photoDataUri) {
  return h(
    'div',
    { style: { width: '100%', height: '100%', display: 'flex', position: 'relative', fontFamily: 'Inter' } },
    h('img', { src: photoDataUri, width: 1200, height: 630, style: { position: 'absolute', inset: 0 } }),
    h('div', {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.05) 100%)',
      },
    }),
    h(
      'div',
      {
        style: {
          position: 'absolute',
          left: 72,
          bottom: 72,
          display: 'flex',
          flexDirection: 'column',
        },
      },
      h(
        'div',
        { style: { display: 'flex', fontSize: 84, fontWeight: 800, letterSpacing: -2 } },
        h('span', { style: { color: GOLD } }, 'LUXOR'),
        h('span', { style: { color: '#FFFFFF' } }, 'FILM')
      ),
      h('div', { style: { width: 120, height: 4, background: GOLD, marginTop: 20, marginBottom: 22 } }),
      h(
        'div',
        { style: { color: '#E4E4E7', fontSize: 30, fontWeight: 600, letterSpacing: 6 } },
        'DOCUMENTARY PRODUCTION'
      )
    )
  );
}

const [regular, bold] = await Promise.all([loadInter(600), loadInter(800)]);
const fonts = [
  { name: 'Inter', data: regular, weight: 600, style: 'normal' },
  { name: 'Inter', data: bold, weight: 800, style: 'normal' },
];

// Icons (Next.js serves app/icon.png and app/apple-icon.png and adds the <link> tags)
await writeFile('app/icon.png', await render(monogram(512), 512, 512, fonts));
await writeFile('app/apple-icon.png', await render(monogram(180), 180, 180, fonts));

// favicon.ico for clients that only request /favicon.ico
const tmp = tmpdir();
await writeFile(join(tmp, 'favicon-48.png'), await render(monogram(48), 48, 48, fonts));
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', join(tmp, 'favicon-48.png'), 'app/favicon.ico']);

// Share image: JPEG keeps it small enough for WhatsApp previews
const photo = await readFile('scripts/assets/og-photo.jpg');
const photoUri = `data:image/jpeg;base64,${photo.toString('base64')}`;
await writeFile(join(tmp, 'og.png'), await render(shareImage(photoUri), 1200, 630, fonts));
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', join(tmp, 'og.png'), '-q:v', '3', 'public/images/og-default.jpg']);

console.log('Generated app/icon.png, app/apple-icon.png, app/favicon.ico, public/images/og-default.jpg');
