var RJS = require("../lib/rjs.2.5.js");
require("../lib/functional.js");
require("../lib/rjs.2.3-node-proto.js");

/**********************************
 * Constants
 **********************************/
var TAB_SIZE = 2;

/**********************************
 * Build Alphabet file
 **********************************/

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
