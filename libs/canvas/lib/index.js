import { useTransition } from './utils/transition';
import { render as renderBackground } from './background';
import { render as renderGrid } from './grid';
import { Track } from './track';
import { Car } from './car';

export class Game {
    static minZoom = 0.5;
    static maxZoom = 3;
    static zoomStep = 0.3;
    static baseCaseSize = 20; // Case size at default zoom (1)

    constructor(config) {
        this.canvasElement = config.canvas;
        this.canvasCtx = config.canvas.getContext('2d');

        if (config.track) this.track = new Track({ ...config.track, theme: this.theme });

        this.draggable = config.draggable || false;
        this.dragging = false;
        this.theme = config.theme || 'light';
        this.zoomLevel = 1;
        this.caseSize = this.zoomLevel * Game.baseCaseSize;

        this.#initCars(config.players);
        this.#setSize();
        this.#setTime();

        const offset = this.#getDefaultOffset(this.track);
        this.offsetX = offset[0];
        this.offsetY = offset[1];

        this.#render();

        if (this.draggable) this.canvasElement.addEventListener('mousedown', this.#drag);
        this.canvasElement.addEventListener('wheel', this.#wheel);
        window.addEventListener(
            'resize',
            () => {
                this.#setSize();
                this.#render();
            },
            false
        );
        if (typeof config.listeners.click === 'function') {
            this.canvasElement.addEventListener('click', this.#handleClick(config.listeners.click));
        }
    }

    #getDefaultOffset = (track) => {
        if (!track) return [0, 0];

        const unitOffsetWidth = Math.floor((this.unitWidth - track.unitWidth) / 2);
        const unitOffsetHeight = Math.floor((this.unitHeight - track.unitHeight) / 2);

        return [unitOffsetWidth * this.scaledCaseSize, unitOffsetHeight * this.scaledCaseSize];
    };

    #setTime = () => {
        this.time = new Date();
    };

    #setSize = () => {
        this.pixelRatio = window.devicePixelRatio || 1;
        this.scaledCaseSize = this.caseSize * this.pixelRatio;
        this.width = this.canvasElement.clientWidth * this.pixelRatio;
        this.height = this.canvasElement.clientHeight * this.pixelRatio;
        this.unitWidth = Math.floor(this.width / this.scaledCaseSize);
        this.unitHeight = Math.floor(this.height / this.scaledCaseSize);

        this.canvasElement.width = this.width;
        this.canvasElement.height = this.height;
    };

    #initCars = (players = []) => {
        this.cars = players.reduce((cars, player) => {
            cars[player.id] = new Car(player);
            return cars;
        }, {});
    };

    #renderCars = () => {
        Object.values(this.cars).forEach((p) => {
            p.render(this);
        });
    };

    #getPosition = ([x, y]) => {
        const scaledX = x * this.pixelRatio;
        const scaledY = y * this.pixelRatio;
        const position = [
            Math.round((scaledX - this.offsetX) / this.scaledCaseSize),
            Math.round((scaledY - this.offsetY) / this.scaledCaseSize),
        ];
        return position;
    };

    #handleClick = (callback) => (event) => {
        const position = this.#getPosition([event.clientX, event.clientY]);
        callback(position);
    };

    #drag = (event) => {
        const startX = event.x;
        const startY = event.y;
        const startOffsetX = this.offsetX;
        const startOffsetY = this.offsetY;

        const onMouseMove = (event) => {
            this.offsetX = startOffsetX + -(startX - event.x) * this.pixelRatio;
            this.offsetY = startOffsetY + -(startY - event.y) * this.pixelRatio;
            this.#render();
        };

        document.body.style.cursor = 'grabbing';

        this.canvasElement.addEventListener('mousemove', onMouseMove);

        this.canvasElement.onmouseup = () => {
            document.body.style.cursor = 'default';
            this.canvasElement.removeEventListener('mousemove', onMouseMove);
            this.canvasElement.onmouseup = null;
        };
    };

    #wheel = (event) => {
        if (event.deltaY > 0) this.unZoom();
        if (event.deltaY < 0) this.zoom();
    };

    setDraggable = (draggable) => {
        this.draggable = draggable;
        if (this.draggable) this.canvasElement.addEventListener('mousedown', this.#drag);
        else this.canvasElement.removeEventListener('mousedown', this.#drag);
    };

    zoom = () => {
        if (this.zoomLevel + Game.zoomStep > Game.maxZoom) return;
        this.zoomLevel += Game.zoomStep;
        this.caseSize = Game.baseCaseSize * this.zoomLevel;

        this.#setSize();
        this.#render();
    };

    unZoom = () => {
        if (this.zoomLevel - Game.zoomStep < Game.minZoom) return;
        this.zoomLevel -= Game.zoomStep;
        this.caseSize = Game.baseCaseSize * this.zoomLevel;

        this.#setSize();
        this.#render();
    };

    pushPlayerVector = (playerId, vector, animate) => {
        this.cars[playerId].pushVector(vector, animate);
        this.#render();
    };

    setPlayerPosition = (playerId, position, animate) => {
        this.cars[playerId].setPosition(position, animate);
        this.#render();
    };

    /**
     * @param {"light"|"dark"} theme
     * @param {Object} [transitionOptions]
     */
    setTheme = (theme, transitionOptions) => {
        this.theme = theme;
        if (transitionOptions) {
            this.getThemeTransition = useTransition(transitionOptions);
            this.#render();
        }
    };

    animate = () => {
        window.requestAnimationFrame(this.#render);
    };

    #render = async () => {
        this.#setTime();
        this.canvasCtx.clearRect(0, 0, this.width, this.height);
        if (this.getThemeTransition) {
            this.themeTransition = this.getThemeTransition();
            if (this.themeTransition === 1) this.getThemeTransition = null;
            this.animate();
        }
        renderBackground(this);
        if (this.track) await this.track.render(this);
        renderGrid(this);
        this.#renderCars();
    };
}
