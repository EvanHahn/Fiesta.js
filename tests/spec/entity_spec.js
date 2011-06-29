describe("Entity", function() {
	
	it("initializes with no graphic", function() {
		var obj = new Fiesta.Entity();
		expect(obj.getGraphic()).toBeFalsy();
	});
	
	it("initializes with no playground", function() {
		var obj = new Fiesta.Entity();
		expect(obj.getPlayground()).toBeFalsy();
	});
	
	it("assigns graphics properly", function() {
		var obj = new Fiesta.Entity();
		var gfx = new Fiesta.Graphic();
		obj.setGraphic(gfx);
		expect(obj.getGraphic()).toBe(gfx);
	});
	
	it("won't assign a graphic if you don't pass it a graphic", function() {
		var obj = new Fiesta.Entity();
		expect(function() {
			obj.setGraphic("foo");
		}).toThrow("foo is not a graphic");
	});

	it("spawns in a playground", function() {
		var obj = new Fiesta.Entity();
		var play = new Fiesta.Playground();
//		play.spawn(obj);
//		expect(obj.getPlayground()).toBe(play);
	});
	
	it("destroys itself from a playground", function() {
		var obj = new Fiesta.Entity();
		var play = new Fiesta.Playground();
		play.spawn(obj);
		expect(obj.getPlayground()).toBe(play);
		obj.destroy();
		expect(obj.getPlayground()).toBeFalsy();
	});
	
	it("calls onSpawn when you spawn an object", function() {
		var Obj = new Fiesta.Class(Fiesta.Entity, {
			initialize: function() {
				this.callSuper();
				this.spawned = false;
			},
			onSpawn: function() {
				this.callSuper();
				this.spawned = true;
			}
		});
		var obj = new Obj();
		expect(obj.spawned).toBeFalsy();
		var play = new Fiesta.Playground();
		play.spawn(obj);
		expect(obj.spawned).toBeTruthy();
	});
	
	it("calls onDestroy when you destroy an object", function() {
		var Obj = new Fiesta.Class(Fiesta.Entity, {
			initialize: function() {
				this.callSuper();
				this.destroyed = false;
			},
			onDestroy: function() {
				this.callSuper();
				this.destroyed = true;
			}
		});
		var obj = new Obj();
		expect(obj.destroyed).toBeFalsy();
		var play = new Fiesta.Playground();
		play.spawn(obj);
		obj.destroy();
		expect(obj.destroyed).toBeTruthy();
	});
	
	it("calls onFrame every frame", function() {
		var Obj = new Fiesta.Class(Fiesta.Entity, {
			initialize: function() {
				this.callSuper();
				this.value = 0;
			},
			onFrame: function() {
				this.callSuper();
				this.value ++;
			}
		});
		var obj = new Obj();
		expect(obj.value).toEqual(0);
		var play = new Fiesta.Playground(1, 1, "2d", 10);
		play.spawn(obj);
		expect(obj.value).toEqual(0);
		play.place(document.body);
		waits(500);
		runs(function() {
			expect(obj.value).toBeGreaterThan(4);
			expect(obj.value).toBeLessThan(10);
		});
	});
	
});
