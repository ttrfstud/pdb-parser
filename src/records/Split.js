var concatContinuations = require('../concat-continuations');
var IDcode = require('../datatypes/IDcode');
function Split(idCode) {
	Object.defineProperty(this, 'idCode', {
		get: function () {
			return idCode;
		},

		set: function () {}
	});
}

Split.parse = function (sArray) {
	try {
		var continuation = concatContinuations(sArray, 2);

		continuation = continuation.split(' ');

		var idCode = [];

		for (var i = 0; i < continuation.length; i++) {
			idCode.push(new IDcode(continuation[i]));
		}
	} catch (e) {
		console.log(e);
		throw new Error('WRONG SPLIT');
	}
	return new Split(idCode);
};

exports.parse = Split.parse;