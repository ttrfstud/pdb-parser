var LString = require('../src/datatypes/LString')

// guess no need for Lstring(n) ?

describe('lstring', function () {
	it('is just a string..', function () {
		(function () {
			new LString('text text texxt');
		}).should.not.throw();
	});

	it('unhappy path', function () {
		(function () {
			new LString('\n\n');
		}).should.throw('WRONG LSTRING');

		(function () {
			new LString(':');
		}).should.throw('WRONG LSTRING');
	});

	it('keeps string is val prop', function () {
		new LString('1').val.should.equal('1');
	});

	it('its toString is its val', function () {
		new LString('1').toString().should.equal('1');
	});

	it('val is immutable', function () {
		var ls = new LString('.val');
		ls.val = 'val2';

		ls.val.should.equal('.val');
	});
});