import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const assets = [
  ["OpenStudyDeck/Home Page OSD.png", "open-study-deck/home.webp"],
  ["OpenStudyDeck/Generated Workspace.png", "open-study-deck/generated-workspace.webp"],
  ["OpenStudyDeck/Library.png", "open-study-deck/library.webp"],
  ["CSSFrosting/Home Page CSSF.png", "css-frosting/home.webp"],
  ["CSSFrosting/Generator Preview.png", "css-frosting/generator-preview.webp"],
  ["CSSFrosting/Analyzer Result.png", "css-frosting/analyzer-result.webp"],
  ["HackerRankOrchestrate/OutputCSV.png", "ghost-data/output-csv.webp"],
  ["HackerRankOrchestrate/UnresolvedCSV.png", "ghost-data/unresolved-csv.webp"],
];
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");
const records = [];

for (const [source, target] of assets) {
  const original = await readFile(path.join(root, "Sources", source));
  const metadata = await sharp(original).metadata();
  let pipeline = sharp(original);
  const treatments = [];

  if (source.endsWith("/OutputCSV.png")) {
    // Keep the column letters and data; exclude Excel's profile/avatar and chrome.
    pipeline = pipeline.extract({ left: 0, top: 225, width: 1600, height: 618 });
    treatments.push("Cropped Excel chrome, including profile avatar; spreadsheet data retained.");
  }

  if (source.endsWith("/Generator Preview.png")) {
    // Opaque masks on the public copy only. Never infer whether demo card details are real.
    const masks = [
      { left: 1145, top: 333, width: 60, height: 24 },
      { left: 897, top: 422, width: 135, height: 20 },
      { left: 1199, top: 422, width: 60, height: 20 },
    ];
    pipeline = pipeline.composite(masks.map(({ left, top, width, height }) => ({
      left,
      top,
      input: { create: { width, height, channels: 4, background: "#111827" } },
    })));
    treatments.push("Masked preview cardholder name, visible card suffix, and expiry as a precaution.");
  }

  // High-quality WebP preserves UI legibility without the much larger lossless files.
  // No resizing, upscaling, or metadata copying.
  const { data, info } = await pipeline.webp({ quality: 90, smartSubsample: true, effort: 6 }).toBuffer({ resolveWithObject: true });
  const output = path.join(root, "public/projects", target);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, data);
  records.push({
    source: `Sources/${source}`,
    target: `/projects/${target}`,
    sourceSha256: sha256(original),
    outputSha256: sha256(data),
    sourceBytes: original.length,
    outputBytes: data.length,
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    width: info.width,
    height: info.height,
    capturedOn: null,
    encoding: "WebP quality 90, smart subsampling, effort 6; metadata stripped",
    treatments,
  });
}

await writeFile(path.join(root, "docs/project-image-manifest.json"), `${JSON.stringify(records, null, 2)}\n`);
console.table(records.map(({ target, sourceBytes, outputBytes, width, height }) => ({
  target, sourceBytes, outputBytes, dimensions: `${width}x${height}`,
})));
