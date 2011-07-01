describe("Browser API", function() {
	
	it("tells me what browser I'm using", function() {
		expect(Fiesta.isString(navigator.userAgent)).toBeTruthy();
	});
	
	it("tells me the browser's version", function() {
		expect(Fiesta.isNumber(Fiesta.getBrowserVersion())).toBeTruthy();
	});
	
	it("tells me what OS I'm using", function() {
		var possibilities = ["Windows", "Mac", "iPhone/iPod", "Linux"];
		expect(possibilities).toContain(Fiesta.getOS());
	});
	
	it("calculates the pixels per inch", function() {
		expect(Fiesta.isNumber(Fiesta.calculatePPI())).toBeTruthy();
	});
	
	it("calculates the same PPI value always", function() {
		var calculated = Fiesta.calculatePPI();
		expect(Fiesta.getPPI()).toEqual(calculated);
		expect(Fiesta.getPPI()).toEqual(calculated);
	});
	
	it("checks support", function() {
		expect(Fiesta.isBoolean(Fiesta.checkSupport())).toBeTruthy();
	});
	
	// No tests for logs/warnings/errors
	
});