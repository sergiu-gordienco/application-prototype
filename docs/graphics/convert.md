# convert -- Image Format Conversion

Convert between Blob and ImageData for loading, processing, and exporting images in the browser.

## Overview

The `convert` module provides two functions: `blobToImagedata` to load image blobs into pixel-accessible ImageData, and `imagedataToBlob` to export processed ImageData back to a PNG blob. These bridge the gap between file/network formats and the pixel arrays used by image filters.

## Advantages

- **Load any image format** -- browser-supported formats (JPEG, PNG, GIF, WebP) become ImageData
- **Resize on load** -- optional max width/height with aspect ratio preservation
- **Export to PNG** -- convert processed pixels back to a downloadable blob
- **Pipeline-friendly** -- pairs naturally with `graphic/filters` for load-process-save workflows
- **No dependencies** -- uses native Canvas API internally

## Getting Started

```js
App.require('graphic/convert').then(function (convert) {
    // Load an image file as ImageData
    fetch('/photo.jpg')
        .then(function (r) { return r.blob(); })
        .then(function (blob) {
            convert.blobToImagedata(blob, function (err, imageData, width, height) {
                if (err) return console.error(err);
                console.log('Loaded:', width, 'x', height);
            });
        });
});
```

## API Reference

### `blobToImagedata(blob, callback, [maxWidth], [maxHeight])`

Converts a Blob (image file) to an ImageData object. Optionally resizes while preserving aspect ratio.

| Parameter | Type | Description |
|-----------|------|-------------|
| `blob` | Blob | Image blob to convert |
| `callback` | function | On success: `callback(undefined, imageData, width, height)`. On error: `callback(error)` (single argument) |
| `maxWidth` | number | Optional maximum width for resizing (maintains aspect ratio) |
| `maxHeight` | number | Optional maximum height for resizing (maintains aspect ratio) |

### `imagedataToBlob(imageData, callback)`

Converts an ImageData object to a PNG Blob.

| Parameter | Type | Description |
|-----------|------|-------------|
| `imageData` | ImageData | Pixel data to convert |
| `callback` | function | `callback(blob)` |

## Code Examples

### Example 1: Load, Filter, and Download

```js
App.require([
    'graphic/convert',
    'graphic/filters/saturation'
]).then(function (libs) {
    var convert = libs['graphic/convert'];
    var saturation = libs['graphic/filters/saturation'];

    var input = document.getElementById('fileInput');
    input.addEventListener('change', function () {
        var file = input.files[0];

        convert.blobToImagedata(file, function (err, imageData) {
            if (err) return console.error(err);

            // Apply grayscale filter
            var gray = saturation(imageData, 0);

            // Convert back to blob for download
            convert.imagedataToBlob(gray, function (blob) {
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'grayscale.png';
                a.click();
                URL.revokeObjectURL(url);
            });
        });
    });
});
```

### Example 2: Resize Large Images Before Processing

```js
convert.blobToImagedata(largeBlob, function (err, imageData, w, h) {
    if (err) return console.error(err);
    console.log('Resized to:', w, 'x', h); // max 800x600

    var canvas = document.getElementById('preview');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').putImageData(imageData, 0, 0);
}, 800, 600);
```

### Example 3: Webcam Snapshot to Blob

```js
App.require([
    'devices/webcam',
    'graphic/convert'
]).then(function (libs) {
    var webcam = libs['devices/webcam'];
    var convert = libs['graphic/convert'];

    // Capture frame as ImageData from canvas
    var canvas = document.getElementById('webcamCanvas');
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Export as blob for upload
    convert.imagedataToBlob(imageData, function (blob) {
        var formData = new FormData();
        formData.append('snapshot', blob, 'snapshot.png');
        fetch('/api/upload', { method: 'POST', body: formData });
    });
});
```

## Related Modules

- [filters](filters.md) -- process ImageData with blur, contrast, saturation, etc.
- [canvas-draw](canvas-draw.md) -- render ImageData on animated canvas
- [utils](../modules/graphic/utils.md) -- clone ImageData before processing
