import Graph from "./geometry/graph";

import Envelope from "./primitives/envelope";
import Segment from "./primitives/segment";

import Viewport from "./viewport";
import Polygon from "./primitives/polygon";
import Background from "./background";

class Gameboard {
  background: Background;
  graph: Graph;
  envelopes: Envelope[];
  roadBorders: Segment[];

  roadWidth: number;
  roadRoundness: number;

  constructor(viewport: Viewport, graph: Graph) {
    this.background = new Background(viewport);
    this.graph = graph;

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
  }

  render(ctx: CanvasRenderingContext2D) {
    this.background.render(ctx);

    for (const env of this.envelopes) {
      env.render(ctx, { fill: "#FFF", stroke: "#FFF", lineWidth: 0 });
    }
    for (const seg of this.roadBorders) {
      seg.render(ctx, { color: "#000", width: 3 });
    }
  }
}

export default Gameboard;
