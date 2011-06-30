/*	Fiesta.js camera 3D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Camera3D = new Fiesta.Class(Fiesta.LocatableEntity, {
	
	// Constructor
	initialize: function() {
		this._viewAngle = 70;	// this is temporary
		this._aspect = 4 / 3;
		this._near = 1;
		this._far = 1000;
		
		this._threeCamera = new THREE.Camera(this._viewAngle, this._aspect, this._near, this._far);
		
		this.callSuper();
	},
	
	// THREE API
	getThreeCamera: function() { return this._threeCamera },
	
	// Position API
	setX: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this._threeCamera.position.x = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate for the camera");
	},
	setY: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this._threeCamera.position.y = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate for the camera");
	},
	setZ: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this._threeCamera.position.z = coord;
		else
			throw new TypeError(coord + " is not a valid Z coordinate for the camera");
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