###

	Fiesta.js, a JavaScript game library
	http://github.com/EvanHahn/Fiesta.js/
	Copyright (c) 2011 Evan Hahn

	Fiesta.js is licensed under the MIT license. Check the LICENSE file for
	more information.
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt

###

window.Fiesta or= Object.create(null)
###
	Fiesta.js misc. functions

	Requires:
		namespace.coffee
###

Fiesta.sign = (x) ->
	if x > 0
		return 1
	else if x < 0
		return -1
	return 0

Fiesta.isString = (s) ->
	(typeof s is 'string') or (s instanceof String)

Fiesta.isInternetExplorer = ->
	window.navigator.userAgent.indexOf('MSIE') isnt -1
###
	Fiesta.js events
	Games are very event-driven; this file is SUPER IMPORTANT!

	Requires:
		namespace.coffee
		types.coffee
###

Fiesta.addEvent = (scope, name, fn) ->
	
	# If the scope isn't given, make it the window
	if Fiesta.isString scope
		fn = name
		name = scope
		scope = window
	
	# Set up events object
	scope._events or= Object.create(null)
	
	# Put the event in there
	scope._events[name] = scope._events[name] || [];
	scope._events[name].push fn;

Fiesta.fireEvent = (scope, name, eventObject) ->
	
	# If the scope isn't given, make it the window
	if Fiesta.isString scope
		eventObject = name
		name = scope
		scope = window
	
	if scope._events and scope._events[name]
		for fn in scope._events[name]
			fn(eventObject)
###
	Fiesta.js 3D vector

	Requires:
		namespace.coffee
###

class Fiesta.Vector

	constructor: (@x = 0, @y = 0, @z) ->
###
	Fiesta.js boundary
	Bounds determine the bounds of an entity. Most simple ones are boxes,
	more complex ones can also exist.

	Requires:
		namespace.coffee
		vector.coffee
###

class Fiesta.Boundary
	
	constructor: (x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2, z2) ->
		
		# If we have it in 2D, translate it to 3D
		if !y2? and !z2?
			z2 = 0
			y2 = x2
			x2 = z1
			z1 = 0
		
		# Assign the two vectors
		@position = new Fiesta.Vector x1, y1, z1
		@size = new Fiesta.Vector x2, y2, z2

# Do two boundaries collide?
Fiesta.Boundary.checkCollision = (a, aPosition, b, bPosition) ->
	if a instanceof Fiesta.Boundary and b instanceof Fiesta.Boundary
		!(	b.position.x + bPosition.x	> a.size.x + aPosition.x or
			b.size.x + bPosition.x		< a.position.x + aPosition.x or
			b.position.y + bPosition.y	> a.size.x + aPosition.y or
			b.size.x + bPosition.y		< a.position.y + aPosition.y or
			b.position.z + bPosition.z	> a.size.z + aPosition.z or
			b.size.z + bPosition.z		< a.position.z + aPosition.z)
	else no
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
###
	Fiesta.js entity
	This is an entity that represents most game objects.

	Requires:
		namespace.coffee
		vector.coffee
###

class Fiesta.Entity

	# Constructor
	constructor: ->
		@position = new Fiesta.Vector 0, 0, 0
		@velocity = new Fiesta.Vector 0, 0, 0
		@acceleration = new Fiesta.Vector 0, 0, 0
		@friction = new Fiesta.Vector 0, 0, 0
		@lastPhysicsCalculation = new Date

	# Spawn me in a scene
	spawn: (scene) ->
		scene.spawn this

	# Calculate physics
	calculatePhysics: (lastTime = @lastPhysicsCalculation) ->
		
		# What's the time difference?
		t = (new Date - lastTime) / 1000

		# Calculate the new velocity from the acceleration
		@velocity.x += @acceleration.x * t
		@velocity.y += @acceleration.y * t
		@velocity.z += @acceleration.z * t

		# Calculate the new velocity from the friction
		if @friction.x
			frictionX = @friction.x
			if @velocity.x < 0 then frictionX = -frictionX
			if Math.abs @velocity.x > Math.abs @friction.x
				@velocity.x += frictionX * t
			else
				@velocity.x = 0
		if @friction.y
			frictionY = @friction.y
			if @velocity.y < 0 then frictionY = -frictionY
			if Math.abs @velocity.y > Math.abs @friction.y
				@velocity.y += frictionY * t
			else
				@velocity.y = 0
		if @friction.z
			frictionZ = @friction.z
			if @velocity.z < 0 then frictionZ = -frictionZ
			if Math.abs @velocity.z > Math.abs @friction.z
				@velocity.z += frictionZ * t
			else
				@velocity.z = 0

		# Calculate the new position
		@position.x += @velocity.x * t
		@position.y += @velocity.y * t
		@position.z += @velocity.z * t

		# Update when I last did this
		@lastPhysicsCalculation = new Date

# Collide two entities
Fiesta.Entity.collide = (a, b) ->
	
	# Find masses
	aMass = a.mass or 1
	bMass = b.mass or 1
	massRatio = aMass / bMass
	massSum = aMass + bMass
	
	# "Unstick"
	distanceXSign = Fiesta.sign a.position.x - b.position.x
	distanceYSign = Fiesta.sign a.position.y - b.position.y
	distanceZSign = Fiesta.sign a.position.z - b.position.z
	aMoves = (1 - (aMass / massSum)) or 0
	bMoves = (1 - (bMass / massSum)) or 0
	a.position.x += distanceXSign * aMoves
	a.position.y += distanceYSign * aMoves
	a.position.z += distanceZSign * aMoves
	b.position.x -= distanceXSign * bMoves
	b.position.y -= distanceYSign * bMoves
	b.position.z -= distanceZSign * bMoves
	
	# Transfer momentum
	bOldV = new Fiesta.Vector b.velocity.x, b.velocity.y, b.velocity.z
	b.velocity.x = (a.velocity.x * massRatio) or 0	# NaN shows up if a mass
	b.velocity.y = (a.velocity.y * massRatio) or 0	# is Infinity; "or 0"
	b.velocity.z = (a.velocity.z * massRatio) or 0	# fixes that
	a.velocity.x = (bOldV.x / massRatio) or 0
	a.velocity.y = (bOldV.y / massRatio) or 0
	a.velocity.z = (bOldV.z / massRatio) or 0
	
	# Trigger collide events
	Fiesta.fireEvent a, 'collide', b
	Fiesta.fireEvent b, 'collide', a
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
