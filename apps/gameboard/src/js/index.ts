import Gameboard from "./gameboard";
import GameEditor from "./gameEditor";
import Graph from "./geometry/graph";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
import Viewport from "./viewport";
import FPS from "./fps";
import Grid from "./grid";

const loadGraph = () => {
  const p1 = new Point(0, 0);
  const p2 = new Point(259, 485);
  const p3 = new Point(670, 430);
  return new Graph([p1, p2, p3], [new Segment(p1, p2), new Segment(p2, p3)]);
};

export const init = (rootElement: HTMLElement) => {
  const canvas = document.createElement("canvas");
  canvas.id = "gameboard";

  const canvasWidth = rootElement.clientWidth;
  const canvasHeight = rootElement.clientHeight;

  canvas.width = canvasWidth * window.devicePixelRatio;
  canvas.height = canvasHeight * window.devicePixelRatio;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  rootElement.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const graph = loadGraph();
  let oldGraphHash = graph.hash();

  const viewport = new Viewport(canvas);
  const gameboard = new Gameboard(viewport, graph);
  const gameEditor = new GameEditor(viewport, gameboard);
  const grid = new Grid(viewport);
  const fps = new FPS(viewport);

  let then = performance.now();
  let frames = 0;
  let fpsValue = 0;

  const animate = (timestamp: number) => {
    const elapsed = timestamp - then;
    frames++;

    if (elapsed >= 1000) {
      fpsValue = Math.round((frames * 1000) / elapsed);
      then = timestamp;
      frames = 0;
    }

    viewport.refresh();

    if (graph.hash() != oldGraphHash) {
      gameboard.generate();
      oldGraphHash = graph.hash();
    }

    gameboard.render(ctx);
    grid.render(ctx);
    gameEditor.render(ctx);
    fps.render(ctx, fpsValue);

    requestAnimationFrame(animate);
  };

  animate(then);
};
