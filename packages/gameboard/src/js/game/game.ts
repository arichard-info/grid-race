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

	private _currentPlayerId?: string;
	private _interactivePlayers: Array<string>;

	private _startGrid: StartGrid;
	private _hoveredPoint?: Point;
	private _previewSegment?: Segment;

	private _grid: Grid;
	private _viewport: Viewport;
	private _canvas: HTMLElement;

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
		this._startGrid = new StartGrid(
			grid.viewport,
			startPositions,
			[],
			this.#handleSelectStartPoint.bind(this)
		);

		this.setCurrentPlayer(this._players[0].id);

		this.#addEventListeners();
	}

	#addEventListeners = () => {
		this._canvas.addEventListener('mousemove', this.#handleMouseMove);
		this._canvas.addEventListener('mousedown', this.#handleMouseDown);
	};

	#handleMouseMove = (event: MouseEvent) => {
		const mousePosition = this._viewport.getMouse(event, true);
		this._hoveredPoint = this._grid.getNearestGridPoint({ x: mousePosition.x, y: mousePosition.y });

		const currentPlayer = this._players.find((p) => p.id === this._currentPlayerId);
		if (!currentPlayer?.position) return;
		this._previewSegment = new Segment(currentPlayer.position, this._hoveredPoint);
	};

	#handleMouseDown = (event: MouseEvent) => {
		const currentPlayer = this._players.find((p) => p.id === this._currentPlayerId);
		if (!currentPlayer?.position) return;

		const mousePosition = this._viewport.getMouse(event, true);
		const newPoint = this._grid.getNearestGridPoint({ x: mousePosition.x, y: mousePosition.y });

		currentPlayer.move(newPoint);
	};

	#handleSelectStartPoint(point: Point) {
		if (!this._currentPlayerId || !this._interactivePlayers.includes(this._currentPlayerId)) {
			return;
		}

		const currentPlayer = this._players.find((p) => p.id === this._currentPlayerId);
		if (!currentPlayer) return;
		currentPlayer.move(point);
	}

	#canAddPoint(point: Point) {
		const currentPlayer = this._players.find((p) => p.id === this._currentPlayerId);
		if (!currentPlayer) return false;

		// Vector rules

		// Existing point rules

		// Wall rules
	}

	setCurrentPlayer(playerId: string) {
		this._currentPlayerId = playerId;
	}

	renderBehindGrid(ctx: CanvasRenderingContext2D) {
		this._track.render(ctx);
	}

	render(ctx: CanvasRenderingContext2D) {
		this._players.forEach((player) => {
			if (this._currentPlayerId === player.id) {
				if (this._interactivePlayers.includes(player.id)) {
					if (!player.position) {
						this._startGrid.render(ctx, { color: `#${player.color}` });
					}

					if (player.position && this._hoveredPoint) {
						this._previewSegment?.render(ctx, {
							color: `#${player.color}`,
							width: 4,
							dash: [10, 5]
						});
						this._hoveredPoint.render(ctx, { color: `#${player.color}`, size: 20 });
					}
				}
			}
			player.render(ctx);
		});
	}
}

export default Game;
