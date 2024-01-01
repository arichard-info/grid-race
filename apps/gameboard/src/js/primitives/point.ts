class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  render(
    ctx: CanvasRenderingContext2D,
    { size = 18, color = "black", outline = false, fill = false } = {}
  ) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (fill) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  }

  static add(p1: Point, p2: Point): Point {
    return new Point(p1.x + p2.x, p1.y + p2.y);
  }

  static subtract(p1: Point, p2: Point): Point {
    return new Point(p1.x - p2.x, p1.y - p2.y);
  }

  static scale(p: Point, scaler: number): Point {
    return new Point(p.x * scaler, p.y * scaler);
  }
}

export default Point;
