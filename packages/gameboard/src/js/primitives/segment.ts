import Point from "./point";

import { lerp } from "../math/utils";

type SegmentRenderOptions = {
  width?: number;
  color?: string;
  dash?: Array<number>;
};

class Segment {
  p1: Point;
  p2: Point;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  includes(point: Point): boolean {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  equals(segment: Segment): boolean {
    return (
      (this.p1.equals(segment.p1) && this.p2.equals(segment.p2)) ||
      (this.p1.equals(segment.p2) && this.p2.equals(segment.p1))
    );
  }

  replace(pointToReplace: Point, replacement: Point): Segment {
    if (this.p1.equals(pointToReplace)) this.p1 = replacement;
    if (this.p2.equals(pointToReplace)) this.p2 = replacement;
    return this;
  }

  angleWithSegment(segment: Segment): number {
    const v1x = this.p1.x - this.p2.x;
    const v1y = this.p1.y - this.p2.y;
    const v2x = segment.p1.x - segment.p2.x;
    const v2y = segment.p1.y - segment.p2.y;
    const angle = Math.abs(
      Math.atan2(v1x * v2y - v1y * v2x, v1x * v2x + v1y * v2y)
    );
    return angle * (180 / Math.PI);
  }

  createPerpendicularSegment(point: Point, width: number) {
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;

    const perpDx = -dy;
    const perpDy = dx;

    const magnitude = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
    const unitDx = perpDx / magnitude;
    const unitDy = perpDy / magnitude;

    const halfWidth = width / 2;
    const p1 = new Point(
      point.x + unitDx * halfWidth,
      point.y + unitDy * halfWidth
    );
    const p2 = new Point(
      point.x - unitDx * halfWidth,
      point.y - unitDy * halfWidth
    );

    return new Segment(p1, p2);
  }

  set(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  getLength() {
    return Point.distance(this.p1, this.p2);
  }

  render(ctx: CanvasRenderingContext2D, renderOptions?: SegmentRenderOptions) {
    const { width = 2, color = "black", dash } = renderOptions || {};
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    if (dash) ctx.setLineDash(dash);
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

  static distanceFromSegment(seg1: Segment, seg2: Segment): number {
    const dist1 = Segment.distanceFromPoint(seg1.p1, seg2);
    const dist2 = Segment.distanceFromPoint(seg1.p2, seg2);
    const dist3 = Segment.distanceFromPoint(seg2.p1, seg1);
    const dist4 = Segment.distanceFromPoint(seg2.p2, seg1);
    return Math.min(dist1, dist2, dist3, dist4);
  }
}

export default Segment;
