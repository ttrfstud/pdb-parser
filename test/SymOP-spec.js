var SymOP = require('../src/datatypes/SymOP');

describe('sym op', function () {
	it('has 4 to 6 integer digits, must be right justified', function () {
		(function () {
			new SymOP('  1234');
			new SymOP(' 12345');
			new SymOP('123456');
		}).should.not.throw();

		(function () {
			new SymOP(' 1234');
		}).should.throw('WRONG SYMOP');

		(function () {
			new SymOP('1234');
		}).should.throw('WRONG SYMOP');

		(function () {
			new SymOP('12345');
		}).should.throw('WRONG SYMOP');

		(function () {
			new SymOP('12345G');
		}).should.throw('WRONG SYMOP');
	});

	it('contains immut props, son (symm op num) and tv (transl vector)', function () {
		var sop = new SymOP(' 12345');

		sop.son.should.equal(12);
		sop.tv.should.equal(345);

		sop.son = 5;

		sop.son.should.equal(12);
		sop.tv.should.equal(345);

		sop.tv = 0;

		sop.son.should.equal(12);
		sop.tv.should.equal(345);
	});

	it('its toString is its expression', function () {
		(function () {
			new SymOP(' 12345').toString().should.equal(' 12345');
		})
	});
});