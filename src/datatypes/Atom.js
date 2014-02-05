function Atom(name) {
	this.name = name;
}

Atom.prototype.toString = function () {
	return this.name;
}

module.exports = Atom;