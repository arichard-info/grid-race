const curveLeft = {
  id: "curve-left",
  getTemplate: ({ size, color = "#D9D9D9" }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 283 283" fill="none">
    <path d="M0 283C156.297 283 283 156.297 283 0H0V283Z" fill="${color}"/>
</svg>
`,
};

const curveTop = {
  id: "curve-top",
  getTemplate: ({ size, color = "#D9D9D9" }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 283 283" fill="none">
    <path d="M0 0C0 156.297 126.703 283 283 283L283 0L0 0Z" fill="${color}"/>
</svg>
`,
};

const curveBottom = {
  id: "curve-bottom",
  getTemplate: ({ size, color = "#D9D9D9" }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 283 283" fill="none">
    <path d="M283 283C283 126.703 156.297 0 0 0L0 283H283Z" fill="${color}"/>
</svg>
`,
};

const curveRight = {
  id: "curve-right",
  getTemplate: ({ size, color = "#D9D9D9" }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 283 283" fill="none">
    <path d="M283 0C126.703 0 0 126.703 0 283L283 283L283 0Z" fill="${color}"/>
</svg>
`,
};

const line = {
  id: "line",
  getTemplate: ({ size, color = "#D9D9D9" }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
    <rect width="${size}" height="${size}" fill="${color}"/>
</svg>
`,
};

export default {
  "curve-left": curveLeft,
  "curve-right": curveRight,
  "curve-bottom": curveBottom,
  "curve-top": curveTop,
  line: line,
};
