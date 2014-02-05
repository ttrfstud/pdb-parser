function Real(expression, n, m) {
	if (expression.length !== n) {
		throw new Error('WRONG REAL');
	}

	if (expression.split('.').length - 1 && 
		expression.split('.')[1].length !== m) {
		throw new Error('WRONG REAL');
	}

	Object.defineProperty(this, 'expression', {
		get: function () { return expression;},
		set: function () {}});

	var val = parseFloat(expression);

	Object.defineProperty(this, 'val', {
		get: function () { return val; },
		set: function () {}});
}

Real.prototype.toString = function () {
	return this.expression;
}

module.exports = Real;