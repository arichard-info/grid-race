import Graph from '../geometry/graph';

class Player {
	private _id: string;
	private _color: string;
	private _trace: Graph;

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

	render(ctx: CanvasRenderingContext2D) {
		this.trace.render(ctx);
	}
}

export default Player;
