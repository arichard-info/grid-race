import Track from "./track";
import TrackEditor from "./trackEditor";
import Graph, { GraphDataObject } from "./geometry/graph";
import Viewport from "./viewport";
import FPS from "./fps";
import Grid from "./grid";
import Background from "./background";

export const Mode = {
  Blank: "Blank",
  Editor: "Editor",
  Game: "Game",
  Readonly: "Readonly",
};

type GameOptions = {
  mode: string;
  graphData: GraphDataObject;
};

class Game {
  mode: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  performances: { then: number; frames: number; fpsValue: number };
  graphHash: string;

  graph: Graph;
  viewport: Viewport;
  track: Track;
  trackEditor?: TrackEditor;
  background: Background;
  grid: Grid;
  fps: FPS;

  constructor(rootElement: HTMLElement, options?: GameOptions) {
    this.mode = options?.mode || Mode.Blank;

    this.ctx = this.#initCanvas(rootElement);
    this.canvas = this.ctx.canvas;

    this.graph = options?.graphData
      ? Graph.load(options.graphData)
      : new Graph();
    this.graphHash = this.graph.hash();

    this.performances = {
      then: performance.now(),
      frames: 0,
      fpsValue: 0,
    };

    this.viewport = new Viewport(this.canvas);
    this.track = new Track(this.graph);
    this.grid = new Grid(this.viewport);
    this.fps = new FPS(this.viewport);
    this.background = new Background(this.viewport);

    this.#renderLoop(this.performances.then);
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

  #initCanvas(rootElement: HTMLElement): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    canvas.id = "gameboard";
    const canvasWidth = rootElement.clientWidth;
    const canvasHeight = rootElement.clientHeight;

    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    rootElement.appendChild(canvas);

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    return ctx;
  }

  #renderLoop(timestamp: number) {
    const elapsed = timestamp - this.performances.then;
    this.performances.frames++;

    if (elapsed >= 1000) {
      this.performances.fpsValue = Math.round(
        (this.performances.frames * 1000) / elapsed
      );
      this.performances.then = timestamp;
      this.performances.frames = 0;
    }

    this.viewport.refresh();

    if (this.graph.hash() != this.graphHash) {
      this.track.generate();
      this.graphHash = this.graph.hash();
    }

    this.background.render(this.ctx);

    if (this.mode !== Mode.Blank) {
      this.track.render(this.ctx);
    }
    this.grid.render(this.ctx);
    if (this.mode === Mode.Editor) {
      if (!this.trackEditor) {
        this.trackEditor = new TrackEditor(this.viewport, this.track);
      }
      this.trackEditor.render(this.ctx);
    } else {
      if (this.trackEditor) {
        this.trackEditor.destroy();
        delete this.trackEditor;
      }
    }
    this.fps.render(this.ctx, this.performances.fpsValue);

    requestAnimationFrame(this.#renderLoop.bind(this));
  }
}

export default Game;
