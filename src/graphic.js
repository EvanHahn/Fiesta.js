/*	Fiesta.js graphic
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Graphic = new Fiesta.Class(Fiesta.BaseObject, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._originX;
		this._originY;
		this._originZ;
		this._boundingBox = [];
		this._boundingBoxChanged = true;
		
		this.setOrigin(0, 0, 0);
	},
	
	// Origin API
	getOriginX: function() { return this._originX; },
	getOriginY: function() { return this._originY; },
	getOriginZ: function() { return this._originZ; },
	setOriginX: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._originX = coord;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setOriginY: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._originY = coord;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setOriginZ: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._originZ = coord;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid Z coordinate");
	},
	setOrigin: function(xCoord, yCoord, zCoord) {
		this.setOriginX(xCoord);
		this.setOriginY(yCoord);
		if (zCoord) this.setOriginY(zCoord);
	},
	
	// "Abstract" functions
	getBoundingBox: function() { throw new Error("This graphic must know how to get a bounding box") }
	
});