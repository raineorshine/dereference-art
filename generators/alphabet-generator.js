var RJS = require("../lib/RJS.2.5-node.js");
require("../lib/functional.js");
require("../lib/RJS.2.3-node-proto.js");

/**********************************
 * Constants
 **********************************/
var TAB_SIZE = 2;

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

// @param args { letter, tabLevel, max, body }
var makeFor = function(args) {
	args.tabs =	" ".repeat(args.tabLevel * TAB_SIZE);
	return "{tabs}for(var {letter}=0; {letter}<{max}; {letter}++) {\n{body}\n{tabs}}".supplant(args);
};

var makeForRecur = function(index) {
	var letter = String.fromCharCode(index + 97);
	return makeFor({
		letter: letter,
		tabLevel: index,
		max: 100,
		body: index < 25 ? makeForRecur(index + 1) : ""
	});
};

// do a reduction on letters: 
//		"for...", "a", ["b", "c", "d", ...]
//		"for...", "b", ["c", "d", "e", ...]
//		"for...", "c", ["c", "d", "f", ...]

var output = makeForRecur(0);

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
