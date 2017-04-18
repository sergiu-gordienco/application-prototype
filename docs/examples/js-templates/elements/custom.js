App.require('custom-elements', function (customElements) {
	customElements.registerMethods('myCustomElement', {
		__onInit : function () {
			var div = document.createElement('div');
			div.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';
			var button = document.createElement('button');
			button.innerText = 'Add node';
			button.addEventListener('click', function () {
				var div = document.createElement('div');
				div.innerText = 'some div';
				this.parentElement.appendChild(div);
			});
			var button2 = document.createElement('button');
			button2.innerText = 'Add attribute';
			button2.addEventListener('click', function () {
				this.parentElement.setAttribute('t' + Math.random(),'');
			});
			this.appendChild(div);
			this.appendChild(button);
			this.appendChild(button2);
		},
		__onContentChange : function () {
			alert('content changed!');
		},
		__onAttrChange : function () {
			alert('node attributes changed!');
		}
	});
	module.exports = {};
});
