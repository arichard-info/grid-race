import Gameboard from "./gameboard";
import GameEditor from "./gameEditor";
import Viewport from "./viewport";

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

  const viewport = new Viewport(canvas);
  const gameboard = new Gameboard(viewport);
  const gameEditor = new GameEditor(viewport);

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
