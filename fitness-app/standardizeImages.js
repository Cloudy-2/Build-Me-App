const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MUSCLES_DIR = path.join(__dirname, 'assets', 'muscles');
const TARGET_WIDTH = 664;
const TARGET_HEIGHT = 1136;

async function standardizeImages() {
    console.log('🔧 Standardizing muscle images...\n');

    const files = fs.readdirSync(MUSCLES_DIR).filter(file => file.endsWith('.png'));

    for (const file of files) {
        const inputPath = path.join(MUSCLES_DIR, file);
        const outputPath = path.join(MUSCLES_DIR, file);

        try {
            const metadata = await sharp(inputPath).metadata();
            console.log(`📏 ${file}: ${metadata.width}x${metadata.height}`);

            // Resize and ensure exact dimensions with transparency preserved
            await sharp(inputPath)
                .resize(TARGET_WIDTH, TARGET_HEIGHT, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toFile(outputPath + '.tmp');

            // Replace original with processed version
            fs.renameSync(outputPath + '.tmp', outputPath);

            console.log(`✅ ${file}: Standardized to ${TARGET_WIDTH}x${TARGET_HEIGHT}\n`);
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    }

    console.log('🎉 All images standardized successfully!');
}

standardizeImages().catch(console.error);
