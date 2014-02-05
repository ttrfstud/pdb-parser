var Token = require('../src/datatypes/Token');

describe('token', function () {
	it('must end in colon plus blank', function () {
		(function () {
			new Token('token: ');
		}).should.not.throw();

		(function () {
			new Token('token:');
		}).should.throw('WRONG TOKEN');

		(function () {
			new Token('token ');
		}).should.throw('WRONG TOKEN');
	});

	it('mustnt contains blanks in token body', function () {
		(function () {
			new Token('token: ');
		}).should.not.throw();

		(function () {
			new Token('to ken: ');
		}).should.throw('WRONG TOKEN');
	});

	it('its key (immutable) is accesible via val prop', function () {
		var t = new Token('token: ');
		t.val.should.equal('token');
		t.val = 'woo';
		t.val.should.equal('token');
	});

	it('its toString is its expression', function () {
		new Token('token: ').toString().should.equal('token: ');
	});
})