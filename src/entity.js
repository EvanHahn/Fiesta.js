/*	Fiesta.js entity
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Entity = new Fiesta.Class({
	
	// Constructor
	initialize: function() {
		this._graphic;
		this._playground;
		this._position = new Fiesta.Vector3();
		this._velocity = new Fiesta.Vector3();
		this._acceleration = new Fiesta.Vector3();
		this._friction = new Fiesta.Vector3();
		this._mass;
		this._bounciness;
		this._boundingBox = new Array(6);
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
		if (g instanceof Fiesta.Graphic) {
			this._graphic = g;
			if (g instanceof Fiesta.Sprite2D) {
				g.getImage();
			}
		}
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
	getX: function() { return this._position.getX() },
	getY: function() { return this._position.getY() },
	getZ: function() { return this._position.getZ() },
	getCoordinates: function() { return this._position.getVector() },
	setX: function(coord) {
		if (Fiesta.isNumber(coord))
			this._position.setX(coord);
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setY: function(coord) {
		if (Fiesta.isNumber(coord))
			this._position.setY(coord);
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setZ: function(coord) {
		if (Fiesta.isNumber(coord))
			this._position.setZ(coord);
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
	getVelocityX: function() { return this._velocity.getX() },
	getVelocityY: function() { return this._velocity.getY() },
	getVelocityZ: function() { return this._velocity.getZ() },
	getVelocity: function() { return Fiesta.vectorLength(this._velocity.getVector()); },
	setVelocityX: function(v) {
		if (Fiesta.isNumber(v))
			this._velocity.setX(v);
		else
			throw new TypeError(v + " is not a valid X velocity");
	},
	setVelocityY: function(v) {
		if (Fiesta.isNumber(v))
			this._velocity.setY(v);
		else
			throw new TypeError(v + " is not a valid Y velocity");
	},
	setVelocityZ: function(v) {
		if (Fiesta.isNumber(v))
			this._velocity.setZ(v);
		else
			throw new TypeError(v + " is not a valid Z velocity");
	},
	addVelocityX: function(a) { this.setVelocityX(a + this.getVelocityX()) },
	addVelocityY: function(a) { this.setVelocityY(a + this.getVelocityY()) },
	addVelocityZ: function(a) { this.setVelocityZ(a + this.getVelocityZ()) },
	
	// Acceleration API
	getAccelerationX: function() { return this._acceleration.getX() },
	getAccelerationY: function() { return this._acceleration.getY() },
	getAccelerationZ: function() { return this._acceleration.getZ() },
	setAccelerationX: function(a) {
		if (Fiesta.isNumber(a))
			this._acceleration.setX(a);
		else
			throw new TypeError(a + " is not a valid X acceleration");
	},
	setAccelerationY: function(a) {
		if (Fiesta.isNumber(a))
			this._acceleration.setY(a);
		else
			throw new TypeError(a + " is not a valid Y acceleration");
	},
	setAccelerationZ: function(a) {
		if (Fiesta.isNumber(a))
			this._acceleration.setZ(a);
		else
			throw new TypeError(a + " is not a valid Z acceleration");
	},
	addAccelerationX: function(a) { this.setAccelerationX(a + this.getAccelerationX()) },
	addAccelerationY: function(a) { this.setAccelerationY(a + this.getAccelerationY()) },
	addAccelerationZ: function(a) { this.setAccelerationZ(a + this.getAccelerationZ()) },
	
	// Friction API
	getFrictionX: function() { return this._friction.getX() },
	getFrictionY: function() { return this._friction.getY() },
	getFrictionZ: function() { return this._friction.getZ() },
	getFriction: function() { return Fiesta.vectorLength(this._friction.getVector()); },
	setFrictionX: function(f) {
		if (Fiesta.isNumber(f))
			this._friction.setX(f);
		else
			throw new TypeError(f + " is not a valid X friction");
	},
	setFrictionY: function(f) {
		if (Fiesta.isNumber(f))
			this._friction.setY(f);
		else
			throw new TypeError(f + " is not a valid Y friction");
	},
	setFrictionZ: function(f) {
		if (Fiesta.isNumber(f))
			this._friction.setZ(f);
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
	
	// Each frame
	onFrame: function() {

		// Physics
		var fps = this.getPlayground().getDesiredFPS();
		this.addX(this.getVelocityX() / fps);
		this.addY(this.getVelocityY() / fps);
		this.addZ(this.getVelocityZ() / fps);
		this.addVelocityX(this.getAccelerationX() / fps);
		this.addVelocityY(this.getAccelerationY() / fps);
		this.addVelocityZ(this.getAccelerationZ() / fps);
		if (this.getFrictionX() !== 0) {
			var frictX = this.getFrictionX() / fps;
			if (this.getVelocityX() < 0)
				frictX *= -1;
			if (Math.abs(this.getVelocityX()) > Math.abs(frictX))
				this.addVelocityX(-frictX);
			else
				this.setVelocityX(0);
		}
		if (this.getFrictionY() !== 0) {
			var frictY = this.getFrictionY() / fps;
			if (this.getVelocityY() < 0)
				frictY *= -1;
			if (Math.abs(this.getVelocityY()) > Math.abs(frictY))
				this.addVelocityY(-frictY);
			else
				this.setVelocityY(0);
		}
		if (this.getFrictionZ() !== 0) {
			var frictZ = this.getFrictionZ() / fps;
			if (this.getVelocityZ() < 0)
				frictZ *= -1;
			if (Math.abs(this.getVelocityZ()) > Math.abs(frictZ))
				this.addVelocityZ(-frictZ);
			else
				this.setVelocityZ(0);
		}
		
		// Keep 3D model in sync (if there is one)
		try {
			this.getGraphic().getThreeModel().position.x = this.getX();
			this.getGraphic().getThreeModel().position.y = this.getY();
			this.getGraphic().getThreeModel().position.z = this.getZ();
		} catch (_) {}

	},
	
	// Events (to be overwritten)
	onSpawn: function() {},
	onDestroy: function() {},
	onCollide: function() {}
	
});

// Colliding two solid entities
Fiesta.collideEntities = function(a, b) {
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