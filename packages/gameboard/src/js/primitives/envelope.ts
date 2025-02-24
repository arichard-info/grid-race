import Point from "./point";
import Polygon from "./polygon";

class Envelope {
  skeleton: { p1: Point; p2: Point };
  poly: Polygon;

  constructor(
    skeleton: { p1: Point; p2: Point },
    width: number,
    roundness = 1
  ) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width, roundness);
  }

  #generatePolygon(width: number, roundness: number) {
    const { p1, p2 } = this.skeleton;

    const radius = width / 2;
    const alpha = Point.angle(Point.subtract(p1, p2));
    const alpha_cw = alpha + Math.PI / 2;
    const alpha_ccw = alpha - Math.PI / 2;

    const points = [];
    const step = Math.PI / Math.max(1, roundness);
    const eps = step / 2;
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(Point.translate(p1, i, radius));
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(Point.translate(p2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  render(ctx: CanvasRenderingContext2D, options = {}) {
    this.poly.render(ctx, options);
  }
}

export default Envelope;
