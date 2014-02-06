var cc = require('../src/concat-continuations');

describe('concat continuations', function () {
	it('concats continuations as described in Field Formats and Data Types', function () {
		console.log(Object.keys(cc).toString());

		cc(['OBSLTE   2 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             ',
			'OBSLTE   3 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             '], 2).should.
		equal('3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ');
	});

	it('empty string?', function () {
		cc([]).should.equal('');
	});

	it('newline in', function () {
		(function () {
			cc(['\n']);
		}).should.throw('WRONG CONTINUATION');
	});

	it('unhappy path', function () {
		(function () {
			cc(['OBSLTE   2 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             ',
			'OBSLTE    3 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             '], 2);
		}).should.throw('WRONG CONTINUATION');
	});

	// TODO mb consider the order of continuations?
});