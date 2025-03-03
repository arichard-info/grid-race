// See https://kit.svelte.dev/docs/types#app

import type Graph from 'gameboard/src/js/geometry/graph';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Player {
		username: string;
		id: string;
		color: string;
		rank?: number;
		trace?: Graph;
	}
}

export {};
