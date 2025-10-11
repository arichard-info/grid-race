import Point from '../primitives/point';
import Viewport from '../viewport';

class StartGrid {
	private _positions: Array<Point>;
	private _disabledPositions: Array<Point>;

	private _viewport: Viewport;
	private _canvas: HTMLElement;

	private _hoveredPoint?: Point | null;

	private _pointClickCallback?: (point: Point) => void;

	constructor(
		viewport: Viewport,
		points: Array<Point>,
		disabledPositions?: Array<Point>,
		handlePointClick?: (point: Point) => void
	) {
		this._positions = points;
		this._disabledPositions = disabledPositions || [];

		this._viewport = viewport;
		this._canvas = viewport.canvas;

		this._pointClickCallback = handlePointClick;

		if (!points.length) return;

		this.#addEventListeners();
	}

	disablePositions(newDisabledPositions: Array<Point>) {
		this._disabledPositions = [...this._disabledPositions, ...newDisabledPositions];
	}

	enablePositions(positionsToEnable: Array<Point>) {
		this._disabledPositions = this._disabledPositions.filter(
			(p) => !positionsToEnable.find((point) => point.equals(p))
		);
	}

	#addEventListeners = () => {
		this._canvas.addEventListener('mousemove', this.#handleMouseMove);
		this._canvas.addEventListener('mousedown', this.#handleMouseDown);
	};

	#handleMouseMove = (event: MouseEvent) => {
		const mousePosition = this._viewport.getMouse(event, true);
		const hoveredPoint = Point.getNearest(mousePosition, this._positions, 20);
		if (hoveredPoint && !this._disabledPositions.find((p) => p.equals(hoveredPoint))) {
			this._hoveredPoint = hoveredPoint;
		} else {
			this._hoveredPoint = null;
		}
	};

	#handleMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		if (this._hoveredPoint && typeof this._pointClickCallback === 'function') {
			this._pointClickCallback(this._hoveredPoint);
		}

		// TODO : handle right click to cancel position selection
	};

	render(ctx: CanvasRenderingContext2D, options?: { color: string }) {
		this._positions.forEach((point) => {
			if (!this._disabledPositions.find((p) => p.equals(point))) {
				if (this._hoveredPoint && point.equals(this._hoveredPoint)) {
					point.render(ctx, { size: 30, color: options?.color });
				} else {
					point.render(ctx, { size: 10, color: options?.color });
				}
			}
		});

		if (this._hoveredPoint) {
			this._viewport.canvas.style.cursor = 'pointer';
		} else {
			this._viewport.canvas.style.cursor = 'inherit';
		}
	}
}

export default StartGrid;
