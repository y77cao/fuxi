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

export const GRAVITY = 9.8;
export const ANIMATION_SPEED = 1000;

export const projectileTrajectoryWithAngle = (
  x: number,
  y: number,
  speed: number,
  angle: number,
  step: number
) => {
  const angleRadians = degToRad(angle);
  const vx = speed * Math.cos(angleRadians);
  const vy = speed * Math.sin(angleRadians) * -1;

  // Calculate the next position after the time step
  const nextX = x + vx * step;
  const nextY = y + vy * step - 0.5 * GRAVITY * step * step;

  // Calculate the new velocities after the time step
  const newVx = vx;
  const newVy = vy - GRAVITY * step;

  // Calculate the new speed
  const newSpeed = Math.sqrt(newVx * newVx + newVy * newVy);

  return {
    x: nextX,
    y: nextY,
    speed: newSpeed,
  };
};
