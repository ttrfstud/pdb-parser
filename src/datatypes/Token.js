function Token(expression) {
	if (expression.substr(-2) !== ': ') {
		throw new Error('WRONG TOKEN');
	}

	var val = expression.substr(0, expression.length - 2);

	if (val.indexOf(' ') !== -1) {
		throw new Error('WRONG TOKEN');
	}

	Object.defineProperty(this, 'val', {
		get: function () { return val;},
		set: function () {}
	});
}

Token.prototype.toString = function () {
	return this.val + ': ';
};

module.exports = Token;