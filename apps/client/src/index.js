import { Game } from './game';
import track from './../../../libs/game/tracks/track-001';

(() => {
    const game = new Game({
        canvas: document.getElementById('__game'),
        track,
        players: [
            {
                id: "player1",
                name: 'Gounet',
                startPosition: [4,2],
                vectors: [
                    [1,0],
                    [2,1],
                    [3,0]
                ]
            },
        ],
        listeners: {
            // click: (position) =>  game.setPlayerPosition('player1', position, true)
        }
    });

    const themeButton = document.getElementById('theme');
    const zoomButton = document.getElementById('zoom');
    const dezoomButton = document.getElementById('dezoom');

    themeButton.addEventListener('click', () => {
        game.setTheme(game.theme === 'dark' ? 'light' : 'dark', {
            duration: 200
        });
    })

    zoomButton.addEventListener('click', game.zoom);
    dezoomButton.addEventListener('click', game.unZoom);
})();
