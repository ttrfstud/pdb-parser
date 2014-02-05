var Continuation = require('../src/datatypes/Continuation');

describe('continuation', function () {
	it('examples of right continuations', function () {
		(function () {
			new Continuation(' ');
			new Continuation('  1 ');
			new Continuation(' 22 ');
		}).should.not.throw();
	});

	it('examples of wrong continuations', function () {
		// Not right justified
		(function () {
			new Continuation(' 3 ');
		}).should.throw('WRONG CONTINUATION');

		// Trailing spaces in blank
		(function () {
			new Continuation('  ');
		}).should.throw('WRONG CONTINUATION');

		// More than two digits
		(function () {
			new Continuation('234 ');
		}).should.throw('WRONG CONTINUATION');

		// Gibberish
		(function () {
			new Continuation(' string ');
		}).should.throw('WRONG CONTINUATION');

		// Not followed by blank
		(function () {
			new Continuation(' 23');
		}).should.throw('WRONG CONTINUATION');
	});

	it('has order field, which is 1 for empty continuation, and n for the rest', function () {
		new Continuation(' ').order.should.equal(1);
		new Continuation('  2 ').order.should.equal(2);
		new Continuation(' 22 ').order.should.equal(22);
	});

	it('its toString is original continuation', function () {
		new Continuation(' ').toString().should.equal(' ');
		new Continuation(' 22 ').toString().should.equal(' 22 ');
	});
});