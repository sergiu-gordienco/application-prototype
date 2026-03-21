# Image Filters

Pure JavaScript image filters that operate on ImageData objects.

## Overview

Each filter takes an ImageData object and returns a new (or modified) ImageData. Filters are composable -- chain them to build complex effects.

## Available Filters

| Filter | Description | Parameters |
|--------|-------------|------------|
| `blur` | Gaussian blur | `imageData, offset, [alpha], [repeats]` |
| `contrast` | Adjust contrast | `imageData, amount, [dest]` |
| `saturation` | Adjust color saturation | `imageData, amount, [dest]` |
| `brightness` | Adjust brightness | `imageData, amount, [dest]` |
| `gamma` | Gamma correction | `imageData, amount, [dest]` |
| `grayscale` | Convert to grayscale | `imageData, [dest]` |
| `invert` | Invert colors | `imageData, [dest]` |
| `sepia` | Sepia tone effect | `imageData, [dest]` |
| `vibrance` | Adjust color vibrance | `imageData, amount, [dest]` |
| `clip` | Crop/clip region | `imageData, options` |

## Getting Started

```js
App.require('graphic/filters').then(function (filters) {
    // Get ImageData from a canvas
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Apply a filter
    var blurred = filters.blur(imageData, 3);

    // Put result back
    ctx.putImageData(blurred, 0, 0);
});
```

## Code Examples

### Example 1: Photo Editor with Multiple Filters

```js
App.require('graphic/filters').then(function (filters) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var originalData = null;

    // Load image
    var img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = 'photo.jpg';

    // Apply filters from UI controls
    function applyFilters() {
        var data = originalData;
        data = filters.brightness(data, parseFloat(document.getElementById('brightness').value));
        data = filters.contrast(data, parseFloat(document.getElementById('contrast').value));
        data = filters.saturation(data, parseFloat(document.getElementById('saturation').value));
        ctx.putImageData(data, 0, 0);
    }

    document.getElementById('brightness').addEventListener('input', applyFilters);
    document.getElementById('contrast').addEventListener('input', applyFilters);
    document.getElementById('saturation').addEventListener('input', applyFilters);
});
```

### Example 2: Instagram-style Preset Filters

```js
App.require('graphic/filters').then(function (filters) {
    var presets = {
        normal: function (data) { return data; },
        vintage: function (data) {
            data = filters.saturation(data, 0.6);
            data = filters.contrast(data, 1.2);
            return filters.sepia(data);
        },
        dramatic: function (data) {
            data = filters.contrast(data, 1.5);
            data = filters.saturation(data, 1.3);
            return filters.vibrance(data, 1.5);
        },
        noir: function (data) {
            data = filters.grayscale(data);
            return filters.contrast(data, 1.4);
        },
        dreamy: function (data) {
            data = filters.brightness(data, 1.1);
            data = filters.saturation(data, 0.8);
            return filters.blur(data, 2);
        }
    };

    function applyPreset(name) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var result = presets[name](imageData);
        ctx.putImageData(result, 0, 0);
    }
});
```

### Example 3: Edge Detection for Shape Recognition

```js
App.require([
    'graphic/filters/saturation',
    'graphic/recognition/edge-detection'
]).then(function (libs) {
    var grayscale = function (data) {
        return libs['graphic/filters/saturation'](data, 0);
    };
    var edgeDetection = libs['graphic/recognition/edge-detection'];

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var gray = grayscale(imageData);
    var edges = edgeDetection(gray);
    ctx.putImageData(edges, 0, 0);
});
```

## Filter Parameters

### `blur(imageData, offset, [alpha], [repeats])`
- `offset` -- blur radius (pixels)
- `alpha` -- include alpha channel (default: false)
- `repeats` -- number of blur passes (default: 1, more = smoother)

### `saturation(imageData, amount, [dest])`
- `amount` -- 0 = grayscale, 1 = normal, >1 = oversaturated

### `contrast(imageData, amount, [dest])`
- `amount` -- 0 = flat gray, 1 = normal, >1 = high contrast

### `brightness(imageData, amount, [dest])`
- `amount` -- 0 = black, 1 = normal, >1 = brighter

### `vibrance(imageData, amount, [dest])`
- `amount` -- boosts muted colors more than saturated ones

## Related Modules

- [convert](convert.md) -- Blob/ImageData conversion for loading images
- [canvas-draw](canvas-draw.md) -- canvas animation
- [Media / Webcam](../media/index.md) -- capture live camera feed for processing
