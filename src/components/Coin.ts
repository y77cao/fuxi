"use client";

import { Parabola } from "@/utils/parabola";
import { store } from "@/redux/store";

export enum SIDE {
  HEAD = 0, // ying
  TAIL, // yang
}

export class Coin {
  x: number;
  y: number;
  alpha: number = 0;
  parabola?: Parabola;
  side: SIDE;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.side = SIDE.HEAD;
  }

  setParabola(parabola: Parabola) {
    this.parabola = parabola;
  }

  setSide(side: SIDE) {
    this.side = side;
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toss(tframe: number) {
    if (!this.parabola) {
      return false;
    }
    const progress = Math.min(
      (tframe - this.parabola?.startT) / this.parabola?.duration,
      1
    );
    if (this.alpha < 1) {
      this.alpha += 0.1;
    }
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
    this.alpha -= 0.1;
    if (this.alpha < 0) {
      this.alpha = 0;
      this.x = endX;
      this.y = endY;
    }

    if (this.alpha === 0) {
      return false;
    }

    return true;
  }

  render(context: CanvasRenderingContext2D, coinSize: number) {
    const state = store.getState();
    const { animationAssets } = state.app;

    const asset = animationAssets[this.side].image;
    context.globalAlpha = this.alpha;
    context.drawImage(
      asset,
      0,
      0,
      512,
      512,
      this.x,
      this.y,
      coinSize,
      coinSize
    );
  }
}
