var Split = require('../src/records/Split');
var IDcode = require('../src/datatypes/IDcode');

describe('split has continuations so always array-based', function () {
	it('happy path', function () {
		(function () {
			Split.parse([
			'SPLIT      1VOQ 1VOR 1VOS 1VOU 1VOV 1VOW 1VOX 1VOY 1VP0 1VOZ                         ',
			'SPLIT    2 1VOA                                                                      ']);
			Split.parse([
			'SPLIT      1VOQ 1VOR 1VOS 1VOU 1VOV 1VOW 1VOX 1VOY 1VP0 1VOZ                         ']);
		}).should.not.throw();
	});

	it('unhappy path', function () {
		(function () {
			Split.parse([
			'SPLIT \n     1VOQ 1VOR 1VOS 1VOU 1VOV 1VOW 1VOX 1VOY 1VP0 1VOZ                         ',
			'SPLIT    2 1VOA                                                                      ']);
		}).should.throw('WRONG SPLIT');

		(function () {
			Split.parse([
			'SPLIT \n     1VOQ 1VOR 1VOS 1VOU 1VOV 1VOW 1VOX 1VOY 1VP0 1VOZ                         ']);
		}).should.throw('WRONG SPLIT');
	});

	it('has idCode field, which is immut Array', function () {
		var s = Split.parse([
			'SPLIT      1VOQ 1VOR 1VOS 1VOU 1VOV 1VOW 1VOX 1VOY 1VP0 1VOZ                         ',
			'SPLIT    2 1VOA                                                                      ']);
	
		s.idCode.should.be.instanceof(Array);
		s.idCode.length.should.equal(11);

		s.idCode[0].first.should.equal(1);
		s.idCode[0].second.should.equal('V');
		s.idCode[0].third.should.equal('O');
		s.idCode[0].fourth.should.equal('Q');

		s.idCode[10].first.should.equal(1);
		s.idCode[10].second.should.equal('V');
		s.idCode[10].third.should.equal('O');
		s.idCode[10].fourth.should.equal('A');
	});
});