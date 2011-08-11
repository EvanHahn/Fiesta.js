/*	Fiesta.js math
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Sign of a number
Fiesta.sign = function(d) {
	if (!Fiesta.isNumber(d))
		throw new TypeError("Cannot find sign of " + typeof d + " " + d);
	if (d > 0) return 1;
	if (d < 0) return -1;
	return 0;
}

// Wrap a value around (functions below are good examples)
Fiesta.wrap = function(min, max, value) {
	if (!Fiesta.isNumber(min)) throw new TypeError(min + " is not a valid minimum");
	if (!Fiesta.isNumber(max)) throw new TypeError(max + " is not a valid maximum");
	if (!Fiesta.isNumber(value)) throw new TypeError(value + " is not a valid value");
	if (min > max) throw new Error("Cannot wrap if the minimum (" + min + ") is greater than the maximum (" + max + ")");
	
	var diff = max - min;
	if (value > max)
		return Fiesta.wrap(min, max, value - diff);
	if (value < min)
		return Fiesta.wrap(min, max, value + diff);
	return value;
}

// Angle wrapping (ie, change 370º to 10º)
Fiesta.degrees = function(d) { return Fiesta.wrap(0, 360, d) };
Fiesta.radians = function(d) { return Fiesta.wrap(0, 2 * Math.PI, d) };

// Convert rotation measurements
Fiesta.degreesToRadians = function(d) { return (Fiesta.degrees(d) * Math.PI) / 180; };
Fiesta.radiansToDegrees = function(r) { return (Fiesta.radians(r) * 180) / Math.PI; };

// Distances between points (2 and 3 dimensions)
Fiesta.pointDistance2D = function(x1, y1, x2, y2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); };
Fiesta.pointDistance3D = function(x1, y1, z1, x2, y2, z2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)); };

// Vector length
Fiesta.vectorLength = function(i, j, k) {

	// If it's a 3D vector
	if (i instanceof Fiesta.Vector3) {
		return Fiesta.vectorLength(i.getX(), i.getY(), i.getZ());
	}

	// If it's an array
	if (!k) return Fiesta.pointDistance2D(0, 0, i, j);
	return Fiesta.pointDistance3D(0, 0, 0, i, j, k);

};

