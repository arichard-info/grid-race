import Graph from './geometry/graph';

import Point from './primitives/point';
import Segment from './primitives/segment';
import Envelope from './primitives/envelope';

import Viewport from './viewport';
import GraphTrack from './graphTrack';
import Track from './track/track';

class TrackEditor {
	canvas: HTMLElement;
	viewport: Viewport;
	track: GraphTrack;
	graph: Graph;

	selectedPoint: null | Point;
	hoveredPoint: null | Point;
	grabbedPoint: null | Point;
	mouseDownPoint: null | Point;
	mouse: null | Point;

	canAddMouseSegment: boolean;
	mouseDownTime: number | null;

	gap: number;
	maxAngle: number;
	grabThreshold: number;

	constructor(viewport: Viewport, track: GraphTrack) {
		this.viewport = viewport;
		this.canvas = viewport.canvas;
		this.graph = track.graph;
		this.track = track;

		this.selectedPoint = null;
		this.hoveredPoint = null;
		this.grabbedPoint = null;
		this.mouseDownPoint = null;

		this.mouse = null;
		this.canAddMouseSegment = false;
		this.mouseDownTime = null;

		this.gap = 10; // 10px
		this.maxAngle = 160; // 160 degrees
		this.grabThreshold = 100; // 100 ms

		this.#addEventListeners();
	}

