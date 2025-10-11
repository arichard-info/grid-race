import Graph from '../geometry/graph';
import Point from '../primitives/point';
import Segment from '../primitives/segment';
import Vector from '../primitives/vector';

class Player {
	private _id: string;
	private _color: string;
	private _trace: Graph;
	private _position?: Point;
	private _turns: number;

	constructor(id: string, color: string) {
		this._id = id;
		this._color = color;
		this._trace = new Graph();
		this._turns = 0;
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

	get turns(): number {
		return this._turns;
	}

	move(point: Point) {
		if (this._position) this._trace.addSegment(new Segment(this._position, point));
		this._trace.addPoint(point);
		this._position = point;
	}

	resetPosition() {
		this._position = undefined;
		this._trace = new Graph();
	}

	incrementTurns() {
		this._turns += 1;
	}

	getProjectedPosition() {
		if (!this._position) return null;
		const lastSegment = this._trace.segments[this._trace.segments.length - 1];
		const vector = lastSegment
			? new Vector(lastSegment.p2.x - lastSegment.p1.x, lastSegment.p2.y - lastSegment.p1.y)
			: new Vector(0, 0);
		return this._position.addVector(vector);
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
