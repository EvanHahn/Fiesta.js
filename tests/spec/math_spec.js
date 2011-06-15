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
	
});