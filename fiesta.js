/*	###############
	## FIESTA.JS ##
	###############
	
	version 0.1.0
	
	Fiesta.js is a JavaScript game engine. It aims to support 2D and 3D
	games using only modern browser technologies.
	
	See LICENSE.txt for legal info.
	
	¡Disfruta!	*/

var Fiesta = {};

/*	********************
	* Config variables *
	********************

	These aim to be user-friendly configuration variables.  */

if (!Fiesta.DEFAULT_KEYBOARD_COMMAND) Fiesta.DEFAULT_KEYBOARD_COMMAND = "keydown";
if (!Fiesta.DEFAULT_CLICK) Fiesta.DEFAULT_CLICK = "leftclick";

if (!Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION) Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION = 1;

if (!Fiesta.PLAYGROUND_DEFAULT_WIDTH) Fiesta.PLAYGROUND_DEFAULT_WIDTH = 400;
if (!Fiesta.PLAYGROUND_DEFAULT_HEIGHT) Fiesta.PLAYGROUND_DEFAULT_HEIGHT = 300;
if (!Fiesta.PLAYGROUND_DEFAULT_FPS) Fiesta.PLAYGROUND_DEFAULT_FPS = 60;
if (!Fiesta.PLAYGROUND_DEFAULT_CONTEXT) Fiesta.PLAYGROUND_DEFAULT_CONTEXT = "2d";
if (!Fiesta.PLAYGROUND_DEFAULT_REDRAW) Fiesta.PLAYGROUND_DEFAULT_REDRAW = true;

/*	***********
	* Classes *
	***********

	This is JS.Class version 3.0.0's core.js. See LICENSE.txt for license info.	*/

