import Point, { PointRenderOptions } from '../primitives/point';
import Segment, { SegmentRenderOptions } from '../primitives/segment';

export type GraphDataObject = {
	points: { x: number; y: number }[];
	segments: { p1: { x: number; y: number }; p2: { x: number; y: number } }[];
};

class Graph {
	private _points: Point[];
	private _segments: Segment[];

	constructor(points: Point[] = [], segments: Segment[] = []) {
		this._points = points;
		this._segments = segments;
	}

	clone(): Graph {
		return new Graph(this._points, this._segments);
	}

	get points() {
		return this._points;
	}

	get segments() {
		return this._segments;
	}

	setPoints(points: Array<Point>) {
		this._points = points;
	}

	hash() {
		return JSON.stringify(this);
	}

	addPoint(point: Point) {
		this._points.push(point);
	}

	replacePoint(initialPoint: Point, newPoint: Point) {
		for (const segment of this._segments) {
			if (segment.p1.equals(initialPoint)) {
				segment.set(newPoint, segment.p2);
			}

			if (segment.p2.equals(initialPoint)) {
				segment.set(segment.p1, newPoint);
			}
		}

		const index = this._points.indexOf(initialPoint);
		if (index !== -1) this._points[index] = newPoint;
	}

	removePoint(point: Point) {
		const segments = this.getSegmentsWithPoint(point);
		for (const segment of segments) {
			this.removeSegment(segment);
		}
		this._points.splice(this._points.indexOf(point), 1);
	}

	removeSegment(segment: Segment) {
		this._segments.splice(this._segments.indexOf(segment), 1);
	}

	addSegment(segment: Segment) {
		this._segments.push(segment);
	}

	getSegmentsWithPoint(point: Point): Segment[] {
		const segments = [];
		for (const segment of this._segments) {
			if (segment.includes(point)) {
				segments.push(segment);
			}
		}
		return segments;
	}

	isExtrimity(point: Point): boolean {
		let count = 0;
		for (const segment of this._segments) {
			if (segment.p1 == point || segment.p2 == point) count++;
		}
		return count === 1;
	}

	render(
		ctx: CanvasRenderingContext2D,
		segmentOptions?: SegmentRenderOptions,
		pointsRenderOptions?: PointRenderOptions
	) {
		for (const seg of this._segments) {
			seg.render(ctx, segmentOptions);
		}

		for (const point of this._points) {
			point.render(ctx, pointsRenderOptions);
		}
	}

	static load(graphData: GraphDataObject): Graph {
		const points = graphData.points.map((i) => new Point(i.x, i.y));
		const segments = graphData.segments.map(
			(i) =>
				new Segment(points.find((p) => p == i.p1) as Point, points.find((p) => p == i.p2) as Point)
		);
		return new Graph(points, segments);
	}
}

export default Graph;
