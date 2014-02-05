var SList = require('../src/datatypes/SList');

describe('list', function () {
	it('happy path', function () {
		(function () {
			new SList('apple;banana;coffee');
			new SList('1; 2; 3');
		}).should.not.throw();
	});

	it('unhappy path', function () {
		// Trailing comma
		(function () {
			new SList('apple;banana;coffee;');
		}).should.throw('WRONG SLIST');
		// Trailing comma 2
		(function () {
			new SList('apple;banana;coffee;\n');
		}).should.throw('WRONG SLIST');
		// Trailing comma 3
		(function () {
			new SList('apple;banana;coffee;\r');
		}).should.throw('WRONG SLIST');
		// Two commas in a row
		(function () {
			new SList('apple;;coffee');
		}).should.throw('WRONG SLIST');
		// No commas
		(function () {
			new SList('orange');
		}).should.throw('WRONG SLIST');
		// Empty string
		(function () {
			new SList('');
		}).should.throw('WRONG SLIST');
		// No unescaped colons
		(function () {
			new SList(':;:hi');
		}).should.throw('WRONG SLIST');
	});

	it('splits expression into list of texts, .text', function () {
		new SList('1;2').text.length.should.equal(2);
	});

	it('this is how it splits', function () {
		new SList('apple;banana').text.should.eql(['apple', 'banana']);
		new SList('1; 2; 3').text.should.eql(['1', ' 2', ' 3']);
	});

	it('its toString is original expression', function () {
		new SList('bomba; bomba;  bomba').toString().should.equal(
			'bomba; bomba;  bomba');
	});
});