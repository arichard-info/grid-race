export const pixelToPosition = ([x, y], caseWidth) => {
  return [Math.round(x / caseWidth), Math.round(y / caseWidth)];
};

export const positionDifference = ([x1, y1], [x2, y2]) => [x1 - x2, y1 - y2];

export const vectorsToPosition = (vectors, initial = [0, 0]) => {
  return vectors.reduce(
    ([positionX, positionY], [vectorX, vectorY]) => [
      positionX + vectorX,
      positionY + vectorY,
    ],
    initial
  );
};

const maxAcceleration = 1;
const allowNullAcceleration = false;

export const isAccelerationValid = (acc) => {
  return (
    !(!allowNullAcceleration && !acc[0] && !acc[1]) &&
    Math.abs(acc[0]) <= maxAcceleration &&
    Math.abs(acc[1]) <= maxAcceleration
  );
};
