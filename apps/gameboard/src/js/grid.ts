import Viewport from "./viewport";

class Grid {
  viewport: Viewport;
  cellSize: number;
  dotSize: number;

  constructor(viewport: Viewport, { cellSize = 20, dotSize = 3 } = {}) {
    this.viewport = viewport;
    this.cellSize = cellSize;
    this.dotSize = dotSize;
  }

  render(ctx: CanvasRenderingContext2D) {
    const boundings = this.viewport.getBoundings();
    const minX = Math.ceil(boundings[0] / this.cellSize) * this.cellSize;
    const minY = Math.ceil(boundings[1] / this.cellSize) * this.cellSize;

    for (let x = minX; x < boundings[2]; x += this.cellSize) {
      ctx.beginPath();
      for (let y = minY; y < boundings[3]; y += this.cellSize) {
        ctx.arc(x, y, this.dotSize / 2, 0, Math.PI * 2);
      }
      ctx.fillStyle = "#757575";
      ctx.fill();
    }
  }
}

export default Grid;
