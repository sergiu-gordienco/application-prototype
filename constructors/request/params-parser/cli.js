var parserArguments = function (str, options) {
	var args = {
		_ : []
	};

	var config = {
		multipleValues : [],
		withoutValues  : [],
		allowListValues : false
	}

	if (options) {
		if (Array.isArray(options.multipleValues)) {
			options.multipleValues.forEach(function (item) {
				if (item && typeof(item) === "string") config.multipleValues.push(item);
			})
		}

		if (Array.isArray(options.withoutValues)) {
			options.withoutValues.forEach(function (item) {
				if (item && typeof(item) === "string") config.withoutValues.push(item);
			})
		}
		
		if (options.allowListValues === true) {
			config.allowListValues = options.allowListValues;
		}
	}

	var s = str,m, parts = [];
	while( m = s.match(/(\"[^\"]+\"|\'[^\']+\'|\S+)/) ) {
		parts.push(m[1].replace(/^(\"|\')([\s\S]+)?\1/,'$2'));
		s = s.split(m[0]).join('');
	}

	var pointer = null;
	while (parts.length) ((function (part) {
		if (part.indexOf('--') === 0 && part.length > 2) {
			pointer = part.substr(2);
			var value = null;
			if (pointer.indexOf('=') !== -1) {
				var pointerMatch = pointer.match(/^(.+?)\=([\s\S]*)$/);

				if (pointerMatch) {
					pointer = pointerMatch[1];
					value   = pointerMatch[2];
				}
			}

			args[pointer] = value;

			if (config.allowListValues === true || ( Array.isArray(config.withoutValues) && config.withoutValues.indexOf(pointer) !== -1 )) {
				pointer = value;
			}
		} else {
			if (pointer) {
				if (args[pointer]) {
					if (Array.isArray(args[pointer])) {
						args[pointer].push(part);
					} else {
						args[pointer] = [args[pointer], part];
					}
				} else {
					
					if (config.multipleValues.indexOf(pointer) === -1) {
						args[pointer] = part;
						pointer = null;
					} else {
						args[pointer] = [part];
					}
				}
			} else {
				args._.push(part);
			}
		}
	})(parts.shift()));

	return args;
};

String.prototype.parseCLIArguments = function (options) {
	return parserArguments(this, options);
};

module.exports  = parserArguments;
