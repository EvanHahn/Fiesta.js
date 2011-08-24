/*	Fiesta.js command binding
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// These are constants for mouse clicks
Fiesta._LEFT_MOUSE_BUTTON = 0;
if (Fiesta.getBrowser() === "Explorer")	Fiesta._LEFT_MOUSE_BUTTON = 1;
Fiesta._RIGHT_MOUSE_BUTTON = 2;
Fiesta._MIDDLE_MOUSE_BUTTON = 1;
if (Fiesta.getBrowser() === "Explorer")	Fiesta._MIDDLE_MOUSE_BUTTON = 4;

// Are my desired modifiers pressed?
Fiesta.modifiersPressed = function(str, key) {
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

// This function does cross-browser binding
Fiesta.addListener = function(element, event, fn) {
	if (element.addEventListener) {	// Everything else
		var bubble = true;
		element.addEventListener(event, fn, bubble);
	} else if (this.attachEvent) {	// IE
		element.attachEvent("on" + event, fn);
	}
}

// Extract event from command string
Fiesta.getEventType = function(str) {
	var command = str.split(" ").join("").toLowerCase();
	
	if (Fiesta.contains(command, "mouse") && Fiesta.contains(command, "move")) return "mousemove";
	if (Fiesta.contains(command, "click") && Fiesta.contains(command, "left")) return "leftclick";
	if (Fiesta.contains(command, "click") && Fiesta.contains(command, "right")) return "rightclick";
	if (Fiesta.contains(command, "click")) {
		Fiesta.warn(str + " defaulted to a " + Fiesta.DEFAULT_CLICK + ", but it should be specified (\"" + str + " " + Fiesta.DEFAULT_CLICK + "\")");
		return Fiesta.DEFAULT_CLICK;
	}
	if (Fiesta.contains(command, "keyup")) return "keyup";
	if (Fiesta.contains(command, "keydown")) return "keydown";
	
	try {	// We don't know what it is, so maybe it's the default keyboard command?
		Fiesta.getKeyCode(str);
		Fiesta.warn(str + " defaulted to a " + Fiesta.DEFAULT_KEYBOARD_COMMAND + ", but it should be specified (\"" + str + " " + Fiesta.DEFAULT_KEYBOARD_COMMAND + "\")");
		return Fiesta.DEFAULT_KEYBOARD_COMMAND;
	} catch (_) {}
	
	throw new Error("Cannot find event type from " + str);
};

// Change command name to keycode (simple)
Fiesta.getKeyCode = function(str) {
	var command = str.split(" ")[0].toLowerCase();
	if (Fiesta.contains(command, "+"))
		return Fiesta.getKeyCode(str.split("+")[1]);
	if (Fiesta.KEYCODE_TRANSLATIONS[command])
		return Fiesta.KEYCODE_TRANSLATIONS[command];
	else
		throw new TypeError(str + " cannot be translated to a keycode");
};

// Bind commands to functions (works for any object)
Fiesta.bindCommands = function(object, binds) {
	
	// This is an object, right?
	if (!(object instanceof Object))
		throw new TypeError("Cannot bind commands to " + object);
	
	// Set up the list of variables
	var leftclicks = [];
	var rightclicks = [];
	var middleclicks = [];
	var mousemoves = [];
	var keydowns = [];
	var keyups = [];
	
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
			Fiesta.error(e);
		}
	}
	
	// Where am I binding to?
	var mouseBindTo = window;
	try {	// Let's try binding it to the playground
		mouseBindTo = object.getPlayground().getDOMElement();
	} catch (_) {}
	var keyboardBindTo = window;
	
	// Do the bindings
	Fiesta.addListener(mouseBindTo, "mousemove", function(mouse) {
		for (var i in mousemoves) {
			if (Fiesta.modifiersPressed(mousemoves[i], mouse))
				binds[mousemoves[i]].call(object, mouse.clientX, mouse.clientY);
		}
	});
	Fiesta.addListener(mouseBindTo, "click", function(mouse) {
		for (var i in leftclicks) {
			var leftPressed = (mouse.button == Fiesta._LEFT_MOUSE_BUTTON);
			if (leftPressed && Fiesta.modifiersPressed(leftclicks[i], mouse))
				binds[leftclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
		for (var i in rightclicks) {
			var rightPressed = (mouse.button == Fiesta._RIGHT_MOUSE_BUTTON);
			if (rightPressed && Fiesta.modifiersPressed(rightclicks[i], mouse))
				binds[rightclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
		for (var i in middleclicks) {
			var middlePressed = (mouse.button == Fiesta._MIDDLE_MOUSE_BUTTON);
			if (middlePressed && Fiesta.modifiersPressed(middleclicks[i], mouse))
				binds[middleclicks[i]].call(object, mouse.clientX, mouse.clientY);
		}
	});
	Fiesta.addListener(keyboardBindTo, "keydown", function(key) {
		for (var i in keydowns) {
			var keyPressed = (key.keyCode == Fiesta.getKeyCode(keydowns[i]));
			if (keyPressed && Fiesta.modifiersPressed(keydowns[i], key))
				binds[keydowns[i]].call(object);
		}
	});
	Fiesta.addListener(keyboardBindTo, "keyup", function(key) {
		for (var i in keyups) {
			var keyPressed = (key.keyCode == Fiesta.getKeyCode(keyups[i]));
			if (keyPressed && Fiesta.modifiersPressed(keyups[i], key))
				binds[keyups[i]].call(object);
		}
	});
	
	// Bind right click to click, not some stupid context menu!
	Fiesta.addListener(mouseBindTo, "contextmenu", function(mouse) {
		mouse.preventDefault();
		var ev = document.createEvent("MouseEvents");
	    ev.initMouseEvent("click", true, true, window, 0, mouse.screenX, mouse.screenY, mouse.clientX, mouse.clientY, mouse.ctrlKey, mouse.altKey, mouse.shiftKey, mouse.metaKey, Fiesta._RIGHT_MOUSE_BUTTON, null);
	    mouseBindTo.dispatchEvent(ev);
	});
	
};