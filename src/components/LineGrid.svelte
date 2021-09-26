<script context="module">
  const img = new Image();
  let localCaseSize;
</script>

<script>
  import { context, caseSize, registerRender } from "./../state/canvas";

  const getGridSvg = (size) => `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
                <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="gray" stroke-width="1" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>`;

  const render = () => {
    if ($caseSize !== localCaseSize) {
      const DOMURL = window.URL || window.webkitURL || window;
      const gridSvg = getGridSvg($caseSize);

      const svg = new Blob([gridSvg], { type: "image/svg+xml;charset=utf-8" });
      const url = DOMURL.createObjectURL(svg);

      img.onload = function () {
        $context.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
      };
      img.src = url;
      localCaseSize = $caseSize;
    } else {
      $context.drawImage(img, 0, 0);
    }
  };

  registerRender(render);
</script>

<slot />
