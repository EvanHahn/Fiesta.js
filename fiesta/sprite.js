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
		for (var i = 0; i < u.length; i ++) {
			if (typeof u[i] === typeof "")
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
		if (this._animateSpeed > 0)
			setTimeout(function() { me.animate() }, this._animateSpeed);
	},
	getIndex: function() { return this._currentIndex; },
	setIndex: function(i) {
		if ((typeof i === typeof 1) && (i < this._urls.length) && ((Math.ceil(i) !== i) || i === 0))
			this._currentIndex = i;
		else
			throw new TypeError(i + " is not a valid index");
	},
	getAnimateSpeed: function() { return this._animationSpeed; },
	setAnimateSpeed: function(a) {
		if ((typeof a !== typeof 1.0) && (a >= 0))
			this._animationSpeed = a;
		else
			throw new TypeError(a + " is not a valid animation speed");
	},
	stopAnimation: function() { this._animationSpeed = 0; },
	
	// Get my Image() -- this also preloads!
	getImage: function() {
		var img = new Image();
		if (this._urls)
			img.src = this._urls[this._currentIndex];
		return img;
	}
	
});
