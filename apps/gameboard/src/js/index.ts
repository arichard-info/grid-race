import Gameboard from "./gameboard";
import GameEditor from "./gameEditor";
import Graph from "./geometry/graph";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
import Viewport from "./viewport";

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

  const viewport = new Viewport(canvas);
  const gameboard = new Gameboard(viewport, graph);
  const gameEditor = new GameEditor(viewport, gameboard);

  const animate = () => {
    viewport.refresh();

    ctx.fillStyle = "#E5E5E5";
    const boundings = viewport.getBoundings();
    ctx.fillRect(
      boundings.left,
      boundings.top,
      boundings.right - boundings.left,
      boundings.bottom - boundings.top
    );

    gameboard.render(ctx);
    gameEditor.render(ctx);

    requestAnimationFrame(animate);
  };

  animate();
};
