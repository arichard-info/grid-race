import Graph from "./geometry/graph";

import Envelope from "./primitives/envelope";
import Segment from "./primitives/segment";
import Polygon from "./primitives/polygon";
import Point from "./primitives/point";

class Track {
  graph: Graph;
  envelopes: Envelope[];
  roadBorders: Segment[];

  startPoint?: Point;
  endPoint?: Point;
  startLine?: Segment;
  finishLine?: Segment;

  roadWidth: number;
  roadRoundness: number;

  constructor(graph: Graph, startPoint?: Point, endPoint?: Point) {
    this.graph = graph;

    this.startPoint = startPoint;
    this.endPoint = endPoint;

    this.roadWidth = 200;
    this.roadRoundness = 30;

    this.envelopes = [];
    this.roadBorders = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadWidth, this.roadRoundness)
      );
    }

    this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));

    if (this.startPoint) {
      const startSegment = this.graph.segments.find((s) =>
        s.includes(this.startPoint as Point)
      );
      this.startLine = startSegment?.createPerpendicularSegment(
        this.startPoint,
        this.roadWidth
      );
    }

    if (this.endPoint) {
      const finishSegment = this.graph.segments.find((s) =>
        s.includes(this.endPoint as Point)
      );
      this.finishLine = finishSegment?.createPerpendicularSegment(
        this.endPoint,
        this.roadWidth
      );
    }
  }

  setStartPoint(point: Point) {
    this.startPoint = point;
  }

  setEndPoint(point: Point) {
    this.endPoint = point;
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const env of this.envelopes) {
      env.render(ctx, { fill: "#FFF", stroke: "#FFF", lineWidth: 0 });
    }

    if (this.startLine) {
      this.startLine.render(ctx, { color: "green", width: 8 });
    }

    if (this.finishLine) {
      this.finishLine.render(ctx, { color: "tomato", width: 8 });
    }

    for (const seg of this.roadBorders) {
      seg.render(ctx, { color: "#000", width: 3 });
    }
  }
}

export default Track;
