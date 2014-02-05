var Specification = require('./Specification');

function SpecificationList(expression) {
	if (expression.indexOf(',') !== -1) {
		throw new Error('WRONG SPECIFICATION LIST');
	}

	var split = expression.split(';');

	var list = [];


	// console.log('split', split);
	for (var i = 0; i < split.length; i++) {
		try {
			list.push(new Specification(split[i]));
		} catch (e) {
			console.log(e);
			throw new Error('WRONG SPECIFICATION LIST');
		}
	}

	Object.defineProperty(this, 'list', {
		get: function () {
			return list.slice(0);
		},

		set: function () {}
	});
}

SpecificationList.prototype.toString = function () {
	var toString = '';
	var prefix = '';

	var list = this.list;
	for (var i = 0; i < list.length; i++) {
		toString += prefix + list[i].toString();
		prefix = ';';
	}

	return toString;
}

module.exports = SpecificationList;