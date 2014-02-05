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
MONTHS['Jan'] = 1;
MONTHS['Feb'] = 2;
MONTHS['Mar'] = 3; 
MONTHS['Apr'] = 4; 
MONTHS['May'] = 5; 
MONTHS['Jun'] = 6; 
MONTHS['Jul'] = 7; 
MONTHS['Aug'] = 8; 
MONTHS['Sep'] = 9; 
MONTHS['Oct'] = 10; 
MONTHS['Nov'] = 11; 
MONTHS['Dec'] = 12;

function getMonth(expression) {

	return parseInt(MONTHS[expression.substring(3, 6)]);
}

function getYear(expression) {
	var year = parseInt(expression.substring(7));

	if (year < 50) {
		return 2000 + year;
	} else {
		return 1900 + year;
	}
}

Datee.DATE_REG_EXP = /^(((0[1-9]|[1-2][0-9]|30|31)-(Jan|Mar|May|Jul|Aug|Oct|Dec))|((0[1-9]|[1-2][0-9])-Feb)|(([0][1-9]|[1-2][0-9]|30)-(Apr|Jun|Sep|Nov)))-(0[1-9]|[1-9][0-9])$/g;

function validDate(potentialDate) {
	Datee.DATE_REG_EXP.lastIndex = 0;
	var rsult = Datee.DATE_REG_EXP.test(potentialDate);

	return rsult;
}

module.exports = Datee;