describe("Camera 3D", function() {
	
	it("initializes properly", function() {
		var cam = new Fiesta.Camera3D();
		expect(cam.getThreeCamera() instanceof THREE.Camera).toBeTruthy();
	});

	it("sets the X coordinate of itself and its camera", function() {
		var cam = new Fiesta.Camera3D();
		cam.setX(5);
		expect(cam.getX()).toEqual(5);
		expect(cam.getThreeCamera().position.x).toEqual(5);
	});

	it("sets the Y coordinate of itself and its camera", function() {
		var cam = new Fiesta.Camera3D();
		cam.setY(5);
		expect(cam.getY()).toEqual(5);
		expect(cam.getThreeCamera().position.y).toEqual(5);
	});

	it("sets the Z coordinate of itself and its camera", function() {
		var cam = new Fiesta.Camera3D();
		cam.setZ(5);
		expect(cam.getZ()).toEqual(5);
		expect(cam.getThreeCamera().position.z).toEqual(5);
	});

	it("sets the coordinates of itself and its camera", function() {
		var cam = new Fiesta.Camera3D();
		cam.setCoordinates(1, 2, 3);
		expect(cam.getX()).toEqual(1);
		expect(cam.getY()).toEqual(2);
		expect(cam.getZ()).toEqual(3);
		expect(cam.getThreeCamera().position.x).toEqual(1);
		expect(cam.getThreeCamera().position.y).toEqual(2);
		expect(cam.getThreeCamera().position.z).toEqual(3);
	});

	it("sets the coordinates of itself and its camera, if only Y and Z are specified", function() {
		var cam = new Fiesta.Camera3D();
		cam.setCoordinates(undefined, 2, 3);
		expect(cam.getX()).toEqual(Fiesta.DEFAULT_X);
		expect(cam.getY()).toEqual(2);
		expect(cam.getZ()).toEqual(3);
		expect(cam.getThreeCamera().position.x).toEqual(Fiesta.DEFAULT_X);
		expect(cam.getThreeCamera().position.y).toEqual(2);
		expect(cam.getThreeCamera().position.z).toEqual(3);
	});

	it("sets the coordinates of itself and its camera, if only X and Z are specified", function() {
		var cam = new Fiesta.Camera3D();
		cam.setCoordinates(1, undefined, 3);
		expect(cam.getX()).toEqual(1);
		expect(cam.getY()).toEqual(Fiesta.DEFAULT_Y);
		expect(cam.getZ()).toEqual(3);
		expect(cam.getThreeCamera().position.x).toEqual(1);
		expect(cam.getThreeCamera().position.y).toEqual(Fiesta.DEFAULT_Y);
		expect(cam.getThreeCamera().position.z).toEqual(3);
	});

	it("sets the coordinates of itself and its camera, if only X and Y are specified", function() {
		var cam = new Fiesta.Camera3D();
		cam.setCoordinates(1, 2, undefined);
		expect(cam.getX()).toEqual(1);
		expect(cam.getY()).toEqual(2);
		expect(cam.getZ()).toEqual(Fiesta.DEFAULT_Z);
		expect(cam.getThreeCamera().position.x).toEqual(1);
		expect(cam.getThreeCamera().position.y).toEqual(2);
		expect(cam.getThreeCamera().position.z).toEqual(Fiesta.DEFAULT_Z);
	});

	it("adds values to X", function() {
		var cam = new Fiesta.Camera3D();
		cam.addX(5);
		expect(cam.getX()).toEqual(5);
		expect(cam.getThreeCamera().position.x).toEqual(5);
		cam.addX(6);
		expect(cam.getX()).toEqual(11);
		expect(cam.getThreeCamera().position.x).toEqual(11);
	});

	it("adds values to Y", function() {
		var cam = new Fiesta.Camera3D();
		cam.addY(5);
		expect(cam.getY()).toEqual(5);
		expect(cam.getThreeCamera().position.y).toEqual(5);
		cam.addY(6);
		expect(cam.getY()).toEqual(11);
		expect(cam.getThreeCamera().position.y).toEqual(11);
	});

	it("adds values to Z", function() {
		var cam = new Fiesta.Camera3D();
		cam.addZ(5);
		expect(cam.getZ()).toEqual(5);
		expect(cam.getThreeCamera().position.z).toEqual(5);
		cam.addZ(6);
		expect(cam.getZ()).toEqual(11);
		expect(cam.getThreeCamera().position.z).toEqual(11);
	});

});