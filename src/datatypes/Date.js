function Datee(expression) {
	if (!validDate(expression)) {
		throw new Error('WRONG DATE');
	}

	this.day = getDay(expression);
	this.month = getMonth(expression);
	this.year = getYear(expression);

	this.expression = expression;
}

Datee.prototype.toString = function () {
	return this.expression;
}

function getDay(expression) {
	return parseInt(expression.substring(0, 2));
}

var MONTHS = [];
MONTHS['JAN'] = 1;
MONTHS['FEB'] = 2;
MONTHS['MAR'] = 3; 
MONTHS['APR'] = 4; 
MONTHS['MAY'] = 5; 
MONTHS['JUN'] = 6; 
MONTHS['JUL'] = 7; 
MONTHS['AUG'] = 8; 
MONTHS['SEP'] = 9; 
MONTHS['OCT'] = 10; 
MONTHS['NOV'] = 11; 
MONTHS['DEC'] = 12;

function getMonth(expression) {

	return parseInt(MONTHS[expression.substring(3, 6)]);
}

function getYear(expression) {
	var year = parseInt(expression.substring(7));

	console.log(year);
	if (year < 50) {
		return 2000 + year;
	} else {
		return 1900 + year;
	}
}

Datee.DATE_REG_EXP = /^(((0[1-9]|[1-2][0-9]|30|31)-(JAN|MAR|MAY|JUL|AUG|OCT|DEC))|((0[1-9]|[1-2][0-9])-FEB)|(([0][1-9]|[1-2][0-9]|30)-(APR|JUN|SEP|NOV)))-(0[1-9]|[1-9][0-9])$/g;

function validDate(potentialDate) {
	Datee.DATE_REG_EXP.lastIndex = 0;
	var rsult = Datee.DATE_REG_EXP.test(potentialDate);

	return rsult;
}

module.exports = Datee;