import { createMachine, createActor } from 'xstate';

const templateMachine = createMachine({
	context: {
		players: [],
		track: null
	},
	initial: 'playersSelection',
	states: {
		playersSelection: {
			on: {
				next: {
					target: 'trackSelection'
				}
			}
		},
		trackSelection: {
			initial: 'idle',
			on: {
				selectPlayers: {
					target: 'playersSelection'
				}
			},
			states: {
				idle: {
					on: {
						draw: {
							target: 'draw'
						}
					}
				},
				draw: {
					on: {
						cancel: {
							target: 'idle'
						}
					}
				}
			}
		},
		game: {}
	}
});
