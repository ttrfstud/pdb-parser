var Header = require('../src/records/Header');
var Stringg = require('../src/datatypes/String');
var Datee = require('../src/datatypes/Date');
var IDcode = require('../src/datatypes/IDcode');

describe('header', function () {
	it('has .parse method', function () {
		(function () {
			Header.parse('HEADER    MEMBRANE PROTEIN, TRANSPORT PROTEIN     20-JUL-06   2HRT              ');
		}).should.not.throw();
	});
	
	it('parse method unhappy path', function () {
		(function () {
			Header.parse('HEADER   MEMBRANE PROTEIN,TRANSPORT PROTEIN    20-JUL-06   2HRT              ');
		}).should.throw('WRONG HEADER');
	});

	it('contains (immut) 40-long classification', function () {
		var header = Header.parse('HEADER    MEMBRANE PROTEIN, TRANSPORT PROTEIN     20-JUL-06   2HRT              ');

		header.classification.should.be.instanceof(Stringg);
		header.classification.val.should.equal('MEMBRANE PROTEIN, TRANSPORT PROTEIN     ');

		header.classification = '0';

		header.classification.val.should.equal('MEMBRANE PROTEIN, TRANSPORT PROTEIN     ');
	});

	it('contains depDate, which is also immut', function () {
		var header = Header.parse('HEADER    MEMBRANE PROTEIN, TRANSPORT PROTEIN     20-JUL-06   2HRT              ');

		header.depDate.should.be.instanceof(Datee);
		header.depDate.day.should.equal(20);
		header.depDate.month.should.equal(07);
		header.depDate.year.should.equal(2006);

		header.depDate = 0;

		header.depDate.day.should.equal(20);
		header.depDate.month.should.equal(07);
		header.depDate.year.should.equal(2006);
	});

	it('contains idCode, which is also immut', function () {
		var header = Header.parse('HEADER    MEMBRANE PROTEIN, TRANSPORT PROTEIN     20-JUL-06   2HRT              ');
		
		header.idCode.should.be.instanceof(IDcode);
		header.idCode.first.should.equal(2);
		header.idCode.second.should.equal('H');
		header.idCode.third.should.equal('R');
		header.idCode.fourth.should.equal('T');;

		header.idCode.containsCoordinateData().should.equal(true);
		header.idCode = 0;

		header.idCode.first.should.equal(2);
		header.idCode.second.should.equal('H');
		header.idCode.third.should.equal('R');
		header.idCode.fourth.should.equal('T');

		header.idCode.containsCoordinateData().should.equal(true);
	});
});