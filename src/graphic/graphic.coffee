###
	Fiesta.js graphic
	This is a graphic, which knows how to draw itself.

	Requires:
		namespace.coffee
		vector.coffee
		boundary.coffee
###

class Fiesta.Graphic

	# Constructor
	constructor: ->
		@origin = new Fiesta.Vector
