var Fiesta = {};

Fiesta.GameObject = function() {
	var graphic = 100;
	
	this.getGraphic = function() {
		return graphic;
	}
};

Fiesta.PhysicalGameObject = function() {
	this.x = 5;
};
Fiesta.PhysicalGameObject.prototype = new Fiesta.GameObject();

var z = new Fiesta.PhysicalGameObject();
console.log(z instanceof Fiesta.GameObject);
