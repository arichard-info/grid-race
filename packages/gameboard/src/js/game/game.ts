import Grid from '../grid';
import Point from '../primitives/point';
import Track from './../track/track';
import Player from './player';
import StartGrid from './startGrid';

class Game {
	private _track: Track;
	private _players: Array<Player>;

	private _currentPlayerId?: string;
	private _interactivePlayers: Array<string>;

	private _startGrid: StartGrid;
	private _selectedPosition?: Point;

	constructor(
		track: Track,
		players: Array<{ id: string; color: string; interactive: boolean }>,
		grid: Grid
	) {
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
	}

	#handleSelectStartPoint(point: Point) {
		if (!this._currentPlayerId || !this._interactivePlayers.includes(this._currentPlayerId)) return;
		this._selectedPosition = point;
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
					if (!player.trace.points.length && !this._selectedPosition) {
						this._startGrid.render(ctx, { color: `#${player.color}` });
					}

					if (this._selectedPosition) {
						this._selectedPosition.render(ctx, { color: `#${player.color}`, size: 20 });
					}
				}
			}
			player.render(ctx);
		});
	}
}

export default Game;
