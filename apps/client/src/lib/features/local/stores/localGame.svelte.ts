import { getRandomColor } from '$lib/features/shared/utils';
import type Game from 'gameboard/src/js';
import type Track from 'gameboard/src/js/track/track';

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

	currentPlayerIndex?: number;

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

	startGame(track: Track) {
		if (!this.gameboard) return;
		this.gameboard.startGame(
			track,
			this.players.map((p) => ({ ...p, interactive: true }))
		);
		this.gameState = State.GAME;
		this.nextPlayer();
	}

	nextPlayer() {
		if (!this.currentPlayerIndex || this.players.length >= this.currentPlayerIndex + 1) {
			this.currentPlayerIndex = 0;
		} else this.currentPlayerIndex = this.currentPlayerIndex + 1;
	}

	submitTrackSelection(track: Track) {
		if (this.gameState !== State.TRACK_SELECTION) return;
		this.gameState = State.GAME;
		this.startGame(track);
	}

	submitTrackEditor() {
		if (this.gameState !== State.TRACK_EDITION) return;
		const editedTrack = this.gameboard?.getEditedTrack();
		if (!editedTrack) return;
		this.startGame(editedTrack);
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
