function RecordName(expression) {
	if (!VALID_RECORD_NAMES[expression]) {
		throw new Error('WRONG RECORD NAME');
	}

	Object.defineProperty(this, 'val', {
		get: function () {
			return expression;
		},
		set: function () {}
	});
}

RecordName.prototype.toString = function () {
	return this.val;
};

// FIXME
var VALID_RECORD_NAMES = {
	'CRYST1 ' : 1,
	'END    ' : 1,
	'HEADER ' : 1,
	'NUMMDL ' : 1,
	'MASTER ' : 1,
	'ORIGX1 ' : 1,
	'ORIGX2 ' : 1,
	'ORIGX3 ' : 1,
	'SCALE1 ' : 1,
	'SCALE2 ' : 1,
	'SCALE3 ' : 1,
	'AUTHOR ' : 1,
	'CAVEAT ' : 1,
	'COMPND ' : 1,
	'EXPDTA ' : 1,
	'MDLTYP ' : 1,
	'KEYWDS ' : 1,
	'OBSLTE ' : 1,
	'SOURCE ' : 1,
	'SPLIT  ' : 1,
	'SPRSDE ' : 1,
	'ANISOU ' : 1,
	'ATOM   ' : 1,
	'CISPEP ' : 1,
	'CONECT ' : 1,
	'DBREF  ' : 1,
	'HELIX  ' : 1,
	'HET    ' : 1,
	'HETATM ' : 1,
	'LINK   ' : 1,
	'MODRES ' : 1,
	'MTRIX1 ' : 1,
	'MTRIX2 ' : 1,
	'MTRIX3 ' : 1,
	'REVDAT ' : 1,
	'SEQADV ' : 1,
	'SHEET  ' : 1,
	'SSBOND ' : 1,
	'FORMUL ' : 1,
	'HETNAM ' : 1,
	'HETSYN ' : 1,
	'SEQRES ' : 1,
	'SITE   ' : 1,
	'ENDMDL ' : 1,
	'MODEL  ' : 1,
	'TER    ' : 1,
	'JRNL   ' : 1,
	'REMARK ' : 1
};

module.exports = RecordName;