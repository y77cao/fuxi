import { GRAVITY } from "./constants";

export const loadImage = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = url;
  });

export const radToDeg = (angle: number) => {
  return angle * (180 / Math.PI);
};

// Convert degrees to radians
export const degToRad = (angle: number) => {
  return angle * (Math.PI / 180);
};

export const projectileTrajectoryWithAngle = (
  x: number,
  y: number,
  vx: number,
  vy: number,
  angle: number,
  step: number
): {
  x: number;
  y: number;
  vx: number;
  vy: number;
} => {
  const angleRadians = degToRad(angle);
  const velocityX = vx * Math.cos(angleRadians);
  const velocityY = vy * Math.sin(angleRadians);

  // Calculate the next position after the time step
  const nextX = x + velocityX * step;
  const nextY = y + velocityY * -1 * step + 0.5 * GRAVITY * step * step;

  // Calculate the new velocities after the time step
  const newVx = velocityX;
  const newVy = velocityY - GRAVITY * step;

  return {
    x: nextX,
    y: nextY,
    vx: newVx,
    vy: newVy,
  };
};
