var parser = require('../src/parser');
var header = require('../src/parser').header;
var obslte = require('../src/parser').obslte;
var title  = require('../src/parser').title ;
var split  = require('../src/parser').split ;
var caveat = require('../src/parser').caveat;
var compnd = require('../src/parser').compnd;
var source = require('../src/parser').source;
var keywds = require('../src/parser').keywds;
var expdta = require('../src/parser').expdta;
var nummdl = require('../src/parser').nummdl;
var mdltyp = require('../src/parser').mdltyp;
var author = require('../src/parser').author;
var revdat = require('../src/parser').revdat;
var sprsde = require('../src/parser').sprsde;

var jrnlauth = require('../src/parser').jrnlauth;
var jrnltitl = require('../src/parser').jrnltitl;
var jrnledit = require('../src/parser').jrnledit;
var jrnlref  = require('../src/parser').jrnlref ;
var jrnlpubl = require('../src/parser').jrnlpubl;
var jrnlrefn = require('../src/parser').jrnlrefn;
var jrnlpmid = require('../src/parser').jrnlpmid;
var jrnldoi  = require('../src/parser').jrnldoi ;

var jrnl   = require('../src/parser').jrnl;

var remark0 = require('../src/parser').remark0;
var remark1 = require('../src/parser').remark1;

