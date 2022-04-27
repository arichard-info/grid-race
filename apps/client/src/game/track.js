export class Track {
    constructor(config) {
        this.images = {};
        this.id = config.id;
        this.svgTemplate = config.svg;
        this.unitWidth = config.width;
        this.unitHeight = config.height;
    }

    getSvg = (theme) => {
        let fillColor = '#FFFFFF';
        let strokeColor = '#000000';
        if (theme === 'dark') {
            fillColor = '#000000';
            strokeColor = '#FFFFFF';
        }
        return this.svgTemplate.replace('{fill}', fillColor).replace('{stroke}', strokeColor);
    };

    render = async ({ canvasCtx, scaledCaseSize, theme, offsetX, offsetY }) => {
        const width = scaledCaseSize * this.unitWidth;
        const height = scaledCaseSize * this.unitHeight;

        if (this.images[this.id]?.[theme]) {
            canvasCtx.drawImage(this.images[this.id][theme], offsetX, offsetY, width, height);
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            const DOMURL = window.URL;
            const image = new Image();
            const svg = new Blob([this.getSvg(theme)], { type: 'image/svg+xml;charset=utf-8' });
            const url = DOMURL.createObjectURL(svg);

            image.onload = () => {
                canvasCtx.drawImage(image, offsetX, offsetY, width, height);
                DOMURL.revokeObjectURL(url);
                resolve(true);
            };
            image.src = url;
            this.images[this.id] = {
                ...(this.images[this.id] || {}),
                [theme]: image,
            };
        });
    };
}

// export const render = ({canvasCtx, width, height, pixelRatio}) => {
//     const polygons = getTrackPolygons(track);

//     const maxX = polygons.reduce((max, polygon) => Math.max(...polygon.map(p => p[0]), max), 0)
//     const maxY = polygons.reduce((max, polygon) => Math.max(...polygon.map(p => p[1]), max), 0)

//     polygons.forEach(polygon => {
//         canvasCtx.beginPath();

//         canvasCtx.moveTo((polygon[0] * width) / maxX, (polygon[1] * height) / maxY);

//         polygon.forEach(point => {
//             canvasCtx.lineTo((point[0] * width) / maxX, (point[1] * height) / maxY);
//         })

//         canvasCtx.strokeStyle = '#FF0000';
//         canvasCtx.lineWidth = 2 * pixelRatio;
//         canvasCtx.stroke();
//     })
// }
