/*	Fiesta.js entity
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Entity = new Fiesta.Class(Fiesta.BaseObject, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._graphic;
		this._playground;
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
		this._bounciness;
		this._boundingBox = [];
		this._boundingBoxAuto = Fiesta.DEFAULT_BOUNDING_BOX_AUTO;
		this._isSolid = Fiesta.DEFAULT_ENTITY_SOLID;
		
		this.setCoordinates(Fiesta.DEFAULT_X, Fiesta.DEFAULT_Y, Fiesta.DEFAULT_Z);
		this.setVelocityX(Fiesta.DEFAULT_X_VELOCITY);
		this.setVelocityY(Fiesta.DEFAULT_Y_VELOCITY);
		this.setVelocityZ(Fiesta.DEFAULT_Z_VELOCITY);
		this.setAccelerationX(Fiesta.DEFAULT_X_ACCELERATION);
		this.setAccelerationY(Fiesta.DEFAULT_Y_ACCELERATION);
		this.setAccelerationZ(Fiesta.DEFAULT_Z_ACCELERATION);
		this.setFrictionX(Fiesta.DEFAULT_X_FRICTION);
		this.setFrictionY(Fiesta.DEFAULT_Y_FRICTION);
		this.setFrictionZ(Fiesta.DEFAULT_Z_FRICTION);
		this.setMass(Fiesta.DEFAULT_MASS);
		this.setBounciness(Fiesta.DEFAULT_BOUNCINESS);
	},
	
	// Graphic API
	getGraphic: function() {
		if (this._graphic)
			return this._graphic;
		else
			return false;
	},
	setGraphic: function(g) {
		if (g instanceof Fiesta.Graphic)
			this._graphic = g;
		else
			throw new TypeError(g + " is not a graphic");
	},
	
	// Playground API
	getPlayground: function() {
		if (this._playground)
			return this._playground;
		else
			return false;
	},
	_setPlayground: function(p) {
		if (p instanceof Fiesta.Playground)
			this._playground = p;
		else
			throw new TypeError(p + " is not a valid playground");
	},
	_resetPlayground: function() {
		this._playground = Fiesta.makeUndefined();
	},
	
	// Remove me from the playground
	destroy: function() {
		this.getPlayground().destroy(this);
	},
	
	// Location API
	getX: function() { return this._x; },
	getY: function() { return this._y; },
	getZ: function() { return this._z; },
	getCoordinates: function() { return [this._x, this._y, this._z] },
	setX: function(coord) {
		if (Fiesta.isNumber(coord))
			this._x = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setY: function(coord) {
		if (Fiesta.isNumber(coord))
			this._y = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setZ: function(coord) {
		if (Fiesta.isNumber(coord))
			this._z = coord;
		else
			throw new TypeError(coord + " is not a valid Z coordinate");
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
	addZ: function(a) { this.setZ(a + this.getZ()) },
	
	// Velocity API
	getVelocityX: function() { return this._velocityX; },
	getVelocityY: function() { return this._velocityY; },
	getVelocityZ: function() { return this._velocityZ; },
	getVelocity: function() { return Fiesta.vectorLength(this._velocityX, this._velocityY, this._velocityZ); },
	setVelocityX: function(v) {
		if (Fiesta.isNumber(v))
			this._velocityX = v;
		else
			throw new TypeError(v + " is not a valid X velocity");
	},
	setVelocityY: function(v) {
		if (Fiesta.isNumber(v))
			this._velocityY = v;
		else
			throw new TypeError(v + " is not a valid Y velocity");
	},
	setVelocityZ: function(v) {
		if (Fiesta.isNumber(v))
			this._velocityZ = v;
		else
			throw new TypeError(v + " is not a valid Z velocity");
	},
	addVelocityX: function(a) { this.setVelocityX(a + this.getVelocityX()) },
	addVelocityY: function(a) { this.setVelocityY(a + this.getVelocityY()) },
	addVelocityZ: function(a) { this.setVelocityZ(a + this.getVelocityZ()) },
	
	// Acceleration API
	getAccelerationX: function() { return this._accelerationX; },
	getAccelerationY: function() { return this._accelerationY; },
	getAccelerationZ: function() { return this._accelerationZ; },
	getAcceleration: function() { return Fiesta.vectorLength(this._accelerationX, this._accelerationY, this._accelerationZ); },
	setAccelerationX: function(a) {
		if (Fiesta.isNumber(a))
			this._accelerationX = a;
		else
			throw new TypeError(a + " is not a valid X acceleration");
	},
	setAccelerationY: function(a) {
		if (Fiesta.isNumber(a))
			this._accelerationY = a;
		else
			throw new TypeError(a + " is not a valid Y acceleration");
	},
	setAccelerationZ: function(a) {
		if (Fiesta.isNumber(a))
			this._accelerationZ = a;
		else
			throw new TypeError(a + " is not a valid Z acceleration");
	},
	addAccelerationX: function(a) { this.setAccelerationX(a + this.getAccelerationX()) },
	addAccelerationY: function(a) { this.setAccelerationY(a + this.getAccelerationY()) },
	addAccelerationZ: function(a) { this.setAccelerationZ(a + this.getAccelerationZ()) },
	
	// Friction API
	getFrictionX: function() { return this._frictionX; },
	getFrictionY: function() { return this._frictionY; },
	getFrictionZ: function() { return this._frictionZ; },
	getFriction: function() { return Fiesta.vectorLength(this._frictionX, this._frictionY, this._frictionZ); },
	setFrictionX: function(f) {
		if (Fiesta.isNumber(f))
			this._frictionX = f;
		else
			throw new TypeError(f + " is not a valid X friction");
	},
	setFrictionY: function(f) {
		if (Fiesta.isNumber(f))
			this._frictionY = f;
		else
			throw new TypeError(f + " is not a valid Y friction");
	},
	setFrictionZ: function(f) {
		if (Fiesta.isNumber(f))
			this._frictionZ = f;
		else
			throw new TypeError(f + " is not a valid Z friction");
	},
	addFrictionX: function(a) { this.setFrictionX(a + this.getFrictionX()) },
	addFrictionY: function(a) { this.setFrictionY(a + this.getFrictionY()) },
	addFrictionZ: function(a) { this.setFrictionZ(a + this.getFrictionZ()) },
	
	// Mass API
	getMass: function() { return this._mass; },
	setMass: function(m) {
		if ((Fiesta.isNumber(m)) && (m > 0))
			this._mass = m;
		else
			throw new TypeError(m + " is not a valid mass");
	},
	addMass: function(a) { this.setMass(a + this.getMass()) },
	
	// Bounciness API
	getBounciness: function() { return this._bounciness; },
	setBounciness: function(b) {
		if (Fiesta.isNumber(b))
			this._bounciness = b;
		else
			throw new TypeError(b + " is not a valid bounciness");
	},
	addBounciness: function(a) { this.setBounciness(a + this.getBounciness()) },
	
	// Bounding box API
	getBoundingBox: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBox;
	},
	setBoundingBox: function(b) {
		if (!Fiesta.isArray(b))
			throw new TypeError("Cannot make a bounding box out of " + b);
		var i = b.length;
		if (i !== 6)
			throw new Error("Not enough values passed to make a bounding box");
		while (i --) {
			if (!Fiesta.isNumber(b[i]))
				throw new TypeError(b[i] + " is not a valid bounding box value");
		}
		this._boundingBox = b;
		this._boundingBoxAuto = false;
	},
	updateBoundingBox: function() {
		if (this._boundingBoxAuto) {
			if (graphic = this.getGraphic()) {
				var bounding = graphic.getBoundingBox();
				this._boundingBox = [
					this.getX() + bounding[0],
					this.getY() + bounding[1],
					this.getZ() + bounding[2],
					this.getX() + bounding[3],
					this.getY() + bounding[4],
					this.getZ() + bounding[5]
				];
			} else {
				this._boundingBox = [
					this.getX() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getY() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getZ() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getX() + (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getY() + (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getZ() + (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2)
				];
			}
		}
	},
	
	// Solidity API
	isSolid: function() { return this._isSolid },
	setSolidity: function(s) {
		if (Fiesta.isBoolean(s))
			this._isSolid = s;
		else
			throw new TypeError("Cannot set solidity to " + s);
	},
	
	// Do physics stuff on each frame
	onFrame: function() {
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
	},
	
	// Events (to be overwritten)
	onSpawn: function() {},
	onDestroy: function() {},
	onCollide: function() {}
	
});

// Colliding two physical objects
Fiesta.collidePhysicalObjects = function(a, b) {
	var aMass = a.getMass();
	var bMass = b.getMass();
	var massRatio = aMass / bMass;
	var massSum = aMass + bMass;
	var bOldVX = b.getVelocityX();
	var bOldVY = b.getVelocityY();
	var bOldVZ = b.getVelocityZ();
	var distanceXSign = Fiesta.sign(a.getX() - b.getX());
	var distanceYSign = Fiesta.sign(a.getY() - b.getY());
	var distanceZSign = Fiesta.sign(a.getZ() - b.getZ());
	b.setVelocityX((a.getVelocityX() * massRatio) || 0);	// NaN shows up if either
	b.setVelocityY((a.getVelocityY() * massRatio) || 0);	// mass is Infinity; the
	b.setVelocityZ((a.getVelocityZ() * massRatio) || 0);	// || 0 fixes that
	a.setVelocityX((bOldVX / massRatio) || 0);
	a.setVelocityY((bOldVY / massRatio) || 0);
	a.setVelocityZ((bOldVZ / massRatio) || 0);
	var aMoves = (1 - (aMass / massSum)) || 0;
	var bMoves = (1 - (bMass / massSum)) || 0;
	a.addX(distanceXSign * aMoves);
	a.addY(distanceYSign * aMoves);
	a.addZ(distanceZSign * aMoves);
	b.addX(-distanceXSign * bMoves);
	b.addY(-distanceYSign * bMoves);
	b.addZ(-distanceZSign * bMoves);
	a.onCollide(b);
	b.onCollide(a);
};
