# Canvas-draw

Links: [Index](../../README.md)

A canvas drawing utility module that provides an animation-loop based drawing environment built on top of `ApplicationPrototype`.

## Features

- FPS-controlled animation loop using `requestAnimationFrame`
- Path-based drawing with z-index ordering
- Debug mode for performance monitoring
- Automatic canvas element creation if none provided

## Usage

```js
Application.require('canvas-draw').then(function (canvasDraw) {
  var myCanvas = document.getElementById('myCanvas');
  var drawer = canvasDraw(myCanvas, {
    fps: 60,
    debug: false
  });

  // Use drawer methods to add paths and control animation
}, console.error);
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fps` | number | 40 | Target frames per second |
| `debug` | boolean | false | Enable debug logging |

## Methods

- `debug(status)` - Get/set debug mode
- Path management methods for adding, removing, and rendering canvas paths
- Animation control methods for starting, stopping, and managing the render loop
