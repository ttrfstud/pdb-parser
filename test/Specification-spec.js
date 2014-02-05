var Specification = require('../src/datatypes/Specification');
var Token = require('../src/datatypes/Token');

describe('specification', function () {
	it('is composed of token and val, separated by colon (and blank!)', function () {
		(function () {
			new Specification('cat: dog');
		}).should.not.throw();

		(function () {
			new Specification('cat:dog');
		}).should.throw('WRONG SPECIFICATION');

		(function () {
			new Specification('cat:  dog');
		}).should.throw('WRONG SPECIFICATION');

		(function () {
			new Specification('cat dog');
		}).should.throw('WRONG SPECIFICATION');

		(function () {
			new Specification('catdog');
		}).should.throw('WRONG SPECIFICATION');

		(function () {
			new Specification('cat: dog; cat: dog')
		}).should.throw('WRONG SPECIFICATION');
	});

	it('has token (immut) prop and val (immut) prop', function () {
		var s = new Specification('cat: dog');

		s.token.should.be.instanceof(Token);
		s.token.val.should.equal('cat');

		s.token = 'dog';

		s.token.should.be.instanceof(Token);
		s.token.val.should.equal('cat');

		s.val.should.equal('dog');
		s.val = 'cat';

		s.val.should.equal('dog');
	});

	it('its toString is its initial form', function () {
		new Specification('cat: dog').toString().should.equal('cat: dog');
	});
});