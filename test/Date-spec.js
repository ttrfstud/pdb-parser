var Datee = require('../src/datatypes/Date');

describe('date', function () {
	it('test with valid format of dates', function () {
		(function () {
			new Datee('26-JAN-70');
			new Datee('25-JAN-70');
			new Datee('04-FEB-35');
		}).should.not.throw();
	});

	it('test with invalid format of dates', function () {
		(function () {
			new Datee('2332f2f31');
		}).should.throw('WRONG DATE');
		(function () {
			new Datee('2-12-2001');
		}).should.throw('WRONG DATE');
		(function () {
			new Datee('2-DEC-01');
		}).should.throw('WRONG DATE');
		(function () {
			new Datee('02-12-2001');
		}).should.throw('WRONG DATE');
		(function () {
			new Datee('10-1-2001');
		}).should.throw('WRONG DATE');
		(function () {
			new Datee('10-10-01');
		}).should.throw('WRONG DATE');
		(function () {
			new Datee('10-Oct-01');
		}).should.throw('WRONG DATE');
	});

	it('it has day, month, year fields, year is pivoted to 1950-2050', function () {
		var d = new Datee('02-FEB-61');
		d.day.should.equal(2);
		d.month.should.equal(2);
		d.year.should.equal(1961);

		var d = new Datee('12-SEP-41');
		d.day.should.equal(12);
		d.month.should.equal(9);
		d.year.should.equal(2041);
	});

	it('its toString is original expression', function () {
		new Datee('27-JUN-57').toString().should.equal('27-JUN-57');
	});
});