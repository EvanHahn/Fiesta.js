describe("Math API", function() {
	
	it("tells me a number is negative when it's negative", function() {
		expect(Fiesta.sign(-10)).toEqual(-1);
		expect(Fiesta.sign(-1)).toEqual(-1);
		expect(Fiesta.sign(-Infinity)).toEqual(-1);
		expect(Fiesta.sign(-0.000000000000001)).toEqual(-1);
	});
	
	it("tells me a number is positive when it's positive", function() {
		expect(Fiesta.sign(10)).toEqual(1);
		expect(Fiesta.sign(1)).toEqual(1);
		expect(Fiesta.sign(Infinity)).toEqual(1);
		expect(Fiesta.sign(0.000000000000001)).toEqual(1);
	});
	
	it("tells me a number is 0 when it's 0", function() {
		expect(Fiesta.sign(0)).toEqual(0);
	});
	
	it("throws an error if you ask for the sign of a non-number", function() {
		expect(function() {
			Fiesta.sign(false);
		}).toThrow("Cannot find sign of boolean false");
		expect(function() {
			Fiesta.sign("10");
		}).toThrow("Cannot find sign of string 10");
	});
	
	it("wraps a value that doesn't need wrapping", function() {
		expect(Fiesta.wrap(10, 20, 15)).toEqual(15);
	});
	
	it("wraps a value that exceeds the maximum", function() {
		expect(Fiesta.wrap(10, 20, 53)).toEqual(13);
	});
	
	it("wraps a value that is below the minimum", function() {
		expect(Fiesta.wrap(10, 20, -44)).toEqual(16);
	});
	
	it("throws errors when trying to wrap a non-number as a minimum", function() {
		expect(function() {
			Fiesta.wrap("foo", 10, 5);
		}).toThrow("foo is not a valid minimum");
	});
	
	it("throws errors when trying to wrap a non-number as a maximum", function() {
		expect(function() {
			Fiesta.wrap(0, "bar", 5);
		}).toThrow("bar is not a valid maximum");
	});
	
	it("throws errors when trying to wrap a non-number as a value", function() {
		expect(function() {
			Fiesta.wrap(0, 10, "FOO");
		}).toThrow("FOO is not a valid value");
	});
	
	it("wraps degrees when it doesn't need to be wrapped", function() {
		expect(Fiesta.degrees(100)).toEqual(100);
	});
	
	it("wraps degrees when it exceeds 360 degrees", function() {
		expect(Fiesta.degrees(730)).toEqual(10);
	});
	
	it("wraps degrees when it is lower than 0 degrees", function() {
		expect(Fiesta.degrees(-730)).toEqual(350);
	});
	
	it("wraps radians when it doesn't need to be wrapped", function() {
		expect(Fiesta.radians(Math.PI / 4)).toEqual(Math.PI / 4);
	});
	
	it("wraps radians when it exceeds 360 degrees", function() {
		expect(Fiesta.radians(Math.PI * 5)).toEqual(Math.PI);
	});
	
	it("wraps radians when it is lower than 0 degrees", function() {
		expect(Fiesta.radians(Math.PI * -5)).toEqual(Math.PI);
	});
	
});