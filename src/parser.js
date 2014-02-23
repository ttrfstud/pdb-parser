var cc = require('./concat-continuations');

var MONTHS = {JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12};
function date(date) {
	var day = parseInt(date.substring(0, 2));
	var month = MONTHS[date.substring(3, 6)];
	var year = parseInt(date.substring(7));

	if (year < 50) {
		year += 2000;
	} else {
		year += 1900;
	}

	return {
		day: day,
		month: month,
		year: year
	}
}


function parsePdb(pdb) {

}

function title(title) {
	var continuation = cc(title, 2);

	return {
		title: continuation
	};
}

function split(split) {
	var continuation = cc(split, 2).split(' ');

	return {
		idCode: continuation
	};
}

function compnd(compnd) {
	return compndOrSource(compnd, 'compound', function (first, second, structure) {
		switch(first) {
			case 'MOL_ID': 
				structure[first] = parseInt(second); break;
			case 'CHAIN' :
			case 'SYNONYM' :
			case 'FRAGMENT' : 
				structure[first] = second.split(', '); break;
			default: structure[first] = second;
		}
	});
}

function source(source) {
	return compndOrSource(source, 'srcName', function (first, second, structure) {
		switch(first) {
			case 'MOL_ID':
			case 'EXPRESSION_SYSTEM_TAXID':
				 structure[first] = parseInt(second); break;
			case 'ORGANISM_TAXID':
				structure[first] = toIntList(second); break;
			case 'ORGANISM_SCIENTIFIC':
			case 'FRAGMENT' : 
				structure[first] = second.split(', '); break;

			default: structure[first] = second;
		}
	});
}

function toIntList(str) {
	return str.split(',').map(function (e) { return parseInt(e);});
}

function compndOrSource(text, key, switchCallback) {
	var continuation = cc(text, 2);

	continuation = continuation.split(';');

	var structures = [];

	var structure;
	for (var i = 0; i < continuation.length; i++) {
		var split = continuation[i].split(':');
		var first = split[0].trim();
		var second = split[1].trim();

		// console.log('firrss', first);
		if (first === 'MOL_ID' || first === 'FRAGMENT') {
			if (structure) {
				structures.push(structure);
			}

			structure = {};
		}

		switchCallback(first, second, structure);
	}

	if (structure) {
		structures.push(structure);
	}

	var result = {};

	result[key] = structures;

	return result;
}

function caveat(caveat) {
	var continuation = cc(caveat, 2);
	var idCode = continuation.substring(0, 4);
	var comment = continuation.substring(5);

	return {
		idCode: idCode,
		comment: comment
	}
}

function header(header) {
	header = header[0];
	var classification = header.substring(10, 50).trim();
	var depDate = date(header.substring(50, 59));
	var idCode = header.substring(62, 66);

	return {
		classification: classification,
		depDate: depDate,
		idCode: idCode
	};
}

function obslte(obslte) {
	var continuation = cc(obslte, 2);

	var repDate = date(continuation.substring(0, 10));
	var idCode = continuation.substring(10, 14);

	continuation = continuation.substring(15).split(' ');

	return {
		repDate: repDate,
		idCode: idCode,
		rIdCode: continuation
	}
}

function keywds(keywds) {
	var continuation = cc(keywds, 2);
	
	continuation = continuation.split(/\s?,\s/g);
	
	return {
		keywds: continuation
	};
}

function expdta(expdta) {
	var continuation = cc(expdta, 2);

	continuation = continuation.split(/\s?;\s/g);

	return {
		techniques: continuation
	};
}

function nummdl(nummdl) {
	return {
		modelNumber: parseInt(nummdl[0].substr(8), 10)
	};
}

function mdltyp(mdltyp) {
	var continuation = cc(mdltyp, 2);

	continuation = continuation.split(/\s*;\s*/g);

	return {
		comment: continuation
	};
}

function author(author) {
	var continuation = cc(author, 2);

	continuation = continuation.split(/\s?,\s?/g);

	return {
		authorList: continuation
	};
}

function revdat(revdat) {
	var modNums = [[]];
	var currentModNum, prevModNum, i, j = 0;

	console.log('\n');

	function modnum(revdatLine) {
		console.log(revdatLine);
		return parseInt(revdatLine.substr(7, 3), 10);
	}

	for (var i = 0; i < revdat.length; i++) {
		currentModNum = modnum(revdat[i]);

		console.log(currentModNum);

		if (!prevModNum) {
			prevModNum = currentModNum;
		}

		if (currentModNum !== prevModNum) {
			modNums.push([]);
			j++;
			prevModNum = currentModNum;
		}

		if (!modNums[j].length) {
			modNums[j].push(currentModNum);
		} 

		modNums[j].push(revdat[i]);
	}

	modNums = modNums.map(function (el) {
		var modNum = el[0];
		var continuation = cc(el.slice(1), 4);
		var modDate = date(continuation.substr(0, 9));
		var modId = continuation.substr(10, 4);
		console.log(continuation);
		console.log(continuation.substr(18));
		console.log(continuation.substr(15));
		var modType = parseInt(continuation.substr(15, 1), 10);
		var records = continuation.substr(17).split(' ').reduce(function (acc, el) {
			if (!el) {
				return acc;
			}

			acc.push(el);
			return acc;
		}, []);

		var result = {
			modNum: modNum,
			modDate: modDate,
			modId: modId,
			modType: modType
		};

		if (records.length) {
			result.record = records;
		}

		return result;
	});

	return modNums;
} 

function sprsde(sprsde) {
	var continuation = cc(sprsde, 2);

	var sprsdeDate = date(continuation.substr(0, 9));
	var idCode = continuation.substr(10, 4);

	continuation = continuation.substr(15).split(' ');

	return {
		sprsdeDate: sprsdeDate,
		idCode: idCode,
		sIdCode: continuation
	};
}

exports.header = header;
exports.obslte = obslte;
exports.title = title;
exports.split = split;
exports.caveat = caveat;
exports.compnd = compnd;
exports.source = source;
exports.keywds = keywds;
exports.expdta = expdta;
exports.nummdl = nummdl;
exports.mdltyp = mdltyp;
exports.author = author;
exports.revdat = revdat;
exports.sprsde = sprsde;