const { pathDataToPolys } = require('svg-path-to-polygons');

const getTrackPolygons = (track) => {
    const pathData = track.svg.match(/(?<=d=").*?(?=")/gm)?.[0];
    return pathDataToPolys(pathData, { tolerance: 1, decimals: 2 });
}

module.exports = {
    getTrackPolygons
}