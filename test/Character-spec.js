var Character = require('../src/datatypes/Character');

describe('character', function () {
	it('accepts single valid character', function () {
		(function () {
			new Character('a');new Character('A'); 
			new Character('b');new Character('B');
			new Character('c');new Character('C');
			new Character('d');new Character('D');
			new Character('e');new Character('E');
			new Character('f');new Character('F');
			new Character('g');new Character('G');
			new Character('h');new Character('H');
			new Character('i');new Character('I');
			new Character('j');new Character('J');
			new Character('k');new Character('K');
			new Character('l');new Character('L');
			new Character('m');new Character('M');
			new Character('n');new Character('N');
			new Character('o');new Character('O');
			new Character('p');new Character('P');
			new Character('q');new Character('Q');
			new Character('r');new Character('R');
			new Character('s');new Character('S');
			new Character('t');new Character('T');
			new Character('u');new Character('U');
			new Character('v');new Character('V');
			new Character('w');new Character('W');
			new Character('x');new Character('X');
			new Character('y');new Character('Y');
			new Character('z');new Character('Z');
			new Character('0');new Character('1');
			new Character('2');new Character('3');
			new Character('4');new Character('5');
			new Character('6');new Character('7');
			new Character('8');new Character('9');
			new Character(' ');

			new Character(String.fromCharCode(96));
			new Character(String.fromCharCode(45));
			new Character(String.fromCharCode(61));
			new Character(String.fromCharCode(91));
			new Character(String.fromCharCode(93));
			new Character(String.fromCharCode(92));
			new Character(String.fromCharCode(59));
			new Character(String.fromCharCode(39));
			new Character(String.fromCharCode(44));
			new Character(String.fromCharCode(46));
			new Character(String.fromCharCode(47));
			new Character(String.fromCharCode(126));
			new Character(String.fromCharCode(33));
			new Character(String.fromCharCode(64));
			new Character(String.fromCharCode(35));
			new Character(String.fromCharCode(36));
			new Character(String.fromCharCode(37));
			new Character(String.fromCharCode(94));
			new Character(String.fromCharCode(38));
			new Character(String.fromCharCode(42));
			new Character(String.fromCharCode(40));
			new Character(String.fromCharCode(41));
			new Character(String.fromCharCode(95));
			new Character(String.fromCharCode(43));
			new Character(String.fromCharCode(123));
			new Character(String.fromCharCode(125));
			new Character(String.fromCharCode(124));
			new Character(String.fromCharCode(58));
			new Character(String.fromCharCode(34));
			new Character(String.fromCharCode(60));
			new Character(String.fromCharCode(62));
			new Character(String.fromCharCode(63));
		}).should.not.throw();
	});

	it('any invalid control character and newline must throw', function () {
		(function () {
			new Character(String.fromCharCode(10));
		}).should.throw('WRONG CHARACTER');
		(function () {
			new Character(String.fromCharCode(13));
		}).should.throw('WRONG CHARACTER');
		(function () {
			new Character(String.fromCharCode(7));
		}).should.throw('WRONG CHARACTER');
	});

	it('has ch field', function () {
		new Character('c').ch.should.equal('c');
	});

	it('its toString is that character', function () {
		new Character('c').toString().should.equal('c');
	});
});