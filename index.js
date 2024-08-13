const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = "./input";
const outputDir = "./output";

fs.readdir(inputDir, (err, files) => {
    if (err) {
        throw err;
    }

    if (!fs.existsSync(inputDir)) {
        fs.mkdirSync(inputDir);
    }
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    files.forEach((file) => {
        const inputPath = path.join(inputDir, file);
        const fileName = `${path.basename(inputPath, path.extname(inputPath))}.webp`;
        const outputPath = path.join(outputDir, fileName);

        sharp(inputPath)
            .resize(960)
            .webp({
                quality: 80,
            })
            .toFile(outputPath)
            .then(() => {
                console.log(`Image optimisée: ${file}`);
            })
            .catch((err) => {
                console.error(`Erreur avec l'image ${file}:`, err);
            });
    });
});
