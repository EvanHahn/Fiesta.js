var Fiesta = {};

/*	**************
	* Class core *
	**************
	
	This provides everything.	*/

Fiesta.Class = function(parent, object) {
	object.prototype = new parent;
	object.prototype.constructor = object;
	object.prototype.parent = new parent;
	return object;
};

/*	*********
	* TESTS *
	*********	*/

Fiesta.GameObject = Fiesta.Class(Object, function() {
	var graphic = "graphic";
	this.getGraphic = function() {
		return graphic;
	}
});

Fiesta.PhysicalGameObject = Fiesta.Class(Fiesta.GameObject, function() {
	
	var x = 5;
	
	this.getX = function() {
		return x;
	};
	
	this.setX = function(s) {
		x = s;
	};
	
	this.getGraphic = function() {
		return this.parent.getGraphic();
	};
	
});

//var gameObject = new Fiesta.GameObject();
//console.log("Get the graphic of the base object: " + gameObject.getGraphic());
var physicalGameObject = new Fiesta.PhysicalGameObject();
console.log("Get the x of the physical game object using a function: " + physicalGameObject.getX());
console.log("Get the x of the physical game object using a variable ref: " + physicalGameObject.x);
console.log("Get the graphic of the physical game object: " + physicalGameObject.getGraphic());
console.log("Physical Game Object is an instance of a Game Object: " + (physicalGameObject instanceof Fiesta.GameObject));