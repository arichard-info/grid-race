/**
 * @param {"dark"|"light"} theme
 * @returns {String}
 */
const getColor = (theme, themeTransition) => {
    let colorRatio = 80;
    if (themeTransition < 1) { 
        const ratio = (0.8 * themeTransition) + 0.2;
        colorRatio = Math.round(ratio * 100); }
    if (theme === 'dark') return `hsl(0,0%,${100 - colorRatio}%)`;
    return `hsl(0,0%,${colorRatio}%)`;
};

export const render = ({ canvasCtx, width, height, theme, themeTransition }) => {
    const color = getColor(theme, themeTransition);
    canvasCtx.fillStyle = color;
    canvasCtx.fillRect(0, 0, width, height);
};