(function(){var a=(typeof this.global==='object')?this.global:this;a.JS=a.JS||{};JS.ENV=a})();JS.END_WITHOUT_DOT=/([^\.])$/;JS.array=function(a){var b=[],c=a.length;while(c--)b[c]=a[c];return b};JS.bind=function(a,b){return function(){return a.apply(b,arguments)}};JS.extend=function(a,b,c){if(!a||!b)return a;for(var d in b){if(a[d]===b[d])continue;if(c===false&&a.hasOwnProperty(d))continue;a[d]=b[d]}return a};JS.indexOf=function(a,b){if(a.indexOf)return a.indexOf(b);var c=a.length;while(c--){if(a[c]===b)return c}return-1};JS.isType=function(a,b){if(typeof b==='string')return typeof a===b;if(a===null||a===undefined)return false;return(typeof b==='function'&&a instanceof b)||(a.isA&&a.isA(b))||a.constructor===b};JS.makeBridge=function(a){var b=function(){};b.prototype=a.prototype;return new b()};JS.makeClass=function(a){a=a||Object;var b=function(){return this.initialize?this.initialize.apply(this,arguments)||this:this};b.prototype=JS.makeBridge(a);b.superclass=a;b.subclasses=[];if(a.subclasses)a.subclasses.push(b);return b};JS.match=function(a,b){if(b===undefined)return false;return typeof a.test==='function'?a.test(b):a.match(b)};JS.Method=JS.makeClass();JS.extend(JS.Method.prototype,{initialize:function(a,b,c){this.module=a;this.name=b;this.callable=c;this._1={};if(typeof c!=='function')return;this.arity=c.length;var d=c.toString().match(/\b[a-z\_\$][a-z0-9\_\$]*\b/ig),e=d.length;while(e--)this._1[d[e]]=true},setName:function(a){this.callable.displayName=this.displayName=a},contains:function(a){return this._1.hasOwnProperty(a)},call:function(){return this.callable.call.apply(this.callable,arguments)},apply:function(a,b){return this.callable.apply(a,b)},compile:function(h){var i=this,j=i.module.__trace__||h.__trace__,k=i.callable,q=i._1,n=JS.Method._3,o=n.length,l=[],m;while(o--){m=n[o];if(q[m.name])l.push(m)}if(l.length===0&&!j)return k;var p=function(){var a=l.length,b=a,c={},d,e,f;while(b--){d=l[b];e=this[d.name];if(e&&!e.__kwd__)continue;c[d.name]={_2:e,_4:this.hasOwnProperty(d.name)};f=d.filter(i,h,this,arguments);f.__kwd__=true;this[d.name]=f}var g=k.apply(this,arguments),b=a;while(b--){d=l[b];if(!c[d.name])continue;if(c[d.name]._4)this[d.name]=c[d.name]._2;else delete this[d.name]}return g};if(j)return JS.StackTrace.wrap(p,i,h);return p},toString:function(){var a=this.displayName||(this.module.toString()+'#'+this.name);return'#<Method:'+a+'>'}});JS.Method.create=function(a,b,c){if(c&&c.__inc__&&c.__fns__)return c;var d=(typeof c!=='function')?c:new this(a,b,c);this.notify(d);return d};JS.Method.compile=function(a,b){return a&&a.compile?a.compile(b):a};JS.Method.__listeners__=[];JS.Method.added=function(a,b){this.__listeners__.push([a,b])};JS.Method.notify=function(a){var b=this.__listeners__,c=b.length,d;while(c--){d=b[c];d[0].call(d[1],a)}};JS.Method._3=[];JS.Method.keyword=function(a,b){this._3.push({name:a,filter:b})};JS.Method.tracing=function(c,d,e){JS.require('JS.StackTrace',function(){var a=JS.StackTrace.logger,b=a.active;c=[].concat(c);this.trace(c);a.active=true;d.call(e);this.untrace(c);a.active=b},this)};JS.Method.trace=function(a){var b=a.length;while(b--){a[b].__trace__=true;a[b].resolve()}};JS.Method.untrace=function(a){var b=a.length;while(b--){a[b].__trace__=false;a[b].resolve()}};JS.Module=JS.makeClass();JS.Module.__queue__=[];JS.extend(JS.Module.prototype,{initialize:function(a,b,c){if(typeof a!=='string'){c=arguments[1];b=arguments[0];a=undefined}c=c||{};this.__inc__=[];this.__dep__=[];this.__fns__={};this.__tgt__=c._5;this.__anc__=null;this.__mct__={};this.setName(a);this.include(b,{_0:false});if(JS.Module.__queue__)JS.Module.__queue__.push(this)},setName:function(a){this.displayName=a||'';for(var b in this.__fns__)this.__name__(b);if(a&&this.__meta__)this.__meta__.setName(a+'.')},__name__:function(a){if(!this.displayName)return;var b=this.__fns__[a];if(!b)return;a=this.displayName.replace(JS.END_WITHOUT_DOT,'$1#')+a;if(typeof b.setName==='function')return b.setName(a);if(typeof b==='function')b.displayName=a},define:function(a,b,c){var d=JS.Method.create(this,a,b),e=(c||{})._0;this.__fns__[a]=d;this.__name__(a);if(e!==false)this.resolve()},include:function(a,b){if(!a)return this;var b=b||{},c=b._0!==false,d=a.extend,e=a.include,f,g,h,i,j,k;if(a.__fns__&&a.__inc__){this.__inc__.push(a);if((a.__dep__||{}).push)a.__dep__.push(this);if(f=b._6){if(typeof a.extended==='function')a.extended(f)}else{if(typeof a.included==='function')a.included(this)}}else{if(this.shouldIgnore('extend',d)){i=[].concat(d);for(j=0,k=i.length;j<k;j++)this.extend(i[j])}if(this.shouldIgnore('include',e)){i=[].concat(e);for(j=0,k=i.length;j<k;j++)this.include(i[j],{_0:false})}for(g in a){if(!a.hasOwnProperty(g))continue;h=a[g];if(this.shouldIgnore(g,h))continue;this.define(g,h,{_0:false})}if(a.hasOwnProperty('toString'))this.define('toString',a.toString,{_0:false})}if(c)this.resolve();return this},alias:function(a){for(var b in a){if(!a.hasOwnProperty(b))continue;this.define(b,this.instanceMethod(a[b]),{_0:false})}this.resolve()},resolve:function(a){var a=a||this,b=a.__tgt__,c=this.__inc__,d=this.__fns__,e,f,g,h;if(a===this){this.__anc__=null;this.__mct__={};e=this.__dep__.length;while(e--)this.__dep__[e].resolve()}if(!b)return;for(e=0,f=c.length;e<f;e++)c[e].resolve(a);for(g in d){h=JS.Method.compile(d[g],a);if(b[g]!==h)b[g]=h}if(d.hasOwnProperty('toString'))b.toString=JS.Method.compile(d.toString,a)},shouldIgnore:function(a,b){return(a==='extend'||a==='include')&&(typeof b!=='function'||(b.__fns__&&b.__inc__))},ancestors:function(a){var b=!a,a=a||[],c=this.__inc__;if(b&&this.__anc__)return this.__anc__.slice();for(var d=0,e=c.length;d<e;d++)c[d].ancestors(a);if(JS.indexOf(a,this)<0)a.push(this);if(b)this.__anc__=a.slice();return a},lookup:function(a){var b=this.__mct__[a];if(b&&b.slice)return b.slice();var c=this.ancestors(),d=[],e;for(var f=0,g=c.length;f<g;f++){e=c[f].__fns__;if(e.hasOwnProperty(a))d.push(e[a])}this.__mct__[a]=d.slice();return d},includes:function(a){if(a===this)return true;var b=this.__inc__;for(var c=0,d=b.length;c<d;c++){if(b[c].includes(a))return true}return false},instanceMethod:function(a){return this.lookup(a).pop()},instanceMethods:function(a,b){var c=b||[],d=this.__fns__,e;for(e in d){if(!JS.isType(this.__fns__[e],JS.Method))continue;if(JS.indexOf(c,e)>=0)continue;c.push(e)}if(a!==false){var f=this.ancestors(),g=f.length;while(g--)f[g].instanceMethods(false,c)}return c},match:function(a){return a&&a.isA&&a.isA(this)},toString:function(){return this.displayName}});JS.Kernel=new JS.Module('Kernel',{__eigen__:function(){if(this.__meta__)return this.__meta__;var a=this.toString()+'.';this.__meta__=new JS.Module(a,null,{_5:this});return this.__meta__.include(this.klass,{_0:false})},equals:function(a){return this===a},extend:function(a,b){var c=(b||{})._0;this.__eigen__().include(a,{_6:this,_0:c});return this},hash:function(){return JS.Kernel.hashFor(this)},isA:function(a){return(typeof a==='function'&&this instanceof a)||this.__eigen__().includes(a)},method:function(a){var b=this.__mct__=this.__mct__||{},c=b[a],d=this[a];if(typeof d!=='function')return d;if(c&&d===c._2)return c._7;var e=JS.bind(d,this);b[a]={_2:d,_7:e};return e},methods:function(){return this.__eigen__().instanceMethods()},tap:function(a,b){a.call(b||null,this);return this},toString:function(){if(this.displayName)return this.displayName;var a=this.klass.displayName||this.klass.toString();return'#<'+a+':'+this.hash()+'>'}});(function(){var b=1;JS.Kernel.hashFor=function(a){if(a.__hash__!==undefined)return a.__hash__;a.__hash__=(new Date().getTime()+b).toString(16);b+=1;return a.__hash__}})();JS.Class=JS.makeClass(JS.Module);JS.extend(JS.Class.prototype,{initialize:function(a,b,c,d){if(typeof a!=='string'){d=arguments[2];c=arguments[1];b=arguments[0];a=undefined}if(typeof b!=='function'){d=c;c=b;b=Object}JS.Module.prototype.initialize.call(this,a);d=d||{};var e=JS.makeClass(b);JS.extend(e,this);e.prototype.constructor=e.prototype.klass=e;e.__eigen__().include(b.__meta__,{_0:d._0});e.setName(a);e.__tgt__=e.prototype;var f=(b===Object)?{}:(b.__fns__?b:new JS.Module(b.prototype,{_0:false}));e.include(JS.Kernel,{_0:false}).include(f,{_0:false}).include(c,{_0:false});if(d._0!==false)e.resolve();if(typeof b.inherited==='function')b.inherited(e);return e}});(function(){var e=function(a){var b={},c=a.prototype;for(var d in c){if(!c.hasOwnProperty(d))continue;b[d]=JS.Method.create(a,d,c[d])}return b};var f=function(a,b){var c=JS[a],d=JS[b];c.__inc__=[];c.__dep__=[];c.__fns__=e(c);c.__tgt__=c.prototype;c.prototype.constructor=c.prototype.klass=c;JS.extend(c,JS.Class.prototype);c.include(d||JS.Kernel);c.setName(a);c.constructor=c.klass=JS.Class};f('Method');f('Module');f('Class','Module');var g=JS.Kernel.instanceMethod('__eigen__');g.call(JS.Method);g.call(JS.Module);g.call(JS.Class).include(JS.Module.__meta__)})();JS.NotImplementedError=new JS.Class('NotImplementedError',Error);JS.Method.keyword('callSuper',function(c,d,e,f){var g=d.lookup(c.name),h=g.length-1,i=JS.array(f);return function(){var a=arguments.length;while(a--)i[a]=arguments[a];h-=1;var b=g[h].apply(e,i);h+=1;return b}});JS.Method.keyword('blockGiven',function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity),f=(typeof e[0]==='function');return function(){return f}});JS.Method.keyword('yieldWith',function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity);return function(){if(typeof e[0]!=='function')return;return e[0].apply(e[1]||null,arguments)}});JS.Interface=new JS.Class('Interface',{initialize:function(d){this.test=function(a,b){var c=d.length;while(c--){if(typeof a[d[c]]!=='function')return b?d[c]:false}return true}},extend:{ensure:function(){var a=JS.array(arguments),b=a.shift(),c,d;while(c=a.shift()){d=c.test(b,true);if(d!==true)throw new Error('object does not implement '+d+'()');}}}});JS.Singleton=new JS.Class('Singleton',{initialize:function(a,b,c){return new(new JS.Class(a,b,c))}});

