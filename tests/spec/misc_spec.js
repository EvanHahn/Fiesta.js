describe("Misc. functions", function() {

	it("tells you if a string contains another (if it's there)", function() {
     	var a = "Hello world!";
		var b = "world";
		expect(Fiesta.contains(a, b)).toBeTruthy();
	});

	it("tells you if a string contains another (if it's not there)", function() {
		var a = "Hello world!";
		var b = "cake";
		expect(Fiesta.contains(a, b)).toBeFalsy();
	});

	it("tells you if an array contains a value (if it's there)", function() {
		var a = [1, 2, 3];
		var b = 2;
		expect(Fiesta.contains(a, b)).toBeTruthy();
	});

	it("tells you if an array contains a value (if it's not there)", function() {
		var a = [1, 2, 3];
		var b = 4;
		expect(Fiesta.contains(a, b)).toBeFalsy();
	});

	it("gets the file extension from a simple filename (when there is one)", function() {
		expect(Fiesta.getFileExtension("hello.ogg")).toEqual("ogg");
	});

	it("gets the file extension from a weird-caps filename (when there is one)", function() {
		expect(Fiesta.getFileExtension("hello.OgG")).toEqual("ogg");
	});

	it("gets the file extension from a more complex filename (when there is one)", function() {
		expect(Fiesta.getFileExtension("hello. world..ogg")).toEqual("ogg");
	});

	it("gets no file extension from a filename when there isn't one", function() {
		expect(Fiesta.getFileExtension("hello")).toEqual("");
	});

});