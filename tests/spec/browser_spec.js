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
	
});