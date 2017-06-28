# webcam

This module is designed to add a video stream from webcam to a page in easy way.
It uses `getUserMedia` module from `application-prototype/constructors/devices/`.

Upon module load it returns an _(Object)_

```js
	{
		getStream : function (cb ,[constraints]) { ... },
		loadTimeout : function (ms) { ... },
		loadVideo : function (stream, video ,[cb]) { ... }
	}
```

`getStream` -  gets webcam/microphone stream. `cb` recieves 2 parameters: `err` and `stream` object. If there is an error, first argument will be an error, second will be undefined, and if there is no error, first `cb` argument will be undefined, second will be `stream` object.
`loadTimeout` - sets/gets the video load timeout. If video/audio stream cannot be played, it will throw an error after some milliseconds (indicated by this function).
`loadVideo` - loads current videostream Object into a HTML video tag and try to play it. If video cannot be played, it will throw an error. If no `cb` is provided, video will start playing instantly, otherwise it will return err as first argument and HTMLVideoElement as second. If there were some error, first argument will containt error, second will be undefined and vice-versa.

Example :
```js
	App.require("devices/webcam", function (webcam) {
		webcam.getStream(function (err, stream) {
			if (err) {
				console.warn(err);
				return;
			} else {
				webcam.loadTimeout(10000); // sets video error timeout for 10 seconds
				webcam.loadVideo(stream, someVideoHTMLElement, function (err, video) {
					if (!err) {
						video.play(); // play video
					} else {
						console.warn(err);
					}
				});
			}
		}, {
			video : true,
			audio : true
		});
	});
```
