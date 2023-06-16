import { COIN_ASSET_SIZE } from "@/constants";

export const loadImage = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = url;
  });

export const randRange = (low: number, high: number) => {
  return Math.floor(low + Math.random() * (high - low + 1));
};

export const drawCenterText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number
) => {
  var textdim = context.measureText(text);
  context.fillText(text, x + (width - textdim.width) / 2, y);
};

export const circleIntersection = (
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number
) => {
  var dx = x1 - x2;
  var dy = y1 - y2;
  var len = Math.sqrt(dx * dx + dy * dy);

  if (len < r1 + r2) {
    return true;
  }

  return false;
};

export const hasCollision = (
  existingCoords: { x: number; y: number }[],
  otherX: number,
  otherY: number
) => {
  for (let i = 0; i < existingCoords.length; i++) {
    const { x, y } = existingCoords[i];
    if (
      circleIntersection(
        otherX + COIN_ASSET_SIZE / 2,
        otherY + COIN_ASSET_SIZE / 2,
        COIN_ASSET_SIZE / 2,
        x + COIN_ASSET_SIZE / 2,
        y + COIN_ASSET_SIZE / 2,
        COIN_ASSET_SIZE / 2
      )
    ) {
      return true;
    }
  }

  return false;
};
