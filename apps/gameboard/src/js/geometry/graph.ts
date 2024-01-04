import Point from "../primitives/point";
import Segment from "../primitives/segment";

class Graph {
  points: Point[];
  segments: Segment[];

  constructor(points: Point[] = [], segments: Segment[] = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  addSegment(segment: Segment) {
    this.segments.push(segment);
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
