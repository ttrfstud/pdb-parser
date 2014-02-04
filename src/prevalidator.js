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
	'CRYST1' : 1,
	'END   ' : 1,
	'HEADER' : 1,
	'NUMMDL' : 1,
	'MASTER' : 1,
	'ORIGX1' : 1,
	'ORIGX2' : 1,
	'ORIGX3' : 1,
	'SCALE1' : 1,
	'SCALE2' : 1,
	'SCALE3' : 1,


};


var PREVALIDATION_ERROR = 'PREVALIDATION_ERROR: ';

exports.prevalidate = function (pdb) {
	validateCharacters(pdb);
	validateLineLength(pdb);
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

	var split = text.split(/[\r\n]/g);

	split = split.slice(0, split.length - 1);

	for (var i = 0; i < split.length; i++) {
		if (split[i].length !== 79) {
			console.log('split', split[i].length);
			throw new Error(PREVALIDATION_ERROR + 'LINE IS NOT 80-LONG');
		}
	}
}