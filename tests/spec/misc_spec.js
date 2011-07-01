describe("Misc. functions", function() {

	it("checks if a primitive value is a number (when it is)", function() {
		var x = 5;
		expect(Fiesta.isNumber(x)).toBeTruthy();
	});

	it("checks if a primitive value is a number (when it isn't)", function() {
		var x = "5";
		expect(Fiesta.isNumber(x)).toBeFalsy();
	});

	it("checks if a Number object is a number (when it is)", function() {
		var x = new Number(5);
		expect(Fiesta.isNumber(x)).toBeTruthy();
	});

	it("checks if an object is a number (when it isn't one)", function() {
		var x = new String("5");
		expect(Fiesta.isNumber(x)).toBeFalsy();
	});

	it("checks if a primitive value is an integer (when it is)", function() {
		var x = 5;
		expect(Fiesta.isInteger(x)).toBeTruthy();
	});

	it("checks if a primitive value is an integer (when it isn't)", function() {
		var x = 5.5;
		expect(Fiesta.isInteger(x)).toBeFalsy();
	});

	it("checks if a Number is an integer (when it is)", function() {
		var x = new Number(5);
		expect(Fiesta.isInteger(x)).toBeTruthy();
	});

	it("checks if a Number is an integer (when it isn't)", function() {
		var x = new Number(5.5);
		expect(Fiesta.isInteger(x)).toBeFalsy();
	});

	it("checks if a non-number is an integer", function() {
		var x = "5";
		expect(Fiesta.isInteger(x)).toBeFalsy();
	});

	it("checks if a primitive value is a boolean (when it is)", function() {
		var x = true;
		expect(Fiesta.isBoolean(x)).toBeTruthy();
	});

	it("checks if a primitive value is a boolean (when it isn't)", function() {
		var x = "true";
		expect(Fiesta.isBoolean(x)).toBeFalsy();
	});

	it("checks if a Boolean object is a boolean (when it is)", function() {
		var x = new Boolean(true);
		expect(Fiesta.isBoolean(x)).toBeTruthy();
	});

	it("checks if an object is a boolean (when it isn't one)", function() {
		var x = new String("true");
		expect(Fiesta.isBoolean(x)).toBeFalsy();
	});
	
	it("checks if a primitive array is an array (when it is)", function() {
		var x = [1, 2, 3];
		expect(Fiesta.isArray(x)).toBeTruthy();
	});

	it("checks if a primitive array is an array (when it isn't)", function() {
		var x = "123";
		expect(Fiesta.isArray(x)).toBeFalsy();
	});

	it("checks if an Array object is an array (when it is)", function() {
		var x = new Array(1, 2, 3);
		expect(Fiesta.isArray(x)).toBeTruthy();
	});

	it("checks if an object is an array (when it isn't one)", function() {
		var x = new String("123");
		expect(Fiesta.isArray(x)).toBeFalsy();
	});
	
	it("checks if something is undefined (when it is)", function() {
		var x;
		expect(Fiesta.isUndefined(x)).toBeTruthy();
	});

	it("checks if something is undefined (when it is), even if undefined is re-defined", function() {
		undefined = 1;
		var x;
		expect(Fiesta.isUndefined(x)).toBeTruthy();
		undefined = void(0);
	});
	
	it("checks if something is undefined (when it isn't)", function() {
		var x = "undefined";
		expect(Fiesta.isUndefined(x)).toBeFalsy();
	});
	
	it("creates undefined", function() {
		undefined = 1;
		var x;
		expect(Fiesta.makeUndefined()).toEqual(x);
		undefined = x;
	});

	it("creates NaN", function() {
		var oldNaN = NaN;
		expect(isNaN(Fiesta.makeNaN())).toBeTruthy();
		NaN = oldNaN;
	});

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