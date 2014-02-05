var SpecificationList = require('../src/datatypes/SpecificationList');

describe('specification list', function () {
	it('is a list of specifications, separated by semicolons', function () {
		(function () {
			new SpecificationList('cat: dog;fox: wolf');
		}).should.not.throw();

		(function () {
			new SpecificationList('cat: dog,fox: wolf');
		}).should.throw('WRONG SPECIFICATION LIST');

		(function () {
			new SpecificationList('cat: dog;fox: wolf;');
		}).should.throw('WRONG SPECIFICATION LIST');

		(function () {
			new SpecificationList('cat: dog; fox: wolf');
		}).should.throw('WRONG SPECIFICATION LIST');
	});

	it('has immut list of of corresponding Specifications', function () {
		var sl = new SpecificationList('cat: dog;fox: wolf');
		sl.list.length.should.equal(2);
		sl.list[0].token.val.should.eql('cat');
		sl.list[0] = 1;

		sl.list.length.should.equal(2);
		sl.list[0].token.val.should.eql('cat');
	});

	it('its toString is its initial form', function () {
		new SpecificationList('cat: dog;fox: wolf').toString().should.
		equal('cat: dog;fox: wolf');
	});
})