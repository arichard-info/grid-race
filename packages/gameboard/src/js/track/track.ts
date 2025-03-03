import Point from './../primitives/point';
import Grid from './../grid';

abstract class Track {
	abstract generate(): void;

	abstract getStartGrid(grid: Grid): Array<Point>;

	abstract render(ctx: CanvasRenderingContext2D): void;
}

export default Track;
