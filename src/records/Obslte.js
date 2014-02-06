var concatContinuations = require('../concat-continuations');
var Datee = require('../datatypes/Date');
var IDcode = require('../datatypes/IDcode');

function Obslte(repDate, idCode, rIdCode) {
	Object.defineProperty(this, 'repDate', {
		get: function () {
			return repDate;
		},
		set: function () {}
	});

	Object.defineProperty(this, 'idCode', {
		get: function () {
			return idCode;
		},

		set: function () {}
	});

	Object.defineProperty(this, 'rIdCode', {
		get: function () {
			return rIdCode.slice(0);
		},

		set: function () {}
	})
}

Obslte.parse = function (sArray) {
	try {
		var continuation = concatContinuations(sArray, 2);

		var repDate = new Datee(continuation.substring(0, 9));
		var idCode = new IDcode(continuation.substring(10, 14));

		var rIdCode = [];

		continuation = continuation.substring(15);
		continuation = continuation.split(' ');

		for (var i = 0; i < continuation.length; i++) {
			rIdCode.push(new IDcode(continuation[i]));
		}
	} catch (e) {
		throw new Error('WRONG OBSLTE'); 
	}
	
	return new Obslte(repDate, idCode, rIdCode);
}

exports.parse = Obslte.parse;