Fiesta.Class = JS.Class;	// Alias

/*	***********
	* Browser *
	***********
	
	This is code to detect your browser and things about it.
	
	Browser detection code is built on rsyring's browser-detect code.
	http://github.com/rsyring/browser-detect	*/

// All of this BrowserDetect stuff is just one-time setup
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "RockMelt",
			identity: "RockMelt"
		},
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

// Get the current browser
Fiesta.getBrowser = function() {
	return BrowserDetect.browser;
};

// Get the browser's version
Fiesta.getBrowserVersion = function() {
	return BrowserDetect.version;
};

// Get the user's OS
Fiesta.getOS = function() {
	return BrowserDetect.OS;
};

// Does my browser support Fiesta?
Fiesta.checkSupport = function() {
	var canvas = !!document.createElement("canvas").getContext;
	var audio = !!document.createElement("audio").canPlayType;
	return (canvas && audio);
};

// Console logs, warnings, and errors
Fiesta.log = function(l) { console.log(l); };
Fiesta.warn = function(w) { console.warn(w); };
Fiesta.error = function(e) { console.error(e); };

/*	******************
	* Math functions *
	******************
	
	These are a number of useful math-type functions.	*/

// Convert rotation measurements
Fiesta.degreesToRadians = function(d) { return (d * Math.PI) / 180; };
Fiesta.radiansToDegrees = function(r) { return (r * 180) / Math.PI; };

// Distances between points (2 and 3 dimensions)
Fiesta.pointDistance2D = function(x1, y1, x2, y2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); };
Fiesta.pointDistance3D = function(x1, y1, z1, x2, y2, z2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)); };

