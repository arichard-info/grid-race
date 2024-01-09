import { useMachine } from '@xstate/svelte';
import { createMachine } from 'xstate';

const machine = createMachine({
	context: {
		players: [],
		track: null
	},
	initial: 'playersSelection',
	states: {
		playersSelection: {
			on: {
				submit: {
					target: 'trackSelection'
				}
			}
		},
		trackSelection: {
			initial: 'choosing',
			on: {
				selectPlayers: {
					target: 'playersSelection'
				}
			},
			states: {
				choosing: {
					on: {
						draw: {
							target: 'drawing'
						}
					}
				},
				drawing: {
					on: {
						cancel: {
							target: 'choosing'
						}
					}
				}
			}
		},
		game: {}
	}
});

export const getMachine = () => useMachine(machine);
