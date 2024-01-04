import Point from "./point";

import { lerp } from "../math/utils";

class Segment {
  p1: Point;
  p2: Point;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  render(
    ctx: CanvasRenderingContext2D,
    { width = 2, color = "black", dash = [] } = {}
  ) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  static getIntersection(seg1: Segment, seg2: Segment) {
    const A = seg1.p1;
    const B = seg1.p2;
    const C = seg2.p1;
    const D = seg2.p2;

    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
      const t = tTop / bottom;
      const u = uTop / bottom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
          x: lerp(A.x, B.x, t),
          y: lerp(A.y, B.y, t),
          offset: t,
        };
      }
    }

    return null;
  }

  static distanceFromPoint(point: Point, segment: Segment): number {
    const { p1, p2 } = segment;
    const A = point.x - p1.x;
    const B = point.y - p1.y;
    const C = p2.x - p1.x;
    const D = p2.y - p1.y;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;

    if (len_sq !== 0) param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
      xx = p1.x;
      yy = p1.y;
    } else if (param > 1) {
      xx = p2.x;
      yy = p2.y;
    } else {
      xx = p1.x + param * C;
      yy = p1.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export default Segment;
