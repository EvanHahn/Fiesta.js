/*	Fiesta.js light 3D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Light3D = new Fiesta.Class(Fiesta.Entity, {

	// Constructor
	initialize: function(color) {
		this._threeLight = new THREE.PointLight(color || 0xFFFFFF);	// temp
		
		this.callSuper();
	},
	
	// THREE API
	getThreeLight: function() { return this._threeLight },
	setThreeLight: function(l) {
     	if (l instanceof THREE.Light)
       	this._threeLight = l;
       else
       	throw new TypeError(l + " is not a valid light");
	},
	
	// Color API
	setColor: function(c) {
     	this.setThreeLight(new THREE.PointLight(c));  // temp
	},
	
	// Position API
	setX: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this.getThreeLight().position.x = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate for the light");
	},
	setY: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this.getThreeLight().position.y = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate for the light");
	},
	setZ: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this.getThreeLight().position.z = coord;
		else
			throw new TypeError(coord + " is not a valid Z coordinate for the light");
	},
	setCoordinates: function(xCoord, yCoord, zCoord) {
		if (!Fiesta.isUndefined(xCoord))
			this.setX(xCoord);
		if (!Fiesta.isUndefined(yCoord))
			this.setY(yCoord);
		if (!Fiesta.isUndefined(zCoord))
			this.setZ(zCoord);
	},
	addX: function(a) { this.setX(a + this.getX()) },
	addY: function(a) { this.setY(a + this.getY()) },
	addZ: function(a) { this.setZ(a + this.getZ()) }

});