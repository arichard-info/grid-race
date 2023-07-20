import { pathDataToPolys } from 'svg-path-to-polygons';

const getTrackPolygons = (track) => {
    const pathData = track.svg.match(/(?<=d=").*?(?=")/gm)?.[0];
    return pathDataToPolys(pathData, { tolerance: 1, decimals: 2 });
};

export default getTrackPolygons;
