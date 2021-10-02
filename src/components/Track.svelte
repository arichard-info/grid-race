<script context="module">
  let img;
</script>

<script>
  import {
    context,
    caseSize,
    pixelRatio,
    width as canvasWidth,
    height as canvasHeight,
    registerRender,
    trackOffset,
  } from "./../state/canvas";

  export let cols = 50;
  let rows;
  let mounted = false;

  const trackSvg = `
    <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1187 438" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M198.5 1H966.37C1138.4 1 1186 117.036 1186 231.097C1186 389.104 1047.37 434.202 978.061 437H198.5C46.1786 437 3.3661 299.732 1 231.097C1 87.3112 50.6882 1 198.5 1ZM268.5 111H896.404C1037.08 111 1076 168.22 1076 224.465C1076 302.382 962.643 324.62 905.964 326H268.5C143.944 326 108.935 258.31 107 224.465C107 153.562 147.631 111 268.5 111Z" 
            fill="#D9D9D9"
        />
        <path 
            d="M978.061 437V437.5H978.071L978.082 437.5L978.061 437ZM1 231.097H0.5V231.106L0.500297 231.115L1 231.097ZM905.964 326V326.5L905.976 326.5L905.964 326ZM107 224.465H106.5V224.48L106.501 224.494L107 224.465ZM966.37 0.5H198.5V1.5H966.37V0.5ZM1186.5 231.097C1186.5 174.01 1174.59 116.359 1141.09 72.9702C1107.58 29.558 1052.51 0.5 966.37 0.5V1.5C1052.26 1.5 1107.01 30.4601 1140.3 73.5813C1173.61 116.726 1185.5 174.124 1185.5 231.097H1186.5ZM978.082 437.5C1012.81 436.098 1064.9 424.102 1108.32 392.657C1151.76 361.195 1186.5 310.273 1186.5 231.097H1185.5C1185.5 309.928 1150.93 360.559 1107.73 391.847C1064.51 423.152 1012.62 435.104 978.041 436.5L978.082 437.5ZM198.5 437.5H978.061V436.5H198.5V437.5ZM0.500297 231.115C1.68586 265.505 13.0004 317.08 43.1072 360.073C73.2307 403.09 122.161 437.5 198.5 437.5V436.5C122.518 436.5 73.881 402.276 43.9263 359.5C13.955 316.7 2.68024 265.324 1.4997 231.08L0.500297 231.115ZM198.5 0.5C124.494 0.5 74.9486 22.1118 43.9265 61.8211C12.9253 101.504 0.5 159.165 0.5 231.097H1.5C1.5 159.244 13.9187 101.856 44.7146 62.4367C75.4895 23.0438 124.694 1.5 198.5 1.5V0.5ZM896.404 110.5H268.5V111.5H896.404V110.5ZM1076.5 224.465C1076.5 196.219 1066.72 167.694 1039.26 146.247C1011.82 124.815 966.796 110.5 896.404 110.5V111.5C966.684 111.5 1011.45 125.795 1038.65 147.035C1065.82 168.258 1075.5 196.466 1075.5 224.465H1076.5ZM905.976 326.5C934.357 325.809 976.935 319.898 1012.44 304.392C1047.93 288.891 1076.5 263.723 1076.5 224.465H1075.5C1075.5 263.124 1047.39 288.033 1012.04 303.476C976.69 318.913 934.25 324.811 905.952 325.5L905.976 326.5ZM268.5 326.5H905.964V325.5H268.5V326.5ZM106.501 224.494C107.476 241.553 116.775 267.063 141.441 288.303C166.114 309.551 206.129 326.5 268.5 326.5V325.5C206.314 325.5 166.547 308.604 142.093 287.546C117.632 266.48 108.459 241.223 107.499 224.437L106.501 224.494ZM268.5 110.5C208.025 110.5 167.515 121.144 142.119 140.748C116.692 160.375 106.5 188.914 106.5 224.465H107.5C107.5 189.114 117.624 160.919 142.73 141.54C167.866 122.137 208.106 111.5 268.5 111.5V110.5Z" 
            fill="black"
        />
    </svg>
`;

  const render = () => {
    if (!img) {
      const DOMURL = window.URL || window.webkitURL || window;

      img = new Image();
      const svg = new Blob([trackSvg], { type: "image/svg+xml;charset=utf-8" });
      const url = DOMURL.createObjectURL(svg);

      img.onload = function () {
        const width = cols * $caseSize * $pixelRatio;
        const height = (width * img.height) / img.width;
        rows = Math.ceil(height / $caseSize);

        const canvasCols = Math.ceil(($canvasWidth / $pixelRatio) / $caseSize);
        const canvasRows = Math.ceil(($canvasHeight / $pixelRatio) / $caseSize);

        trackOffset.set([
          Math.floor((canvasCols - cols) / 2),
          Math.floor((canvasRows - rows) / 2),
        ]);

        $context.drawImage(
          img,
          $trackOffset[0] * $caseSize * $pixelRatio,
          $trackOffset[1] * $caseSize * $pixelRatio,
          width,
          height
        );
        DOMURL.revokeObjectURL(url);
      };
      img.src = url;
    } else {
      const width = cols * $caseSize;
      const height = (width * img.height) / img.width;
      rows = Math.ceil(height / $caseSize);

      const canvasCols = Math.ceil($canvasWidth / $caseSize);
      const canvasRows = Math.ceil($canvasHeight / $caseSize);

      trackOffset.set([
        Math.floor((canvasCols - cols) / 2),
        Math.floor((canvasRows - rows) / 2),
      ]);
      $context.drawImage(
        img,
        $trackOffset[0] * $caseSize * $pixelRatio,
        $trackOffset[1] * $caseSize * $pixelRatio,
        width,
        height
      );
    }
    mounted = true;
  };

  registerRender(render);
</script>

{#if mounted && $trackOffset}
  <slot />
{/if}
