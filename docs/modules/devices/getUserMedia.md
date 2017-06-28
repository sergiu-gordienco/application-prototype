# getUserMedia

Cross-browser wrapper for `getUserMedia`. Upon function call, it will add a new function in `navigator.mediaDevices`. If `navigator.mediaDevices` does not exist, it is replaced with an empty object to preserve promise interface. In case `mediaDevices` is not supported, it will return an error in Promise.

Example:
```js
	App.require("devices/getUserMedia", function (getUserMedia) {
		navigator.mediaDevices.getUserMedia({
			audio : true,
			video : true
		}).then(function (stream) {
			// stream object
		}).catch(function (err) {
			console.warn(err);
		})
	});
```
