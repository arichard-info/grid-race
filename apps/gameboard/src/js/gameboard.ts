import Graph from "./geometry/graph";

import Envelope from "./primitives/envelope";
import Segment from "./primitives/segment";

import Grid from "./grid";
import Viewport from "./viewport";
import Polygon from "./primitives/polygon";

class Gameboard {
  grid: Grid;
  graph: Graph;
  envelopes: Envelope[];
  roadBorders: Segment[];

  roadWidth: number;
  roadRoundness: number;

  constructor(viewport: Viewport, graph: Graph) {
    this.grid = new Grid(viewport);
    this.graph = graph;

    this.roadWidth = 200;
    this.roadRoundness = 10;

    this.envelopes = [];
    this.roadBorders = [];

    this.#generate();
  }

  #generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadWidth, this.roadRoundness)
      );
    }

    this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
  }

  render(ctx: CanvasRenderingContext2D) {
    this.grid.render(ctx);

    this.#generate();

    for (const env of this.envelopes) {
      env.render(ctx, { fill: "#BBB", stroke: "#BBB", lineWidth: 15 });
    }
    for (const seg of this.graph.segments) {
      seg.render(ctx, { color: "white", width: 4, dash: [10, 10] });
    }
    for (const seg of this.roadBorders) {
      seg.render(ctx, { color: "white", width: 4 });
    }
  }
}

export default Gameboard;
