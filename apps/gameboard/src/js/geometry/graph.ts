import Point from "../primitives/point";
import Segment from "../primitives/segment";

class Graph {
  points: Point[];
  segments: Segment[];

  constructor(points: Point[] = [], segments: Segment[] = []) {
    this.points = points;
    this.segments = segments;
  }

  hash() {
    return JSON.stringify(this);
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  removePoint(point: Point) {
    const segments = this.getSegmentsWithPoint(point);
    for (const segment of segments) {
      this.removeSegment(segment);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  removeSegment(segment: Segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  addSegment(segment: Segment) {
    this.segments.push(segment);
  }

  getSegmentsWithPoint(point: Point): Segment[] {
    const segments = [];
    for (const segment of this.segments) {
      if (segment.includes(point)) {
        segments.push(segment);
      }
    }
    return segments;
  }

  isExtrimity(point: Point): boolean {
    let count = 0;
    for (const segment of this.segments) {
      if (segment.p1 == point || segment.p2 == point) count++;
    }
    return count === 1;
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const seg of this.segments) {
      seg.render(ctx);
    }

    for (const point of this.points) {
      point.render(ctx);
    }
  }
}

export default Graph;
