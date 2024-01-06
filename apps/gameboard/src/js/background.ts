import Viewport from "./viewport";

class Background {
  viewport: Viewport;

  constructor(viewport: Viewport) {
    this.viewport = viewport;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#E5E5E5";

    const boundings = this.viewport.getBoundings();
    ctx.fillRect(
      boundings.left,
      boundings.top,
      boundings.right - boundings.left,
      boundings.bottom - boundings.top
    );
  }
}

export default Background;
