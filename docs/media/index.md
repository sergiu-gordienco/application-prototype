# Media: Webcam & Camera Access

Simple APIs for accessing the camera and microphone via `getUserMedia`.

## Overview

Two modules provide camera/microphone access: `devices/getUserMedia` (polyfill) and `devices/webcam` (high-level API).

## Advantages

- **Simple callback API** -- no need to remember the `navigator.mediaDevices` API
- **Polyfill included** -- works across browsers with different `getUserMedia` implementations
- **Video element helper** -- `loadVideo()` handles stream-to-video attachment
- **Configurable timeout** -- set max wait time for camera access
- **Audio + Video** -- configure which streams you need

## Quick Start: Show Webcam Feed

```html
<video id="camera" autoplay></video>

<script>
App.require('devices/webcam').then(function (webcam) {
    webcam.getStream(function (err, stream) {
        if (err) return console.error('Camera error:', err);

        webcam.loadVideo(stream, document.getElementById('camera'), function (err, video) {
            if (err) return console.error(err);
            console.log('Camera ready:', video.videoWidth, 'x', video.videoHeight);
        });
    }, { video: true, audio: false });
});
</script>
```

## API Reference

### `webcam.getStream(callback, [constraints])`

Request camera/microphone access.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `callback` | Function | | `function(err, stream)` |
| `constraints` | Object | `{ audio: true, video: true }` | Media constraints |

### `webcam.loadVideo(stream, videoElement, [callback])`

Attach a stream to a `<video>` element.

| Parameter | Type | Description |
|-----------|------|-------------|
| `stream` | MediaStream | Stream from `getStream` |
| `videoElement` | HTMLVideoElement | Target video element |
| `callback` | Function | `function(err, videoElement)` called on metadata load |

### `webcam.loadTimeout([ms])`

Get or set the timeout for camera access (default: 10000ms).

## Code Examples

### Example 1: Take a Snapshot

```js
App.require('devices/webcam').then(function (webcam) {
    var video = document.getElementById('camera');
    var canvas = document.getElementById('snapshot');

    webcam.getStream(function (err, stream) {
        if (err) return alert('Cannot access camera');

        webcam.loadVideo(stream, video, function () {
            document.getElementById('captureBtn').addEventListener('click', function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                console.log('Snapshot taken!');
            });
        });
    }, { video: true, audio: false });
});
```

### Example 2: Webcam + Image Filters Pipeline

```js
App.require([
    'devices/webcam',
    'graphic/filters/saturation',
    'graphic/filters/contrast'
]).then(function (libs) {
    var webcam = libs['devices/webcam'];
    var saturation = libs['graphic/filters/saturation'];
    var contrast = libs['graphic/filters/contrast'];

    var video = document.getElementById('camera');
    var canvas = document.getElementById('filtered');
    var ctx = canvas.getContext('2d');

    webcam.getStream(function (err, stream) {
        webcam.loadVideo(stream, video, function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Process each frame
            setInterval(function () {
                ctx.drawImage(video, 0, 0);
                var frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
                frame = saturation(frame, 0);     // grayscale
                frame = contrast(frame, 1.5);     // high contrast
                ctx.putImageData(frame, 0, 0);
            }, 1000 / 30); // 30 FPS
        });
    }, { video: true, audio: false });
});
```

## Related Modules

- [Graphics / Filters](../graphics/filters.md) -- process camera frames with image filters
- [canvas-draw](../graphics/canvas-draw.md) -- draw over camera feed
