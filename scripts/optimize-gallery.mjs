/**
 * Optimize gallery images in place (same filenames, overwritten).
 * - Auto-rotates via EXIF orientation
 * - Resizes longest edge: image 1 (hero/LCP) 1920px, others 1600px
 * - MozJPEG q80 progressive, 4:2:0 chroma subsampling
 *
 * Usage: npm run optimize:images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('public/gallery');
const files = fs
  .readdirSync(dir)
  .filter((f) => /^images \(\d+\)\.jpg$/i.test(f))
  .sort((a, b) => +a.match(/\d+/)[0] - +b.match(/\d+/)[0]);

if (files.length === 0) {
  console.log('No images to optimize.');
  process.exit(0);
}

let totalIn = 0;
let totalOut = 0;

for (const f of files) {
  const src = path.join(dir, f);
  const num = +f.match(/\d+/)[0];
  // Hero background / LCP keeps more pixels; grid thumbnails 1600 is plenty
  const limit = num === 1 ? 1920 : 1600;
  const tmp = path.join(dir, `.tmp-${f}`);

  const out = await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: limit, height: limit, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, chromaSubsampling: '4:2:0', mozjpeg: true })
    .toFile(tmp);

  const inSize = fs.statSync(src).size;
  fs.rmSync(src);
  fs.renameSync(tmp, src);
  totalIn += inSize;
  totalOut += out.size;
  console.log(
    `${f.padEnd(22)} -> ${out.width}x${out.height}  ${Math.round(inSize / 1024).toString().padStart(5)}KB -> ${Math.round(out.size / 1024).toString().padStart(4)}KB  (-${Math.round((1 - out.size / inSize) * 100)}%)`
  );
}

console.log(
  `\nDONE: ${(totalIn / 1048576).toFixed(2)}MB -> ${(totalOut / 1048576).toFixed(2)}MB  (-${Math.round((1 - totalOut / totalIn) * 100)}%)`
);
