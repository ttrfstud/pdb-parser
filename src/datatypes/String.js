function Stringg(expression) {
	if (/[\r\n]/.test(expression)) {
		throw new Error('WRONG STRING');
	}

	if (/([^\\]\:|^\:)/.test(expression)) {
		throw new Error('WRONG STRING');
	}

	console.log(expression, 'EXPR');
	Object.defineProperty(this, 'val', {
		set: function () {},
		get: function ()  {return expression;}});
}

Stringg.prototype.toString = function () {
	return this.val;
}

module.exports = Stringg;