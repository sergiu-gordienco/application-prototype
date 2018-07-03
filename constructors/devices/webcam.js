global.require("devices/getUserMedia", function (getUserMedia) {
	var config	= {
		loadTimeout	: 10000
	};
	module.exports	= {
		getStream	: function (cb, constraints) {
			// Prefer camera resolution nearest to 1280x720.
			if (typeof(constraints) === "undefined")
				constraints = { audio: true, video: true };

			navigator.mediaDevices.getUserMedia(constraints)
			.then(function(stream) {
				cb(undefined, stream);
			})
			.catch(function(err) {
				cb(err);
			});
		},
		loadTimeout	: function (ms) {
			if (typeof(ms) === "number") {
				config.loadTimeout	= ms;
			}
			return config.loadTimeout;
		},
		loadVideo	: function (stream, video, cb) {
			video.srcObject = stream;
			var runned	= false;
			video.onloadedmetadata = function(e) {
				if (!runned) {
					runned	= true;
					if (!cb) {
						video.play();
					} else {
						cb(undefined, video);
					}
				}
			};
			setTimeout(function () {
				if (!runned) {
					runned	= true;
					var er	= new Error("video load timeout");
					if (!cb) {
						throw er;
					} else {
						cb(er, video);
					}
				}
			}, config.loadTimeout);
		}
	};
});
