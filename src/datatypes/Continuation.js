function Continuation(expression) {
	if(!/^( |  \d | \d\d )$/g.test(expression)) {
		console.log('no');
		throw new Error('WRONG CONTINUATION');
	}

	this.expression = expression;

	if (!this.expression.trim()) {
		this.order = 1;
	} else {
		this.order = parseInt(expression);
	}
}

Continuation.prototype.toString = function () {
	return this.expression;
}

module.exports = Continuation;