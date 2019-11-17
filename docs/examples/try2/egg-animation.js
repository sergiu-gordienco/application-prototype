var eggBuilder = function (canvas, eggs) {
	var t = (new Date().valueOf() - time0)/1000;
	var context = canvas.getContext('2d');
	var time0	= new Date().valueOf();
	var circleCoords	= function (circle) {
		var alpha = ( ( circle.phy + circle.speed * t ) % 360 );
		return {
			x: Math.cos(alpha/180 * Math.PI) * circle.cdelta,
			y: Math.sin(alpha/180 * Math.PI) * circle.cdelta
		};
	};

	var draw = function () {
		eggs.circles.forEach(function (circle) {
			var cords = circleCoords(circle);
			context.beginPath();
			context.arc(
				eggs.x + cords.x,
				eggs.y + cords.y,
				circle.radius,
				0,
				2 * Math.PI,
				false
			);
			context.fillStyle = 'rgba(0, 0, 0, 0.45)';
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle = 'rgba(0, 0, 0, 0.65)';
			context.stroke();
		});
	};

	var render = function () {
		t = (new Date().valueOf() - time0)/1000;
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw();
		window.requestAnimationFrame(render);
	};

	return (function () {
		window.requestAnimationFrame(render);
		return {
			addCircle : function (circle) {
				if (circle.speed && circle.phy && circle.radius && circle.cdelta) {
					eggs.circles.push({
						"speed": circle.speed,
						"phy": circle.phy,
						"radius": circle.radius,
						"cdelta": circle.cdelta
					});
				} else {
					console.log('wrong circle');
					return;
				}
			},
			getEgg : function () {
				return eggs;
			},
			moveCenter : function (x,y) {
				eggs.x = x;
				eggs.y = y;
			}
			// updateEgg : function (newEgg) {
			// 	eggs.x = newEgg.x || eggs.x;
			// 	eggs.y = newEgg.y || eggs.y;
			// 	if (eggs.circles && Array.isArray(eggs.circles)) {
			// 		eggs.circles.forEach(function (circle, i) {
			// 			for (var name in circle) {
			// 				eggs.circles[i][name] = circle[t];
			// 			}
			// 		});
			// 	}
			// }
		};
	})();
};

// var configHeroOu = {
// 	x : 100,
// 	y : 100,
// 	circles : [
		// {
		// 	"speed": 1250,
		// 	"phy": 45,
		// 	"radius": 25,
		// 	"cdelta": 4
		// },
// 		{
// 			"speed": 1250,
// 			"phy": -45,
// 			"radius": 60,
// 			"cdelta": 6
// 		},
// 		{
// 			"speed": 1250,
// 			"phy": 15,
// 			"radius": 90,
// 			"cdelta": 10
// 		}
// 	]
// };
