/*	Fiesta.js 2D graphic
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Graphic2D = new Fiesta.Class(Fiesta.Graphic, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
	},
	
	// "Abstract" draw function
	draw: function() { throw new Error("This 2D graphic must know how to draw itself") }
	
});