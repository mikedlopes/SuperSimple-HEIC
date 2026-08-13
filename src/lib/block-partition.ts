export type Block = { x: number; y: number; w: number; h: number };

function lumaAt(data: Uint8ClampedArray, width: number, x: number, y: number) {
  const i = (y * width + x) * 4;
  return 0.2126 * data[i]! + 0.7152 * data[i + 1]! + 0.0722 * data[i + 2]!;
}

function regionEnergy(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const x1 = Math.min(width, x + w);
  const y1 = Math.min(height, y + h);
  let sum = 0;
  let sum2 = 0;
  let n = 0;
  const step = Math.max(1, Math.floor(Math.min(w, h) / 12));
  for (let yy = y; yy < y1; yy += step) {
    for (let xx = x; xx < x1; xx += step) {
      const l = lumaAt(data, width, xx, yy);
      sum += l;
      sum2 += l * l;
      n += 1;
    }
  }
  if (n < 2) return 0;
  const mean = sum / n;
  return sum2 / n - mean * mean;
}

/** Adaptive blocks: keep big tiles on calm sky, split where the picture changes. */
export function adaptiveBlocks(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  minSize: number,
  threshold: number,
): Block[] {
  const out: Block[] = [];
  function walk(x: number, y: number, w: number, h: number) {
    const energy = regionEnergy(data, width, height, x, y, w, h);
    const canSplit = w >= minSize * 2 && h >= minSize * 2;
    if (canSplit && energy > threshold) {
      const hw = Math.floor(w / 2);
      const hh = Math.floor(h / 2);
      walk(x, y, hw, hh);
      walk(x + hw, y, w - hw, hh);
      walk(x, y + hh, hw, h - hh);
      walk(x + hw, y + hh, w - hw, h - hh);
      return;
    }
    out.push({ x, y, w, h });
  }
  const tile = 64;
  for (let y = 0; y < height; y += tile) {
    for (let x = 0; x < width; x += tile) {
      walk(x, y, Math.min(tile, width - x), Math.min(tile, height - y));
    }
  }
  return out;
}

export function gridBlocks(
  width: number,
  height: number,
  size: number,
): Block[] {
  const out: Block[] = [];
  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      out.push({
        x,
        y,
        w: Math.min(size, width - x),
        h: Math.min(size, height - y),
      });
    }
  }
  return out;
}
