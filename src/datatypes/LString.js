function LString(expression) {
	if (/[\r\n]/.test(expression)) {
		throw new Error('WRONG LSTRING');
	}

	if (/([^\\]\:|^\:)/.test(expression)) {
		throw new Error('WRONG LSTRING');
	}

	Object.defineProperty(this, 'val', {
		set: function () {},
		get: function ()  {return expression;}});
}

LString.prototype.toString = function () {
	return this.val;
}

module.exports = LString;