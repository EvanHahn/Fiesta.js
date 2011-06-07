/*	Commands
	This is all the logic for binding commands (key presses, clicks, etc) to
	methods. bindCommands() should work on any object, Fiesta or not (though
	it does depend on other Fiesta methods).	*/

// Bind commands to functions (works for any object)
Fiesta.bindCommands = function(object, binds) {
	
	// This is an object, right?
	if (!(object instanceof Object))
		throw new TypeError(object + " is not an object; I can't bind things to it");
	
	// Set up the list of variables
	var leftclicks = [];
	var rightclicks = [];
	var middleclicks = [];
	var mousemoves = [];
	var keydowns = [];
	var keyups = [];
	
	// Some mouse config variables that probably don't change
	var leftButton = 0;
	if (Fiesta.getBrowser() === "Explorer")	leftButton = 1;
	var rightButton = 2;
	var middleButton = 1;
	if (Fiesta.getBrowser() === "Explorer")	middleButton = 4;
	
	// Are my modifiers all pressed (if I want them to be)?
	var modifiersPressed = function(str, key) {
		var desires = {
			shift: Fiesta.contains(str, "shift"),
			control: Fiesta.contains(str, "control") || Fiesta.contains(str, "ctrl"),
			alt: Fiesta.contains(str, "alt") || Fiesta.contains(str, "opt") || Fiesta.contains(str, "option"),
			meta: Fiesta.contains(str, "meta")
		};
		var shift = !desires.shift || key.shiftKey;
		var control = !desires.control || key.ctrlKey;
		var alt = !desires.alt || key.altKey;
		var meta = !desires.meta || key.metaKey;
		return (shift && control && alt && meta);
	};
	
	// Populate the different command types, find modifiers
	// If there's an error, we just should keep going, but dump error to log
	for (var i in binds) {
		try {
			switch (Fiesta.getEventType(i)) {
				case "leftclick":
					leftclicks.push(i);
					break;
				case "rightclick":
					rightclicks.push(i);
					break;
				case "middleclick":
					middleclicks.push(i);
					break;
				case "mousemove":
					mousemoves.push(i);
					break;
				case "keyup":
					Fiesta.getKeyCode(i);	// Makes sure error will be thrown
					keyups.push(i);
					break;
				case "keydown":
					Fiesta.getKeyCode(i);	// Makes sure error will be thrown
					keydowns.push(i);
					break;
			}
		} catch (e) {
			console.error(e);
		}
	}
	
	// This function does cross-browser binding
	function addListener(element, event, fn) {
		if (element.addEventListener) {	// Everything else
			bubble = true;
			element.addEventListener(event, fn, bubble);
		} else if (this.attachEvent) {	// IE
			element.attachEvent("on" + event, fn);
		}
	}
	
	// Where am I binding to?
	var mouseBindTo = window;
	try {
		mouseBindTo = object.getPlayground().getDOMElement();
	} catch (_) {}
	var keyboardBindTo = window;
	
	// Do the bindings
	addListener(mouseBindTo, "mousemove", function(mouse) {
		for (var i in mousemoves) {
			if (modifiersPressed(mousemoves[i], mouse))
				binds[mousemoves[i]].call(object, mouse.clientX, mouse.clientY);
		}
	});
	addListener(mouseBindTo, "click", function(mouse) {
		for (var i in leftclicks) {
			var leftPressed = (mouse.button == leftButton);
			if (leftPressed && modifiersPressed(leftclicks[i], mouse))
				binds[leftclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
		for (var i in rightclicks) {
			var rightPressed = (mouse.button == rightButton);
			if (rightPressed && modifiersPressed(rightclicks[i], mouse))
				binds[rightclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
		for (var i in middleclicks) {
			var middlePressed = (mouse.button == middleButton);
			if (middlePressed && modifiersPressed(middleclicks[i], mouse))
				binds[middleclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
	});
	addListener(keyboardBindTo, "keydown", function(key) {
		for (var i in keydowns) {
			var keyPressed = (key.keyCode == Fiesta.getKeyCode(keydowns[i]));
			if (keyPressed && modifiersPressed(keydowns[i], key))
				binds[keydowns[i]].call(object);
		}
	});
	addListener(keyboardBindTo, "keyup", function(key) {
		for (var i in keyups) {
			var keyPressed = (key.keyCode == Fiesta.getKeyCode(keyups[i]));
			if (keyPressed && modifiersPressed(keyups[i], key))
				binds[keyups[i]].call(object);
		}
	});
	
	// Bind right click to click, not some stupid context menu!
	addListener(mouseBindTo, "contextmenu", function(mouse) {
		mouse.preventDefault();
		var ev = document.createEvent("MouseEvents");
	    ev.initMouseEvent("click", true, true, window, 0, mouse.screenX, mouse.screenY, mouse.clientX, mouse.clientY, mouse.ctrlKey, mouse.altKey, mouse.shiftKey, mouse.metaKey, rightButton, null);
	    mouseBindTo.dispatchEvent(ev);
	});
	
};

// Extract event from command string
Fiesta.getEventType = function(str) {
	
	var command = str.split(" ").join("").toLowerCase();
	
	if (Fiesta.contains(command, "mouse") && Fiesta.contains(command, "move")) return "mousemove";
	if (Fiesta.contains(command, "click") && Fiesta.contains(command, "left")) return "leftclick";
	if (Fiesta.contains(command, "click") && Fiesta.contains(command, "right")) return "rightclick";
	if (Fiesta.contains(command, "click")) return Fiesta.DEFAULT_CLICK;
	if (Fiesta.contains(command, "keyup")) return "keyup";
	if (Fiesta.contains(command, "keydown")) return "keydown";
	
	try {	// We don't know what it is, so maybe it's the default keyboard command?
		Fiesta.getKeyCode(str);
		return Fiesta.DEFAULT_KEYBOARD_COMMAND;
	} catch (_) {
		throw new Error("Cannot find event type from " + str);
	}
	
};

// Change command name to keycode (simple)
Fiesta.getKeyCode = function(str) {
	var command = str.split(" ")[0].toLowerCase();
	if (Fiesta.contains(command, "+"))
		return Fiesta.getKeyCode(str.split("+")[1]);
	var translations = {
		"backspace": 8,
		"tab": 9,
		"enter": 13,
		"return": 13,
		"shift": 16,
		"control": 17,
		"ctrl": 17,
		"alt": 18,
		"opt": 18,
		"option": 18,
		"pause/break": 19,
		"pause": 19,
		"break": 19,
		"capslock": 20,
		"caps": 20,
		"escape": 27,
		"esc": 27,
		"space": 32,
		"spacebar": 32,
		"pageup": 33,
		"pgup": 33,
		"pagedown": 34,
		"pgdown": 34,
		"pagedn": 34,
		"pgdn": 34,
		"end": 35,
		"home": 36,
		"left": 37,
		"leftarrow": 37,
		"up": 38,
		"uparrow": 38,
		"right": 39,
		"rightarrow": 39,
		"down": 40,
		"downarrow": 40,
		"insert": 45,
		"ins": 45,
		"delete": 46,
		"del": 46,
		"0": 48,
		"1": 49,
		"2": 50,
		"3": 51,
		"4": 52,
		"5": 53,
		"6": 54,
		"7": 55,
		"8": 56,
		"9": 57,
		";": 59,
		":": 59,
		"=": 61,
		"+": 61,
		"a": 65,
		"b": 66,
		"c": 67,
		"d": 68,
		"e": 69,
		"f": 70,
		"g": 71,
		"h": 72,
		"i": 73,
		"j": 74,
		"k": 75,
		"l": 76,
		"m": 77,
		"n": 78,
		"o": 79,
		"p": 80,
		"q": 81,
		"r": 82,
		"s": 83,
		"t": 84,
		"u": 85,
		"v": 86,
		"w": 87,
		"x": 88,
		"y": 89,
		"z": 90,
		"f1": 112,
		"f2": 113,
		"f3": 114,
		"f4": 115,
		"f5": 116,
		"f6": 117,
		"f7": 118,
		"f8": 119,
		"f9": 120,
		"f10": 121,
		"f11": 122,
		"f12": 123,
		"windows": 91,
		"meta": 91,
		"apple": 91,
		"command": 91,
		"numlock": 144,
		"num": 144,
		"scrolllock": 145,
		"scroll": 145,
		"\\": 220,
		"|": 220,
		"[": 219,
		"{": 219,
		"]": 221,
		"}": 221,
		".": 190,
		">": 190,
		"/": 191,
		"?": 191,
		"`": 192,
		"~": 192,
		",": 188,
		"<": 188,
		"'": 222,
		"\"": 222
	};
	if (translations[command])
		return translations[command];
	else
		throw new Error(str + " cannot be translated to a keycode");
};