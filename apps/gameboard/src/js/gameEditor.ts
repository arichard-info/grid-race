import Graph from "./geometry/graph";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
import Viewport from "./viewport";

const p1 = new Point(0, 0);
const p2 = new Point(259, 485);
const p3 = new Point(670, 430);

class GameEditor {
  viewport: Viewport;
  canvas: HTMLElement;
  graph: Graph;
  selectedPoint: null | Point;
  mouse: null | Point;

  constructor(viewport: Viewport) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = new Graph(
      [p1, p2, p3],
      [new Segment(p1, p2), new Segment(p2, p3)]
    );
    this.selectedPoint = null;
    this.mouse = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("contextmenu", (event) =>
      event.preventDefault()
    );
  }

  #handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    if (event.button == 0) {
      const newPoint = this.viewport.getMouse(event);
      this.graph.addPoint(newPoint);
      if (this.selectedPoint) {
        this.graph.addSegment(new Segment(this.selectedPoint, newPoint));
      }
      this.selectedPoint = newPoint;
      return;
    }

    if (event.button === 2) {
      this.selectedPoint = null;
    }
  }

  #handleMouseMove(event: MouseEvent) {
    this.mouse = this.viewport.getMouse(event, true);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.graph.render(ctx);
    if (this.selectedPoint) {
      new Segment(this.selectedPoint, this.mouse).render(ctx, { dash: [3, 3] });
      this.selectedPoint.render(ctx, { outline: true });
    }
  }
}

export default GameEditor;
