var parser = require('../src/parser');
var header = require('../src/parser').header;
var obslte = require('../src/parser').obslte;
var title  = require('../src/parser').title ;
var split  = require('../src/parser').split ;

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
})