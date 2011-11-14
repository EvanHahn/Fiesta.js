###
	Fiesta.js box
	Can be a square, rectangle, or 3D prism.

	Requires:
		namespace.coffee
		graphic.coffee
		boundary.coffee
###

class Fiesta.Box extends Fiesta.Graphic

	# Constructor
	constructor: (width = 0, height = width, depth = width, @fillStyle = 'rgb(0, 0, 0)') ->
		super
		
		# No Z coordinate? That's fine
		if Fiesta.isString(depth)
			@fillStyle = depth
			depth = 0
		
		@size = new Fiesta.Vector width, height
		@boundary = new Fiesta.Boundary 0, 0, 0, width, height, 0

	# Draw
	draw: (context, position) ->
		context.fillStyle = @fillStyle
		context.fillRect(position.x - @origin.x, position.y - @origin.y, @size.x, @size.y)
