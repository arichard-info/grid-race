import Gameboard from "./gameboard";

export const init = (rootElement: HTMLElement) => {
  const canvas = document.createElement("canvas");
  canvas.id = "gameboard";
  rootElement.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const gameboard = new Gameboard();

  const animate = () => {
    gameboard.render();
    requestAnimationFrame(animate);
  };

  animate();
};
