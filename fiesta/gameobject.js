/*	Game Object
	A game object is pretty much anything. It is not physical;
	that is a Physical Game Object. */

Fiesta.GameObject = new JS.Class({
	
	// Constructor
	initialize: function() {
		this._sprite;
		this._playground;
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
	
	// Get/set playground
	getPlayground: function() {
		if (this._playground)
			return this._playground;
		else
			throw new Error("This object is not yet in a playground");
	},
	_setPlayground: function(p) {
		if (p instanceof Fiesta.Playground)
			this._playground = p;
		else
			throw new TypeError(p + " is not a valid playground");
	},
	
	// Remove me from the playground
	destroy: function() {
		this.getPlayground().destroy(this);
	},
	
	// Events
	onSpawn: function() {},
	onDestroy: function() {},
	onFrame: function() {},
	onDraw: function() {}
	
});