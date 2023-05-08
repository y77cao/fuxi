import { GRAVITY } from "../constants";

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