// Vector length
Fiesta.vectorLength = function(i, j, k) {
	if (!k)
		return Fiesta.pointDistance2D(0, 0, i, j);
	return Fiesta.pointDistance3D(0, 0, 0, i, j, k);
};

/*	********************
	* String functions *
	********************
	
	These are functions that deal with strings.	*/

// Get the file extension
Fiesta.getFileExtension = function(filename) {
	var extension = filename.split(".").pop();
	if (extension === filename)	// No extension
		return "";
	else
		return extension.toLowerCase();
};

// Does a string contain another string?
Fiesta.contains = function(str, searching) {
	return (str.indexOf(searching) !== -1);
};

/*	*******************
	* Misc. functions *
	*******************
	
	These are miscellaneous functions that do random things.	*/

// Make a sorta-GUID
Fiesta._guids = [];
Fiesta.guid = function() {
	var guid = Math.floor(Math.random() * Date.now());
	for (var i in this._guids) {
		if (this._guids[i] === guid)
			return this.guid();	// Start over; we already have this GUID
	}
	this._guids.push(guid);
	return guid;
};

/*	************
	* Commands *
	************
	
	This is all the logic for binding user commands (key presses, clicks, etc) to
	methods. This SHOULD work for any object, whether it's Fiesta or not.	*/

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
	
	// Are all my desired modifiers pressed?
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
			Fiesta.error(e);
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
	try {	// Let's try binding it to the playground
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
	if (translations[command])
		return translations[command];
	else
		throw new TypeError(str + " cannot be translated to a keycode");
};

/*	***************
	* Game Object *
	***************
	
	A game object is pretty much anything. It is not physical; that is a Physical Game Object. */

Fiesta.GameObject = new Fiesta.Class({
	
	// Constructor
	initialize: function() {
		this._graphic;
		this._playground;
	},
	
	// Graphic API
	getGraphic: function() { return this._graphic;	},
	setGraphic: function(g) {
		if (g instanceof Fiesta.Graphic)
			this._graphic = g;
		else
			throw new TypeError(g + " is not a graphic");
	},
	
	// Sprite API
	getSprite: function() {
		if (this._graphic instanceof Fiesta.Sprite)
			return this._graphic;
		else
			return false;
	},
	setSprite: function(spr) {
		if (spr instanceof Fiesta.Sprite)
			this._graphic = spr;
		else if ((spr instanceof Image) && (spr.src)) {
			this._graphic = new Fiesta.Sprite(spr.src);
			Fiesta.warn("Was able to translate " + spr.src + " into a Sprite, but it should be a Sprite to begin with");
		}
		else if ((typeof spr === typeof "") && (spr !== "")) {
			this._graphic = new Fiesta.Sprite(spr);
			Fiesta.warn("Was able to translate \"" + spr + "\" into a Sprite, but it should be a Sprite to begin with");
		}
		else
			throw new TypeError(spr + " is not a sprite (nor something I can turn into one)");
	},
	
	// Playground API
	getPlayground: function() {
		if (this._playground)
			return this._playground;
		else
			throw new Error("This object is not yet in a playground");
	},
	_setPlayground: function(p) {
		if (p instanceof Fiesta.Playground)
			this._playground = p;
		else
			throw new TypeError(p + " is not a valid playground");
	},
	
	// Remove me from the playground
	destroy: function() {
		this.getPlayground().destroy(this);
	},
	
	// Events
	onSpawn: function() {},
	onDestroy: function() {},
	onFrame: function() {}
	
});

/*	************************
	* Physical Game Object *
	************************
	
	A physical game object can be seen; it has coordinates, speeds, momenta, and more.	*/

