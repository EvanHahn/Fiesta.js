/*	Commands
	This is all the logic for binding commands (key presses, clicks, etc) to
	methods. bindCommands() should work on any object, Fiesta or not (though
	it does depend on other Fiesta methods).	*/

// Some config variables that probably don't change
var leftButton = 0;
if (Fiesta.getBrowser() === "Explorer")	leftButton = 1;
var rightButton = 2;
var middleButton = 1;
if (Fiesta.getBrowser() === "Explorer")	middleButton = 4;

// Bind commands to functions (works for any object)
Fiesta._leftclicks = [];
Fiesta._rightclicks = [];
Fiesta._middleclicks = [];
Fiesta._mousemoves = [];
Fiesta._keydowns = [];
Fiesta._keyups = [];
Fiesta.bindCommands = function(object, binds) {
	
	// This is an object, right?
	if (!(object instanceof Object))
		throw new TypeError(object + " is not an object; I can't bind things to it");
	
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
	// If there's an error, we should keep going
	for (var i in binds) {
		try {
			switch (Fiesta.getEventType(i)) {
				case "leftclick":
					Fiesta._leftclicks.push(i);
					break;
				case "rightclick":
					Fiesta._rightclicks.push(i);
					break;
				case "middleclick":
					Fiesta._middleclicks.push(i);
					break;
				case "mousemove":
					Fiesta._mousemoves.push(i);
					break;
				case "keyup":
					Fiesta.getKeyCode(i);	// Makes sure error will be thrown
					Fiesta._keyups.push(i);
					break;
				case "keydown":
					Fiesta.getKeyCode(i);	// Makes sure error will be thrown
					Fiesta._keydowns.push(i);
					break;
			}
		} catch (e) {
			console.error(e);
		}
	}
	
	// Where am I binding to?
	var mouseBindTo = window;
	try {
		mouseBindTo = object.getPlayground().getDOMElement();
	} catch (_) {}
	var keyboardBindTo = window;
	
	// Bind right click to click, not left click
	mouseBindTo.oncontextmenu = function(mouse) {
		mouse.button = rightButton;
		mouseBindTo.onclick(mouse);
		return false;
	};
	
	// Do the bindings
	mouseBindTo.onmousemove = function(mouse) {
		for (var i in Fiesta._mousemoves) {
			binds[Fiesta._mousemoves[i]].call(object, mouse.clientX, mouse.clientY);
		}
	};
	mouseBindTo.onclick = function(mouse) {
		for (var i in Fiesta._leftclicks) {
			var leftPressed = (mouse.button == leftButton);
			var modifiers = modifiersPressed(Fiesta._leftclicks[i], mouse);
			if (leftPressed && modifiers)
				binds[Fiesta._leftclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
		for (var i in Fiesta._rightclicks) {
			var rightPressed = (mouse.button == rightButton);
			var modifiers = modifiersPressed(Fiesta._rightclicks[i], mouse);
			if (rightPressed && modifiers)
				binds[Fiesta._rightclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
		for (var i in Fiesta._middleclicks) {
			var middlePressed = (mouse.button == middleButton);
			var modifiers = modifiersPressed(Fiesta._middleclicks[i], mouse);
			if (middlePressed && modifiers)
				binds[Fiesta._middleclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
	};
	keyboardBindTo.onkeydown = function(key) {
		for (var i in Fiesta._keydowns) {
			var keyPressed = (key.keyCode == Fiesta.getKeyCode(Fiesta._keydowns[i]));
			var modifiers = modifiersPressed(Fiesta._keydowns[i], key);
			if (keyPressed && modifiers)
				binds[Fiesta._keydowns[i]].call(object);
		}
	};
	keyboardBindTo.onkeyup = function(key) {
		for (var i in Fiesta._keyups) {
			var keyPressed = (key.keyCode == Fiesta.getKeyCode(Fiesta._keyups[i]));
			var modifiers = modifiersPressed(Fiesta._keyups[i], key);
			if (keyPressed && modifiers)
				binds[Fiesta._keyups[i]].call(object);
		}
	};
	
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