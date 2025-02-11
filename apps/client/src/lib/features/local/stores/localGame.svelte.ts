import { getRandomColor } from '$lib/features/shared/utils';
import type Game from 'gameboard/src/js';
import { Mode } from 'gameboard/src/js';

type Player = {
	username: string;
	id: string;
	color: string;
};

export enum State {
	PLAYER_SELECTION = 'player_selection',
	TRACK_SELECTION = 'track_selection',
	TRACK_EDITION = 'track_edition',
	GAME = 'GAME'
}

class LocalGame {
	static MAX_PLAYERS = 6;

	gameboard?: Game = $state();
	players: Array<Player> = $state([]);
	gameState?: State = $state(State.PLAYER_SELECTION);

	constructor() {
		this.players = [{ id: '1', username: 'Joueur 1', color: getRandomColor() }];
	}

	addNewPlayer(username?: string) {
		if (this.players?.length === LocalGame.MAX_PLAYERS) return;
		this.players.push({
			id: this.players.length + 1 + '',
			username: username || `Joueur ${this.players.length + 1}`,
			color: getRandomColor()
		});
	}

	submitPlayerSelection() {
		if (this.gameState !== State.PLAYER_SELECTION) return;
		this.gameState = State.TRACK_SELECTION;
	}

	submitTrackSelection() {
		if (this.gameState !== State.TRACK_SELECTION) return;
		this.gameState = State.GAME;

		if (!this.gameboard) return;
		this.gameboard.changeMode(Mode.Game);
	}

	submitTrackEditor() {
		if (this.gameState !== State.TRACK_EDITION) return;
		this.gameState = State.GAME;

		if (!this.gameboard) return;
		this.gameboard.changeMode(Mode.Game);
	}

	showTrackEditor() {
		if (this.gameState !== State.TRACK_SELECTION) return;
		this.gameState = State.TRACK_EDITION;
	}

	closeTrackEditor() {
		if (this.gameState !== State.TRACK_EDITION) return;
		this.gameState = State.TRACK_SELECTION;
	}

	changeState(st: State) {
		this.gameState = st;
	}
}

export default LocalGame;
