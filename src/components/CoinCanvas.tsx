import { Coin } from "./Coin";

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

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = State.READY;
    this.coins = [];

    for (let i = 0; i < COIN_COUNT; i++) {
      this.coins.push(new Coin(this.canvas.width / 2, this.canvas.height - 40));
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

  update(tframe: number) {
    if (this.state == State.READY) {
    } else if (this.state == State.THROW) {
    } else if (this.state == State.DISPLAY) {
    } else if (this.state == State.RESET) {
    }
  }

  render() {
    this.coins.forEach((coin) => {
      coin.render(this.context);
    });
  }
}
