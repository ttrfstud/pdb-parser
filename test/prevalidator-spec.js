var should = require('should');
var pv = require('../src/prevalidator').prevalidate;

describe('prevalidator handles', function () {
	function complementLine(len) {
		return Array(len + 1).join('0');
	}

	describe('correct character classes', function () {

		it ('whitespace', function () {
			(function () {
				pv(' ' + complementLine(78) + '\n');
			}).should.not.throw();
		});

		it ('10 and 13 newlines', function () {
			(function () {
				pv(complementLine(79) + String.fromCharCode(10) + complementLine(79) + '\n');
				pv(complementLine(79) + String.fromCharCode(13) + complementLine(79) + '\n');
			}).should.not.throw();
		});

		it ('digits', function () {
			(function () {
				pv('0123456789' + complementLine(69) + '\n');
			}).should.not.throw();
		});

		it ('lowercase letters', function () {
			(function () {
				pv('abcdefghijklmnopqrstuvwxyz' + complementLine(53) + '\n');
			}).should.not.throw();
		});

		it ('uppercase letters', function () {
			(function () {
				pv('ABCDEFGHIJKLMNOPQRSTUVWXYZ' + complementLine(53) + '\n');
			}).should.not.throw();
		});

		it ('special symbols', function () {
			(function () {
				pv('`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?' + complementLine(47) + '\n');
			}).should.not.throw();
		});

		it ('should not allow any symbols besides those', function () {
			(function () {
				pv(String.fromCharCode(7) + complementLine(78) + '\n');
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
			(function () {
				pv(String.fromCharCode(15) + complementLine(78) + '\n');
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
			(function () {
				pv(String.fromCharCode(127) + complementLine(78) + '\n');
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
		});

		it ('should not allow any symbols besides those at any position', function () {
			(function () {
				pv('a1' + String.fromCharCode(7) + complementLine(76) + '\n');
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
		});
	});

	describe('line length (= 80)', function () {
		it ('shorter lines are not ok', function () {
			(function () {
				pv(' ');
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
			(function () {
				pv(complementLine(78));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('longer lines are not ok', function () {
			(function () {
				pv(complementLine(81));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('shorter lines among normal lines', function () {
			(function () {
				pv(complementLine(80) + '\n \n' + complementLine(80));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('longer lines among normal lines', function () {
			(function () {
				pv(complementLine(79) + '\n' + complementLine(80) + '\n' + complementLine(79));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('all normal lines', function () {
			(function () {
				pv(complementLine(79) + '\n' + complementLine(79) + '\n');
			}).should.not.throw();
		});

		it ('lines not ending in trailing space', function () {
			(function () {
				pv(complementLine(79));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('lines not ending in multiple space', function () {
			(function () {
				pv(complementLine(79 + '\r\n'));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});
	});
});