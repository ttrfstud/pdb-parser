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
		return parseInt(revdatLine.substr(7, 3), 10);
	}

	for (var i = 0; i < revdat.length; i++) {
		currentModNum = modnum(revdat[i]);

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

function jrnlauth(jrnlauth) {
	var continuation = cc(jrnlauth, 10);
	continuation = continuation.split(',').map(function (el) { return el.trim(); });

	return continuation;
}

function jrnltitl(jrnltitl) {
	var continuation = cc(jrnltitl, 10);

	return continuation;
}

function jrnledit(jrnledit) {
	var continuation = cc(jrnledit, 10);
	continuation = continuation.split(',').map(function (el) { return el.trim(); });

	return continuation;
}

function jrnlref(jrnlref) {
	if (jrnlref.length === 1 && jrnlref[0].indexOf('TO BE PUBLISHED') > 0) {
		return {
			published: false
		};
	}

	var pubName = jrnlref[0].substring(19, 47).trim();
	var page = parseInt(jrnlref[0].substring(56, 61), 10);
	var year = parseInt(jrnlref[0].substring(62, 66), 10);

	if (jrnlref[0].substring(49, 51) === 'V.') {
		var volume = parseInt(jrnlref[0].substring(51, 55));
	}

	if (jrnlref.length > 1) {
		var pubNameParts = [pubName];
		var i = 1;

		for (; i < jrnlref.length; i++) {
			pubNameParts.push(jrnlref[i].substring(19, 47).trim());
		}

		pubName = '';

		for (var i = 0; i < pubNameParts.length; i++) {
			if (!((pubNameParts[i].split('.').length - 1 > 1 && pubNameParts[i].substr(-1, 1) === '.') ||
				pubNameParts[i].substr(-1, 1) === '-')) {
				pubNameParts[i] += ' ';
			}

			pubName += pubNameParts[i];
		}

		pubName = pubName.trim();
	}

	var result = {
		pubName: pubName,
		published: true,
		page: page,
		year: year
	};

	if (volume) {
		result.volume = volume;
	}

	return result;
}

function jrnlpubl(jrnlpubl) {
	var continuation = cc(jrnlpubl, 10);

	return continuation;
}

function jrnlrefn(jrnlrefn) {
	if (jrnlrefn[0].indexOf('ISSN') === -1 && jrnlrefn[0].indexOf('ESSN') === -1) {
		return {
			published: false
		};
	}

	return {
		published: true,
		issn: jrnlrefn[0].substring(40, 65).trim() 
	};
}

function jrnlpmid(jrnlpmid) {
	var continuation = cc(jrnlpmid, 11);

	return continuation;
}

function jrnldoi(jrnldoi) {
	var continuation = cc(jrnldoi, 11);

	return continuation;
}

var JRNL_HASH = {
	'AUTH' : {
		f: jrnlauth,
		prop: 'authorList'
	},
	'TITL' : {
		f: jrnltitl,
		prop: 'title'
	},
	'EDIT' : {
		f: jrnledit,
		prop: 'editorList'
	},
	'REF ' : {
		f: jrnlref,
		prop: 'ref'
	},
	'PUBL' : {
		f: jrnlpubl,
		prop: 'pub'
	},
	'REFN' : {
		f: jrnlrefn,
		prop: 'refn'
	},
	'PMID' : {
		f: jrnlpmid,
		prop: 'pmid'
	},
	'DOI ' : {
		f: jrnldoi,
		prop: 'doi'
	}
};

function jrnl(jrnl) {
	var designator = '';
	var group = [];
	var result = {};

	for (var i = 0; i < jrnl.length; i++) {
		var currentDesignator = jrnl[i].substring(12, 16);
		if (designator !== currentDesignator) {
			if (group.length) {
				result[JRNL_HASH[designator].prop] = JRNL_HASH[designator].f(group);
			}
			group = [];
			designator = currentDesignator;
		}

		group.push(jrnl[i]);
	}

	result[JRNL_HASH[designator].prop] = JRNL_HASH[designator].f(group);

	return result;
}

function remark0 (remark0) {
	var data = '';

	for (var i = 0; i < remark0.length; i++) {
		var chunk = remark0[i].substring(11).trim();

		if (i) {
			data += chunk + '\n';
		}
	}

	return {
		data: data
	};
}

function remark1(remark1) {
	remark1 = remark1.slice(1);

	var entry;
	var ref = [];
	var jrnls = [];
	for (var i = 0; i < remark1.length; i++) {
		if (remark1[i].substring(11, 20) === 'REFERENCE') {
			if (ref.length) {
				var jrnl0 = jrnl(ref);
				jrnl0.entry = entry;
				jrnls.push(jrnl0);
			}
			ref = [];
			entry = parseInt(remark1[i].substring(21));
		} else {
			ref.push(remark1[i]);
		}
	}

	jrnl0 = jrnl(ref);
	jrnl0.entry = entry;
	jrnls.push(jrnl0);

	return {
		entries: jrnls
	};
}

function remark2(remark2) {
	if (remark2[1].indexOf('NOT APPLICABLE') > 0) {
		return {
			applicable: false
		};
	}

	return {
		applicable: true,
		resolution: parseFloat(remark2[1].substring(26, 30))
	};
}

function remark3(remark3) {
	var data = '';

	for (var i = 1; i < remark3.length; i++) {
		data += remark3[i].substr(11) + '\n';
	}

	return {
		data: data
	};
}

function remark4(remark4) {
	var version = parseFloat(remark4[1].substring(40, 44));
	var date0 = date(remark4[1].substr(46, 9));

	return {
		version: version,
		date: date0
	};
}

function remark5(remark5) {
	return remark0(remark5);
}

function remark100(remark100) {
	if (remark100[1].indexOf('BNL') !== -1) {
		return {
			site: 'BNL'
		};
	}

	var site = remark100[1].substring(44, 48);
	var date0 = date(remark100[1].substr(52, 9));
	var code = remark100[2].substring(31).trim();

	code = code.substring(0, code.length - 1);

	return {
		site: site,
		date: date0,
		code: code
	}
}

function remark200(remark200) {
	return;
}

exports.header = header;
exports.obslte = obslte;
exports.title  = title ;
exports.split  = split ;
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
exports.jrnlauth = jrnlauth;
exports.jrnltitl = jrnltitl;
exports.jrnledit = jrnledit;
exports.jrnlref  = jrnlref ;
exports.jrnlpubl = jrnlpubl;
exports.jrnlrefn = jrnlrefn;
exports.jrnlpmid = jrnlpmid;
exports.jrnldoi = jrnldoi;
exports.jrnl   = jrnl  ;
exports.remark0 = remark0;
exports.remark1 = remark1;
exports.remark2 = remark2;
exports.remark3 = remark3;
exports.remark4 = remark4;
exports.remark5 = remark5;
exports.remark100 = remark100;
exports.remark200 = remark200;