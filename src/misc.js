/*	Fiesta.js misc. functions
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Check value types
Fiesta.isNumber = function(n) { return (((typeof n === typeof 1.0) || (n instanceof Number)) && (!isNaN(n))) };
Fiesta.isInteger = function(i) { return ((Fiesta.isNumber(i)) && (Math.floor(i) == i)) };
Fiesta.isString = function(s) { return ((typeof s === typeof "") || (s instanceof String)) };
Fiesta.isBoolean = function(b) { return ((typeof b === typeof true) || (b instanceof Boolean)) };
Fiesta.isArray = function(a) { return a instanceof Array };
Fiesta.isUndefined = function(u) { return typeof u === "undefined"; };
// If you're looking for it, isNaN() is built into JavaScript

// "Create" undefined (nicer-looking version of void())
Fiesta.makeUndefined = function() { return; };
Fiesta.makeNaN = function() { return parseInt(void(0)) };

// Does this string/array contain this element?
Fiesta.contains = function(searchIn, searchFor) { return !!~searchIn.indexOf(searchFor) };

// Get the file extension
Fiesta.getFileExtension = function(filename) {
	var extension = filename.split(".").pop();
	if (extension === filename)	// No extension
		return "";
	else
		return extension.toLowerCase();
};