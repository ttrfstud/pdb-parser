var Obslte = require('../src/records/Obslte');
var Datee = require('../src/datatypes/Date');
var IDcode = require('../src/datatypes/IDcode');

describe('obsolete has continuations so always array-based', function () {
	it('happy path', function () {
		(function () {
			Obslte.parse([
			'OBSLTE     01-JUL-08 21GS      3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ     ',
			'OBSLTE   2 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             ']);
			Obslte.parse([
			'OBSLTE     01-JUL-08 21GS      3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ     ']);
		}).should.not.throw();
	});

	it('unhappy path', function () {
		(function () {
			Obslte.parse([
			'OBSLTE   01-JUL-08 21GS     3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ     ',
			'OBSLTE   2 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             ']);
		}).should.throw('WRONG OBSLTE');

		(function () {
			Obslte.parse([
			'OBSLTE   01-JUL-08 21GS     3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ     ']);
		}).should.throw('WRONG OBSLTE');

		(function () {
		Obslte.parse([
			'OBSLTE     01-JUL-08 21GS      3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ     ',
			'OBSLTE  23CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             ']);
		}).should.throw('WRONG OBSLTE');
	});

	it('has repDate field, idCode field and rIdCode array, all immut', function () {
		var o = Obslte.parse([
			'OBSLTE     01-JUL-08 21GS      3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ     ',
			'OBSLTE   2 3CSJ 3CSJ 3CSJ 3CSJ 3CSJ                                             ']);
	
		o.repDate.should.be.instanceof(Datee);
		o.repDate.day.should.equal(1);
		o.repDate.month.should.equal(7);
		o.repDate.year.should.equal(2008);

		o.repDate = 0;
		o.repDate.day.should.equal(1);
		o.repDate.month.should.equal(7);
		o.repDate.year.should.equal(2008);

		o.idCode.should.be.instanceof(IDcode);
		o.idCode.first.should.equal(2);
		o.idCode.second.should.equal('1');
		o.idCode.third.should.equal('G');
		o.idCode.fourth.should.equal('S');

		o.idCode = 0;
		o.idCode.first.should.equal(2);
		o.idCode.second.should.equal('1');
		o.idCode.third.should.equal('G');
		o.idCode.fourth.should.equal('S');

		o.rIdCode.should.be.instanceof(Array);
		o.rIdCode.length.should.equal(14);

		for (var i = 0; i < 14; i++) {
			o.rIdCode[i].should.be.instanceof(IDcode);
			o.rIdCode[i].first.should.equal(3);
			o.rIdCode[i].second.should.equal('C');
			o.rIdCode[i].third.should.equal('S');
			o.rIdCode[i].fourth.should.equal('J');

			o.rIdCode[i] = 0;
			o.rIdCode[i].first.should.equal(3);
			o.rIdCode[i].second.should.equal('C');
			o.rIdCode[i].third.should.equal('S');
			o.rIdCode[i].fourth.should.equal('J');
		}

		o.rIdCode = 0;

		o.rIdCode.should.be.instanceof(Array);
		o.rIdCode.length.should.equal(14);
	});
});