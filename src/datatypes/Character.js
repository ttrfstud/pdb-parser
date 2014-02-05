var pv = require('../prevalidator');

function Character(ch) {
	if (!validCh(ch)) {
		throw new Error('WRONG CHARACTER');
	}

	this.ch = ch;
}

Character.prototype.toString = function () {
	return this.ch;
};

function validCh(ch) {
	try {
		pv.validateCharacters(ch);

		if (ch === '\n' || ch === '\r') {
			return false;
		}

		return true;
	} catch (e) {
		return false;
	}
}

module.exports = Character;