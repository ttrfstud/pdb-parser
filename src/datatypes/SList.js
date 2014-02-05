function List(expression) {
	if (expression.indexOf(';') === -1) {
		throw new Error('WRONG SLIST');
	}

	if(/[^\\]\:/.test(expression)) {
		throw new Error('WRONG SLIST');
	}

	var split = expression.split(';');

	var text = [];
	for (var i = 0; i < split.length; i++) {
		if (!split[i] || !split[i].replace(/[\r\n]/g, '')) {
			throw new Error('WRONG SLIST');
		}

		text.push(split[i]);
	}

	this.text = text;
}

List.prototype.toString = function () {
	return this.text.join(';');
};

module.exports = List;