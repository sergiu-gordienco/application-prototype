# Guide: Building an Image Editor

Build a browser-based image editor using graphic filters, canvas-draw, and webcam capture.

## What We'll Build

A **Photo Editor** with:
- Load image from file
- Capture from webcam
- Apply filters (grayscale, sepia, blur, contrast, brightness)
- Real-time preview
- Download edited image

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Photo Editor</title>
    <script src="ApplicationPrototype.js"></script>
    <script src="ApplicationBuilder.js"></script>
    <style>
        canvas { border: 1px solid #ccc; max-width: 100%; }
        .controls { padding: 10px; }
        .controls label { display: block; margin: 5px 0; }
        .controls input[type=range] { width: 200px; }
        button { margin: 5px; padding: 8px 16px; }
    </style>
</head>
<body>
    <h1>Photo Editor</h1>

    <div>
        <button id="loadFile">Load Image</button>
        <button id="capture">Capture from Webcam</button>
        <button id="download">Download</button>
        <input type="file" id="fileInput" accept="image/*" style="display:none">
    </div>

    <div class="controls">
        <label>Brightness: <input type="range" id="brightness" min="0.5" max="2" step="0.1" value="1"></label>
        <label>Contrast: <input type="range" id="contrast" min="0.5" max="2" step="0.1" value="1"></label>
        <label>Saturation: <input type="range" id="saturation" min="0" max="2" step="0.1" value="1"></label>
        <label>Blur: <input type="range" id="blur" min="0" max="10" step="1" value="0"></label>
        <button id="sepia">Sepia</button>
        <button id="grayscale">Grayscale</button>
        <button id="invert">Invert</button>
        <button id="reset">Reset</button>
    </div>

    <canvas id="canvas"></canvas>
    <video id="video" style="display:none" autoplay></video>

    <script>
    var App = new ApplicationBuilder({
        onready: function () {
            var App = this;
            App.modulePath('./constructors');
            App.require(['extensions/prototype', 'lib'], function (libs) {
                libs.lib();

                App.require([
                    'graphic/filters',
                    'devices/webcam'
                ]).then(function (libs) {
                    var filters = libs['graphic/filters'];
                    var webcam = libs['devices/webcam'];

                    var canvas = document.getElementById('canvas');
                    var ctx = canvas.getContext('2d');
                    var originalData = null;

                    // Load image from file
                    document.getElementById('loadFile').onclick = function () {
                        document.getElementById('fileInput').click();
                    };

                    document.getElementById('fileInput').onchange = function (e) {
                        var file = e.target.files[0];
                        var img = new Image();
                        img.onload = function () {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.drawImage(img, 0, 0);
                            originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        };
                        img.src = URL.createObjectURL(file);
                    };

                    // Capture from webcam
                    document.getElementById('capture').onclick = function () {
                        var video = document.getElementById('video');
                        webcam.getStream(function (err, stream) {
                            if (err) return alert('Camera error: ' + err);
                            webcam.loadVideo(stream, video, function () {
                                video.style.display = 'block';
                                setTimeout(function () {
                                    canvas.width = video.videoWidth;
                                    canvas.height = video.videoHeight;
                                    ctx.drawImage(video, 0, 0);
                                    originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                    stream.getTracks().forEach(function (t) { t.stop(); });
                                    video.style.display = 'none';
                                }, 500);
                            });
                        }, { video: true, audio: false });
                    };

                    // Apply filters
                    function applyFilters() {
                        if (!originalData) return;
                        var data = originalData;

                        var b = parseFloat(document.getElementById('brightness').value);
                        var c = parseFloat(document.getElementById('contrast').value);
                        var s = parseFloat(document.getElementById('saturation').value);
                        var bl = parseInt(document.getElementById('blur').value);

                        if (b !== 1) data = filters.brightness(data, b);
                        if (c !== 1) data = filters.contrast(data, c);
                        if (s !== 1) data = filters.saturation(data, s);
                        if (bl > 0) data = filters.blur(data, bl);

                        ctx.putImageData(data, 0, 0);
                    }

                    ['brightness', 'contrast', 'saturation', 'blur'].forEach(function (id) {
                        document.getElementById(id).addEventListener('input', applyFilters);
                    });

                    // Preset filters
                    document.getElementById('sepia').onclick = function () {
                        if (!originalData) return;
                        ctx.putImageData(filters.sepia(originalData), 0, 0);
                    };
                    document.getElementById('grayscale').onclick = function () {
                        if (!originalData) return;
                        ctx.putImageData(filters.grayscale(originalData), 0, 0);
                    };
                    document.getElementById('invert').onclick = function () {
                        if (!originalData) return;
                        ctx.putImageData(filters.invert(originalData), 0, 0);
                    };
                    document.getElementById('reset').onclick = function () {
                        if (!originalData) return;
                        ctx.putImageData(originalData, 0, 0);
                        document.getElementById('brightness').value = 1;
                        document.getElementById('contrast').value = 1;
                        document.getElementById('saturation').value = 1;
                        document.getElementById('blur').value = 0;
                    };

                    // Download
                    document.getElementById('download').onclick = function () {
                        var a = document.createElement('a');
                        a.download = 'edited-photo.png';
                        a.href = canvas.toDataURL('image/png');
                        a.click();
                    };
                });
            });
        }
    });
    </script>
</body>
</html>
```

## Modules Used

| Module | Purpose |
|--------|---------|
| `graphic/filters` | All image filters (brightness, contrast, saturation, blur, sepia, etc.) |
| `devices/webcam` | Camera capture |
| `extensions/prototype` | Utility functions |
| `lib` | Module registration |
