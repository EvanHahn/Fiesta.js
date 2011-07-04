/*	Fiesta.js vector
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Vector3 = function(xCoord, yCoord, zCoord) {
	var x, y, z;
	this.setVector(Fiesta.DEFAULT_X, Fiesta.DEFAULT_Y, Fiesta.DEFAULT_Z);
	this.setVector(xCoord, yCoord, zCoord);
};

Fiesta.Vector3.prototype = {
	
	getX: function() { return x },
	getY: function() { return y },
	getZ: function() { return z },
	getVector: function() { return [this.getX(), this.getY(), this.getZ()] },
	setX: function(coord) {
		if (Fiesta.isNumber(coord))
			x = coord;
		else
			throw new TypeError(coord + " is not a valid X value");
	},
	setY: function(coord) {
		if (Fiesta.isNumber(coord))
			y = coord;
		else
			throw new TypeError(coord + " is not a valid Y value");
	},
	setZ: function(coord) {
		if (Fiesta.isNumber(coord))
			z = coord;
		else
			throw new TypeError(coord + " is not a valid Z value");
	},
	setVector: function(xCoord, yCoord, zCoord) {
		if (Fiesta.isArray(xCoord))	// You can set it to an array! Hooray
			return this.setVector(xCoord[0], xCoord[1], xCoord[2]);
		if (Fiesta.isNumber(xCoord))
			this.setX(xCoord);
		if (Fiesta.isNumber(yCoord))
			this.setY(yCoord);
		if (Fiesta.isNumber(zCoord))
			this.setZ(zCoord);
	},
	addX: function(a) { this.setX(a + this.getX()) },
	addY: function(a) { this.setY(a + this.getY()) },
	addZ: function(a) { this.setZ(a + this.getZ()) }
	
};