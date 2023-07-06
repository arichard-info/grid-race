export const getPositionFromVectors = (initial, vectors) => {
    return vectors.reduce(([posX, posY], [vX, vY]) => {
        return [posX + vX, posY + vY];
    }, initial);
};
