var IDcode = require('../src/datatypes/IDcode');

describe('id code', function () {
	it('happy path', function () {
		(function () {
			new IDcode('0ABC')
		}).should.not.throw();
	});

	it('unhappy path', function () {
		// No leading number
		(function () {
			new IDcode('ABC')
		}).should.throw('WRONG IDCODE');

		// Not 4-long
		(function () {
			new IDcode('0AB')
		}).should.throw('WRONG IDCODE');

		// In lower-case
		(function () {
			new IDcode('0abc')
		}).should.throw('WRONG IDCODE');

		// Contains non-alphanumeric characters
		(function () {
			new IDcode('0ab?');
		}).should.throw('WRONG IDCODE');
	});

	it('has fields first, second, third, fourth', function () {
		new IDcode('0ABC').first.should.equal(0);
		new IDcode('0ABC').second.should.equal('A');
		new IDcode('0ABC').third.should.equal('B');
		new IDcode('0ABC').fourth.should.equal('C');
	});

	it('has a method showing if the entry contains coordinate data', function () {
		new IDcode('0ABC').containsCoordinateData().should.be.false;
		new IDcode('1ABC').containsCoordinateData().should.be.true;
	});

	it('its toString is its expression', function () {
		new IDcode('0ABC').toString().should.equal('0ABC');

	})
});