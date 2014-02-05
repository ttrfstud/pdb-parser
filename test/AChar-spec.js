var AChar = require('../src/datatypes/AChar');

describe('alphabetic character', function () {
	it('holds single alphabetic char', function () {
		(function () {
			new AChar('a');
			new AChar('D');
			new AChar('U');
			new AChar('u');
		}).should.not.throw();
	});

	it('anything besides that is error', function () {
		(function () {
			new AChar('1');
		}).should.throw('WRONG ACHAR');

		(function () {
			new AChar('@');
		}).should.throw('WRONG ACHAR');

		(function () {
			new AChar('AE');
		}).should.throw('WRONG ACHAR');
	});

	it('its toString is that single char', function () {
		new AChar('a').toString().should.equal('a');
	});

	it('its character can be accessed via ch field', function () {
		new AChar('a').ch.should.equal('a');
	});
});