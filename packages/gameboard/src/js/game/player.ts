import Graph from '../geometry/graph';
import Point from '../primitives/point';
import Segment from '../primitives/segment';

class Player {
	private _id: string;
	private _color: string;
	private _trace: Graph;
	private _position?: Point;

	constructor(id: string, color: string) {
		this._id = id;
		this._color = color;
		this._trace = new Graph();
	}

	get trace() {
		return this._trace;
	}

	get id() {
		return this._id;
	}

	get color() {
		return this._color;
	}

	get position(): Point | undefined {
		return this._position;
	}

	move(point: Point) {
		if (this._position) this._trace.addSegment(new Segment(this._position, point));
		this._trace.addPoint(point);
		this._position = point;
	}

	render(ctx: CanvasRenderingContext2D) {
		this.trace.render(
			ctx,
			{ color: `#${this._color}`, width: 4 },
			{ color: `#${this._color}`, size: 4 }
		);
	}
}

export default Player;
