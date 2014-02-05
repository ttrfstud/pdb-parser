var Stringg = require('../datatypes/String');
var Datee = require('../datatypes/Date');
var IDcode = require('../datatypes/IDcode');

var prop = Object.defineProperty;

function Header(classification, depDate, idCode) {
	prop(this, 'classification', {
		get: function () {
			return classification;
		},
		set: function () {}
	});

	prop(this, 'depDate', {
		get: function () {
			return depDate;
		},
		set: function () {}
	});

	prop(this, 'idCode', {
		get: function () {
			return idCode;
		},
		set: function () {}
	});
}

Header.parse = function (headerString) {
	// Record names TODO are to be read by higher level reader
	var s = headerString;
	var recordName = s.substring(0, 7);
	var blanks1 = s.substring(7, 10);
	try {
		var classification = new Stringg(s.substring(10, 50));
		// console.log(s.substring(50, 59), 'depdate');
		var depDate = new Datee(s.substring(50, 59));
		var idCode = new IDcode(s.substring(62, 66));
	} catch (e) {
		throw new Error('WRONG HEADER');
	}

	return new Header(classification, depDate, idCode);
}

exports.parse = Header.parse;