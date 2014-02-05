function AChar(ch) {
	if (!alphabetCh(ch)) {
		throw new Error('WRONG ACHAR');
	}

	this.ch = ch;
}

AChar.prototype.toString = function () {
	return this.ch;
}

function alphabetCh(ch) {
	if (ch.length !== 1) {
		return false;
	}

	var code = ch.charCodeAt(0);

	if (code >= 65 && code <= 90 || code >= 97 && code <= 122) {
		return true;
	}

	return false;
}

module.exports = AChar;