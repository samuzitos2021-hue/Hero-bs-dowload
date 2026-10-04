const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceImage = path.resolve(__dirname, '../src/assets/images/bloodstrike_striker_avatar_1791126443643.jpg');
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generate() {
  console.log('Generating PWA icons from:', sourceImage);

  // 192x192
  await sharp(sourceImage)
    .resize(192, 192, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // 512x512
  await sharp(sourceImage)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // Apple Touch Icon 180x180
  await sharp(sourceImage)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Maskable 512x512 with safe-zone margin (80% size centered on dark #080a0f canvas)
  const innerResized = await sharp(sourceImage)
    .resize(410, 410, { fit: 'cover' })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 8, g: 10, b: 15, alpha: 1 }
    }
  })
    .composite([{ input: innerResized, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Generated pwa-maskable-512x512.png');

  // SVG favicon
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="#080a0f"/>
    <circle cx="50" cy="50" r="38" stroke="#dc2626" stroke-width="4" fill="none"/>
    <circle cx="50" cy="50" r="10" fill="#dc2626"/>
    <line x1="10" y1="50" x2="35" y2="50" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
    <line x1="65" y1="50" x2="90" y2="50" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
    <line x1="50" y1="10" x2="50" y2="35" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
    <line x1="50" y1="65" x2="50" y2="90" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon, 'utf8');
  console.log('Generated favicon.svg');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
