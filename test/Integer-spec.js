var Integer = require('../src/datatypes/Integer');

describe('integer', function () {
	it('happy parsing path', function () {
		(function () {
			new Integer('    1');
			new Integer('1');
			new Integer('1111');
		}).should.not.throw();
	});

	it('unhappy path', function () {
		// Float
		(function () {
			new Integer('3.2');
		}).should.throw('WRONG INTEGER');

		// Float
		(function () {
			new Integer(' ');
		}).should.throw('WRONG INTEGER');

		// Gibberish in tail
		(function () {
			new Integer(' 1343gibberish');
		}).should.throw('WRONG INTEGER');

		// Gibberish
		(function () {
			new Integer('gibberish');
		}).should.throw('WRONG INTEGER');

	});

	it ('has val field', function () {
		new Integer('  150').val.should.equal(150);
	});

	it ('its toString is its expression', function () {
		new Integer('  150').toString().should.equal('  150');
	})
});