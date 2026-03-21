# Graphics & Media

Pure JavaScript image processing, canvas animation, and media conversion -- all in the browser, no server needed.

## Overview

The graphics group provides image filters (blur, contrast, saturation, sepia, etc.), format conversion (Blob/ImageData), edge detection, canvas drawing with animation loops, and ImageData utilities.

## Advantages

- **Pure JavaScript** -- no native dependencies, no WebAssembly, no server-side processing
- **10+ image filters** -- blur, contrast, saturation, brightness, gamma, grayscale, invert, sepia, vibrance, clip
- **Non-destructive** -- filters take source ImageData and return new ImageData
- **Composable pipelines** -- chain filters for complex effects
- **Canvas animation** -- FPS-controlled animation loop with path management
- **Format conversion** -- Blob to ImageData and back
- **Edge detection** -- basic image recognition capability

## Modules

| Module | Purpose |
|--------|---------|
| [filters](filters.md) | Image filters (blur, contrast, saturation, etc.) |
| [canvas-draw](canvas-draw.md) | Canvas animation with path management |
| [convert](convert.md) | Blob/ImageData format conversion |
| [recognition](recognition.md) | Edge detection for image analysis |

## Quick Example: Apply Sepia Filter to an Image

```js
App.require([
    'graphic/convert/blob-to-imagedata',
    'graphic/filters/saturation'
]).then(function (libs) {
    var blobToImageData = libs['graphic/convert/blob-to-imagedata'];
    var saturation = libs['graphic/filters/saturation'];

    // Load image as ImageData
    fetch('/photo.jpg')
        .then(function (r) { return r.blob(); })
        .then(blobToImageData)
        .then(function (imageData) {
            // Apply grayscale (saturation = 0)
            var result = saturation(imageData, 0);

            // Draw to canvas
            var canvas = document.getElementById('output');
            canvas.width = result.width;
            canvas.height = result.height;
            canvas.getContext('2d').putImageData(result, 0, 0);
        });
});
```

## Loading All Graphics Modules at Once

```js
App.require('graphic').then(function (graphic) {
    // graphic.filters.blur, graphic.filters.contrast, etc.
    // graphic.convert.blobToImagedata, graphic.convert.imagedataToBlob
    // graphic.recognition.edgeDetection
    // graphic.utils.imagedataClone
});
```
