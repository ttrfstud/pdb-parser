var Stringg = require('../src/datatypes/String')

// guess no need for Lstring(n) ?

describe('string', function () {
	it('is just a string..', function () {
		(function () {
			new Stringg('text text texxt');
		}).should.not.throw();
	});

	it('unhappy path', function () {
		(function () {
			new Stringg('\n\n');
		}).should.throw('WRONG STRING');

		(function () {
			new Stringg(':');
		}).should.throw('WRONG STRING');
	});

	it('keeps string is val prop', function () {
		new Stringg('1').val.should.equal('1');
	});

	it('its toString is its val', function () {
		new Stringg('1').toString().should.equal('1');
	});

	it('val is immutable', function () {
		var ls = new Stringg('.val');
		ls.val = 'val2';

		ls.val.should.equal('.val');
	});
});