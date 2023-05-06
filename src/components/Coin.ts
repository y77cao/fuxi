import { store } from "@/redux/store";

export enum SIDE {
  FRONT = 0,
  BACK,
}

export class Coin {
  x: number;
  y: number;
  side: SIDE;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.side = SIDE.FRONT;
  }

  toss(dt: number) {
    // Move the bubble in the direction of the mouse
    this.player.bubbleX +=
      dt * ANIMATION_SPEED * Math.cos(degToRad(this.player.bubbleAngle));
    this.player.bubbleY +=
      dt * ANIMATION_SPEED * -1 * Math.sin(degToRad(this.player.bubbleAngle));

    // Handle left and right collisions with the this.grid
    if (this.player.bubbleX <= this.grid.x) {
      // Left edge
      this.player.bubbleAngle = 180 - this.player.bubbleAngle;
      this.player.bubbleX = this.grid.x;
    } else if (
      this.player.bubbleX + this.grid.tileWidth >=
      this.grid.x + this.grid.width
    ) {
      // Right edge
      this.player.bubbleAngle = 180 - this.player.bubbleAngle;
      this.player.bubbleX = this.grid.x + this.grid.width - this.grid.tileWidth;
    }

    // Collisions with the top of the this.grid
    if (this.player.bubbleY <= this.grid.y) {
      // Top collision
      this.player.bubbleY = this.grid.y;
      return;
    }
  }

  render(context: CanvasRenderingContext2D) {
    const state = store.getState();
    const { animationAssets } = state.app;

    const asset = animationAssets[this.side].image;
    context.drawImage(asset, 0, 0, 270, 270, this.x, this.y, 32, 32);
  }
}
