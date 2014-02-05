function SymOP(expression) {
	if (!/^((  \d{4})|( \d{5}|\d{6}))$/.test(expression)) {
		throw new Error('WRONG SYMOP');
	}

	this.expression = expression;

	var son = parseInt(expression.substring(0, 3));
	var tv = parseInt(expression.substring(3));

	Object.defineProperty(this, 'son', {
		get: function () {
			return son;
		},
		set: function () {}
	});

	Object.defineProperty(this, 'tv', {
		get: function () {
			return tv;
		},

		set: function () {}
	});
}

SymOP.prototype.toString = function () {
	return this.expression;
};

module.exports = SymOP;