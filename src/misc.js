/*	Fiesta.js misc. functions
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt

	Much of this is taken from the free license JSTypes 1.40.
	http://github.com/EvanHahn/JSTypes
	*/

// Check value types
Fiesta.getClass = {}.toString;
Fiesta.isNumber = function(n) { return (Fiesta.getClass.call(n) == '[object Number]') && (n == n) };
Fiesta.isInteger = function(i) { return Fiesta.isNumber(i) && Math.floor(i) == i };
Fiesta.isString = function(s) { return Fiesta.getClass.call(s) == '[object String]' };
Fiesta.isBoolean = function(b) { return Fiesta.getClass.call(b) == '[object Boolean]' };
Fiesta.isArray = function(a) { return Fiesta.getClass.call(a) == '[object Array]' };
Fiesta.isDefined = function(d) { return (typeof d != 'undefined') && (d != null) && (d == d) };
Fiesta.isUndefined = function(u) { return typeof u == 'undefined' };
Fiesta.isNAN = function(i) { return i != i };
Fiesta.isInfinite = function(i) { return Fiesta.isNumber(i) && !isFinite(i) };

// Create values that could be redefined
Fiesta.makeUndefined = function() {};
Fiesta.makeNaN = function() { return 0 / 0 };
Fiesta.makeInfinity = function() { return 1 / 0 };

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