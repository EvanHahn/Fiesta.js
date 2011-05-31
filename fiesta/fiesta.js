/*	Fiesta.js
	version 0.1
	
	Please enjoy! */

/*	Config variables
	These aim to be user-friendly configuration variables.	*/

// TODO: move some of these out of here (most notably, CONTEXT)
var PLAYGROUND_DEFAULT_WIDTH = 400;
var PLAYGROUND_DEFAULT_HEIGHT = 300;
var PLAYGROUND_DEFAULT_FPS = 60;
if (!CONTEXT)
	var CONTEXT = "2d";

/*	Fiesta namespace */

var Fiesta = {};

/*	Here are all of our classes	*/

JS.require("JS.Class", function() {

	/*	Game Object
		A game object is pretty much anything.	*/
	
	Fiesta.GameObject = new JS.Class({
		
		// Constructor
		initialize: function() {
			this.x;
			this.y;
			this.z;
			this.velocityX;
			this.velocityY;
			this.velocityZ;
			this.accelerationX;
			this.accelerationY;
			this.accelerationZ;
			this.frictionX;
			this.frictionY;
			this.frictionZ;
			this.sprite;
			
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
		
		// Get/set sprite
		getSprite: function() { return this.sprite; },
		setSprite: function(spr) {
			// TODO: check if it's a sprite, throw error if not
				this.sprite = spr;
		},
		
		// Get/set location
		getX: function() { return this.x; },
		getY: function() { return this.y; },
		getZ: function() { return this.z; },
		setX: function(coord) {
			if (typeof coord === typeof 1.0)
				this.x = coord;
			else
				throw new TypeError(coord + " is not a valid X coordinate");
		},
		setY: function(coord) {
			if (typeof coord === typeof 1.0)
				this.y = coord;
			else
				throw new TypeError(coord + " is not a valid Y coordinate");
		},
		setZ: function(coord) {
			if (typeof coord === typeof 1.0)
				this.z = coord;
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
		getVelocityX: function() { return this.velocityX; },
		getVelocityY: function() { return this.velocityY; },
		getVelocityZ: function() { return this.velocityZ; },
		setVelocityX: function(v) {
			if (typeof v === typeof 1.0)
				this.velocityX = v;
			else
				throw new TypeError(v + " is not a valid X velocity");
		},
		setVelocityY: function(v) {
			if (typeof v === typeof 1.0)
				this.velocityY = v;
			else
				throw new TypeError(v + " is not a valid Y velocity");
		},
		setVelocityZ: function(v) {
			if (typeof v === typeof 1.0)
				this.velocityZ = v;
			else
				throw new TypeError(v + " is not a valid Z velocity");
		},
		
		// Get/set acceleration
		getAccelerationX: function() { return this.accelerationX; },
		getAccelerationY: function() { return this.accelerationY; },
		getAccelerationZ: function() { return this.accelerationZ; },
		setAccelerationX: function(a) {
			if (typeof a === typeof 1.0)
				this.accelerationX = a;
			else
				throw new TypeError(a + " is not a valid X acceleration");
		},
		setAccelerationY: function(a) {
			if (typeof a === typeof 1.0)
				this.accelerationY = a;
			else
				throw new TypeError(a + " is not a valid Y acceleration");
		},
		setAccelerationZ: function(a) {
			if (typeof a === typeof 1.0)
				this.accelerationZ = a;
			else
				throw new TypeError(a + " is not a valid Z acceleration");
		},
		
		// Get/set friction
		getFrictionX: function() { return this.frictionX; },
		getFrictionY: function() { return this.frictionY; },
		getFrictionZ: function() { return this.frictionZ; },
		setFrictionX: function(f) {
			if (typeof f === typeof 1.0)
				this.frictionX = f;
			else
				throw new TypeError(f + " is not a valid X friction");
		},
		setFrictionY: function(f) {
			if (typeof f === typeof 1.0)
				this.frictionY = f;
			else
				throw new TypeError(f + " is not a valid Y friction");
		},
		setFrictionZ: function(f) {
			if (typeof f === typeof 1.0)
				this.frictionZ = f;
			else
				throw new TypeError(f + " is not a valid Z friction");
		},
		
		// Events
			// TODO: change these to be more event-driven
		onKeyDown: function(key) {},
		onKeyUp: function(key) {},
		onFrame: function(fps) {
			this.x += this.velocityX / fps;
			this.y += this.velocityY / fps;
			this.z += this.velocityZ / fps;
			this.velocityX += this.accelerationX / fps;
			this.velocityY += this.accelerationY / fps;
			this.velocityZ += this.accelerationZ / fps;
			if (this.frictionX) {
				var frictX = this.frictionX / fps;
				if (this.velocityX < 0)
					frictX = frictX * -1;
				if (Math.abs(this.velocityX) > Math.abs(frictX))
					this.velocityX -= frictX;
				else
					this.velocityX = 0;
			}
			if (this.frictionY) {
				var frictY = this.frictionY / fps;
				if (this.velocityY < 0)
					frictY = frictY * -1;
				if (Math.abs(this.velocityY) > Math.abs(frictY))
					this.velocityY -= frictY;
				else
					this.velocityY = 0;
			}
			if (this.frictionZ) {
				var frictZ = this.frictionZ / fps;
				if (this.velocityZ < 0)
					frictZ = frictZ * -1;
				if (Math.abs(this.velocityZ) > Math.abs(frictZ))
					this.velocityZ -= frictZ;
				else
					this.velocityZ = 0;
			}
		},
		onDraw: function() {}
		
	});
	
	/*	Sprite
		A sprite is an image that can be displayed.	*/
	
	Fiesta.Sprite = new JS.Class({
		
		// Constructor
		initialize: function() {
			this.urls = [];
			this.currentIndex = 0;
			this.animateSpeed = 30;
			this.originX;
			this.originY;
			if (arguments)
				this.setURLs(arguments);
			this.setOrigin(0, 0);
			this.setIndex(0);
		},
		
		// Get/set my origin
		getOriginX: function() { return this.originX; },
		getOriginY: function() { return this.originY; },
		setOriginX: function(coord) {
			if (typeof coord === typeof 1.0)
				this.originX = coord;
			else
				throw new TypeError(coord + " is not a valid X coordinate");
		},
		setOriginY: function(coord) {
			if (typeof coord === typeof 1.0)
				this.originY = coord;
			else
				throw new TypeError(coord + " is not a valid Y coordinate");
		},
		setOrigin: function(xCoord, yCoord) {
			this.setOriginX(xCoord);
			this.setOriginY(yCoord);
		},
		
		// Get/set my sprite URL
		getURLs: function() { return this.urls; },
		setURLs: function() {
			var u = arguments[0];
			if (u.length < 1)
				throw new TypeError("You cannot set sprites to nothing");
			this.urls.length = 0;	// Empty it out
			for (var i in u) {
				if (typeof u[i] === typeof "")
					this.urls[i] = u[i];
				else
					throw new TypeError(u[i] + " is not a valid sprite URL");
			}
			if (this.urls.length > 1)
				this.Animate();
		},
		
		// Get and set which index I'm at, and my animation speed
		Animate: function() {
			this.currentIndex ++;
			if (this.currentIndex >= this.urls.length)
				this.currentIndex = 0;
			var me = this;	// I have to do this for the setTimeout
			setTimeout(function() { me.Animate() }, this.animateSpeed);
		},
		getIndex: function() { return this.currentIndex; },
		setIndex: function(i) {
			if ((typeof i === typeof 1) && ((Math.ceil(i) !== i) || i === 0))
				this.currentIndex = i;
			else
				throw new TypeError(i + " is not a valid index");
		},
		
		// Get my Image() -- this also preloads!
		getImage: function() {
			var img = new Image();
			if (this.urls)
				img.src = this.urls[this.currentIndex];
			return img;
		}
		
	});
	
	/*	Sound
		A sound is...well, a sound.	*/
	
	Fiesta.Sound = new JS.Class({
		
		// Constructor
		initialize: function(sources) {
			this.files = sources;
			this.element;
		},
		
		// Play!
		// I've tried better ways to do this (ie, using HTML5's play() on the
		// existing element), but those don't seem to work as reliably.
		play: function() {
			if (this.element)
				document.getElementsByTagName("body")[0].removeChild(this.element);
			var audio = document.createElement("audio");
			audio.setAttribute("autoplay", "autoplay");
			for (var i in this.files) {
				var source = document.createElement("source");
				source.setAttribute("src", this.files[i]);
				audio.appendChild(source);
			}
			document.getElementsByTagName("body")[0].appendChild(audio);
			this.element = audio;
		}
		
	});
	
	/*	Playground
		A playground is a place where Game Objects are.	*/
	
	Fiesta.Playground = new JS.Class({
		
		// Constructor
		initialize: function(framerate, theWidth, theHeight) {
			this.width;
			this.height;
			this.gameObjects = [];
			this.element;
			this.fps;
			this.frameNumber = 0;
			this.redraw = true;
			if (framerate)
				this.setFPS(framerate);
			else
				this.setFPS(PLAYGROUND_DEFAULT_FPS);
			if (theWidth && theHeight)
				this.setSize(theWidth, theHeight);
			else
				this.setSize(PLAYGROUND_DEFAULT_WIDTH, PLAYGROUND_DEFAULT_HEIGHT);
		},
		
		// Get/set my size
		getWidth: function() { return this.width; },
		getHeight: function() { return this.height; },
		setWidth: function(w) {
			if ((typeof w === typeof 1) && (w >= 0)) {
				this.width = w;
				if (this.element)
					this.element.setAttribute("width", this.width);
			}
			else
				throw new TypeError(w + " is not a valid playground width");
		},
		setHeight: function(h) {
			if ((typeof h === typeof 1) && (h >= 0)) {
				this.height = h;
				if (this.element)
					this.element.setAttribute("height", this.height);
			}
			else
				throw new TypeError(h + " is not a valid playground height");
		},
		setSize: function(w, h) {
			this.setWidth(w);
			this.setHeight(h);
		},
		
		// Get/set my frames per second
		getFPS: function() { return this.fps; },
		setFPS: function(f) {
			if ((typeof f === typeof 1) && (f >= 0) && (Math.round(f) === f)) {
				this.fps = f;
			}
			else
				throw new TypeError(f + " is not a valid framerate");
		},
		
		// Place me inside the DOM; returns HTMLNode that was placed
		place: function(domElement) {
			this.element = document.createElement("canvas");
			this.element.setAttribute("class", "fiesta_playground");
			this.element.style.overflow = "hidden";
			this.element.setAttribute("width", this.width);
			this.element.setAttribute("height", this.height);
			var me = this; // here so next statement works
			document.onkeydown = function(key) { me.onKeyDown(key); };
			document.onkeyup = function(key) { me.onKeyUp(key); };
			domElement.appendChild(this.element);
			return this.element;
		},
		
		// Interact with DOM element
		domElementExists: function() {
			if (this.element)
				return true;
			else
				return false;
		},
		getDOMElement: function() {
			if (this.element)
				return this.element;
			else
				throw new Error("This playground is not yet in the DOM, so we can't talk to it");
		},
		getContext: function() {
			return this.element.getContext(CONTEXT);
		},
		
		// Spawn a game object inside of this playground
		spawn: function(object) {
			// TODO: make sure it's a game object
			this.gameObjects.push(object);
		},
		
		// Draw a sprite on this playground
		drawSprite: function(sprite, xCoord, yCoord, spriteWidth, spriteHeight) {
			// Check that everything is ok
			if (!this.domElementExists())
				throw new TypeError("Cannot draw a sprite on a non-existant canvas");
				// TODO: make sure it's a sprite
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
			for (var i in this.gameObjects) {
				this.gameObjects[i].onKeyDown(key);
			}
		},
		onKeyUp: function(key) {
			for (var i in this.gameObjects) {
				this.gameObjects[i].onKeyUp(key);
			}
		},
		
		// Do this every frame
		frame: function() {
			var thisObject = this;	// Here so the next statement is ok
			setTimeout(function() { thisObject.frame() }, 1000 / this.getFPS());
			if (this.redraw)
				this.getContext().clearRect(0, 0, this.width, this.height);
			for (var i in this.gameObjects) {
				var obj = this.gameObjects[i];
				obj.onFrame(this.getFPS());
				var spr = obj.getSprite();
				var img = spr.getImage();
				this.drawSprite(spr, obj.getX(), obj.getY(), img.width, img.height);
				obj.onDraw();
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
Fiesta.guids = [];
Fiesta.guid = function() {
	var guid = Math.floor(Math.random() * Date.now());
	for (var i in this.guids) {
		if (this.guids[i] === guid)
			return this.guid();	// Start over
	}
	this.guids.push(guid);
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

// Convert rotation measurements
Fiesta.degreesToRadians = function(d) { return (d * Math.PI) / 180; };
Fiesta.radiansToDegrees = function(r) { return (r * 180) / Math.pi; };

// Distances between points (2 and 3 dimensions)
Fiesta.pointDistance2D = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x1 - x2),2) + Math.pow(y1 - y2,2));
};
Fiesta.pointDistance3D = function(x1, y1, z1, x2, y2, z2) {
	// TODO
};