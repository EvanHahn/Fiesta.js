describe("Physical game object", function() {

	it("constructs properly", function() {
		var p = new Fiesta.PhysicalGameObject();
		expect(p.getX()).toEqual(Fiesta.DEFAULT_X);
		expect(p.getY()).toEqual(Fiesta.DEFAULT_Y);
		expect(p.getZ()).toEqual(Fiesta.DEFAULT_Z);
		expect(p.getVelocityX()).toEqual(Fiesta.DEFAULT_X_VELOCITY);
		expect(p.getVelocityY()).toEqual(Fiesta.DEFAULT_Y_VELOCITY);
		expect(p.getVelocityZ()).toEqual(Fiesta.DEFAULT_Z_VELOCITY);
		expect(p.getAccelerationX()).toEqual(Fiesta.DEFAULT_X_ACCELERATION);
		expect(p.getAccelerationY()).toEqual(Fiesta.DEFAULT_Y_ACCELERATION);
		expect(p.getAccelerationZ()).toEqual(Fiesta.DEFAULT_Z_ACCELERATION);
		expect(p.getFrictionX()).toEqual(Fiesta.DEFAULT_X_FRICTION);
		expect(p.getFrictionY()).toEqual(Fiesta.DEFAULT_Y_FRICTION);
		expect(p.getFrictionZ()).toEqual(Fiesta.DEFAULT_Z_FRICTION);
		expect(p.getMass()).toEqual(Fiesta.DEFAULT_MASS);
		expect(p.getBounciness()).toEqual(Fiesta.DEFAULT_BOUNCINESS);
	});
	
});