Fiesta.PhysicalGameObject = new Fiesta.Class(Fiesta.GameObject, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._x;
		this._y;
		this._z;
		this._velocityX;
		this._velocityY;
		this._velocityZ;
		this._accelerationX;
		this._accelerationY;
		this._accelerationZ;
		this._frictionX;
		this._frictionY;
		this._frictionZ;
		this._mass;
		this._bounciness;
		this._boundingBoxX1;
		this._boundingBoxY1;
		this._boundingBoxZ1;
		this._boundingBoxX2;
		this._boundingBoxY2;
		this._boundingBoxZ2;
		this._boundingBoxAuto = true;
		
		this.setCoordinates(0, 0, 0);
		this.setVelocityX(0);
		this.setVelocityY(0);
		this.setVelocityZ(0);
		this.setAccelerationX(0);
		this.setAccelerationY(0);
		this.setAccelerationZ(0);
		this.setFrictionX(0);
		this.setFrictionY(0);
		this.setFrictionZ(0);
		this.setMass(1);
		this.setBounciness(1);
		this.updateBoundingBox();
	},
	
	// Location API
	getX: function() { return this._x; },
	getY: function() { return this._y; },
	getZ: function() { return this._z; },
	setX: function(coord) {
		if (typeof coord === typeof 1.0)
			this._x = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setY: function(coord) {
		if (typeof coord === typeof 1.0)
			this._y = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setZ: function(coord) {
		if (typeof coord === typeof 1.0)
			this._z = coord;
		else
			throw new TypeError(coord + " is not a valid Z coordinate");
	},
	setCoordinates: function(xCoord, yCoord, zCoord) {
		if (xCoord !== undefined)
			this.setX(xCoord);
		if (yCoord !== undefined)
			this.setY(yCoord);
		if (zCoord !== undefined)
			this.setZ(zCoord);
	},
	addX: function(a) { this.setX(a + this.getX()) },
	addY: function(a) { this.setY(a + this.getY()) },
	addZ: function(a) { this.setZ(a + this.getZ()) },
	
	// Velocity API
	getVelocityX: function() { return this._velocityX; },
	getVelocityY: function() { return this._velocityY; },
	getVelocityZ: function() { return this._velocityZ; },
	getVelocity: function() { return Fiesta.vectorLength(this._velocityX, this._velocityY, this._velocityZ); },
	setVelocityX: function(v) {
		if (typeof v === typeof 1.0)
			this._velocityX = v;
		else
			throw new TypeError(v + " is not a valid X velocity");
	},
	setVelocityY: function(v) {
		if (typeof v === typeof 1.0)
			this._velocityY = v;
		else
			throw new TypeError(v + " is not a valid Y velocity");
	},
	setVelocityZ: function(v) {
		if (typeof v === typeof 1.0)
			this._velocityZ = v;
		else
			throw new TypeError(v + " is not a valid Z velocity");
	},
	addVelocityX: function(a) { this.setVelocityX(a + this.getVelocityX()) },
	addVelocityY: function(a) { this.setVelocityY(a + this.getVelocityY()) },
	addVelocityZ: function(a) { this.setVelocityZ(a + this.getVelocityZ()) },
	
	// Acceleration API
	getAccelerationX: function() { return this._accelerationX; },
	getAccelerationY: function() { return this._accelerationY; },
	getAccelerationZ: function() { return this._accelerationZ; },
	getAcceleration: function() { return Fiesta.vectorLength(this._accelerationX, this._accelerationY, this._accelerationZ); },
	setAccelerationX: function(a) {
		if (typeof a === typeof 1.0)
			this._accelerationX = a;
		else
			throw new TypeError(a + " is not a valid X acceleration");
	},
	setAccelerationY: function(a) {
		if (typeof a === typeof 1.0)
			this._accelerationY = a;
		else
			throw new TypeError(a + " is not a valid Y acceleration");
	},
	setAccelerationZ: function(a) {
		if (typeof a === typeof 1.0)
			this._accelerationZ = a;
		else
			throw new TypeError(a + " is not a valid Z acceleration");
	},
	addAccelerationX: function(a) { this.setAccelerationX(a + this.getAccelerationX()) },
	addAccelerationY: function(a) { this.setAccelerationY(a + this.getAccelerationY()) },
	addAccelerationZ: function(a) { this.setAccelerationZ(a + this.getAccelerationZ()) },
	
	// Friction API
	getFrictionX: function() { return this._frictionX; },
	getFrictionY: function() { return this._frictionY; },
	getFrictionZ: function() { return this._frictionZ; },
	getFriction: function() { return Fiesta.vectorLength(this._frictionX, this._frictionY, this._frictionZ); },
	setFrictionX: function(f) {
		if (typeof f === typeof 1.0)
			this._frictionX = f;
		else
			throw new TypeError(f + " is not a valid X friction");
	},
	setFrictionY: function(f) {
		if (typeof f === typeof 1.0)
			this._frictionY = f;
		else
			throw new TypeError(f + " is not a valid Y friction");
	},
	setFrictionZ: function(f) {
		if (typeof f === typeof 1.0)
			this._frictionZ = f;
		else
			throw new TypeError(f + " is not a valid Z friction");
	},
	addFrictionX: function(a) { this.setFrictionX(a + this.getFrictionX()) },
	addFrictionY: function(a) { this.setFrictionY(a + this.getFrictionY()) },
	addFrictionZ: function(a) { this.setFrictionZ(a + this.getFrictionZ()) },
	
	// Mass API
	getMass: function() { return this._mass; },
	setMass: function(m) {
		if (typeof m === typeof 1.0)
			this._mass = m;
		else
			throw new TypeError(m + " is not a valid mass");
	},
	addMass: function(a) { this.setMass(a + this.getMass()) },
	
	// Bounciness API
	getBounciness: function() { return this._bounciness; },
	setBounciness: function(b) {
		if (typeof b === typeof 1.0)
			this._bounciness = b;
		else
			throw new TypeError(b + " is not a valid bounciness");
	},
	addBounciness: function(a) { this.setBounciness(a + this.getBounciness()) },
	
	// Bounding box API
	getBoundingBoxX1: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxX1;
	},
	getBoundingBoxY1: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxY1;
	},
	getBoundingBoxZ1: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxZ1;
	},
	getBoundingBoxX2: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxX2;
	},
	getBoundingBoxY2: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxY2;
	},
	getBoundingBoxZ2: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBoxZ2;
	},
	getBoundingBox: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return [this._boundingBoxX1, this._boundingBoxY1, this._boundingBoxZ1, this._boundingBoxX2, this._boundingBoxY2, this._boundingBoxZ2];
	},
	updateBoundingBox: function() {
		if (this._boundingBoxAuto) {
			var context = "2d";	// temporary
			if (context === "2d") {
				if (this.getSprite()) {
					this._boundingBoxX1 = this.getX() - this.getSprite().getOriginX();
					this._boundingBoxY1 = this.getY() - this.getSprite().getOriginY();
					this._boundingBoxZ1 = this.getZ();
					this._boundingBoxX2 = this.getX() + this.getSprite().getOriginX();
					this._boundingBoxY2 = this.getY() + this.getSprite().getOriginY();
					this._boundingBoxZ2 = this._boundingBoxZ1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
				} else {
					this._boundingBoxX1 = this.getX();
					this._boundingBoxY1 = this.getY();
					this._boundingBoxZ1 = this.getZ();
					this._boundingBoxX2 = this._boundingBoxX1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
					this._boundingBoxY2 = this._boundingBoxY1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
					this._boundingBoxZ2 = this._boundingBoxZ1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
				}
				return [this._boundingBoxX1, this._boundingBoxY1, this._boundingBoxZ1, this._boundingBoxX2, this._boundingBoxY2, this._boundingBoxZ2];
			}
		}
	},
	
	// Physics API (extrapolated)
	getMomentum: function() { return this._mass * this.getVelocity(); },
	
	// Do physics stuff on each frame
	onFrame: function() {
		this.callSuper();
		var fps = this.getPlayground().getDesiredFPS();
		this._x += this._velocityX / fps;
		this._y += this._velocityY / fps;
		this._z += this._velocityZ / fps;
		this._velocityX += this._accelerationX / fps;
		this._velocityY += this._accelerationY / fps;
		this._velocityZ += this._accelerationZ / fps;
		if (this._frictionX !== 0) {
			var frictX = this._frictionX / fps;
			if (this._velocityX < 0)
				frictX = frictX * -1;
			if (Math.abs(this._velocityX) > Math.abs(frictX))
				this._velocityX -= frictX;
			else
				this._velocityX = 0;
		}
		if (this._frictionY !== 0) {
			var frictY = this._frictionY / fps;
			if (this._velocityY < 0)
				frictY = frictY * -1;
			if (Math.abs(this._velocityY) > Math.abs(frictY))
				this._velocityY -= frictY;
			else
				this._velocityY = 0;
		}
		if (this._frictionZ !== 0) {
			var frictZ = this._frictionZ / fps;
			if (this.velocityZ < 0)
				frictZ = frictZ * -1;
			if (Math.abs(this._velocityZ) > Math.abs(frictZ))
				this._velocityZ -= frictZ;
			else
				this._velocityZ = 0;
		}
	},
	
	// Some functions that can be overwritten
	onCollide: function() {}
	
});

