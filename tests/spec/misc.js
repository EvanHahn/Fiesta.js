describe('Miscellaneous functions', function() {

	// Sign function
	it('determines negative sign properly', function() {
		expect(Fiesta.sign(-0.1)).toEqual(-1);
	});
	it('determines positive sign properly', function() {
		expect(Fiesta.sign(0.1)).toEqual(1);
	});
	it('determines "0" sign properly', function() {
		expect(Fiesta.sign(0)).toEqual(0);
	});

	// Is something a string?
	it('checks if a primitive value is a string (when it is)', function() {
		var x = 'Hello, world!';
		expect(Fiesta.isString(x)).toBeTruthy();
	});
	it("checks if a primitive value is a string (when it isn't)", function() {
		var x = 5;
		expect(Fiesta.isString(x)).toBeFalsy();
	});
	it('checks if a String object is a string (when it is)', function() {
		var x = new String('Hello, planet Earth.');
		expect(Fiesta.isString(x)).toBeTruthy();
	});
	it("checks if an object is a string (when it isn't)", function() {
		var x = new Number(12);
		expect(Fiesta.isString(x)).toBeFalsy();
	});
	it('checks if undefined is a string', function() {
		var x;
		expect(Fiesta.isString(x)).toBeFalsy();
	});

	// Am I on IE?
	it('checks if my browser is Internet Explorer', function() {
		var isIE = (navigator.appName == 'Microsoft Internet Explorer');
		expect(Fiesta.isInternetExplorer()).toEqual(isIE);
	});

});