	#addEventListeners = () => {
		this.canvas.addEventListener('mousedown', this.#handleMouseDown);
		this.canvas.addEventListener('mouseup', this.#handleMouseUp);
		this.canvas.addEventListener('mousemove', this.#handleMouseMove);
		this.canvas.addEventListener('contextmenu', this.#handleContextMenu);
		window.addEventListener('mouseout', this.#handleMouseUp);
		window.addEventListener('keydown', this.#handleKeyDown);
	};

	#removeEventListeners = () => {
		this.canvas.removeEventListener('mousedown', this.#handleMouseDown);
		this.canvas.removeEventListener('mouseup', this.#handleMouseUp);
		this.canvas.removeEventListener('mousemove', this.#handleMouseMove);
		this.canvas.removeEventListener('contextmenu', this.#handleContextMenu);
		window.addEventListener('mouseout', this.#handleMouseUp);
		window.removeEventListener('keydown', this.#handleKeyDown);
	};

	#handleContextMenu = (event: Event) => {
		event.preventDefault();
	};

	#unselectPoint = () => {
		this.selectedPoint = null;
		if (!this.graph.segments.length) {
			this.graph.points = [];
		}
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

		// Left Click
		if (event.button == 0) {
			this.mouseDownTime = performance.now();
			if (this.hoveredPoint) {
				this.mouseDownPoint = this.hoveredPoint;
				return;
			}

			if (this.graph.points.length && !this.canAddMouseSegment) return;
			const newPoint = this.viewport.getMouse(event);
			this.graph.addPoint(newPoint);
			if (this.graph.points.length === 1) {
				this.track.setStartPoint(newPoint);
			} else {
				this.track.setEndPoint(newPoint);
			}
			if (this.selectedPoint) {
				this.graph.addSegment(new Segment(this.selectedPoint, newPoint));
			}
			this.selectedPoint = newPoint;
			return;
		}

		if (
			event.button === 2 || // right click
			event.button === 1 // wheel click
		) {
			this.#unselectPoint();
			if (this.hoveredPoint && this.graph.isExtrimity(this.hoveredPoint)) {
				this.#removePoint(this.hoveredPoint);
			}
		}
	};

	#handleMouseMove = (event: MouseEvent) => {
		this.mouse = this.viewport.getMouse(event, true);
		this.hoveredPoint = Point.getNearest(this.mouse, this.graph.points, 20);
		this.canAddMouseSegment = this.#canAddSegment();

		if (
			!this.grabbedPoint &&
			this.mouseDownPoint &&
			this.mouseDownTime &&
			performance.now() - this.mouseDownTime > this.grabThreshold // Make sure a quick click is not considered as dragging
		) {
			this.grabbedPoint = this.mouseDownPoint;
		}

		if (this.grabbedPoint && this.#canMovePoint()) {
			this.selectedPoint = null;
			// TODO : don't replace point now but only when mouseup, to avoid graph recalculation on every frame
			const newPoint = this.mouse;
			this.graph.replacePoint(this.grabbedPoint, newPoint);

			if (this.track.startPoint?.equals(this.grabbedPoint)) {
				this.track.setStartPoint(newPoint);
			}

			if (this.track.endPoint?.equals(this.grabbedPoint)) {
				this.track.setEndPoint(newPoint);
			}

			this.grabbedPoint = newPoint;
		}
	};

	#handleMouseUp = () => {
		if (this.mouseDownPoint && !this.grabbedPoint) {
			this.selectedPoint = this.mouseDownPoint;
		}
		this.mouseDownPoint = null;
		this.grabbedPoint = null;
		this.mouseDownTime = null;
	};

	#removePoint = (point: Point) => {
		this.graph.removePoint(point);
		if (!this.graph.segments?.length) this.graph.points = [];
	};

	#canMovePoint = (): boolean => {
		if (!this.mouse || !this.grabbedPoint || !this.mouseDownPoint) return false;

		for (const segment of this.graph.segments) {
			if (!segment.includes(this.grabbedPoint as Point)) {
				// New point is too close from existing road
				if (Segment.distanceFromPoint(this.mouse, segment) < this.track.roadWidth + this.gap)
					return false;
			} else {
				const newSegment = new Segment(segment.p1, segment.p2).replace(
					this.grabbedPoint,
					this.mouse
				);
				// One segment is now too short
				if (newSegment.getLength() < this.track.roadWidth) return false;

				const secondSegment = this.graph.segments.find(
					(seg) => (!seg.equals(segment) && seg.includes(segment.p1)) || seg.includes(segment.p2)
				);
				if (secondSegment) {
					const angle = secondSegment.angleWithSegment(newSegment);
					// Angle is too short
					if (angle > this.maxAngle) return false;
				}
			}
		}

		return true;
	};

	#canAddSegment = (): boolean => {
		if (!this.selectedPoint || !this.mouse) return false;

		// Segment too short
		if (Point.distance(this.selectedPoint, this.mouse) < this.track.roadWidth) {
			return false;
		}

		const newSegment = new Segment(this.selectedPoint, this.mouse);

		let segmentsWithSelectedPoint = 0;
		for (const segment of this.graph.segments) {
			if (segment.includes(this.selectedPoint)) {
				// Angle is too short
				const angle = newSegment.angleWithSegment(segment);
				if (angle > this.maxAngle) return false;
				segmentsWithSelectedPoint++;

				// Selected point is not extrimity
				// (you can only add new points from graph extrimity)
				if (segmentsWithSelectedPoint > 1) return false;
				continue;
			}

			// Point too close from existing road
			if (Segment.distanceFromSegment(newSegment, segment) <= this.track.roadWidth + this.gap) {
				return false;
			}
		}
		return true;
	};

	getTrack(): Track {
		return this.track;
	}

	destroy = () => {
		this.#removeEventListeners();
	};

	render = (ctx: CanvasRenderingContext2D) => {
		this.graph.render(ctx);

		if (this.selectedPoint) {
			if (this.mouse) {
				if (this.graph.isExtrimity(this.selectedPoint) || this.graph.points.length === 1) {
					const previewSegment = new Segment(this.selectedPoint, this.mouse);
					previewSegment.render(ctx, { dash: [3, 3] });

					const envelopeStyle = {
						fill: this.canAddMouseSegment ? 'rgba(71, 107, 237, 0.2)' : 'rgba(237, 71, 71, 0.2)',
						stroke: this.canAddMouseSegment ? 'rgba(71, 107, 237)' : 'rgba(237, 71, 71)'
					};

					new Envelope(previewSegment, this.track.roadWidth, this.track.roadRoundness).render(
						ctx,
						envelopeStyle
					);
				}
			}
			this.selectedPoint.render(ctx, { outline: true });
		}

		if (this.hoveredPoint) {
			this.hoveredPoint?.render(ctx, { color: '#FFF', size: 10 });
		}

		// Cursor render
		if (this.grabbedPoint) {
			this.viewport.canvas.style.cursor = 'grabbing';
		} else if (this.hoveredPoint) {
			this.viewport.canvas.style.cursor = 'grab';
		} else {
			this.viewport.canvas.style.cursor = 'inherit';
		}
	};
}

export default TrackEditor;
