var RecordName = require('../src/datatypes/RecordName');

describe('record name', function () {
	it('should be valid record name, NS', function () {
		(function () {
			new RecordName('CRYST1 ');
		}).should.not.throw();
	});

	it('unhappy path', function () {
		(function () {
			new RecordName('UNKNWN ');
		}).should.throw('WRONG RECORD NAME');
	});

	it('its toString is its record name', function () {
		new RecordName('REMARK ').toString().should.equal('REMARK ');
	});

	it('it has val prop, which is immutable', function () {
		var rn = new RecordName('REMARK ');

		rn.val = 'YOYOYO ';
		rn.val.should.equal('REMARK ');
	});
});