describe('parser', function () {
	it('parses header', function () {
		var h = header(['HEADER    MEMBRANE PROTEIN, TRANSPORT PROTEIN     20-JUL-06   2HRT              ']);
		h.should.eql({
			classification: 'MEMBRANE PROTEIN, TRANSPORT PROTEIN',
			depDate: {
				day: 20,
				month: 7,
				year: 2006
			},
			idCode: '2HRT'
		});
	});

	it('parses obslte', function () {
		var o = obslte([
			'OBSLTE     20-JUL-01 475D      1ENN 1ENN 1ENN 1ENN 1ENN 1ENN 1ENN 1ENN 1ENN     ',
			'OBSLTE   2 1ENN 1ENN 1ENN 1ENN 1ENN 1ENN 1ENN 1ENN 1ENN                         '
			]);

		o.should.eql({
			repDate: {
				day: 20,
				month: 7,
				year: 2001
			},
			idCode: '475D',
			rIdCode: [
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN',
				'1ENN'
		]});
	});

	it('parses title', function () {
		var t = title([
			'TITLE     CRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH             ' ,
			'TITLE    2 LIPOYL-AMP                                                           ']);

		t.should.eql({
			title: 'CRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH LIPOYL-AMP'
		});
	});

	it('parses split', function () {
		var s = split([
			'SPLIT     1VOQ 1VOR 1VOS 1VOU 1VOV 1VOW 1VOX 1VOY 1VP0 1VOZ                     ',
			'SPLIT   2 1VOA                                                                  '
			]);

		s.should.eql({
			idCode: [
				'1VOQ',
				'1VOR',
				'1VOS',
				'1VOU',
				'1VOV',
				'1VOW',
				'1VOX',
				'1VOY',
				'1VP0',
				'1VOZ',
				'1VOA'
			]
		});
	});

	it('parses caveat', function () {
		var c = caveat([
			'CAVEAT     1HRT FREE TEXT FREE TEXT FREE TEXT FREE TEXT FREE TEXT FREE TEXT FRE ',
			'CAVEAT   2 FREE TEXT'
			]);

		c.should.eql({
			idCode: '1HRT',
			comment: 'FREE TEXT FREE TEXT FREE TEXT FREE TEXT FREE TEXT FREE TEXT FRE FREE TEXT'
		});
	});

	it('parses compnd', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                          ',
			'COMPND   2 MOLECULE: ACRIFLAVINE RESISTANCE PROTEIN B;                         ',
			'COMPND   3 CHAIN: A, B, C, D, E, F;                                            ',
			'COMPND   4 ENGINEERED: YES                                                     '
		]);

		c1.should.eql({
			compound: [
				{
					MOL_ID: 1,
					MOLECULE: 'ACRIFLAVINE RESISTANCE PROTEIN B',
					CHAIN: [
						'A', 'B', 'C', 'D', 'E', 'F'
					],
					ENGINEERED: 'YES'
				}
			]
		});
	});

	it('parses compnd 3', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                            ',
			'COMPND   2 MOLECULE: RAB FAMILY PROTEIN;                                        ',
			'COMPND   3 CHAIN: A, B;                                                         ',
			'COMPND   4 FRAGMENT: COR, UNP RESIDUES 615-946;                                 ',
			'COMPND   5 SYNONYM: ROCO;                                                       ',
			'COMPND   6 ENGINEERED: YES                                                      '
		]);

		c1.should.eql({
			compound: [
				{
					MOL_ID: 1,
					MOLECULE: 'RAB FAMILY PROTEIN',
					CHAIN: [
						'A', 'B'
					]
				},
				{
					FRAGMENT: [
						'COR',
						'UNP RESIDUES 615-946'
					],
					SYNONYM: [
						'ROCO'
					],
					ENGINEERED: 'YES'
				}
			]
		});
	});

	it('parses compnd 2', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                           ',
			'COMPND   2 MOLECULE: LEUCOANTHOCYANIDIN DIOXYGENASE;                           ',
			'COMPND   3 CHAIN: A;                                                           ',
			'COMPND   4 SYNONYM: LDOX, LEUCOCYANIDIN OXYGENASE, ANS, LEUCOANTHOCYANIDIN     ',
			'COMPND   5  HYDROXYLASE, ANTHOCYANIDIN SYNTHASE;                               ',
			'COMPND   6 EC: 1.14.11.19;                                                     ',
			'COMPND   7 ENGINEERED: YES                                                     '
		]);

		c1.should.eql({
			compound: [
				{
					MOL_ID: 1,
					MOLECULE: 'LEUCOANTHOCYANIDIN DIOXYGENASE',
					CHAIN: [
						'A'
					],
					SYNONYM: [
						'LDOX',
						'LEUCOCYANIDIN OXYGENASE',
						'ANS', 
						'LEUCOANTHOCYANIDIN HYDROXYLASE', 
						'ANTHOCYANIDIN SYNTHASE'
					],
					EC: '1.14.11.19',
					ENGINEERED: 'YES'
				}
			]
		});
	});
	
	it('parses compnd 4', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                           ',
			'COMPND   2 MOLECULE: PENICILLOPEPSIN;                                          ',
			'COMPND   3 CHAIN: E;                                                           ',
			'COMPND   4 EC: 3.4.23.20;                                                      ',
			'COMPND   5 ENGINEERED: YES;                                                    ',
			'COMPND   6 MOL_ID: 2;                                                          ',
			'COMPND   7 MOLECULE: INHIBITOR ISOVALERYL (IVA)-VAL-VAL-LYSTA-O-ET (LYSTA IS A ',
			'COMPND   8 LYSYL SIDE CHAIN ANALOGUE OF STATIN;                                ',
			'COMPND   9 CHAIN: I;                                                          ',
			'COMPND  10 ENGINEERED: YES;                                                    ',
			'COMPND  11 OTHER_DETAILS: TRANSITION STATE MIMIC INHIBITOR                    '
		]);

		c1.should.eql({
			compound: [
				{
					MOL_ID: 1,
					MOLECULE: 'PENICILLOPEPSIN',
					CHAIN: [
						'E'
					],
					EC: '3.4.23.20',
					ENGINEERED: 'YES'
				},
				{
					MOL_ID: 2,
					MOLECULE: 'INHIBITOR ISOVALERYL (IVA)-VAL-VAL-LYSTA-O-ET (LYSTA IS A LYSYL SIDE CHAIN ANALOGUE OF STATIN',
					CHAIN: [
						'I'
					],
					ENGINEERED: 'YES',
					OTHER_DETAILS: 'TRANSITION STATE MIMIC INHIBITOR'
				}
			]
		});
	});

	it('parses compnd 5', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                           ',
			'COMPND   2 MOLECULE: ADENOSINE RECEPTOR A2A/SOLUBLE CYTOCHROME B562 CHIMERA;   ',
			'COMPND   3 CHAIN: A;                                                           ',
			'COMPND   4 SYNONYM: CYTOCHROME B-562;                                          ',
			'COMPND   5 ENGINEERED: YES;                                                    ',
			'COMPND   6 MUTATION: YES                                                   '
		]);

		c1.should.eql({
			compound: [
				{
					MOL_ID: 1,
					MOLECULE: 'ADENOSINE RECEPTOR A2A/SOLUBLE CYTOCHROME B562 CHIMERA',
					CHAIN: [
						'A'
					],
					SYNONYM: [
						'CYTOCHROME B-562'
					],
					ENGINEERED: 'YES',
					MUTATION: 'YES'
				}
			]
		});
	});

	it('parses source', function () {
		var s = source([
			'SOURCE    MOL_ID: 1;                                                           ',
			'SOURCE   2 ORGANISM_SCIENTIFIC: ESCHERICHIA COLI K12;                          ',
			'SOURCE   3 ORGANISM_TAXID: 83333;                                              ',
			'SOURCE   4 STRAIN: K-12;                                                       ',
			'SOURCE   5 GENE: ACRB, ACRE;                                                   ',
			'SOURCE   6 EXPRESSION_SYSTEM: ESCHERICHIA COLI;                                ',
			'SOURCE   7 EXPRESSION_SYSTEM_TAXID: 562;                                       ',
			'SOURCE   8 EXPRESSION_SYSTEM_STRAIN: C43(DE3);                                 ',
			'SOURCE   9 EXPRESSION_SYSTEM_VECTOR_TYPE: PLASMID;                             ',
			'SOURCE  10 EXPRESSION_SYSTEM_PLASMID: PET24                                    '
		]);

		s.should.eql({
			srcName: [
				{
					MOL_ID: 1,
					ORGANISM_SCIENTIFIC: [
						'ESCHERICHIA COLI K12'
					],
					ORGANISM_TAXID: [
						83333
					],
					STRAIN: 'K-12',
					GENE: 'ACRB, ACRE',
					EXPRESSION_SYSTEM: 'ESCHERICHIA COLI',
					EXPRESSION_SYSTEM_TAXID: 562,
					EXPRESSION_SYSTEM_STRAIN: 'C43(DE3)',
					EXPRESSION_SYSTEM_VECTOR_TYPE: 'PLASMID', 
					EXPRESSION_SYSTEM_PLASMID: 'PET24'
				}
			]
		});
	});
	
	it('parses source 2 (chimera)', function () {
		var s = source([
			'SOURCE    MOL_ID: 1;                                                           ',
			'SOURCE   2 ORGANISM_SCIENTIFIC: HOMO SAPIENS, ESCHERICHIA COLI;                ',
			'SOURCE   3 ORGANISM_COMMON: HUMAN;                                             ',
			'SOURCE   4 ORGANISM_TAXID: 9606, 562;                                          ',
			'SOURCE   5 GENE: AA2AR_HUMAN, ADORA2, ADORA2A, CYBC;                           ',
			'SOURCE   6 EXPRESSION_SYSTEM: SPODOPTERA FRUGIPERDA;                           ',
			'SOURCE   7 EXPRESSION_SYSTEM_COMMON: FALL ARMYWORM;                            ',
			'SOURCE   8 EXPRESSION_SYSTEM_TAXID: 7108;                                      ',
			'SOURCE   9 EXPRESSION_SYSTEM_CELL_LINE: SF9;                                   ',
			'SOURCE  10 EXPRESSION_SYSTEM_VECTOR_TYPE: BACULOVIRUS;                         ',
			'SOURCE  11 EXPRESSION_SYSTEM_PLASMID: PFASTBAC                                 '
		]);

		s.should.eql({
			srcName: [
				{
					MOL_ID: 1,
					ORGANISM_SCIENTIFIC: [
						'HOMO SAPIENS',
						'ESCHERICHIA COLI'
					],
					ORGANISM_COMMON: 'HUMAN',
					ORGANISM_TAXID: [
						9606, 562
					],
					GENE: 'AA2AR_HUMAN, ADORA2, ADORA2A, CYBC',
					EXPRESSION_SYSTEM: 'SPODOPTERA FRUGIPERDA',
					EXPRESSION_SYSTEM_COMMON: 'FALL ARMYWORM',
					EXPRESSION_SYSTEM_TAXID: 7108,
					EXPRESSION_SYSTEM_CELL_LINE: 'SF9',
					EXPRESSION_SYSTEM_VECTOR_TYPE: 'BACULOVIRUS', 
					EXPRESSION_SYSTEM_PLASMID: 'PFASTBAC'
				}
			]
		});
	});


	it('parses source 3 (+cellular location)', function () {
		var s = source([
			'SOURCE    MOL_ID: 1;                                                           ',
			'SOURCE   2 ORGANISM_SCIENTIFIC: ESCHERICHIA COLI;                              ',
			'SOURCE   3 ORGANISM_TAXID: 562;                                                ',
			'SOURCE   4 STRAIN: K38;                                                        ',
			'SOURCE   5 CELLULAR_LOCATION: CYTOPLASM;                                       ',
			'SOURCE   6 PLASMID: PAR/CHEY;                                                  ',
			'SOURCE   7 MOL_ID: 2;                                                          ',
			'SOURCE   8 ORGANISM_SCIENTIFIC: ESCHERICHIA COLI;                              ',
			'SOURCE   9 ORGANISM_TAXID: 562;                                                ',
			'SOURCE  10 STRAIN: K38;                                                        ',
			'SOURCE  11 CELLULAR_LOCATION: CYTOPLASM;                                       ',
			'SOURCE  12 PLASMID: PP2S                                                       '
		]);

		s.should.eql({
			srcName: [
				{
					MOL_ID: 1,
					ORGANISM_SCIENTIFIC: [
						'ESCHERICHIA COLI'
					],
					ORGANISM_TAXID: [
						562
					],
					STRAIN: 'K38',
					CELLULAR_LOCATION: 'CYTOPLASM',
					PLASMID: 'PAR/CHEY'
				},
				{
					MOL_ID: 2,
					ORGANISM_SCIENTIFIC: [
						'ESCHERICHIA COLI'
					],
					ORGANISM_TAXID: [
						562
					],
					STRAIN: 'K38',
					CELLULAR_LOCATION: 'CYTOPLASM',
					PLASMID: 'PP2S'
				},
			]
		});
	});

	it('parses keywds', function (done) {
		var k = keywds([
			'KEYWDS    ACRB, MULTIDRUG EFFLUX PUMP, RND, ANTIBIOTIC RESISTANCE, ACRA, TOLC,  ',  
			'KEYWDS   2 MEMBRANE PROTEIN, PROTON-COUPLED EXCHANGER, TRANSPORT PROTEIN        ']);

		k.should.eql({
			keywds: [
				'ACRB',
				'MULTIDRUG EFFLUX PUMP',
				'RND',
				'ANTIBIOTIC RESISTANCE',
				'ACRA',
				'TOLC',
				'MEMBRANE PROTEIN',
				'PROTON-COUPLED EXCHANGER',
				'TRANSPORT PROTEIN'
			]
		});

		done();
	});

	it('parses expdta', function (done) {
		var e = expdta(['EXPDTA    SOLUTION NMR                                                          ']);
		
		e.should.eql({
			techniques: [
				'SOLUTION NMR'
			]
		});

		done();
	});

	it('parses expdta (synthetic)', function (done) {
		var e = expdta([
				'EXPDTA    SOLUTION NMR; FIBER DIFFRACTION; NEUTRON DIFFRACTION; ELECTRON        ',
				'EXPDTA   2CRYSTALLOGRAPHY                                                       '
			]);
		
		e.should.eql({
			techniques: [
				'SOLUTION NMR',
				'FIBER DIFFRACTION',
				'NEUTRON DIFFRACTION',
				'ELECTRON CRYSTALLOGRAPHY'
			]
		});

		done();
	});

	it('parses nummdl', function (done) {
		var n = nummdl([
				'NUMMDL    20                                                                    '
			]);
	
		n.should.eql({
			modelNumber: 20
		});

		done();
	});

	it('parses mdltyp', function (done) {
		var m = mdltyp([
				'MDLTYP    CA ATOMS ONLY, CHAIN A, B, C, D, E, F, G, H, I, J, K ; P ATOMS ONLY    ', 
				'MDLTYP  2 CHAIN X, Y, Z                                                          '
			]);

		m.should.eql({
			comment: [
				'CA ATOMS ONLY, CHAIN A, B, C, D, E, F, G, H, I, J, K',
				'P ATOMS ONLY CHAIN X, Y, Z'
			]
		});

		done();
	});

	it('parses author', function (done) {
		var a = author([
				'AUTHOR    A.P.KUZIN,Y.CHEN,J.SEETHARAMAN,C.-K.HO,K.CUNNINGHAM,                  ',
				'AUTHOR   2 H.JANJUA,K.CONOVER,L.-C.MA,R.XIAO,T.B.ACTON,G.T.MONTELIONE,          ',
				'AUTHOR   3 J.F.HUNT,L.TONG,NORTHEAST STRUCTURAL GENOMICS CONSORTIUM             ',
				'AUTHOR   4 (NESG)                                                               '
			]);

		a.should.eql({
			authorList: [
				'A.P.KUZIN',
				'Y.CHEN',
				'J.SEETHARAMAN',
				'C.-K.HO',
				'K.CUNNINGHAM',
				'H.JANJUA',
				'K.CONOVER',
				'L.-C.MA',
				'R.XIAO',
				'T.B.ACTON',
				'G.T.MONTELIONE',
				'J.F.HUNT',
				'L.TONG',
				'NORTHEAST STRUCTURAL GENOMICS CONSORTIUM (NESG)'
			]
		});

		done();
	});

	it('parses revdat', function (done) {
		var r = revdat([
				'REVDAT   4 1 01-MAR-90 2HRT    1       REMARK JRNL   REVDAT AUTHOR TITLE MDLTYP ',
				'REVDAT   4 2 SOURCE                                                             ',
				'REVDAT   3   13-JUL-11 2HRT    1       VERSN                                    ',
				'REVDAT   2   20-OCT-09 2HRT    1       JRNL                                     ',
				'REVDAT   1   14-JUL-09 2HRT    0                                                '
			]);

		r.should.eql([
				{
					modNum: 4,
					modDate: {
						day: 1,
						month: 3,
						year: 1990
					},
					modId: '2HRT',
					modType: 1,
					record: [
						'REMARK',
						'JRNL',
						'REVDAT',
						'AUTHOR',
						'TITLE',
						'MDLTYP',
						'SOURCE',
					] 
				},
				{
					modNum: 3,
					modDate: {
						day: 13,
						month: 7,
						year: 2011
					},
					modId: '2HRT',
					modType: 1,
					record: [
						'VERSN'
					]
				},
				{
					modNum: 2,
					modDate: {
						day: 20,
						month: 10,
						year: 2009
					},
					modId: '2HRT',
					modType: 1,
					record: [
						'JRNL'
					]
				},
				{
					modNum: 1,
					modDate: {
						day: 14,
						month: 7,
						year: 2009
					},
					modId: '2HRT',
					modType: 0
				}
			]);
		done();
	});

	it('parses sprsde', function (done) {
		var s = sprsde([
				'SPRSDE  1 10-MAR-11 2HRT      2ART 2BRT 2CRT 2DRT 2ERT 2FRT 2GRT 2IRT 2JRT 2KRT ',
				'SPRSDE  2 2LRT 2MRT                                                             ',
			]);

		s.should.eql({
				sprsdeDate: {
					day: 10,
					month: 3,
					year: 2011
				},
				idCode: '2HRT',
				sIdCode: [
					'2ART',
					'2BRT',
					'2CRT',
					'2DRT',
					'2ERT',
					'2FRT',
					'2GRT',
					'2IRT',
					'2JRT',
					'2KRT',
					'2LRT',
					'2MRT'
				]
			});

		done();
	});

	describe('parses jrnl', function () {
		// errors in spec!
		it('parses jrnl auth', function (done) {
			var ja = jrnlauth([
					'JRNL        AUTH   M.A.SEEGER,A.SCHIEFNER,T.EICHER,F.VERREY,K.DIEDERICHS,       ',
					'JRNL        AUTH 2 K.M.POS                                                      '
				]);

			ja.should.eql([
					'M.A.SEEGER',
					'A.SCHIEFNER',
					'T.EICHER',
					'F.VERREY',
					'K.DIEDERICHS',
					'K.M.POS'
				]);

			done();
		});

		it('parses jrnl titl', function (done) {
			var jt = jrnltitl([
					'JRNL        TITL   STRUCTURAL ASYMMETRY OF ACRB TRIMER SUGGESTS A PERISTALTIC   ',
					'JRNL        TITL 2 PUMP MECHANISM.                                              '
				]);

			jt.should.eql('STRUCTURAL ASYMMETRY OF ACRB TRIMER SUGGESTS A PERISTALTIC PUMP MECHANISM.')

			done();
		});

		it('parses jrnl edit', function (done) {
			var je = jrnledit([
					'JRNL        EDIT   A.A.IVANOV, A.B.IVANOV, A.C.IVANOV, A.D.IVANOV, A.E.IVANOV,  ',
					'JRNL        EDIT 2 A.A.IVANOV, A.B.IVANOV, A.C.IVANOV, A.D.IVANOV, J.VAN JOOK   '
				]);
			je.should.eql([
					'A.A.IVANOV',
					'A.B.IVANOV',
					'A.C.IVANOV',
					'A.D.IVANOV',
					'A.E.IVANOV',
					'A.A.IVANOV',
					'A.B.IVANOV',
					'A.C.IVANOV',
					'A.D.IVANOV',
					'J.VAN JOOK'
				]);

			done();
		});

		it('parses jrnl ref (TO BE PUBLISHED)', function (done) {
			var jr = jrnlref([
					'JRNL        REF   TO BE PUBLISHED                                               '
				]);

			jr.should.eql({
				published: false
			});

			done();
		});

		it('parses jrnl ref (one-line pubName, no volume, page, year', function (done) {
			var jr = jrnlref([
						'JRNL        REF    SOME.IMPORTANT.NAME.SOME.I           123   2010              '				
					]);

			jr.should.eql({
				published: true,
				pubName: 'SOME.IMPORTANT.NAME.SOME.I',
				page: 123,
				year: 2010
			});

			done();
		});

		// Page and year seem to always come together.. And according to schema on p.43 are always there..
		// Volume is not mandatory

		it('parses jrnl ref (one-line pubName, volume, page, year', function (done) {
			var jr = jrnlref([
						'JRNL        REF    SOME.IMPORTANT.NAME.SOME.I    V.   3 123   2010              '				
					]);

			jr.should.eql({
				published: true,
				pubName: 'SOME.IMPORTANT.NAME.SOME.I',
				page: 123,
				year: 2010,
				volume: 3
			});

			done();
		});

		it('parses jrnl ref (multiline normal pubName, no volume, page, year)', function (done) {
			var jr = jrnlref([
					'JRNL        REF    SOME.IMPORTANT.NAME.SOME.I           123   2010              ',				
					'JRNL        REF  2 MPORTANT NAME NAME NAME                                      '
				]);

			jr.should.eql({
				published: true,
				pubName: 'SOME.IMPORTANT.NAME.SOME.I MPORTANT NAME NAME NAME',
				page: 123,
				year: 2010
			});

			done();
		});

		it('parses jrnl ref (multiline normal pubName ending in the m-period, no volume, page, year)', function (done) {
			var jr = jrnlref([
					'JRNL        REF    SOME.IMPORTANT.NAME.SOME.            123   2010              ',				
					'JRNL        REF  2 IMPORTANT NAME NAME NAME                                      '
				]);

			jr.should.eql({
				published: true,
				pubName: 'SOME.IMPORTANT.NAME.SOME.IMPORTANT NAME NAME NAME',
				page: 123,
				year: 2010
			});

			done();
		});

		it('parses jrnl ref (multiline normal pubName ending in the period, no volume, page, year)', function (done) {
			var jr = jrnlref([
					'JRNL        REF    SOME IMPORTANT NAME SOME.            123   2010              ',				
					'JRNL        REF  2 IMPORTANT NAME NAME NAME                                      '
				]);

			jr.should.eql({
				published: true,
				pubName: 'SOME IMPORTANT NAME SOME. IMPORTANT NAME NAME NAME',
				page: 123,
				year: 2010
			});

			done();
		});

		it('parses jrnl ref (multiline normal pubName ending in the hypen, no volume, page, year)', function (done) {
			var jr = jrnlref([
					'JRNL        REF    SOME IMPORTANT NAME SOME-            123   2010              ',				
					'JRNL        REF  2 IMPORTANT NAME NAME NAME                                      '
				]);

			jr.should.eql({
				published: true,
				pubName: 'SOME IMPORTANT NAME SOME-IMPORTANT NAME NAME NAME',
				page: 123,
				year: 2010
			});

			done();
		});

		it('parses jrnl publ', function (done) {
			var jp = jrnlpubl([
					'JRNL        PUBL   BLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH ',
					'JRNL        PUBL 2 2LAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH ',
				]);

			jp.should.equal('BLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH 2LAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH');

			done();
		});

		it('parses jrnl refn (not published)', function (done) {
			var jr = jrnlrefn([
					'JRNL        REFN                                                                '
				]);

			jr.should.eql({
				published: false
			});

			done();
		});

		it('parses jrnl refn (published, ISSN)', function (done) {
			var jr = jrnlrefn([
					'JRNL        REFN                   ISSN 0960-894X                               '
				]);

			jr.should.eql({
				published: true,
				issn: '0960-894X'
			});

			done();
		});

		it('parses jrnl refn (published, ESSN)', function (done) {
			var jr = jrnlrefn([
					'JRNL        REFN                   ESSN 0960-894X                               '
				]);

			jr.should.eql({
				published: true,
				issn: '0960-894X'
			});

			done();
		});

		// This part is also distorted in the spec
		it('parses jrnl pmid', function (done) {
			var jp = jrnlpmid([
					'JRNL        PMID   1629852711111111111111111111111111111111111111111111233333333',
					'JRNL        PMID 2 16298527                                                     '
				]);

			// if it 50-digit integer, it cannot be stored in javascript (or if its longer).
			// so stored as string
			jp.should.equal('162985271111111111111111111111111111111111111111111123333333316298527');

			done();
		});

		it('parses jrnl doi', function (done) {
			var jd = jrnldoi([
				'JRNL        DOI    1629852711111111111111111111111111111111111111111111233333333',
				'JRNL        DOI  2 16298527                                                     '
				]);

			jd.should.eql('162985271111111111111111111111111111111111111111111123333333316298527');

			done();
		});

		it('parses jrnl', function (done) {
			var j = jrnl([
						'JRNL        AUTH   K.HAKANSSON,M.CARLSSON,L.A.SVENSSON,A.LILJAS,                ',
						'JRNL        AUTH 2 K.HAKANSSON2,M.CARLSSON2,L.A.SVENSSON2,A.LILJAS2             ',
						'JRNL        TITL   STRUCTURE OF NATIVE AND APO CARBONIC ANHYDRASE II            ',
						'JRNL        TITL 2 AND STRUCTURE OF SOME OF ITS ANION-LIGAND                    ',
						'JRNL        TITL 3 COMPLEXES.                                                   ',
						'JRNL        EDIT   A.A.IVANOV, A.B.IVANOV, A.C.IVANOV, A.D.IVANOV, A.E.IVANOV,  ',
						'JRNL        EDIT 2 A.F.IVANOV, A.R.IVANOV                                       ',
						'JRNL        REF    J.MOL.BIOL.                   V. 227  1192 1992              ',
						'JRNL        REF  2 J.MOL.BIOL.                                                  ',
						'JRNL        PUBL   BLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH ',
						'JRNL        PUBL 2 2LAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH ',
						'JRNL        REFN                   ISSN 0022-2836                               ',
						'JRNL        PMID   1629852711111111111111111111111111111111111111111111233333333',
						'JRNL        PMID 2 16298527                                                     ',
						'JRNL        DOI    1629852711111111111111111111111111111111111111111111233333333',
						'JRNL        DOI  2 16298527                                                     '
					]);

			j.should.eql({
				authorList: [
					'K.HAKANSSON',
					'M.CARLSSON',
					'L.A.SVENSSON',
					'A.LILJAS',
					'K.HAKANSSON2',
					'M.CARLSSON2',
					'L.A.SVENSSON2',
					'A.LILJAS2'
				],
				title: 'STRUCTURE OF NATIVE AND APO CARBONIC ANHYDRASE II AND STRUCTURE OF SOME OF ITS ANION-LIGAND COMPLEXES.',
				editorList: [
					'A.A.IVANOV',
					'A.B.IVANOV',
					'A.C.IVANOV',
					'A.D.IVANOV',
					'A.E.IVANOV',
					'A.F.IVANOV',
					'A.R.IVANOV'
				],
				ref: {
					published: true,
					pubName: 'J.MOL.BIOL.J.MOL.BIOL.',
					volume: 227,
					page: 1192,
					year: 1992
				},
				pub: 'BLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH 2LAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH',
				refn: {published: true, issn: '0022-2836'},
				pmid: '162985271111111111111111111111111111111111111111111123333333316298527',
				doi: '162985271111111111111111111111111111111111111111111123333333316298527'
			});

			done();
		});
	});

	it('parses remark 0', function (done) {
		var r0 = remark0([
				'REMARK   0                                                                      ',
				'REMARK   0 THIS ENTRY yyyy REFLECTS AN ALTERNATIVE MODELING OF THE              ',
				'REMARK   0 ORIGINAL STRUCTURAL DATA (RxxxxSF or xxxx.MR) DETERMINED BY          ',
				'REMARK   0 AUTHORS OF THE PDB ENTRY xxxx.                                       ',
				'REMARK   0                                                                      ',
				'REMARK   0 ORIGINAL DATA REFERENCE 1                                            ',
				'REMARK   0 PDB ID: XXXX                                                         ',
				'REMARK   0 AUTH AUTHOR INITIALS, AUTHOR LAST NAME                               ',
				'REMARK   0 TITL                                                                 ',
				'REMARK   0 REF JRNL_NAME VOLUMNE PG YEAR                                        ',
				'REMARK   0 REFN ISSN #                                                          ',
				'REMARK   0 PMID XXXXXXX                                                         ',
				'REMARK   0 DOI YYYYYYY                                                          '
			]);

		r0.should.eql({
			data: 'THIS ENTRY yyyy REFLECTS AN ALTERNATIVE MODELING OF THE\n' + 
				  'ORIGINAL STRUCTURAL DATA (RxxxxSF or xxxx.MR) DETERMINED BY\n' +
				  'AUTHORS OF THE PDB ENTRY xxxx.\n' + 
				  '\n' +
				  'ORIGINAL DATA REFERENCE 1\n' +
				  'PDB ID: XXXX\n' + 
				  'AUTH AUTHOR INITIALS, AUTHOR LAST NAME\n' + 
				  'TITL\n' + 
				  'REF JRNL_NAME VOLUMNE PG YEAR\n' + 
				  'REFN ISSN #\n' +
				  'PMID XXXXXXX\n' + 
				  'DOI YYYYYYY\n'
		});

		done();
	});

	it('parses remark1', function (done) {
		var r1 = remark1([
				'REMARK   1                                                                      ',
				'REMARK   1 REFERENCE 1                                                          ',
				'REMARK   1  AUTH   J.N.BREG,J.H.J.VAN OPHEUSDEN,M.J.M.BURGERING,                ',
				'REMARK   1  AUTH 2 R.BOELENS,R.KAPTEIN                                          ',
				'REMARK   1  TITL   STRUCTURE OF ARC REPRESSOR IN SOLUTION: EVIDENCE             ',
				'REMARK   1  TITL 2 FOR A FAMILY OF B-SHEET DNA-BINDING PROTEIN                  ',
				'REMARK   1  REF    NATURE                        V. 346   586 1990              ',
				'REMARK   1  REFN                   ISSN 0028-0836                               ',
				'REMARK   1  PMID   2377232                                                      ',
				'REMARK   1  DOI    10.1038/346586a0                                             ',
				'REMARK   1 REFERENCE 2                                                          ',
				'REMARK   1  AUTH   J.N.BREG,R.BOELENS,A.V.E.GEORGE,R.KAPTEIN                    ',
				'REMARK   1  TITL   SEQUENCE-SPECIFIC 1H NMR ASSIGNMENT AND SECONDARY            ',
				'REMARK   1  TITL 2 STRUCTURE OF THE ARC REPRESSOR OF BACTERIOPHAGE              ',
				'REMARK   1  TITL 3 P22 AS DETERMINED BY 2D 1H NMR SPECTROSCOPY                  ',
				'REMARK   1  REF    BIOCHEMISTRY                  V.  28  9826 1989              ',
				'REMARK   1  REFN                   ISSN 0006-2960                               ',
				'REMARK   1  PMID   2611268                                                      '
			]);

			r1.should.eql({
				entries:
				[
					{
						entry: 1,
						authorList: [
							'J.N.BREG',
							'J.H.J.VAN OPHEUSDEN',
							'M.J.M.BURGERING',
							'R.BOELENS',
							'R.KAPTEIN'  
						],
						title: 'STRUCTURE OF ARC REPRESSOR IN SOLUTION: EVIDENCE FOR A FAMILY OF B-SHEET DNA-BINDING PROTEIN',
						ref: {
							pubName: 'NATURE',
							published: true,
							volume: 346,
							page: 586,
							year: 1990
						},
						refn: {
							published: true,
							issn: '0028-0836'
						},
						pmid: '2377232',
						doi: '10.1038/346586a0'
					},
					{
						entry: 2,
						authorList: [
							'J.N.BREG',
							'R.BOELENS',
							'A.V.E.GEORGE',
							'R.KAPTEIN'
						],
						title: 'SEQUENCE-SPECIFIC 1H NMR ASSIGNMENT AND SECONDARY STRUCTURE OF THE ARC REPRESSOR OF BACTERIOPHAGE P22 AS DETERMINED BY 2D 1H NMR SPECTROSCOPY',
						ref: {
							pubName: 'BIOCHEMISTRY',
							volume: 28,
							page: 9826,
							year: 1989,
							published: true
						},
						refn: {
							published: true,
							issn: '0006-2960'
						},
						pmid: '2611268'
					}
				]
			});

			done();
	});
})