// Optimises raw Magnific exports (media-src/) into web-ready assets (public/media/).
// Images -> WebP @2048 + @1024. Videos -> seamless crossfade loops (end blends into start).
import { readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let sharp;
try { sharp = require("sharp"); } catch { sharp = require("../../node_modules/sharp"); }

const SRC = "media-src/";
const XFADE = 0.9;

for (const f of readdirSync(SRC).filter((x) => x.endsWith(".png"))) {
  const name = f.replace(".png", "");
  await sharp(SRC + f).resize({ width: 2048 }).webp({ quality: 80, effort: 5 }).toFile(`public/media/img/${name}.webp`);
  await sharp(SRC + f).resize({ width: 1024 }).webp({ quality: 74, effort: 5 }).toFile(`public/media/img/${name}-1024.webp`);
  console.log("img", name);
}

for (const f of readdirSync(SRC).filter((x) => x.endsWith(".mp4"))) {
  const name = f.replace(".mp4", "");
  const L = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", SRC + f]).toString());
  const t = (n) => n.toFixed(4);
  const graph = [
    "[0:v]fps=24,split=3[a][b][c]",
    `[a]trim=start=${t(L - XFADE)}:end=${t(L)},setpts=PTS-STARTPTS[e]`,
    `[b]trim=start=0:end=${XFADE},setpts=PTS-STARTPTS[s]`,
    `[c]trim=start=${XFADE}:end=${t(L - XFADE)},setpts=PTS-STARTPTS[m]`,
    `[e][s]xfade=transition=fade:duration=${XFADE}:offset=0[xf]`,
    "[xf][m]concat=n=2:v=1:a=0,format=yuv420p[v]",
  ].join(";");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", SRC + f, "-filter_complex", graph, "-map", "[v]", "-an",
    "-c:v", "libx264", "-crf", "23", "-preset", "slow", "-movflags", "+faststart", `public/media/video/${name}.mp4`]);
  console.log("video", name, "loop", (L - XFADE).toFixed(2) + "s");
}
