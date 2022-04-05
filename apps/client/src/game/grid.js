/**
 * @param {"dark"|"light"} theme
 * @returns {String}
 */
const getColor = (theme, themeTransition) => {
    let colorRatio = 100;
    if (themeTransition < 1) colorRatio = Math.round(themeTransition * 100);
    if (theme === 'dark') return `hsl(0,0%,${colorRatio}%)`;
    return `hsl(0,0%,${100 - colorRatio}%)`;
};

export const render = ({ canvasCtx, scaledCaseSize, width, height, pixelRatio, theme, themeTransition, offsetX, offsetY }) => {
    const caseOffsetX = offsetX % scaledCaseSize;
    const caseOffsetY = offsetY % scaledCaseSize;

    const color = getColor(theme, themeTransition);
    let drawnWidth = scaledCaseSize + caseOffsetX;
    while (drawnWidth < width) {
        canvasCtx.beginPath();
        let drawnHeight = scaledCaseSize + caseOffsetY;
        while (drawnHeight < height) {
            canvasCtx.arc(drawnWidth, drawnHeight, pixelRatio * 1.25, 0, Math.PI * 2);
            drawnHeight += scaledCaseSize;
        }
        drawnWidth += scaledCaseSize;
        canvasCtx.fillStyle = color;
        canvasCtx.fill();
    }
};
