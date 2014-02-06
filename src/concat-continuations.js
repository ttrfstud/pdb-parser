function concatContinuations(cArray, cLen) {
	var copy = cArray.slice(0);

	var cont = '';
	for (var i = 0; i < copy.length; i++) {

		if (copy[i].indexOf('\r') !== -1 || 
			copy[i].indexOf('\n') !== -1) {
			throw new Error('WRONG CONTINUATION');
		}

		copy[i] = copy[i].substring(8 + cLen);

		if (copy[i][0] !== ' ') {
			throw new Error('WRONG CONTINUATION');
		}

		cont += copy[i];
	}

	cont = cont.trim();
	cont = cont.replace(/\s+/g, ' ');

	return cont;
}

module.exports = concatContinuations;
