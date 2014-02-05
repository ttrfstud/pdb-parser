var VALID_RESIDUE_NAMES = {
	'  A' : 1,
	'  C' : 1,
	'  G' : 1,
	'  T' : 1,
	'  U' : 1,
	'  I' : 1,
	' DA' : 1,
	' DC' : 1,
	' DG' : 1,
	' DT' : 1,
	' DU' : 1,
	' DI' : 1,
	'ALA' : 1,
	'ARG' : 1,
	'ASN' : 1,
	'ASP' : 1,
	'ASX' : 1,
	'CYS' : 1,
	'GLU' : 1,
	'GLN' : 1,
	'GLX' : 1,
	'GLY' : 1,
	'HIS' : 1,
	'ILE' : 1,
	'LEU' : 1,
	'LYS' : 1,
	'MET' : 1,
	'PHE' : 1,
	'PRO' : 1,
	'SER' : 1,
	'THR' : 1,
	'TRP' : 1,
	'TYR' : 1,
	'VAL' : 1,
	'UNK' : 1,
	'  N' : 1,
	'UNL' : 1
};

function ResidueName(expression) {
	if (!VALID_RESIDUE_NAMES[expression]) {
		throw new Error('WRONG RESIDUE NAME');
	}

	Object.defineProperty(this, 'val', {
		get: function () {
			return expression;
		},
		set: function () {}
	});
}

ResidueName.prototype.toString = function () {
	return this.val;
};

module.exports = ResidueName;