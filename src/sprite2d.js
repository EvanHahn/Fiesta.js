/*	Fiesta.js sprite 2D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Sprite2D = new Fiesta.Class(Fiesta.Graphic2D, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._urls = [];
		this._currentIndex = Fiesta.DEFAULT_SPRITE_STARTING_INDEX;
		this._animateSpeed = Fiesta.DEFAULT_SPRITE_ANIMATE_SPEED;
		
		if (arguments)
			this.setURLs(arguments);
		this.setIndex(0);
	},
	
	// Sprite URL(s) API
	getURLs: function() { return this._urls; },
	setURLs: function() {
		var u = arguments[0];
		if (u.length < 1)
			throw new TypeError("You cannot set sprites to nothing");
		this._urls.length = 0;	// Empty it out
		var i = u.length;
		while (i --) {
			if (Fiesta.isString(u[i])) {
				this._urls[i] = u[i];
				var img = new Image();	// Preloadin'
				img.src = u[i];
			}
			else
				throw new TypeError(u[i] + " is not a valid sprite URL");
		}
		if (this._urls.length > 1)
			this.animate();
		this._boundingBoxChanged = true;
	},
	
	// Animation API
	animate: function() {
		this._currentIndex += Fiesta.sign(this._animateSpeed);	// Forward/backwards animation
		if (this._currentIndex >= this._urls.length)
			this._currentIndex = 0;
		var me = this;	// I have to do this for the setTimeout
		if (this._animateSpeed > 0) {
			if (this._urls.length)
				this._boundingBoxChanged = true;
			setTimeout(function() { me.animate() }, Math.abs(this._animateSpeed));
		}
	},
	getIndex: function() { return this._currentIndex; },
	setIndex: function(i) {
		if (Fiesta.isInteger(i)) {
			if (i < this._urls.length)
				this._currentIndex = i;
			else {
				setIndex(i - this._urls.length);
				Fiesta.warn("Tried to set Sprite index to " + i + ", but the max is " + (this._urls.length - 1) + "; was able to wrap around.");
			}
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(i + " is not a valid index");
	},
	getAnimateSpeed: function() { return this._animateSpeed; },
	setAnimateSpeed: function(a) {
		if (Fiesta.isNumber(a))
			this._animateSpeed = a;
		else
			throw new TypeError(a + " is not a valid animation speed");
	},
	stopAnimation: function() { this._animateSpeed = 0; },
	
	// Get my Image() (this also preloads)
	getImage: function() {
		var img = new Image();
		if (this._urls)
			img.src = this._urls[this._currentIndex];
		return img;
	},
	getWidth: function() { return this.getImage().width },
	getHeight: function() { return this.getImage().height },
	
	// Draw me
	draw: function(playground, xCoord, yCoord, zCoord) {
		if (!(playground instanceof Fiesta.Playground))
			throw new TypeError(playground + " is not a playground that I can draw sprites on");
		if (!Fiesta.isNumber(xCoord))
			throw new TypeError(xCoord + " is not a valid X coordinate");
		if (!Fiesta.isNumber(yCoord))
			throw new TypeError(yCoord + " is not a valid Y coordinate");
		var image = this.getImage();
		var spriteWidth = image.width;
		var spriteHeight = image.height;
		var context = playground.getContext();
		context.drawImage(image, xCoord - this.getOriginX(), yCoord - this.getOriginY(), spriteWidth, spriteHeight);	
	},
	
	// Get my bounding box
	getBoundingBox: function() {
		if (this._boundingBoxChanged) {
			this._boundingBox[0] = -this.getOriginX();
			this._boundingBox[1] = -this.getOriginY();
			this._boundingBox[2] = -Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2;
			this._boundingBox[3] = this._boundingBox[0] + this.getWidth();
			this._boundingBox[4] = this._boundingBox[1] + this.getHeight();
			this._boundingBox[5] = this._boundingBox[2] + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
			this._boundingBoxChanged = false;
		}
		return this._boundingBox;
	}
	
});
