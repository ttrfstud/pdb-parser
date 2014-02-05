var Token = require('./Token');

function Specification (expression) {
	if(!/^\S+: \S+$/.test(expression)) {
		throw new Error('WRONG SPECIFICATION');
	}

	var token = new Token(expression.split(' ')[0] + ' ');
	var val = expression.split(' ')[1];

	Object.defineProperty(this, 'token', {
		get: function () {
			return token;
		},

		set: function () {}
	});

	Object.defineProperty(this, 'val', {
		get: function () {
			return val;
		},

		set: function () {}
	})
}

Specification.prototype.toString = function () {
	return this.token.toString() + this.val;
}

module.exports = Specification;