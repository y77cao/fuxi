import { Coin } from "./Coin";
import { Parabola } from "../parabola";

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

  lastFrame: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = State.READY;
    this.coins = [];

    for (let i = 0; i < COIN_COUNT; i++) {
      this.coins.push(new Coin(40, this.canvas.height - 40));
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
    this.coins.forEach((coin) => {
      // todo randomize
      const parabola = new Parabola({
        startPos: { x: 40, y: this.canvas.height - 40 },
        endPos: { x: 120, y: this.canvas.height - 120 },
        startT: window.performance.now(),
        duration: 2000,
      });
      coin.setParabola(parabola);
    });

    this.setState(State.THROW);
  }

  tossCoins(tframe: number) {
    let ended = true;
    this.coins.forEach((coin) => {
      const inProgress = coin.toss(tframe);
      if (inProgress) ended = false;
    });

    if (ended) this.setState(State.DISPLAY);
  }

  update(tframe: number) {
    if (this.state == State.READY) {
    } else if (this.state == State.THROW) {
      this.tossCoins(tframe);
    } else if (this.state == State.DISPLAY) {
    } else if (this.state == State.RESET) {
    }
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.coins.forEach((coin) => {
      coin.render(this.context);
    });
  }
}
