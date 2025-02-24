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

  equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
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

  static translate(loc: Point, angle: number, offset: number): Point {
    return new Point(
      loc.x + Math.cos(angle) * offset,
      loc.y + Math.sin(angle) * offset
    );
  }

  static angle(p: Point): number {
    return Math.atan2(p.y, p.x);
  }

  static average(p1: Point, p2: Point): Point {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  }

  static distance(p1: Point, p2: Point): number {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  }

  static getNearest(
    basePoint: Point,
    points: Point[],
    threshold = Number.MAX_SAFE_INTEGER
  ): Point | null {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for (const point of points) {
      const dist = Point.distance(point, basePoint);
      if (dist < minDist && dist < threshold) {
        minDist = dist;
        nearest = point;
      }
    }
    if (nearest) return nearest;
    return null;
  }
}

export default Point;
