describe("Box 3D", function() {

	it("should initialize properly with no arguments", function() {
		var box = new Fiesta.Box3D();
		expect(box.getSize()).toEqual([Fiesta.DEFAULT_BOX3D_SIZE, Fiesta.DEFAULT_BOX3D_SIZE, Fiesta.DEFAULT_BOX3D_SIZE]);
	});

	it("should initialize properly with 1 argument", function() {
		var box = new Fiesta.Box3D(1);
		expect(box.getSize()).toEqual([1, 1, 1]);
	});

	it("should initialize properly with 3 arguments", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getSize()).toEqual([1, 2, 3]);
	});

	it("gets the X size", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getXSize()).toEqual(1);
	});

	it("gets the Y size", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getYSize()).toEqual(2);
	});

	it("gets the Z size", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getZSize()).toEqual(3);
	});

	it("gets all the sizes as an array", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getSize()).toEqual([1, 2, 3]);
	});

	it("sets the X size", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getXSize()).toEqual(1);
		box.setXSize(5);
		expect(box.getXSize()).toEqual(5);
	});

	it("sets the Y size", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getYSize()).toEqual(2);
		box.setYSize(5);
		expect(box.getYSize()).toEqual(5);
	});

	it("sets the Z size", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getZSize()).toEqual(3);
		box.setZSize(5);
		expect(box.getZSize()).toEqual(5);
	});
	
	it("makes a cube if you only specify one dimension", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getSize()).toEqual([1, 2, 3]);
		box.setSize(5);
		expect(box.getSize()).toEqual([5, 5, 5]);
	});

	it("sets all the sizes differently", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getSize()).toEqual([1, 2, 3]);
		box.setSize(4, 5, 6);
		expect(box.getSize()).toEqual([4, 5, 6]);
	});
	
	it("throws an error if you don't set X to a number", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getXSize()).toEqual(1);
		expect(function() {
			box.setXSize("foo");
		}).toThrow(new TypeError("foo is not a valid X size"));
		expect(box.getXSize()).toEqual(1);
	});

	it("throws an error if you don't set Y to a number", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getYSize()).toEqual(2);
		expect(function() {
			box.setYSize("foo");
		}).toThrow(new TypeError("foo is not a valid Y size"));
		expect(box.getYSize()).toEqual(2);
	});

	it("throws an error if you don't set Z to a number", function() {
		var box = new Fiesta.Box3D(1, 2, 3);
		expect(box.getZSize()).toEqual(3);
		expect(function() {
			box.setZSize("foo");
		}).toThrow(new TypeError("foo is not a valid Z size"));
		expect(box.getZSize()).toEqual(3);
	});
	
	it("gets the bounding box with no origin", function() {
		var box = new Fiesta.Box3D(10);
		expect(box.getBoundingBox()).toEqual([0, 0, 0, 10, 10, 10]);
	});

	it("gets the bounding box with an origin", function() {
		var box = new Fiesta.Box3D(10);
		box.setOrigin(2, 3, 4);
		expect(box.getBoundingBox()).toEqual([-2, -3, -4, 8, 7, 6]);
	});
	
});