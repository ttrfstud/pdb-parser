var List = require('../src/datatypes/List');

describe('list', function () {
	it('happy path', function () {
		(function () {
			new List('apple,banana,coffee');
			new List('1, 2, 3');
		}).should.not.throw();
	});

	it('unhappy path', function () {
		// Trailing comma
		(function () {
			new List('apple,banana,coffee,');
		}).should.throw('WRONG LIST');
		// Trailing comma 2
		(function () {
			new List('apple,banana,coffee,\n');
		}).should.throw('WRONG LIST');
		// Trailing comma 3
		(function () {
			new List('apple,banana,coffee,\r');
		}).should.throw('WRONG LIST');
		// Two commas in a row
		(function () {
			new List('apple,,coffee');
		}).should.throw('WRONG LIST');
		// No commas
		(function () {
			new List('orange');
		}).should.throw('WRONG LIST');
		// Empty string
		(function () {
			new List('');
		}).should.throw('WRONG LIST');
		// No unescaped colons
		(function () {
			new List(':,:hi');
		}).should.throw('WRONG LIST');
	});

	it('splits expression into list of texts, .text', function () {
		new List('1,2').text.length.should.equal(2);
	});

	it('this is how it splits', function () {
		new List('apple,banana').text.should.eql(['apple', 'banana']);
		new List('1, 2, 3').text.should.eql(['1', ' 2', ' 3']);
	});

	it('its toString is original expression', function () {
		new List('bomba, bomba,  bomba').toString().should.equal(
			'bomba, bomba,  bomba');
	});
});