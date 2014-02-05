function List(expression) {
	if (expression.indexOf(',') === -1) {
		throw new Error('WRONG LIST');
	}

	if(/[^\\]\:/.test(expression)) {
		throw new Error('WRONG LIST');
	}

	var split = expression.split(',');

	var text = [];
	for (var i = 0; i < split.length; i++) {
		if (!split[i] || !split[i].replace(/[\r\n]/g, '')) {
			throw new Error('WRONG LIST');
		}

		text.push(split[i]);
	}

	this.text = text;
}

List.prototype.toString = function () {
	return this.text.join(',');
};

module.exports = List;