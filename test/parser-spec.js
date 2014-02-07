var parser = require('../src/parser');
var header = require('../src/parser').header;
var obslte = require('../src/parser').obslte;
var title  = require('../src/parser').title ;
var split  = require('../src/parser').split ;
var caveat = require('../src/parser').caveat;
var compnd = require('../src/parser').compnd;

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

	// This one passes. Go to hell should
	xit('parses compnd', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                          ',
			'COMPND   2 MOLECULE: ACRIFLAVINE RESISTANCE PROTEIN B;                         ',
			'COMPND   3 CHAIN: A, B, C, D, E, F;                                            ',
			'COMPND   4 ENGINEERED: YES                                                     '
		]);

		c1.should.equal({
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

	xit('parses compnd 3', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                            ',
			'COMPND   2 MOLECULE: RAB FAMILY PROTEIN;                                        ',
			'COMPND   3 CHAIN: A, B;                                                         ',
			'COMPND   4 FRAGMENT: COR, UNP RESIDUES 615-946;                                 ',
			'COMPND   5 SYNONYM: ROCO;                                                       ',
			'COMPND   6 ENGINEERED: YES                                                      '
		]);

		c1.should.equal({
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
	xit('parses compnd 2', function () {
		var c1 = compnd([
			'COMPND    MOL_ID: 1;                                                           ',
			'COMPND   2 MOLECULE: LEUCOANTHOCYANIDIN DIOXYGENASE;                           ',
			'COMPND   3 CHAIN: A;                                                           ',
			'COMPND   4 SYNONYM: LDOX, LEUCOCYANIDIN OXYGENASE, ANS, LEUCOANTHOCYANIDIN     ',
			'COMPND   5  HYDROXYLASE, ANTHOCYANIDIN SYNTHASE;                               ',
			'COMPND   6 EC: 1.14.11.19;                                                     ',
			'COMPND   7 ENGINEERED: YES                                                     '
		]);

		c1.should.equal({
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
	xit('parses compnd 4', function () {
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

		c1.should.equal({
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
	}); // TODO: MUTATION left untested


})