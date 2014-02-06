function IDcode(expression) {
	if(!validIDcode(expression)) {
		throw new Error('WRONG IDCODE');
	}

	this.first = parseInt(expression[0]);
	this.second = expression[1];
	this.third = expression[2];
	this.fourth = expression[3];

	this.expression = expression;
}

IDcode.prototype.containsCoordinateData = function () {
	return !!this.first;
}

IDcode.prototype.toString = function () {
	return this.expression;
}

IDcode.ID_CODE_REG_EXP = /[0-9][A-Z0-9]{3}/g;

function validIDcode(expression) {
	IDcode.ID_CODE_REG_EXP.lastIndex = 0;

	return IDcode.ID_CODE_REG_EXP.test(expression);
}

module.exports = IDcode;