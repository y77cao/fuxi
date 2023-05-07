import { Coin, SIDE } from "./Coin";
import { Parabola } from "../parabola";
import { drawCenterText, randRange } from "@/utils";
import { store } from "@/redux/store";
import { roundEnded } from "@/redux/appReducer";

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

  lastFrame: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = State.READY;
    this.coins = [];

    for (let i = 0; i < COIN_COUNT; i++) {
      this.coins.push(
        new Coin(this.canvas.width / 2 + 30, this.canvas.height - 80)
      );
    }
    this.init();
  }

  setState(state: State) {
    this.state = state;
  }

  init() {
    this.animate(0);
  }

  animate(tframe: number) {
    // TODO cancel animation frame
    window.requestAnimationFrame(this.animate.bind(this));
    this.update(tframe);
    this.render();
  }

  startToss() {
    const border = 60;
    const coinLandingRangeMinX = border;
    const coinLandingRangeMaxX = this.canvas.width - border;
    const coinLandingRangeMinY = border;
    const coinLandingRangeMaxY = (this.canvas.height / 3) * 2;

    const cache = new Set();

    for (let i = 0; i < COIN_COUNT; i++) {
      const coin = this.coins[i];

      const endPos = {
        x: randRange(coinLandingRangeMinX, coinLandingRangeMaxX),
        y: randRange(coinLandingRangeMinY, coinLandingRangeMaxY),
      };
      while (cache.has(JSON.stringify(endPos))) {
        endPos.x = randRange(coinLandingRangeMinX, coinLandingRangeMaxX);
        endPos.y = randRange(coinLandingRangeMinY, coinLandingRangeMaxY);
      }
      cache.add(JSON.stringify(endPos));

      const duration = randRange(400, 800);

      const parabola = new Parabola({
        startPos: { x: coin.x, y: coin.y },
        endPos,
        startT: window.performance.now(),
        duration,
      });

      const side = Math.round(Math.random()) ? SIDE.FRONT : SIDE.BACK;

      coin.setSide(side);
      coin.setParabola(parabola);
    }

    store.dispatch(
      roundEnded({
        coinTossResult: this.coins.map((coin) => coin.side),
      })
    );
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
        this.canvas.width / 2 + 30,
        this.canvas.height - 140
      );
      if (inProgress) ended = false;
    });
    if (ended) this.setState(State.READY);
  }

  update(tframe: number) {
    if (this.state == State.READY) {
    } else if (this.state == State.THROW) {
      this.tossCoins(tframe);
    } else if (this.state == State.DISPLAY) {
      if (tframe - this.displayStartT > 3000) {
        this.setState(State.RESET);
      }
    } else if (this.state == State.RESET) {
      this.resetCoins(tframe);
    }
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.coins.forEach((coin) => {
      coin.render(this.context);
    });

    if (this.state == State.DISPLAY) {
      drawCenterText(
        this.context,
        "blalalala",
        0,
        this.canvas.height / 2,
        this.canvas.width
      );
    }
  }
}
