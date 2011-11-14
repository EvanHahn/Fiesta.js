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
