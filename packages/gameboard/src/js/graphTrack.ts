import Graph from './geometry/graph';

import Envelope from './primitives/envelope';
import Segment from './primitives/segment';
import Polygon from './primitives/polygon';
import Point from './primitives/point';
import Grid from './grid';

class GraphTrack {
	graph: Graph;
	envelopes: Envelope[];
	roadBorders: Segment[];

	startPoint?: Point;
	endPoint?: Point;
	startLine?: Segment;
	finishLine?: Segment;

	roadWidth: number;
	roadRoundness: number;

	constructor(graph: Graph, startPoint?: Point, endPoint?: Point) {
		this.graph = graph;

		this.startPoint = startPoint;
		this.endPoint = endPoint;

		this.roadWidth = 200;
		this.roadRoundness = 30;

		this.envelopes = [];
		this.roadBorders = [];

		this.generate();
	}

	generate() {
		this.envelopes.length = 0;
		for (const seg of this.graph.segments) {
			this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness));
		}

		this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));

		if (this.startPoint) {
			const startSegment = this.graph.segments.find((s) => s.includes(this.startPoint as Point));
			this.startLine = startSegment?.createPerpendicularSegment(this.startPoint, this.roadWidth);
		}

		if (this.endPoint) {
			const finishSegment = this.graph.segments.find((s) => s.includes(this.endPoint as Point));
			this.finishLine = finishSegment?.createPerpendicularSegment(this.endPoint, this.roadWidth);
		}
	}

	setStartPoint(point: Point) {
		this.startPoint = point;
	}

	setEndPoint(point: Point) {
		this.endPoint = point;
	}

	getStartGrid(grid: Grid): Array<Point> {
		if (!this.startPoint) return [];
		const startSegment = this.graph.segments.find((s) => s.includes(this.startPoint as Point));
		if (!startSegment) return [];

		const radiusPadding = 5;
		const radius = this.roadWidth / 2 - radiusPadding;
		const cellSize = grid.cellSize;

		const startX = Math.floor((this.startPoint.x - radius) / cellSize) * cellSize;
		const endX = Math.ceil((this.startPoint.x + radius) / cellSize) * cellSize;
		const startY = Math.floor((this.startPoint.y - radius) / cellSize) * cellSize;
		const endY = Math.ceil((this.startPoint.y + radius) / cellSize) * cellSize;

		const points: Array<{ point: Point; distanceFromStart: number }> = [];

		const dx = startSegment.p2.x - startSegment.p1.x;
		const dy = startSegment.p2.y - startSegment.p1.y;

		// Get the perpendicular
		const normalX = -dx;
		const normalY = -dy;

		for (let x = startX; x <= endX; x += cellSize) {
			for (let y = startY; y <= endY; y += cellSize) {
				const distance = Math.sqrt((x - this.startPoint.x) ** 2 + (y - this.startPoint.y) ** 2);
				if (distance <= radius) {
					// Ensure that the point is "behind" the perpendicular
					const vectorToPointX = x - this.startPoint.x;
					const vectorToPointY = y - this.startPoint.y;
					const dotProduct = vectorToPointX * normalX + vectorToPointY * normalY;

					if (dotProduct > 0) {
						points.push({
							point: new Point(x, y),
							distanceFromStart: distance
						});
					}
				}
			}
		}

		return points.sort((a, b) => a.distanceFromStart - b.distanceFromStart).map((p) => p.point);
	}

	render(ctx: CanvasRenderingContext2D) {
		for (const env of this.envelopes) {
			env.render(ctx, { fill: '#FFF', stroke: '#FFF', lineWidth: 0 });
		}

		if (this.startLine) {
			this.startLine.render(ctx, { color: 'green', width: 8 });
		}

		if (this.finishLine) {
			this.finishLine.render(ctx, { color: 'tomato', width: 8 });
		}

		for (const seg of this.roadBorders) {
			seg.render(ctx, { color: '#000', width: 3 });
		}
	}
}

export default GraphTrack;
