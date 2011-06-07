/*	Common Fiesta functions
	Here is a hodgepodge of Fiesta functions.	*/

// Does my browser support Fiesta?
Fiesta.checkSupport = function() {
	var canvas = !!document.createElement("canvas").getContext;
	var audio = !!document.createElement("audio").canPlayType;
	return (canvas && audio);
};

// Make a GUID
Fiesta._guids = [];
Fiesta.guid = function() {
	var guid = Math.floor(Math.random() * Date.now());
	for (var i in this._guids) {
		if (this._guids[i] === guid)
			return this.guid();	// Start over; we already have this GUID
	}
	this._guids.push(guid);
	return guid;
};

// Get the file extension
Fiesta.getFileExtension = function(filename) {
	var extension = filename.split(".").pop();
	if (extension === filename)	// No extension
		return "";
	else
		return extension.toLowerCase();
};

// Does a string contain another string?
Fiesta.contains = function(str, searching) {
	return (str.indexOf(searching) !== -1);
};

// Convert rotation measurements
Fiesta.degreesToRadians = function(d) { return (d * Math.PI) / 180; };
Fiesta.radiansToDegrees = function(r) { return (r * 180) / Math.PI; };

// Distances between points (2 and 3 dimensions)
Fiesta.pointDistance2D = function(x1, y1, x2, y2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); };
Fiesta.pointDistance3D = function(x1, y1, z1, x2, y2, z2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)); };

// Vector length
Fiesta.vectorLength = function(i, j, k) {
	if (!k)
		return Fiesta.pointDistance2D(0, 0, i, j);
	return Fiesta.pointDistance3D(0, 0, 0, i, j, k);
};