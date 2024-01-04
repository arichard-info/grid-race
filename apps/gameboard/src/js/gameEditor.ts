import Graph from "./geometry/graph";

import Point from "./primitives/point";
import Segment from "./primitives/segment";

import Viewport from "./viewport";
import Gameboard from "./gameboard";
class GameEditor {
  canvas: HTMLElement;
  viewport: Viewport;
  gameboard: Gameboard;
  graph: Graph;
  selectedPoint: null | Point;
  mouse: null | Point;

  canAddMousePoint: boolean;

  constructor(viewport: Viewport, gameboard: Gameboard) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = gameboard.graph;
    this.gameboard = gameboard;
    this.selectedPoint = null;
    this.mouse = null;
    this.canAddMousePoint = false;

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
      if (!this.canAddMousePoint) return;
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
    this.canAddMousePoint = this.#allowNewPoint(this.mouse);
  }

  #allowNewPoint(point: Point): boolean {
    // TODO : Ne pas se baser uniquement sur le point, mais sur l'ensemble du nouveau segment
    return this.gameboard.roadBorders.every(
      (segmentBorder) =>
        Segment.distanceFromPoint(point, segmentBorder) >
        this.gameboard.roadWidth
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    this.graph.render(ctx);
    if (this.selectedPoint) {
      if (this.mouse) {
        new Segment(this.selectedPoint, this.mouse).render(ctx, {
          dash: [3, 3],
        });
      }
      this.selectedPoint.render(ctx, { outline: true });
    }
  }
}

export default GameEditor;
