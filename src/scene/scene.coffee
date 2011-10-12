###
	Fiesta.js scenes
	Scenes are where games happen. Each level could be a different scene.

	Requires:
		namespace.coffee
		vector.coffee
###

class Fiesta.Scene

	# Constructor
	constructor: (width = 400, height = 300, @context = '2d', @targetFramerate = 60) ->
		@size = new Fiesta.Vector width, height
		@entities = []

	# Place the scene
	place: (parentElement = window.document.body) ->

		# Ready the DOM element (depends on context)
		if @context is '2d'
			@domElement = window.document.createElement 'canvas'
			@domElement.style.overflow = 'hidden'
			@domElement.setAttribute 'width', @size.x
			@domElement.setAttribute 'height', @size.y
		else if @context is '3d'
			throw new Error '3D not finished'
		else
			throw new Error 'Context not assigned properly'

		# Place the DOM element
		parentElement.appendChild @domElement

		# Start the frames going
		@frame()

	# Spawn an object here
	spawn: (entity) ->
		@entities.push entity
		Fiesta.fireEvent entity, 'spawn'

	# Can
	canvasContext: ->
		@domElement.getContext(@context)

	# Frames
	frame: ->
		
		# Prepare the next frame
		thisObject = this
		setTimeout (-> thisObject.frame()) , 1000 / @targetFramerate
		
		# Redraw if 2D
		@canvasContext().clearRect(0, 0, @size.x, @size.y) if @context is '2d'
		
		# Deal with each object
		size = @entities.length
		i = 0
		while (i < size)
			
			entity = @entities[i]
			
			# Physics and frame
			entity.calculatePhysics()
			Fiesta.fireEvent entity, 'frame'
			
			# Draw the graphic if it's 2D
			entity.graphic.draw @canvasContext(), entity.position if @context is '2d' and entity.graphic? and entity.graphic.draw?
			
			# Collisions?
			j = 0
			while j < i
				entity2 = @entities[j]
				boundary1 = entity.boundary
				if entity.graphic then boundary1 = entity.boundary or entity.graphic.boundary
				boundary2 = entity.boundary
				if entity2.graphic then boundary2 = entity2.boundary or entity2.graphic.boundary
				Fiesta.Entity.collide(entity, entity2) if Fiesta.Boundary.checkCollision(boundary1, entity.position, boundary2, entity2.position)
				j += 1

			i += 1
