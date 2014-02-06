var should = require('should');
var pv = require('../src/prevalidator');

describe('prevalidator handles', function () {
	function complementLine(len) {
		return Array(len + 1).join('0');
	}

	describe('correct character classes', function () {

		it ('whitespace', function () {
			(function () {
				pv.validateCharacters(' ');
			}).should.not.throw();
		});

		it ('10 and 13 newlines', function () {
			(function () {
				pv.validateCharacters(String.fromCharCode(10));
				pv.validateCharacters(String.fromCharCode(13));
			}).should.not.throw();
		});

		it ('digits', function () {
			(function () {
				pv.validateCharacters('0123456789');
			}).should.not.throw();
		});

		it ('lowercase letters', function () {
			(function () {
				pv.validateCharacters('abcdefghijklmnopqrstuvwxyz');
			}).should.not.throw();
		});

		it ('uppercase letters', function () {
			(function () {
				pv.validateCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
			}).should.not.throw();
		});

		it ('special symbols', function () {
			(function () {
				pv.validateCharacters('`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?');
			}).should.not.throw();
		});

		it ('should not allow any symbols besides those', function () {
			(function () {
				pv.validateCharacters(String.fromCharCode(7));
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
			(function () {
				pv.validateCharacters(String.fromCharCode(15));
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
			(function () {
				pv.validateCharacters(String.fromCharCode(127));
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
		});

		it ('should not allow any symbols besides those at any position', function () {
			(function () {
				pv.validateCharacters('a1' + String.fromCharCode(7));
			}).should.throw('PREVALIDATION_ERROR: INVALID CHARACTER');
		});
	});

	describe('line length (= 80 + newline)', function () {
		it ('shorter lines are not ok', function () {
			(function () {
				pv.validateLineLength(' ');
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
			(function () {
				pv.validateLineLength(complementLine(78));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('longer lines are not ok', function () {
			(function () {
				pv.validateLineLength(complementLine(83));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('shorter lines among normal lines', function () {
			(function () {
				pv.validateLineLength(complementLine(80) + '\n \n' + complementLine(80));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('longer lines among normal lines', function () {
			(function () {
				pv.validateLineLength(complementLine(80) + '\n' + complementLine(81) + '\n' + complementLine(80));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('all normal lines', function () {
			(function () {
				pv.validateLineLength(complementLine(80) + '\n' + complementLine(80) + '\n');
			}).should.not.throw();
		});

		it ('lines not ending in trailing newline', function () {
			(function () {
				pv.validateLineLength(complementLine(80));
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});

		it ('lines ending in multiple newlines', function () {
			(function () {
				pv.validateLineLength(complementLine(80)  + '\r\n');
			}).should.throw('PREVALIDATION_ERROR: LINE IS NOT 80-LONG');
		});
	});

	describe('each record type name', function () {
		it ('should pass all valid record names', function () {
			(function () {
				pv.validateRecordTypes('END    \n');
				pv.validateRecordTypes('HEADER \n');
				pv.validateRecordTypes('NUMMDL \n');
				pv.validateRecordTypes('MASTER \n');
				pv.validateRecordTypes('ORIGX1 \n');
				pv.validateRecordTypes('ORIGX2 \n');
				pv.validateRecordTypes('ORIGX3 \n');
				pv.validateRecordTypes('SCALE1 \n');
				pv.validateRecordTypes('SCALE2 \n');
				pv.validateRecordTypes('SCALE3 \n');
				pv.validateRecordTypes('AUTHOR \n');
				pv.validateRecordTypes('CAVEAT \n');
				pv.validateRecordTypes('COMPND \n');
				pv.validateRecordTypes('EXPDTA \n');
				pv.validateRecordTypes('MDLTYP \n');
				pv.validateRecordTypes('KEYWDS \n');
				pv.validateRecordTypes('OBSLTE \n');
				pv.validateRecordTypes('SOURCE \n');
				pv.validateRecordTypes('SPLIT  \n');
				pv.validateRecordTypes('SPRSDE \n');
				pv.validateRecordTypes('ANISOU \n');
				pv.validateRecordTypes('ATOM   \n');
				pv.validateRecordTypes('CISPEP \n');
				pv.validateRecordTypes('CONECT \n');
				pv.validateRecordTypes('DBREF  \n');
				pv.validateRecordTypes('HELIX  \n');
				pv.validateRecordTypes('HET    \n');
				pv.validateRecordTypes('HETATM \n');
				pv.validateRecordTypes('LINK   \n');
				pv.validateRecordTypes('MODRES \n');
				pv.validateRecordTypes('MTRIX1 \n');
				pv.validateRecordTypes('MTRIX2 \n');
				pv.validateRecordTypes('MTRIX3 \n');
				pv.validateRecordTypes('REVDAT \n');
				pv.validateRecordTypes('SEQADV \n');
				pv.validateRecordTypes('SHEET  \n');
				pv.validateRecordTypes('SSBOND \n');
				pv.validateRecordTypes('FORMUL \n');
				pv.validateRecordTypes('HETNAM \n');
				pv.validateRecordTypes('HETSYN \n');
				pv.validateRecordTypes('SEQRES \n');
				pv.validateRecordTypes('SITE   \n');
				pv.validateRecordTypes('ENDMDL \n');
				pv.validateRecordTypes('MODEL  \n');
				pv.validateRecordTypes('TER    \n');
				pv.validateRecordTypes('JRNL   \n');
				pv.validateRecordTypes('REMARK \n');
			}).should.not.throw();
		});
		it ('should not pass record type names without subsequent blank', function () {
			(function () {
				pv.validateRecordTypes('CRYST1\n');
			}).should.throw('PREVALIDATION_ERROR: INVALID RECORD TYPE!');
		});

		it ('multiple lines of correct record type names', function () {
			(function () {
				pv.validateRecordTypes('CRYST1 \nENDMDL \nENDMDL \n');
			}).should.not.throw();
		});

		it ('multiple lines intercepted by incorrectly padded name', function () {
			(function () {
				pv.validateRecordTypes('CRYST1 \nENDMDL\nENDMDL \n');
			}).should.throw('PREVALIDATION_ERROR: INVALID RECORD TYPE!');
		});

		it('absolutely incorrect name', function () {
			(function () {
				pv.validateRecordTypes('INCRT \n');
			}).should.throw('PREVALIDATION_ERROR: INVALID RECORD TYPE!');
		});
	});

	describe('singleton record arity', function () {
		it('unhappy path', function () {
			(function () {
				pv.validateRecordArity('CRYST1 \nCRYST1 \n');
			}).should.throw('PREVALIDATION_ERROR: INVALID SINGLETON RECORD ARITY!');
		});
	});

	describe('immediately mandatory types', function () {
		it('if the pdb has all immediately mandatory types', function () {
			(function () {
				pv.validateMandatoryTypes(
					'HEADER \n' + 
					'TITLE  \n' + 
					'COMPND \n' + 
					'SOURCE \n' + 
					'KEYWDS \n' + 
					'EXPDTA \n' + 
					'AUTHOR \n' + 
					'REVDAT \n' + 
					'REMARK 2\n' + 
					'REMARK 3\n' + 
					'SEQRES \n' + 
					'CRYST1 \n' + 
					'ORIGX1 \n' + 
					'ORIGX2 \n' + 
					'ORIGX3 \n' + 
					'SCALE1 \n' + 
					'SCALE2 \n' + 
					'SCALE3 \n' + 
					'MASTER \n' + 
					'END    \n');
			}).should.not.throw();
		});

		it ('if some of them is missing, it is error', function () {
			(function () {
				pv.validateMandatoryTypes('HEADER \n' + 
					'TITLE  \n' + 'COMPND \n' + 'SOURCE \n' + 'EXPDTA \n' + 'AUTHOR \n' + 'REVDAT \n' + 
					'REMARK 2\n' + 'REMARK 3\n' + 'SEQRES \n ' + 'CRYST1 \n' + 'ORIGX1 \n' + 
					'ORIGX2 \n' + 'ORIGX3 \n' + 'SCALE1 \n' + 'SCALE2 \n' + 'SCALE3\n' + 'MASTER \n' + 'END\n');
			}).should.throw('PREVALIDATION_ERROR: NOT ALL MANDATORY TYPES ARE PRESENT!');
		});
	});

	describe('order of record types', function () {
		it('happy path', function () {
			(function () {
				pv.validateOrder(
						'HEADER \n' + 
						'OBSLTE \n' + 
						'TITLE  \n' + 
						'SPLIT  \n' + 
						'CAVEAT \n' + 
						'COMPND \n' + 
						'SOURCE \n' + 
						'KEYWDS \n' + 
						'EXPDTA \n' + 
						'NUMMDL \n' + 
						'MDLTYP \n' + 
						'AUTHOR \n' + 
						'REVDAT \n' + 
						'SPRSDE \n' + 
						'JRNL   \n' + 
						'REMARK \n' + 
						'REMARK \n' + 
						'REMARK \n' + 
						'DBREF  \n' + 
						'DBREF1 \n' + 
						'DBREF2 \n' + 
						'SEQADV \n' + 
						'SEQRES \n' + 
						'MODRES \n' + 
						'HET    \n' + 
						'HETNAM \n' + 
						'HETSYN \n' + 
						'FORMUL \n' + 
						'HELIX  \n' + 
						'SHEET  \n' + 
						'SSBOND \n' + 
						'LINK   \n' + 
						'CISPEP \n' + 
						'SITE   \n' + 
						'CRYST1 \n' + 
						'ORIGX1 \n' + 
						'ORIGX2 \n' + 
						'ORIGX3 \n' + 
						'SCALE1 \n' + 
						'SCALE2 \n' + 
						'SCALE3 \n' + 
						'MTRIX1 \n' + 
						'MTRIX2 \n' + 
						'MTRIX3 \n' + 
						'MODEL  \n' + 
						'ATOM   \n' + 
						'ANISOU \n' + 
						'TER    \n' + 
						'HETATM \n' + 
						'ENDMDL \n' + 
						'CONECT \n' + 
						'MASTER \n' + 
						'END    \n'
				);
			}).should.not.throw();
		});

		it('unhappy path', function () {
			(function () {
				pv.validateOrder(
						'HEADER \n' + 
						'OBSLTE \n' + 
						'TITLE  \n' + 
						'SPLIT  \n' + 
						'CAVEAT \n' + 
						'COMPND \n' + 
						'SOURCE \n' + 
						'KEYWDS \n' + 
						'EXPDTA \n' + 
						'NUMMDL \n' + 
						'MDLTYP \n' + 
						'AUTHOR \n' + 
						'SPRSDE \n' + 
						'REVDAT \n' + 
						'JRNL   \n' + 
						'REMARK \n' + 
						'REMARK \n' + 
						'REMARK \n' + 
						'DBREF  \n' + 
						'DBREF1 \n' + 
						'DBREF2 \n' + 
						'SEQADV \n' + 
						'SEQRES \n' + 
						'MODRES \n' + 
						'HET    \n' + 
						'HETNAM \n' + 
						'HETSYN \n' + 
						'FORMUL \n' + 
						'HELIX  \n' + 
						'SHEET  \n' + 
						'SSBOND \n' + 
						'LINK   \n' + 
						'CISPEP \n' + 
						'SITE   \n' + 
						'CRYST1 \n' + 
						'ORIGX1 \n' + 
						'ORIGX2 \n' + 
						'ORIGX3 \n' + 
						'SCALE1 \n' + 
						'SCALE2 \n' + 
						'SCALE3 \n' + 
						'MTRIX1 \n' + 
						'MTRIX2 \n' + 
						'MTRIX3 \n' + 
						'MODEL  \n' + 
						'ATOM   \n' + 
						'ANISOU \n' + 
						'TER    \n' + 
						'HETATM \n' + 
						'ENDMDL \n' + 
						'CONECT \n' + 
						'MASTER \n' + 
						'END    \n'
				);
			}).should.throw('PREVALIDATION_ERROR: WRONG ORDER OF RECORDS!');
		});
	});
});