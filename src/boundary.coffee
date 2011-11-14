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
