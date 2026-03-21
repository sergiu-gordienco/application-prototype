# canvas-draw -- Canvas Animation Engine

FPS-controlled canvas animation with path-based drawing, operation queues, and grouping.

## Overview

`canvas-draw` creates an animation environment around an HTML `<canvas>` element. Define paths with drawing operations, organize them into groups, and let the built-in animation loop render them at a controlled frame rate using `requestAnimationFrame`.

## Advantages

- **FPS control** -- set target frame rate, engine handles timing
- **Path objects** -- each drawable element is an independent ApplicationPrototype instance with its own events
- **Operation queues** -- paths store drawing operations that execute in order each frame
- **Group management** -- organize paths into named groups for batch operations
- **Hit detection** -- coordinate-based hit testing on paths
- **Debug mode** -- log every drawing operation to the console
- **Image smoothing** -- cross-browser image smoothing control
- **Dynamic operations** -- operation parameters can be functions evaluated per frame

## Getting Started

```js
App.require('canvas-draw').then(function (CanvasDraw) {
    var canvas = document.getElementById('myCanvas');
    var app = new CanvasDraw(canvas, { fps: 60 });

    // Create a path with drawing operations
    var rect = app.path();
    rect.operations('fillStyle', 'red');
    rect.operations('fillRect', [50, 50, 100, 80]);

    // Animation starts automatically
});
```

## API Reference

### Constructor

```js
CanvasDraw(canvas, [config])
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `canvas` | HTMLCanvasElement | new canvas | Canvas element to draw on |
| `config.fps` | number | 40 | Target frames per second |
| `config.debug` | boolean | false | Log operations to console |
| `config.animate` | boolean | true | Start animation immediately |

### App Methods

| Method | Description |
|--------|-------------|
| `canvas()` | Returns the canvas element |
| `context()` | Returns the 2D rendering context |
| `width([value])` | Get/set canvas width (triggers re-render) |
| `height([value])` | Get/set canvas height (triggers re-render) |
| `path([config])` | Create a path and add it to the render list |
| `createPath([config])` | Create a path without adding to render list |
| `pathById(id)` | Find a path by its ID |
| `group(name)` | Get all paths in a named group |
| `paths()` | Get all registered paths |
| `render([callback])` | Render all paths once |
| `animate([boolean])` | Start/stop the animation loop, or get status |
| `fps(value)` | Set target frame rate |
| `imageSmoothingEnabled([bool])` | Get/set image smoothing (cross-browser) |
| `debug([bool])` | Get/set debug mode |

### App Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `onRender` | -- | Fired before each render pass |
| `path-created` | `path` | Fired when a new path is created |

### Path Methods

| Method | Description |
|--------|-------------|
| `config()` | Returns the path's configuration object |
| `vars()` | Returns the path's variables store |
| `app()` | Returns the parent CanvasDraw instance |
| `operations(operation, [params], [id], [group])` | Add or update a drawing operation |
| `operationById(id)` | Get an operation by ID |
| `operationsByGroup(group)` | Get operations in a group |
| `operationsRemoveById(id)` | Remove an operation by ID |
| `operationsRemoveByGroup(group)` | Remove all operations in a group |
| `coords([x, y])` | Get hit regions, or test if point is inside |
| `group(name, [bool])` | Get/set group membership |
| `groups()` | Get all group names for this path |
| `isReady([bool])` | Get/set whether this path should render |
| `render([callback])` | Render this path's operations |

### Drawing Operations

Operations are either:
- **Context methods** -- any `CanvasRenderingContext2D` method name (e.g., `'fillRect'`, `'arc'`, `'moveTo'`)
- **Context properties** -- any context property name (e.g., `'fillStyle'`, `'lineWidth'`, `'globalAlpha'`)
- **Custom functions** -- a function that receives `(path, operation, app)` as context

## Code Examples

### Example 1: Animated Bouncing Ball

```js
App.require('canvas-draw').then(function (CanvasDraw) {
    var canvas = document.getElementById('canvas');
    canvas.width = 400;
    canvas.height = 300;

    var app = new CanvasDraw(canvas, { fps: 60 });

    // Background
    var bg = app.path();
    bg.operations('fillStyle', '#1a1a2e');
    bg.operations('fillRect', function () {
        return [0, 0, canvas.width, canvas.height];
    });

    // Ball
    var ball = app.path();
    ball.vars().x = 200;
    ball.vars().y = 150;
    ball.vars().dx = 3;
    ball.vars().dy = 2;
    ball.vars().radius = 20;

    ball.operations('fillStyle', '#e94560');
    ball.operations('beginPath', []);
    ball.operations('arc', function (path) {
        var v = path.vars();
        // Update position
        v.x += v.dx;
        v.y += v.dy;
        // Bounce off walls
        if (v.x - v.radius < 0 || v.x + v.radius > canvas.width) v.dx *= -1;
        if (v.y - v.radius < 0 || v.y + v.radius > canvas.height) v.dy *= -1;
        return [v.x, v.y, v.radius, 0, Math.PI * 2];
    });
    ball.operations('fill', []);
});
```

### Example 2: Interactive Drawing with Groups

```js
var app = new CanvasDraw(canvas, { fps: 30 });

// Create UI layer group
var button = app.path();
button.group('ui', true);
button.operations('fillStyle', '#333');
button.operations('fillRect', [10, 10, 100, 40]);
button.operations('fillStyle', '#fff');
button.operations('font', '14px sans-serif');
button.operations('fillText', ['Click me', 20, 35]);

// Hit detection
button.coords([[10, 10, 110, 50]]);

canvas.addEventListener('click', function (e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (button.coords(x, y)) {
        console.log('Button clicked!');
    }
});

// Remove all UI elements at once
// app.group('ui').forEach(function (p) { p.isReady(false); });
```

### Example 3: Pause and Resume Animation

```js
var app = new CanvasDraw(canvas, { fps: 60 });

document.getElementById('pause').addEventListener('click', function () {
    app.animate(false);
});

document.getElementById('resume').addEventListener('click', function () {
    app.animate(true);
});

document.getElementById('fpsSlider').addEventListener('input', function () {
    app.fps(parseInt(this.value));
});
```

## Related Modules

- [filters](filters.md) -- apply image filters to canvas content
- [convert](convert.md) -- export canvas content as Blob/ImageData
- [Media / Webcam](../media/index.md) -- draw camera feed onto canvas
