describe("Vector", function() {

	it("initializes properly with no arguments", function() {
		var vector = new Fiesta.Vector3();
		expect(vector.getVector()).toEqual([,,,]);
	});

	it("initializes properly with arguments", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getVector()).toEqual([1, 2, 3]);
	});

	it("gets X", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getX()).toEqual(1);
	});

	it("gets Y", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getY()).toEqual(2);
	});

	it("gets Z", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getZ()).toEqual(3);
	});

	it("gets all coordinates", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getVector()).toEqual([1, 2, 3]);
	});

	it("sets X", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getX()).toEqual(1);
		vector.setX(10);
		expect(vector.getX()).toEqual(10);
	});

	it("sets Y", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getY()).toEqual(2);
		vector.setY(10);
		expect(vector.getY()).toEqual(10);
	});

	it("sets Z", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getZ()).toEqual(3);
		vector.setZ(10);
		expect(vector.getZ()).toEqual(10);
	});

	it("sets all coordinates with numbers as arguments", function() {
		var vector = new Fiesta.Vector3(1, 2, 3);
		expect(vector.getVector()).toEqual([1, 2, 3]);
		vector.setVector(4, 5, 6);
		expect(vector.getVector()).toEqual([4, 5, 6]);
	});

});
