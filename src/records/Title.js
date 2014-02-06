var concatContinuations = require('../concat-continuations');
var Stringg = require('../datatypes/String');

function Title(title) {
	Object.defineProperty(this, 'title', {
		get: function () {
			return title;
		},

		set: function () {}
	});
}

Title.parse = function (sArray) {
	try {
		var continuation = concatContinuations(sArray, 2);
		var title = new Stringg(continuation);
	} catch (e) {
		console.log(e);
		throw new Error('WRONG TITLE');
	}

	return new Title(title);
}

exports.parse = Title.parse;