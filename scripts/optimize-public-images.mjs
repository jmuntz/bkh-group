import { readdir, rename, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const maxWidth = 1920;
const jpegQuality = 82;

async function optimizeJpeg(fileName) {
  const filePath = path.join(publicDir, fileName);
  const before = await stat(filePath);
  const image = sharp(filePath, { failOn: 'none' });
  const metadata = await image.metadata();

  if (!metadata.width || metadata.width <= maxWidth) {
    return null;
  }

  const tempPath = `${filePath}.optimized`;
  await image
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: jpegQuality, mozjpeg: true })
    .toFile(tempPath);

  await rename(tempPath, filePath);
  const after = await stat(filePath);

  return {
    fileName,
    beforeKb: Math.round(before.size / 1024),
    afterKb: Math.round(after.size / 1024),
    width: metadata.width,
  };
}

const entries = await readdir(publicDir);
const results = [];

for (const entry of entries) {
  if (!entry.toLowerCase().endsWith('.jpg')) continue;
  const result = await optimizeJpeg(entry);
  if (result) results.push(result);
}

if (results.length === 0) {
  console.log('No oversized JPEGs found in public/.');
} else {
  for (const result of results) {
    console.log(
      `${result.fileName}: ${result.beforeKb}KB -> ${result.afterKb}KB (source width ${result.width}px)`,
    );
  }
}
