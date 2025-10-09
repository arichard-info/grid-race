import Viewport from './viewport';
import Point from './primitives/point';

class Grid {
	viewport: Viewport;
	cellSize: number;
	dotSize: number;

	constructor(viewport: Viewport, { cellSize = 25, dotSize = 3 } = {}) {
		this.viewport = viewport;
		this.cellSize = cellSize;
		this.dotSize = dotSize;
	}

	getNearestGridPoint(point: { x: number; y: number }): Point {
		const nearestX = Math.round(point.x / this.cellSize) * this.cellSize;
		const nearestY = Math.round(point.y / this.cellSize) * this.cellSize;

		return new Point(nearestX, nearestY);
	}

	render(ctx: CanvasRenderingContext2D) {
		const boundings = this.viewport.getBoundings();
		const minX = Math.ceil(boundings.left / this.cellSize) * this.cellSize;
		const minY = Math.ceil(boundings.top / this.cellSize) * this.cellSize;

		for (let x = minX; x < boundings.right; x += this.cellSize) {
			ctx.beginPath();
			for (let y = minY; y < boundings.bottom; y += this.cellSize) {
				ctx.arc(x, y, this.dotSize / 2, 0, Math.PI * 2);
			}
			ctx.fillStyle = '#757575';
			ctx.fill();
		}
	}
}

export default Grid;
