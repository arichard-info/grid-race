import Graph from "./geometry/graph";

import Point from "./primitives/point";
import Segment from "./primitives/segment";
import Envelope from "./primitives/envelope";

import Viewport from "./viewport";
import Track from "./track";

class TrackEditor {
  canvas: HTMLElement;
  viewport: Viewport;
  track: Track;
  graph: Graph;

  selectedPoint: null | Point;
  hoveredPoint: null | Point;
  mouse: null | Point;

  canAddMouseSegment: boolean;

  gap: number;

  constructor(viewport: Viewport, track: Track) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = track.graph;
    this.track = track;

    this.selectedPoint = null;
    this.hoveredPoint = null;

    this.mouse = null;
    this.canAddMouseSegment = false;

    this.gap = 10;

    this.#addEventListeners();
  }

  #addEventListeners = () => {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown);
    this.canvas.addEventListener("mousemove", this.#handleMouseMove);
    this.canvas.addEventListener("contextmenu", this.#handleContextMenu);
    window.addEventListener("keydown", this.#handleKeyDown);
  };

  #removeEventListeners = () => {
    this.canvas.removeEventListener("mousedown", this.#handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.#handleMouseMove);
    this.canvas.removeEventListener("contextmenu", this.#handleContextMenu);
    window.removeEventListener("keydown", this.#handleKeyDown);
  };

  #handleContextMenu = (event: Event) => {
    event.preventDefault();
  };

  #handleKeyDown = (event: KeyboardEvent) => {
    const key = event.which || event.keyCode || event.charCode;
    switch (key) {
      // Delete or Backspace key
      case 46:
      case 8: {
        if (this.selectedPoint && this.graph.isExtrimity(this.selectedPoint)) {
          this.#removePoint(this.selectedPoint);
          this.selectedPoint = null;
        }
        break;
      }
      case 27: {
        if (this.selectedPoint) {
          this.selectedPoint = null;
        }
      }
    }
  };

  #handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (event.button == 0) {
      if (this.hoveredPoint) {
        // TODO : implement dragging points
        this.selectedPoint = this.hoveredPoint;
        return;
      }

      if (this.graph.segments.length && !this.canAddMouseSegment) return;
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
      if (this.hoveredPoint && this.graph.isExtrimity(this.hoveredPoint)) {
        this.#removePoint(this.hoveredPoint);
      }
    }
  };

  #handleMouseMove = (event: MouseEvent) => {
    this.mouse = this.viewport.getMouse(event, true);
    this.hoveredPoint = Point.getNearest(this.mouse, this.graph.points, 20);
    this.canAddMouseSegment = this.#canAddSegment();
  };

  #removePoint = (point: Point) => {
    this.graph.removePoint(point);
  };

  #canAddSegment = (): boolean => {
    if (!this.selectedPoint || !this.mouse) return false;

    if (Point.distance(this.selectedPoint, this.mouse) < this.track.roadWidth) {
      return false;
    }

    const newSegment = new Segment(this.selectedPoint, this.mouse);

    for (const segment of this.graph.segments) {
      if (segment.includes(this.selectedPoint)) {
        continue;
      }

      if (
        Segment.distanceFromSegment(newSegment, segment) <=
        this.track.roadWidth + this.gap
      ) {
        return false;
      }
    }

    return true;
  };

  destroy = () => {
    this.#removeEventListeners();
  };

  render = (ctx: CanvasRenderingContext2D) => {
    this.graph.render(ctx);

    if (this.selectedPoint) {
      if (this.mouse) {
        if (
          this.graph.isExtrimity(this.selectedPoint) ||
          this.graph.points.length === 1
        ) {
          const previewSegment = new Segment(this.selectedPoint, this.mouse);
          previewSegment.render(ctx, { dash: [3, 3] });

          const envelopeStyle = {
            fill: this.canAddMouseSegment
              ? "rgba(71, 107, 237, 0.2)"
              : "rgba(237, 71, 71, 0.2)",
            stroke: this.canAddMouseSegment
              ? "rgba(71, 107, 237)"
              : "rgba(237, 71, 71)",
          };

          new Envelope(
            previewSegment,
            this.track.roadWidth,
            this.track.roadRoundness
          ).render(ctx, envelopeStyle);
        }
      }
      this.selectedPoint.render(ctx, { outline: true });
    }

    if (this.hoveredPoint) {
      if (this.graph.isExtrimity(this.hoveredPoint)) {
        this.viewport.canvas.style.cursor = "pointer";
      } else {
        this.viewport.canvas.style.cursor = "grab";
      }
      this.hoveredPoint?.render(ctx, { color: "#FFF", size: 10 });
    } else {
      this.viewport.canvas.style.cursor = "inherit";
    }
  };
}

export default TrackEditor;
