"use client";

import { Coin, SIDE } from "./Coin";
import { Parabola } from "../utils/parabola";
import { drawCenterText, hasCollision, randRange } from "@/utils/index";
import { store } from "@/redux/store";
import { animationEnded, roundEnded } from "@/redux/appReducer";
import { COIN_ASSET_SIZE } from "@/constants";

export enum State {
  READY,
  THROW,
  DISPLAY,
  RESET,
}

const COIN_COUNT = 3;

export class CoinCanvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: State;
  coins: Coin[];
  displayStartT: number = 0;
  animationRequestId: number = 0;

  lastFrame: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = State.READY;
    this.coins = [];

    window?.addEventListener("resize", () => this.resize());

    for (let i = 0; i < COIN_COUNT; i++) {
      this.coins.push(
        new Coin(
          this.canvas.width / 2 - COIN_ASSET_SIZE / 2,
          this.canvas.height - 2 * COIN_ASSET_SIZE
        )
      );
    }
    this.startAnimation();
  }

  setState(state: State) {
    this.state = state;
  }

  startAnimation() {
    this.animate(0);
  }

  animate(tframe: number) {
    // TODO cancel animation frame
    const animationRequestId = window.requestAnimationFrame(
      this.animate.bind(this)
    );
    this.animationRequestId = animationRequestId;
    this.update(tframe);
    this.render();
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.animationRequestId);
  }

  startToss() {
    const border = COIN_ASSET_SIZE;
    const coinLandingRangeMinX = border;
    const coinLandingRangeMaxX = this.canvas.width - border;
    const coinLandingRangeMinY = border;
    const coinLandingRangeMaxY = this.canvas.height - 420;

    const existingCoords = [];

    for (let i = 0; i < COIN_COUNT; i++) {
      const coin = this.coins[i];

      const endPos = {
        x: randRange(coinLandingRangeMinX, coinLandingRangeMaxX),
        y: randRange(coinLandingRangeMinY, coinLandingRangeMaxY),
      };
      while (hasCollision(existingCoords, endPos.x, endPos.y)) {
        endPos.x = randRange(coinLandingRangeMinX, coinLandingRangeMaxX);
        endPos.y = randRange(coinLandingRangeMinY, coinLandingRangeMaxY);
      }
      existingCoords.push({ ...endPos });

      const duration = randRange(300, 500);

      const parabola = new Parabola({
        startPos: { x: coin.x, y: coin.y },
        endPos,
        startT: window.performance.now(),
        duration,
      });

      const side = Math.round(Math.random()) ? SIDE.HEAD : SIDE.TAIL;

      coin.setSide(side);
      coin.setParabola(parabola);
    }
    this.setState(State.THROW);
  }

  tossCoins(tframe: number) {
    let ended = true;
    this.coins.forEach((coin) => {
      const inProgress = coin.toss(tframe);
      if (inProgress) ended = false;
    });

    if (ended) {
      this.displayStartT = tframe;
      this.setState(State.DISPLAY);
    }
  }

  resetCoins(tframe: number) {
    let ended = true;
    this.coins.forEach((coin) => {
      const inProgress = coin.move(
        this.canvas.width / 2 - COIN_ASSET_SIZE / 2,
        this.canvas.height - 2 * COIN_ASSET_SIZE
      );
      if (inProgress) ended = false;
    });
    if (ended) {
      this.setState(State.READY);
      store.dispatch(
        roundEnded({
          coinTossResult: this.coins.map((coin) => coin.side),
        })
      );
      store.dispatch(animationEnded());
    }
  }

  update(tframe: number) {
    if (this.state == State.READY) {
    } else if (this.state == State.THROW) {
      this.tossCoins(tframe);
    } else if (this.state == State.DISPLAY) {
      if (tframe - this.displayStartT > 2000) {
        this.setState(State.RESET);
      }
    } else if (this.state == State.RESET) {
      this.resetCoins(tframe);
    }
  }

  resize() {
    this.canvas.width = window?.innerWidth;
    this.canvas.height = window?.innerHeight;

    if (this.state === State.READY) {
      this.coins.forEach((coin) => {
        coin.setPos(
          this.canvas.width / 2 - COIN_ASSET_SIZE / 2,
          this.canvas.height - 2 * COIN_ASSET_SIZE
        );
      });
    }
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.coins.forEach((coin) => {
      coin.render(this.context);
    });

    if (this.state == State.DISPLAY) {
      // drawCenterText(
      //   this.context,
      //   "blalalala",
      //   0,
      //   this.canvas.height / 2,
      //   this.canvas.width
      // );
    }
  }
}
