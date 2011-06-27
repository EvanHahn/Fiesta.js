/*	Fiesta.js camera 3D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Camera3D = new Fiesta.Class(Fiesta.LocatableEntity, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._viewAngle = 70;	// this is temporary
		this._aspect = 4 / 3;
		this._near = 1;
		this._far = 1000;
		
		this._threeCamera = new THREE.Camera(this._viewAngle, this._aspect, this._near, this._far);
		
		this._threeCamera.position.x = 300;
		this._threeCamera.position.z = 300;	// this is temporary
	},
	
	// THREE API
	getThreeCamera: function() { return this._threeCamera }
	
});