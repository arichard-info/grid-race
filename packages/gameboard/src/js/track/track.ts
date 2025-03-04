import Grid from './../grid';
import Point from '../primitives/point';

abstract class Track {
	abstract generate(): void;

	abstract getStartPositions(grid: Grid): Array<Point>;

	abstract render(ctx: CanvasRenderingContext2D): void;
}

export default Track;
