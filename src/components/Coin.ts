import { ANIMATION_SPEED } from "@/constants";
import { Parabola } from "@/parabola";
import { store } from "@/redux/store";
import { projectileTrajectoryWithAngle } from "@/utils";

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

  toss(tframe: number) {
    if (!this.parabola) {
      return false;
    }
    const progress = Math.min(
      (tframe - this.parabola?.startT) / this.parabola?.duration,
      1
    );

    console.log({
      tframe,
      startT: this.parabola?.startT,
      duration: this.parabola?.duration,
      progress,
    });
    if (progress === 1) {
      return false;
    } else {
      const { x, y } = this.parabola?.calPosition(progress);
      this.x = x;
      this.y = y;

      console.log({ x, y });

      return true;
    }
  }

  render(context: CanvasRenderingContext2D) {
    const state = store.getState();
    const { animationAssets } = state.app;

    const asset = animationAssets[this.side].image;
    context.drawImage(asset, 0, 0, 270, 270, this.x, this.y, 32, 32);
  }
}
