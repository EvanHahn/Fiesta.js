/*	Fiesta.js graphic
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Graphic = new Fiesta.Class({

	// Constructor
	initialize: function() {
		this._origin = new Fiesta.Vector3();
		this._boundingBox = new Array(6);
		this._boundingBoxChanged = true;
		
		this.setOrigin(Fiesta.DEFAULT_GRAPHIC_ORIGIN_X, Fiesta.DEFAULT_GRAPHIC_ORIGIN_Y, Fiesta.DEFAULT_GRAPHIC_ORIGIN_Z);
	},
	
	// Origin API
	getOriginX: function() { return this._origin.getX(); },
	getOriginY: function() { return this._origin.getY(); },
	getOriginZ: function() { return this._origin.getZ(); },
	setOriginX: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._origin.setX(coord);
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setOriginY: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._origin.setY(coord);
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setOriginZ: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._origin.setZ(coord);
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid Z coordinate");
	},
	setOrigin: function(xCoord, yCoord, zCoord) {
		this.setOriginX(xCoord);
		this.setOriginY(yCoord);
		if (!Fiesta.isUndefined(zCoord)) this.setOriginZ(zCoord);
	},
	
	// "Abstract" functions
	getBoundingBox: function() { throw new Error("This graphic must know how to get a bounding box") }

});