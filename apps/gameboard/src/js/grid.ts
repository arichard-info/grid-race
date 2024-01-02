import Point from "./primitives/point";
import Viewport from "./viewport";

class Grid {
  viewport: Viewport;

  constructor(viewport: Viewport) {
    this.viewport = viewport;
  }

  render(ctx: CanvasRenderingContext2D) {
    //TODO : partir du centre plutôt que du coint en haut à gauche

    const size = 3;
    const rad = size / 2;

    const boundings = this.viewport.getBoundings();
    const offset = this.viewport.getOffset();
    for (let x = boundings[0] + (offset.x % 20); x < boundings[2]; x += 20) {
      ctx.beginPath();
      for (let y = boundings[1] + (offset.y % 20); y < boundings[3]; y += 20) {
        ctx.arc(x, y, rad, 0, Math.PI * 2);
      }
      ctx.fillStyle = "#757575";
      ctx.fill();
    }

  }
}

export default Grid;
