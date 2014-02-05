var Real = require('../src/datatypes/Real');

describe('real', function () {
	it('stores reals in FORTRAN format (various assertions)', function () {
		(function () {
			new Real('3.52', 4, 2);
		}).should.not.throw();

		(function () {
			new Real('3.662', 4, 2);
		}).should.throw('WRONG REAL');

		(function () {
			new Real('3.', 2, 0);
		}).should.not.throw();
		(function () {
			new Real('3', 1, 0);
		}).should.not.throw();
		(function () {
			new Real('.2', 2, 1);
		}).should.not.throw();
		(function () {
			new Real('.2', 1, 1);
		}).should.throw('WRONG REAL');
	});

	it('keeps the representation of real internally', function () {
		new Real('3.2', 3, 1).val.should.equal(3.2);
	});

	it('its toString is its original form', function () {
		new Real('.2', 2, 1).toString().should.equal('.2');
	});

	it('its val and expression are immutable', function () {
		var r = new Real('3.2', 3, 1);

		r.expression = '5';
		r.expression.should.equal('3.2');
		r.val = 5.6;
		r.val.should.equal(3.2);
	});
});