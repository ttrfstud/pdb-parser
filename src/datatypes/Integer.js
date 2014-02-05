function Integer(expression) {
	if (!validInt(expression)) {
		throw new Error('WRONG INTEGER');
	}

	this.val = parseInt(expression);

	this.expression = expression;
}

Integer.prototype.toString = function () {
	return this.expression;
}

Integer.REG_EXP = /^\s*\d+$/g;

function validInt(expression) {
	Integer.REG_EXP.lastIndex = 0;

	return Integer.REG_EXP.test(expression);
}

module.exports = Integer;