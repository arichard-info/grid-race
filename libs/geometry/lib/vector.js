/** @typedef {[number, number]} Position */
/** @typedef {[number, number]} Vector */

/**
 * @param {Position} initial
 * @param {Vector[]} vectors
 * @returns {Position}
 */
export const getPositionFromVectors = (initial, vectors) => {
    return vectors.reduce(([posX, posY], [vX, vY]) => {
        return [posX + vX, posY + vY];
    }, initial);
};
