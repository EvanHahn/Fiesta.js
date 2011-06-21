/*	###############
	## FIESTA.JS ##
	###############
	
	version 0.2.0
	
	Fiesta.js is a JavaScript game engine. It aims to be SUPER BADASS.
	
	For licensing info:
	https://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt
	
	¡Disfruta!	*/

var Fiesta = {};

/*	**********
	* Config *
	**********	*/

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

/*	***********
	* Classes *
	***********

	This is JS.Class version 3.0.0's core.js. See LICENSE.txt for license info.	*/

(function(){var a=(typeof this.global==='object')?this.global:this;a.JS=a.JS||{};JS.ENV=a})();JS.END_WITHOUT_DOT=/([^\.])$/;JS.array=function(a){var b=[],c=a.length;while(c--)b[c]=a[c];return b};JS.bind=function(a,b){return function(){return a.apply(b,arguments)}};JS.extend=function(a,b,c){if(!a||!b)return a;for(var d in b){if(a[d]===b[d])continue;if(c===false&&a.hasOwnProperty(d))continue;a[d]=b[d]}return a};JS.indexOf=function(a,b){if(a.indexOf)return a.indexOf(b);var c=a.length;while(c--){if(a[c]===b)return c}return-1};JS.isType=function(a,b){if(typeof b==='string')return typeof a===b;if(a===null||a===undefined)return false;return(typeof b==='function'&&a instanceof b)||(a.isA&&a.isA(b))||a.constructor===b};JS.makeBridge=function(a){var b=function(){};b.prototype=a.prototype;return new b()};JS.makeClass=function(a){a=a||Object;var b=function(){return this.initialize?this.initialize.apply(this,arguments)||this:this};b.prototype=JS.makeBridge(a);b.superclass=a;b.subclasses=[];if(a.subclasses)a.subclasses.push(b);return b};JS.match=function(a,b){if(b===undefined)return false;return typeof a.test==='function'?a.test(b):a.match(b)};JS.Method=JS.makeClass();JS.extend(JS.Method.prototype,{initialize:function(a,b,c){this.module=a;this.name=b;this.callable=c;this._1={};if(typeof c!=='function')return;this.arity=c.length;var d=c.toString().match(/\b[a-z\_\$][a-z0-9\_\$]*\b/ig),e=d.length;while(e--)this._1[d[e]]=true},setName:function(a){this.callable.displayName=this.displayName=a},contains:function(a){return this._1.hasOwnProperty(a)},call:function(){return this.callable.call.apply(this.callable,arguments)},apply:function(a,b){return this.callable.apply(a,b)},compile:function(h){var i=this,j=i.module.__trace__||h.__trace__,k=i.callable,q=i._1,n=JS.Method._3,o=n.length,l=[],m;while(o--){m=n[o];if(q[m.name])l.push(m)}if(l.length===0&&!j)return k;var p=function(){var a=l.length,b=a,c={},d,e,f;while(b--){d=l[b];e=this[d.name];if(e&&!e.__kwd__)continue;c[d.name]={_2:e,_4:this.hasOwnProperty(d.name)};f=d.filter(i,h,this,arguments);f.__kwd__=true;this[d.name]=f}var g=k.apply(this,arguments),b=a;while(b--){d=l[b];if(!c[d.name])continue;if(c[d.name]._4)this[d.name]=c[d.name]._2;else delete this[d.name]}return g};if(j)return JS.StackTrace.wrap(p,i,h);return p},toString:function(){var a=this.displayName||(this.module.toString()+'#'+this.name);return'#<Method:'+a+'>'}});JS.Method.create=function(a,b,c){if(c&&c.__inc__&&c.__fns__)return c;var d=(typeof c!=='function')?c:new this(a,b,c);this.notify(d);return d};JS.Method.compile=function(a,b){return a&&a.compile?a.compile(b):a};JS.Method.__listeners__=[];JS.Method.added=function(a,b){this.__listeners__.push([a,b])};JS.Method.notify=function(a){var b=this.__listeners__,c=b.length,d;while(c--){d=b[c];d[0].call(d[1],a)}};JS.Method._3=[];JS.Method.keyword=function(a,b){this._3.push({name:a,filter:b})};JS.Method.tracing=function(c,d,e){JS.require('JS.StackTrace',function(){var a=JS.StackTrace.logger,b=a.active;c=[].concat(c);this.trace(c);a.active=true;d.call(e);this.untrace(c);a.active=b},this)};JS.Method.trace=function(a){var b=a.length;while(b--){a[b].__trace__=true;a[b].resolve()}};JS.Method.untrace=function(a){var b=a.length;while(b--){a[b].__trace__=false;a[b].resolve()}};JS.Module=JS.makeClass();JS.Module.__queue__=[];JS.extend(JS.Module.prototype,{initialize:function(a,b,c){if(typeof a!=='string'){c=arguments[1];b=arguments[0];a=undefined}c=c||{};this.__inc__=[];this.__dep__=[];this.__fns__={};this.__tgt__=c._5;this.__anc__=null;this.__mct__={};this.setName(a);this.include(b,{_0:false});if(JS.Module.__queue__)JS.Module.__queue__.push(this)},setName:function(a){this.displayName=a||'';for(var b in this.__fns__)this.__name__(b);if(a&&this.__meta__)this.__meta__.setName(a+'.')},__name__:function(a){if(!this.displayName)return;var b=this.__fns__[a];if(!b)return;a=this.displayName.replace(JS.END_WITHOUT_DOT,'$1#')+a;if(typeof b.setName==='function')return b.setName(a);if(typeof b==='function')b.displayName=a},define:function(a,b,c){var d=JS.Method.create(this,a,b),e=(c||{})._0;this.__fns__[a]=d;this.__name__(a);if(e!==false)this.resolve()},include:function(a,b){if(!a)return this;var b=b||{},c=b._0!==false,d=a.extend,e=a.include,f,g,h,i,j,k;if(a.__fns__&&a.__inc__){this.__inc__.push(a);if((a.__dep__||{}).push)a.__dep__.push(this);if(f=b._6){if(typeof a.extended==='function')a.extended(f)}else{if(typeof a.included==='function')a.included(this)}}else{if(this.shouldIgnore('extend',d)){i=[].concat(d);for(j=0,k=i.length;j<k;j++)this.extend(i[j])}if(this.shouldIgnore('include',e)){i=[].concat(e);for(j=0,k=i.length;j<k;j++)this.include(i[j],{_0:false})}for(g in a){if(!a.hasOwnProperty(g))continue;h=a[g];if(this.shouldIgnore(g,h))continue;this.define(g,h,{_0:false})}if(a.hasOwnProperty('toString'))this.define('toString',a.toString,{_0:false})}if(c)this.resolve();return this},alias:function(a){for(var b in a){if(!a.hasOwnProperty(b))continue;this.define(b,this.instanceMethod(a[b]),{_0:false})}this.resolve()},resolve:function(a){var a=a||this,b=a.__tgt__,c=this.__inc__,d=this.__fns__,e,f,g,h;if(a===this){this.__anc__=null;this.__mct__={};e=this.__dep__.length;while(e--)this.__dep__[e].resolve()}if(!b)return;for(e=0,f=c.length;e<f;e++)c[e].resolve(a);for(g in d){h=JS.Method.compile(d[g],a);if(b[g]!==h)b[g]=h}if(d.hasOwnProperty('toString'))b.toString=JS.Method.compile(d.toString,a)},shouldIgnore:function(a,b){return(a==='extend'||a==='include')&&(typeof b!=='function'||(b.__fns__&&b.__inc__))},ancestors:function(a){var b=!a,a=a||[],c=this.__inc__;if(b&&this.__anc__)return this.__anc__.slice();for(var d=0,e=c.length;d<e;d++)c[d].ancestors(a);if(JS.indexOf(a,this)<0)a.push(this);if(b)this.__anc__=a.slice();return a},lookup:function(a){var b=this.__mct__[a];if(b&&b.slice)return b.slice();var c=this.ancestors(),d=[],e;for(var f=0,g=c.length;f<g;f++){e=c[f].__fns__;if(e.hasOwnProperty(a))d.push(e[a])}this.__mct__[a]=d.slice();return d},includes:function(a){if(a===this)return true;var b=this.__inc__;for(var c=0,d=b.length;c<d;c++){if(b[c].includes(a))return true}return false},instanceMethod:function(a){return this.lookup(a).pop()},instanceMethods:function(a,b){var c=b||[],d=this.__fns__,e;for(e in d){if(!JS.isType(this.__fns__[e],JS.Method))continue;if(JS.indexOf(c,e)>=0)continue;c.push(e)}if(a!==false){var f=this.ancestors(),g=f.length;while(g--)f[g].instanceMethods(false,c)}return c},match:function(a){return a&&a.isA&&a.isA(this)},toString:function(){return this.displayName}});JS.Kernel=new JS.Module('Kernel',{__eigen__:function(){if(this.__meta__)return this.__meta__;var a=this.toString()+'.';this.__meta__=new JS.Module(a,null,{_5:this});return this.__meta__.include(this.klass,{_0:false})},equals:function(a){return this===a},extend:function(a,b){var c=(b||{})._0;this.__eigen__().include(a,{_6:this,_0:c});return this},hash:function(){return JS.Kernel.hashFor(this)},isA:function(a){return(typeof a==='function'&&this instanceof a)||this.__eigen__().includes(a)},method:function(a){var b=this.__mct__=this.__mct__||{},c=b[a],d=this[a];if(typeof d!=='function')return d;if(c&&d===c._2)return c._7;var e=JS.bind(d,this);b[a]={_2:d,_7:e};return e},methods:function(){return this.__eigen__().instanceMethods()},tap:function(a,b){a.call(b||null,this);return this},toString:function(){if(this.displayName)return this.displayName;var a=this.klass.displayName||this.klass.toString();return'#<'+a+':'+this.hash()+'>'}});(function(){var b=1;JS.Kernel.hashFor=function(a){if(a.__hash__!==undefined)return a.__hash__;a.__hash__=(new Date().getTime()+b).toString(16);b+=1;return a.__hash__}})();JS.Class=JS.makeClass(JS.Module);JS.extend(JS.Class.prototype,{initialize:function(a,b,c,d){if(typeof a!=='string'){d=arguments[2];c=arguments[1];b=arguments[0];a=undefined}if(typeof b!=='function'){d=c;c=b;b=Object}JS.Module.prototype.initialize.call(this,a);d=d||{};var e=JS.makeClass(b);JS.extend(e,this);e.prototype.constructor=e.prototype.klass=e;e.__eigen__().include(b.__meta__,{_0:d._0});e.setName(a);e.__tgt__=e.prototype;var f=(b===Object)?{}:(b.__fns__?b:new JS.Module(b.prototype,{_0:false}));e.include(JS.Kernel,{_0:false}).include(f,{_0:false}).include(c,{_0:false});if(d._0!==false)e.resolve();if(typeof b.inherited==='function')b.inherited(e);return e}});(function(){var e=function(a){var b={},c=a.prototype;for(var d in c){if(!c.hasOwnProperty(d))continue;b[d]=JS.Method.create(a,d,c[d])}return b};var f=function(a,b){var c=JS[a],d=JS[b];c.__inc__=[];c.__dep__=[];c.__fns__=e(c);c.__tgt__=c.prototype;c.prototype.constructor=c.prototype.klass=c;JS.extend(c,JS.Class.prototype);c.include(d||JS.Kernel);c.setName(a);c.constructor=c.klass=JS.Class};f('Method');f('Module');f('Class','Module');var g=JS.Kernel.instanceMethod('__eigen__');g.call(JS.Method);g.call(JS.Module);g.call(JS.Class).include(JS.Module.__meta__)})();JS.NotImplementedError=new JS.Class('NotImplementedError',Error);JS.Method.keyword('callSuper',function(c,d,e,f){var g=d.lookup(c.name),h=g.length-1,i=JS.array(f);return function(){var a=arguments.length;while(a--)i[a]=arguments[a];h-=1;var b=g[h].apply(e,i);h+=1;return b}});JS.Method.keyword('blockGiven',function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity),f=(typeof e[0]==='function');return function(){return f}});JS.Method.keyword('yieldWith',function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity);return function(){if(typeof e[0]!=='function')return;return e[0].apply(e[1]||null,arguments)}});JS.Interface=new JS.Class('Interface',{initialize:function(d){this.test=function(a,b){var c=d.length;while(c--){if(typeof a[d[c]]!=='function')return b?d[c]:false}return true}},extend:{ensure:function(){var a=JS.array(arguments),b=a.shift(),c,d;while(c=a.shift()){d=c.test(b,true);if(d!==true)throw new Error('object does not implement '+d+'()');}}}});JS.Singleton=new JS.Class('Singleton',{initialize:function(a,b,c){return new(new JS.Class(a,b,c))}});

Fiesta.Class = JS.Class;	// Alias

/*	*************
	* 3D engine *
	*************
	
	This is Three.js r41/ROME. See LICENSE.txt for more info.	*/