// Colliding two physical objects
Fiesta.collidePhysicalObjects = function(a, b) {
	var aMass = a.getMass();
	var bMass = b.getMass();
	var bOldVX = b.getVelocityX();
	var bOldVY = b.getVelocityY();
	var bOldVZ = b.getVelocityZ();
	b.setVelocityX(a.getVelocityX() * aMass / bMass);
	b.setVelocityY(a.getVelocityY() * aMass / bMass);
	b.setVelocityZ(a.getVelocityZ() * aMass / bMass);
	a.setVelocityX(bOldVX * bMass / aMass);
	a.setVelocityY(bOldVY * bMass / aMass);
	a.setVelocityZ(bOldVZ * bMass / aMass);
	a.onCollide(b);
	b.onCollide(a);
};

/*	***********
	* Graphic *
	***********
	
	This is the base class for graphics, both 2D and 3D.	*/

Fiesta.Graphic = new Fiesta.Class({
	
	// Empty constructor (needs to be here)
	initialize: function() {},
	
	// This must be implemented or else!
	draw: function() {
		throw new Error("This graphic must know how to draw itself.");
	}
	
});

/*	**************
	* 2D Graphic *
	**************
	
	This is the base class for 2D sprites, 2D text, 2D shapes, et cetera.
	Note: You can't start JavaScript names with a 2, otherwise I would.	*/

Fiesta.Graphic2D = new Fiesta.Class(Fiesta.Graphic, {
	initialize: function() {}
});

/*	**************
	* 3D Graphic *
	**************
	
	This is the base class for 3D graphics.
	Note: You can't start JavaScript names with a 3, otherwise I would.	*/

Fiesta.Graphic3D = new Fiesta.Class(Fiesta.Graphic, {
	initialize: function() {}
});

/*	**********
	* Sprite *
	**********
	
	A sprite is an image that can be displayed.	*/

