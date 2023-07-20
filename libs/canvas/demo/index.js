import { Game } from './../lib/index.js';
import track from 'tracks/data/track-001';

(() => {
    let draggable = false;

    const game = new Game({
        canvas: document.getElementById('__game'),
        track: track,
        players: [
            {
                id: 'player1',
                name: 'Gounet',
                startPosition: [4, 2],
                color: 'green',
                vectors: [
                    [1, 0],
                    [2, 1],
                    [3, 0],
                ],
            },
        ],
        listeners: {
            click: (position) => game.setPlayerPosition('player1', position, true),
        },
    });

    const draggableButton = document.getElementById('drag');
    const themeButton = document.getElementById('theme');
    const zoomButton = document.getElementById('zoom');
    const dezoomButton = document.getElementById('dezoom');

    draggableButton?.addEventListener('click', () => {
        draggable = !draggable;
        game.setDraggable(draggable);
    });

    themeButton.addEventListener('click', () => {
        game.setTheme(game.theme === 'dark' ? 'light' : 'dark', {
            duration: 200,
        });
    });

    zoomButton.addEventListener('click', game.zoom);
    dezoomButton.addEventListener('click', game.unZoom);
})();
