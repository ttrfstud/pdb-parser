var Title = require('../src/records/Title');
var Stringg = require('../src/datatypes/String');

describe('title has continuations so always array-based', function () {
	it('happy path', function () {
		(function () {
			Title.parse([
			'TITLE     CRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH              ',
			'TITLE    2 LIPOYL-AMP                                                           ']);
			Title.parse([
			'TITLE     CRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH              ']);
		}).should.not.throw();
	});

	it('unhappy path', function () {
		(function () {
			Title.parse([
			'TITLE     \nCRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH              ',
			'TITLE    2 LIPOYL-AMP                                                           ']);
		}).should.throw('WRONG TITLE');

		(function () {
			Title.parse([
			'TITLE     \nCRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH              ']);
		}).should.throw('WRONG TITLE');
	});

	it('has title field, which is immut and String', function () {
		var t = Title.parse([
			'TITLE     CRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH              ',
			'TITLE    2 LIPOYL-AMP                                                           ']);
	
		t.title.should.be.instanceof(Stringg);
		t.title.val.should.equal('CRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH LIPOYL-AMP');

		t.title = 0;
		t.title.val.should.equal('CRYSTAL STRUCTURE OF LIPOATE-PROTEIN LIGASE A BOUND WITH LIPOYL-AMP');
	});
});