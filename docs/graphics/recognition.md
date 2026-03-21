# recognition -- Edge Detection

Basic image recognition via edge detection on pixel data.

## Overview

The `recognition` module provides edge detection that analyzes pixel data to find boundaries between regions of different intensity. It compares each pixel against its neighbors and returns coordinate pairs where significant changes are detected.

## Advantages

- **Pure JavaScript** -- no WebAssembly, no server processing
- **Threshold control** -- adjust sensitivity to fine-tune detection
- **Coordinate output** -- returns `[x, y]` pairs for further analysis
- **Composable** -- combine with filters (grayscale, contrast) for better results
- **Lightweight** -- single-pass algorithm, fast on moderate-sized images

## Getting Started

```js
App.require('graphic/recognition').then(function (recognition) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var edges = recognition.edgeDetection(imageData, 30);
    console.log('Found', edges.length, 'edge points');
});
```

## API Reference

### `edgeDetection(pixelData, threshold)`

Detects edges by comparing each pixel's intensity against its four neighbors (left, right, top, bottom).

| Parameter | Type | Description |
|-----------|------|-------------|
| `pixelData` | ImageData | Source image pixel data |
| `threshold` | number | Minimum intensity difference to count as an edge (0-255) |

**Returns:** `Array<[number, number]>` -- array of `[x, y]` coordinate pairs where edges were detected.

**Algorithm:** Compares the blue channel value of each pixel against its left, right, top, and bottom neighbors. If any difference exceeds the threshold, the pixel is marked as an edge point.

## Code Examples

### Example 1: Visualize Detected Edges

```js
App.require([
    'graphic/recognition/edge-detection',
    'graphic/filters/saturation'
]).then(function (libs) {
    var edgeDetection = libs['graphic/recognition/edge-detection'];
    var saturation = libs['graphic/filters/saturation'];

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Convert to grayscale first for better results
    var gray = saturation(imageData, 0);

    // Detect edges
    var edges = edgeDetection(gray, 25);

    // Draw edges on a clean canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';

    edges.forEach(function (point) {
        ctx.fillRect(point[0], point[1], 1, 1);
    });
});
```

### Example 2: Edge Count as Image Complexity Metric

```js
var edges = edgeDetection(imageData, 30);
var totalPixels = imageData.width * imageData.height;
var edgeRatio = edges.length / totalPixels;

if (edgeRatio > 0.15) {
    console.log('Complex image (lots of detail)');
} else if (edgeRatio > 0.05) {
    console.log('Moderate complexity');
} else {
    console.log('Simple image (few edges)');
}
```

### Example 3: Combine with Filters for Better Detection

```js
App.require([
    'graphic/recognition/edge-detection',
    'graphic/filters'
]).then(function (libs) {
    var edgeDetection = libs['graphic/recognition/edge-detection'];
    var filters = libs['graphic/filters'];

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Pre-process: grayscale + increase contrast + slight blur
    var processed = filters.saturation(imageData, 0);
    processed = filters.contrast(processed, 1.5);
    processed = filters.blur(processed, 1);

    // Detect edges on the cleaned-up image
    var edges = edgeDetection(processed, 20);
    console.log('Found', edges.length, 'edge points');
});
```

## Tips

- **Convert to grayscale first** -- edge detection examines the blue channel, so grayscale images give the most consistent results
- **Adjust threshold** -- lower values detect more edges (noisy), higher values detect fewer (cleaner)
- **Pre-blur** -- a slight blur reduces noise and produces cleaner edge lines
- **Increase contrast** -- makes edges more distinct before detection

## Related Modules

- [filters](filters.md) -- pre-process images before edge detection
- [convert](convert.md) -- load images as ImageData for processing
- [utils](../modules/graphic/utils.md) -- clone ImageData to preserve originals
