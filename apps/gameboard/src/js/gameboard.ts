import Grid from "./grid";
import Viewport from "./viewport";

class Gameboard {
  grid: Grid;

  constructor(viewport: Viewport) {
    this.grid = new Grid(viewport);
  }

  render(ctx: CanvasRenderingContext2D) {
   this.grid.render(ctx);
  }
}

export default Gameboard;
