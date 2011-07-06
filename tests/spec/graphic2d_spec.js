describe("2D graphic", function() {

	it("throws an error if you don't implement a draw() method", function() {
		var GFX = new Fiesta.Class(Fiesta.Graphic2D, {
			initialize: function() {
				this.callSuper();
			}
		});
		var gfx = new GFX();
		expect(function() {
			gfx.draw()
		}).toThrow("This 2D graphic must know how to draw itself");
	});

});