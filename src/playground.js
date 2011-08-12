/*	Fiesta.js playground
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Playground = new Fiesta.Class(Fiesta.BaseObject, {
	
	// Constructor
	initialize: function(theWidth, theHeight, theContext, framerate) {
		this._entities = [];
		
		this._size = new Fiesta.Vector3();
		this._backgroundColor;
		this._element;
		this._desiredFPS;
		this._context;
		this._redraw;
		this._timePlaced;
		
		this._threeRenderer;
		this._camera3D;
		this._threeScene;
		
		this.setWidth(theWidth || Fiesta.PLAYGROUND_DEFAULT_WIDTH);
		this.setHeight(theHeight || Fiesta.PLAYGROUND_DEFAULT_HEIGHT);
		this.setContext(theContext || Fiesta.PLAYGROUND_DEFAULT_CONTEXT);
		this.setDesiredFPS(framerate || Fiesta.PLAYGROUND_DEFAULT_FPS);
		this.setRedraw(Fiesta.PLAYGROUND_DEFAULT_REDRAW);
	},
	
	// Size API
	getWidth: function() { return this._size.getX() },
	getHeight: function() { return this._size.getY() },
	setWidth: function(w) {
		if ((Fiesta.isNumber(w)) && (w >= 0)) {
			this._size.setX(w);
			if (this._element)
				this._element.setAttribute("width", w);
		}
		else
			throw new TypeError(w + " is not a valid playground width");
	},
	setHeight: function(h) {
		if ((Fiesta.isNumber(h)) && (h >= 0)) {
			this._size.setY(h);
			if (this._element)
				this._element.setAttribute("height", h);
		}
		else
			throw new TypeError(h + " is not a valid playground height");
	},
	setSize: function(w, h) {
		this.setWidth(w);
		this.setHeight(h);
	},
	
	// FPS API
	getDesiredFPS: function() { return this._desiredFPS },
	setDesiredFPS: function(f) {
		if ((Fiesta.isNumber(f)) && (f >= 0))
			this._desiredFPS = f;
		else
			throw new TypeError(f + " is not a valid desired FPS");
	},
	
	// Redraw API
	getRedraw: function() { return this._redraw },
	setRedraw: function(r) {
		if (Fiesta.isBoolean(r))
			this._redraw = r;
		else
			throw new TypeError("Cannot set redrawing to " + r);
	},
	
	// DOM API
	place: function(domElement) {
		if (!domElement)
			domElement = document.body;
		if (!(domElement instanceof HTMLElement))
			throw new TypeError("Playground cannot be placed in " + domElement);
		
		if (this._context === "2d") {
			this._element = document.createElement("canvas");
			this._element.style.overflow = "hidden";
			this._element.setAttribute("width", this.getWidth());
			this._element.setAttribute("height", this.getHeight());
		}
		
		if (this._context === "3d") {
			this._element = this._threeRenderer.domElement;
			this._threeRenderer.setSize(this.getWidth(), this.getHeight());
		}
		
		this._element.setAttribute("class", "fiesta_playground");
		if (this._backgroundColor)
				this._element.style.backgroundColor = this._backgroundColor;
		
		domElement.appendChild(this._element);
		
		this.placeTime = Date.now();
		this.frame();
		
		return this._element;
	},
	domElementExists: function() { return !!this._element },
	getDOMElement: function() {
		if (this._element)
			return this._element;
		else
			throw new Error("This playground is not yet in the DOM, so we can't talk to it");
	},
	getContext: function() { return this._element.getContext(this._context) },
	setContext: function(c) {
		var context = c.toLowerCase();
		if ((Fiesta.isString(context)) && ((context === "2d") || (context === "3d"))) {
			if (context === "3d") {
				if (THREE) {
					this._threeRenderer = new THREE.WebGLRenderer({ antialias: true });
					this._camera3D = new Fiesta.Camera3D();
					this._threeScene = new THREE.Scene();
					this._threeRenderer.setSize(this.getWidth(), this.getHeight());
				} else
					throw new Error("Cannot set context to 3D without three.js");
			}
			this._context = context;
		}
		else
			throw new Error(c + " is not a valid context");
	},
	getTimePlaced: function() { return this._timePlaced || false },
	getBackgroundColor: function() { return this._backgroundColor },
	setBackgroundColor: function(color) {
		if (!Fiesta.isString(color))
			throw new TypeError(color + " is not a valid color");
		this._backgroundColor = color;
		if (this.domElementExists())
			this.getDOMElement().style.backgroundColor = color;
	},
	
	// Object API
	spawn: function(object, x, y, z) {
		if (object instanceof Fiesta.Light3D) {
			this._threeScene.addLight(object.getThreeLight());
			if (Fiesta.isNumber(x))
				object.setX(x);
			if (Fiesta.isNumber(y))
				object.setY(y);
			if (Fiesta.isNumber(z))
				object.setZ(z);
			return;
		}
		if (object instanceof Fiesta.Entity) {
			this._entities.push(object);
			object._setPlayground(this);
			if (Fiesta.isNumber(x))
				object.setX(x);
			if (Fiesta.isNumber(y))
				object.setY(y);
			if (Fiesta.isNumber(z))
				object.setZ(z);
			object.onSpawn();
			if (this._context === "3d") {
				this._threeScene.addChild(object.getGraphic().getThreeModel());
			}
		}
		else
			throw new TypeError(object + " is not something that can be spawned");
	},
	destroy: function(object) {
		if (object instanceof Fiesta.Entity) {
			var location = this._entities.indexOf(object);
			if (location !== -1) {
				this._entities.splice(location, 1);
				object._resetPlayground();
				object.onDestroy();
			} else
				throw new Error("Looks like there is no object " + object + " to destroy");
		}
		else
			throw new TypeError(object + " is not something that can be destroyed");
	},
	objectsAt: function(x, y, z) {
		var undefined;
		if (z === undefined)
			z = 0;
		if ((!Fiesta.isNumber(x)) || (!Fiesta.isNumber(y)) || (!Fiesta.isNumber(z)))
			throw new TypeError("Cannot look for objects at " + x + ", " + y + ", and " + z);
		var objects = [];
		var i = this._entities.length;
		while (i --) {
			if (this._entities[i] instanceof Fiesta.PhysicalEntity) {
				var bound = this._entities[i].getBoundingBox();
				if ((x > bound[0])
					&&
					(x < bound[3])
					&&
					(y > bound[1])
					&&
					(y < bound[4])
					&&
					(z > bound[2])
					&&
					(z < bound[5])) {
					objects.push(this._entities[i]);
				}
			}
		}
		if (objects.length === 0)
			return false;
		return objects;
	},
	
	// 3D API
	getCamera: function() { return this._camera3D },
	
	// Do this every frame
	frame: function() {
		
		// Prepare the next frame
		var thisObject = this;	// So the next statement works
		setTimeout(function() { thisObject.frame() }, 1000 / this.getDesiredFPS());
		
		// Redraw (if I should, of course)
		if (this.getRedraw() && (this._context === "2d"))
			this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());

		// Render 3D
		if (this._context === "3d") {
			try {
				this._threeRenderer.render(this._threeScene, this.getCamera().getThreeCamera());
			} catch (e) { Fiesta.error(e) }
		}
		
		// Deal with every object
		// The pieces are in try/catch blocks so that one object doesn't break
		// everything for everyone else
		var size = this._entities.length;	// This is for a bit later
		var i = size;
		while (i --) {
			
			// Assign a local object variable
			var obj = this._entities[i];
			
			// Draw 2D entities
			if (this._context === "2d") {
				try {
					var graphic = obj.getGraphic();
					if (graphic)
						graphic.draw(this, obj.getX(), obj.getY(), obj.getZ());
				} catch (e) { Fiesta.error(e) }
			}
			
			// Execute each object's onFrame event
			try {
				obj.onFrame();
			} catch (e) { Fiesta.error(e) }
			
			// Collisions
			try {
				if (obj.isSolid()) {
					var objBound = obj.getBoundingBox();
					for (var j = i + 1; j < size; j ++) {
						var obj2 = this._entities[j];
						if (obj2.isSolid()) {
							var obj2Bound = obj2.getBoundingBox();
							if (!(obj2Bound[0] > objBound[3]
								||
								obj2Bound[3] < objBound[0]
								||
								obj2Bound[1] > objBound[4]
								||
								obj2Bound[4] < objBound[1]
								||
								obj2Bound[2] > objBound[5]
								||
								obj2Bound[5] < objBound[2])) {
								Fiesta.collideEntities(obj, obj2);
							}
						}
					}
				}
			} catch (e) { Fiesta.error(e) }
			
		}
	}
	
});
