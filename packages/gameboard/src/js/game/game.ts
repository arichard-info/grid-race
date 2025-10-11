import Grid from '../grid';
import Point from '../primitives/point';
import Segment from '../primitives/segment';
import Viewport from '../viewport';
import Track from './../track/track';
import Player from './player';
import StartGrid from './startGrid';

class Game {
	private _track: Track;
	private _players: Array<Player>;

	private _currentPlayer?: Player;
	private _interactivePlayers: Array<string>;

	private _startGrid: StartGrid;
	private _hoveredPoint?: Point;
	private _previewSegment?: Segment;

	private _grid: Grid;
	private _viewport: Viewport;
	private _canvas: HTMLElement;

	private _showHelpProjections: boolean = true;
	private _nextPossiblePositions?: Array<Point>;

	constructor(
		track: Track,
		players: Array<{ id: string; color: string; interactive: boolean }>,
		grid: Grid
	) {
		this._grid = grid;
		this._viewport = grid.viewport;
		this._canvas = grid.viewport.canvas;
		this._track = track;
		this._players = players.map((p) => new Player(p.id, p.color));
		this._interactivePlayers = players.filter((p) => p.interactive).map((p) => p.id);

		const startPositions = this._track.getStartPositions(grid);
		this._startGrid = new StartGrid(grid.viewport, startPositions, []);

		this.setCurrentPlayer(this._players[0].id);

		this.#addEventListeners();
	}

	#addEventListeners = () => {
		this._canvas.addEventListener('mousemove', this.#handleMouseMove);
		this._canvas.addEventListener('mousedown', this.#handleMouseDown);
	};

	#handleMouseMove = (event: MouseEvent) => {
		this._hoveredPoint = undefined;
		const mousePosition = this._viewport.getMouse(event, true);
		const hoveredPosition = this._grid.getNearestGridPoint({
			x: mousePosition.x,
			y: mousePosition.y
		});

		if (this.#canAddPoint(hoveredPosition)) {
			this._hoveredPoint = hoveredPosition;
			if (this._currentPlayer?.position) {
				this._previewSegment = new Segment(this._currentPlayer.position, this._hoveredPoint);
			}
		}

		if (this._currentPlayer?.position) {
			const projectedPosition = this._currentPlayer.getProjectedPosition();
			if (projectedPosition) {
				this._nextPossiblePositions = this._grid.getPointsAround(projectedPosition);
			}
		}
	};

	#handleMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		if (!this._currentPlayer || !this.#isInteractivePlayer(this._currentPlayer)) {
			return;
		}

		// Right Click
		if (event.button === 2) {
			if (this._currentPlayer.position && !this._currentPlayer.trace.segments.length) {
				this._previewSegment = undefined;
				this._hoveredPoint = undefined;
				this._nextPossiblePositions = undefined;
				this.#resetPlayerPosition(this._currentPlayer.id);
			}
			return;
		}

		// Left click
		if (event.button === 0) {
			this._previewSegment = undefined;
			this._hoveredPoint = undefined;
			this._nextPossiblePositions = undefined;
			const mousePosition = this._viewport.getMouse(event, true);
			const newPoint = this._grid.getNearestGridPoint({ x: mousePosition.x, y: mousePosition.y });

			if (this.#canAddPoint(newPoint)) {
				this._currentPlayer.move(newPoint);
				this._startGrid.disablePositions([newPoint]);
				if (this._currentPlayer.trace.segments.length) this.#nextPlayer();
			}
		}
	};

	#resetPlayerPosition(playerId: string) {
		const player = this._players.find((p) => p.id === playerId);
		if (!player || !player.position) return;
		this._startGrid.enablePositions(player.trace.points);
		player.resetPosition();
	}

	#nextPlayer() {
		this._currentPlayer?.incrementTurns();
		const currentPlayerIndex = this._players.findIndex((p) => p.id === this._currentPlayer?.id);
		const nextPlayerIndex = (currentPlayerIndex + 1) % this._players.length;
		this.setCurrentPlayer(this._players[nextPlayerIndex].id);
	}

	#isInteractivePlayer(player: Player) {
		return this._interactivePlayers.includes(player.id);
	}

	#canAddPoint(point: Point): boolean {
		if (!this._currentPlayer) return false;

		// Grid placement
		if (!this._currentPlayer.position) {
			if (this._track.getStartPositions(this._grid).find((p) => p.equals(point))) return true;
			return false;
		}

		// Movement rules
		const projectedPoint = this._currentPlayer.getProjectedPosition();
		if (!projectedPoint) return false;

		const pointsAround = this._grid.getPointsAround(projectedPoint);
		const isInPointsAround = pointsAround.some((p) => p.equals(point));
		if (!isInPointsAround) return false;

		return true;

		// Vector rules

		// Existing point rules

		// Wall rules
	}

	setCurrentPlayer(playerId: string) {
		this._currentPlayer = this._players.find((p) => p.id === playerId);
	}

	renderBehindGrid(ctx: CanvasRenderingContext2D) {
		this._track.render(ctx);
	}

	render(ctx: CanvasRenderingContext2D) {
		this._players.forEach((player) => {
			player.render(ctx);
		});

		if (this._currentPlayer && this.#isInteractivePlayer(this._currentPlayer)) {
			if (this._showHelpProjections) {
				this._nextPossiblePositions?.forEach((point) =>
					point.render(ctx, { color: '#00FF00', size: 10 })
				);
			}
			if (!this._currentPlayer.position) {
				this._startGrid.render(ctx, { color: `#${this._currentPlayer.color}` });
			}

			if (this._currentPlayer.position && this._hoveredPoint) {
				this._previewSegment?.render(ctx, {
					color: `#${this._currentPlayer.color}`,
					width: 4,
					dash: [10, 5]
				});
				this._hoveredPoint.render(ctx, { color: `#${this._currentPlayer.color}`, size: 20 });
			}
		}
	}
}

export default Game;
