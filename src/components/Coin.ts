import { ANIMATION_SPEED } from "@/constants";
import { Parabola } from "@/parabola";
import { store } from "@/redux/store";

export enum SIDE {
  FRONT = 0,
  BACK,
}

export class Coin {
  x: number;
  y: number;
  parabola?: Parabola;
  side: SIDE;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.side = SIDE.FRONT;
  }

  setParabola(parabola: Parabola) {
    this.parabola = parabola;
  }

  setSide(side: SIDE) {
    this.side = side;
  }

  toss(tframe: number) {
    if (!this.parabola) {
      return false;
    }
    const progress = Math.min(
      (tframe - this.parabola?.startT) / this.parabola?.duration,
      1
    );

    if (progress === 1) {
      return false;
    } else {
      const { x, y } = this.parabola?.calPosition(progress);
      this.x = x;
      this.y = y;

      return true;
    }
  }

  move(endX: number, endY: number) {
    const deltaX = endX - this.x;
    const deltaY = endY - this.y;
    this.x += 0.1 * deltaX;
    this.y += 0.1 * deltaY;

    if (this.x >= endX && this.y >= endY) {
      return false;
    }

    return true;
  }

  render(context: CanvasRenderingContext2D) {
    const state = store.getState();
    const { animationAssets } = state.app;

    const asset = animationAssets[this.side].image;
    context.drawImage(asset, 0, 0, 270, 270, this.x, this.y, 32, 32);
  }
}
