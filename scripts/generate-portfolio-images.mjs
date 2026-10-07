import sharp from 'sharp';
import { join } from 'node:path';

const imageDirectory = join(process.cwd(), 'src/components/img');
const productImages = [
  'exampreps360',
  'foodmartex_mobile',
  'foodmartex',
  'amldecoded',
  'perfumegardenhotel',
  'emeritusgadget',
  'squareboxng',
  'vendstash',
];

await Promise.all(productImages.map((name) =>
  sharp(join(imageDirectory, `${name}.png`))
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 76, effort: 5 })
    .toFile(join(imageDirectory, `${name}.webp`)),
));

await sharp(join(imageDirectory, 'main.jpg'))
  .resize(168, 196, { fit: 'cover', position: 'centre' })
  .webp({ quality: 80, effort: 5 })
  .toFile(join(imageDirectory, 'main-portrait.webp'));

console.log('Generated responsive portfolio images.');
