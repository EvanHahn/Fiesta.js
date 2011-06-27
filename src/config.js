/*	Fiesta.js configs
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Show logs, warnings, or errors?
Fiesta.SHOW_LOGS = Fiesta.SHOW_LOGS || true;
Fiesta.SHOW_WARNINGS = Fiesta.SHOW_WARNINGS || true;
Fiesta.SHOW_ERRORS = Fiesta.SHOW_ERRORS || true;

// Stats defaults
Fiesta.DEFAULT_STATS_LEFT_POSITION = Fiesta.DEFAULT_STATS_LEFT_POSITION || "10px";
Fiesta.DEFAULT_STATS_UP_POSITION = Fiesta.DEFAULT_STATS_UP_POSITION || "10px";

// Physical game objects defaults
Fiesta.DEFAULT_X = Fiesta.DEFAULT_X || 0;
Fiesta.DEFAULT_Y = Fiesta.DEFAULT_Y || 0;
Fiesta.DEFAULT_Z = Fiesta.DEFAULT_Z || 0;
Fiesta.DEFAULT_X_VELOCITY = Fiesta.DEFAULT_X_VELOCITY || 0;
Fiesta.DEFAULT_Y_VELOCITY = Fiesta.DEFAULT_Y_VELOCITY || 0;
Fiesta.DEFAULT_Z_VELOCITY = Fiesta.DEFAULT_Z_VELOCITY || 0;
Fiesta.DEFAULT_X_ACCELERATION = Fiesta.DEFAULT_X_ACCELERATION || 0;
Fiesta.DEFAULT_Y_ACCELERATION = Fiesta.DEFAULT_Y_ACCELERATION || 0;
Fiesta.DEFAULT_Z_ACCELERATION = Fiesta.DEFAULT_Z_ACCELERATION || 0;
Fiesta.DEFAULT_X_FRICTION = Fiesta.DEFAULT_X_FRICTION || 0;
Fiesta.DEFAULT_Y_FRICTION = Fiesta.DEFAULT_Y_FRICTION || 0;
Fiesta.DEFAULT_Z_FRICTION = Fiesta.DEFAULT_Z_FRICTION || 0;
Fiesta.DEFAULT_MASS = Fiesta.DEFAULT_MASS || 1;
Fiesta.DEFAULT_BOUNCINESS = Fiesta.DEFAULT_BOUNCINESS || 1;
Fiesta.DEFAULT_BOUNDING_BOX_AUTO = Fiesta.DEFAULT_BOUNDING_BOX_AUTO || true;
Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION = Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION || 1;

// Sprites
Fiesta.DEFAULT_SPRITE_STARTING_INDEX = Fiesta.DEFAULT_SPRITE_STARTING_INDEX || 0;
Fiesta.DEFAULT_SPRITE_ANIMATE_SPEED = Fiesta.DEFAULT_SPRITE_ANIMATE_SPEED || 30;

// 3D graphics
Fiesta.DEFAULT_3D_MATERIAL = Fiesta.DEFAULT_3D_MATERIAL || new THREE.MeshLambertMaterial({ color: 0xFFFFFF });

// Sounds
Fiesta.SOUND_EXTENSIONS = ["ogg", "wav", "mp3"];

// Playground defaults
Fiesta.PLAYGROUND_DEFAULT_WIDTH = Fiesta.PLAYGROUND_DEFAULT_WIDTH || 400;
Fiesta.PLAYGROUND_DEFAULT_HEIGHT = Fiesta.PLAYGROUND_DEFAULT_HEIGHT || 300;
Fiesta.PLAYGROUND_DEFAULT_FPS = Fiesta.PLAYGROUND_DEFAULT_FPS || 60;
Fiesta.PLAYGROUND_DEFAULT_CONTEXT = Fiesta.PLAYGROUND_DEFAULT_CONTEXT || "2d";
Fiesta.PLAYGROUND_DEFAULT_REDRAW = Fiesta.PLAYGROUND_DEFAULT_REDRAW || true;

// Commands defaults
Fiesta.DEFAULT_KEYBOARD_COMMAND = Fiesta.DEFAULT_KEYBOARD_COMMAND || "keydown";
Fiesta.DEFAULT_CLICK = Fiesta.DEFAULT_CLICK || "leftclick";
Fiesta.KEYCODE_TRANSLATIONS = Fiesta.KEYCODE_TRANSLATIONS || {
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
	"win": 91,
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