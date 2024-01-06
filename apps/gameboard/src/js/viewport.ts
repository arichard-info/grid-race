import { isTrackpadWheelEvent } from "./dom/utils";
import Point from "./primitives/point";

class Viewport {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixelRatio: number;

  zoom: number;
  center: Point;
  offset: Point;
  drag: {
    start: Point;
    end: Point;
    offset: Point;
    active: boolean;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.pixelRatio = window.devicePixelRatio;

    this.zoom = 1;
    this.center = new Point(
      canvas.width / 2 / this.pixelRatio,
      canvas.height / 2 / this.pixelRatio
    );
    this.offset = Point.scale(this.center, -1);

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };

    this.#addEventListeners();
  }

  refresh() {
    this.ctx.setTransform(
      this.pixelRatio || 1,
      0,
      0,
      this.pixelRatio || 1,
      0,
      0
    );
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);
  }

  getMouse(event: MouseEvent, subtractDragOffset = false): Point {
    return this.getRelativePoint(
      { x: event.offsetX, y: event.offsetY },
      subtractDragOffset
    );
  }

  getRelativePoint(
    point: { x: number; y: number },
    subtractDragOffset = false
  ) {
    const p = new Point(
      (point.x - this.center.x) * this.zoom - this.offset.x,
      (point.y - this.center.y) * this.zoom - this.offset.y
    );
    return subtractDragOffset ? Point.subtract(p, this.drag.offset) : p;
  }

  getOffset(): Point {
    return Point.add(this.offset, this.drag.offset);
  }

  getBoundings(): { left: number; right: number; top: number; bottom: number } {
    const offset = this.getOffset();

    return {
      left: -this.center.x * this.zoom - offset.x,
      top: -this.center.y * this.zoom - offset.y,
      right: (this.canvas.width - this.center.x) * this.zoom - offset.x,
      bottom: (this.canvas.height - this.center.y) * this.zoom - offset.y,
    };
  }

  #addEventListeners() {
    this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
  }

  #handleMouseDown(event: MouseEvent) {
    if (event.button == 1) {
      // middle button
      this.drag.start = this.getMouse(event);
      this.drag.active = true;
    }
  }

  #handleMouseMove(event: MouseEvent) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(event);
      this.drag.offset = Point.subtract(this.drag.end, this.drag.start);
    }
  }

  #handleMouseUp() {
    if (this.drag.active) {
      this.offset = Point.add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }

  #handleMouseWheel(event: WheelEvent) {
    event.preventDefault();

    if (isTrackpadWheelEvent(event) && !event.ctrlKey) {
      this.offset = Point.subtract(
        this.offset,
        new Point(event.deltaX * 2, event.deltaY * 2)
      );
      return;
    }

    const dir = Math.sign(event.deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(0.3, Math.min(1.5, this.zoom));
  }
}

export default Viewport;
