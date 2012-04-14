var RJS = require("../lib/RJS.2.5-node.js");
require("../lib/functional.js");
require("../lib/RJS.2.3-node-proto.js");

/**********************************
 * Helper Functions
 **********************************/

// functional's compose doesn't work in NodeJS
var compose = function(f,g) {
	return function() {
		return f(g.apply(null, arguments));
	};
}
var add = function(x,y) { return x + y; };

/**********************************
 * Build Alphabet file
 **********************************/

var letters = (26).map(compose(String.fromCharCode, add.curry(97)));
var makeFor = function(letter, tabSize, max, body) {
	return "for(var {0}=0; {0}<{1}; {0}++) {\n{2}\n}".supplant([letter, max, body]);
};

// do a reduction on letters: 
//		"for...", "a", ["b", "c", "d", ...]
//		"for...", "b", ["c", "d", "e", ...]
//		"for...", "c", ["c", "d", "f", ...]

var output = letters.join("\n");

/**********************************
 * Write File
 **********************************/

var fs = require('fs');
fs.writeFile("alphabet.js", output, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("The file was saved!");
	}
}); 
