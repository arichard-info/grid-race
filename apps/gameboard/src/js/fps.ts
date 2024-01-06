import Viewport from "./viewport";

class FPS {
  viewport: Viewport;
  canvas: HTMLCanvasElement;

  fontSize: number;

  constructor(viewport: Viewport) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;

    this.fontSize = 18;
  }

  render(ctx: CanvasRenderingContext2D, value: number) {
    ctx.fillStyle = "#000";
    ctx.font = `bold ${this.fontSize * this.viewport.zoom}px Arial`;
    const position = this.viewport.getRelativePoint(
      {
        x: this.canvas.width - 50,
        y: this.canvas.height - 10,
      },
      true
    );
    ctx.fillText(value + "fps", position.x, position.y);
  }
}

export default FPS;