var THREE=THREE||{};if(!window.Int32Array)window.Int32Array=Array,window.Float32Array=Array;THREE.Color=function(b){this.setHex(b)}; THREE.Color.prototype={copy:function(b){this.r=b.r;this.g=b.g;this.b=b.b;this.hex=b.hex},setHex:function(b){this.hex=~~b&16777215;this.updateRGB()},setRGB:function(b,d,e){this.r=b;this.g=d;this.b=e;this.updateHex()},setHSV:function(b,d,e){var f,h,i,g,j,p;if(e==0)f=h=i=0;else switch(g=Math.floor(b*6),j=b*6-g,b=e*(1-d),p=e*(1-d*j),d=e*(1-d*(1-j)),g){case 1:f=p;h=e;i=b;break;case 2:f=b;h=e;i=d;break;case 3:f=b;h=p;i=e;break;case 4:f=d;h=b;i=e;break;case 5:f=e;h=b;i=p;break;case 6:case 0:f=e,h=d,i=b}this.setRGB(f, h,i)},updateHex:function(){this.hex=~~(this.r*255)<<16^~~(this.g*255)<<8^~~(this.b*255)},updateRGB:function(){this.r=(this.hex>>16&255)/255;this.g=(this.hex>>8&255)/255;this.b=(this.hex&255)/255},clone:function(){return new THREE.Color(this.hex)}};THREE.Vector2=function(b,d){this.set(b||0,d||0)}; THREE.Vector2.prototype={set:function(b,d){this.x=b;this.y=d;return this},copy:function(b){this.x=b.x;this.y=b.y;return this},clone:function(){return new THREE.Vector2(this.x,this.y)},add:function(b,d){this.x=b.x+d.x;this.y=b.y+d.y;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;return this},sub:function(b,d){this.x=b.x-d.x;this.y=b.y-d.y;return this},subSelf:function(b){this.x-=b.x;this.y-=b.y;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;return this},divideScalar:function(b){b? (this.x/=b,this.y/=b):this.set(0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(b){return Math.sqrt(this.distanceToSquared(b))},distanceToSquared:function(b){var d=this.x-b.x,b=this.y-b.y;return d*d+b*b},setLength:function(b){return this.normalize().multiplyScalar(b)}, unit:function(){return this.normalize()},equals:function(b){return b.x==this.x&&b.y==this.y}};THREE.Vector3=function(b,d,e){this.set(b||0,d||0,e||0)}; THREE.Vector3.prototype={set:function(b,d,e){this.x=b;this.y=d;this.z=e;return this},copy:function(b){this.x=b.x;this.y=b.y;this.z=b.z;return this},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)},add:function(b,d){this.x=b.x+d.x;this.y=b.y+d.y;this.z=b.z+d.z;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;this.z+=b.z;return this},addScalar:function(b){this.x+=b;this.y+=b;this.z+=b;return this},sub:function(b,d){this.x=b.x-d.x;this.y=b.y-d.y;this.z=b.z-d.z;return this},subSelf:function(b){this.x-= b.x;this.y-=b.y;this.z-=b.z;return this},multiply:function(b,d){this.x=b.x*d.x;this.y=b.y*d.y;this.z=b.z*d.z;return this},multiplySelf:function(b){this.x*=b.x;this.y*=b.y;this.z*=b.y;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;this.z*=b;return this},divideSelf:function(b){return this.divide(this,b)},divideScalar:function(b){b?(this.x/=b,this.y/=b,this.z/=b):this.set(0,0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y+this.z* b.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.lengthSq())},lengthManhattan:function(){return this.x+this.y+this.z},normalize:function(){return this.divideScalar(this.length())},setLength:function(b){return this.normalize().multiplyScalar(b)},cross:function(b,d){this.x=b.y*d.z-b.z*d.y;this.y=b.z*d.x-b.x*d.z;this.z=b.x*d.y-b.y*d.x;return this},crossSelf:function(b){return this.set(this.y*b.z-this.z*b.y,this.z*b.x-this.x*b.z,this.x* b.y-this.y*b.x)},distanceTo:function(b){return Math.sqrt(this.distanceToSquared(b))},distanceToSquared:function(b){return(new THREE.Vector3).sub(this,b).lengthSq()},setPositionFromMatrix:function(b){this.x=b.n14;this.y=b.n24;this.z=b.n34},setRotationFromMatrix:function(b){var d=Math.cos(this.y);this.y=Math.asin(b.n13);Math.abs(d)>1.0E-5?(this.x=Math.atan2(-b.n23/d,b.n33/d),this.z=Math.atan2(-b.n12/d,b.n11/d)):(this.x=0,this.z=Math.atan2(b.n21,b.n22))},isZero:function(){return this.lengthSq()<1.0E-4}}; THREE.Vector4=function(b,d,e,f){this.set(b||0,d||0,e||0,f||1)}; THREE.Vector4.prototype={set:function(b,d,e,f){this.x=b;this.y=d;this.z=e;this.w=f;return this},copy:function(b){return this.set(b.x,b.y,b.z,b.w||1)},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)},add:function(b,d){this.x=b.x+d.x;this.y=b.y+d.y;this.z=b.z+d.z;this.w=b.w+d.w;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;this.z+=b.z;this.w+=b.w;return this},sub:function(b,d){this.x=b.x-d.x;this.y=b.y-d.y;this.z=b.z-d.z;this.w=b.w-d.w;return this},subSelf:function(b){this.x-= b.x;this.y-=b.y;this.z-=b.z;this.w-=b.w;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;this.z*=b;this.w*=b;return this},divideScalar:function(b){b?(this.x/=b,this.y/=b,this.z/=b,this.w/=b):this.set(0,0,0,1);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y+this.z*b.z+this.w*b.w},lengthSq:function(){return this.dot(this)},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())}, setLength:function(b){return this.normalize().multiplyScalar(b)},lerpSelf:function(b,d){this.x+=(b.x-this.x)*d;this.y+=(b.y-this.y)*d;this.z+=(b.z-this.z)*d;this.w+=(b.w-this.w)*d;return this}};THREE.Ray=function(b,d){this.origin=b||new THREE.Vector3;this.direction=d||new THREE.Vector3}; THREE.Ray.prototype={intersectScene:function(b){return this.intersectObjects(b.objects)},intersectObjects:function(b){var d,e,f=[];d=0;for(e=b.length;d<e;d++)f=f.concat(this.intersectObject(b[d]));f.sort(function(b,d){return b.distance-d.distance});return f},intersectObject:function(b){function d(b,d,e){var f;f=e.position.clone().subSelf(b).dot(d);b=b.clone().addSelf(d.clone().multiplyScalar(f));return e.position.distanceTo(b)}function e(b,d,e,f){var f=f.clone().subSelf(d),e=e.clone().subSelf(d), h=b.clone().subSelf(d),b=f.dot(f),d=f.dot(e),f=f.dot(h),g=e.dot(e),e=e.dot(h),h=1/(b*g-d*d),g=(g*f-d*e)*h,b=(b*e-d*f)*h;return g>0&&b>0&&g+b<1}if(b instanceof THREE.Particle){var f=d(this.origin,this.direction,b);if(!f||f>b.scale.x)return[];return[{distance:f,point:b.position,face:null,object:b}]}else if(b instanceof THREE.Mesh){f=d(this.origin,this.direction,b);if(!f||f>b.geometry.boundingSphere.radius*Math.max(b.scale.x,Math.max(b.scale.y,b.scale.z)))return[];var h,i,g,j,p,k,n,v,r,q,y=b.geometry, B=y.vertices,D=[],f=0;for(h=y.faces.length;f<h;f++)if(i=y.faces[f],r=this.origin.clone(),q=this.direction.clone(),k=b.matrixWorld,g=k.multiplyVector3(B[i.a].position.clone()),j=k.multiplyVector3(B[i.b].position.clone()),p=k.multiplyVector3(B[i.c].position.clone()),k=i instanceof THREE.Face4?k.multiplyVector3(B[i.d].position.clone()):null,n=b.matrixRotationWorld.multiplyVector3(i.normal.clone()),v=q.dot(n),b.doubleSided||(b.flipSided?v>0:v<0))if(n=n.dot((new THREE.Vector3).sub(g,r))/v,r=r.addSelf(q.multiplyScalar(n)), i instanceof THREE.Face3)e(r,g,j,p)&&(i={distance:this.origin.distanceTo(r),point:r,face:i,object:b},D.push(i));else if(i instanceof THREE.Face4&&(e(r,g,j,k)||e(r,j,p,k)))i={distance:this.origin.distanceTo(r),point:r,face:i,object:b},D.push(i);return D}else return[]}}; THREE.Rectangle=function(){function b(){i=f-d;g=h-e}var d,e,f,h,i,g,j=!0;this.getX=function(){return d};this.getY=function(){return e};this.getWidth=function(){return i};this.getHeight=function(){return g};this.getLeft=function(){return d};this.getTop=function(){return e};this.getRight=function(){return f};this.getBottom=function(){return h};this.set=function(g,i,n,v){j=!1;d=g;e=i;f=n;h=v;b()};this.addPoint=function(g,i){j?(j=!1,d=g,e=i,f=g,h=i):(d=d<g?d:g,e=e<i?e:i,f=f>g?f:g,h=h>i?h:i);b()};this.add3Points= function(g,i,n,v,r,q){j?(j=!1,d=g<n?g<r?g:r:n<r?n:r,e=i<v?i<q?i:q:v<q?v:q,f=g>n?g>r?g:r:n>r?n:r,h=i>v?i>q?i:q:v>q?v:q):(d=g<n?g<r?g<d?g:d:r<d?r:d:n<r?n<d?n:d:r<d?r:d,e=i<v?i<q?i<e?i:e:q<e?q:e:v<q?v<e?v:e:q<e?q:e,f=g>n?g>r?g>f?g:f:r>f?r:f:n>r?n>f?n:f:r>f?r:f,h=i>v?i>q?i>h?i:h:q>h?q:h:v>q?v>h?v:h:q>h?q:h);b()};this.addRectangle=function(g){j?(j=!1,d=g.getLeft(),e=g.getTop(),f=g.getRight(),h=g.getBottom()):(d=d<g.getLeft()?d:g.getLeft(),e=e<g.getTop()?e:g.getTop(),f=f>g.getRight()?f:g.getRight(),h=h> g.getBottom()?h:g.getBottom());b()};this.inflate=function(g){d-=g;e-=g;f+=g;h+=g;b()};this.minSelf=function(g){d=d>g.getLeft()?d:g.getLeft();e=e>g.getTop()?e:g.getTop();f=f<g.getRight()?f:g.getRight();h=h<g.getBottom()?h:g.getBottom();b()};this.instersects=function(b){return Math.min(f,b.getRight())-Math.max(d,b.getLeft())>=0&&Math.min(h,b.getBottom())-Math.max(e,b.getTop())>=0};this.empty=function(){j=!0;h=f=e=d=0;b()};this.isEmpty=function(){return j}};THREE.Matrix3=function(){this.m=[]}; THREE.Matrix3.prototype={transpose:function(){var b,d=this.m;b=d[1];d[1]=d[3];d[3]=b;b=d[2];d[2]=d[6];d[6]=b;b=d[5];d[5]=d[7];d[7]=b;return this},transposeIntoArray:function(b){var d=this.m;b[0]=d[0];b[1]=d[3];b[2]=d[6];b[3]=d[1];b[4]=d[4];b[5]=d[7];b[6]=d[2];b[7]=d[5];b[8]=d[8];return this}};THREE.Matrix4=function(b,d,e,f,h,i,g,j,p,k,n,v,r,q,y,B){this.set(b||1,d||0,e||0,f||0,h||0,i||1,g||0,j||0,p||0,k||0,n||1,v||0,r||0,q||0,y||0,B||1);this.flat=Array(16);this.m33=new THREE.Matrix3}; THREE.Matrix4.prototype={set:function(b,d,e,f,h,i,g,j,p,k,n,v,r,q,y,B){this.n11=b;this.n12=d;this.n13=e;this.n14=f;this.n21=h;this.n22=i;this.n23=g;this.n24=j;this.n31=p;this.n32=k;this.n33=n;this.n34=v;this.n41=r;this.n42=q;this.n43=y;this.n44=B;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(b){this.set(b.n11,b.n12,b.n13,b.n14,b.n21,b.n22,b.n23,b.n24,b.n31,b.n32,b.n33,b.n34,b.n41,b.n42,b.n43,b.n44);return this},lookAt:function(b,d,e){var f=THREE.Matrix4.__v1, h=THREE.Matrix4.__v2,i=THREE.Matrix4.__v3;i.sub(b,d).normalize();if(i.length()===0)i.z=1;f.cross(e,i).normalize();f.length()===0&&(i.x+=1.0E-4,f.cross(e,i).normalize());h.cross(i,f).normalize();this.n11=f.x;this.n12=h.x;this.n13=i.x;this.n21=f.y;this.n22=h.y;this.n23=i.y;this.n31=f.z;this.n32=h.z;this.n33=i.z;return this},multiplyVector3:function(b){var d=b.x,e=b.y,f=b.z,h=1/(this.n41*d+this.n42*e+this.n43*f+this.n44);b.x=(this.n11*d+this.n12*e+this.n13*f+this.n14)*h;b.y=(this.n21*d+this.n22*e+this.n23* f+this.n24)*h;b.z=(this.n31*d+this.n32*e+this.n33*f+this.n34)*h;return b},multiplyVector4:function(b){var d=b.x,e=b.y,f=b.z,h=b.w;b.x=this.n11*d+this.n12*e+this.n13*f+this.n14*h;b.y=this.n21*d+this.n22*e+this.n23*f+this.n24*h;b.z=this.n31*d+this.n32*e+this.n33*f+this.n34*h;b.w=this.n41*d+this.n42*e+this.n43*f+this.n44*h;return b},rotateAxis:function(b){var d=b.x,e=b.y,f=b.z;b.x=d*this.n11+e*this.n12+f*this.n13;b.y=d*this.n21+e*this.n22+f*this.n23;b.z=d*this.n31+e*this.n32+f*this.n33;b.normalize(); return b},crossVector:function(b){var d=new THREE.Vector4;d.x=this.n11*b.x+this.n12*b.y+this.n13*b.z+this.n14*b.w;d.y=this.n21*b.x+this.n22*b.y+this.n23*b.z+this.n24*b.w;d.z=this.n31*b.x+this.n32*b.y+this.n33*b.z+this.n34*b.w;d.w=b.w?this.n41*b.x+this.n42*b.y+this.n43*b.z+this.n44*b.w:1;return d},multiply:function(b,d){var e=b.n11,f=b.n12,h=b.n13,i=b.n14,g=b.n21,j=b.n22,p=b.n23,k=b.n24,n=b.n31,v=b.n32,r=b.n33,q=b.n34,y=b.n41,B=b.n42,D=b.n43,A=b.n44,O=d.n11,ha=d.n12,T=d.n13,E=d.n14,x=d.n21,ca=d.n22, M=d.n23,C=d.n24,Q=d.n31,$=d.n32,aa=d.n33,c=d.n34;this.n11=e*O+f*x+h*Q;this.n12=e*ha+f*ca+h*$;this.n13=e*T+f*M+h*aa;this.n14=e*E+f*C+h*c+i;this.n21=g*O+j*x+p*Q;this.n22=g*ha+j*ca+p*$;this.n23=g*T+j*M+p*aa;this.n24=g*E+j*C+p*c+k;this.n31=n*O+v*x+r*Q;this.n32=n*ha+v*ca+r*$;this.n33=n*T+v*M+r*aa;this.n34=n*E+v*C+r*c+q;this.n41=y*O+B*x+D*Q;this.n42=y*ha+B*ca+D*$;this.n43=y*T+B*M+D*aa;this.n44=y*E+B*C+D*c+A;return this},multiplyToArray:function(b,d,e){this.multiply(b,d);e[0]=this.n11;e[1]=this.n21;e[2]= this.n31;e[3]=this.n41;e[4]=this.n12;e[5]=this.n22;e[6]=this.n32;e[7]=this.n42;e[8]=this.n13;e[9]=this.n23;e[10]=this.n33;e[11]=this.n43;e[12]=this.n14;e[13]=this.n24;e[14]=this.n34;e[15]=this.n44;return this},multiplySelf:function(b){this.multiply(this,b);return this},multiplyScalar:function(b){this.n11*=b;this.n12*=b;this.n13*=b;this.n14*=b;this.n21*=b;this.n22*=b;this.n23*=b;this.n24*=b;this.n31*=b;this.n32*=b;this.n33*=b;this.n34*=b;this.n41*=b;this.n42*=b;this.n43*=b;this.n44*=b;return this}, determinant:function(){var b=this.n11,d=this.n12,e=this.n13,f=this.n14,h=this.n21,i=this.n22,g=this.n23,j=this.n24,p=this.n31,k=this.n32,n=this.n33,v=this.n34,r=this.n41,q=this.n42,y=this.n43,B=this.n44;return f*g*k*r-e*j*k*r-f*i*n*r+d*j*n*r+e*i*v*r-d*g*v*r-f*g*p*q+e*j*p*q+f*h*n*q-b*j*n*q-e*h*v*q+b*g*v*q+f*i*p*y-d*j*p*y-f*h*k*y+b*j*k*y+d*h*v*y-b*i*v*y-e*i*p*B+d*g*p*B+e*h*k*B-b*g*k*B-d*h*n*B+b*i*n*B},transpose:function(){var b;b=this.n21;this.n21=this.n12;this.n12=b;b=this.n31;this.n31=this.n13;this.n13= b;b=this.n32;this.n32=this.n23;this.n23=b;b=this.n41;this.n41=this.n14;this.n14=b;b=this.n42;this.n42=this.n24;this.n24=b;b=this.n43;this.n43=this.n34;this.n43=b;return this},clone:function(){var b=new THREE.Matrix4;b.n11=this.n11;b.n12=this.n12;b.n13=this.n13;b.n14=this.n14;b.n21=this.n21;b.n22=this.n22;b.n23=this.n23;b.n24=this.n24;b.n31=this.n31;b.n32=this.n32;b.n33=this.n33;b.n34=this.n34;b.n41=this.n41;b.n42=this.n42;b.n43=this.n43;b.n44=this.n44;return b},flatten:function(){this.flat[0]=this.n11; this.flat[1]=this.n21;this.flat[2]=this.n31;this.flat[3]=this.n41;this.flat[4]=this.n12;this.flat[5]=this.n22;this.flat[6]=this.n32;this.flat[7]=this.n42;this.flat[8]=this.n13;this.flat[9]=this.n23;this.flat[10]=this.n33;this.flat[11]=this.n43;this.flat[12]=this.n14;this.flat[13]=this.n24;this.flat[14]=this.n34;this.flat[15]=this.n44;return this.flat},flattenToArray:function(b){b[0]=this.n11;b[1]=this.n21;b[2]=this.n31;b[3]=this.n41;b[4]=this.n12;b[5]=this.n22;b[6]=this.n32;b[7]=this.n42;b[8]=this.n13; b[9]=this.n23;b[10]=this.n33;b[11]=this.n43;b[12]=this.n14;b[13]=this.n24;b[14]=this.n34;b[15]=this.n44;return b},flattenToArrayOffset:function(b,d){b[d]=this.n11;b[d+1]=this.n21;b[d+2]=this.n31;b[d+3]=this.n41;b[d+4]=this.n12;b[d+5]=this.n22;b[d+6]=this.n32;b[d+7]=this.n42;b[d+8]=this.n13;b[d+9]=this.n23;b[d+10]=this.n33;b[d+11]=this.n43;b[d+12]=this.n14;b[d+13]=this.n24;b[d+14]=this.n34;b[d+15]=this.n44;return b},setTranslation:function(b,d,e){this.set(1,0,0,b,0,1,0,d,0,0,1,e,0,0,0,1);return this}, setScale:function(b,d,e){this.set(b,0,0,0,0,d,0,0,0,0,e,0,0,0,0,1);return this},setRotationX:function(b){var d=Math.cos(b),b=Math.sin(b);this.set(1,0,0,0,0,d,-b,0,0,b,d,0,0,0,0,1);return this},setRotationY:function(b){var d=Math.cos(b),b=Math.sin(b);this.set(d,0,b,0,0,1,0,0,-b,0,d,0,0,0,0,1);return this},setRotationZ:function(b){var d=Math.cos(b),b=Math.sin(b);this.set(d,-b,0,0,b,d,0,0,0,0,1,0,0,0,0,1);return this},setRotationAxis:function(b,d){var e=Math.cos(d),f=Math.sin(d),h=1-e,i=b.x,g=b.y,j= b.z,p=h*i,k=h*g;this.set(p*i+e,p*g-f*j,p*j+f*g,0,p*g+f*j,k*g+e,k*j-f*i,0,p*j-f*g,k*j+f*i,h*j*j+e,0,0,0,0,1);return this},setPosition:function(b){this.n14=b.x;this.n24=b.y;this.n34=b.z;return this},getPosition:function(){if(!this.position)this.position=new THREE.Vector3;this.position.set(this.n14,this.n24,this.n34);return this.position},getColumnX:function(){if(!this.columnX)this.columnX=new THREE.Vector3;this.columnX.set(this.n11,this.n21,this.n31);return this.columnX},getColumnY:function(){if(!this.columnY)this.columnY= new THREE.Vector3;this.columnY.set(this.n12,this.n22,this.n32);return this.columnY},getColumnZ:function(){if(!this.columnZ)this.columnZ=new THREE.Vector3;this.columnZ.set(this.n13,this.n23,this.n33);return this.columnZ},setRotationFromEuler:function(b){var d=b.x,e=b.y,f=b.z,b=Math.cos(d),d=Math.sin(d),h=Math.cos(e),e=Math.sin(e),i=Math.cos(f),f=Math.sin(f),g=b*e,j=d*e;this.n11=h*i;this.n12=-h*f;this.n13=e;this.n21=j*i+b*f;this.n22=-j*f+b*i;this.n23=-d*h;this.n31=-g*i+d*f;this.n32=g*f+d*i;this.n33= b*h;return this},setRotationFromQuaternion:function(b){var d=b.x,e=b.y,f=b.z,h=b.w,i=d+d,g=e+e,j=f+f,b=d*i,p=d*g;d*=j;var k=e*g;e*=j;f*=j;i*=h;g*=h;h*=j;this.n11=1-(k+f);this.n12=p-h;this.n13=d+g;this.n21=p+h;this.n22=1-(b+f);this.n23=e-i;this.n31=d-g;this.n32=e+i;this.n33=1-(b+k);return this},scale:function(b){var d=b.x,e=b.y,b=b.z;this.n11*=d;this.n12*=e;this.n13*=b;this.n21*=d;this.n22*=e;this.n23*=b;this.n31*=d;this.n32*=e;this.n33*=b;this.n41*=d;this.n42*=e;this.n43*=b;return this},extractPosition:function(b){this.n14= b.n14;this.n24=b.n24;this.n34=b.n34},extractRotation:function(b,d){var e=1/d.x,f=1/d.y,h=1/d.z;this.n11=b.n11*e;this.n21=b.n21*e;this.n31=b.n31*e;this.n12=b.n12*f;this.n22=b.n22*f;this.n32=b.n32*f;this.n13=b.n13*h;this.n23=b.n23*h;this.n33=b.n33*h}}; THREE.Matrix4.makeInvert=function(b,d){var e=b.n11,f=b.n12,h=b.n13,i=b.n14,g=b.n21,j=b.n22,p=b.n23,k=b.n24,n=b.n31,v=b.n32,r=b.n33,q=b.n34,y=b.n41,B=b.n42,D=b.n43,A=b.n44;d===void 0&&(d=new THREE.Matrix4);d.n11=p*q*B-k*r*B+k*v*D-j*q*D-p*v*A+j*r*A;d.n12=i*r*B-h*q*B-i*v*D+f*q*D+h*v*A-f*r*A;d.n13=h*k*B-i*p*B+i*j*D-f*k*D-h*j*A+f*p*A;d.n14=i*p*v-h*k*v-i*j*r+f*k*r+h*j*q-f*p*q;d.n21=k*r*y-p*q*y-k*n*D+g*q*D+p*n*A-g*r*A;d.n22=h*q*y-i*r*y+i*n*D-e*q*D-h*n*A+e*r*A;d.n23=i*p*y-h*k*y-i*g*D+e*k*D+h*g*A-e*p*A;d.n24= h*k*n-i*p*n+i*g*r-e*k*r-h*g*q+e*p*q;d.n31=j*q*y-k*v*y+k*n*B-g*q*B-j*n*A+g*v*A;d.n32=i*v*y-f*q*y-i*n*B+e*q*B+f*n*A-e*v*A;d.n33=h*k*y-i*j*y+i*g*B-e*k*B-f*g*A+e*j*A;d.n34=i*j*n-f*k*n-i*g*v+e*k*v+f*g*q-e*j*q;d.n41=p*v*y-j*r*y-p*n*B+g*r*B+j*n*D-g*v*D;d.n42=f*r*y-h*v*y+h*n*B-e*r*B-f*n*D+e*v*D;d.n43=h*j*y-f*p*y-h*g*B+e*p*B+f*g*D-e*j*D;d.n44=f*p*n-h*j*n+h*g*v-e*p*v-f*g*r+e*j*r;d.multiplyScalar(1/b.determinant());return d}; THREE.Matrix4.makeInvert3x3=function(b){var d=b.m33,e=d.m,f=b.n33*b.n22-b.n32*b.n23,h=-b.n33*b.n21+b.n31*b.n23,i=b.n32*b.n21-b.n31*b.n22,g=-b.n33*b.n12+b.n32*b.n13,j=b.n33*b.n11-b.n31*b.n13,p=-b.n32*b.n11+b.n31*b.n12,k=b.n23*b.n12-b.n22*b.n13,n=-b.n23*b.n11+b.n21*b.n13,v=b.n22*b.n11-b.n21*b.n12,b=b.n11*f+b.n21*g+b.n31*k;b==0&&console.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible.");b=1/b;e[0]=b*f;e[1]=b*h;e[2]=b*i;e[3]=b*g;e[4]=b*j;e[5]=b*p;e[6]=b*k;e[7]=b*n;e[8]=b*v;return d}; THREE.Matrix4.makeFrustum=function(b,d,e,f,h,i){var g;g=new THREE.Matrix4;g.n11=2*h/(d-b);g.n12=0;g.n13=(d+b)/(d-b);g.n14=0;g.n21=0;g.n22=2*h/(f-e);g.n23=(f+e)/(f-e);g.n24=0;g.n31=0;g.n32=0;g.n33=-(i+h)/(i-h);g.n34=-2*i*h/(i-h);g.n41=0;g.n42=0;g.n43=-1;g.n44=0;return g};THREE.Matrix4.makePerspective=function(b,d,e,f){var h,b=e*Math.tan(b*Math.PI/360);h=-b;return THREE.Matrix4.makeFrustum(h*d,b*d,h,b,e,f)}; THREE.Matrix4.makeOrtho=function(b,d,e,f,h,i){var g,j,p,k;g=new THREE.Matrix4;j=d-b;p=e-f;k=i-h;g.n11=2/j;g.n12=0;g.n13=0;g.n14=-((d+b)/j);g.n21=0;g.n22=2/p;g.n23=0;g.n24=-((e+f)/p);g.n31=0;g.n32=0;g.n33=-2/k;g.n34=-((i+h)/k);g.n41=0;g.n42=0;g.n43=0;g.n44=1;return g};THREE.Matrix4.__v1=new THREE.Vector3;THREE.Matrix4.__v2=new THREE.Vector3;THREE.Matrix4.__v3=new THREE.Vector3; THREE.Object3D=function(){this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.scale=new THREE.Vector3(1,1,1);this.flipSided=this.doubleSided=this.dynamic=!1;this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixRotationWorld=new THREE.Matrix4;this.matrixWorldNeedsUpdate=this.matrixAutoUpdate=!0;this.quaternion=new THREE.Quaternion;this.useQuaternion=!1;this.boundRadius= 0;this.boundRadiusScale=1;this.visible=!0;this._vector=new THREE.Vector3;this.name=""}; THREE.Object3D.prototype={translate:function(b,d){this.matrix.rotateAxis(d);this.position.addSelf(d.multiplyScalar(b))},translateX:function(b){this.translate(b,this._vector.set(1,0,0))},translateY:function(b){this.translate(b,this._vector.set(0,1,0))},translateZ:function(b){this.translate(b,this._vector.set(0,0,1))},lookAt:function(b){this.matrix.lookAt(b,this.position,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)},addChild:function(b){if(this.children.indexOf(b)=== -1){b.parent!==void 0&&b.parent.removeChild(b);b.parent=this;this.children.push(b);for(var d=this;d.parent!==void 0;)d=d.parent;d!==void 0&&d instanceof THREE.Scene&&d.addChildRecurse(b)}},removeChild:function(b){var d=this.children.indexOf(b);if(d!==-1)b.parent=void 0,this.children.splice(d,1)},getChildByName:function(b,d){var e,f,h;e=0;for(f=this.children.length;e<f;e++){h=this.children[e];if(h.name===b)return h;if(d&&(h=h.getChildByName(b,d),h!==void 0))return h}},updateMatrix:function(){this.matrix.setPosition(this.position); this.useQuaternion?this.matrix.setRotationFromQuaternion(this.quaternion):this.matrix.setRotationFromEuler(this.rotation);if(this.scale.x!==1||this.scale.y!==1||this.scale.z!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,Math.max(this.scale.y,this.scale.z));this.matrixWorldNeedsUpdate=!0},update:function(b,d,e){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||d)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale),this.matrixWorldNeedsUpdate=!1,d=!0;for(var b=0,f=this.children.length;b<f;b++)this.children[b].update(this.matrixWorld,d,e)}};THREE.Quaternion=function(b,d,e,f){this.set(b||0,d||0,e||0,f!==void 0?f:1)}; THREE.Quaternion.prototype={set:function(b,d,e,f){this.x=b;this.y=d;this.z=e;this.w=f;return this},copy:function(b){this.x=b.x;this.y=b.y;this.z=b.z;this.w=b.w;return this},setFromEuler:function(b){var d=0.5*Math.PI/360,e=b.x*d,f=b.y*d,h=b.z*d,b=Math.cos(f),f=Math.sin(f),d=Math.cos(-h),h=Math.sin(-h),i=Math.cos(e),e=Math.sin(e),g=b*d,j=f*h;this.w=g*i-j*e;this.x=g*e+j*i;this.y=f*d*i+b*h*e;this.z=b*h*i-f*d*e;return this},setFromAxisAngle:function(b,d){var e=d/2,f=Math.sin(e);this.x=b.x*f;this.y=b.y* f;this.z=b.z*f;this.w=Math.cos(e);return this},calculateW:function(){this.w=-Math.sqrt(Math.abs(1-this.x*this.x-this.y*this.y-this.z*this.z));return this},inverse:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var b=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);b==0?this.w=this.z=this.y=this.x=0:(b=1/b,this.x*=b,this.y*=b,this.z*=b,this.w*=b);return this}, multiplySelf:function(b){var d=this.x,e=this.y,f=this.z,h=this.w,i=b.x,g=b.y,j=b.z,b=b.w;this.x=d*b+h*i+e*j-f*g;this.y=e*b+h*g+f*i-d*j;this.z=f*b+h*j+d*g-e*i;this.w=h*b-d*i-e*g-f*j;return this},multiply:function(b,d){this.x=b.x*d.w+b.y*d.z-b.z*d.y+b.w*d.x;this.y=-b.x*d.z+b.y*d.w+b.z*d.x+b.w*d.y;this.z=b.x*d.y-b.y*d.x+b.z*d.w+b.w*d.z;this.w=-b.x*d.x-b.y*d.y-b.z*d.z+b.w*d.w;return this},multiplyVector3:function(b,d){d||(d=b);var e=b.x,f=b.y,h=b.z,i=this.x,g=this.y,j=this.z,p=this.w,k=p*e+g*h-j*f,n= p*f+j*e-i*h,v=p*h+i*f-g*e,e=-i*e-g*f-j*h;d.x=k*p+e*-i+n*-j-v*-g;d.y=n*p+e*-g+v*-i-k*-j;d.z=v*p+e*-j+k*-g-n*-i;return d}}; THREE.Quaternion.slerp=function(b,d,e,f){var h=b.w*d.w+b.x*d.x+b.y*d.y+b.z*d.z;if(Math.abs(h)>=1)return e.w=b.w,e.x=b.x,e.y=b.y,e.z=b.z,e;var i=Math.acos(h),g=Math.sqrt(1-h*h);if(Math.abs(g)<0.0010)return e.w=0.5*(b.w+d.w),e.x=0.5*(b.x+d.x),e.y=0.5*(b.y+d.y),e.z=0.5*(b.z+d.z),e;h=Math.sin((1-f)*i)/g;f=Math.sin(f*i)/g;e.w=b.w*h+d.w*f;e.x=b.x*h+d.x*f;e.y=b.y*h+d.y*f;e.z=b.z*h+d.z*f;return e};THREE.Vertex=function(b){this.position=b||new THREE.Vector3}; THREE.Face3=function(b,d,e,f,h,i){this.a=b;this.b=d;this.c=e;this.normal=f instanceof THREE.Vector3?f:new THREE.Vector3;this.vertexNormals=f instanceof Array?f:[];this.color=h instanceof THREE.Color?h:new THREE.Color;this.vertexColors=h instanceof Array?h:[];this.vertexTangents=[];this.materials=i instanceof Array?i:[i];this.centroid=new THREE.Vector3}; THREE.Face4=function(b,d,e,f,h,i,g){this.a=b;this.b=d;this.c=e;this.d=f;this.normal=h instanceof THREE.Vector3?h:new THREE.Vector3;this.vertexNormals=h instanceof Array?h:[];this.color=i instanceof THREE.Color?i:new THREE.Color;this.vertexColors=i instanceof Array?i:[];this.vertexTangents=[];this.materials=g instanceof Array?g:[g];this.centroid=new THREE.Vector3};THREE.UV=function(b,d){this.set(b||0,d||0)}; THREE.UV.prototype={set:function(b,d){this.u=b;this.v=d;return this},copy:function(b){this.set(b.u,b.v);return this}};THREE.Geometry=function(){this.id="Geometry"+THREE.GeometryIdCounter++;this.vertices=[];this.colors=[];this.faces=[];this.edges=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.hasTangents=!1}; THREE.Geometry.prototype={computeCentroids:function(){var b,d,e;b=0;for(d=this.faces.length;b<d;b++)e=this.faces[b],e.centroid.set(0,0,0),e instanceof THREE.Face3?(e.centroid.addSelf(this.vertices[e.a].position),e.centroid.addSelf(this.vertices[e.b].position),e.centroid.addSelf(this.vertices[e.c].position),e.centroid.divideScalar(3)):e instanceof THREE.Face4&&(e.centroid.addSelf(this.vertices[e.a].position),e.centroid.addSelf(this.vertices[e.b].position),e.centroid.addSelf(this.vertices[e.c].position), e.centroid.addSelf(this.vertices[e.d].position),e.centroid.divideScalar(4))},computeFaceNormals:function(b){var d,e,f,h,i,g,j=new THREE.Vector3,p=new THREE.Vector3;f=0;for(h=this.faces.length;f<h;f++){i=this.faces[f];if(b&&i.vertexNormals.length){j.set(0,0,0);d=0;for(e=i.vertexNormals.length;d<e;d++)j.addSelf(i.vertexNormals[d]);j.divideScalar(3)}else d=this.vertices[i.a],e=this.vertices[i.b],g=this.vertices[i.c],j.sub(g.position,e.position),p.sub(d.position,e.position),j.crossSelf(p);j.isZero()|| j.normalize();i.normal.copy(j)}},computeVertexNormals:function(){var b,d,e,f;if(this.__tmpVertices==void 0){f=this.__tmpVertices=Array(this.vertices.length);b=0;for(d=this.vertices.length;b<d;b++)f[b]=new THREE.Vector3;b=0;for(d=this.faces.length;b<d;b++)if(e=this.faces[b],e instanceof THREE.Face3)e.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];else if(e instanceof THREE.Face4)e.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]}else{f= this.__tmpVertices;b=0;for(d=this.vertices.length;b<d;b++)f[b].set(0,0,0)}b=0;for(d=this.faces.length;b<d;b++)e=this.faces[b],e instanceof THREE.Face3?(f[e.a].addSelf(e.normal),f[e.b].addSelf(e.normal),f[e.c].addSelf(e.normal)):e instanceof THREE.Face4&&(f[e.a].addSelf(e.normal),f[e.b].addSelf(e.normal),f[e.c].addSelf(e.normal),f[e.d].addSelf(e.normal));b=0;for(d=this.vertices.length;b<d;b++)f[b].normalize();b=0;for(d=this.faces.length;b<d;b++)e=this.faces[b],e instanceof THREE.Face3?(e.vertexNormals[0].copy(f[e.a]), e.vertexNormals[1].copy(f[e.b]),e.vertexNormals[2].copy(f[e.c])):e instanceof THREE.Face4&&(e.vertexNormals[0].copy(f[e.a]),e.vertexNormals[1].copy(f[e.b]),e.vertexNormals[2].copy(f[e.c]),e.vertexNormals[3].copy(f[e.d]))},computeTangents:function(){function b(b,c,d,e,f,h,i){j=b.vertices[c].position;p=b.vertices[d].position;k=b.vertices[e].position;n=g[f];v=g[h];r=g[i];q=p.x-j.x;y=k.x-j.x;B=p.y-j.y;D=k.y-j.y;A=p.z-j.z;O=k.z-j.z;ha=v.u-n.u;T=r.u-n.u;E=v.v-n.v;x=r.v-n.v;ca=1/(ha*x-T*E);$.set((x*q-E* y)*ca,(x*B-E*D)*ca,(x*A-E*O)*ca);aa.set((ha*y-T*q)*ca,(ha*D-T*B)*ca,(ha*O-T*A)*ca);C[c].addSelf($);C[d].addSelf($);C[e].addSelf($);Q[c].addSelf(aa);Q[d].addSelf(aa);Q[e].addSelf(aa)}var d,e,f,h,i,g,j,p,k,n,v,r,q,y,B,D,A,O,ha,T,E,x,ca,M,C=[],Q=[],$=new THREE.Vector3,aa=new THREE.Vector3,c=new THREE.Vector3,ta=new THREE.Vector3,ma=new THREE.Vector3;d=0;for(e=this.vertices.length;d<e;d++)C[d]=new THREE.Vector3,Q[d]=new THREE.Vector3;d=0;for(e=this.faces.length;d<e;d++)i=this.faces[d],g=this.faceVertexUvs[0][d], i instanceof THREE.Face3?b(this,i.a,i.b,i.c,0,1,2):i instanceof THREE.Face4&&(b(this,i.a,i.b,i.c,0,1,2),b(this,i.a,i.b,i.d,0,1,3));var Ba=["a","b","c","d"];d=0;for(e=this.faces.length;d<e;d++){i=this.faces[d];for(f=0;f<i.vertexNormals.length;f++)ma.copy(i.vertexNormals[f]),h=i[Ba[f]],M=C[h],c.copy(M),c.subSelf(ma.multiplyScalar(ma.dot(M))).normalize(),ta.cross(i.vertexNormals[f],M),h=ta.dot(Q[h]),h=h<0?-1:1,i.vertexTangents[f]=new THREE.Vector4(c.x,c.y,c.z,h)}this.hasTangents=!0},computeBoundingBox:function(){var b; if(this.vertices.length>0){this.boundingBox={x:[this.vertices[0].position.x,this.vertices[0].position.x],y:[this.vertices[0].position.y,this.vertices[0].position.y],z:[this.vertices[0].position.z,this.vertices[0].position.z]};for(var d=1,e=this.vertices.length;d<e;d++){b=this.vertices[d];if(b.position.x<this.boundingBox.x[0])this.boundingBox.x[0]=b.position.x;else if(b.position.x>this.boundingBox.x[1])this.boundingBox.x[1]=b.position.x;if(b.position.y<this.boundingBox.y[0])this.boundingBox.y[0]=b.position.y; else if(b.position.y>this.boundingBox.y[1])this.boundingBox.y[1]=b.position.y;if(b.position.z<this.boundingBox.z[0])this.boundingBox.z[0]=b.position.z;else if(b.position.z>this.boundingBox.z[1])this.boundingBox.z[1]=b.position.z}}},computeBoundingSphere:function(){for(var b=0,d=0,e=this.vertices.length;d<e;d++)b=Math.max(b,this.vertices[d].position.length());this.boundingSphere={radius:b}},computeEdgeFaces:function(){function b(b,d){return Math.min(b,d)+"_"+Math.max(b,d)}function d(b,d,e){b[d]=== void 0?(b[d]={set:{},array:[]},b[d].set[e]=1,b[d].array.push(e)):b[d].set[e]===void 0&&(b[d].set[e]=1,b[d].array.push(e))}var e,f,h,i,g,j={};e=0;for(f=this.faces.length;e<f;e++)g=this.faces[e],g instanceof THREE.Face3?(h=b(g.a,g.b),d(j,h,e),h=b(g.b,g.c),d(j,h,e),h=b(g.a,g.c),d(j,h,e)):g instanceof THREE.Face4&&(h=b(g.b,g.d),d(j,h,e),h=b(g.a,g.b),d(j,h,e),h=b(g.a,g.d),d(j,h,e),h=b(g.b,g.c),d(j,h,e),h=b(g.c,g.d),d(j,h,e));e=0;for(f=this.edges.length;e<f;e++){g=this.edges[e];h=g.vertexIndices[0];i=g.vertexIndices[1]; g.faceIndices=j[b(h,i)].array;for(h=0;h<g.faceIndices.length;h++)i=g.faceIndices[h],g.faces.push(this.faces[i])}}};THREE.GeometryIdCounter=0; THREE.Spline=function(b){function d(b,d,e,f,h,g,i){b=(e-b)*0.5;f=(f-d)*0.5;return(2*(d-e)+b+f)*i+(-3*(d-e)-2*b-f)*g+b*h+d}this.points=b;var e=[],f={x:0,y:0,z:0},h,i,g,j,p,k,n,v,r;this.initFromArray=function(b){this.points=[];for(var d=0;d<b.length;d++)this.points[d]={x:b[d][0],y:b[d][1],z:b[d][2]}};this.getPoint=function(b){h=(this.points.length-1)*b;i=Math.floor(h);g=h-i;e[0]=i==0?i:i-1;e[1]=i;e[2]=i>this.points.length-2?i:i+1;e[3]=i>this.points.length-3?i:i+2;k=this.points[e[0]];n=this.points[e[1]]; v=this.points[e[2]];r=this.points[e[3]];j=g*g;p=g*j;f.x=d(k.x,n.x,v.x,r.x,g,j,p);f.y=d(k.y,n.y,v.y,r.y,g,j,p);f.z=d(k.z,n.z,v.z,r.z,g,j,p);return f};this.getControlPointsArray=function(){var b,d,e=this.points.length,f=[];for(b=0;b<e;b++)d=this.points[b],f[b]=[d.x,d.y,d.z];return f};this.getLength=function(b){var d,e,f=d=d=0,h=new THREE.Vector3,g=new THREE.Vector3,i=[],j=0;i[0]=0;b||(b=100);e=this.points.length*b;h.copy(this.points[0]);for(b=1;b<e;b++)d=b/e,position=this.getPoint(d),g.copy(position), j+=g.distanceTo(h),h.copy(position),d*=this.points.length-1,d=Math.floor(d),d!=f&&(i[d]=j,f=d);i[i.length]=j;return{chunks:i,total:j}};this.reparametrizeByArcLength=function(b){var d,e,f,h,g,i,j=[],k=new THREE.Vector3,p=this.getLength();j.push(k.copy(this.points[0]).clone());for(d=1;d<this.points.length;d++){e=p.chunks[d]-p.chunks[d-1];i=Math.ceil(b*e/p.total);h=(d-1)/(this.points.length-1);g=d/(this.points.length-1);for(e=1;e<i-1;e++)f=h+e*(1/i)*(g-h),position=this.getPoint(f),j.push(k.copy(position).clone()); j.push(k.copy(this.points[d]).clone())}this.points=j}};THREE.Edge=function(b,d,e,f){this.vertices=[b,d];this.vertexIndices=[e,f];this.faces=[];this.faceIndices=[]};THREE.Camera=function(b,d,e,f,h){THREE.Object3D.call(this);this.fov=b||50;this.aspect=d||1;this.near=e||0.1;this.far=f||2E3;this.target=h||new THREE.Object3D;this.useTarget=!0;this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=null;this.updateProjectionMatrix()};THREE.Camera.prototype=new THREE.Object3D; THREE.Camera.prototype.constructor=THREE.Camera;THREE.Camera.prototype.supr=THREE.Object3D.prototype;THREE.Camera.prototype.translate=function(b,d){this.matrix.rotateAxis(d);d.multiplyScalar(b);this.position.addSelf(d);this.target.position.addSelf(d)}; THREE.Camera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var b=this.fullWidth/this.fullHeight,d=Math.tan(this.fov*Math.PI/360)*this.near,e=-d,f=b*e,b=Math.abs(b*d-f),e=Math.abs(d-e);this.projectionMatrix=THREE.Matrix4.makeFrustum(f+this.x*b/this.fullWidth,f+(this.x+this.width)*b/this.fullWidth,d-(this.y+this.height)*e/this.fullHeight,d-this.y*e/this.fullHeight,this.near,this.far)}else this.projectionMatrix=THREE.Matrix4.makePerspective(this.fov,this.aspect,this.near,this.far)}; THREE.Camera.prototype.setViewOffset=function(b,d,e,f,h,i){this.fullWidth=b;this.fullHeight=d;this.x=e;this.y=f;this.width=h;this.height=i;this.updateProjectionMatrix()}; THREE.Camera.prototype.update=function(b,d,e){if(this.useTarget)this.matrix.lookAt(this.position,this.target.position,this.up),this.matrix.setPosition(this.position),b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse),d=!0;else if(this.matrixAutoUpdate&&this.updateMatrix(),d||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate= !1,d=!0,THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse);for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,d,e)};THREE.Light=function(b){THREE.Object3D.call(this);this.color=new THREE.Color(b)};THREE.Light.prototype=new THREE.Object3D;THREE.Light.prototype.constructor=THREE.Light;THREE.Light.prototype.supr=THREE.Object3D.prototype;THREE.AmbientLight=function(b){THREE.Light.call(this,b)};THREE.AmbientLight.prototype=new THREE.Light; THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;THREE.DirectionalLight=function(b,d,e,f){THREE.Light.call(this,b);this.position=new THREE.Vector3(0,1,0);this.intensity=d||1;this.distance=e||0;this.castShadow=f!==void 0?f:!1};THREE.DirectionalLight.prototype=new THREE.Light;THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.PointLight=function(b,d,e){THREE.Light.call(this,b);this.position=new THREE.Vector3;this.intensity=d||1;this.distance=e||0}; THREE.PointLight.prototype=new THREE.Light;THREE.PointLight.prototype.constructor=THREE.PointLight;THREE.LensFlare=function(b,d,e,f){THREE.Object3D.call(this);this.positionScreen=new THREE.Vector3;this.lensFlares=[];this.customUpdateCallback=void 0;b!==void 0&&this.add(b,d,e,f)};THREE.LensFlare.prototype=new THREE.Object3D;THREE.LensFlare.prototype.constructor=THREE.LensFlare;THREE.LensFlare.prototype.supr=THREE.Object3D.prototype; THREE.LensFlare.prototype.add=function(b,d,e,f){d===void 0&&(d=-1);e===void 0&&(e=0);if(f===void 0)f=THREE.BillboardBlending;e=Math.min(e,Math.max(0,e));this.lensFlares.push({texture:b,size:d,distance:e,x:0,y:0,z:0,scale:1,rotation:1,opacity:1,blending:f})}; THREE.LensFlare.prototype.updateLensFlares=function(){var b,d=this.lensFlares.length,e,f=-this.positionScreen.x*2,h=-this.positionScreen.y*2;for(b=0;b<d;b++)e=this.lensFlares[b],e.x=this.positionScreen.x+f*e.distance,e.y=this.positionScreen.y+h*e.distance,e.wantedRotation=e.x*Math.PI*0.25,e.rotation+=(e.wantedRotation-e.rotation)*0.25}; THREE.Material=function(b){this.id=THREE.MaterialCounter.value++;b=b||{};this.opacity=b.opacity!==void 0?b.opacity:1;this.transparent=b.transparent!==void 0?b.transparent:!1;this.blending=b.blending!==void 0?b.blending:THREE.NormalBlending;this.depthTest=b.depthTest!==void 0?b.depthTest:!0};THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NormalBlending=0;THREE.AdditiveBlending=1;THREE.SubtractiveBlending=2; THREE.MultiplyBlending=3;THREE.AdditiveAlphaBlending=4;THREE.MaterialCounter={value:0};THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.LatitudeReflectionMapping=function(){};THREE.LatitudeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.UVMapping=function(){}; THREE.LineBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.linewidth=b.linewidth!==void 0?b.linewidth:1;this.linecap=b.linecap!==void 0?b.linecap:"round";this.linejoin=b.linejoin!==void 0?b.linejoin:"round";this.vertexColors=b.vertexColors?b.vertexColors:!1};THREE.LineBasicMaterial.prototype=new THREE.Material;THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial; THREE.MeshBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null;this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!== void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1}; THREE.MeshBasicMaterial.prototype=new THREE.Material;THREE.MeshBasicMaterial.prototype.constructor=THREE.MeshBasicMaterial; THREE.MeshLambertMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null;this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!== void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1}; THREE.MeshLambertMaterial.prototype=new THREE.Material;THREE.MeshLambertMaterial.prototype.constructor=THREE.MeshLambertMaterial; THREE.MeshPhongMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.ambient=b.ambient!==void 0?new THREE.Color(b.ambient):new THREE.Color(328965);this.specular=b.specular!==void 0?new THREE.Color(b.specular):new THREE.Color(1118481);this.shininess=b.shininess!==void 0?b.shininess:30;this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null; this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!==void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!== void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1};THREE.MeshPhongMaterial.prototype=new THREE.Material;THREE.MeshPhongMaterial.prototype.constructor=THREE.MeshPhongMaterial; THREE.MeshDepthMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.shading=b.shading!==void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1};THREE.MeshDepthMaterial.prototype=new THREE.Material;THREE.MeshDepthMaterial.prototype.constructor=THREE.MeshDepthMaterial; THREE.MeshNormalMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.shading=b.shading?b.shading:THREE.FlatShading;this.wireframe=b.wireframe?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth?b.wireframeLinewidth:1};THREE.MeshNormalMaterial.prototype=new THREE.Material;THREE.MeshNormalMaterial.prototype.constructor=THREE.MeshNormalMaterial;THREE.MeshFaceMaterial=function(){}; THREE.MeshShaderMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.fragmentShader=b.fragmentShader!==void 0?b.fragmentShader:"void main() {}";this.vertexShader=b.vertexShader!==void 0?b.vertexShader:"void main() {}";this.uniforms=b.uniforms!==void 0?b.uniforms:{};this.attributes=b.attributes;this.shading=b.shading!==void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.fog= b.fog!==void 0?b.fog:!1;this.lights=b.lights!==void 0?b.lights:!1;this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1};THREE.MeshShaderMaterial.prototype=new THREE.Material;THREE.MeshShaderMaterial.prototype.constructor=THREE.MeshShaderMaterial; THREE.ParticleBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.size=b.size!==void 0?b.size:1;this.sizeAttenuation=b.sizeAttenuation!==void 0?b.sizeAttenuation:!0;this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1};THREE.ParticleBasicMaterial.prototype=new THREE.Material;THREE.ParticleBasicMaterial.prototype.constructor=THREE.ParticleBasicMaterial; THREE.ShadowVolumeDynamicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null;this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!== void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1}; THREE.ShadowVolumeDynamicMaterial.prototype=new THREE.Material;THREE.ShadowVolumeDynamicMaterial.prototype.constructor=THREE.ShadowVolumeDynamicMaterial; THREE.Texture=function(b,d,e,f,h,i){this.image=b;this.mapping=d!==void 0?d:new THREE.UVMapping;this.wrapS=e!==void 0?e:THREE.ClampToEdgeWrapping;this.wrapT=f!==void 0?f:THREE.ClampToEdgeWrapping;this.magFilter=h!==void 0?h:THREE.LinearFilter;this.minFilter=i!==void 0?i:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.needsUpdate=!1}; THREE.Texture.prototype={clone:function(){return new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter)}};THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.RepeatWrapping=0;THREE.ClampToEdgeWrapping=1;THREE.MirroredRepeatWrapping=2;THREE.NearestFilter=3;THREE.NearestMipMapNearestFilter=4;THREE.NearestMipMapLinearFilter=5;THREE.LinearFilter=6;THREE.LinearMipMapNearestFilter=7;THREE.LinearMipMapLinearFilter=8;THREE.ByteType=9;THREE.UnsignedByteType=10; THREE.ShortType=11;THREE.UnsignedShortType=12;THREE.IntType=13;THREE.UnsignedIntType=14;THREE.FloatType=15;THREE.AlphaFormat=16;THREE.RGBFormat=17;THREE.RGBAFormat=18;THREE.LuminanceFormat=19;THREE.LuminanceAlphaFormat=20;THREE.Particle=function(b){THREE.Object3D.call(this);this.materials=b instanceof Array?b:[b]};THREE.Particle.prototype=new THREE.Object3D;THREE.Particle.prototype.constructor=THREE.Particle; THREE.ParticleSystem=function(b,d){THREE.Object3D.call(this);this.geometry=b;this.materials=d instanceof Array?d:[d];this.sortParticles=!1};THREE.ParticleSystem.prototype=new THREE.Object3D;THREE.ParticleSystem.prototype.constructor=THREE.ParticleSystem;THREE.Line=function(b,d,e){THREE.Object3D.call(this);this.geometry=b;this.materials=d instanceof Array?d:[d];this.type=e!=void 0?e:THREE.LineStrip};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=new THREE.Object3D; THREE.Line.prototype.constructor=THREE.Line; THREE.Mesh=function(b,d){THREE.Object3D.call(this);this.geometry=b;this.materials=d&&d.length?d:[d];this.overdraw=!1;if(this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere(),this.boundRadius=b.boundingSphere.radius,this.geometry.morphTargets.length)){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var e=0;e<this.geometry.morphTargets.length;e++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[e].name]= e}};THREE.Mesh.prototype=new THREE.Object3D;THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.supr=THREE.Object3D.prototype;THREE.Mesh.prototype.getMorphTargetIndexByName=function(b){if(this.morphTargetDictionary[b]!==void 0)return this.morphTargetDictionary[b];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+b+" does not exist. Returning 0.");return 0}; THREE.Bone=function(b){THREE.Object3D.call(this);this.skin=b;this.skinMatrix=new THREE.Matrix4;this.hasNoneBoneChildren=!1};THREE.Bone.prototype=new THREE.Object3D;THREE.Bone.prototype.constructor=THREE.Bone;THREE.Bone.prototype.supr=THREE.Object3D.prototype; THREE.Bone.prototype.update=function(b,d,e){this.matrixAutoUpdate&&(d|=this.updateMatrix());if(d||this.matrixWorldNeedsUpdate)b?this.skinMatrix.multiply(b,this.matrix):this.skinMatrix.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,d=!0;var f,h=this.children.length;if(this.hasNoneBoneChildren){this.matrixWorld.multiply(this.skin.matrixWorld,this.skinMatrix);for(f=0;f<h;f++)b=this.children[f],b instanceof THREE.Bone?b.update(this.skinMatrix,d,e):b.update(this.matrixWorld,!0,e)}else for(f=0;f<h;f++)this.children[f].update(this.skinMatrix, d,e)};THREE.Bone.prototype.addChild=function(b){if(this.children.indexOf(b)===-1&&(b.parent!==void 0&&b.parent.removeChild(b),b.parent=this,this.children.push(b),!(b instanceof THREE.Bone)))this.hasNoneBoneChildren=!0}; THREE.SkinnedMesh=function(b,d){THREE.Mesh.call(this,b,d);this.identityMatrix=new THREE.Matrix4;this.bones=[];this.boneMatrices=[];var e,f,h,i,g,j;if(this.geometry.bones!==void 0){for(e=0;e<this.geometry.bones.length;e++)h=this.geometry.bones[e],i=h.pos,g=h.rotq,j=h.scl,f=this.addBone(),f.name=h.name,f.position.set(i[0],i[1],i[2]),f.quaternion.set(g[0],g[1],g[2],g[3]),f.useQuaternion=!0,j!==void 0?f.scale.set(j[0],j[1],j[2]):f.scale.set(1,1,1);for(e=0;e<this.bones.length;e++)h=this.geometry.bones[e], f=this.bones[e],h.parent===-1?this.addChild(f):this.bones[h.parent].addChild(f);this.boneMatrices=new Float32Array(16*this.bones.length);this.pose()}};THREE.SkinnedMesh.prototype=new THREE.Mesh;THREE.SkinnedMesh.prototype.constructor=THREE.SkinnedMesh; THREE.SkinnedMesh.prototype.update=function(b,d,e){if(this.visible){this.matrixAutoUpdate&&(d|=this.updateMatrix());if(d||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,d=!0;var f,h=this.children.length;for(f=0;f<h;f++)b=this.children[f],b instanceof THREE.Bone?b.update(this.identityMatrix,!1,e):b.update(this.matrixWorld,d,e);e=this.bones.length;ba=this.bones;bm=this.boneMatrices;for(d=0;d<e;d++)ba[d].skinMatrix.flattenToArrayOffset(bm, d*16)}};THREE.SkinnedMesh.prototype.addBone=function(b){b===void 0&&(b=new THREE.Bone(this));this.bones.push(b);return b}; THREE.SkinnedMesh.prototype.pose=function(){this.update(void 0,!0);for(var b,d=[],e=0;e<this.bones.length;e++)b=this.bones[e],d.push(THREE.Matrix4.makeInvert(b.skinMatrix)),b.skinMatrix.flattenToArrayOffset(this.boneMatrices,e*16);if(this.geometry.skinVerticesA===void 0){this.geometry.skinVerticesA=[];this.geometry.skinVerticesB=[];var f;for(b=0;b<this.geometry.skinIndices.length;b++){var e=this.geometry.vertices[b].position,h=this.geometry.skinIndices[b].x,i=this.geometry.skinIndices[b].y;f=new THREE.Vector3(e.x, e.y,e.z);this.geometry.skinVerticesA.push(d[h].multiplyVector3(f));f=new THREE.Vector3(e.x,e.y,e.z);this.geometry.skinVerticesB.push(d[i].multiplyVector3(f));this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y!==1&&(e=(1-(this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y))*0.5,this.geometry.skinWeights[b].x+=e,this.geometry.skinWeights[b].y+=e)}}};THREE.Ribbon=function(b,d){THREE.Object3D.call(this);this.geometry=b;this.materials=d instanceof Array?d:[d]}; THREE.Ribbon.prototype=new THREE.Object3D;THREE.Ribbon.prototype.constructor=THREE.Ribbon; THREE.Sound=function(b,d,e,f){THREE.Object3D.call(this);this.isPlaying=this.isAddedToDOM=this.isLoaded=!1;this.duration=-1;this.radius=d!==void 0?Math.abs(d):100;this.volume=Math.min(1,Math.max(0,e!==void 0?e:1));this.domElement=document.createElement("audio");this.domElement.volume=0;this.domElement.pan=0;this.domElement.loop=f!==void 0?f:!0;this.sources=b instanceof Array?b:[b];for(var h,e=this.sources.length,b=0;b<e;b++)if(d=this.sources[b],d.toLowerCase(),d.indexOf(".mp3")!==-1?h="audio/mpeg": d.indexOf(".ogg")!==-1?h="audio/ogg":d.indexOf(".wav")!==-1&&(h="audio/wav"),this.domElement.canPlayType(h)){h=document.createElement("source");h.src=this.sources[b];this.domElement.THREESound=this;this.domElement.appendChild(h);this.domElement.addEventListener("canplay",this.onLoad,!0);this.domElement.load();break}};THREE.Sound.prototype=new THREE.Object3D;THREE.Sound.prototype.constructor=THREE.Sound;THREE.Sound.prototype.supr=THREE.Object3D.prototype; THREE.Sound.prototype.onLoad=function(){var b=this.THREESound;if(!b.isLoaded)this.removeEventListener("canplay",this.onLoad,!0),b.isLoaded=!0,b.duration=this.duration,b.isPlaying&&b.play()};THREE.Sound.prototype.addToDOM=function(b){this.isAddedToDOM=!0;b.appendChild(this.domElement)};THREE.Sound.prototype.play=function(b){this.isPlaying=!0;if(this.isLoaded&&(this.domElement.play(),b))this.domElement.currentTime=b%this.duration};THREE.Sound.prototype.pause=function(){this.isPlaying=!1;this.domElement.pause()}; THREE.Sound.prototype.stop=function(){this.isPlaying=!1;this.domElement.pause();this.domElement.currentTime=0};THREE.Sound.prototype.calculateVolumeAndPan=function(b){b=b.length();this.domElement.volume=b<=this.radius?this.volume*(1-b/this.radius):0}; THREE.Sound.prototype.update=function(b,d,e){this.matrixAutoUpdate&&(this.matrix.setPosition(this.position),d=!0);if(d||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,d=!0;for(var f=this.children.length,b=0;b<f;b++)this.children[b].update(this.matrixWorld,d,e)};THREE.LOD=function(){THREE.Object3D.call(this);this.LODs=[]};THREE.LOD.prototype=new THREE.Object3D;THREE.LOD.prototype.constructor=THREE.LOD; THREE.LOD.prototype.supr=THREE.Object3D.prototype;THREE.LOD.prototype.add=function(b,d){d===void 0&&(d=0);for(var d=Math.abs(d),e=0;e<this.LODs.length;e++)if(d<this.LODs[e].visibleAtDistance)break;this.LODs.splice(e,0,{visibleAtDistance:d,object3D:b});this.addChild(b)}; THREE.LOD.prototype.update=function(b,d,e){this.matrixAutoUpdate&&(d|=this.updateMatrix());if(d||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,d=!0;if(this.LODs.length>1){b=e.matrixWorldInverse;b=-(b.n31*this.position.x+b.n32*this.position.y+b.n33*this.position.z+b.n34);this.LODs[0].object3D.visible=!0;for(var f=1;f<this.LODs.length;f++)if(b>=this.LODs[f].visibleAtDistance)this.LODs[f-1].object3D.visible=!1, this.LODs[f].object3D.visible=!0;else break;for(;f<this.LODs.length;f++)this.LODs[f].object3D.visible=!1}for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,d,e)};THREE.ShadowVolume=function(b,d){b instanceof THREE.Mesh?(THREE.Mesh.call(this,b.geometry,d?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]),b.addChild(this)):THREE.Mesh.call(this,b,d?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]);this.calculateShadowVolumeGeometry()}; THREE.ShadowVolume.prototype=new THREE.Mesh;THREE.ShadowVolume.prototype.constructor=THREE.ShadowVolume;THREE.ShadowVolume.prototype.supr=THREE.Mesh.prototype; THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry=function(){if(this.geometry.edges&&this.geometry.edges.length){var b,d,e,f,h,i,g,j,p,k,n,v,r,q,y=new THREE.Geometry;y.vertices=this.geometry.vertices;f=y.faces=this.geometry.faces;var B=y.egdes=this.geometry.edges,D=y.edgeFaces=[];h=0;var A=[];b=0;for(d=f.length;b<d;b++)if(e=f[b],A.push(h),h+=e instanceof THREE.Face3?3:4,e.vertexNormals[0]=e.normal,e.vertexNormals[1]=e.normal,e.vertexNormals[2]=e.normal,e instanceof THREE.Face4)e.vertexNormals[3]= e.normal;b=0;for(d=B.length;b<d;b++)j=B[b],e=j.faces[0],f=j.faces[1],h=j.faceIndices[0],i=j.faceIndices[1],g=j.vertexIndices[0],j=j.vertexIndices[1],e.a===g?(p="a",n=A[h]+0):e.b===g?(p="b",n=A[h]+1):e.c===g?(p="c",n=A[h]+2):e.d===g&&(p="d",n=A[h]+3),e.a===j?(p+="a",v=A[h]+0):e.b===j?(p+="b",v=A[h]+1):e.c===j?(p+="c",v=A[h]+2):e.d===j&&(p+="d",v=A[h]+3),f.a===g?(k="a",r=A[i]+0):f.b===g?(k="b",r=A[i]+1):f.c===g?(k="c",r=A[i]+2):f.d===g&&(k="d",r=A[i]+3),f.a===j?(k+="a",q=A[i]+0):f.b===j?(k+="b",q=A[i]+ 1):f.c===j?(k+="c",q=A[i]+2):f.d===j&&(k+="d",q=A[i]+3),p==="ac"||p==="ad"||p==="ca"||p==="da"?n>v&&(e=n,n=v,v=e):n<v&&(e=n,n=v,v=e),k==="ac"||k==="ad"||k==="ca"||k==="da"?r>q&&(e=r,r=q,q=e):r<q&&(e=r,r=q,q=e),e=new THREE.Face4(n,v,r,q),e.normal.set(1,0,0),D.push(e);this.geometry=y}else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry)}; THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo=function(b){this.geometry=new THREE.Geometry;this.geometry.boundingSphere=b.boundingSphere;this.geometry.edgeFaces=[];var d=this.geometry.vertices,e=this.geometry.faces,f=this.geometry.edgeFaces,h=b.faces,b=b.vertices,i=h.length,g,j,p,k,n,v=["a","b","c","d"];for(p=0;p<i;p++){j=d.length;g=h[p];g instanceof THREE.Face4?(k=4,j=new THREE.Face4(j,j+1,j+2,j+3)):(k=3,j=new THREE.Face3(j,j+1,j+2));j.normal.copy(g.normal);e.push(j); for(j=0;j<k;j++)n=b[g[v[j]]],d.push(new THREE.Vertex(n.position.clone()))}for(i=0;i<h.length-1;i++){b=e[i];for(g=i+1;g<h.length;g++)j=e[g],j=this.facesShareEdge(d,b,j),j!==void 0&&(j=new THREE.Face4(j.indices[0],j.indices[3],j.indices[2],j.indices[1]),j.normal.set(1,0,0),f.push(j))}}; THREE.ShadowVolume.prototype.facesShareEdge=function(b,d,e){var f,h,i,g,j,p,k,n,v,r,q,y,B,D=0,A=["a","b","c","d"];f=d instanceof THREE.Face4?4:3;h=e instanceof THREE.Face4?4:3;for(y=0;y<f;y++){i=d[A[y]];j=b[i];for(B=0;B<h;B++)if(g=e[A[B]],p=b[g],Math.abs(j.position.x-p.position.x)<1.0E-4&&Math.abs(j.position.y-p.position.y)<1.0E-4&&Math.abs(j.position.z-p.position.z)<1.0E-4&&(D++,D===1&&(k=j,n=p,v=i,r=g,q=A[y]),D===2))return q+=A[y],q==="ad"||q==="ac"?{faces:[d,e],vertices:[k,n,p,j],indices:[v,r, g,i],vertexTypes:[1,2,2,1],extrudable:!0}:{faces:[d,e],vertices:[k,j,p,n],indices:[v,i,g,r],vertexTypes:[1,1,2,2],extrudable:!0}}}; THREE.Sprite=function(b){THREE.Object3D.call(this);if(b.material!==void 0)this.material=b.material,this.map=void 0,this.blending=material.blending;else if(b.map!==void 0)this.map=b.map instanceof THREE.Texture?b.map:THREE.ImageUtils.loadTexture(b.map),this.material=void 0,this.blending=b.blending!==void 0?b.blending:THREE.NormalBlending;this.useScreenCoordinates=b.useScreenCoordinates!==void 0?b.useScreenCoordinates:!0;this.mergeWith3D=b.mergeWith3D!==void 0?b.mergeWith3D:!this.useScreenCoordinates; this.affectedByDistance=b.affectedByDistance!==void 0?b.affectedByDistance:!this.useScreenCoordinates;this.alignment=b.alignment instanceof THREE.Vector2?b.alignment:THREE.SpriteAlignment.center;this.rotation3d=this.rotation;this.rotation=0;this.opacity=1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=new THREE.Vector2(1,1)};THREE.Sprite.prototype=new THREE.Object3D;THREE.Sprite.prototype.constructor=THREE.Sprite;THREE.Sprite.prototype.supr=THREE.Object3D.prototype; THREE.Sprite.prototype.updateMatrix=function(){this.matrix.setPosition(this.position);this.rotation3d.set(0,0,this.rotation);this.matrix.setRotationFromEuler(this.rotation3d);if(this.scale.x!==1||this.scale.y!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,this.scale.y);this.matrixWorldNeedsUpdate=!0};THREE.SpriteAlignment={};THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1); THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1); THREE.Scene=function(){THREE.Object3D.call(this);this.matrixAutoUpdate=!1;this.collisions=this.fog=null;this.objects=[];this.lights=[];this.sounds=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=new THREE.Object3D;THREE.Scene.prototype.constructor=THREE.Scene;THREE.Scene.prototype.supr=THREE.Object3D.prototype;THREE.Scene.prototype.addChild=function(b){this.supr.addChild.call(this,b);this.addChildRecurse(b)}; THREE.Scene.prototype.addChildRecurse=function(b){if(b instanceof THREE.Light)this.lights.indexOf(b)===-1&&this.lights.push(b);else if(b instanceof THREE.Sound)this.sounds.indexOf(b)===-1&&this.sounds.push(b);else if(!(b instanceof THREE.Camera||b instanceof THREE.Bone)&&this.objects.indexOf(b)===-1)this.objects.push(b),this.__objectsAdded.push(b);for(var d=0;d<b.children.length;d++)this.addChildRecurse(b.children[d])}; THREE.Scene.prototype.removeChild=function(b){this.supr.removeChild.call(this,b);this.removeChildRecurse(b)};THREE.Scene.prototype.removeChildRecurse=function(b){if(b instanceof THREE.Light){var d=this.lights.indexOf(b);d!==-1&&this.lights.splice(d,1)}else b instanceof THREE.Sound?(d=this.sounds.indexOf(b),d!==-1&&this.sounds.splice(d,1)):b instanceof THREE.Camera||(d=this.objects.indexOf(b),d!==-1&&(this.objects.splice(d,1),this.__objectsRemoved.push(b)));for(d=0;d<b.children.length;d++)this.removeChildRecurse(b.children[d])}; THREE.Scene.prototype.addObject=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeObject=THREE.Scene.prototype.removeChild;THREE.Scene.prototype.addLight=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeLight=THREE.Scene.prototype.removeChild;THREE.Fog=function(b,d,e){this.color=new THREE.Color(b);this.near=d||1;this.far=e||1E3};THREE.FogExp2=function(b,d){this.color=new THREE.Color(b);this.density=d!==void 0?d:2.5E-4}; THREE.Projector=function(){function b(){var b=p[j]=p[j]||new THREE.RenderableVertex;j++;return b}function d(b,d){return d.z-b.z}function e(b,d){var c=0,e=1,f=b.z+b.w,h=d.z+d.w,g=-b.z+b.w,i=-d.z+d.w;return f>=0&&h>=0&&g>=0&&i>=0?!0:f<0&&h<0||g<0&&i<0?!1:(f<0?c=Math.max(c,f/(f-h)):h<0&&(e=Math.min(e,f/(f-h))),g<0?c=Math.max(c,g/(g-i)):i<0&&(e=Math.min(e,g/(g-i))),e<c?!1:(b.lerpSelf(d,c),d.lerpSelf(b,1-e),!0))}var f,h,i=[],g,j,p=[],k,n,v=[],r,q=[],y,B,D=[],A,O,ha=[],T=new THREE.Vector4,E=new THREE.Vector4, x=new THREE.Matrix4,ca=new THREE.Matrix4,M=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],C=new THREE.Vector4,Q=new THREE.Vector4;this.projectVector=function(b,d){x.multiply(d.projectionMatrix,d.matrixWorldInverse);x.multiplyVector3(b);return b};this.unprojectVector=function(b,d){x.multiply(d.matrixWorld,THREE.Matrix4.makeInvert(d.projectionMatrix));x.multiplyVector3(b);return b};this.projectObjects=function(b,e,c){var e=[],g,j,k;h=0; j=b.objects;b=0;for(g=j.length;b<g;b++){k=j[b];var p;if(!(p=!k.visible))if(p=k instanceof THREE.Mesh){a:{p=void 0;for(var n=k.matrixWorld,r=-k.geometry.boundingSphere.radius*Math.max(k.scale.x,Math.max(k.scale.y,k.scale.z)),v=0;v<6;v++)if(p=M[v].x*n.n14+M[v].y*n.n24+M[v].z*n.n34+M[v].w,p<=r){p=!1;break a}p=!0}p=!p}if(!p)p=i[h]=i[h]||new THREE.RenderableObject,h++,f=p,T.copy(k.position),x.multiplyVector3(T),f.object=k,f.z=T.z,e.push(f)}c&&e.sort(d);return e};this.projectScene=function(f,h,c){var i= [],T=h.near,Ba=h.far,ia,ka,P,R,J,H,S,L,N,F,ja,la,ra,qa,pa,na,sa;O=B=r=n=0;h.matrixAutoUpdate&&h.update(void 0,!0);f.update(void 0,!1,h);x.multiply(h.projectionMatrix,h.matrixWorldInverse);M[0].set(x.n41-x.n11,x.n42-x.n12,x.n43-x.n13,x.n44-x.n14);M[1].set(x.n41+x.n11,x.n42+x.n12,x.n43+x.n13,x.n44+x.n14);M[2].set(x.n41+x.n21,x.n42+x.n22,x.n43+x.n23,x.n44+x.n24);M[3].set(x.n41-x.n21,x.n42-x.n22,x.n43-x.n23,x.n44-x.n24);M[4].set(x.n41-x.n31,x.n42-x.n32,x.n43-x.n33,x.n44-x.n34);M[5].set(x.n41+x.n31,x.n42+ x.n32,x.n43+x.n33,x.n44+x.n34);for(ia=0;ia<6;ia++)N=M[ia],N.divideScalar(Math.sqrt(N.x*N.x+N.y*N.y+N.z*N.z));N=this.projectObjects(f,h,!0);f=0;for(ia=N.length;f<ia;f++)if(F=N[f].object,F.visible)if(ja=F.matrixWorld,la=F.matrixRotationWorld,ra=F.materials,qa=F.overdraw,j=0,F instanceof THREE.Mesh){pa=F.geometry;R=pa.vertices;na=pa.faces;pa=pa.faceVertexUvs;ka=0;for(P=R.length;ka<P;ka++)g=b(),g.positionWorld.copy(R[ka].position),ja.multiplyVector3(g.positionWorld),g.positionScreen.copy(g.positionWorld), x.multiplyVector4(g.positionScreen),g.positionScreen.x/=g.positionScreen.w,g.positionScreen.y/=g.positionScreen.w,g.visible=g.positionScreen.z>T&&g.positionScreen.z<Ba;R=0;for(ka=na.length;R<ka;R++){P=na[R];if(P instanceof THREE.Face3)if(J=p[P.a],H=p[P.b],S=p[P.c],J.visible&&H.visible&&S.visible&&(F.doubleSided||F.flipSided!=(S.positionScreen.x-J.positionScreen.x)*(H.positionScreen.y-J.positionScreen.y)-(S.positionScreen.y-J.positionScreen.y)*(H.positionScreen.x-J.positionScreen.x)<0))L=v[n]=v[n]|| new THREE.RenderableFace3,n++,k=L,k.v1.copy(J),k.v2.copy(H),k.v3.copy(S);else continue;else if(P instanceof THREE.Face4)if(J=p[P.a],H=p[P.b],S=p[P.c],L=p[P.d],J.visible&&H.visible&&S.visible&&L.visible&&(F.doubleSided||F.flipSided!=((L.positionScreen.x-J.positionScreen.x)*(H.positionScreen.y-J.positionScreen.y)-(L.positionScreen.y-J.positionScreen.y)*(H.positionScreen.x-J.positionScreen.x)<0||(H.positionScreen.x-S.positionScreen.x)*(L.positionScreen.y-S.positionScreen.y)-(H.positionScreen.y-S.positionScreen.y)* (L.positionScreen.x-S.positionScreen.x)<0)))sa=q[r]=q[r]||new THREE.RenderableFace4,r++,k=sa,k.v1.copy(J),k.v2.copy(H),k.v3.copy(S),k.v4.copy(L);else continue;k.normalWorld.copy(P.normal);la.multiplyVector3(k.normalWorld);k.centroidWorld.copy(P.centroid);ja.multiplyVector3(k.centroidWorld);k.centroidScreen.copy(k.centroidWorld);x.multiplyVector3(k.centroidScreen);S=P.vertexNormals;J=0;for(H=S.length;J<H;J++)L=k.vertexNormalsWorld[J],L.copy(S[J]),la.multiplyVector3(L);J=0;for(H=pa.length;J<H;J++)if(sa= pa[J][R]){S=0;for(L=sa.length;S<L;S++)k.uvs[J][S]=sa[S]}k.meshMaterials=ra;k.faceMaterials=P.materials;k.overdraw=qa;k.z=k.centroidScreen.z;i.push(k)}}else if(F instanceof THREE.Line){ca.multiply(x,ja);R=F.geometry.vertices;J=b();J.positionScreen.copy(R[0].position);ca.multiplyVector4(J.positionScreen);ka=1;for(P=R.length;ka<P;ka++)if(J=b(),J.positionScreen.copy(R[ka].position),ca.multiplyVector4(J.positionScreen),H=p[j-2],C.copy(J.positionScreen),Q.copy(H.positionScreen),e(C,Q))C.multiplyScalar(1/ C.w),Q.multiplyScalar(1/Q.w),ja=D[B]=D[B]||new THREE.RenderableLine,B++,y=ja,y.v1.positionScreen.copy(C),y.v2.positionScreen.copy(Q),y.z=Math.max(C.z,Q.z),y.materials=F.materials,i.push(y)}else if(F instanceof THREE.Particle&&(E.set(F.matrixWorld.n14,F.matrixWorld.n24,F.matrixWorld.n34,1),x.multiplyVector4(E),E.z/=E.w,E.z>0&&E.z<1))ja=ha[O]=ha[O]||new THREE.RenderableParticle,O++,A=ja,A.x=E.x/E.w,A.y=E.y/E.w,A.z=E.z,A.rotation=F.rotation.z,A.scale.x=F.scale.x*Math.abs(A.x-(E.x+h.projectionMatrix.n11)/ (E.w+h.projectionMatrix.n14)),A.scale.y=F.scale.y*Math.abs(A.y-(E.y+h.projectionMatrix.n22)/(E.w+h.projectionMatrix.n24)),A.materials=F.materials,i.push(A);c&&i.sort(d);return i}}; THREE.SoundRenderer=function(){this.volume=1;this.domElement=document.createElement("div");this.domElement.id="THREESound";this.cameraPosition=new THREE.Vector3;this.soundPosition=new THREE.Vector3;this.render=function(b,d,e){e&&b.update(void 0,!1,d);var e=b.sounds,f,h=e.length;for(f=0;f<h;f++)b=e[f],this.soundPosition.set(b.matrixWorld.n14,b.matrixWorld.n24,b.matrixWorld.n34),this.soundPosition.subSelf(d.position),b.isPlaying&&b.isLoaded&&(b.isAddedToDOM||b.addToDOM(this.domElement),b.calculateVolumeAndPan(this.soundPosition))}}; THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",fog_fragment:"#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif", envmap_pars_fragment:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",envmap_fragment:"#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif", envmap_vertex:"#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",map_particle_pars_fragment:"#ifdef USE_MAP\nuniform sampler2D map;\n#endif", map_particle_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",map_pars_fragment:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",map_pars_vertex:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",map_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",map_vertex:"#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif", lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",lightmap_fragment:"#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",lights_pars_vertex:"uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif", lights_vertex:"if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}", lights_pars_fragment:"#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",lights_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;", color_pars_fragment:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\nvColor = color;\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",skinning_vertex:"#ifdef USE_SKINNING\ngl_Position = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif", morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif", default_vertex:"#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"};THREE.UniformsUtils={merge:function(b){var d,e,f,h={};for(d=0;d<b.length;d++)for(e in f=this.clone(b[d]),f)h[e]=f[e];return h},clone:function(b){var d,e,f,h={};for(d in b)for(e in h[d]={},b[d])f=b[d][e],h[d][e]=f instanceof THREE.Color||f instanceof THREE.Vector3||f instanceof THREE.Texture?f.clone():f;return h}}; THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:0,texture:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:2,texture:null},envMap:{type:"t",value:1,texture:null},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},combine:{type:"i",value:0},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c", value:new THREE.Color(16777215)},morphTargetInfluences:{type:"f",value:0}},lights:{enableLighting:{type:"i",value:1},ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",value:1},scale:{type:"f",value:1}, map:{type:"t",value:0,texture:null},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}}}; THREE.ShaderLib={lensFlareVertexTexture:{vertexShader:"uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform int renderType;\nuniform\tsampler2D\tocclusionMap;\nattribute \tvec2 \tposition;\nattribute vec2\tUV;\nvarying\tvec2\tvUV;\nvarying\tfloat\tvVisibility;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ));\nvVisibility = ( visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n( visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nuniform int renderType;\nvarying\tvec2\t\tvUV;\nvarying\tfloat\t\tvVisibility;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}"}, lensFlare:{vertexShader:"uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform int renderType;\nattribute \tvec2 \tposition;\nattribute vec2\tUV;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}", fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tsampler2D\tocclusionMap;\nuniform\tfloat\t\topacity;\nuniform int renderType;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 )).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}"}, sprite:{vertexShader:"uniform\tint\t\tuseScreenCoordinates;\nuniform int affectedByDistance;\nuniform\tvec3\tscreenPosition;\nuniform \tmat4 \tmodelViewMatrix;\nuniform \tmat4 \tprojectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform\tvec2 uvScale;\nattribute \tvec2 \tposition;\nattribute vec2\tuv;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}", fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}"},shadowPost:{vertexShader:"uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main(void)\n{\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}",fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main( void )\n{\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}"}, shadowVolumeDynamic:{uniforms:{directionalLightDirection:{type:"fv",value:[]}},vertexShader:"uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos = objectMatrix * vec4( position, 1.0 );\nvec3 norm = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm )), 0.0 );\ngl_Position = projectionMatrix * viewMatrix * ( pos + extruded );\n}",fragmentShader:"void main() {\ngl_FragColor = vec4( 1.0 );\n}"}, depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2E3},opacity:{type:"f",value:1}},fragmentShader:"uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"},normal:{uniforms:{opacity:{type:"f",value:1}}, fragmentShader:"uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",vertexShader:"varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}"},basic:{uniforms:THREE.UniformsLib.common,fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:[THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.lights]), fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["varying vec3 vLightWeighting;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"vec3 transformedNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk.lights_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.lights,{ambient:{type:"c",value:new THREE.Color(328965)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30}}]), fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_pars_fragment,"void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );",THREE.ShaderChunk.lights_fragment,THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;",THREE.ShaderChunk.lights_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsLib.particle,fragmentShader:["uniform vec3 psColor;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n")}}; THREE.WebGLRenderer=function(b){function d(b,d,e){var f,h,g,i=b.vertices,j=i.length,k=b.colors,p=k.length,o=b.__vertexArray,G=b.__colorArray,va=b.__sortArray,n=b.__dirtyVertices,r=b.__dirtyColors;if(e.sortParticles){ja.multiplySelf(e.matrixWorld);for(f=0;f<j;f++)h=i[f].position,qa.copy(h),ja.multiplyVector3(qa),va[f]=[qa.z,f];va.sort(function(b,c){return c[0]-b[0]});for(f=0;f<j;f++)h=i[va[f][1]].position,g=f*3,o[g]=h.x,o[g+1]=h.y,o[g+2]=h.z;for(f=0;f<p;f++)g=f*3,color=k[va[f][1]],G[g]=color.r,G[g+ 1]=color.g,G[g+2]=color.b}else{if(n)for(f=0;f<j;f++)h=i[f].position,g=f*3,o[g]=h.x,o[g+1]=h.y,o[g+2]=h.z;if(r)for(f=0;f<p;f++)color=k[f],g=f*3,G[g]=color.r,G[g+1]=color.g,G[g+2]=color.b}if(n||e.sortParticles)c.bindBuffer(c.ARRAY_BUFFER,b.__webglVertexBuffer),c.bufferData(c.ARRAY_BUFFER,o,d);if(r||e.sortParticles)c.bindBuffer(c.ARRAY_BUFFER,b.__webglColorBuffer),c.bufferData(c.ARRAY_BUFFER,G,d)}function e(b,d,e,f,h){f.program||aa.initMaterial(f,d,e,h);var g=f.program,i=g.uniforms,j=f.uniforms;g!=ma&& (c.useProgram(g),ma=g);c.uniformMatrix4fv(i.projectionMatrix,!1,la);if(e&&(f instanceof THREE.MeshBasicMaterial||f instanceof THREE.MeshLambertMaterial||f instanceof THREE.MeshPhongMaterial||f instanceof THREE.LineBasicMaterial||f instanceof THREE.ParticleBasicMaterial||f.fog))if(j.fogColor.value=e.color,e instanceof THREE.Fog)j.fogNear.value=e.near,j.fogFar.value=e.far;else if(e instanceof THREE.FogExp2)j.fogDensity.value=e.density;if(f instanceof THREE.MeshPhongMaterial||f instanceof THREE.MeshLambertMaterial|| f.lights){var k,p,o=0,G=0,va=0,n,r,v,q,t=pa,y=t.directional.colors,A=t.directional.positions,B=t.point.colors,I=t.point.positions,K=t.point.distances,u=0,s=0,e=p=q=0;for(k=d.length;e<k;e++)if(p=d[e],n=p.color,r=p.position,v=p.intensity,q=p.distance,p instanceof THREE.AmbientLight)o+=n.r,G+=n.g,va+=n.b;else if(p instanceof THREE.DirectionalLight)q=u*3,y[q]=n.r*v,y[q+1]=n.g*v,y[q+2]=n.b*v,A[q]=r.x,A[q+1]=r.y,A[q+2]=r.z,u+=1;else if(p instanceof THREE.PointLight)p=s*3,B[p]=n.r*v,B[p+1]=n.g*v,B[p+2]= n.b*v,I[p]=r.x,I[p+1]=r.y,I[p+2]=r.z,K[s]=q,s+=1;for(e=u*3;e<y.length;e++)y[e]=0;for(e=s*3;e<B.length;e++)B[e]=0;t.point.length=s;t.directional.length=u;t.ambient[0]=o;t.ambient[1]=G;t.ambient[2]=va;e=pa;j.enableLighting.value=e.directional.length+e.point.length;j.ambientLightColor.value=e.ambient;j.directionalLightColor.value=e.directional.colors;j.directionalLightDirection.value=e.directional.positions;j.pointLightColor.value=e.point.colors;j.pointLightPosition.value=e.point.positions;j.pointLightDistance.value= e.point.distances}if(f instanceof THREE.MeshBasicMaterial||f instanceof THREE.MeshLambertMaterial||f instanceof THREE.MeshPhongMaterial)j.diffuse.value=f.color,j.opacity.value=f.opacity,(j.map.texture=f.map)&&j.offsetRepeat.value.set(f.map.offset.x,f.map.offset.y,f.map.repeat.x,f.map.repeat.y),j.lightMap.texture=f.lightMap,j.envMap.texture=f.envMap,j.reflectivity.value=f.reflectivity,j.refractionRatio.value=f.refractionRatio,j.combine.value=f.combine,j.useRefract.value=f.envMap&&f.envMap.mapping instanceof THREE.CubeRefractionMapping;if(f instanceof THREE.LineBasicMaterial)j.diffuse.value=f.color,j.opacity.value=f.opacity;else if(f instanceof THREE.ParticleBasicMaterial)j.psColor.value=f.color,j.opacity.value=f.opacity,j.size.value=f.size,j.scale.value=na.height/2,j.map.texture=f.map;else if(f instanceof THREE.MeshPhongMaterial)j.ambient.value=f.ambient,j.specular.value=f.specular,j.shininess.value=f.shininess;else if(f instanceof THREE.MeshDepthMaterial)j.mNear.value=b.near,j.mFar.value=b.far,j.opacity.value= f.opacity;else if(f instanceof THREE.MeshNormalMaterial)j.opacity.value=f.opacity;for(var z in j)if(G=g.uniforms[z])if(k=j[z],o=k.type,e=k.value,o=="i")c.uniform1i(G,e);else if(o=="f")c.uniform1f(G,e);else if(o=="fv1")c.uniform1fv(G,e);else if(o=="fv")c.uniform3fv(G,e);else if(o=="v2")c.uniform2f(G,e.x,e.y);else if(o=="v3")c.uniform3f(G,e.x,e.y,e.z);else if(o=="v4")c.uniform4f(G,e.x,e.y,e.z,e.w);else if(o=="c")c.uniform3f(G,e.r,e.g,e.b);else if(o=="t"&&(c.uniform1i(G,e),k=k.texture))if(k.image instanceof Array&&k.image.length==6){if(k.image.length==6){if(k.needsUpdate){if(k.__webglInit){c.bindTexture(c.TEXTURE_CUBE_MAP,k.image.__webglTextureCube);for(o=0;o<6;++o)c.texSubImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,0,0,c.RGBA,c.UNSIGNED_BYTE,k.image[o])}else{k.image.__webglTextureCube=c.createTexture();c.bindTexture(c.TEXTURE_CUBE_MAP,k.image.__webglTextureCube);for(o=0;o<6;++o)c.texImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,k.image[o]);k.__webglInit=!0}x(c.TEXTURE_CUBE_MAP, k,k.image[0]);c.bindTexture(c.TEXTURE_CUBE_MAP,null);k.needsUpdate=!1}c.activeTexture(c.TEXTURE0+e);c.bindTexture(c.TEXTURE_CUBE_MAP,k.image.__webglTextureCube)}}else ca(k,e);c.uniformMatrix4fv(i.modelViewMatrix,!1,h._modelViewMatrixArray);c.uniformMatrix3fv(i.normalMatrix,!1,h._normalMatrixArray);(f instanceof THREE.MeshShaderMaterial||f instanceof THREE.MeshPhongMaterial||f.envMap)&&i.cameraPosition!==null&&c.uniform3f(i.cameraPosition,b.position.x,b.position.y,b.position.z);(f instanceof THREE.MeshShaderMaterial|| f.envMap||f.skinning)&&i.objectMatrix!==null&&c.uniformMatrix4fv(i.objectMatrix,!1,h._objectMatrixArray);(f instanceof THREE.MeshPhongMaterial||f instanceof THREE.MeshLambertMaterial||f instanceof THREE.MeshShaderMaterial||f.skinning)&&i.viewMatrix!==null&&c.uniformMatrix4fv(i.viewMatrix,!1,ra);if(f instanceof THREE.ShadowVolumeDynamicMaterial)b=j.directionalLightDirection.value,b[0]=-d[1].position.x,b[1]=-d[1].position.y,b[2]=-d[1].position.z,c.uniform3fv(i.directionalLightDirection,b),c.uniformMatrix4fv(i.objectMatrix, !1,h._objectMatrixArray),c.uniformMatrix4fv(i.viewMatrix,!1,ra);f.skinning&&(c.uniformMatrix4fv(i.cameraInverseMatrix,!1,ra),c.uniformMatrix4fv(i.boneGlobalMatrices,!1,h.boneMatrices));return g}function f(b,d,f,h,g,i){if(h.opacity!=0){var j,b=e(b,d,f,h,i).attributes;if(!h.morphTargets&&b.position>=0)c.bindBuffer(c.ARRAY_BUFFER,g.__webglVertexBuffer),c.vertexAttribPointer(b.position,3,c.FLOAT,!1,0,0);else{d=h.program.attributes;i.morphTargetBase!==-1?(c.bindBuffer(c.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[i.morphTargetBase]), c.vertexAttribPointer(d.position,3,c.FLOAT,!1,0,0)):d.position>=0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglVertexBuffer),c.vertexAttribPointer(d.position,3,c.FLOAT,!1,0,0));if(i.morphTargetForcedOrder.length)for(var f=0,k=i.morphTargetForcedOrder,p=i.morphTargetInfluences;f<h.numSupportedMorphTargets&&f<k.length;)c.bindBuffer(c.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[k[f]]),c.vertexAttribPointer(d["morphTarget"+f],3,c.FLOAT,!1,0,0),i.__webglMorphTargetInfluences[f]=p[k[f]],f++;else{var k=[],n=-1, o=0,p=i.morphTargetInfluences,G,va=p.length,f=0;for(i.morphTargetBase!==-1&&(k[i.morphTargetBase]=!0);f<h.numSupportedMorphTargets;){for(G=0;G<va;G++)!k[G]&&p[G]>n&&(o=G,n=p[o]);c.bindBuffer(c.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[o]);c.vertexAttribPointer(d["morphTarget"+f],3,c.FLOAT,!1,0,0);i.__webglMorphTargetInfluences[f]=n;k[o]=1;n=-1;f++}}h.program.uniforms.morphTargetInfluences!==null&&c.uniform1fv(h.program.uniforms.morphTargetInfluences,i.__webglMorphTargetInfluences)}if(g.__webglCustomAttributes)for(j in g.__webglCustomAttributes)b[j]>= 0&&(d=g.__webglCustomAttributes[j],c.bindBuffer(c.ARRAY_BUFFER,d.buffer),c.vertexAttribPointer(b[j],d.size,c.FLOAT,!1,0,0));b.color>=0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglColorBuffer),c.vertexAttribPointer(b.color,3,c.FLOAT,!1,0,0));b.normal>=0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglNormalBuffer),c.vertexAttribPointer(b.normal,3,c.FLOAT,!1,0,0));b.tangent>=0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglTangentBuffer),c.vertexAttribPointer(b.tangent,4,c.FLOAT,!1,0,0));b.uv>=0&&(g.__webglUVBuffer?(c.bindBuffer(c.ARRAY_BUFFER, g.__webglUVBuffer),c.vertexAttribPointer(b.uv,2,c.FLOAT,!1,0,0),c.enableVertexAttribArray(b.uv)):c.disableVertexAttribArray(b.uv));b.uv2>=0&&(g.__webglUV2Buffer?(c.bindBuffer(c.ARRAY_BUFFER,g.__webglUV2Buffer),c.vertexAttribPointer(b.uv2,2,c.FLOAT,!1,0,0),c.enableVertexAttribArray(b.uv2)):c.disableVertexAttribArray(b.uv2));h.skinning&&b.skinVertexA>=0&&b.skinVertexB>=0&&b.skinIndex>=0&&b.skinWeight>=0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinVertexABuffer),c.vertexAttribPointer(b.skinVertexA,4, c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinVertexBBuffer),c.vertexAttribPointer(b.skinVertexB,4,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinIndicesBuffer),c.vertexAttribPointer(b.skinIndex,4,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinWeightsBuffer),c.vertexAttribPointer(b.skinWeight,4,c.FLOAT,!1,0,0));i instanceof THREE.Mesh?(h.wireframe?(c.lineWidth(h.wireframeLinewidth),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,g.__webglLineBuffer),c.drawElements(c.LINES,g.__webglLineCount, c.UNSIGNED_SHORT,0)):(c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,g.__webglFaceBuffer),c.drawElements(c.TRIANGLES,g.__webglFaceCount,c.UNSIGNED_SHORT,0)),aa.data.vertices+=g.__webglFaceCount,aa.data.faces+=g.__webglFaceCount/3,aa.data.drawCalls++):i instanceof THREE.Line?(i=i.type==THREE.LineStrip?c.LINE_STRIP:c.LINES,c.lineWidth(h.linewidth),c.drawArrays(i,0,g.__webglLineCount),aa.data.drawCalls++):i instanceof THREE.ParticleSystem?(c.drawArrays(c.POINTS,0,g.__webglParticleCount),aa.data.drawCalls++):i instanceof THREE.Ribbon&&(c.drawArrays(c.TRIANGLE_STRIP,0,g.__webglVertexCount),aa.data.drawCalls++)}}function h(b,d,e){if(!b.__webglVertexBuffer)b.__webglVertexBuffer=c.createBuffer();if(!b.__webglNormalBuffer)b.__webglNormalBuffer=c.createBuffer();b.hasPos&&(c.bindBuffer(c.ARRAY_BUFFER,b.__webglVertexBuffer),c.bufferData(c.ARRAY_BUFFER,b.positionArray,c.DYNAMIC_DRAW),c.enableVertexAttribArray(d.attributes.position),c.vertexAttribPointer(d.attributes.position,3,c.FLOAT,!1,0,0));if(b.hasNormal){c.bindBuffer(c.ARRAY_BUFFER, b.__webglNormalBuffer);if(e==THREE.FlatShading){var f,g,h,i,j,k,p,o,G,n,r=b.count*3;for(n=0;n<r;n+=9)e=b.normalArray,f=e[n],g=e[n+1],h=e[n+2],i=e[n+3],k=e[n+4],o=e[n+5],j=e[n+6],p=e[n+7],G=e[n+8],f=(f+i+j)/3,g=(g+k+p)/3,h=(h+o+G)/3,e[n]=f,e[n+1]=g,e[n+2]=h,e[n+3]=f,e[n+4]=g,e[n+5]=h,e[n+6]=f,e[n+7]=g,e[n+8]=h}c.bufferData(c.ARRAY_BUFFER,b.normalArray,c.DYNAMIC_DRAW);c.enableVertexAttribArray(d.attributes.normal);c.vertexAttribPointer(d.attributes.normal,3,c.FLOAT,!1,0,0)}c.drawArrays(c.TRIANGLES, 0,b.count);b.count=0}function i(b){if(ka!=b.doubleSided)b.doubleSided?c.disable(c.CULL_FACE):c.enable(c.CULL_FACE),ka=b.doubleSided;if(P!=b.flipSided)b.flipSided?c.frontFace(c.CW):c.frontFace(c.CCW),P=b.flipSided}function g(b){J!=b&&(b?c.enable(c.DEPTH_TEST):c.disable(c.DEPTH_TEST),J=b)}function j(b){F[0].set(b.n41-b.n11,b.n42-b.n12,b.n43-b.n13,b.n44-b.n14);F[1].set(b.n41+b.n11,b.n42+b.n12,b.n43+b.n13,b.n44+b.n14);F[2].set(b.n41+b.n21,b.n42+b.n22,b.n43+b.n23,b.n44+b.n24);F[3].set(b.n41-b.n21,b.n42- b.n22,b.n43-b.n23,b.n44-b.n24);F[4].set(b.n41-b.n31,b.n42-b.n32,b.n43-b.n33,b.n44-b.n34);F[5].set(b.n41+b.n31,b.n42+b.n32,b.n43+b.n33,b.n44+b.n34);for(var c,b=0;b<6;b++)c=F[b],c.divideScalar(Math.sqrt(c.x*c.x+c.y*c.y+c.z*c.z))}function p(b){for(var c=b.matrixWorld,d=-b.geometry.boundingSphere.radius*Math.max(b.scale.x,Math.max(b.scale.y,b.scale.z)),e=0;e<6;e++)if(b=F[e].x*c.n14+F[e].y*c.n24+F[e].z*c.n34+F[e].w,b<=d)return!1;return!0}function k(b,c){b.list[b.count]=c;b.count+=1}function n(b){var c, d,e=b.object,f=b.opaque,g=b.transparent;g.count=0;b=f.count=0;for(c=e.materials.length;b<c;b++)d=e.materials[b],d.transparent?k(g,d):k(f,d)}function v(b){var c,d,e,f,g=b.object,h=b.buffer,i=b.opaque,j=b.transparent;j.count=0;b=i.count=0;for(e=g.materials.length;b<e;b++)if(c=g.materials[b],c instanceof THREE.MeshFaceMaterial){c=0;for(d=h.materials.length;c<d;c++)(f=h.materials[c])&&(f.transparent?k(j,f):k(i,f))}else(f=c)&&(f.transparent?k(j,f):k(i,f))}function r(b,c){return c.z-b.z}function q(b){c.enable(c.POLYGON_OFFSET_FILL); c.polygonOffset(0.1,1);c.enable(c.STENCIL_TEST);c.enable(c.DEPTH_TEST);c.depthMask(!1);c.colorMask(!1,!1,!1,!1);c.stencilFunc(c.ALWAYS,1,255);c.stencilOpSeparate(c.BACK,c.KEEP,c.INCR,c.KEEP);c.stencilOpSeparate(c.FRONT,c.KEEP,c.DECR,c.KEEP);var d,e=b.lights.length,f,g=b.lights,h=[],i,j,k,p,o,n=b.__webglShadowVolumes.length;for(d=0;d<e;d++)if(f=b.lights[d],f instanceof THREE.DirectionalLight&&f.castShadow){h[0]=-f.position.x;h[1]=-f.position.y;h[2]=-f.position.z;for(o=0;o<n;o++)f=b.__webglShadowVolumes[o].object, i=b.__webglShadowVolumes[o].buffer,j=f.materials[0],j.program||aa.initMaterial(j,g,void 0,f),j=j.program,k=j.uniforms,p=j.attributes,ma!==j&&(c.useProgram(j),ma=j,c.uniformMatrix4fv(k.projectionMatrix,!1,la),c.uniformMatrix4fv(k.viewMatrix,!1,ra),c.uniform3fv(k.directionalLightDirection,h)),f.matrixWorld.flattenToArray(f._objectMatrixArray),c.uniformMatrix4fv(k.objectMatrix,!1,f._objectMatrixArray),c.bindBuffer(c.ARRAY_BUFFER,i.__webglVertexBuffer),c.vertexAttribPointer(p.position,3,c.FLOAT,!1,0, 0),c.bindBuffer(c.ARRAY_BUFFER,i.__webglNormalBuffer),c.vertexAttribPointer(p.normal,3,c.FLOAT,!1,0,0),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,i.__webglFaceBuffer),c.cullFace(c.FRONT),c.drawElements(c.TRIANGLES,i.__webglFaceCount,c.UNSIGNED_SHORT,0),c.cullFace(c.BACK),c.drawElements(c.TRIANGLES,i.__webglFaceCount,c.UNSIGNED_SHORT,0)}c.disable(c.POLYGON_OFFSET_FILL);c.colorMask(!0,!0,!0,!0);c.stencilFunc(c.NOTEQUAL,0,255);c.stencilOp(c.KEEP,c.KEEP,c.KEEP);c.disable(c.DEPTH_TEST);R=-1;ma=u.program;c.useProgram(u.program); c.uniformMatrix4fv(u.projectionLocation,!1,la);c.uniform1f(u.darknessLocation,u.darkness);c.bindBuffer(c.ARRAY_BUFFER,u.vertexBuffer);c.vertexAttribPointer(u.vertexLocation,3,c.FLOAT,!1,0,0);c.enableVertexAttribArray(u.vertexLocation);c.blendFunc(c.ONE,c.ONE_MINUS_SRC_ALPHA);c.blendEquation(c.FUNC_ADD);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,u.elementBuffer);c.drawElements(c.TRIANGLES,6,c.UNSIGNED_SHORT,0);c.disable(c.STENCIL_TEST);c.enable(c.DEPTH_TEST);c.depthMask(ia)}function y(b,d){var e,f,g;e=_sprite.attributes; var h=_sprite.uniforms,i=N/L,j,k=[],p=L*0.5,o=N*0.5,n=!0;c.useProgram(_sprite.program);ma=_sprite.program;R=-1;Da||(c.enableVertexAttribArray(_sprite.attributes.position),c.enableVertexAttribArray(_sprite.attributes.uv),Da=!0);c.disable(c.CULL_FACE);c.enable(c.BLEND);c.depthMask(!0);c.bindBuffer(c.ARRAY_BUFFER,_sprite.vertexBuffer);c.vertexAttribPointer(e.position,2,c.FLOAT,!1,16,0);c.vertexAttribPointer(e.uv,2,c.FLOAT,!1,16,8);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,_sprite.elementBuffer);c.uniformMatrix4fv(h.projectionMatrix, !1,la);c.activeTexture(c.TEXTURE0);c.uniform1i(h.map,0);e=0;for(f=b.__webglSprites.length;e<f;e++)g=b.__webglSprites[e],g.useScreenCoordinates?g.z=-g.position.z:(g._modelViewMatrix.multiplyToArray(d.matrixWorldInverse,g.matrixWorld,g._modelViewMatrixArray),g.z=-g._modelViewMatrix.n34);b.__webglSprites.sort(r);e=0;for(f=b.__webglSprites.length;e<f;e++)g=b.__webglSprites[e],g.material===void 0&&g.map&&g.map.image&&g.map.image.width&&(g.useScreenCoordinates?(c.uniform1i(h.useScreenCoordinates,1),c.uniform3f(h.screenPosition, (g.position.x-p)/p,(o-g.position.y)/o,Math.max(0,Math.min(1,g.position.z)))):(c.uniform1i(h.useScreenCoordinates,0),c.uniform1i(h.affectedByDistance,g.affectedByDistance?1:0),c.uniformMatrix4fv(h.modelViewMatrix,!1,g._modelViewMatrixArray)),j=g.map.image.width/(g.affectedByDistance?1:N),k[0]=j*i*g.scale.x,k[1]=j*g.scale.y,c.uniform2f(h.uvScale,g.uvScale.x,g.uvScale.y),c.uniform2f(h.uvOffset,g.uvOffset.x,g.uvOffset.y),c.uniform2f(h.alignment,g.alignment.x,g.alignment.y),c.uniform1f(h.opacity,g.opacity), c.uniform1f(h.rotation,g.rotation),c.uniform2fv(h.scale,k),g.mergeWith3D&&!n?(c.enable(c.DEPTH_TEST),n=!0):!g.mergeWith3D&&n&&(c.disable(c.DEPTH_TEST),n=!1),E(g.blending),ca(g.map,0),c.drawElements(c.TRIANGLES,6,c.UNSIGNED_SHORT,0));c.enable(c.CULL_FACE);c.enable(c.DEPTH_TEST);c.depthMask(ia)}function B(b,d){var e,f,g=b.__webglLensFlares.length,h,i,j,k=new THREE.Vector3,p=N/L,o=L*0.5,n=N*0.5,r=16/N,v=[r*p,r],q=[1,1,0],x=[1,1],y=t.uniforms;e=t.attributes;c.useProgram(t.program);ma=t.program;R=-1;Ea|| (c.enableVertexAttribArray(t.attributes.vertex),c.enableVertexAttribArray(t.attributes.uv),Ea=!0);c.uniform1i(y.occlusionMap,0);c.uniform1i(y.map,1);c.bindBuffer(c.ARRAY_BUFFER,t.vertexBuffer);c.vertexAttribPointer(e.vertex,2,c.FLOAT,!1,16,0);c.vertexAttribPointer(e.uv,2,c.FLOAT,!1,16,8);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,t.elementBuffer);c.disable(c.CULL_FACE);c.depthMask(!1);c.activeTexture(c.TEXTURE0);c.bindTexture(c.TEXTURE_2D,t.occlusionTexture);c.activeTexture(c.TEXTURE1);for(f=0;f<g;f++)if(e= b.__webglLensFlares[f].object,k.set(e.matrixWorld.n14,e.matrixWorld.n24,e.matrixWorld.n34),d.matrixWorldInverse.multiplyVector3(k),d.projectionMatrix.multiplyVector3(k),q[0]=k.x,q[1]=k.y,q[2]=k.z,x[0]=q[0]*o+o,x[1]=q[1]*n+n,t.hasVertexTexture||x[0]>0&&x[0]<L&&x[1]>0&&x[1]<N){c.bindTexture(c.TEXTURE_2D,t.tempTexture);c.copyTexImage2D(c.TEXTURE_2D,0,c.RGB,x[0]-8,x[1]-8,16,16,0);c.uniform1i(y.renderType,0);c.uniform2fv(y.scale,v);c.uniform3fv(y.screenPosition,q);c.disable(c.BLEND);c.enable(c.DEPTH_TEST); c.drawElements(c.TRIANGLES,6,c.UNSIGNED_SHORT,0);c.bindTexture(c.TEXTURE_2D,t.occlusionTexture);c.copyTexImage2D(c.TEXTURE_2D,0,c.RGBA,x[0]-8,x[1]-8,16,16,0);c.uniform1i(y.renderType,1);c.disable(c.DEPTH_TEST);c.bindTexture(c.TEXTURE_2D,t.tempTexture);c.drawElements(c.TRIANGLES,6,c.UNSIGNED_SHORT,0);e.positionScreen.x=q[0];e.positionScreen.y=q[1];e.positionScreen.z=q[2];e.customUpdateCallback?e.customUpdateCallback(e):e.updateLensFlares();c.uniform1i(y.renderType,2);c.enable(c.BLEND);h=0;for(i=e.lensFlares.length;h< i;h++)if(j=e.lensFlares[h],j.opacity>0.0010&&j.scale>0.0010)q[0]=j.x,q[1]=j.y,q[2]=j.z,r=j.size*j.scale/N,v[0]=r*p,v[1]=r,c.uniform3fv(y.screenPosition,q),c.uniform2fv(y.scale,v),c.uniform1f(y.rotation,j.rotation),c.uniform1f(y.opacity,j.opacity),E(j.blending),ca(j.texture,1),c.drawElements(c.TRIANGLES,6,c.UNSIGNED_SHORT,0)}c.enable(c.CULL_FACE);c.enable(c.DEPTH_TEST);c.depthMask(ia)}function D(b,c){b._modelViewMatrix.multiplyToArray(c.matrixWorldInverse,b.matrixWorld,b._modelViewMatrixArray);THREE.Matrix4.makeInvert3x3(b._modelViewMatrix).transposeIntoArray(b._normalMatrixArray)} function A(b){var e,f,g,h,i;if(b instanceof THREE.Mesh){f=b.geometry;for(e in f.geometryGroups){g=f.geometryGroups[e];i=!1;for(h in g.__webglCustomAttributes)if(g.__webglCustomAttributes[h].needsUpdate){i=!0;break}if(f.__dirtyVertices||f.__dirtyMorphTargets||f.__dirtyElements||f.__dirtyUvs||f.__dirtyNormals||f.__dirtyColors||f.__dirtyTangents||i){i=b;var j=c.DYNAMIC_DRAW;if(g.__inittedArrays){var k=void 0,p=void 0,n=void 0,o=void 0,G=n=void 0,r=void 0,v=void 0,q=void 0,t=void 0,x=void 0,y=void 0, A=void 0,B=void 0,u=void 0,I=void 0,K=void 0,D=void 0,s=o=q=o=v=r=void 0,z=void 0,m=z=s=r=void 0,F=void 0,J=m=z=s=n=n=G=q=o=m=z=s=F=m=z=s=F=m=z=s=void 0,E=0,C=0,S=0,T=0,M=0,L=0,U=0,N=0,da=0,w=0,ea=0,z=s=0,H=g.__vertexArray,$=g.__uvArray,aa=g.__uv2Array,P=g.__normalArray,V=g.__tangentArray,fa=g.__colorArray,W=g.__skinVertexAArray,X=g.__skinVertexBArray,Y=g.__skinIndexArray,Z=g.__skinWeightArray,ca=g.__morphTargetsArrays,Q=g.__webglCustomAttributes,m=void 0,O=g.__faceArray,R=g.__lineArray,ha=g.__needsSmoothNormals, x=g.__vertexColorType,t=g.__uvType,y=g.__normalType,ga=i.geometry,ja=ga.__dirtyVertices,ka=ga.__dirtyElements,ia=ga.__dirtyUvs,ma=ga.__dirtyNormals,na=ga.__dirtyTangents,oa=ga.__dirtyColors,pa=ga.__dirtyMorphTargets,la=ga.vertices,qa=g.faces,sa=ga.faces,ra=ga.faceVertexUvs[0],ta=ga.faceVertexUvs[1],ya=ga.skinVerticesA,za=ga.skinVerticesB,Aa=ga.skinIndices,wa=ga.skinWeights,xa=i instanceof THREE.ShadowVolume?ga.edgeFaces:void 0,ua=ga.morphTargets;if(Q)for(J in Q)Q[J].offset=0,Q[J].offsetSrc=0;k=0; for(p=qa.length;k<p;k++)if(n=qa[k],o=sa[n],ra&&(A=ra[n]),ta&&(B=ta[n]),n=o.vertexNormals,G=o.normal,r=o.vertexColors,v=o.color,q=o.vertexTangents,o instanceof THREE.Face3){if(ja)u=la[o.a].position,I=la[o.b].position,K=la[o.c].position,H[C]=u.x,H[C+1]=u.y,H[C+2]=u.z,H[C+3]=I.x,H[C+4]=I.y,H[C+5]=I.z,H[C+6]=K.x,H[C+7]=K.y,H[C+8]=K.z,C+=9;if(Q)for(J in Q)if(m=Q[J],m.needsUpdate)s=m.offset,z=m.offsetSrc,m.size===1?(m.boundTo===void 0||m.boundTo==="vertices"?(m.array[s+0]=m.value[o.a],m.array[s+1]=m.value[o.b], m.array[s+2]=m.value[o.c]):m.boundTo==="faces"?(m.array[s+0]=m.value[z],m.array[s+1]=m.value[z],m.array[s+2]=m.value[z],m.offsetSrc++):m.boundTo==="faceVertices"&&(m.array[s+0]=m.value[z+0],m.array[s+1]=m.value[z+1],m.array[s+2]=m.value[z+2],m.offsetSrc+=3),m.offset+=3):(m.boundTo===void 0||m.boundTo==="vertices"?(u=m.value[o.a],I=m.value[o.b],K=m.value[o.c]):m.boundTo==="faces"?(u=m.value[z],I=m.value[z],K=m.value[z],m.offsetSrc++):m.boundTo==="faceVertices"&&(u=m.value[z+0],I=m.value[z+1],K=m.value[z+ 2],m.offsetSrc+=3),m.size===2?(m.array[s+0]=u.x,m.array[s+1]=u.y,m.array[s+2]=I.x,m.array[s+3]=I.y,m.array[s+4]=K.x,m.array[s+5]=K.y,m.offset+=6):m.size===3?(m.type==="c"?(m.array[s+0]=u.r,m.array[s+1]=u.g,m.array[s+2]=u.b,m.array[s+3]=I.r,m.array[s+4]=I.g,m.array[s+5]=I.b,m.array[s+6]=K.r,m.array[s+7]=K.g,m.array[s+8]=K.b):(m.array[s+0]=u.x,m.array[s+1]=u.y,m.array[s+2]=u.z,m.array[s+3]=I.x,m.array[s+4]=I.y,m.array[s+5]=I.z,m.array[s+6]=K.x,m.array[s+7]=K.y,m.array[s+8]=K.z),m.offset+=9):(m.array[s+ 0]=u.x,m.array[s+1]=u.y,m.array[s+2]=u.z,m.array[s+3]=u.w,m.array[s+4]=I.x,m.array[s+5]=I.y,m.array[s+6]=I.z,m.array[s+7]=I.w,m.array[s+8]=K.x,m.array[s+9]=K.y,m.array[s+10]=K.z,m.array[s+11]=K.w,m.offset+=12));if(pa){s=0;for(z=ua.length;s<z;s++)u=ua[s].vertices[o.a].position,I=ua[s].vertices[o.b].position,K=ua[s].vertices[o.c].position,m=ca[s],m[ea+0]=u.x,m[ea+1]=u.y,m[ea+2]=u.z,m[ea+3]=I.x,m[ea+4]=I.y,m[ea+5]=I.z,m[ea+6]=K.x,m[ea+7]=K.y,m[ea+8]=K.z;ea+=9}if(wa.length)s=wa[o.a],z=wa[o.b],m=wa[o.c], Z[w]=s.x,Z[w+1]=s.y,Z[w+2]=s.z,Z[w+3]=s.w,Z[w+4]=z.x,Z[w+5]=z.y,Z[w+6]=z.z,Z[w+7]=z.w,Z[w+8]=m.x,Z[w+9]=m.y,Z[w+10]=m.z,Z[w+11]=m.w,s=Aa[o.a],z=Aa[o.b],m=Aa[o.c],Y[w]=s.x,Y[w+1]=s.y,Y[w+2]=s.z,Y[w+3]=s.w,Y[w+4]=z.x,Y[w+5]=z.y,Y[w+6]=z.z,Y[w+7]=z.w,Y[w+8]=m.x,Y[w+9]=m.y,Y[w+10]=m.z,Y[w+11]=m.w,s=ya[o.a],z=ya[o.b],m=ya[o.c],W[w]=s.x,W[w+1]=s.y,W[w+2]=s.z,W[w+3]=1,W[w+4]=z.x,W[w+5]=z.y,W[w+6]=z.z,W[w+7]=1,W[w+8]=m.x,W[w+9]=m.y,W[w+10]=m.z,W[w+11]=1,s=za[o.a],z=za[o.b],m=za[o.c],X[w]=s.x,X[w+1]=s.y,X[w+ 2]=s.z,X[w+3]=1,X[w+4]=z.x,X[w+5]=z.y,X[w+6]=z.z,X[w+7]=1,X[w+8]=m.x,X[w+9]=m.y,X[w+10]=m.z,X[w+11]=1,w+=12;if(oa&&x)r.length==3&&x==THREE.VertexColors?(o=r[0],s=r[1],z=r[2]):z=s=o=v,fa[da]=o.r,fa[da+1]=o.g,fa[da+2]=o.b,fa[da+3]=s.r,fa[da+4]=s.g,fa[da+5]=s.b,fa[da+6]=z.r,fa[da+7]=z.g,fa[da+8]=z.b,da+=9;if(na&&ga.hasTangents)r=q[0],v=q[1],o=q[2],V[U]=r.x,V[U+1]=r.y,V[U+2]=r.z,V[U+3]=r.w,V[U+4]=v.x,V[U+5]=v.y,V[U+6]=v.z,V[U+7]=v.w,V[U+8]=o.x,V[U+9]=o.y,V[U+10]=o.z,V[U+11]=o.w,U+=12;if(ma&&y)if(n.length== 3&&ha)for(q=0;q<3;q++)G=n[q],P[L]=G.x,P[L+1]=G.y,P[L+2]=G.z,L+=3;else for(q=0;q<3;q++)P[L]=G.x,P[L+1]=G.y,P[L+2]=G.z,L+=3;if(ia&&A!==void 0&&t)for(q=0;q<3;q++)n=A[q],$[S]=n.u,$[S+1]=n.v,S+=2;if(ia&&B!==void 0&&t)for(q=0;q<3;q++)n=B[q],aa[T]=n.u,aa[T+1]=n.v,T+=2;ka&&(O[M]=E,O[M+1]=E+1,O[M+2]=E+2,M+=3,R[N]=E,R[N+1]=E+1,R[N+2]=E,R[N+3]=E+2,R[N+4]=E+1,R[N+5]=E+2,N+=6,E+=3)}else if(o instanceof THREE.Face4){if(ja)u=la[o.a].position,I=la[o.b].position,K=la[o.c].position,D=la[o.d].position,H[C]=u.x,H[C+ 1]=u.y,H[C+2]=u.z,H[C+3]=I.x,H[C+4]=I.y,H[C+5]=I.z,H[C+6]=K.x,H[C+7]=K.y,H[C+8]=K.z,H[C+9]=D.x,H[C+10]=D.y,H[C+11]=D.z,C+=12;if(Q)for(J in Q)if(m=Q[J],m.needsUpdate)s=m.offset,z=m.offsetSrc,m.size===1?(m.boundTo===void 0||m.boundTo==="vertices"?(m.array[s+0]=m.value[o.a],m.array[s+1]=m.value[o.b],m.array[s+2]=m.value[o.c],m.array[s+3]=m.value[o.d]):m.boundTo==="faces"?(m.array[s+0]=m.value[z],m.array[s+1]=m.value[z],m.array[s+2]=m.value[z],m.array[s+3]=m.value[z],m.offsetSrc++):m.boundTo==="faceVertices"&& (m.array[s+0]=m.value[z+0],m.array[s+1]=m.value[z+1],m.array[s+2]=m.value[z+2],m.array[s+3]=m.value[z+3],m.offsetSrc+=4),m.offset+=4):(m.boundTo===void 0||m.boundTo==="vertices"?(u=m.value[o.a],I=m.value[o.b],K=m.value[o.c],D=m.value[o.d]):m.boundTo==="faces"?(u=m.value[z],I=m.value[z],K=m.value[z],D=m.value[z],m.offsetSrc++):m.boundTo==="faceVertices"&&(u=m.value[z+0],I=m.value[z+1],K=m.value[z+2],D=m.value[z+3],m.offsetSrc+=4),m.size===2?(m.array[s+0]=u.x,m.array[s+1]=u.y,m.array[s+2]=I.x,m.array[s+ 3]=I.y,m.array[s+4]=K.x,m.array[s+5]=K.y,m.array[s+6]=D.x,m.array[s+7]=D.y,m.offset+=8):m.size===3?(m.type==="c"?(m.array[s+0]=u.r,m.array[s+1]=u.g,m.array[s+2]=u.b,m.array[s+3]=I.r,m.array[s+4]=I.g,m.array[s+5]=I.b,m.array[s+6]=K.r,m.array[s+7]=K.g,m.array[s+8]=K.b,m.array[s+9]=D.r,m.array[s+10]=D.g,m.array[s+11]=D.b):(m.array[s+0]=u.x,m.array[s+1]=u.y,m.array[s+2]=u.z,m.array[s+3]=I.x,m.array[s+4]=I.y,m.array[s+5]=I.z,m.array[s+6]=K.x,m.array[s+7]=K.y,m.array[s+8]=K.z,m.array[s+9]=D.x,m.array[s+ 10]=D.y,m.array[s+11]=D.z),m.offset+=12):(m.array[s+0]=u.x,m.array[s+1]=u.y,m.array[s+2]=u.z,m.array[s+3]=u.w,m.array[s+4]=I.x,m.array[s+5]=I.y,m.array[s+6]=I.z,m.array[s+7]=I.w,m.array[s+8]=K.x,m.array[s+9]=K.y,m.array[s+10]=K.z,m.array[s+11]=K.w,m.array[s+12]=D.x,m.array[s+13]=D.y,m.array[s+14]=D.z,m.array[s+15]=D.w,m.offset+=16));if(pa){s=0;for(z=ua.length;s<z;s++)u=ua[s].vertices[o.a].position,I=ua[s].vertices[o.b].position,K=ua[s].vertices[o.c].position,D=ua[s].vertices[o.d].position,m=ca[s], m[ea+0]=u.x,m[ea+1]=u.y,m[ea+2]=u.z,m[ea+3]=I.x,m[ea+4]=I.y,m[ea+5]=I.z,m[ea+6]=K.x,m[ea+7]=K.y,m[ea+8]=K.z,m[ea+9]=D.x,m[ea+10]=D.y,m[ea+11]=D.z;ea+=12}if(wa.length)s=wa[o.a],z=wa[o.b],m=wa[o.c],F=wa[o.d],Z[w]=s.x,Z[w+1]=s.y,Z[w+2]=s.z,Z[w+3]=s.w,Z[w+4]=z.x,Z[w+5]=z.y,Z[w+6]=z.z,Z[w+7]=z.w,Z[w+8]=m.x,Z[w+9]=m.y,Z[w+10]=m.z,Z[w+11]=m.w,Z[w+12]=F.x,Z[w+13]=F.y,Z[w+14]=F.z,Z[w+15]=F.w,s=Aa[o.a],z=Aa[o.b],m=Aa[o.c],F=Aa[o.d],Y[w]=s.x,Y[w+1]=s.y,Y[w+2]=s.z,Y[w+3]=s.w,Y[w+4]=z.x,Y[w+5]=z.y,Y[w+6]=z.z, Y[w+7]=z.w,Y[w+8]=m.x,Y[w+9]=m.y,Y[w+10]=m.z,Y[w+11]=m.w,Y[w+12]=F.x,Y[w+13]=F.y,Y[w+14]=F.z,Y[w+15]=F.w,s=ya[o.a],z=ya[o.b],m=ya[o.c],F=ya[o.d],W[w]=s.x,W[w+1]=s.y,W[w+2]=s.z,W[w+3]=1,W[w+4]=z.x,W[w+5]=z.y,W[w+6]=z.z,W[w+7]=1,W[w+8]=m.x,W[w+9]=m.y,W[w+10]=m.z,W[w+11]=1,W[w+12]=F.x,W[w+13]=F.y,W[w+14]=F.z,W[w+15]=1,s=za[o.a],z=za[o.b],m=za[o.c],o=za[o.d],X[w]=s.x,X[w+1]=s.y,X[w+2]=s.z,X[w+3]=1,X[w+4]=z.x,X[w+5]=z.y,X[w+6]=z.z,X[w+7]=1,X[w+8]=m.x,X[w+9]=m.y,X[w+10]=m.z,X[w+11]=1,X[w+12]=o.x,X[w+13]= o.y,X[w+14]=o.z,X[w+15]=1,w+=16;if(oa&&x)r.length==4&&x==THREE.VertexColors?(o=r[0],s=r[1],z=r[2],r=r[3]):r=z=s=o=v,fa[da]=o.r,fa[da+1]=o.g,fa[da+2]=o.b,fa[da+3]=s.r,fa[da+4]=s.g,fa[da+5]=s.b,fa[da+6]=z.r,fa[da+7]=z.g,fa[da+8]=z.b,fa[da+9]=r.r,fa[da+10]=r.g,fa[da+11]=r.b,da+=12;if(na&&ga.hasTangents)r=q[0],v=q[1],o=q[2],q=q[3],V[U]=r.x,V[U+1]=r.y,V[U+2]=r.z,V[U+3]=r.w,V[U+4]=v.x,V[U+5]=v.y,V[U+6]=v.z,V[U+7]=v.w,V[U+8]=o.x,V[U+9]=o.y,V[U+10]=o.z,V[U+11]=o.w,V[U+12]=q.x,V[U+13]=q.y,V[U+14]=q.z,V[U+ 15]=q.w,U+=16;if(ma&&y)if(n.length==4&&ha)for(q=0;q<4;q++)G=n[q],P[L]=G.x,P[L+1]=G.y,P[L+2]=G.z,L+=3;else for(q=0;q<4;q++)P[L]=G.x,P[L+1]=G.y,P[L+2]=G.z,L+=3;if(ia&&A!==void 0&&t)for(q=0;q<4;q++)n=A[q],$[S]=n.u,$[S+1]=n.v,S+=2;if(ia&&B!==void 0&&t)for(q=0;q<4;q++)n=B[q],aa[T]=n.u,aa[T+1]=n.v,T+=2;ka&&(O[M]=E,O[M+1]=E+1,O[M+2]=E+3,O[M+3]=E+1,O[M+4]=E+2,O[M+5]=E+3,M+=6,R[N]=E,R[N+1]=E+1,R[N+2]=E,R[N+3]=E+3,R[N+4]=E+1,R[N+5]=E+2,R[N+6]=E+2,R[N+7]=E+3,N+=8,E+=4)}if(xa){k=0;for(p=xa.length;k<p;k++)O[M]= xa[k].a,O[M+1]=xa[k].b,O[M+2]=xa[k].c,O[M+3]=xa[k].a,O[M+4]=xa[k].c,O[M+5]=xa[k].d,M+=6}ja&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglVertexBuffer),c.bufferData(c.ARRAY_BUFFER,H,j));if(Q)for(J in Q)if(m=Q[J],m.needsUpdate)c.bindBuffer(c.ARRAY_BUFFER,m.buffer),c.bufferData(c.ARRAY_BUFFER,m.array,j),m.needsUpdate=!1;if(pa){s=0;for(z=ua.length;s<z;s++)c.bindBuffer(c.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[s]),c.bufferData(c.ARRAY_BUFFER,ca[s],j)}oa&&da>0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglColorBuffer), c.bufferData(c.ARRAY_BUFFER,fa,j));ma&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglNormalBuffer),c.bufferData(c.ARRAY_BUFFER,P,j));na&&ga.hasTangents&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglTangentBuffer),c.bufferData(c.ARRAY_BUFFER,V,j));ia&&S>0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglUVBuffer),c.bufferData(c.ARRAY_BUFFER,$,j));ia&&T>0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglUV2Buffer),c.bufferData(c.ARRAY_BUFFER,aa,j));ka&&(c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,g.__webglFaceBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER, O,j),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,g.__webglLineBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,R,j));w>0&&(c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinVertexABuffer),c.bufferData(c.ARRAY_BUFFER,W,j),c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinVertexBBuffer),c.bufferData(c.ARRAY_BUFFER,X,j),c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinIndicesBuffer),c.bufferData(c.ARRAY_BUFFER,Y,j),c.bindBuffer(c.ARRAY_BUFFER,g.__webglSkinWeightsBuffer),c.bufferData(c.ARRAY_BUFFER,Z,j));i.dynamic||(delete g.__inittedArrays, delete g.__colorArray,delete g.__normalArray,delete g.__tangentArray,delete g.__uvArray,delete g.__uv2Array,delete g.__faceArray,delete g.__vertexArray,delete g.__lineArray,delete g.__skinVertexAArray,delete g.__skinVertexBArray,delete g.__skinIndexArray,delete g.__skinWeightArray)}}}f.__dirtyVertices=!1;f.__dirtyMorphTargets=!1;f.__dirtyElements=!1;f.__dirtyUvs=!1;f.__dirtyNormals=!1;f.__dirtyTangents=!1;f.__dirtyColors=!1}else if(b instanceof THREE.Ribbon){f=b.geometry;if(f.__dirtyVertices||f.__dirtyColors){b= f;e=c.DYNAMIC_DRAW;t=b.vertices;g=b.colors;x=t.length;i=g.length;y=b.__vertexArray;j=b.__colorArray;A=b.__dirtyColors;if(b.__dirtyVertices){for(k=0;k<x;k++)p=t[k].position,h=k*3,y[h]=p.x,y[h+1]=p.y,y[h+2]=p.z;c.bindBuffer(c.ARRAY_BUFFER,b.__webglVertexBuffer);c.bufferData(c.ARRAY_BUFFER,y,e)}if(A){for(k=0;k<i;k++)color=g[k],h=k*3,j[h]=color.r,j[h+1]=color.g,j[h+2]=color.b;c.bindBuffer(c.ARRAY_BUFFER,b.__webglColorBuffer);c.bufferData(c.ARRAY_BUFFER,j,e)}}f.__dirtyVertices=!1;f.__dirtyColors=!1}else if(b instanceof THREE.Line){f=b.geometry;if(f.__dirtyVertices||f.__dirtyColors){b=f;e=c.DYNAMIC_DRAW;t=b.vertices;g=b.colors;x=t.length;i=g.length;y=b.__vertexArray;j=b.__colorArray;A=b.__dirtyColors;if(b.__dirtyVertices){for(k=0;k<x;k++)p=t[k].position,h=k*3,y[h]=p.x,y[h+1]=p.y,y[h+2]=p.z;c.bindBuffer(c.ARRAY_BUFFER,b.__webglVertexBuffer);c.bufferData(c.ARRAY_BUFFER,y,e)}if(A){for(k=0;k<i;k++)color=g[k],h=k*3,j[h]=color.r,j[h+1]=color.g,j[h+2]=color.b;c.bindBuffer(c.ARRAY_BUFFER,b.__webglColorBuffer);c.bufferData(c.ARRAY_BUFFER, j,e)}}f.__dirtyVertices=!1;f.__dirtyColors=!1}else if(b instanceof THREE.ParticleSystem)f=b.geometry,(f.__dirtyVertices||f.__dirtyColors||b.sortParticles)&&d(f,c.DYNAMIC_DRAW,b),f.__dirtyVertices=!1,f.__dirtyColors=!1}function O(b,c){var d;for(d=b.length-1;d>=0;d--)b[d].object==c&&b.splice(d,1)}function ha(b){function c(b){var f=[];d=0;for(e=b.length;d<e;d++)b[d]==void 0?f.push("undefined"):f.push(b[d].id);return f.join("_")}var d,e,f,g,h,i,j,k,o={},p=b.morphTargets!==void 0?b.morphTargets.length: 0;b.geometryGroups={};f=0;for(g=b.faces.length;f<g;f++)h=b.faces[f],i=h.materials,j=c(i),o[j]==void 0&&(o[j]={hash:j,counter:0}),k=o[j].hash+"_"+o[j].counter,b.geometryGroups[k]==void 0&&(b.geometryGroups[k]={faces:[],materials:i,vertices:0,numMorphTargets:p}),h=h instanceof THREE.Face3?3:4,b.geometryGroups[k].vertices+h>65535&&(o[j].counter+=1,k=o[j].hash+"_"+o[j].counter,b.geometryGroups[k]==void 0&&(b.geometryGroups[k]={faces:[],materials:i,vertices:0,numMorphTargets:p})),b.geometryGroups[k].faces.push(f), b.geometryGroups[k].vertices+=h}function T(b,c,d){b.push({buffer:c,object:d,opaque:{list:[],count:0},transparent:{list:[],count:0}})}function E(b){if(b!=R){switch(b){case THREE.AdditiveBlending:c.blendEquation(c.FUNC_ADD);c.blendFunc(c.SRC_ALPHA,c.ONE);break;case THREE.SubtractiveBlending:c.blendEquation(c.FUNC_ADD);c.blendFunc(c.ZERO,c.ONE_MINUS_SRC_COLOR);break;case THREE.MultiplyBlending:c.blendEquation(c.FUNC_ADD);c.blendFunc(c.ZERO,c.SRC_COLOR);break;default:c.blendEquationSeparate(c.FUNC_ADD, c.FUNC_ADD),c.blendFuncSeparate(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA,c.ONE,c.ONE_MINUS_SRC_ALPHA)}R=b}}function x(b,d,e){(e.width&e.width-1)==0&&(e.height&e.height-1)==0?(c.texParameteri(b,c.TEXTURE_WRAP_S,$(d.wrapS)),c.texParameteri(b,c.TEXTURE_WRAP_T,$(d.wrapT)),c.texParameteri(b,c.TEXTURE_MAG_FILTER,$(d.magFilter)),c.texParameteri(b,c.TEXTURE_MIN_FILTER,$(d.minFilter)),c.generateMipmap(b)):(c.texParameteri(b,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(b,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE),c.texParameteri(b, c.TEXTURE_MAG_FILTER,Q(d.magFilter)),c.texParameteri(b,c.TEXTURE_MIN_FILTER,Q(d.minFilter)))}function ca(b,d){if(b.needsUpdate)b.__webglInit?(c.bindTexture(c.TEXTURE_2D,b.__webglTexture),c.texSubImage2D(c.TEXTURE_2D,0,0,0,c.RGBA,c.UNSIGNED_BYTE,b.image)):(b.__webglTexture=c.createTexture(),c.bindTexture(c.TEXTURE_2D,b.__webglTexture),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,b.image),b.__webglInit=!0),x(c.TEXTURE_2D,b,b.image),c.bindTexture(c.TEXTURE_2D,null),b.needsUpdate=!1;c.activeTexture(c.TEXTURE0+ d);c.bindTexture(c.TEXTURE_2D,b.__webglTexture)}function M(b){if(b&&!b.__webglFramebuffer){if(b.depthBuffer===void 0)b.depthBuffer=!0;if(b.stencilBuffer===void 0)b.stencilBuffer=!0;b.__webglFramebuffer=c.createFramebuffer();b.__webglRenderbuffer=c.createRenderbuffer();b.__webglTexture=c.createTexture();c.bindTexture(c.TEXTURE_2D,b.__webglTexture);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,$(b.wrapS));c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,$(b.wrapT));c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER, $(b.magFilter));c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,$(b.minFilter));c.texImage2D(c.TEXTURE_2D,0,$(b.format),b.width,b.height,0,$(b.format),$(b.type),null);c.bindRenderbuffer(c.RENDERBUFFER,b.__webglRenderbuffer);c.bindFramebuffer(c.FRAMEBUFFER,b.__webglFramebuffer);c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,b.__webglTexture,0);b.depthBuffer&&!b.stencilBuffer?(c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_COMPONENT16,b.width,b.height),c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_ATTACHMENT,c.RENDERBUFFER,b.__webglRenderbuffer)):b.depthBuffer&&b.stencilBuffer?(c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_STENCIL,b.width,b.height),c.framebufferRenderbuffer(c.FRAMEBUFFER,c.DEPTH_STENCIL_ATTACHMENT,c.RENDERBUFFER,b.__webglRenderbuffer)):c.renderbufferStorage(c.RENDERBUFFER,c.RGBA4,b.width,b.height);c.bindTexture(c.TEXTURE_2D,null);c.bindRenderbuffer(c.RENDERBUFFER,null);c.bindFramebuffer(c.FRAMEBUFFER,null)}var d,e;b?(d=b.__webglFramebuffer,e=b.width,b=b.height):(d=null, e=L,b=N);d!=Ba&&(c.bindFramebuffer(c.FRAMEBUFFER,d),c.viewport(H,S,e,b),Ba=d)}function C(b,d){var e;b=="fragment"?e=c.createShader(c.FRAGMENT_SHADER):b=="vertex"&&(e=c.createShader(c.VERTEX_SHADER));c.shaderSource(e,d);c.compileShader(e);if(!c.getShaderParameter(e,c.COMPILE_STATUS))return console.error(c.getShaderInfoLog(e)),console.error(d),null;return e}function Q(b){switch(b){case THREE.NearestFilter:case THREE.NearestMipMapNearestFilter:case THREE.NearestMipMapLinearFilter:return c.NEAREST;default:return c.LINEAR}} function $(b){switch(b){case THREE.RepeatWrapping:return c.REPEAT;case THREE.ClampToEdgeWrapping:return c.CLAMP_TO_EDGE;case THREE.MirroredRepeatWrapping:return c.MIRRORED_REPEAT;case THREE.NearestFilter:return c.NEAREST;case THREE.NearestMipMapNearestFilter:return c.NEAREST_MIPMAP_NEAREST;case THREE.NearestMipMapLinearFilter:return c.NEAREST_MIPMAP_LINEAR;case THREE.LinearFilter:return c.LINEAR;case THREE.LinearMipMapNearestFilter:return c.LINEAR_MIPMAP_NEAREST;case THREE.LinearMipMapLinearFilter:return c.LINEAR_MIPMAP_LINEAR; case THREE.ByteType:return c.BYTE;case THREE.UnsignedByteType:return c.UNSIGNED_BYTE;case THREE.ShortType:return c.SHORT;case THREE.UnsignedShortType:return c.UNSIGNED_SHORT;case THREE.IntType:return c.INT;case THREE.UnsignedShortType:return c.UNSIGNED_INT;case THREE.FloatType:return c.FLOAT;case THREE.AlphaFormat:return c.ALPHA;case THREE.RGBFormat:return c.RGB;case THREE.RGBAFormat:return c.RGBA;case THREE.LuminanceFormat:return c.LUMINANCE;case THREE.LuminanceAlphaFormat:return c.LUMINANCE_ALPHA}return 0} var aa=this,c,ta=[],ma=null,Ba=null,ia=!0,ka=null,P=null,R=null,J=null,H=0,S=0,L=0,N=0,F=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],ja=new THREE.Matrix4,la=new Float32Array(16),ra=new Float32Array(16),qa=new THREE.Vector4,pa={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]}},b=b||{},na=b.canvas!==void 0?b.canvas:document.createElement("canvas"),sa=b.stencil!==void 0? b.stencil:!0,Ga=b.antialias!==void 0?b.antialias:!1,oa=b.clearColor!==void 0?new THREE.Color(b.clearColor):new THREE.Color(0),Ca=b.clearAlpha!==void 0?b.clearAlpha:0;this.data={vertices:0,faces:0,drawCalls:0};this.maxMorphTargets=8;this.domElement=na;this.sortObjects=this.autoClear=!0;try{if(!(c=na.getContext("experimental-webgl",{antialias:Ga,stencil:sa})))throw"Error creating WebGL context.";}catch(Ha){console.error(Ha)}console.log(navigator.userAgent+" | "+c.getParameter(c.VERSION)+" | "+c.getParameter(c.VENDOR)+ " | "+c.getParameter(c.RENDERER)+" | "+c.getParameter(c.SHADING_LANGUAGE_VERSION));c.clearColor(0,0,0,1);c.clearDepth(1);c.enable(c.DEPTH_TEST);c.depthFunc(c.LEQUAL);c.frontFace(c.CCW);c.cullFace(c.BACK);c.enable(c.CULL_FACE);c.enable(c.BLEND);c.blendEquation(c.FUNC_ADD);c.blendFunc(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA);c.clearColor(oa.r,oa.g,oa.b,Ca);this.context=c;var Fa=c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS)>0;if(sa){var u={};u.vertices=new Float32Array(12);u.faces=new Uint16Array(6);u.darkness= 0.5;u.vertices[0]=-20;u.vertices[1]=-20;u.vertices[2]=-1;u.vertices[3]=20;u.vertices[4]=-20;u.vertices[5]=-1;u.vertices[6]=20;u.vertices[7]=20;u.vertices[8]=-1;u.vertices[9]=-20;u.vertices[10]=20;u.vertices[11]=-1;u.faces[0]=0;u.faces[1]=1;u.faces[2]=2;u.faces[3]=0;u.faces[4]=2;u.faces[5]=3;u.vertexBuffer=c.createBuffer();u.elementBuffer=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,u.vertexBuffer);c.bufferData(c.ARRAY_BUFFER,u.vertices,c.STATIC_DRAW);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,u.elementBuffer); c.bufferData(c.ELEMENT_ARRAY_BUFFER,u.faces,c.STATIC_DRAW);u.program=c.createProgram();c.attachShader(u.program,C("fragment",THREE.ShaderLib.shadowPost.fragmentShader));c.attachShader(u.program,C("vertex",THREE.ShaderLib.shadowPost.vertexShader));c.linkProgram(u.program);u.vertexLocation=c.getAttribLocation(u.program,"position");u.projectionLocation=c.getUniformLocation(u.program,"projectionMatrix");u.darknessLocation=c.getUniformLocation(u.program,"darkness")}var t={};t.vertices=new Float32Array(16); t.faces=new Uint16Array(6);b=0;t.vertices[b++]=-1;t.vertices[b++]=-1;t.vertices[b++]=0;t.vertices[b++]=0;t.vertices[b++]=1;t.vertices[b++]=-1;t.vertices[b++]=1;t.vertices[b++]=0;t.vertices[b++]=1;t.vertices[b++]=1;t.vertices[b++]=1;t.vertices[b++]=1;t.vertices[b++]=-1;t.vertices[b++]=1;t.vertices[b++]=0;t.vertices[b++]=1;b=0;t.faces[b++]=0;t.faces[b++]=1;t.faces[b++]=2;t.faces[b++]=0;t.faces[b++]=2;t.faces[b++]=3;t.vertexBuffer=c.createBuffer();t.elementBuffer=c.createBuffer();t.tempTexture=c.createTexture(); t.occlusionTexture=c.createTexture();c.bindBuffer(c.ARRAY_BUFFER,t.vertexBuffer);c.bufferData(c.ARRAY_BUFFER,t.vertices,c.STATIC_DRAW);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,t.elementBuffer);c.bufferData(c.ELEMENT_ARRAY_BUFFER,t.faces,c.STATIC_DRAW);c.bindTexture(c.TEXTURE_2D,t.tempTexture);c.texImage2D(c.TEXTURE_2D,0,c.RGB,16,16,0,c.RGB,c.UNSIGNED_BYTE,null);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER,c.NEAREST);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.NEAREST);c.bindTexture(c.TEXTURE_2D,t.occlusionTexture);c.texImage2D(c.TEXTURE_2D,0,c.RGBA,16,16,0,c.RGBA,c.UNSIGNED_BYTE,null);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.NEAREST);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.NEAREST);c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<= 0?(t.hasVertexTexture=!1,t.program=c.createProgram(),c.attachShader(t.program,C("fragment",THREE.ShaderLib.lensFlare.fragmentShader)),c.attachShader(t.program,C("vertex",THREE.ShaderLib.lensFlare.vertexShader))):(t.hasVertexTexture=!0,t.program=c.createProgram(),c.attachShader(t.program,C("fragment",THREE.ShaderLib.lensFlareVertexTexture.fragmentShader)),c.attachShader(t.program,C("vertex",THREE.ShaderLib.lensFlareVertexTexture.vertexShader)));c.linkProgram(t.program);t.attributes={};t.uniforms={}; t.attributes.vertex=c.getAttribLocation(t.program,"position");t.attributes.uv=c.getAttribLocation(t.program,"UV");t.uniforms.renderType=c.getUniformLocation(t.program,"renderType");t.uniforms.map=c.getUniformLocation(t.program,"map");t.uniforms.occlusionMap=c.getUniformLocation(t.program,"occlusionMap");t.uniforms.opacity=c.getUniformLocation(t.program,"opacity");t.uniforms.scale=c.getUniformLocation(t.program,"scale");t.uniforms.rotation=c.getUniformLocation(t.program,"rotation");t.uniforms.screenPosition= c.getUniformLocation(t.program,"screenPosition");var Ea=!1;_sprite={};_sprite.vertices=new Float32Array(16);_sprite.faces=new Uint16Array(6);b=0;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]= 0;_sprite.vertices[b++]=1;b=0;_sprite.faces[b++]=0;_sprite.faces[b++]=1;_sprite.faces[b++]=2;_sprite.faces[b++]=0;_sprite.faces[b++]=2;_sprite.faces[b++]=3;_sprite.vertexBuffer=c.createBuffer();_sprite.elementBuffer=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,_sprite.vertexBuffer);c.bufferData(c.ARRAY_BUFFER,_sprite.vertices,c.STATIC_DRAW);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,_sprite.elementBuffer);c.bufferData(c.ELEMENT_ARRAY_BUFFER,_sprite.faces,c.STATIC_DRAW);_sprite.program=c.createProgram(); c.attachShader(_sprite.program,C("fragment",THREE.ShaderLib.sprite.fragmentShader));c.attachShader(_sprite.program,C("vertex",THREE.ShaderLib.sprite.vertexShader));c.linkProgram(_sprite.program);_sprite.attributes={};_sprite.uniforms={};_sprite.attributes.position=c.getAttribLocation(_sprite.program,"position");_sprite.attributes.uv=c.getAttribLocation(_sprite.program,"uv");_sprite.uniforms.uvOffset=c.getUniformLocation(_sprite.program,"uvOffset");_sprite.uniforms.uvScale=c.getUniformLocation(_sprite.program, "uvScale");_sprite.uniforms.rotation=c.getUniformLocation(_sprite.program,"rotation");_sprite.uniforms.scale=c.getUniformLocation(_sprite.program,"scale");_sprite.uniforms.alignment=c.getUniformLocation(_sprite.program,"alignment");_sprite.uniforms.map=c.getUniformLocation(_sprite.program,"map");_sprite.uniforms.opacity=c.getUniformLocation(_sprite.program,"opacity");_sprite.uniforms.useScreenCoordinates=c.getUniformLocation(_sprite.program,"useScreenCoordinates");_sprite.uniforms.affectedByDistance= c.getUniformLocation(_sprite.program,"affectedByDistance");_sprite.uniforms.screenPosition=c.getUniformLocation(_sprite.program,"screenPosition");_sprite.uniforms.modelViewMatrix=c.getUniformLocation(_sprite.program,"modelViewMatrix");_sprite.uniforms.projectionMatrix=c.getUniformLocation(_sprite.program,"projectionMatrix");var Da=!1;this.setSize=function(b,c){na.width=b;na.height=c;this.setViewport(0,0,na.width,na.height)};this.setViewport=function(b,d,e,f){H=b;S=d;L=e;N=f;c.viewport(H,S,L,N)};this.setScissor= function(b,d,e,f){c.scissor(b,d,e,f)};this.enableScissorTest=function(b){b?c.enable(c.SCISSOR_TEST):c.disable(c.SCISSOR_TEST)};this.enableDepthBufferWrite=function(b){ia=b;c.depthMask(b)};this.setClearColorHex=function(b,d){oa.setHex(b);Ca=d;c.clearColor(oa.r,oa.g,oa.b,Ca)};this.setClearColor=function(b,d){oa.copy(b);Ca=d;c.clearColor(oa.r,oa.g,oa.b,Ca)};this.clear=function(){c.clear(c.COLOR_BUFFER_BIT|c.DEPTH_BUFFER_BIT|c.STENCIL_BUFFER_BIT)};this.setStencilShadowDarkness=function(b){u.darkness= b};this.getContext=function(){return c};this.initMaterial=function(b,d,e,f){var g,h,i;b instanceof THREE.MeshDepthMaterial?i="depth":b instanceof THREE.ShadowVolumeDynamicMaterial?i="shadowVolumeDynamic":b instanceof THREE.MeshNormalMaterial?i="normal":b instanceof THREE.MeshBasicMaterial?i="basic":b instanceof THREE.MeshLambertMaterial?i="lambert":b instanceof THREE.MeshPhongMaterial?i="phong":b instanceof THREE.LineBasicMaterial?i="basic":b instanceof THREE.ParticleBasicMaterial&&(i="particle_basic"); if(i){var j=THREE.ShaderLib[i];b.uniforms=THREE.UniformsUtils.clone(j.uniforms);b.vertexShader=j.vertexShader;b.fragmentShader=j.fragmentShader}var k,p,o;k=o=j=0;for(p=d.length;k<p;k++)h=d[k],h instanceof THREE.DirectionalLight&&o++,h instanceof THREE.PointLight&&j++;j+o<=4?d=o:(d=Math.ceil(4*o/(j+o)),j=4-d);h={directional:d,point:j};o=50;if(f!==void 0&&f instanceof THREE.SkinnedMesh)o=f.bones.length;var n;a:{k=b.fragmentShader;p=b.vertexShader;var j=b.uniforms,d=b.attributes,e={map:!!b.map,envMap:!!b.envMap, lightMap:!!b.lightMap,vertexColors:b.vertexColors,fog:e,sizeAttenuation:b.sizeAttenuation,skinning:b.skinning,morphTargets:b.morphTargets,maxMorphTargets:this.maxMorphTargets,maxDirLights:h.directional,maxPointLights:h.point,maxBones:o},q;h=[];i?h.push(i):(h.push(k),h.push(p));for(q in e)h.push(q),h.push(e[q]);i=h.join();q=0;for(h=ta.length;q<h;q++)if(ta[q].code==i){n=ta[q].program;break a}q=c.createProgram();h=["#ifdef GL_ES\nprecision highp float;\n#endif","#define MAX_DIR_LIGHTS "+e.maxDirLights, "#define MAX_POINT_LIGHTS "+e.maxPointLights,e.fog?"#define USE_FOG":"",e.fog instanceof THREE.FogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.lightMap?"#define USE_LIGHTMAP":"",e.vertexColors?"#define USE_COLOR":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");o=[Fa?"#define VERTEX_TEXTURES":"","#define MAX_DIR_LIGHTS "+e.maxDirLights,"#define MAX_POINT_LIGHTS "+e.maxPointLights,"#define MAX_BONES "+e.maxBones,e.map?"#define USE_MAP": "",e.envMap?"#define USE_ENVMAP":"",e.lightMap?"#define USE_LIGHTMAP":"",e.vertexColors?"#define USE_COLOR":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"","uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n"); c.attachShader(q,C("fragment",h+k));c.attachShader(q,C("vertex",o+p));c.linkProgram(q);c.getProgramParameter(q,c.LINK_STATUS)||console.error("Could not initialise shader\nVALIDATE_STATUS: "+c.getProgramParameter(q,c.VALIDATE_STATUS)+", gl error ["+c.getError()+"]");q.uniforms={};q.attributes={};var r;k=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","objectMatrix","cameraPosition","cameraInverseMatrix","boneGlobalMatrices","morphTargetInfluences"];for(r in j)k.push(r);r=k;j=0;for(k= r.length;j<k;j++)p=r[j],q.uniforms[p]=c.getUniformLocation(q,p);k=["position","normal","uv","uv2","tangent","color","skinVertexA","skinVertexB","skinIndex","skinWeight"];for(r=0;r<e.maxMorphTargets;r++)k.push("morphTarget"+r);for(n in d)k.push(n);n=k;r=0;for(d=n.length;r<d;r++)e=n[r],q.attributes[e]=c.getAttribLocation(q,e);ta.push({program:q,code:i});n=q}b.program=n;n=b.program.attributes;n.position>=0&&c.enableVertexAttribArray(n.position);n.color>=0&&c.enableVertexAttribArray(n.color);n.normal>= 0&&c.enableVertexAttribArray(n.normal);n.tangent>=0&&c.enableVertexAttribArray(n.tangent);b.skinning&&n.skinVertexA>=0&&n.skinVertexB>=0&&n.skinIndex>=0&&n.skinWeight>=0&&(c.enableVertexAttribArray(n.skinVertexA),c.enableVertexAttribArray(n.skinVertexB),c.enableVertexAttribArray(n.skinIndex),c.enableVertexAttribArray(n.skinWeight));if(b.attributes)for(g in b.attributes)n[g]!==void 0&&n[g]>=0&&c.enableVertexAttribArray(n[g]);if(b.morphTargets){b.numSupportedMorphTargets=0;n.morphTarget0>=0&&(c.enableVertexAttribArray(n.morphTarget0), b.numSupportedMorphTargets++);n.morphTarget1>=0&&(c.enableVertexAttribArray(n.morphTarget1),b.numSupportedMorphTargets++);n.morphTarget2>=0&&(c.enableVertexAttribArray(n.morphTarget2),b.numSupportedMorphTargets++);n.morphTarget3>=0&&(c.enableVertexAttribArray(n.morphTarget3),b.numSupportedMorphTargets++);n.morphTarget4>=0&&(c.enableVertexAttribArray(n.morphTarget4),b.numSupportedMorphTargets++);n.morphTarget5>=0&&(c.enableVertexAttribArray(n.morphTarget5),b.numSupportedMorphTargets++);n.morphTarget6>= 0&&(c.enableVertexAttribArray(n.morphTarget6),b.numSupportedMorphTargets++);n.morphTarget7>=0&&(c.enableVertexAttribArray(n.morphTarget7),b.numSupportedMorphTargets++);f.__webglMorphTargetInfluences=new Float32Array(this.maxMorphTargets);b=0;for(g=this.maxMorphTargets;b<g;b++)f.__webglMorphTargetInfluences[b]=0}};this.render=function(b,d,k,u){var t,x,A,C,F,H,o,G,J=b.lights,L=b.fog;aa.data.vertices=0;aa.data.faces=0;aa.data.drawCalls=0;d.matrixAutoUpdate&&d.update(void 0,!0);b.update(void 0,!1,d); d.matrixWorldInverse.flattenToArray(ra);d.projectionMatrix.flattenToArray(la);ja.multiply(d.projectionMatrix,d.matrixWorldInverse);j(ja);this.initWebGLObjects(b);M(k);(this.autoClear||u)&&this.clear();F=b.__webglObjects.length;for(u=0;u<F;u++)if(t=b.__webglObjects[u],o=t.object,o.visible)if(!(o instanceof THREE.Mesh)||p(o)){if(o.matrixWorld.flattenToArray(o._objectMatrixArray),D(o,d),v(t),t.render=!0,this.sortObjects)qa.copy(o.position),ja.multiplyVector3(qa),t.z=qa.z}else t.render=!1;else t.render= !1;this.sortObjects&&b.__webglObjects.sort(r);H=b.__webglObjectsImmediate.length;for(u=0;u<H;u++)t=b.__webglObjectsImmediate[u],o=t.object,o.visible&&(o.matrixAutoUpdate&&o.matrixWorld.flattenToArray(o._objectMatrixArray),D(o,d),n(t));E(THREE.NormalBlending);for(u=0;u<F;u++)if(t=b.__webglObjects[u],t.render){o=t.object;G=t.buffer;A=t.opaque;i(o);for(t=0;t<A.count;t++)C=A.list[t],g(C.depthTest),f(d,J,L,C,G,o)}for(u=0;u<H;u++)if(t=b.__webglObjectsImmediate[u],o=t.object,o.visible){A=t.opaque;i(o);for(t= 0;t<A.count;t++)C=A.list[t],g(C.depthTest),x=e(d,J,L,C,o),o.render(function(b){h(b,x,C.shading)})}for(u=0;u<F;u++)if(t=b.__webglObjects[u],t.render){o=t.object;G=t.buffer;A=t.transparent;i(o);for(t=0;t<A.count;t++)C=A.list[t],E(C.blending),g(C.depthTest),f(d,J,L,C,G,o)}for(u=0;u<H;u++)if(t=b.__webglObjectsImmediate[u],o=t.object,o.visible){A=t.transparent;i(o);for(t=0;t<A.count;t++)C=A.list[t],E(C.blending),g(C.depthTest),x=e(d,J,L,C,o),o.render(function(b){h(b,x,C.shading)})}b.__webglSprites.length&& y(b,d);sa&&b.__webglShadowVolumes.length&&b.lights.length&&q(b);b.__webglLensFlares.length&&B(b,d);k&&k.minFilter!==THREE.NearestFilter&&k.minFilter!==THREE.LinearFilter&&(c.bindTexture(c.TEXTURE_2D,k.__webglTexture),c.generateMipmap(c.TEXTURE_2D),c.bindTexture(c.TEXTURE_2D,null))};this.initWebGLObjects=function(b){if(!b.__webglObjects)b.__webglObjects=[],b.__webglObjectsImmediate=[],b.__webglShadowVolumes=[],b.__webglLensFlares=[],b.__webglSprites=[];for(;b.__objectsAdded.length;){var d=b.__objectsAdded[0], e=b,f=void 0,g=void 0,h=void 0;if(d._modelViewMatrix==void 0)d._modelViewMatrix=new THREE.Matrix4,d._normalMatrixArray=new Float32Array(9),d._modelViewMatrixArray=new Float32Array(16),d._objectMatrixArray=new Float32Array(16),d.matrixWorld.flattenToArray(d._objectMatrixArray);if(d instanceof THREE.Mesh)for(f in g=d.geometry,g.geometryGroups==void 0&&ha(g),g.geometryGroups){h=g.geometryGroups[f];if(!h.__webglVertexBuffer){var i=h;i.__webglVertexBuffer=c.createBuffer();i.__webglNormalBuffer=c.createBuffer(); i.__webglTangentBuffer=c.createBuffer();i.__webglColorBuffer=c.createBuffer();i.__webglUVBuffer=c.createBuffer();i.__webglUV2Buffer=c.createBuffer();i.__webglSkinVertexABuffer=c.createBuffer();i.__webglSkinVertexBBuffer=c.createBuffer();i.__webglSkinIndicesBuffer=c.createBuffer();i.__webglSkinWeightsBuffer=c.createBuffer();i.__webglFaceBuffer=c.createBuffer();i.__webglLineBuffer=c.createBuffer();if(i.numMorphTargets){var j=void 0,k=void 0;i.__webglMorphTargetsBuffers=[];j=0;for(k=i.numMorphTargets;j< k;j++)i.__webglMorphTargetsBuffers.push(c.createBuffer())}for(var i=h,j=d,n=void 0,o=void 0,p=void 0,q=p=void 0,r=void 0,t=void 0,v=t=k=0,u=p=o=void 0,o=n=void 0,q=j.geometry,u=q.faces,r=i.faces,n=0,o=r.length;n<o;n++)p=r[n],p=u[p],p instanceof THREE.Face3?(k+=3,t+=1,v+=3):p instanceof THREE.Face4&&(k+=4,t+=2,v+=4);for(var n=i,o=j,x=r=u=void 0,y=void 0,x=void 0,p=[],u=0,r=o.materials.length;u<r;u++)if(x=o.materials[u],x instanceof THREE.MeshFaceMaterial){x=0;for(l=n.materials.length;x<l;x++)(y=n.materials[x])&& p.push(y)}else(y=x)&&p.push(y);n=p;a:{u=o=void 0;r=n.length;for(o=0;o<r;o++)if(u=n[o],u.map||u.lightMap||u instanceof THREE.MeshShaderMaterial){o=!0;break a}o=!1}a:{r=u=void 0;p=n.length;for(u=0;u<p;u++)if(r=n[u],!(r instanceof THREE.MeshBasicMaterial&&!r.envMap||r instanceof THREE.MeshDepthMaterial)){u=r&&r.shading!=void 0&&r.shading==THREE.SmoothShading?THREE.SmoothShading:THREE.FlatShading;break a}u=!1}a:{p=r=void 0;x=n.length;for(r=0;r<x;r++)if(p=n[r],p.vertexColors){p=p.vertexColors;break a}p= !1}i.__vertexArray=new Float32Array(k*3);if(u)i.__normalArray=new Float32Array(k*3);if(q.hasTangents)i.__tangentArray=new Float32Array(k*4);if(p)i.__colorArray=new Float32Array(k*3);if(o){if(q.faceUvs.length>0||q.faceVertexUvs.length>0)i.__uvArray=new Float32Array(k*2);if(q.faceUvs.length>1||q.faceVertexUvs.length>1)i.__uv2Array=new Float32Array(k*2)}if(j.geometry.skinWeights.length&&j.geometry.skinIndices.length)i.__skinVertexAArray=new Float32Array(k*4),i.__skinVertexBArray=new Float32Array(k*4), i.__skinIndexArray=new Float32Array(k*4),i.__skinWeightArray=new Float32Array(k*4);i.__faceArray=new Uint16Array(t*3+(j.geometry.edgeFaces?j.geometry.edgeFaces.length*6:0));i.__lineArray=new Uint16Array(v*2);if(i.numMorphTargets){i.__morphTargetsArrays=[];q=0;for(r=i.numMorphTargets;q<r;q++)i.__morphTargetsArrays.push(new Float32Array(k*3))}i.__needsSmoothNormals=u==THREE.SmoothShading;i.__uvType=o;i.__vertexColorType=p;i.__normalType=u;i.__webglFaceCount=t*3+(j.geometry.edgeFaces?j.geometry.edgeFaces.length* 6:0);i.__webglLineCount=v*2;q=0;for(r=n.length;q<r;q++)if(n[q].attributes)for(a in i.__webglCustomAttributes={},n[q].attributes){o={};for(prop in n[q].attributes[a])o[prop]=n[q].attributes[a][prop];if(!o.__webglInitialized||o.createUniqueBuffers)o.__webglInitialized=!0,t=1,o.type==="v2"?t=2:o.type==="v3"?t=3:o.type==="v4"?t=4:o.type==="c"&&(t=3),o.size=t,o.needsUpdate=!0,o.array=new Float32Array(k*t),o.buffer=c.createBuffer(),o.buffer.belongsToAttribute=a;i.__webglCustomAttributes[a]=o}i.__inittedArrays= !0;g.__dirtyVertices=!0;g.__dirtyMorphTargets=!0;g.__dirtyElements=!0;g.__dirtyUvs=!0;g.__dirtyNormals=!0;g.__dirtyTangents=!0;g.__dirtyColors=!0}d instanceof THREE.ShadowVolume?T(e.__webglShadowVolumes,h,d):T(e.__webglObjects,h,d)}else if(d instanceof THREE.LensFlare)T(e.__webglLensFlares,void 0,d);else if(d instanceof THREE.Ribbon){g=d.geometry;if(!g.__webglVertexBuffer)f=g,f.__webglVertexBuffer=c.createBuffer(),f.__webglColorBuffer=c.createBuffer(),f=g,h=f.vertices.length,f.__vertexArray=new Float32Array(h* 3),f.__colorArray=new Float32Array(h*3),f.__webglVertexCount=h,g.__dirtyVertices=!0,g.__dirtyColors=!0;T(e.__webglObjects,g,d)}else if(d instanceof THREE.Line){g=d.geometry;if(!g.__webglVertexBuffer)f=g,f.__webglVertexBuffer=c.createBuffer(),f.__webglColorBuffer=c.createBuffer(),f=g,h=f.vertices.length,f.__vertexArray=new Float32Array(h*3),f.__colorArray=new Float32Array(h*3),f.__webglLineCount=h,g.__dirtyVertices=!0,g.__dirtyColors=!0;T(e.__webglObjects,g,d)}else if(d instanceof THREE.ParticleSystem){g= d.geometry;if(!g.__webglVertexBuffer)f=g,f.__webglVertexBuffer=c.createBuffer(),f.__webglColorBuffer=c.createBuffer(),f=g,h=f.vertices.length,f.__vertexArray=new Float32Array(h*3),f.__colorArray=new Float32Array(h*3),f.__sortArray=[],f.__webglParticleCount=h,g.__dirtyVertices=!0,g.__dirtyColors=!0;T(e.__webglObjects,g,d)}else THREE.MarchingCubes!==void 0&&d instanceof THREE.MarchingCubes?e.__webglObjectsImmediate.push({object:d,opaque:{list:[],count:0},transparent:{list:[],count:0}}):d instanceof THREE.Sprite&&e.__webglSprites.push(d);b.__objectsAdded.splice(0,1)}for(;b.__objectsRemoved.length;)d=b.__objectsRemoved[0],e=b,d instanceof THREE.ShadowVolume?O(e.__webglShadowVolumes,d):d instanceof THREE.Mesh||d instanceof THREE.ParticleSystem||d instanceof THREE.Ribbon||d instanceof THREE.Line?O(e.__webglObjects,d):d instanceof THREE.Sprite?O(e.__webglSprites,d):d instanceof THREE.LensFlare?O(e.__webglLensFlares,d):d instanceof THREE.MarchingCubes&&O(e.__webglObjectsImmediate,d),b.__objectsRemoved.splice(0, 1);d=0;for(e=b.__webglObjects.length;d<e;d++)A(b.__webglObjects[d].object,b);d=0;for(e=b.__webglShadowVolumes.length;d<e;d++)A(b.__webglShadowVolumes[d].object,b);d=0;for(e=b.__webglLensFlares.length;d<e;d++)A(b.__webglLensFlares[d].object,b)};this.setFaceCulling=function(b,d){b?(!d||d=="ccw"?c.frontFace(c.CCW):c.frontFace(c.CW),b=="back"?c.cullFace(c.BACK):b=="front"?c.cullFace(c.FRONT):c.cullFace(c.FRONT_AND_BACK),c.enable(c.CULL_FACE)):c.disable(c.CULL_FACE)};this.supportsVertexTextures=function(){return Fa}}; THREE.WebGLRenderTarget=function(b,d,e){this.width=b;this.height=d;e=e||{};this.wrapS=e.wrapS!==void 0?e.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=e.wrapT!==void 0?e.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=e.magFilter!==void 0?e.magFilter:THREE.LinearFilter;this.minFilter=e.minFilter!==void 0?e.minFilter:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.format=e.format!==void 0?e.format:THREE.RGBAFormat;this.type=e.type!==void 0?e.type: THREE.UnsignedByteType;this.depthBuffer=e.depthBuffer!==void 0?e.depthBuffer:!0;this.stencilBuffer=e.stencilBuffer!==void 0?e.stencilBuffer:!0}; 

/*	*********
	* Stats *
	*********
	
	This is built on Stats.js r6. See LICENSE.txt for more info.	*/

Fiesta.Stats=function(){function s(a,g,d){var f,c,e;for(c=0;c<30;c++)for(f=0;f<73;f++)e=(f+c*74)*4,a[e]=a[e+4],a[e+1]=a[e+5],a[e+2]=a[e+6];for(c=0;c<30;c++)e=(73+c*74)*4,c<g?(a[e]=b[d].bg.r,a[e+1]=b[d].bg.g,a[e+2]=b[d].bg.b):(a[e]=b[d].fg.r,a[e+1]=b[d].fg.g,a[e+2]=b[d].fg.b)}var r=0,t=2,g,u=0,j=(new Date).getTime(),F=j,v=j,l=0,w=1E3,x=0,k,d,a,m,y,n=0,z=1E3,A=0,f,c,o,B,p=0,C=1E3,D=0,h,i,q,E,b={fps:{bg:{r:16,g:16,b:48},fg:{r:0,g:255,b:255}},ms:{bg:{r:16,g:48,b:16},fg:{r:0,g:255,b:0}},mb:{bg:{r:48,g:16, b:26},fg:{r:255,g:0,b:128}}};g=document.createElement("div");g.style.cursor="pointer";g.style.width="80px";g.style.opacity="0.9";g.style.zIndex="10001";g.addEventListener("click",function(){r++;r==t&&(r=0);k.style.display="none";f.style.display="none";h.style.display="none";switch(r){case 0:k.style.display="block";break;case 1:f.style.display="block";break;case 2:h.style.display="block"}},!1);k=document.createElement("div");k.style.backgroundColor="rgb("+Math.floor(b.fps.bg.r/2)+","+Math.floor(b.fps.bg.g/ 2)+","+Math.floor(b.fps.bg.b/2)+")";k.style.padding="2px 0px 3px 0px";g.appendChild(k);d=document.createElement("div");d.style.fontFamily="Helvetica, Arial, sans-serif";d.style.textAlign="left";d.style.fontSize="9px";d.style.color="rgb("+b.fps.fg.r+","+b.fps.fg.g+","+b.fps.fg.b+")";d.style.margin="0px 0px 1px 3px";d.innerHTML='<span style="font-weight:bold">FPS</span>';k.appendChild(d);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";k.appendChild(a); m=a.getContext("2d");m.fillStyle="rgb("+b.fps.bg.r+","+b.fps.bg.g+","+b.fps.bg.b+")";m.fillRect(0,0,a.width,a.height);y=m.getImageData(0,0,a.width,a.height);f=document.createElement("div");f.style.backgroundColor="rgb("+Math.floor(b.ms.bg.r/2)+","+Math.floor(b.ms.bg.g/2)+","+Math.floor(b.ms.bg.b/2)+")";f.style.padding="2px 0px 3px 0px";f.style.display="none";g.appendChild(f);c=document.createElement("div");c.style.fontFamily="Helvetica, Arial, sans-serif";c.style.textAlign="left";c.style.fontSize= "9px";c.style.color="rgb("+b.ms.fg.r+","+b.ms.fg.g+","+b.ms.fg.b+")";c.style.margin="0px 0px 1px 3px";c.innerHTML='<span style="font-weight:bold">MS</span>';f.appendChild(c);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";f.appendChild(a);o=a.getContext("2d");o.fillStyle="rgb("+b.ms.bg.r+","+b.ms.bg.g+","+b.ms.bg.b+")";o.fillRect(0,0,a.width,a.height);B=o.getImageData(0,0,a.width,a.height);try{performance&&performance.memory&&performance.memory.totalJSHeapSize&& (t=3)}catch(G){}h=document.createElement("div");h.style.backgroundColor="rgb("+Math.floor(b.mb.bg.r/2)+","+Math.floor(b.mb.bg.g/2)+","+Math.floor(b.mb.bg.b/2)+")";h.style.padding="2px 0px 3px 0px";h.style.display="none";g.appendChild(h);i=document.createElement("div");i.style.fontFamily="Helvetica, Arial, sans-serif";i.style.textAlign="left";i.style.fontSize="9px";i.style.color="rgb("+b.mb.fg.r+","+b.mb.fg.g+","+b.mb.fg.b+")";i.style.margin="0px 0px 1px 3px";i.innerHTML='<span style="font-weight:bold">MB</span>'; h.appendChild(i);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";h.appendChild(a);q=a.getContext("2d");q.fillStyle="#301010";q.fillRect(0,0,a.width,a.height);E=q.getImageData(0,0,a.width,a.height);return{domElement:g,update:function(){u++;j=(new Date).getTime();n=j-F;z=Math.min(z,n);A=Math.max(A,n);s(B.data,Math.min(30,30-n/200*30),"ms");c.innerHTML='<span style="font-weight:bold">'+n+" MS</span> ("+z+"-"+A+")";o.putImageData(B,0,0);F=j;if(j> v+1E3){l=Math.round(u*1E3/(j-v));w=Math.min(w,l);x=Math.max(x,l);s(y.data,Math.min(30,30-l/100*30),"fps");d.innerHTML='<span style="font-weight:bold">'+l+" FPS</span> ("+w+"-"+x+")";m.putImageData(y,0,0);if(t==3)p=performance.memory.usedJSHeapSize*9.54E-7,C=Math.min(C,p),D=Math.max(D,p),s(E.data,Math.min(30,30-p/2),"mb"),i.innerHTML='<span style="font-weight:bold">'+Math.round(p)+" MB</span> ("+Math.round(C)+"-"+Math.round(D)+")",q.putImageData(E,0,0);v=j;u=0}}}};

/*	****************************
	* Browser detection object *
	****************************
	
	This is built on browser-detect. See LICENSE.txt for more info. */

var _BrowserDetect = {
	init: function () {
		
		// Store data
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		
		// Clear old functions
		this.searchString = undefined;
		this.searchVersion = undefined;
		this.dataBrowser = undefined;
		this.dataOS = undefined;
		
	},
	searchString: function(data) {
		var i = data.length;
		while (i --) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) !== -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) return;
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
		{		// Newer Netscapes (6+)
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
		{ 		// Older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS: [
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
_BrowserDetect.init();

/*	***********
	* Browser *
	***********
	
	This is code to detect your browser and things about it.	*/

// Get the current browser, version, or OS
Fiesta.getBrowser = function() { return _BrowserDetect.browser };
Fiesta.getBrowserVersion = function() { return _BrowserDetect.version };
Fiesta.getOS = function() { return _BrowserDetect.OS };

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

// Sign of a number
Fiesta.sign = function(d) {
	if (!Fiesta.isNumber(d))
		throw new TypeError("Cannot find sign of " + typeof d + " " + d);
	if (d > 0) return 1;
	if (d < 0) return -1;
	return 0;
}

// Wrap a value around (examples below make the most sense)
Fiesta.wrap = function(min, max, value) {
	if (!Fiesta.isNumber(min)) throw new TypeError(min + " is not a valid minimum");
	if (!Fiesta.isNumber(max)) throw new TypeError(max + " is not a valid maximum");
	if (!Fiesta.isNumber(value)) throw new TypeError(value + " is not a valid value");
	if (min > max) throw new Error("Cannot wrap if the minimum (" + min + ") is greater than the maximum (" + max + ")");
		
	if (value > max)
		return Fiesta.wrap(min, max, value - (max - min));
	if (value < min)
		return Fiesta.wrap(min, max, value + (max - min));
	return value;
}

// Angle wrapping (ie, change 370º to 10º)
Fiesta.degrees = function(d) { return Fiesta.wrap(0, 360, d) };
Fiesta.radians = function(d) { return Fiesta.wrap(0, 2 * Math.PI, d) };

// Convert rotation measurements
Fiesta.degreesToRadians = function(d) { return (Fiesta.degrees(d) * Math.PI) / 180; };
Fiesta.radiansToDegrees = function(r) { return (Fiesta.radians(r) * 180) / Math.PI; };

// Distances between points (2 and 3 dimensions)
Fiesta.pointDistance2D = function(x1, y1, x2, y2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); };
Fiesta.pointDistance3D = function(x1, y1, z1, x2, y2, z2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)); };

// Vector length
Fiesta.vectorLength = function(i, j, k) {
	if (!k) return Fiesta.pointDistance2D(0, 0, i, j);
	return Fiesta.pointDistance3D(0, 0, 0, i, j, k);
};

/*	*******************
	* Misc. functions *
	*******************
	
	These are miscellaneous functions that do random things.	*/

// Check value types
Fiesta.isNumber = function(n) { return (((typeof n === typeof 1.0) || (n instanceof Number)) && (!isNaN(n))) };
Fiesta.isInteger = function(i) { return ((Fiesta.isNumber(i)) && (Math.floor(i) === i)) };
Fiesta.isString = function(s) { return ((typeof s === typeof "") || (s instanceof String)) };
Fiesta.isBoolean = function(b) { return ((typeof b === typeof true) || (b instanceof Boolean)) };
Fiesta.isArray = function(a) { return a.constructor == Array };

// Does this string/array contain this element?
Fiesta.contains = function(searchIn, searchFor) { return !!~searchIn.indexOf(searchFor) };

// Get the file extension
Fiesta.getFileExtension = function(filename) {
	var extension = filename.split(".").pop();
	if (extension === filename)	// No extension
		return "";
	else
		return extension.toLowerCase();
};

// Make a sorta-GUID
Fiesta._guids = [];
Fiesta.guid = function() {
	var guid = Math.floor(Math.random() * Date.now());
	var i = this._guids.length;
	while (i --) {
		if (this._guids[i] === guid)
			return this.guid();	// Start over; we already have this GUID
	}
	this._guids.push(guid);
	return guid;
};

// Show stats
Fiesta.showStats = function() {
	var stats = new Fiesta.Stats();
	stats.domElement.style.position = "absolute";
	stats.domElement.style.left = Fiesta.DEFAULT_STATS_LEFT_POSITION;
	stats.domElement.style.top = Fiesta.DEFAULT_STATS_UP_POSITION;
	document.body.appendChild(stats.domElement);
	setInterval(function() {
		stats.update();
	}, 1000 / 60);
	return stats.domElement;
};

/*	************
	* Commands *
	************
	
	This is all the logic for binding user commands (key presses, clicks, etc)
	to methods. This SHOULD work for any object, whether it's Fiesta or not. */

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
	if (Fiesta.KEYCODE_TRANSLATIONS[command])
		return Fiesta.KEYCODE_TRANSLATIONS[command];
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
	getGraphic: function() {
		if (this._graphic)
			return this._graphic;
		else
			return false;
	},
	setGraphic: function(g) {
		if (g instanceof Fiesta.Graphic)
			this._graphic = g;
		else
			throw new TypeError(g + " is not a graphic");
	},
	
	// Playground API
	getPlayground: function() {
		if (this._playground)
			return this._playground;
		else
			return false;
	},
	_setPlayground: function(p) {
		if (p instanceof Fiesta.Playground)
			this._playground = p;
		else
			throw new TypeError(p + " is not a valid playground");
	},
	_resetPlayground: function() {
		var undefined;
		this._playground = undefined;
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
		this._boundingBox = [];
		this._boundingBoxAuto = Fiesta.DEFAULT_BOUNDING_BOX_AUTO;
		
		this.setCoordinates(Fiesta.DEFAULT_X, Fiesta.DEFAULT_Y, Fiesta.DEFAULT_Z);
		this.setVelocityX(Fiesta.DEFAULT_X_VELOCITY);
		this.setVelocityY(Fiesta.DEFAULT_Y_VELOCITY);
		this.setVelocityZ(Fiesta.DEFAULT_Z_VELOCITY);
		this.setAccelerationX(Fiesta.DEFAULT_X_ACCELERATION);
		this.setAccelerationY(Fiesta.DEFAULT_Y_ACCELERATION);
		this.setAccelerationZ(Fiesta.DEFAULT_Z_ACCELERATION);
		this.setFrictionX(Fiesta.DEFAULT_X_FRICTION);
		this.setFrictionY(Fiesta.DEFAULT_Y_FRICTION);
		this.setFrictionZ(Fiesta.DEFAULT_Z_FRICTION);
		this.setMass(Fiesta.DEFAULT_MASS);
		this.setBounciness(Fiesta.DEFAULT_BOUNCINESS);
	},
	
	// Location API
	getX: function() { return this._x; },
	getY: function() { return this._y; },
	getZ: function() { return this._z; },
	getCoordinates: function() { return [this._x, this._y, this._z] },
	setX: function(coord) {
		if (Fiesta.isNumber(coord))
			this._x = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setY: function(coord) {
		if (Fiesta.isNumber(coord))
			this._y = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate");
	},
	setZ: function(coord) {
		if (Fiesta.isNumber(coord))
			this._z = coord;
		else
			throw new TypeError(coord + " is not a valid Z coordinate");
	},
	setCoordinates: function(xCoord, yCoord, zCoord) {
		var undefined;
		if ((xCoord === undefined) && (yCoord === undefined))
			throw new TypeError("Cannot set coordinates to " + xCoord + ", " + yCoord + ", " + zCoord);
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
		if (Fiesta.isNumber(v))
			this._velocityX = v;
		else
			throw new TypeError(v + " is not a valid X velocity");
	},
	setVelocityY: function(v) {
		if (Fiesta.isNumber(v))
			this._velocityY = v;
		else
			throw new TypeError(v + " is not a valid Y velocity");
	},
	setVelocityZ: function(v) {
		if (Fiesta.isNumber(v))
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
		if (Fiesta.isNumber(a))
			this._accelerationX = a;
		else
			throw new TypeError(a + " is not a valid X acceleration");
	},
	setAccelerationY: function(a) {
		if (Fiesta.isNumber(a))
			this._accelerationY = a;
		else
			throw new TypeError(a + " is not a valid Y acceleration");
	},
	setAccelerationZ: function(a) {
		if (Fiesta.isNumber(a))
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
		if (Fiesta.isNumber(f))
			this._frictionX = f;
		else
			throw new TypeError(f + " is not a valid X friction");
	},
	setFrictionY: function(f) {
		if (Fiesta.isNumber(f))
			this._frictionY = f;
		else
			throw new TypeError(f + " is not a valid Y friction");
	},
	setFrictionZ: function(f) {
		if (Fiesta.isNumber(f))
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
		if ((Fiesta.isNumber(m)) && (m > 0))
			this._mass = m;
		else
			throw new TypeError(m + " is not a valid mass");
	},
	addMass: function(a) { this.setMass(a + this.getMass()) },
	
	// Bounciness API
	getBounciness: function() { return this._bounciness; },
	setBounciness: function(b) {
		if (Fiesta.isNumber(b))
			this._bounciness = b;
		else
			throw new TypeError(b + " is not a valid bounciness");
	},
	addBounciness: function(a) { this.setBounciness(a + this.getBounciness()) },
	
	// Bounding box API
	getBoundingBox: function() {
		if (this._boundingBoxAuto)
			this.updateBoundingBox();
		return this._boundingBox;
	},
	setBoundingBox: function(b) {
		if (!Fiesta.isArray(b))
			throw new TypeError("Cannot make a bounding box out of " + b);
		var i = b.length;
		if (i !== 6)
			throw new Error("Not enough values passed to make a bounding box");
		while (i --) {
			if (!Fiesta.isNumber(b[i]))
				throw new TypeError(b[i] + " is not a valid bounding box value");
		}
		this._boundingBox = b;
		this._boundingBoxAuto = false;
	},
	updateBoundingBox: function() {
		if (this._boundingBoxAuto) {
			if (graphic = this.getGraphic()) {
				var bounding = graphic.getBoundingBox();
				this._boundingBox = [
					this.getX() + bounding[0],
					this.getY() + bounding[1],
					this.getZ() + bounding[2],
					this.getX() + bounding[3],
					this.getY() + bounding[4],
					this.getZ() + bounding[5]
				];
			} else {
				this._boundingBox = [
					this.getX() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this._boundingBoxY1 = this.getY() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this._boundingBoxZ1 = this.getZ() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this._boundingBoxX2 = this._boundingBoxX1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION,
					this._boundingBoxY2 = this._boundingBoxY1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION,
					this._boundingBoxZ2 = this._boundingBoxZ1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION
				];
			}
		}
	},
	
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
	var massRatio = aMass / bMass;
	var massSum = aMass + bMass;
	var bOldVX = b.getVelocityX();
	var bOldVY = b.getVelocityY();
	var bOldVZ = b.getVelocityZ();
	var distanceXSign = Fiesta.sign(a.getX() - b.getX());
	var distanceYSign = Fiesta.sign(a.getY() - b.getY());
	var distanceZSign = Fiesta.sign(a.getZ() - b.getZ());
	b.setVelocityX((a.getVelocityX() * massRatio) || 0);	// NaN shows up if either
	b.setVelocityY((a.getVelocityY() * massRatio) || 0);	// mass is Infinity; the
	b.setVelocityZ((a.getVelocityZ() * massRatio) || 0);	// || 0 fixes that
	a.setVelocityX((bOldVX / massRatio) || 0);
	a.setVelocityY((bOldVY / massRatio) || 0);
	a.setVelocityZ((bOldVZ / massRatio) || 0);
	var aMoves = (1 - (aMass / massSum)) || 0;
	var bMoves = (1 - (bMass / massSum)) || 0;
	a.addX(distanceXSign * aMoves);
	a.addY(distanceYSign * aMoves);
	a.addZ(distanceZSign * aMoves);
	b.addX(-distanceXSign * bMoves);
	b.addY(-distanceYSign * bMoves);
	b.addZ(-distanceZSign * bMoves);
	a.onCollide(b);
	b.onCollide(a);
};

/*	***********
	* Graphic *
	***********
	
	This is the base class for graphics, both 2D and 3D.	*/

Fiesta.Graphic = new Fiesta.Class({
	
	// Constructor
	initialize: function() {
		this._boundingBox = [];
		this._boundingBoxChanged = true;
	},
	
	// "Abstract" functions
	draw: function() { throw new Error("This graphic must know how to draw itself") },
	getBoundingBox: function() { throw new Error("This graphic must know how to get a bounding box") }
	
});

/*	**************
	* 2D Graphic *
	**************
	
	This is the base class for 2D sprites, 2D text, 2D shapes, et cetera.
	Note: You can't start JavaScript names with a 2, otherwise I would.	*/

Fiesta.Graphic2D = new Fiesta.Class(Fiesta.Graphic, {
	initialize: function() {
		this.callSuper();
	}
});

/*	**************
	* 3D Graphic *
	**************
	
	This is the base class for 3D graphics.
	Note: You can't start JavaScript names with a 3, otherwise I would.	*/

Fiesta.Graphic3D = new Fiesta.Class(Fiesta.Graphic, {
	initialize: function() {
		this.callSuper();
	}
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
		this._currentIndex = Fiesta.DEFAULT_SPRITE_STARTING_INDEX;
		this._animateSpeed = Fiesta.DEFAULT_SPRITE_ANIMATE_SPEED;
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
		if (Fiesta.isNumber(coord)) {
			this._originX = coord;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid X coordinate");
	},
	setOriginY: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._originY = coord;
			this._boundingBoxChanged = true;
		}
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
		var i = u.length;
		while (i --) {
			if (Fiesta.isString(u[i])) {
				this._urls[i] = u[i];
				var img = new Image();	// Preloadin'
				img.src = u[i];
			}
			else
				throw new TypeError(u[i] + " is not a valid sprite URL");
		}
		if (this._urls.length > 1)
			this.animate();
		this._boundingBoxChanged = true;
	},
	
	// Animation API
	animate: function() {
		this._currentIndex ++;
		if (this._currentIndex >= this._urls.length)
			this._currentIndex = 0;
		var me = this;	// I have to do this for the setTimeout
		if (this._animateSpeed > 0) {
			if (this._urls.length)
				this._boundingBoxChanged = true;
			setTimeout(function() { me.animate() }, this._animateSpeed);
		}
	},
	getIndex: function() { return this._currentIndex; },
	setIndex: function(i) {
		if (Fiesta.isInteger(i)) {
			if (i < this._urls.length)
				this._currentIndex = i;
			else {
				setIndex(i - this._urls.length);
				Fiesta.warn("Tried to set Sprite index to " + i + ", but the max is " + (this._urls.length - 1) + "; was able to wrap around.");
			}
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(i + " is not a valid index");
	},
	getAnimateSpeed: function() { return this._animateSpeed; },
	setAnimateSpeed: function(a) {
		if ((Fiesta.isNumber(a)) && (a >= 0))
			this._animateSpeed = a;
		else
			throw new TypeError(a + " is not a valid animation speed");
	},
	stopAnimation: function() { this._animateSpeed = 0; },
	
	// Get my Image() (this also preloads)
	getImage: function() {
		var img = new Image();
		if (this._urls)
			img.src = this._urls[this._currentIndex];
		return img;
	},
	getWidth: function() { return this.getImage().width },
	getHeight: function() { return this.getImage().height },
	
	// Draw me
	draw: function(playground, xCoord, yCoord, spriteWidth, spriteHeight) {
		if (!(playground instanceof Fiesta.Playground))
			throw new TypeError(playground + " is not a playground that I can draw sprites on");
		if (!Fiesta.isNumber(xCoord))
			throw new TypeError(xCoord + " is not a valid X coordinate");
		if (!Fiesta.isNumber(yCoord))
			throw new TypeError(yCoord + " is not a valid Y coordinate");
		var image = this.getImage();
		spriteWidth = spriteWidth || image.width;
		spriteHeight = spriteHeight || image.height;
		var context = playground.getContext();
		context.drawImage(image, xCoord - this.getOriginX(), yCoord - this.getOriginY(), spriteWidth, spriteHeight);	
	},
	
	// Get my bounding box
	getBoundingBox: function() {
		if (this._boundingBoxChanged) {
			this._boundingBox[0] = -this.getOriginX();
			this._boundingBox[1] = -this.getOriginY();
			this._boundingBox[2] = -Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2;
			this._boundingBox[3] = this._boundingBox[0] + this.getWidth();
			this._boundingBox[4] = this._boundingBox[1] + this.getHeight();
			this._boundingBox[5] = this._boundingBox[2] + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
			this._boundingBoxChanged = false;
		}
		return this._boundingBox;
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
		if (Fiesta.isString(sources)) {
			if (Fiesta.getFileExtension(sources) === "") {
				var i = Fiesta.SOUND_EXTENSIONS.length;
				while (i --) {
					this._files.push(sources + "." + soundExtensions[i]);
				}
			} else
				this._files = [sources];
		}
		else if (Fiesta.isArray(sources))
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
		var i = this._files.length;
		while (i --) {
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
		this._backgroundColor;
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
		if ((Fiesta.isNumber(w)) && (w >= 0)) {
			this._width = w;
			if (this._element)
				this._element.setAttribute("width", this._width);
		}
		else
			throw new TypeError(w + " is not a valid playground width");
	},
	setHeight: function(h) {
		if ((Fiesta.isNumber(h)) && (h >= 0)) {
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
		if ((Fiesta.isNumber(f)) && (f >= 0)) {
			this._desiredFPS = f;
		}
		else
			throw new TypeError(f + " is not a valid desired FPS");
	},
	
	// Redraw API
	getRedraw: function() { return this._redraw; },
	setRedraw: function(r) {
		if (Fiesta.isBoolean(r))
			this._redraw = r;
		else
			throw new TypeError("Cannot set redrawing to " + r);
	},
	
	// DOM API
	place: function(domElement) {
		if (!domElement)
			domElement = document.body;
		if (!(domElement instanceof HTMLElement))
			throw new TypeError("Playground cannot be placed in " + domElement);
		
		this._element = document.createElement("canvas");
		this._element.setAttribute("class", "fiesta_playground");
		this._element.style.overflow = "hidden";
		this._element.setAttribute("width", this._width);
		this._element.setAttribute("height", this._height);
		if (this._backgroundColor)
			this._element.style.backgroundColor = this._backgroundColor;
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
		if ((Fiesta.isString(c)) && ((c.toLowerCase() === "2d") || (c.toLowerCase() === "3d")))
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
	getBackgroundColor: function() { return this._backgroundColor },
	setBackgroundColor: function(color) {
		if (!Fiesta.isString(color))
			throw new TypeError(color + " is not a valid color");
		this._backgroundColor = color;
		if (this.domElementExists())
			this.getDOMElement().style.backgroundColor = color;
	},
	
	// Object API
	spawn: function(object, x, y, z) {
		if (object instanceof Fiesta.GameObject) {
			this._gameObjects.push(object);
			object._setPlayground(this);
			if (x)
				object.setX(x);
			if (y)
				object.setY(y);
			if (z)
				object.setZ(z);
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
				object._resetPlayground();
				object.onDestroy();
			} else
				throw new Error("Looks like there is no object " + object + " to destroy");
		}
		else
			throw new TypeError(object + " is not something that can be destroyed");
	},
	objectsAt: function(x, y, z) {
		var undefined;
		if (z === undefined)
			z = 0;
		if ((!Fiesta.isNumber(x)) || (!Fiesta.isNumber(y)) || (!Fiesta.isNumber(z)))
			throw new TypeError("Cannot look for objects at " + x + ", " + y + ", and " + z);
		var objects = [];
		var i = this._gameObjects.length;
		while (i --) {
			if (this._gameObjects[i] instanceof Fiesta.PhysicalGameObject) {
				var bound = this._gameObjects[i].getBoundingBox();
				if ((x > bound[0])
					&&
					(x < bound[3])
					&&
					(y > bound[1])
					&&
					(y < bound[4])
					&&
					(z > bound[2])
					&&
					(z < bound[5])) {
					objects.push(this._gameObjects[i]);
				}
			}
		}
		if (objects.length === 0)
			return false;
		return objects;
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
		var size = this._gameObjects.length;	// This is for a bit later
		var i = size;
		while (i --) {
			
			// Draw the object
			try {
				var obj = this._gameObjects[i];
				if (obj instanceof Fiesta.PhysicalGameObject)
					obj.getGraphic().draw(this, obj.getX(), obj.getY());
			} catch (e) { Fiesta.error(e) }
			
			// Do the onFrame stuff
			try {
				obj.onFrame();
			} catch (e) { Fiesta.error(e) }
			
			// Collisions
			try {
				if (obj instanceof Fiesta.PhysicalGameObject) {
					var objBound = obj.getBoundingBox();
					for (var j = i + 1; j < size; j ++) {
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
			
		}
	}
	
});
