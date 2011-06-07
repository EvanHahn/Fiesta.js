/*	Fiesta.js - A JavaScript game engine
	version 0.1.0
	
	This file includes all of the other relevant Fiesta files. Before including this
	on any HTML page, you must define FIESTA_PATH somewhere, which just points me
	to...well, Fiesta's path.
	
	Enjoy!	*/

var Fiesta = {};

/*	Config variables
	These aim to be user-friendly configuration variables.	*/

if (!Fiesta.DEFAULT_KEYBOARD_COMMAND) Fiesta.DEFAULT_KEYBOARD_COMMAND = "keydown";
if (!Fiesta.DEFAULT_CLICK) Fiesta.DEFAULT_CLICK = "leftclick";

if (!Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION) Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION = 1;

if (!Fiesta.PLAYGROUND_DEFAULT_WIDTH) Fiesta.PLAYGROUND_DEFAULT_WIDTH = 400;
if (!Fiesta.PLAYGROUND_DEFAULT_HEIGHT) Fiesta.PLAYGROUND_DEFAULT_HEIGHT = 300;
if (!Fiesta.PLAYGROUND_DEFAULT_FPS) Fiesta.PLAYGROUND_DEFAULT_FPS = 60;
if (!Fiesta.PLAYGROUND_DEFAULT_CONTEXT) Fiesta.PLAYGROUND_DEFAULT_CONTEXT = "2d";

/*	Load a file into the <head>	*/

Fiesta.loadScript = function(src, callback) {
	var script = document.createElement("script");
	script.setAttribute("src", src);
	document.head.appendChild(script);
	if (callback)
		script.onload = callback;
};

/*	Fiesta is ready	*/

Fiesta.ready = function(callback) {
	
	// A little cleanup time
	var FIESTA_PATH = window.FIESTA_PATH;
	window.FIESTA_PATH = undefined;
	
	// Let's load everything that we need
	var JSCLASS_FOLDER = "jsclass-min-3.0";
	var JSCLASS_LOADER = "loader-browser.js";
	Fiesta.loadScript(FIESTA_PATH + "/" + JSCLASS_FOLDER + "/" + JSCLASS_LOADER, function() {
		
		// Set up what's what
		JS.Packages(function() { with(this) {
			file(FIESTA_PATH + "/" + JSCLASS_FOLDER + "/core.js").provides("JS.Class");
			file(FIESTA_PATH + "/fiesta.js").provides("Fiesta");
			file(FIESTA_PATH + "/gameobject.js").provides("Fiesta.GameObject").requires("JS.Class");
			file(FIESTA_PATH + "/physicalgameobject.js").provides("Fiesta.PhysicalGameObject").requires("JS.Class");
			file(FIESTA_PATH + "/playground.js").provides("Fiesta.Playground").requires("JS.Class");
			file(FIESTA_PATH + "/sprite.js").provides("Fiesta.Sprite").requires("JS.Class");
			file(FIESTA_PATH + "/sound.js").provides("Fiesta.Sound").requires("JS.Class");
		}});
		
		// Load it all (unfortunately, this doesn't all seem to work with JS.Packages
		Fiesta.loadScript(FIESTA_PATH + "/browser-detect.js", function() {
			Fiesta.loadScript(FIESTA_PATH + "/common.js", function() {
				Fiesta.loadScript(FIESTA_PATH + "/commands.js", function() {
					JS.require("JS.Class", "Fiesta.GameObject", "Fiesta.PhysicalGameObject", "Fiesta.Playground", "Fiesta.Sprite", "Fiesta.Sound", callback);
				});
			});
		});
	
	});

};