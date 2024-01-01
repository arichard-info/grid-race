import Point from "./primitives/point";

class Viewport {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

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

    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
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
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);

    //console.log(this);
  }

  getMouse(event: MouseEvent, subtractDragOffset = false) {
    const p = new Point(
      (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      (event.offsetY - this.center.y) * this.zoom - this.offset.y
    );
    return subtractDragOffset ? Point.subtract(p, this.drag.offset) : p;
  }

  getOffset() {
    return Point.add(this.offset, this.drag.offset);
  }

  getBoundings() {
    const offset = this.getOffset();
    return [
      -this.center.x * this.zoom - offset.x,
      -this.center.y * this.zoom - offset.y,
      (this.canvas.width - this.center.x) * this.zoom - offset.x,
      (this.canvas.height - this.center.y) * this.zoom - offset.y,
    ];
  }

  #addEventListeners() {
    this.canvas.addEventListener(
      "mousewheel",
      this.#handleMouseWheel.bind(this)
    );
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

  #handleMouseWheel(event: Event) {
    const dir = Math.sign((event as WheelEvent).deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }
}

export default Viewport;
