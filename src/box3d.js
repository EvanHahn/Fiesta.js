/*	Fiesta.js box 3D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Box3D = new Fiesta.Class(Fiesta.Graphic3D, {
	
	// Constructor
	initialize: function(xSize, ySize, zSize) {
		this.callSuper();
		
		this._xSize;
		this._ySize;
		this._zSize;
		
		xSize = xSize || Fiesta.DEFAULT_BOX3D_SIZE;
		this.setSize(xSize, ySize, zSize);
		this.setThreeModel(new THREE.Mesh(
			new THREE.CubeGeometry(this._xSize, this._ySize, this._zSize),
			this.getMaterial()
		));
	},
	
	// Size API
	getXSize: function() { return this._xSize },
	getYSize: function() { return this._ySize },
	getZSize: function() { return this._zSize },
	getSize: function() { return [this._xSize, this._ySize, this._zSize] },
	setXSize: function(s) {
		if ((Fiesta.isNumber(s)) && (s >= 0)) {
			this._xSize = s;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(s + " is not a valid X size");
	},
	setYSize: function(s) {
		if ((Fiesta.isNumber(s)) && (s >= 0)) {
			this._ySize = s;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(s + " is not a valid Y size");
	},
	setZSize: function(s) {
		if ((Fiesta.isNumber(s)) && (s >= 0)) {
			this._zSize = s;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(s + " is not a valid Z size");
	},
	setSize: function(xSize, ySize, zSize) {
		if (Fiesta.isUndefined(ySize) && Fiesta.isUndefined(zSize)) {	// Only 1 size = cube
			this.setXSize(xSize);
			this.setYSize(xSize);
			this.setZSize(xSize);
		} else {	// All sizes assigned = rectangular prism
			this.setXSize(xSize);
			this.setYSize(ySize);
			this.setZSize(zSize);
		}
	},
	
	// Get my bounding box
	getBoundingBox: function() {
		if (this._boundingBoxChanged) {
			this._boundingBox = [
				-this.getOriginX(),
				-this.getOriginY(),
				-this.getOriginZ(),
				this.getXSize() - this.getOriginX(),
				this.getYSize() - this.getOriginY(),
				this.getZSize() - this.getOriginZ()
			];
			this._boundingBoxChanged = false;
		}
		return this._boundingBox;
	}
	
});