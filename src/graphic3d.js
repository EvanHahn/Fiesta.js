/*	Fiesta.js 3D graphic
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Graphic3D = new Fiesta.Class(Fiesta.Graphic, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._threeModel;
		this._material;
		
		this.setMaterial(Fiesta.DEFAULT_3D_MATERIAL);
	},
	
	// Model API
	getThreeModel: function() { return this._threeModel },
	setThreeModel: function(m) {
		this._threeModel = m;
	},
	
	// Material API
	getMaterial: function() { return this._material },
	setMaterial: function(m) {
		this._material = m;	
	},
	setColor: function(c) {
		this.setMaterial(new THREE.MeshLambertMaterial({
			color: c
		}));
	}
	
});