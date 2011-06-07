/*	Physical Game Object
	A physical game object can be seen; it has coordinates, speeds,
	velocities, and more.	*/

Fiesta.PhysicalGameObject = new JS.Class(Fiesta.GameObject, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._x;
		this._y;
		this._z;
		this._velocityX;
		this._velocityY;
		this._velocityZ;
		this._accelerationX;
		this._accelerationY;
		this._accelerationZ;
		this._frictionX;
		this._frictionY;
		this._frictionZ;
		this._mass;
		this._boundingBoxX1;
		this._boundingBoxY1;
		this._boundingBoxZ1;
		this._boundingBoxX2;
		this._boundingBoxY2;
		this._boundingBoxZ2;
		this._boundingBoxAuto = true;
		
		this.setCoordinates(0, 0, 0);
		this.setVelocityX(0);
		this.setVelocityY(0);
		this.setVelocityZ(0);
		this.setAccelerationX(0);
		this.setAccelerationY(0);
		this.setAccelerationZ(0);
		this.setFrictionX(0);
		this.setFrictionY(0);
		this.setFrictionZ(0);
		this.setMass(1);
		this.updateBoundingBox();
	},
	
	// Get/set location
	getX: function() { return this._x; },
	getY: function() { return this._y; },
	getZ: function() { return this._z; },
	setX: function(coord) {
		if (typeof coord === typeof 1.0)
			this._x = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setY: function(coord) {
		if (typeof coord === typeof 1.0)
			this._y = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setZ: function(coord) {
		if (typeof coord === typeof 1.0)
			this._z = coord;
		else
			throw new TypeError(coord + " is not a valid Z coordinate");
	},
	setCoordinates: function(xCoord, yCoord, zCoord) {
		if (xCoord !== undefined)
			this.setX(xCoord);
		if (yCoord !== undefined)
			this.setY(yCoord);
		if (zCoord !== undefined)
			this.setZ(zCoord);
	},
	
	// Get/set velocity
	getVelocityX: function() { return this._velocityX; },
	getVelocityY: function() { return this._velocityY; },
	getVelocityZ: function() { return this._velocityZ; },
	getVelocity: function() { return Fiesta.vectorLength(this._velocityX, this._velocityY, this._velocityZ); },
	setVelocityX: function(v) {
		if (typeof v === typeof 1.0)
			this._velocityX = v;
		else
			throw new TypeError(v + " is not a valid X velocity");
	},
	setVelocityY: function(v) {
		if (typeof v === typeof 1.0)
			this._velocityY = v;
		else
			throw new TypeError(v + " is not a valid Y velocity");
	},
	setVelocityZ: function(v) {
		if (typeof v === typeof 1.0)
			this._velocityZ = v;
		else
			throw new TypeError(v + " is not a valid Z velocity");
	},
	
	// Get/set acceleration
	getAccelerationX: function() { return this._accelerationX; },
	getAccelerationY: function() { return this._accelerationY; },
	getAccelerationZ: function() { return this._accelerationZ; },
	getAcceleration: function() { return Fiesta.vectorLength(this._accelerationX, this._accelerationY, this._accelerationZ); },
	setAccelerationX: function(a) {
		if (typeof a === typeof 1.0)
			this._accelerationX = a;
		else
			throw new TypeError(a + " is not a valid X acceleration");
	},
	setAccelerationY: function(a) {
		if (typeof a === typeof 1.0)
			this._accelerationY = a;
		else
			throw new TypeError(a + " is not a valid Y acceleration");
	},
	setAccelerationZ: function(a) {
		if (typeof a === typeof 1.0)
			this._accelerationZ = a;
		else
			throw new TypeError(a + " is not a valid Z acceleration");
	},
	
	// Get/set friction
	getFrictionX: function() { return this._frictionX; },
	getFrictionY: function() { return this._frictionY; },
	getFrictionZ: function() { return this._frictionZ; },
	getFriction: function() { return Fiesta.vectorLength(this._frictionX, this._frictionY, this._frictionZ); },
	setFrictionX: function(f) {
		if (typeof f === typeof 1.0)
			this._frictionX = f;
		else
			throw new TypeError(f + " is not a valid X friction");
	},
	setFrictionY: function(f) {
		if (typeof f === typeof 1.0)
			this._frictionY = f;
		else
			throw new TypeError(f + " is not a valid Y friction");
	},
	setFrictionZ: function(f) {
		if (typeof f === typeof 1.0)
			this._frictionZ = f;
		else
			throw new TypeError(f + " is not a valid Z friction");
	},
	
	// Get/set mass
	getMass: function() { return this._mass; },
	setMass: function(m) {
		if (typeof m === typeof 1.0)
			this._mass = m;
		else
			throw new TypeError(m + " is not a valid mass");
	},
	
	// Get/set bounding box
	getBoundingBoxX1: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxX1;
	},
	getBoundingBoxY1: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxY1;
	},
	getBoundingBoxZ1: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxZ1;
	},
	getBoundingBoxX2: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxX2;
	},
	getBoundingBoxY2: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxY2;
	},
	getBoundingBoxZ2: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxZ2;
	},
	getBoundingBox: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return [this._boundingBoxX1, this._boundingBoxY1, this._boundingBoxZ1, this._boundingBoxX2, this._boundingBoxY2, this._boundingBoxZ2];
	},
	updateBoundingBox: function() {
		if (this._boundingBoxAuto) {
			var context = "2d";	// temporary
			if (context === "2d") {
				if (this.getSprite()) {
					this._boundingBoxX1 = this.getX() - this.getSprite().getOriginX();
					this._boundingBoxY1 = this.getY() - this.getSprite().getOriginY();
					this._boundingBoxZ1 = this.getZ();
					this._boundingBoxX2 = this.getX() + this.getSprite().getOriginX();
					this._boundingBoxY2 = this.getY() + this.getSprite().getOriginY();
					this._boundingBoxZ2 = this._boundingBoxZ1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
				} else {
					this._boundingBoxX1 = this.getX();
					this._boundingBoxY1 = this.getY();
					this._boundingBoxZ1 = this.getZ();
					this._boundingBoxX2 = this._boundingBoxX1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
					this._boundingBoxY2 = this._boundingBoxY1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
					this._boundingBoxZ2 = this._boundingBoxZ1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
				}
				return [this._boundingBoxX1, this._boundingBoxY1, this._boundingBoxZ1, this._boundingBoxX2, this._boundingBoxY2, this._boundingBoxZ2];
			}
		}
	},
	
	// Extrapolated functions
	getMomentum: function() { return this._mass * this.getVelocity(); },
	
	// Physics
	onFrame: function() {
		this.callSuper();
		var fps = this.getPlayground().getDesiredFPS();
		this._x += this._velocityX / fps;
		this._y += this._velocityY / fps;
		this._z += this._velocityZ / fps;
		this._velocityX += this._accelerationX / fps;
		this._velocityY += this._accelerationY / fps;
		this._velocityZ += this._accelerationZ / fps;
		if (this._frictionX !== 0) {
			var frictX = this._frictionX / fps;
			if (this._velocityX < 0)
				frictX = frictX * -1;
			if (Math.abs(this._velocityX) > Math.abs(frictX))
				this._velocityX -= frictX;
			else
				this._velocityX = 0;
		}
		if (this._frictionY !== 0) {
			var frictY = this._frictionY / fps;
			if (this._velocityY < 0)
				frictY = frictY * -1;
			if (Math.abs(this._velocityY) > Math.abs(frictY))
				this._velocityY -= frictY;
			else
				this._velocityY = 0;
		}
		if (this._frictionZ !== 0) {
			var frictZ = this._frictionZ / fps;
			if (this.velocityZ < 0)
				frictZ = frictZ * -1;
			if (Math.abs(this._velocityZ) > Math.abs(frictZ))
				this._velocityZ -= frictZ;
			else
				this._velocityZ = 0;
		}
	}
	
});