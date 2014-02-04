var VALID_CHARACTERS = [];

// Newline

VALID_CHARACTERS[10] = 1;
VALID_CHARACTERS[13] = 1;

// Whitespace

VALID_CHARACTERS[32] = 1;

// Alphanumeric

var i;

for (i = 48; i <= 57; i++) {
	VALID_CHARACTERS[i] = 1;
}

for (i = 65; i <= 90; i++) {
	VALID_CHARACTERS[i] = 1;
}

for (i = 97; i <= 122;i++) {
	VALID_CHARACTERS[i] = 1;
}

// Special characters
VALID_CHARACTERS[96] = 1;
VALID_CHARACTERS[45] = 1;
VALID_CHARACTERS[61] = 1;
VALID_CHARACTERS[91] = 1;
VALID_CHARACTERS[93] = 1;
VALID_CHARACTERS[92] = 1;
VALID_CHARACTERS[59] = 1;
VALID_CHARACTERS[39] = 1;
VALID_CHARACTERS[44] = 1;
VALID_CHARACTERS[46] = 1;
VALID_CHARACTERS[47] = 1;
VALID_CHARACTERS[126] = 1;
VALID_CHARACTERS[33] = 1;
VALID_CHARACTERS[64] = 1;
VALID_CHARACTERS[35] = 1;
VALID_CHARACTERS[36] = 1;
VALID_CHARACTERS[37] = 1;
VALID_CHARACTERS[94] = 1;
VALID_CHARACTERS[38] = 1;
VALID_CHARACTERS[42] = 1;
VALID_CHARACTERS[40] = 1;
VALID_CHARACTERS[41] = 1;
VALID_CHARACTERS[95] = 1;
VALID_CHARACTERS[43] = 1;
VALID_CHARACTERS[123] = 1;
VALID_CHARACTERS[125] = 1;
VALID_CHARACTERS[124] = 1;
VALID_CHARACTERS[58] = 1;
VALID_CHARACTERS[34] = 1;
VALID_CHARACTERS[60] = 1;
VALID_CHARACTERS[62] = 1;
VALID_CHARACTERS[63] = 1;

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

var PREVALIDATION_ERROR = 'PREVALIDATION_ERROR: ';

exports.prevalidate = function (pdb) {
	validateCharacters(pdb);
	validateLineLength(pdb);
	validateRecordTypes(pdb);
}

function validateCharacters(text) {
	for (var i = 0; i < text.length; i++) {
		if (!VALID_CHARACTERS[text.charCodeAt(i)]) {
			throw new Error(PREVALIDATION_ERROR + 'INVALID CHARACTER');
		}
	}
}

function validateLineLength(text) {
		console.log()
	if ((text.length % 80)) {
		throw new Error(PREVALIDATION_ERROR + 'LINE IS NOT 80-LONG');
	}

	var split = splitIntoLines(text);

	for (var i = 0; i < split.length; i++) {
		if (split[i].length !== 79) {
			throw new Error(PREVALIDATION_ERROR + 'LINE IS NOT 80-LONG');
		}
	}
}

function validateRecordTypes(text) {
	var split = splitIntoLines(text);

	for (var i = 0; i < split.length; i++) {
		if (!VALID_RECORD_NAMES[split[i].substring(0, 7)]) {
			throw new Error(PREVALIDATION_ERROR + 'INVALID RECORD TYPE!');
		}
	}
}

function validateRecordArity(text) {
	var split = splitIntoLines(text);

	var singletons = {
		'CRYST1 ' : 0,
		'END    ' : 0,
		'HEADER ' : 0,
		'NUMMDL ' : 0,
		'MASTER ' : 0,
		'ORIGX1 ' : 0,
		'ORIGX2 ' : 0,
		'ORIGX3 ' : 0,
		'SCALE1 ' : 0,
		'SCALE2 ' : 0,
		'SCALE3 ' : 0
	};

	for (var i = 0; i < split.length; i++) {
		singletons[split[i].substring(0, 7)]++; 
	}

	for (var i in singletons) if (singletons.hasOwnProperty(i)) {
		if (singletons[i] > 1) {
			throw new Error(PREVALIDATION_ERROR + 'INVALID SINGLETON RECORD ARITY!');
		}
	}
}

function validateMandatoryTypes(text) {
	var mandatory = {
		'HEADER ' : 0,
		'TITLE  ' : 0,
		'COMPND ' : 0,
		'SOURCE ' : 0,
		'KEYWDS ' : 0,
		'EXPDTA ' : 0,
		'AUTHOR ' : 0,
		'REVDAT ' : 0,
		'REMARK 2' : 0,
		'REMARK 3' : 0,
		'SEQRES ' : 0,
		'CRYST1 ' : 0,
		'ORIGX1 ' : 0,
		'ORIGX2 ' : 0,
		'ORIGX3 ' : 0,
		'SCALE1 ' : 0,
		'SCALE2 ' : 0,
		'SCALE3 ' : 0,
		'MASTER ' : 0,
		'END    ' : 0,
	};

	var split = splitIntoLines(text);

	for (var i = 0; i < split.length; i++) {
		var firstApprox = split[i].substring(0, 7);

		// console.log(firstApprox);
		if (firstApprox === 'REMARK ') {
			firstApprox = split[i].substring(0, 9);
		}

		mandatory[firstApprox]++;
	}

	for (var i in mandatory) if (mandatory.hasOwnProperty(i)) {
		if (!mandatory[i]) {
			// console.log(i);
			throw new Error(PREVALIDATION_ERROR + 'NOT ALL MANDATORY TYPES ARE PRESENT!');
		}
	}
}

function validateOrder(text) {
	
}

function splitIntoLines(pdb) {
	var split = pdb.split(/[\r\n]/g);

	split = split.slice(0, split.length - 1);

	return split;
}

exports.validateCharacters = validateCharacters;
exports.validateLineLength = validateLineLength;
exports.validateRecordTypes = validateRecordTypes;
exports.validateRecordArity = validateRecordArity;
exports.validateMandatoryTypes = validateMandatoryTypes;
exports.validateOrder = validateOrder;