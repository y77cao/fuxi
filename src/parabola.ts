type Position = {
  x: number;
  y: number;
};

type ParabolaOptions = {
  startPos: Position;
  endPos: Position;
  curvature?: number;
  duration: number;
  startT: number;
};

// Modified from https://github.com/xiaolin3303/JavaScript-parabola-trajectory
// I don't understand this but it works thank you GPT4
export class Parabola {
  startPos: Position;
  endPos: Position;
  curvature: number;
  duration: number;
  startT: number;
  deltaX: number;
  deltaY: number;
  b: number;

  constructor(opts: ParabolaOptions) {
    this.startPos = opts.startPos;
    this.endPos = opts.endPos;
    this.duration = opts.duration;
    this.startT = opts.startT;
    this.deltaX = this.endPos.x - this.startPos.x;
    this.deltaY = this.endPos.y - this.startPos.y;

    const yMin = -1 * this.startPos.y;

    const a = Math.pow(this.deltaX, 4);
    const b = (4 * yMin - 2 * this.deltaY) * Math.pow(this.deltaX, 2);
    const c = Math.pow(this.deltaY, 2);

    this.curvature = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    this.b =
      (this.deltaY - this.curvature * this.deltaX * this.deltaX) / this.deltaX;
  }

  calPosition(progress: number): Position {
    const x = this.deltaX * progress;
    const y = this.curvature * x * x + this.b * x;

    return {
      x: Math.round(x + this.startPos.x),
      y: Math.round(y + this.startPos.y),
    };
  }
}
