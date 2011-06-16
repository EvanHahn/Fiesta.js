describe("Browser API", function() {
	
	it("tells me what browser I'm using", function() {
		expect(navigator.userAgent).toContain(Fiesta.getBrowser());
	});
	
	it("tells me the browser's version", function() {
		expect(typeof Fiesta.getBrowserVersion()).toEqual(typeof 1);
	});
	
	it("tells me what OS I'm using", function() {
		var possibilities = ["Windows", "Mac", "iPhone/iPod", "Linux"];
		expect(possibilities).toContain(Fiesta.getOS());
	});
	
});