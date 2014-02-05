var ResidueName = require('../src/datatypes/ResidueName');

describe('residue name', function () {
	it('must be either valid nucleotide name, ' + 
		'valid amino acid name or valid unknown name', function () {
			(function () {
				new ResidueName('  I');
				new ResidueName('ASX');
				new ResidueName('UNK');
				new ResidueName('  N');
			}).should.not.throw();
	});

	it('anything else should throw', function () {
		// Wrong alignment
		(function () {
			new ResidueName('I');
		}).should.throw('WRONG RESIDUE NAME');

		// Unknown stuff
		(function () {
			new ResidueName('NKN');
		}).should.throw('WRONG RESIDUE NAME');

		// Nucleotide, full name
		(function () {
			new ResidueName('URACIL');
		}).should.throw('WRONG RESIDUE NAME');

		// Amino, full name
		(function () {
			new ResidueName('GLYCINE');
		}).should.throw('WRONG RESIDUE NAME');
	});

	it('has immutable val prop', function () {
		var rn = new ResidueName('  U');
		rn.val.should.equal('  U');
		rn.val = 'U';
		rn.val.should.equal('  U');

	});

	it('its toString is its expression', function () {
		new ResidueName('  U').toString().should.equal('  U');
	});
})