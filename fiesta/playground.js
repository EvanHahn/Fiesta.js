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
		domElement.appendChild(this._element);
		this.placeTime = Date.now();
		this.frame();
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
		if (object instanceof Fiesta.GameObject) {
			this._gameObjects.push(object);
			object._setPlayground(this);
		}
		else
			throw new TypeError(object + " is not something that can be spawned");
	},
	
	// Destroy an object inside of this playground
	destroy: function(object) {
		if (object instanceof Fiesta.GameObject) {
			var location = this._gameObjects.indexOf(object);
			if (location !== -1)
				this._gameObjects.splice(location, 1);
			else
				throw new Error("Looks like there is no object " + object + " to destroy");
		}
		else
			throw new TypeError(object + " is not something that can be destroyed");
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
	
	// Do this every frame
	frame: function() {
		var thisObject = this;	// Here so the next statement is ok
		setTimeout(function() { thisObject.frame() }, 1000 / this.getFPS());
		if (this._redraw)
			this.getContext().clearRect(0, 0, this._width, this._height);
		for (var i in this._gameObjects) {
			try {
				var obj = this._gameObjects[i];
				obj.onFrame();
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