import { Point, Vector } from "./../../types/coordinates";

export const pixelToPosition = ([x, y]: Point, caseWidth: number): Point => {
  return [Math.round(x / caseWidth), Math.round(y / caseWidth)];
};

export const positionDifference = ([x1, y1]: Point, [x2, y2]: Point): Point => [
  x1 - x2,
  y1 - y2,
];

export const vectorsToPosition = (
  vectors: Array<Vector>,
  initial: Point = [0, 0]
): Point => {
  return vectors.reduce(
    ([positionX, positionY], [vectorX, vectorY]) => [
      positionX + vectorX,
      positionY + vectorY,
    ],
    initial
  );
};

const maxAcceleration: number = 1;
const allowNullAcceleration: boolean = false;

export const isAccelerationValid = (acc: Vector): boolean => {
  return (
    !(!allowNullAcceleration && !acc[0] && !acc[1]) &&
    Math.abs(acc[0]) <= maxAcceleration &&
    Math.abs(acc[1]) <= maxAcceleration
  );
};
