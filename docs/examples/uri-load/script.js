var someFunction = function () {
	console.log('this shows you that a script was loaded');
};
var button = document.createElement('button');
button.innerText = 'Click';
button.addEventListener('click', function (ev) {
	ev.preventDefault();
	var div = document.createElement('div');
	div.innerText = 'this shows you that a script was loaded';
	document.body.appendChild(div);
});
document.body.appendChild(button);
