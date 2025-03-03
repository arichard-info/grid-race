import Graph from './geometry/graph';
import Track from './track/track';

class Game {
	track: Track;
	players: Array<{ id: string; color: string; trace?: Graph }>;

	constructor(track: Track, players: Array<{ id: string; color: string }>) {
		this.track = track;
		this.players = players;
	}

	render(ctx: CanvasRenderingContext2D) {}
}

export default Game;
