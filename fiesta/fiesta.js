/*	Fiesta.js - A JavaScript game engine
	version 0.0.8
	
	This file includes all of the other relevant Fiesta files. Before including this
	on any HTML page, you must define FIESTA_PATH somewhere, which just points me
	to...well, Fiesta's path.
	
	Enjoy!	*/

var Fiesta = {};

/*	Config variables
	These aim to be user-friendly configuration variables.	*/

Fiesta.DEFAULT_KEYBOARD_COMMAND = "keydown";
Fiesta.DEFAULT_CLICK = "leftclick";

Fiesta.PLAYGROUND_DEFAULT_WIDTH = 400;
Fiesta.PLAYGROUND_DEFAULT_HEIGHT = 300;
Fiesta.PLAYGROUND_DEFAULT_FPS = 60;
Fiesta.PLAYGROUND_DEFAULT_CONTEXT = "2d";

/*	Let's load everything that we need	*/

var JSCLASS_FOLDER = "jsclass-min-3.0";
var JSCLASS_LOADER = "loader-browser.js";
var jsClassPath = FIESTA_PATH + "/" + JSCLASS_FOLDER + "/";
var jsClassLoader = document.createElement("script");
jsClassLoader.setAttribute("src", FIESTA_PATH + "/" + JSCLASS_FOLDER + "/" + JSCLASS_LOADER);
document.head.appendChild(jsClassLoader);
jsClassLoader.onload = function() {
	
	// Set up what's what
	JS.Packages(function() { with(this) {
		file(jsClassPath + "/core.js").provides("JS.Class");
		file(FIESTA_PATH + "/fiesta.js").provides("Fiesta");
		file(FIESTA_PATH + "/gameobject.js").provides("Fiesta.GameObject");
		file(FIESTA_PATH + "/physicalgameobject.js").provides("Fiesta.PhysicalGameObject");
		file(FIESTA_PATH + "/playground.js").provides("Fiesta.Playground");
		file(FIESTA_PATH + "/sprite.js").provides("Fiesta.Sprite");
		file(FIESTA_PATH + "/sound.js").provides("Fiesta.Sound");
		file(FIESTA_PATH + "/commands.js").provides("Fiesta commands");
		file(FIESTA_PATH + "/common.js").provides("Fiesta common functions");
		file(FIESTA_PATH + "/browser-detect.js").provides("Fiesta browser detection");
	}});
	
	// Require anything that's in the core
	JS.require("JS.Class", "Fiesta browser detection", "Fiesta common functions", "Fiesta commands", "Fiesta.GameObject", "Fiesta.PhysicalGameObject", "Fiesta.Playground", "Fiesta.Sprite", "Fiesta.Sound");

};