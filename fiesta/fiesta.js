/*	Fiesta.js
	version 0.1
	
	Please enjoy! */

var Fiesta = {};

/*	Config variables
	These aim to be user-friendly configuration variables.	*/

Fiesta.PLAYGROUND_DEFAULT_WIDTH = 400;
Fiesta.PLAYGROUND_DEFAULT_HEIGHT = 300;
Fiesta.PLAYGROUND_DEFAULT_FPS = 60;
Fiesta.PLAYGROUND_DEFAULT_CONTEXT = "2d";

/*	Fiesta namespace */

/*	Here are all of our classes	*/

JS.require("JS.Class", function() {

	/*	Game Object
		A game object is pretty much anything. It is not physical;
		that is a Physical Game Object. */
	
	Fiesta.GameObject = new JS.Class({
		
		// Constructor
		initialize: function() {
			this._sprite;
		},
		
		// Get/set sprite
		getSprite: function() { return this._sprite; },
		setSprite: function(spr) {
			if (spr instanceof Fiesta.Sprite)
				this._sprite = spr;
			else if ((spr instanceof Image) && (spr.src))
				this._sprite = new Fiesta.Sprite(spr.src);
			else if (typeof spr === typeof "")
				this._sprite = new Fiesta.Sprite(spr);
			else
				throw new TypeError(spr + " is not a sprite (nor something I can turn into one)");
		},
		
		// Events
			// TODO: change these to be more event-driven
		onKeyDown: function(key) {},
		onKeyUp: function(key) {},
		onFrame: function(fps) {},
		onDraw: function() {}
		
	});
	
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
		
		// Physics
		onFrame: function(fps) {
			this._x += this._velocityX / fps;
			this._y += this._velocityY / fps;
			this._z += this._velocityZ / fps;
			this._velocityX += this._accelerationX / fps;
			this._velocityY += this._accelerationY / fps;
			this._velocityZ += this._accelerationZ / fps;
			if (this._frictionX) {
				var frictX = this._frictionX / fps;
				if (this._velocityX < 0)
					frictX = frictX * -1;
				if (Math.abs(this._velocityX) > Math.abs(frictX))
					this._velocityX -= frictX;
				else
					this._velocityX = 0;
			}
			if (this._frictionY) {
				var frictY = this._frictionY / fps;
				if (this._velocityY < 0)
					frictY = frictY * -1;
				if (Math.abs(this._velocityY) > Math.abs(frictY))
					this._velocityY -= frictY;
				else
					this._velocityY = 0;
			}
			if (this._frictionZ) {
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
	
	/*	Sprite
		A sprite is an image that can be displayed.	*/
	
	Fiesta.Sprite = new JS.Class({
		
		// Constructor
		initialize: function() {
			this._urls = [];
			this._currentIndex = 0;
			this._animateSpeed = 30;
			this._originX;
			this._originY;
			if (arguments)
				this.setURLs(arguments);
			this.setOrigin(0, 0);
			this.setIndex(0);
		},
		
		// Get/set my origin
		getOriginX: function() { return this._originX; },
		getOriginY: function() { return this._originY; },
		setOriginX: function(coord) {
			if (typeof coord === typeof 1.0)
				this._originX = coord;
			else
				throw new TypeError(coord + " is not a valid X coordinate");
		},
		setOriginY: function(coord) {
			if (typeof coord === typeof 1.0)
				this._originY = coord;
			else
				throw new TypeError(coord + " is not a valid Y coordinate");
		},
		setOrigin: function(xCoord, yCoord) {
			this.setOriginX(xCoord);
			this.setOriginY(yCoord);
		},
		
		// Get/set my sprite URL
		getURLs: function() { return this._urls; },
		setURLs: function() {
			var u = arguments[0];
			if (u.length < 1)
				throw new TypeError("You cannot set sprites to nothing");
			this._urls.length = 0;	// Empty it out
			for (var i in u) {
				if (typeof u[i] === typeof "")	// TODO: check file extension
					this._urls[i] = u[i];
				else
					throw new TypeError(u[i] + " is not a valid sprite URL");
			}
			if (this._urls.length > 1)
				this.animate();
		},
		
		// Get and set which index I'm at, and my animation speed
		animate: function() {
			this._currentIndex ++;
			if (this._currentIndex >= this._urls.length)
				this._currentIndex = 0;
			var me = this;	// I have to do this for the setTimeout
			setTimeout(function() { me.animate() }, this._animateSpeed);
		},
		getIndex: function() { return this._currentIndex; },
		setIndex: function(i) {
			if ((typeof i === typeof 1) && ((Math.ceil(i) !== i) || i === 0))
				this._currentIndex = i;
			else
				throw new TypeError(i + " is not a valid index");
		},
		
		// Get my Image() -- this also preloads!
		getImage: function() {
			var img = new Image();
			if (this._urls)
				img.src = this._urls[this._currentIndex];
			return img;
		}
		
	});
	
	/*	Sound
		A sound is...well, a sound.	*/
	
	Fiesta.Sound = new JS.Class({
		
		// Constructor
		initialize: function(sources) {
			this._files = [];
			this._element;
			
			this.setFiles(sources);
		},
		
		// Set the sources
		setFiles: function(sources) {
			if (typeof sources === typeof "") {
				if (Fiesta.getFileExtension(sources) === "")
				{
					var soundExtensions = ["ogg", "wav", "mp3"];
					for (var i in soundExtensions)
						this._files.push(sources + "." + soundExtensions[i]);
				} else
					this._files = [sources];
			}
			else if (typeof sources === typeof [])
				this._files = sources;
			else
				throw new Error(sources + " isn't something I can make a sound out of.");
		},
		
		// Play!
		// I've tried better ways to do this (ie, using HTML5's play() on the
		// existing element), but those don't seem to work as reliably.
		play: function() {
			if (this._element)
				document.getElementsByTagName("body")[0].removeChild(this._element);
			var audio = document.createElement("audio");
			audio.setAttribute("autoplay", "autoplay");
			for (var i in this._files) {
				var source = document.createElement("source");
				source.setAttribute("src", this._files[i]);
				audio.appendChild(source);
			}
			document.getElementsByTagName("body")[0].appendChild(audio);
			this._element = audio;
		}
		
	});
	
	/*	Playground
		A playground is a place where Game Objects are.	*/
	
	Fiesta.Playground = new JS.Class({
		
		// Constructor
		initialize: function(theWidth, theHeight, theContext, framerate) {
			this._width;
			this._height;
			this._gameObjects = [];
			this._element;
			this._fps;
			this._context;
			this._redraw = true;
			this._timePlaced;
			if (theContext)
				this.setContext(theContext);
			else
				this.setContext(Fiesta.PLAYGROUND_DEFAULT_CONTEXT);
			if (framerate)
				this.setFPS(framerate);
			else
				this.setFPS(Fiesta.PLAYGROUND_DEFAULT_FPS);
			if (theWidth && theHeight)
				this.setSize(theWidth, theHeight);
			else
				this.setSize(Fiesta.PLAYGROUND_DEFAULT_WIDTH, Fiesta.PLAYGROUND_DEFAULT_HEIGHT);
		},
		
		// Get/set my size
		getWidth: function() { return this._width; },
		getHeight: function() { return this._height; },
		setWidth: function(w) {
			if ((typeof w === typeof 1) && (w >= 0)) {
				this._width = w;
				if (this._element)
					this._element.setAttribute("width", this._width);
			}
			else
				throw new TypeError(w + " is not a valid playground width");
		},
		setHeight: function(h) {
			if ((typeof h === typeof 1) && (h >= 0)) {
				this._height = h;
				if (this._element)
					this._element.setAttribute("height", this._height);
			}
			else
				throw new TypeError(h + " is not a valid playground height");
		},
		setSize: function(w, h) {
			this.setWidth(w);
			this.setHeight(h);
		},
		
		// Get/set my frames per second
		getFPS: function() { return this._fps; },
		setFPS: function(f) {
			if ((typeof f === typeof 1) && (f >= 0) && (Math.round(f) === f)) {
				this._fps = f;
			}
			else
				throw new TypeError(f + " is not a valid framerate");
		},
		
		// Place me inside the DOM; returns HTMLNode that was placed
		place: function(domElement) {
			this._element = document.createElement("canvas");
			this._element.setAttribute("class", "fiesta_playground");
			this._element.style.overflow = "hidden";
			this._element.setAttribute("width", this._width);
			this._element.setAttribute("height", this._height);
			var me = this; // here so next statement works
			document.onkeydown = function(key) { me.onKeyDown(key); };
			document.onkeyup = function(key) { me.onKeyUp(key); };
			domElement.appendChild(this._element);
			this.placeTime = Date.now();
			return this._element;
		},
		
		// Interact with DOM element
		domElementExists: function() {
			if (this._element)
				return true;
			else
				return false;
		},
		getDOMElement: function() {
			if (this._element)
				return this._element;
			else
				throw new Error("This playground is not yet in the DOM, so we can't talk to it");
		},
		getContext: function() {
			return this._element.getContext(this._context);
		},
		setContext: function(c) {
			if ((c == "2d") || (c === "3d"))
				this._context = c;
			else
				throw new Error(c + " is not a valid context");
		},
		getTimePlaced: function() {
			if (this._timePlaced)
				return this._timePlaced;
			else
				throw new Error("This playground has not yet been placed.");
		},
		
		// Spawn a game object inside of this playground
		spawn: function(object) {
			if (object instanceof Fiesta.GameObject)
				this._gameObjects.push(object);
			else
				throw new TypeError(object + " is not something that can be spawned");
		},
		
		// Draw a sprite on this playground
		drawSprite: function(sprite, xCoord, yCoord, spriteWidth, spriteHeight) {
			// Check that everything is ok
			if (!this.domElementExists())
				throw new TypeError("Cannot draw a sprite on a non-existant canvas");
			if (!(sprite instanceof Fiesta.Sprite))
				throw new TypeError(sprite + " is not a sprite");
			if (typeof xCoord !== typeof 1.0)
				throw new TypeError(xCoord + " is not a valid X coordinate");
			if (typeof yCoord !== typeof 1.0)
				throw new TypeError(yCoord + " is not a valid Y coordinate");
			// Let's make this happen
			var image = sprite.getImage();
			if (!spriteWidth)
				spriteWidth = image.width;
			if (!spriteHeight)
				spriteHeight = image.height;
			var context = this.getContext();
			context.drawImage(image, xCoord - sprite.getOriginX(), yCoord - sprite.getOriginY(), spriteWidth, spriteHeight);
		},
		
		// Events
		onKeyDown: function(key) {
			for (var i in this._gameObjects) {
				this._gameObjects[i].onKeyDown(key);
			}
		},
		onKeyUp: function(key) {
			for (var i in this._gameObjects) {
				this._gameObjects[i].onKeyUp(key);
			}
		},
		
		// Do this every frame
		frame: function() {
			var thisObject = this;	// Here so the next statement is ok
			setTimeout(function() { thisObject.frame() }, 1000 / this.getFPS());
			if (this._redraw)
				this.getContext().clearRect(0, 0, this._width, this._height);
			for (var i in this._gameObjects) {
				try {
					var obj = this._gameObjects[i];
					obj.onFrame(this.getFPS());
					var spr = obj.getSprite();
					var img = spr.getImage();
					this.drawSprite(spr, obj.getX(), obj.getY(), img.width, img.height);
					obj.onDraw();
				} catch (e) {
					console.error(e);
				}
			}
		}
		
	});

});

/*	General-purpose functions	*/

// Does my browser support Fiesta?
	// TODO: audio
	// TODO: test this
Fiesta.checkSupport = function() {
	var canvas = !!document.createElement("canvas").getContext;
	var audio = true;
	return (canvas && audio);
};

// Make a GUID
Fiesta._guids = [];
Fiesta.guid = function() {
	var guid = Math.floor(Math.random() * Date.now());
	for (var i in this._guids) {
		if (this._guids[i] === guid)
			return this.guid();	// Start over
	}
	this._guids.push(guid);
	return guid;
};

// Preload sprites (given a bunch of sprites)
Fiesta.preloadSprites = function() {
	if (arguments.length > 1) {
		var preloader = new Image();
		for (var i in arguments) {
			var urls = arguments[i].getURLs();
			for (var j in urls)
				preloader.src = urls[j];
		}
	}
	else
	{
		arguments[0].getImage();
	}
};

// Get the file extension
Fiesta.getFileExtension = function(filename) {
	var extension = filename.split(".").pop();
	if (extension === filename)	// No extension
		return "";
	else
		return extension;
};

// Convert rotation measurements
Fiesta.degreesToRadians = function(d) { return (d * Math.PI) / 180; };
Fiesta.radiansToDegrees = function(r) { return (r * 180) / Math.pi; };

// Distances between points (2 and 3 dimensions)
Fiesta.pointDistance2D = function(x1, y1, x2, y2) { return Fiesta.pointDistance3D(x1, y1, 0, x2, y2, 0); };
Fiesta.pointDistance3D = function(x1, y1, z1, x2, y2, z2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)); };