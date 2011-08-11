/*	Fiesta.js vector
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Vector3 = function(xCoord, yCoord, zCoord) {
	this.setVector(xCoord, yCoord, zCoord);
};

Fiesta.Vector3.prototype = {

	getX: function() { return this._x },
	getY: function() { return this._y },
	getZ: function() { return this._z },
	getVector: function() { return [this.getX(), this.getY(), this.getZ()] },
	setX: function(coord) {
		if (Fiesta.isNumber(coord))
			this._x = coord;
		else
			throw new TypeError(coord + " is not a valid X value");
	},
	setY: function(coord) {
		if (Fiesta.isNumber(coord))
			this._y = coord;
		else
			throw new TypeError(coord + " is not a valid Y value");
	},
	setZ: function(coord) {
		if (Fiesta.isNumber(coord))
			this._z = coord;
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