Fiesta.Sprite = new Fiesta.Class(Fiesta.Graphic2D, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._urls = [];
		this._currentIndex = 0;
		this._animateSpeed = 30;
		this._originX;
		this._originY;
		
		if (arguments)
			this.setURLs(arguments);
		this.setOrigin(0, 0);
		this.setIndex(0);
	},
	
	// Origin API
	getOriginX: function() { return this._originX; },
	getOriginY: function() { return this._originY; },
	setOriginX: function(coord) {
		if (typeof coord === typeof 1.0)
			this._originX = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setOriginY: function(coord) {
		if (typeof coord === typeof 1.0)
			this._originY = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setOrigin: function(xCoord, yCoord) {
		this.setOriginX(xCoord);
		this.setOriginY(yCoord);
	},
	
	// Sprite URL(s) API
	getURLs: function() { return this._urls; },
	setURLs: function() {
		var u = arguments[0];
		if (u.length < 1)
			throw new TypeError("You cannot set sprites to nothing");
		this._urls.length = 0;	// Empty it out
		for (var i = 0; i < u.length; i ++) {
			if (typeof u[i] === typeof "") {
				this._urls[i] = u[i];
				var img = new Image();	// Preloadin'
				img.src = u[i];
			}
			else
				throw new TypeError(u[i] + " is not a valid sprite URL");
		}
		if (this._urls.length > 1)
			this.animate();
	},
	
	// Animation API
	animate: function() {
		this._currentIndex ++;
		if (this._currentIndex >= this._urls.length)
			this._currentIndex = 0;
		var me = this;	// I have to do this for the setTimeout
		if (this._animateSpeed > 0)
			setTimeout(function() { me.animate() }, this._animateSpeed);
	},
	getIndex: function() { return this._currentIndex; },
	setIndex: function(i) {
		if ((typeof i === typeof 1) && ((Math.ceil(i) !== i) || i === 0)) {
			if (i < this._urls.length)
				this._currentIndex = i;
			else {
				setIndex(i - this._urls.length);
				Fiesta.warn("Tried to set Sprite index to " + i + ", but the max is " + (this._urls.length - 1) + "; was able to wrap around.");
			}
		}
		else
			throw new TypeError(i + " is not a valid index");
	},
	getAnimateSpeed: function() { return this._animateSpeed; },
	setAnimateSpeed: function(a) {
		if ((typeof a !== typeof 1.0) && (a >= 0))
			this._animateSpeed = a;
		else
			throw new TypeError(a + " is not a valid animation speed");
	},
	stopAnimation: function() { this._animateSpeed = 0; },
	
	// Get my Image() -- this also preloads!
	getImage: function() {
		var img = new Image();
		if (this._urls)
			img.src = this._urls[this._currentIndex];
		return img;
	},
	
	// Draw me
	draw: function(playground, xCoord, yCoord, spriteWidth, spriteHeight) {
		if (!(playground instanceof Fiesta.Playground))
			throw new TypeError(playground + " is not a playground that I can draw sprites on");
		if (typeof xCoord !== typeof 1.0)
			throw new TypeError(xCoord + " is not a valid X coordinate");
		if (typeof yCoord !== typeof 1.0)
			throw new TypeError(yCoord + " is not a valid Y coordinate");
		var image = this.getImage();
		if (!spriteWidth)
			spriteWidth = image.width;
		if (!spriteHeight)
			spriteHeight = image.height;
		var context = playground.getContext();
		context.drawImage(image, xCoord - this.getOriginX(), yCoord - this.getOriginY(), spriteWidth, spriteHeight);	
	}
	
});

/*	*********
	* Sound *
	*********
	
	A sound is...well, a sound.	*/

Fiesta.Sound = new Fiesta.Class({
	
	// Constructor
	initialize: function(sources) {
		this._files = [];
		this._element;
		
		this.setFiles(sources);
	},
	
	// Sources API
	setFiles: function(sources) {
		if (typeof sources === typeof "") {
			if (Fiesta.getFileExtension(sources) === "") {
				var soundExtensions = ["ogg", "wav", "mp3"];
				for (var i in soundExtensions)
					this._files.push(sources + "." + soundExtensions[i]);
			} else
				this._files = [sources];
		}
		else if (typeof sources === typeof [])
			this._files = sources;
		else
			throw new Error(sources + " isn't something I can make a sound out of.");
	},
	
	// Play!
	// I've tried better ways to do this (ie, using HTML5's play() on the
	// existing element), but those don't seem to work as reliably.
	play: function() {
		if (this._element)
			document.getElementsByTagName("body")[0].removeChild(this._element);
		var audio = document.createElement("audio");
		audio.setAttribute("autoplay", "autoplay");
		for (var i in this._files) {
			var source = document.createElement("source");
			source.setAttribute("src", this._files[i]);
			audio.appendChild(source);
		}
		document.getElementsByTagName("body")[0].appendChild(audio);
		this._element = audio;
	}
	
});

/*	**************
	* Playground *
	**************
	
	A playground is a place where Game Objects are.	*/

