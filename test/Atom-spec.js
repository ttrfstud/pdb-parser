var Atom = require('../src/datatypes/Atom');

describe('atom name', function () {
	it('has name field', function () {
		new Atom('H').name.should.equal('H');
	});	

	it('its toString is atom name', function () {
		new Atom('H').toString().should.equal('H');
	});
});