Fiesta.Playground = new Fiesta.Class({
	
	// Constructor
	initialize: function(theWidth, theHeight, theContext, framerate) {
		this._gameObjects = [];
		
		this._width;
		this._height;
		this._element;
		this._desiredFPS;
		this._context;
		this._redraw;
		this._timePlaced;
		
		if (theContext)
			this.setContext(theContext);
		else
			this.setContext(Fiesta.PLAYGROUND_DEFAULT_CONTEXT);
		if (framerate)
			this.setDesiredFPS(framerate);
		else
			this.setDesiredFPS(Fiesta.PLAYGROUND_DEFAULT_FPS);
		if (theWidth && theHeight)
			this.setSize(theWidth, theHeight);
		else
			this.setSize(Fiesta.PLAYGROUND_DEFAULT_WIDTH, Fiesta.PLAYGROUND_DEFAULT_HEIGHT);
		this.setRedraw(Fiesta.PLAYGROUND_DEFAULT_REDRAW);
	},
	
	// Size API
	getWidth: function() { return this._width; },
	getHeight: function() { return this._height; },
	setWidth: function(w) {
		if ((typeof w === typeof 1) && (w >= 0)) {
			this._width = w;
			if (this._element)
				this._element.setAttribute("width", this._width);
		}
		else
			throw new TypeError(w + " is not a valid playground width");
	},
	setHeight: function(h) {
		if ((typeof h === typeof 1) && (h >= 0)) {
			this._height = h;
			if (this._element)
				this._element.setAttribute("height", this._height);
		}
		else
			throw new TypeError(h + " is not a valid playground height");
	},
	setSize: function(w, h) {
		this.setWidth(w);
		this.setHeight(h);
	},
	
	// FPS API
	getDesiredFPS: function() { return this._desiredFPS; },
	setDesiredFPS: function(f) {
		if ((typeof f === typeof 1) && (f >= 0)) {
			this._desiredFPS = f;
		}
		else
			throw new TypeError(f + " is not a valid framerate");
	},
	
	// Redraw API
	getRedraw: function() { return this._redraw; },
	setRedraw: function(r) {
		if (typeof r === typeof true)
			this._redraw = r;
		else
			throw new TypeError("Cannot set redrawing to " + r);
	},
	
	// DOM API
	place: function(domElement) {
		if (!(domElement instanceof HTMLElement))
			throw new TypeError("Playground cannot be placed in " + domElement);
		
		this._element = document.createElement("canvas");
		this._element.setAttribute("class", "fiesta_playground");
		this._element.style.overflow = "hidden";
		this._element.setAttribute("width", this._width);
		this._element.setAttribute("height", this._height);
		domElement.appendChild(this._element);
		
		this.placeTime = Date.now();
		this.frame();
		
		return this._element;
	},
	domElementExists: function() { return !!this._element },
	getDOMElement: function() {
		if (this._element)
			return this._element;
		else
			throw new Error("This playground is not yet in the DOM, so we can't talk to it");
	},
	getContext: function() { return this._element.getContext(this._context) },
	setContext: function(c) {
		if ((typeof c === typeof "") && ((c.toLowerCase() === "2d") || (c.toLowerCase() === "3d")))
			this._context = c;
		else
			throw new Error(c + " is not a valid context");
	},
	getTimePlaced: function() {
		if (this._timePlaced)
			return this._timePlaced;
		else
			return false;
	},
	getBackgroundColor: function() {
		if (this.domElementExists())
			return this.getDOMElement().style.backgroundColor;
		else
			return false;
	},
	setBackgroundColor: function(color) {
		if (typeof color !== typeof "")
			throw new TypeError(color + " is not a valid color");
		if (this.domElementExists()) {
			if (color.substring(0, 1) !== "#")
				color = "#" + color;
			this.getDOMElement().style.backgroundColor = color;
		}
	},
	
	// Object API
	spawn: function(object) {
		if (object instanceof Fiesta.GameObject) {
			this._gameObjects.push(object);
			object._setPlayground(this);
			object.onSpawn();
		}
		else
			throw new TypeError(object + " is not something that can be spawned");
	},
	destroy: function(object) {
		if (object instanceof Fiesta.GameObject) {
			var location = this._gameObjects.indexOf(object);
			if (location !== -1) {
				this._gameObjects.splice(location, 1);
				object.onDestroy();
			}
			else
				throw new Error("Looks like there is no object " + object + " to destroy");
		}
		else
			throw new TypeError(object + " is not something that can be destroyed");
	},
	
	// Do this every frame
	frame: function() {
		
		// Prepare the next frame
		var thisObject = this;	// So the next statement works
		setTimeout(function() { thisObject.frame() }, 1000 / this.getDesiredFPS());
		
		// Redraw (if I should, of course)
		if (this.getRedraw())
			this.getContext().clearRect(0, 0, this._width, this._height);
		
		// Deal with every object
		// The pieces are in try/catch blocks so that one object doesn't break
		// everything for everyone else
		for (var i = 0; i < this._gameObjects.length; i ++) {
			
			// Draw the object
			try {
				var obj = this._gameObjects[i];
				if (obj instanceof Fiesta.PhysicalGameObject)
					obj.getGraphic().draw(this, obj.getX(), obj.getY());
			} catch (e) { Fiesta.error(e) }
			
			// Collisions
			try {
				if (obj instanceof Fiesta.PhysicalGameObject) {
					var objBound = obj.getBoundingBox();
					for (var j = i + 1; j < this._gameObjects.length; j ++) {
						var obj2 = this._gameObjects[j];
						if (obj2 instanceof Fiesta.PhysicalGameObject) {
							var obj2Bound = obj2.getBoundingBox();
							if (!(obj2Bound[0] > objBound[3]
								||
								obj2Bound[3] < objBound[0]
								||
								obj2Bound[1] > objBound[4]
								||
								obj2Bound[4] < objBound[1]
								||
								obj2Bound[2] > objBound[5]
								||
								obj2Bound[5] < objBound[2])) {
								Fiesta.collidePhysicalObjects(obj, obj2);
							}
						}
					}
				}
			} catch (e) { Fiesta.error(e) }
			
			// Do the onFrame stuff
			try {
				obj.onFrame();
			} catch (e) { Fiesta.error(e) }
			
		}
	}
	
});