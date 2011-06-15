/*	###############
	## FIESTA.JS ##
	###############
	
	version 0.1.8
	
	Fiesta.js is a JavaScript game engine. It aims to support 2D and 3D
	games using only modern browser technologies.
	
	See LICENSE.txt for legal info.
	
	¡Disfruta!	*/

var Fiesta = {};

/*	************
	* Defaults *
	************	*/

// Commands defaults
if (!Fiesta.DEFAULT_KEYBOARD_COMMAND) Fiesta.DEFAULT_KEYBOARD_COMMAND = "keydown";
if (!Fiesta.DEFAULT_CLICK) Fiesta.DEFAULT_CLICK = "leftclick";

// Physical game objects defaults
if (!Fiesta.DEFAULT_X) Fiesta.DEFAULT_X = 0;
if (!Fiesta.DEFAULT_Y) Fiesta.DEFAULT_Y = 0;
if (!Fiesta.DEFAULT_Z) Fiesta.DEFAULT_Z = 0;
if (!Fiesta.DEFAULT_X_VELOCITY) Fiesta.DEFAULT_X_VELOCITY = 0;
if (!Fiesta.DEFAULT_Y_VELOCITY) Fiesta.DEFAULT_Y_VELOCITY = 0;
if (!Fiesta.DEFAULT_Z_VELOCITY) Fiesta.DEFAULT_Z_VELOCITY = 0;
if (!Fiesta.DEFAULT_X_ACCELERATION) Fiesta.DEFAULT_X_ACCELERATION = 0;
if (!Fiesta.DEFAULT_Y_ACCELERATION) Fiesta.DEFAULT_Y_ACCELERATION = 0;
if (!Fiesta.DEFAULT_Z_ACCELERATION) Fiesta.DEFAULT_Z_ACCELERATION = 0;
if (!Fiesta.DEFAULT_X_FRICTION) Fiesta.DEFAULT_X_FRICTION = 0;
if (!Fiesta.DEFAULT_Y_FRICTION) Fiesta.DEFAULT_Y_FRICTION = 0;
if (!Fiesta.DEFAULT_Z_FRICTION) Fiesta.DEFAULT_Z_FRICTION = 0;
if (!Fiesta.DEFAULT_MASS) Fiesta.DEFAULT_MASS = 1;
if (!Fiesta.DEFAULT_BOUNCINESS) Fiesta.DEFAULT_BOUNCINESS = 1;
if (!Fiesta.DEFAULT_BOUNDING_BOX_AUTO) Fiesta.DEFAULT_BOUNDING_BOX_AUTO = true;
if (!Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION) Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION = 1;

// Playground defaults
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

/*	*************
	* 3D engine *
	*************
	
	This is Three.js r41/ROME. See LICENSE.txt for more info.	*/

var THREE=THREE||{};if(!window.Int32Array)window.Int32Array=Array,window.Float32Array=Array;THREE.Color=function(b){this.setHex(b)};
THREE.Color.prototype={copy:function(b){this.r=b.r;this.g=b.g;this.b=b.b;this.hex=b.hex},setHex:function(b){this.hex=~~b&16777215;this.updateRGB()},setRGB:function(b,c,d){this.r=b;this.g=c;this.b=d;this.updateHex()},setHSV:function(b,c,d){var e,g,f,j,k,m;if(d==0)e=g=f=0;else switch(j=Math.floor(b*6),k=b*6-j,b=d*(1-c),m=d*(1-c*k),c=d*(1-c*(1-k)),j){case 1:e=m;g=d;f=b;break;case 2:e=b;g=d;f=c;break;case 3:e=b;g=m;f=d;break;case 4:e=c;g=b;f=d;break;case 5:e=d;g=b;f=m;break;case 6:case 0:e=d,g=c,f=b}this.setRGB(e,
g,f)},updateHex:function(){this.hex=~~(this.r*255)<<16^~~(this.g*255)<<8^~~(this.b*255)},updateRGB:function(){this.r=(this.hex>>16&255)/255;this.g=(this.hex>>8&255)/255;this.b=(this.hex&255)/255},clone:function(){return new THREE.Color(this.hex)}};THREE.Vector2=function(b,c){this.set(b||0,c||0)};
THREE.Vector2.prototype={set:function(b,c){this.x=b;this.y=c;return this},copy:function(b){this.x=b.x;this.y=b.y;return this},clone:function(){return new THREE.Vector2(this.x,this.y)},add:function(b,c){this.x=b.x+c.x;this.y=b.y+c.y;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;return this},sub:function(b,c){this.x=b.x-c.x;this.y=b.y-c.y;return this},subSelf:function(b){this.x-=b.x;this.y-=b.y;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;return this},divideScalar:function(b){b?
(this.x/=b,this.y/=b):this.set(0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},setLength:function(b){return this.normalize().multiplyScalar(b)},unit:function(){return this.normalize()}};THREE.Vector3=function(b,c,d){this.set(b||0,c||0,d||0)};
THREE.Vector3.prototype={set:function(b,c,d){this.x=b;this.y=c;this.z=d;return this},copy:function(b){this.x=b.x;this.y=b.y;this.z=b.z;return this},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)},add:function(b,c){this.x=b.x+c.x;this.y=b.y+c.y;this.z=b.z+c.z;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;this.z+=b.z;return this},addScalar:function(b){this.x+=b;this.y+=b;this.z+=b;return this},sub:function(b,c){this.x=b.x-c.x;this.y=b.y-c.y;this.z=b.z-c.z;return this},subSelf:function(b){this.x-=
b.x;this.y-=b.y;this.z-=b.z;return this},multiply:function(b,c){this.x=b.x*c.x;this.y=b.y*c.y;this.z=b.z*c.z;return this},multiplySelf:function(b){this.x*=b.x;this.y*=b.y;this.z*=b.y;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;this.z*=b;return this},divideSelf:function(b){return this.divide(this,b)},divideScalar:function(b){b?(this.x/=b,this.y/=b,this.z/=b):this.set(0,0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y+this.z*
b.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.lengthSq())},lengthManhattan:function(){return this.x+this.y+this.z},normalize:function(){return this.divideScalar(this.length())},setLength:function(b){return this.normalize().multiplyScalar(b)},cross:function(b,c){this.x=b.y*c.z-b.z*c.y;this.y=b.z*c.x-b.x*c.z;this.z=b.x*c.y-b.y*c.x;return this},crossSelf:function(b){return this.set(this.y*b.z-this.z*b.y,this.z*b.x-this.x*b.z,this.x*
b.y-this.y*b.x)},distanceTo:function(b){return Math.sqrt(this.distanceToSquared(b))},distanceToSquared:function(b){return(new THREE.Vector3).sub(this,b).lengthSq()},setPositionFromMatrix:function(b){this.x=b.n14;this.y=b.n24;this.z=b.n34},setRotationFromMatrix:function(b){var c=Math.cos(this.y);this.y=Math.asin(b.n13);Math.abs(c)>1.0E-5?(this.x=Math.atan2(-b.n23/c,b.n33/c),this.z=Math.atan2(-b.n12/c,b.n11/c)):(this.x=0,this.z=Math.atan2(b.n21,b.n22))},isZero:function(){return this.lengthSq()<1.0E-4}};
THREE.Vector4=function(b,c,d,e){this.set(b||0,c||0,d||0,e||1)};
THREE.Vector4.prototype={set:function(b,c,d,e){this.x=b;this.y=c;this.z=d;this.w=e;return this},copy:function(b){return this.set(b.x,b.y,b.z,b.w||1)},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)},add:function(b,c){this.x=b.x+c.x;this.y=b.y+c.y;this.z=b.z+c.z;this.w=b.w+c.w;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;this.z+=b.z;this.w+=b.w;return this},sub:function(b,c){this.x=b.x-c.x;this.y=b.y-c.y;this.z=b.z-c.z;this.w=b.w-c.w;return this},subSelf:function(b){this.x-=
b.x;this.y-=b.y;this.z-=b.z;this.w-=b.w;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;this.z*=b;this.w*=b;return this},divideScalar:function(b){b?(this.x/=b,this.y/=b,this.z/=b,this.w/=b):this.set(0,0,0,1);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y+this.z*b.z+this.w*b.w},lengthSq:function(){return this.dot(this)},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},
setLength:function(b){return this.normalize().multiplyScalar(b)},lerpSelf:function(b,c){this.x+=(b.x-this.x)*c;this.y+=(b.y-this.y)*c;this.z+=(b.z-this.z)*c;this.w+=(b.w-this.w)*c;return this}};THREE.Ray=function(b,c){this.origin=b||new THREE.Vector3;this.direction=c||new THREE.Vector3};
THREE.Ray.prototype={intersectScene:function(b){return this.intersectObjects(b.objects)},intersectObjects:function(b){var c,d,e=[];c=0;for(d=b.length;c<d;c++)e=e.concat(this.intersectObject(b[c]));e.sort(function(b,d){return b.distance-d.distance});return e},intersectObject:function(b){function c(b,d,c){var e;e=c.position.clone().subSelf(b).dot(d);if(e<0)return!1;b=b.clone().addSelf(d.clone().multiplyScalar(e));return c.position.distanceTo(b)}function d(b,d,c,e){var e=e.clone().subSelf(d),c=c.clone().subSelf(d),
g=b.clone().subSelf(d),b=e.dot(e),d=e.dot(c),e=e.dot(g),f=c.dot(c),c=c.dot(g),g=1/(b*f-d*d),f=(f*e-d*c)*g,b=(b*c-d*e)*g;return f>0&&b>0&&f+b<1}if(b instanceof THREE.Particle){var e=c(this.origin,this.direction,b);if(!e||e>b.scale.x)return[];return[{distance:e,point:b.position,face:null,object:b}]}else if(b instanceof THREE.Mesh){e=c(this.origin,this.direction,b);if(!e||e>b.geometry.boundingSphere.radius*Math.max(b.scale.x,Math.max(b.scale.y,b.scale.z)))return[];var g,f,j,k,m,o,p,n,u,t,v=b.geometry,
A=v.vertices,B=[],e=0;for(g=v.faces.length;e<g;e++)if(f=v.faces[e],u=this.origin.clone(),t=this.direction.clone(),o=b.matrixWorld,j=o.multiplyVector3(A[f.a].position.clone()),k=o.multiplyVector3(A[f.b].position.clone()),m=o.multiplyVector3(A[f.c].position.clone()),o=f instanceof THREE.Face4?o.multiplyVector3(A[f.d].position.clone()):null,p=b.matrixRotationWorld.multiplyVector3(f.normal.clone()),n=t.dot(p),b.doubleSided||(b.flipSided?n>0:n<0))if(p=p.dot((new THREE.Vector3).sub(j,u))/n,u=u.addSelf(t.multiplyScalar(p)),
f instanceof THREE.Face3)d(u,j,k,m)&&(f={distance:this.origin.distanceTo(u),point:u,face:f,object:b},B.push(f));else if(f instanceof THREE.Face4&&(d(u,j,k,o)||d(u,k,m,o)))f={distance:this.origin.distanceTo(u),point:u,face:f,object:b},B.push(f);return B}else return[]}};
THREE.Rectangle=function(){function b(){f=e-c;j=g-d}var c,d,e,g,f,j,k=!0;this.getX=function(){return c};this.getY=function(){return d};this.getWidth=function(){return f};this.getHeight=function(){return j};this.getLeft=function(){return c};this.getTop=function(){return d};this.getRight=function(){return e};this.getBottom=function(){return g};this.set=function(f,j,p,n){k=!1;c=f;d=j;e=p;g=n;b()};this.addPoint=function(f,j){k?(k=!1,c=f,d=j,e=f,g=j):(c=c<f?c:f,d=d<j?d:j,e=e>f?e:f,g=g>j?g:j);b()};this.add3Points=
function(f,j,p,n,u,t){k?(k=!1,c=f<p?f<u?f:u:p<u?p:u,d=j<n?j<t?j:t:n<t?n:t,e=f>p?f>u?f:u:p>u?p:u,g=j>n?j>t?j:t:n>t?n:t):(c=f<p?f<u?f<c?f:c:u<c?u:c:p<u?p<c?p:c:u<c?u:c,d=j<n?j<t?j<d?j:d:t<d?t:d:n<t?n<d?n:d:t<d?t:d,e=f>p?f>u?f>e?f:e:u>e?u:e:p>u?p>e?p:e:u>e?u:e,g=j>n?j>t?j>g?j:g:t>g?t:g:n>t?n>g?n:g:t>g?t:g);b()};this.addRectangle=function(f){k?(k=!1,c=f.getLeft(),d=f.getTop(),e=f.getRight(),g=f.getBottom()):(c=c<f.getLeft()?c:f.getLeft(),d=d<f.getTop()?d:f.getTop(),e=e>f.getRight()?e:f.getRight(),g=g>
f.getBottom()?g:f.getBottom());b()};this.inflate=function(f){c-=f;d-=f;e+=f;g+=f;b()};this.minSelf=function(f){c=c>f.getLeft()?c:f.getLeft();d=d>f.getTop()?d:f.getTop();e=e<f.getRight()?e:f.getRight();g=g<f.getBottom()?g:f.getBottom();b()};this.instersects=function(b){return Math.min(e,b.getRight())-Math.max(c,b.getLeft())>=0&&Math.min(g,b.getBottom())-Math.max(d,b.getTop())>=0};this.empty=function(){k=!0;g=e=d=c=0;b()};this.isEmpty=function(){return k}};THREE.Matrix3=function(){this.m=[]};
THREE.Matrix3.prototype={transpose:function(){var b,c=this.m;b=c[1];c[1]=c[3];c[3]=b;b=c[2];c[2]=c[6];c[6]=b;b=c[5];c[5]=c[7];c[7]=b;return this},transposeIntoArray:function(b){var c=this.m;b[0]=c[0];b[1]=c[3];b[2]=c[6];b[3]=c[1];b[4]=c[4];b[5]=c[7];b[6]=c[2];b[7]=c[5];b[8]=c[8];return this}};THREE.Matrix4=function(b,c,d,e,g,f,j,k,m,o,p,n,u,t,v,A){this.set(b||1,c||0,d||0,e||0,g||0,f||1,j||0,k||0,m||0,o||0,p||1,n||0,u||0,t||0,v||0,A||1);this.flat=Array(16);this.m33=new THREE.Matrix3};
THREE.Matrix4.prototype={set:function(b,c,d,e,g,f,j,k,m,o,p,n,u,t,v,A){this.n11=b;this.n12=c;this.n13=d;this.n14=e;this.n21=g;this.n22=f;this.n23=j;this.n24=k;this.n31=m;this.n32=o;this.n33=p;this.n34=n;this.n41=u;this.n42=t;this.n43=v;this.n44=A;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(b){this.set(b.n11,b.n12,b.n13,b.n14,b.n21,b.n22,b.n23,b.n24,b.n31,b.n32,b.n33,b.n34,b.n41,b.n42,b.n43,b.n44);return this},lookAt:function(b,c,d){var e=THREE.Matrix4.__v1,
g=THREE.Matrix4.__v2,f=THREE.Matrix4.__v3;f.sub(b,c).normalize();if(f.length()===0)f.z=1;e.cross(d,f).normalize();e.length()===0&&(f.x+=1.0E-4,e.cross(d,f).normalize());g.cross(f,e).normalize();this.n11=e.x;this.n12=g.x;this.n13=f.x;this.n21=e.y;this.n22=g.y;this.n23=f.y;this.n31=e.z;this.n32=g.z;this.n33=f.z;return this},multiplyVector3:function(b){var c=b.x,d=b.y,e=b.z,g=1/(this.n41*c+this.n42*d+this.n43*e+this.n44);b.x=(this.n11*c+this.n12*d+this.n13*e+this.n14)*g;b.y=(this.n21*c+this.n22*d+this.n23*
e+this.n24)*g;b.z=(this.n31*c+this.n32*d+this.n33*e+this.n34)*g;return b},multiplyVector4:function(b){var c=b.x,d=b.y,e=b.z,g=b.w;b.x=this.n11*c+this.n12*d+this.n13*e+this.n14*g;b.y=this.n21*c+this.n22*d+this.n23*e+this.n24*g;b.z=this.n31*c+this.n32*d+this.n33*e+this.n34*g;b.w=this.n41*c+this.n42*d+this.n43*e+this.n44*g;return b},rotateAxis:function(b){var c=b.x,d=b.y,e=b.z;b.x=c*this.n11+d*this.n12+e*this.n13;b.y=c*this.n21+d*this.n22+e*this.n23;b.z=c*this.n31+d*this.n32+e*this.n33;b.normalize();
return b},crossVector:function(b){var c=new THREE.Vector4;c.x=this.n11*b.x+this.n12*b.y+this.n13*b.z+this.n14*b.w;c.y=this.n21*b.x+this.n22*b.y+this.n23*b.z+this.n24*b.w;c.z=this.n31*b.x+this.n32*b.y+this.n33*b.z+this.n34*b.w;c.w=b.w?this.n41*b.x+this.n42*b.y+this.n43*b.z+this.n44*b.w:1;return c},multiply:function(b,c){var d=b.n11,e=b.n12,g=b.n13,f=b.n14,j=b.n21,k=b.n22,m=b.n23,o=b.n24,p=b.n31,n=b.n32,u=b.n33,t=b.n34,v=b.n41,A=b.n42,B=b.n43,y=b.n44,E=c.n11,x=c.n12,F=c.n13,D=c.n14,z=c.n21,N=c.n22,
H=c.n23,L=c.n24,I=c.n31,W=c.n32,h=c.n33,ca=c.n34;this.n11=d*E+e*z+g*I;this.n12=d*x+e*N+g*W;this.n13=d*F+e*H+g*h;this.n14=d*D+e*L+g*ca+f;this.n21=j*E+k*z+m*I;this.n22=j*x+k*N+m*W;this.n23=j*F+k*H+m*h;this.n24=j*D+k*L+m*ca+o;this.n31=p*E+n*z+u*I;this.n32=p*x+n*N+u*W;this.n33=p*F+n*H+u*h;this.n34=p*D+n*L+u*ca+t;this.n41=v*E+A*z+B*I;this.n42=v*x+A*N+B*W;this.n43=v*F+A*H+B*h;this.n44=v*D+A*L+B*ca+y;return this},multiplyToArray:function(b,c,d){this.multiply(b,c);d[0]=this.n11;d[1]=this.n21;d[2]=this.n31;
d[3]=this.n41;d[4]=this.n12;d[5]=this.n22;d[6]=this.n32;d[7]=this.n42;d[8]=this.n13;d[9]=this.n23;d[10]=this.n33;d[11]=this.n43;d[12]=this.n14;d[13]=this.n24;d[14]=this.n34;d[15]=this.n44;return this},multiplySelf:function(b){this.multiply(this,b);return this},multiplyScalar:function(b){this.n11*=b;this.n12*=b;this.n13*=b;this.n14*=b;this.n21*=b;this.n22*=b;this.n23*=b;this.n24*=b;this.n31*=b;this.n32*=b;this.n33*=b;this.n34*=b;this.n41*=b;this.n42*=b;this.n43*=b;this.n44*=b;return this},determinant:function(){var b=
this.n11,c=this.n12,d=this.n13,e=this.n14,g=this.n21,f=this.n22,j=this.n23,k=this.n24,m=this.n31,o=this.n32,p=this.n33,n=this.n34,u=this.n41,t=this.n42,v=this.n43,A=this.n44;return e*j*o*u-d*k*o*u-e*f*p*u+c*k*p*u+d*f*n*u-c*j*n*u-e*j*m*t+d*k*m*t+e*g*p*t-b*k*p*t-d*g*n*t+b*j*n*t+e*f*m*v-c*k*m*v-e*g*o*v+b*k*o*v+c*g*n*v-b*f*n*v-d*f*m*A+c*j*m*A+d*g*o*A-b*j*o*A-c*g*p*A+b*f*p*A},transpose:function(){var b;b=this.n21;this.n21=this.n12;this.n12=b;b=this.n31;this.n31=this.n13;this.n13=b;b=this.n32;this.n32=
this.n23;this.n23=b;b=this.n41;this.n41=this.n14;this.n14=b;b=this.n42;this.n42=this.n24;this.n24=b;b=this.n43;this.n43=this.n34;this.n43=b;return this},clone:function(){var b=new THREE.Matrix4;b.n11=this.n11;b.n12=this.n12;b.n13=this.n13;b.n14=this.n14;b.n21=this.n21;b.n22=this.n22;b.n23=this.n23;b.n24=this.n24;b.n31=this.n31;b.n32=this.n32;b.n33=this.n33;b.n34=this.n34;b.n41=this.n41;b.n42=this.n42;b.n43=this.n43;b.n44=this.n44;return b},flatten:function(){this.flat[0]=this.n11;this.flat[1]=this.n21;
this.flat[2]=this.n31;this.flat[3]=this.n41;this.flat[4]=this.n12;this.flat[5]=this.n22;this.flat[6]=this.n32;this.flat[7]=this.n42;this.flat[8]=this.n13;this.flat[9]=this.n23;this.flat[10]=this.n33;this.flat[11]=this.n43;this.flat[12]=this.n14;this.flat[13]=this.n24;this.flat[14]=this.n34;this.flat[15]=this.n44;return this.flat},flattenToArray:function(b){b[0]=this.n11;b[1]=this.n21;b[2]=this.n31;b[3]=this.n41;b[4]=this.n12;b[5]=this.n22;b[6]=this.n32;b[7]=this.n42;b[8]=this.n13;b[9]=this.n23;b[10]=
this.n33;b[11]=this.n43;b[12]=this.n14;b[13]=this.n24;b[14]=this.n34;b[15]=this.n44;return b},flattenToArrayOffset:function(b,c){b[c]=this.n11;b[c+1]=this.n21;b[c+2]=this.n31;b[c+3]=this.n41;b[c+4]=this.n12;b[c+5]=this.n22;b[c+6]=this.n32;b[c+7]=this.n42;b[c+8]=this.n13;b[c+9]=this.n23;b[c+10]=this.n33;b[c+11]=this.n43;b[c+12]=this.n14;b[c+13]=this.n24;b[c+14]=this.n34;b[c+15]=this.n44;return b},setTranslation:function(b,c,d){this.set(1,0,0,b,0,1,0,c,0,0,1,d,0,0,0,1);return this},setScale:function(b,
c,d){this.set(b,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1);return this},setRotationX:function(b){var c=Math.cos(b),b=Math.sin(b);this.set(1,0,0,0,0,c,-b,0,0,b,c,0,0,0,0,1);return this},setRotationY:function(b){var c=Math.cos(b),b=Math.sin(b);this.set(c,0,b,0,0,1,0,0,-b,0,c,0,0,0,0,1);return this},setRotationZ:function(b){var c=Math.cos(b),b=Math.sin(b);this.set(c,-b,0,0,b,c,0,0,0,0,1,0,0,0,0,1);return this},setRotationAxis:function(b,c){var d=Math.cos(c),e=Math.sin(c),g=1-d,f=b.x,j=b.y,k=b.z,m=g*f,o=g*j;this.set(m*
f+d,m*j-e*k,m*k+e*j,0,m*j+e*k,o*j+d,o*k-e*f,0,m*k-e*j,o*k+e*f,g*k*k+d,0,0,0,0,1);return this},setPosition:function(b){this.n14=b.x;this.n24=b.y;this.n34=b.z;return this},getPosition:function(){if(!this.position)this.position=new THREE.Vector3;this.position.set(this.n14,this.n24,this.n34);return this.position},getColumnX:function(){if(!this.columnX)this.columnX=new THREE.Vector3;this.columnX.set(this.n11,this.n21,this.n31);return this.columnX},getColumnY:function(){if(!this.columnY)this.columnY=new THREE.Vector3;
this.columnY.set(this.n12,this.n22,this.n32);return this.columnY},getColumnZ:function(){if(!this.columnZ)this.columnZ=new THREE.Vector3;this.columnZ.set(this.n13,this.n23,this.n33);return this.columnZ},setRotationFromEuler:function(b){var c=b.x,d=b.y,e=b.z,b=Math.cos(c),c=Math.sin(c),g=Math.cos(d),d=Math.sin(d),f=Math.cos(e),e=Math.sin(e),j=b*d,k=c*d;this.n11=g*f;this.n12=-g*e;this.n13=d;this.n21=k*f+b*e;this.n22=-k*e+b*f;this.n23=-c*g;this.n31=-j*f+c*e;this.n32=j*e+c*f;this.n33=b*g;return this},
setRotationFromQuaternion:function(b){var c=b.x,d=b.y,e=b.z,g=b.w,f=c+c,j=d+d,k=e+e,b=c*f,m=c*j;c*=k;var o=d*j;d*=k;e*=k;f*=g;j*=g;g*=k;this.n11=1-(o+e);this.n12=m-g;this.n13=c+j;this.n21=m+g;this.n22=1-(b+e);this.n23=d-f;this.n31=c-j;this.n32=d+f;this.n33=1-(b+o);return this},scale:function(b){var c=b.x,d=b.y,b=b.z;this.n11*=c;this.n12*=d;this.n13*=b;this.n21*=c;this.n22*=d;this.n23*=b;this.n31*=c;this.n32*=d;this.n33*=b;this.n41*=c;this.n42*=d;this.n43*=b;return this},extractPosition:function(b){this.n14=
b.n14;this.n24=b.n24;this.n34=b.n34},extractRotation:function(b,c){var d=1/c.x,e=1/c.y,g=1/c.z;this.n11=b.n11*d;this.n21=b.n21*d;this.n31=b.n31*d;this.n12=b.n12*e;this.n22=b.n22*e;this.n32=b.n32*e;this.n13=b.n13*g;this.n23=b.n23*g;this.n33=b.n33*g}};
THREE.Matrix4.makeInvert=function(b,c){var d=b.n11,e=b.n12,g=b.n13,f=b.n14,j=b.n21,k=b.n22,m=b.n23,o=b.n24,p=b.n31,n=b.n32,u=b.n33,t=b.n34,v=b.n41,A=b.n42,B=b.n43,y=b.n44;c===void 0&&(c=new THREE.Matrix4);c.n11=m*t*A-o*u*A+o*n*B-k*t*B-m*n*y+k*u*y;c.n12=f*u*A-g*t*A-f*n*B+e*t*B+g*n*y-e*u*y;c.n13=g*o*A-f*m*A+f*k*B-e*o*B-g*k*y+e*m*y;c.n14=f*m*n-g*o*n-f*k*u+e*o*u+g*k*t-e*m*t;c.n21=o*u*v-m*t*v-o*p*B+j*t*B+m*p*y-j*u*y;c.n22=g*t*v-f*u*v+f*p*B-d*t*B-g*p*y+d*u*y;c.n23=f*m*v-g*o*v-f*j*B+d*o*B+g*j*y-d*m*y;c.n24=
g*o*p-f*m*p+f*j*u-d*o*u-g*j*t+d*m*t;c.n31=k*t*v-o*n*v+o*p*A-j*t*A-k*p*y+j*n*y;c.n32=f*n*v-e*t*v-f*p*A+d*t*A+e*p*y-d*n*y;c.n33=g*o*v-f*k*v+f*j*A-d*o*A-e*j*y+d*k*y;c.n34=f*k*p-e*o*p-f*j*n+d*o*n+e*j*t-d*k*t;c.n41=m*n*v-k*u*v-m*p*A+j*u*A+k*p*B-j*n*B;c.n42=e*u*v-g*n*v+g*p*A-d*u*A-e*p*B+d*n*B;c.n43=g*k*v-e*m*v-g*j*A+d*m*A+e*j*B-d*k*B;c.n44=e*m*p-g*k*p+g*j*n-d*m*n-e*j*u+d*k*u;c.multiplyScalar(1/b.determinant());return c};
THREE.Matrix4.makeInvert3x3=function(b){var c=b.m33,d=c.m,e=b.n33*b.n22-b.n32*b.n23,g=-b.n33*b.n21+b.n31*b.n23,f=b.n32*b.n21-b.n31*b.n22,j=-b.n33*b.n12+b.n32*b.n13,k=b.n33*b.n11-b.n31*b.n13,m=-b.n32*b.n11+b.n31*b.n12,o=b.n23*b.n12-b.n22*b.n13,p=-b.n23*b.n11+b.n21*b.n13,n=b.n22*b.n11-b.n21*b.n12,b=b.n11*e+b.n21*j+b.n31*o;b==0&&console.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible.");b=1/b;d[0]=b*e;d[1]=b*g;d[2]=b*f;d[3]=b*j;d[4]=b*k;d[5]=b*m;d[6]=b*o;d[7]=b*p;d[8]=b*n;return c};
THREE.Matrix4.makeFrustum=function(b,c,d,e,g,f){var j;j=new THREE.Matrix4;j.n11=2*g/(c-b);j.n12=0;j.n13=(c+b)/(c-b);j.n14=0;j.n21=0;j.n22=2*g/(e-d);j.n23=(e+d)/(e-d);j.n24=0;j.n31=0;j.n32=0;j.n33=-(f+g)/(f-g);j.n34=-2*f*g/(f-g);j.n41=0;j.n42=0;j.n43=-1;j.n44=0;return j};THREE.Matrix4.makePerspective=function(b,c,d,e){var g,b=d*Math.tan(b*Math.PI/360);g=-b;return THREE.Matrix4.makeFrustum(g*c,b*c,g,b,d,e)};
THREE.Matrix4.makeOrtho=function(b,c,d,e,g,f){var j,k,m,o;j=new THREE.Matrix4;k=c-b;m=d-e;o=f-g;j.n11=2/k;j.n12=0;j.n13=0;j.n14=-((c+b)/k);j.n21=0;j.n22=2/m;j.n23=0;j.n24=-((d+e)/m);j.n31=0;j.n32=0;j.n33=-2/o;j.n34=-((f+g)/o);j.n41=0;j.n42=0;j.n43=0;j.n44=1;return j};THREE.Matrix4.__v1=new THREE.Vector3;THREE.Matrix4.__v2=new THREE.Vector3;THREE.Matrix4.__v3=new THREE.Vector3;
THREE.Object3D=function(){this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.scale=new THREE.Vector3(1,1,1);this.dynamic=!1;this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixRotationWorld=new THREE.Matrix4;this.matrixWorldNeedsUpdate=this.matrixAutoUpdate=!0;this.quaternion=new THREE.Quaternion;this.useQuaternion=!1;this.boundRadius=0;this.boundRadiusScale=1;
this.visible=!0;this._vector=new THREE.Vector3;this.name=""};
THREE.Object3D.prototype={translate:function(b,c){this.matrix.rotateAxis(c);this.position.addSelf(c.multiplyScalar(b))},translateX:function(b){this.translate(b,this._vector.set(1,0,0))},translateY:function(b){this.translate(b,this._vector.set(0,1,0))},translateZ:function(b){this.translate(b,this._vector.set(0,0,1))},lookAt:function(b){this.matrix.lookAt(b,this.position,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)},addChild:function(b){if(this.children.indexOf(b)===
-1){b.parent!==void 0&&b.parent.removeChild(b);b.parent=this;this.children.push(b);for(var c=this;c.parent!==void 0;)c=c.parent;c!==void 0&&c instanceof THREE.Scene&&c.addChildRecurse(b)}},removeChild:function(b){var c=this.children.indexOf(b);if(c!==-1)b.parent=void 0,this.children.splice(c,1)},getChildByName:function(b,c){var d,e,g;d=0;for(e=this.children.length;d<e;d++){g=this.children[d];if(g.name===b)return g;if(c&&(g=g.getChildByName(b,c),g!==void 0))return g}},updateMatrix:function(){this.matrix.setPosition(this.position);
this.useQuaternion?this.matrix.setRotationFromQuaternion(this.quaternion):this.matrix.setRotationFromEuler(this.rotation);if(this.scale.x!==1||this.scale.y!==1||this.scale.z!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,Math.max(this.scale.y,this.scale.z));this.matrixWorldNeedsUpdate=!0},update:function(b,c,d){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||c)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixRotationWorld.extractRotation(this.matrixWorld,
this.scale),this.matrixWorldNeedsUpdate=!1,c=!0;for(var b=0,e=this.children.length;b<e;b++)this.children[b].update(this.matrixWorld,c,d)}};THREE.Quaternion=function(b,c,d,e){this.set(b||0,c||0,d||0,e!==void 0?e:1)};
THREE.Quaternion.prototype={set:function(b,c,d,e){this.x=b;this.y=c;this.z=d;this.w=e;return this},copy:function(b){this.x=b.x;this.y=b.y;this.z=b.z;this.w=b.w;return this},setFromEuler:function(b){var c=0.5*Math.PI/360,d=b.x*c,e=b.y*c,g=b.z*c,b=Math.cos(e),e=Math.sin(e),c=Math.cos(-g),g=Math.sin(-g),f=Math.cos(d),d=Math.sin(d),j=b*c,k=e*g;this.w=j*f-k*d;this.x=j*d+k*f;this.y=e*c*f+b*g*d;this.z=b*g*f-e*c*d;return this},setFromAxisAngle:function(b,c){var d=c/2,e=Math.sin(d);this.x=b.x*e;this.y=b.y*
e;this.z=b.z*e;this.w=Math.cos(d);return this},calculateW:function(){this.w=-Math.sqrt(Math.abs(1-this.x*this.x-this.y*this.y-this.z*this.z));return this},inverse:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var b=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);b==0?this.w=this.z=this.y=this.x=0:(b=1/b,this.x*=b,this.y*=b,this.z*=b,this.w*=b);return this},
multiplySelf:function(b){var c=this.x,d=this.y,e=this.z,g=this.w,f=b.x,j=b.y,k=b.z,b=b.w;this.x=c*b+g*f+d*k-e*j;this.y=d*b+g*j+e*f-c*k;this.z=e*b+g*k+c*j-d*f;this.w=g*b-c*f-d*j-e*k;return this},multiply:function(b,c){this.x=b.x*c.w+b.y*c.z-b.z*c.y+b.w*c.x;this.y=-b.x*c.z+b.y*c.w+b.z*c.x+b.w*c.y;this.z=b.x*c.y-b.y*c.x+b.z*c.w+b.w*c.z;this.w=-b.x*c.x-b.y*c.y-b.z*c.z+b.w*c.w;return this},multiplyVector3:function(b,c){c||(c=b);var d=b.x,e=b.y,g=b.z,f=this.x,j=this.y,k=this.z,m=this.w,o=m*d+j*g-k*e,p=
m*e+k*d-f*g,n=m*g+f*e-j*d,d=-f*d-j*e-k*g;c.x=o*m+d*-f+p*-k-n*-j;c.y=p*m+d*-j+n*-f-o*-k;c.z=n*m+d*-k+o*-j-p*-f;return c}};
THREE.Quaternion.slerp=function(b,c,d,e){var g=b.w*c.w+b.x*c.x+b.y*c.y+b.z*c.z;if(Math.abs(g)>=1)return d.w=b.w,d.x=b.x,d.y=b.y,d.z=b.z,d;var f=Math.acos(g),j=Math.sqrt(1-g*g);if(Math.abs(j)<0.001)return d.w=0.5*(b.w+c.w),d.x=0.5*(b.x+c.x),d.y=0.5*(b.y+c.y),d.z=0.5*(b.z+c.z),d;g=Math.sin((1-e)*f)/j;e=Math.sin(e*f)/j;d.w=b.w*g+c.w*e;d.x=b.x*g+c.x*e;d.y=b.y*g+c.y*e;d.z=b.z*g+c.z*e;return d};THREE.Vertex=function(b){this.position=b||new THREE.Vector3};
THREE.Face3=function(b,c,d,e,g,f){this.a=b;this.b=c;this.c=d;this.normal=e instanceof THREE.Vector3?e:new THREE.Vector3;this.vertexNormals=e instanceof Array?e:[];this.color=g instanceof THREE.Color?g:new THREE.Color;this.vertexColors=g instanceof Array?g:[];this.vertexTangents=[];this.materials=f instanceof Array?f:[f];this.centroid=new THREE.Vector3};
THREE.Face4=function(b,c,d,e,g,f,j){this.a=b;this.b=c;this.c=d;this.d=e;this.normal=g instanceof THREE.Vector3?g:new THREE.Vector3;this.vertexNormals=g instanceof Array?g:[];this.color=f instanceof THREE.Color?f:new THREE.Color;this.vertexColors=f instanceof Array?f:[];this.vertexTangents=[];this.materials=j instanceof Array?j:[j];this.centroid=new THREE.Vector3};THREE.UV=function(b,c){this.set(b||0,c||0)};
THREE.UV.prototype={set:function(b,c){this.u=b;this.v=c;return this},copy:function(b){this.set(b.u,b.v);return this}};THREE.Geometry=function(){this.id="Geometry"+THREE.GeometryIdCounter++;this.vertices=[];this.colors=[];this.faces=[];this.edges=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.hasTangents=!1};
THREE.Geometry.prototype={computeCentroids:function(){var b,c,d;b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d.centroid.set(0,0,0),d instanceof THREE.Face3?(d.centroid.addSelf(this.vertices[d.a].position),d.centroid.addSelf(this.vertices[d.b].position),d.centroid.addSelf(this.vertices[d.c].position),d.centroid.divideScalar(3)):d instanceof THREE.Face4&&(d.centroid.addSelf(this.vertices[d.a].position),d.centroid.addSelf(this.vertices[d.b].position),d.centroid.addSelf(this.vertices[d.c].position),
d.centroid.addSelf(this.vertices[d.d].position),d.centroid.divideScalar(4))},computeFaceNormals:function(b){var c,d,e,g,f,j,k=new THREE.Vector3,m=new THREE.Vector3;e=0;for(g=this.faces.length;e<g;e++){f=this.faces[e];if(b&&f.vertexNormals.length){k.set(0,0,0);c=0;for(d=f.vertexNormals.length;c<d;c++)k.addSelf(f.vertexNormals[c]);k.divideScalar(3)}else c=this.vertices[f.a],d=this.vertices[f.b],j=this.vertices[f.c],k.sub(j.position,d.position),m.sub(c.position,d.position),k.crossSelf(m);k.isZero()||
k.normalize();f.normal.copy(k)}},computeVertexNormals:function(){var b,c,d,e;if(this.__tmpVertices==void 0){e=this.__tmpVertices=Array(this.vertices.length);b=0;for(c=this.vertices.length;b<c;b++)e[b]=new THREE.Vector3;b=0;for(c=this.faces.length;b<c;b++)if(d=this.faces[b],d instanceof THREE.Face3)d.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];else if(d instanceof THREE.Face4)d.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]}else{e=
this.__tmpVertices;b=0;for(c=this.vertices.length;b<c;b++)e[b].set(0,0,0)}b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?(e[d.a].addSelf(d.normal),e[d.b].addSelf(d.normal),e[d.c].addSelf(d.normal)):d instanceof THREE.Face4&&(e[d.a].addSelf(d.normal),e[d.b].addSelf(d.normal),e[d.c].addSelf(d.normal),e[d.d].addSelf(d.normal));b=0;for(c=this.vertices.length;b<c;b++)e[b].normalize();b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?(d.vertexNormals[0].copy(e[d.a]),
d.vertexNormals[1].copy(e[d.b]),d.vertexNormals[2].copy(e[d.c])):d instanceof THREE.Face4&&(d.vertexNormals[0].copy(e[d.a]),d.vertexNormals[1].copy(e[d.b]),d.vertexNormals[2].copy(e[d.c]),d.vertexNormals[3].copy(e[d.d]))},computeTangents:function(){function b(b,d,c,e,f,g,J){k=b.vertices[d].position;m=b.vertices[c].position;o=b.vertices[e].position;p=j[f];n=j[g];u=j[J];t=m.x-k.x;v=o.x-k.x;A=m.y-k.y;B=o.y-k.y;y=m.z-k.z;E=o.z-k.z;x=n.u-p.u;F=u.u-p.u;D=n.v-p.v;z=u.v-p.v;N=1/(x*z-F*D);W.set((z*t-D*v)*
N,(z*A-D*B)*N,(z*y-D*E)*N);h.set((x*v-F*t)*N,(x*B-F*A)*N,(x*E-F*y)*N);L[d].addSelf(W);L[c].addSelf(W);L[e].addSelf(W);I[d].addSelf(h);I[c].addSelf(h);I[e].addSelf(h)}var c,d,e,g,f,j,k,m,o,p,n,u,t,v,A,B,y,E,x,F,D,z,N,H,L=[],I=[],W=new THREE.Vector3,h=new THREE.Vector3,ca=new THREE.Vector3,O=new THREE.Vector3,V=new THREE.Vector3;c=0;for(d=this.vertices.length;c<d;c++)L[c]=new THREE.Vector3,I[c]=new THREE.Vector3;c=0;for(d=this.faces.length;c<d;c++)f=this.faces[c],j=this.faceVertexUvs[0][c],f instanceof
THREE.Face3?b(this,f.a,f.b,f.c,0,1,2):f instanceof THREE.Face4&&(b(this,f.a,f.b,f.c,0,1,2),b(this,f.a,f.b,f.d,0,1,3));var J=["a","b","c","d"];c=0;for(d=this.faces.length;c<d;c++){f=this.faces[c];for(e=0;e<f.vertexNormals.length;e++)V.copy(f.vertexNormals[e]),g=f[J[e]],H=L[g],ca.copy(H),ca.subSelf(V.multiplyScalar(V.dot(H))).normalize(),O.cross(f.vertexNormals[e],H),g=O.dot(I[g]),g=g<0?-1:1,f.vertexTangents[e]=new THREE.Vector4(ca.x,ca.y,ca.z,g)}this.hasTangents=!0},computeBoundingBox:function(){var b;
if(this.vertices.length>0){this.boundingBox={x:[this.vertices[0].position.x,this.vertices[0].position.x],y:[this.vertices[0].position.y,this.vertices[0].position.y],z:[this.vertices[0].position.z,this.vertices[0].position.z]};for(var c=1,d=this.vertices.length;c<d;c++){b=this.vertices[c];if(b.position.x<this.boundingBox.x[0])this.boundingBox.x[0]=b.position.x;else if(b.position.x>this.boundingBox.x[1])this.boundingBox.x[1]=b.position.x;if(b.position.y<this.boundingBox.y[0])this.boundingBox.y[0]=b.position.y;
else if(b.position.y>this.boundingBox.y[1])this.boundingBox.y[1]=b.position.y;if(b.position.z<this.boundingBox.z[0])this.boundingBox.z[0]=b.position.z;else if(b.position.z>this.boundingBox.z[1])this.boundingBox.z[1]=b.position.z}}},computeBoundingSphere:function(){for(var b=0,c=0,d=this.vertices.length;c<d;c++)b=Math.max(b,this.vertices[c].position.length());this.boundingSphere={radius:b}},computeEdgeFaces:function(){function b(b,d){return Math.min(b,d)+"_"+Math.max(b,d)}function c(b,d,c){b[d]===
void 0?(b[d]={set:{},array:[]},b[d].set[c]=1,b[d].array.push(c)):b[d].set[c]===void 0&&(b[d].set[c]=1,b[d].array.push(c))}var d,e,g,f,j,k={};d=0;for(e=this.faces.length;d<e;d++)j=this.faces[d],j instanceof THREE.Face3?(g=b(j.a,j.b),c(k,g,d),g=b(j.b,j.c),c(k,g,d),g=b(j.a,j.c),c(k,g,d)):j instanceof THREE.Face4&&(g=b(j.b,j.d),c(k,g,d),g=b(j.a,j.b),c(k,g,d),g=b(j.a,j.d),c(k,g,d),g=b(j.b,j.c),c(k,g,d),g=b(j.c,j.d),c(k,g,d));d=0;for(e=this.edges.length;d<e;d++){j=this.edges[d];g=j.vertexIndices[0];f=j.vertexIndices[1];
j.faceIndices=k[b(g,f)].array;for(g=0;g<j.faceIndices.length;g++)f=j.faceIndices[g],j.faces.push(this.faces[f])}}};THREE.GeometryIdCounter=0;
THREE.Spline=function(b){function c(b,d,c,e,f,g,j){b=(c-b)*0.5;e=(e-d)*0.5;return(2*(d-c)+b+e)*j+(-3*(d-c)-2*b-e)*g+b*f+d}this.points=b;var d=[],e={x:0,y:0,z:0},g,f,j,k,m,o,p,n,u;this.initFromArray=function(b){this.points=[];for(var d=0;d<b.length;d++)this.points[d]={x:b[d][0],y:b[d][1],z:b[d][2]}};this.getPoint=function(b){g=(this.points.length-1)*b;f=Math.floor(g);j=g-f;d[0]=f==0?f:f-1;d[1]=f;d[2]=f>this.points.length-2?f:f+1;d[3]=f>this.points.length-3?f:f+2;o=this.points[d[0]];p=this.points[d[1]];
n=this.points[d[2]];u=this.points[d[3]];k=j*j;m=j*k;e.x=c(o.x,p.x,n.x,u.x,j,k,m);e.y=c(o.y,p.y,n.y,u.y,j,k,m);e.z=c(o.z,p.z,n.z,u.z,j,k,m);return e};this.getControlPointsArray=function(){var b,d,c=this.points.length,e=[];for(b=0;b<c;b++)d=this.points[b],e[b]=[d.x,d.y,d.z];return e};this.getLength=function(b){var d,c,e=0,f=new THREE.Vector3,g=new THREE.Vector3,j=[],k=0;j[0]=0;b||(b=100);c=this.points.length*b;f.copy(this.points[0]);for(b=1;b<c;b++)d=b/c,position=this.getPoint(d),g.copy(position),k+=
g.distanceTo(f),f.copy(position),d*=this.points.length-1,d=Math.floor(d),d!=e&&(j[d]=k,e=d);j[j.length]=k;return{chunks:j,total:k}};this.reparametrizeByArcLength=function(b){var d,c,e,f,g,j,k=[],m=new THREE.Vector3,n=this.getLength();k.push(m.copy(this.points[0]).clone());for(d=1;d<this.points.length;d++){c=n.chunks[d]-n.chunks[d-1];j=Math.ceil(b*c/n.total);f=(d-1)/(this.points.length-1);g=d/(this.points.length-1);for(c=1;c<j-1;c++)e=f+c*(1/j)*(g-f),position=this.getPoint(e),k.push(m.copy(position).clone());
k.push(m.copy(this.points[d]).clone())}this.points=k}};THREE.Edge=function(b,c,d,e){this.vertices=[b,c];this.vertexIndices=[d,e];this.faces=[];this.faceIndices=[]};THREE.Camera=function(b,c,d,e,g){THREE.Object3D.call(this);this.fov=b||50;this.aspect=c||1;this.near=d||0.1;this.far=e||2E3;this.target=g||new THREE.Object3D;this.useTarget=!0;this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=null;this.updateProjectionMatrix()};THREE.Camera.prototype=new THREE.Object3D;
THREE.Camera.prototype.constructor=THREE.Camera;THREE.Camera.prototype.supr=THREE.Object3D.prototype;THREE.Camera.prototype.translate=function(b,c){this.matrix.rotateAxis(c);c.multiplyScalar(b);this.position.addSelf(c);this.target.position.addSelf(c)};THREE.Camera.prototype.updateProjectionMatrix=function(){this.projectionMatrix=THREE.Matrix4.makePerspective(this.fov,this.aspect,this.near,this.far)};
THREE.Camera.prototype.update=function(b,c,d){if(this.useTarget)this.matrix.lookAt(this.position,this.target.position,this.up),this.matrix.setPosition(this.position),b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse),c=!0;else if(this.matrixAutoUpdate&&this.updateMatrix(),c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=
!1,c=!0,THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse);for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,c,d)};THREE.Light=function(b){THREE.Object3D.call(this);this.color=new THREE.Color(b)};THREE.Light.prototype=new THREE.Object3D;THREE.Light.prototype.constructor=THREE.Light;THREE.Light.prototype.supr=THREE.Object3D.prototype;THREE.AmbientLight=function(b){THREE.Light.call(this,b)};THREE.AmbientLight.prototype=new THREE.Light;
THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;THREE.DirectionalLight=function(b,c,d,e){THREE.Light.call(this,b);this.position=new THREE.Vector3(0,1,0);this.intensity=c||1;this.distance=d||0;this.castShadow=e!==void 0?e:!1};THREE.DirectionalLight.prototype=new THREE.Light;THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.PointLight=function(b,c,d){THREE.Light.call(this,b);this.position=new THREE.Vector3;this.intensity=c||1;this.distance=d||0};
THREE.PointLight.prototype=new THREE.Light;THREE.PointLight.prototype.constructor=THREE.PointLight;THREE.LensFlare=function(b,c,d,e){THREE.Object3D.call(this);this.positionScreen=new THREE.Vector3;this.lensFlares=[];this.customUpdateCallback=void 0;b!==void 0&&this.add(b,c,d,e)};THREE.LensFlare.prototype=new THREE.Object3D;THREE.LensFlare.prototype.constructor=THREE.LensFlare;THREE.LensFlare.prototype.supr=THREE.Object3D.prototype;
THREE.LensFlare.prototype.add=function(b,c,d,e){c===void 0&&(c=-1);d===void 0&&(d=0);if(e===void 0)e=THREE.BillboardBlending;d=Math.min(d,Math.max(0,d));this.lensFlares.push({texture:b,size:c,distance:d,x:0,y:0,z:0,scale:1,rotation:1,opacity:1,blending:e})};
THREE.LensFlare.prototype.updateLensFlares=function(){var b,c=this.lensFlares.length,d,e=-this.positionScreen.x*2,g=-this.positionScreen.y*2;for(b=0;b<c;b++)d=this.lensFlares[b],d.x=this.positionScreen.x+e*d.distance,d.y=this.positionScreen.y+g*d.distance,d.wantedRotation=d.x*Math.PI*0.25,d.rotation+=(d.wantedRotation-d.rotation)*0.25};
THREE.Material=function(b){this.id=THREE.MaterialCounter.value++;b=b||{};this.opacity=b.opacity!==void 0?b.opacity:1;this.transparent=b.transparent!==void 0?b.transparent:!1;this.blending=b.blending!==void 0?b.blending:THREE.NormalBlending;this.depthTest=b.depthTest!==void 0?b.depthTest:!0};THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NormalBlending=0;THREE.AdditiveBlending=1;THREE.SubtractiveBlending=2;
THREE.MultiplyBlending=3;THREE.AdditiveAlphaBlending=4;THREE.MaterialCounter={value:0};THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.LatitudeReflectionMapping=function(){};THREE.LatitudeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.UVMapping=function(){};
THREE.LineBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.linewidth=b.linewidth!==void 0?b.linewidth:1;this.linecap=b.linecap!==void 0?b.linecap:"round";this.linejoin=b.linejoin!==void 0?b.linejoin:"round";this.vertexColors=b.vertexColors?b.vertexColors:!1};THREE.LineBasicMaterial.prototype=new THREE.Material;THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial;
THREE.MeshBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null;this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!==
void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1};
THREE.MeshBasicMaterial.prototype=new THREE.Material;THREE.MeshBasicMaterial.prototype.constructor=THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null;this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!==
void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1};
THREE.MeshLambertMaterial.prototype=new THREE.Material;THREE.MeshLambertMaterial.prototype.constructor=THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.ambient=b.ambient!==void 0?new THREE.Color(b.ambient):new THREE.Color(328965);this.specular=b.specular!==void 0?new THREE.Color(b.specular):new THREE.Color(1118481);this.shininess=b.shininess!==void 0?b.shininess:30;this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null;
this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!==void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==
void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1};THREE.MeshPhongMaterial.prototype=new THREE.Material;THREE.MeshPhongMaterial.prototype.constructor=THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.shading=b.shading!==void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1};THREE.MeshDepthMaterial.prototype=new THREE.Material;THREE.MeshDepthMaterial.prototype.constructor=THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.shading=b.shading?b.shading:THREE.FlatShading;this.wireframe=b.wireframe?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth?b.wireframeLinewidth:1};THREE.MeshNormalMaterial.prototype=new THREE.Material;THREE.MeshNormalMaterial.prototype.constructor=THREE.MeshNormalMaterial;THREE.MeshFaceMaterial=function(){};
THREE.MeshShaderMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.fragmentShader=b.fragmentShader!==void 0?b.fragmentShader:"void main() {}";this.vertexShader=b.vertexShader!==void 0?b.vertexShader:"void main() {}";this.uniforms=b.uniforms!==void 0?b.uniforms:{};this.attributes=b.attributes;this.shading=b.shading!==void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.fog=
b.fog!==void 0?b.fog:!1;this.lights=b.lights!==void 0?b.lights:!1;this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1};THREE.MeshShaderMaterial.prototype=new THREE.Material;THREE.MeshShaderMaterial.prototype.constructor=THREE.MeshShaderMaterial;
THREE.ShadowVolumeDynamicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.lightMap=b.lightMap!==void 0?b.lightMap:null;this.envMap=b.envMap!==void 0?b.envMap:null;this.combine=b.combine!==void 0?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==void 0?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==void 0?b.refractionRatio:0.98;this.shading=b.shading!==
void 0?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==void 0?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==void 0?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==void 0?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==void 0?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1;this.skinning=b.skinning!==void 0?b.skinning:!1;this.morphTargets=b.morphTargets!==void 0?b.morphTargets:!1};
THREE.ShadowVolumeDynamicMaterial.prototype=new THREE.Material;THREE.ShadowVolumeDynamicMaterial.prototype.constructor=THREE.ShadowVolumeDynamicMaterial;
THREE.ParticleBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==void 0?b.map:null;this.size=b.size!==void 0?b.size:1;this.sizeAttenuation=b.sizeAttenuation!==void 0?b.sizeAttenuation:!0;this.vertexColors=b.vertexColors!==void 0?b.vertexColors:!1};THREE.ParticleBasicMaterial.prototype=new THREE.Material;THREE.ParticleBasicMaterial.prototype.constructor=THREE.ParticleBasicMaterial;
THREE.ParticleCanvasMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.program=b.program!==void 0?b.program:function(){}};THREE.ParticleCanvasMaterial.prototype=new THREE.Material;THREE.ParticleCanvasMaterial.prototype.constructor=THREE.ParticleCanvasMaterial;THREE.ParticleDOMMaterial=function(b){THREE.Material.call(this);this.domElement=b};
THREE.Texture=function(b,c,d,e,g,f){this.image=b;this.mapping=c!==void 0?c:new THREE.UVMapping;this.wrapS=d!==void 0?d:THREE.ClampToEdgeWrapping;this.wrapT=e!==void 0?e:THREE.ClampToEdgeWrapping;this.magFilter=g!==void 0?g:THREE.LinearFilter;this.minFilter=f!==void 0?f:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.needsUpdate=!1};
THREE.Texture.prototype={clone:function(){return new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter)}};THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.RepeatWrapping=0;THREE.ClampToEdgeWrapping=1;THREE.MirroredRepeatWrapping=2;THREE.NearestFilter=3;THREE.NearestMipMapNearestFilter=4;THREE.NearestMipMapLinearFilter=5;THREE.LinearFilter=6;THREE.LinearMipMapNearestFilter=7;THREE.LinearMipMapLinearFilter=8;THREE.ByteType=9;THREE.UnsignedByteType=10;
THREE.ShortType=11;THREE.UnsignedShortType=12;THREE.IntType=13;THREE.UnsignedIntType=14;THREE.FloatType=15;THREE.AlphaFormat=16;THREE.RGBFormat=17;THREE.RGBAFormat=18;THREE.LuminanceFormat=19;THREE.LuminanceAlphaFormat=20;THREE.Particle=function(b){THREE.Object3D.call(this);this.materials=b instanceof Array?b:[b]};THREE.Particle.prototype=new THREE.Object3D;THREE.Particle.prototype.constructor=THREE.Particle;
THREE.ParticleSystem=function(b,c){THREE.Object3D.call(this);this.geometry=b;this.materials=c instanceof Array?c:[c];this.sortParticles=!1};THREE.ParticleSystem.prototype=new THREE.Object3D;THREE.ParticleSystem.prototype.constructor=THREE.ParticleSystem;THREE.Line=function(b,c,d){THREE.Object3D.call(this);this.geometry=b;this.materials=c instanceof Array?c:[c];this.type=d!=void 0?d:THREE.LineStrip};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=new THREE.Object3D;
THREE.Line.prototype.constructor=THREE.Line;
THREE.Mesh=function(b,c){THREE.Object3D.call(this);this.geometry=b;this.materials=c&&c.length?c:[c];this.overdraw=this.doubleSided=this.flipSided=!1;if(this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere(),this.boundRadius=b.boundingSphere.radius,this.geometry.morphTargets.length)){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var d=0;d<this.geometry.morphTargets.length;d++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[d].name]=
d}};THREE.Mesh.prototype=new THREE.Object3D;THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.supr=THREE.Object3D.prototype;THREE.Mesh.prototype.getMorphTargetIndexByName=function(b){if(this.morphTargetDictionary[b]!==void 0)return this.morphTargetDictionary[b];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+b+" does not exist. Returning 0.");return 0};
THREE.Bone=function(b){THREE.Object3D.call(this);this.skin=b;this.skinMatrix=new THREE.Matrix4;this.hasNoneBoneChildren=!1};THREE.Bone.prototype=new THREE.Object3D;THREE.Bone.prototype.constructor=THREE.Bone;THREE.Bone.prototype.supr=THREE.Object3D.prototype;
THREE.Bone.prototype.update=function(b,c,d){this.matrixAutoUpdate&&(c|=this.updateMatrix());if(c||this.matrixWorldNeedsUpdate)b?this.skinMatrix.multiply(b,this.matrix):this.skinMatrix.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;var e,g=this.children.length;if(this.hasNoneBoneChildren){this.matrixWorld.multiply(this.skin.matrixWorld,this.skinMatrix);for(e=0;e<g;e++)b=this.children[e],b instanceof THREE.Bone?b.update(this.skinMatrix,c,d):b.update(this.matrixWorld,!0,d)}else for(e=0;e<g;e++)this.children[e].update(this.skinMatrix,
c,d)};THREE.Bone.prototype.addChild=function(b){if(this.children.indexOf(b)===-1&&(b.parent!==void 0&&b.parent.removeChild(b),b.parent=this,this.children.push(b),!(b instanceof THREE.Bone)))this.hasNoneBoneChildren=!0};
THREE.SkinnedMesh=function(b,c){THREE.Mesh.call(this,b,c);this.identityMatrix=new THREE.Matrix4;this.bones=[];this.boneMatrices=[];var d,e,g,f,j,k;if(this.geometry.bones!==void 0){for(d=0;d<this.geometry.bones.length;d++)g=this.geometry.bones[d],f=g.pos,j=g.rotq,k=g.scl,e=this.addBone(),e.name=g.name,e.position.set(f[0],f[1],f[2]),e.quaternion.set(j[0],j[1],j[2],j[3]),e.useQuaternion=!0,k!==void 0?e.scale.set(k[0],k[1],k[2]):e.scale.set(1,1,1);for(d=0;d<this.bones.length;d++)g=this.geometry.bones[d],
e=this.bones[d],g.parent===-1?this.addChild(e):this.bones[g.parent].addChild(e);this.boneMatrices=new Float32Array(16*this.bones.length);this.pose()}};THREE.SkinnedMesh.prototype=new THREE.Mesh;THREE.SkinnedMesh.prototype.constructor=THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update=function(b,c,d){if(this.visible){this.matrixAutoUpdate&&(c|=this.updateMatrix());if(c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;var e,g=this.children.length;for(e=0;e<g;e++)b=this.children[e],b instanceof THREE.Bone?b.update(this.identityMatrix,!1,d):b.update(this.matrixWorld,c,d);d=this.bones.length;ba=this.bones;bm=this.boneMatrices;for(c=0;c<d;c++)ba[c].skinMatrix.flattenToArrayOffset(bm,
c*16)}};THREE.SkinnedMesh.prototype.addBone=function(b){b===void 0&&(b=new THREE.Bone(this));this.bones.push(b);return b};
THREE.SkinnedMesh.prototype.pose=function(){this.update(void 0,!0);for(var b,c=[],d=0;d<this.bones.length;d++)b=this.bones[d],c.push(THREE.Matrix4.makeInvert(b.skinMatrix)),b.skinMatrix.flattenToArrayOffset(this.boneMatrices,d*16);if(this.geometry.skinVerticesA===void 0){this.geometry.skinVerticesA=[];this.geometry.skinVerticesB=[];var e;for(b=0;b<this.geometry.skinIndices.length;b++){var d=this.geometry.vertices[b].position,g=this.geometry.skinIndices[b].x,f=this.geometry.skinIndices[b].y;e=new THREE.Vector3(d.x,
d.y,d.z);this.geometry.skinVerticesA.push(c[g].multiplyVector3(e));e=new THREE.Vector3(d.x,d.y,d.z);this.geometry.skinVerticesB.push(c[f].multiplyVector3(e));this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y!==1&&(d=(1-(this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y))*0.5,this.geometry.skinWeights[b].x+=d,this.geometry.skinWeights[b].y+=d)}}};
THREE.Ribbon=function(b,c){THREE.Object3D.call(this);this.geometry=b;this.materials=c instanceof Array?c:[c];this.doubleSided=this.flipSided=!1};THREE.Ribbon.prototype=new THREE.Object3D;THREE.Ribbon.prototype.constructor=THREE.Ribbon;
THREE.Sound=function(b,c,d,e){THREE.Object3D.call(this);this.isPlaying=this.isAddedToDOM=this.isLoaded=!1;this.duration=-1;this.radius=c!==void 0?Math.abs(c):100;this.volume=Math.min(1,Math.max(0,d!==void 0?d:1));this.domElement=document.createElement("audio");this.domElement.volume=0;this.domElement.pan=0;this.domElement.loop=e!==void 0?e:!0;this.sources=b instanceof Array?b:[b];for(var g,d=this.sources.length,b=0;b<d;b++)if(c=this.sources[b],c.toLowerCase(),c.indexOf(".mp3")!==-1?g="audio/mpeg":
c.indexOf(".ogg")!==-1?g="audio/ogg":c.indexOf(".wav")!==-1&&(g="audio/wav"),this.domElement.canPlayType(g)){g=document.createElement("source");g.src=this.sources[b];this.domElement.THREESound=this;this.domElement.appendChild(g);this.domElement.addEventListener("canplay",this.onLoad,!0);this.domElement.load();break}};THREE.Sound.prototype=new THREE.Object3D;THREE.Sound.prototype.constructor=THREE.Sound;THREE.Sound.prototype.supr=THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad=function(){var b=this.THREESound;if(!b.isLoaded)this.removeEventListener("canplay",this.onLoad,!0),b.isLoaded=!0,b.duration=this.duration,b.isPlaying&&b.play()};THREE.Sound.prototype.addToDOM=function(b){this.isAddedToDOM=!0;b.appendChild(this.domElement)};THREE.Sound.prototype.play=function(b){this.isPlaying=!0;if(this.isLoaded&&(this.domElement.play(),b))this.domElement.currentTime=b%this.duration};THREE.Sound.prototype.pause=function(){this.isPlaying=!1;this.domElement.pause()};
THREE.Sound.prototype.stop=function(){this.isPlaying=!1;this.domElement.pause();this.domElement.currentTime=0};THREE.Sound.prototype.calculateVolumeAndPan=function(b){b=b.length();this.domElement.volume=b<=this.radius?this.volume*(1-b/this.radius):0};
THREE.Sound.prototype.update=function(b,c,d){this.matrixAutoUpdate&&(this.matrix.setPosition(this.position),c=!0);if(c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;for(var e=this.children.length,b=0;b<e;b++)this.children[b].update(this.matrixWorld,c,d)};THREE.LOD=function(){THREE.Object3D.call(this);this.LODs=[]};THREE.LOD.prototype=new THREE.Object3D;THREE.LOD.prototype.constructor=THREE.LOD;
THREE.LOD.prototype.supr=THREE.Object3D.prototype;THREE.LOD.prototype.add=function(b,c){c===void 0&&(c=0);for(var c=Math.abs(c),d=0;d<this.LODs.length;d++)if(c<this.LODs[d].visibleAtDistance)break;this.LODs.splice(d,0,{visibleAtDistance:c,object3D:b});this.addChild(b)};
THREE.LOD.prototype.update=function(b,c,d){this.matrixAutoUpdate&&(c|=this.updateMatrix());if(c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;if(this.LODs.length>1){b=d.matrixWorldInverse;b=-(b.n31*this.position.x+b.n32*this.position.y+b.n33*this.position.z+b.n34);this.LODs[0].object3D.visible=!0;for(var e=1;e<this.LODs.length;e++)if(b>=this.LODs[e].visibleAtDistance)this.LODs[e-1].object3D.visible=!1,
this.LODs[e].object3D.visible=!0;else break;for(;e<this.LODs.length;e++)this.LODs[e].object3D.visible=!1}for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,c,d)};THREE.ShadowVolume=function(b,c){b instanceof THREE.Mesh?(THREE.Mesh.call(this,b.geometry,c?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]),b.addChild(this)):THREE.Mesh.call(this,b,c?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]);this.calculateShadowVolumeGeometry()};
THREE.ShadowVolume.prototype=new THREE.Mesh;THREE.ShadowVolume.prototype.constructor=THREE.ShadowVolume;THREE.ShadowVolume.prototype.supr=THREE.Mesh.prototype;
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry=function(){if(this.geometry.edges&&this.geometry.edges.length){var b,c,d,e,g,f,j,k,m,o,p,n,u,t,v=new THREE.Geometry;v.vertices=this.geometry.vertices;e=v.faces=this.geometry.faces;var A=v.egdes=this.geometry.edges,B=v.edgeFaces=[];g=0;var y=[];b=0;for(c=e.length;b<c;b++)if(d=e[b],y.push(g),g+=d instanceof THREE.Face3?3:4,d.vertexNormals[0]=d.normal,d.vertexNormals[1]=d.normal,d.vertexNormals[2]=d.normal,d instanceof THREE.Face4)d.vertexNormals[3]=
d.normal;b=0;for(c=A.length;b<c;b++)k=A[b],d=k.faces[0],e=k.faces[1],g=k.faceIndices[0],f=k.faceIndices[1],j=k.vertexIndices[0],k=k.vertexIndices[1],d.a===j?(m="a",p=y[g]+0):d.b===j?(m="b",p=y[g]+1):d.c===j?(m="c",p=y[g]+2):d.d===j&&(m="d",p=y[g]+3),d.a===k?(m+="a",n=y[g]+0):d.b===k?(m+="b",n=y[g]+1):d.c===k?(m+="c",n=y[g]+2):d.d===k&&(m+="d",n=y[g]+3),e.a===j?(o="a",u=y[f]+0):e.b===j?(o="b",u=y[f]+1):e.c===j?(o="c",u=y[f]+2):e.d===j&&(o="d",u=y[f]+3),e.a===k?(o+="a",t=y[f]+0):e.b===k?(o+="b",t=y[f]+
1):e.c===k?(o+="c",t=y[f]+2):e.d===k&&(o+="d",t=y[f]+3),m==="ac"||m==="ad"||m==="ca"||m==="da"?p>n&&(d=p,p=n,n=d):p<n&&(d=p,p=n,n=d),o==="ac"||o==="ad"||o==="ca"||o==="da"?u>t&&(d=u,u=t,t=d):u<t&&(d=u,u=t,t=d),d=new THREE.Face4(p,n,u,t),d.normal.set(1,0,0),B.push(d);this.geometry=v}else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry)};
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo=function(b){this.geometry=new THREE.Geometry;this.geometry.boundingSphere=b.boundingSphere;this.geometry.edgeFaces=[];var c=this.geometry.vertices,d=this.geometry.faces,e=this.geometry.edgeFaces,g=b.faces,b=b.vertices,f=g.length,j,k,m,o,p,n=["a","b","c","d"];for(m=0;m<f;m++){k=c.length;j=g[m];j instanceof THREE.Face4?(o=4,k=new THREE.Face4(k,k+1,k+2,k+3)):(o=3,k=new THREE.Face3(k,k+1,k+2));k.normal.copy(j.normal);d.push(k);
for(k=0;k<o;k++)p=b[j[n[k]]],c.push(new THREE.Vertex(p.position.clone()))}for(f=0;f<g.length-1;f++){b=d[f];for(j=f+1;j<g.length;j++)k=d[j],k=this.facesShareEdge(c,b,k),k!==void 0&&(k=new THREE.Face4(k.indices[0],k.indices[3],k.indices[2],k.indices[1]),k.normal.set(1,0,0),e.push(k))}};
THREE.ShadowVolume.prototype.facesShareEdge=function(b,c,d){var e,g,f,j,k,m,o,p,n,u,t,v,A,B=0,y=["a","b","c","d"];e=c instanceof THREE.Face4?4:3;g=d instanceof THREE.Face4?4:3;for(v=0;v<e;v++){f=c[y[v]];k=b[f];for(A=0;A<g;A++)if(j=d[y[A]],m=b[j],Math.abs(k.position.x-m.position.x)<1.0E-4&&Math.abs(k.position.y-m.position.y)<1.0E-4&&Math.abs(k.position.z-m.position.z)<1.0E-4&&(B++,B===1&&(o=k,p=m,n=f,u=j,t=y[v]),B===2))return t+=y[v],t==="ad"||t==="ac"?{faces:[c,d],vertices:[o,p,m,k],indices:[n,u,
j,f],vertexTypes:[1,2,2,1],extrudable:!0}:{faces:[c,d],vertices:[o,k,m,p],indices:[n,f,j,u],vertexTypes:[1,1,2,2],extrudable:!0}}};
THREE.Sprite=function(b){THREE.Object3D.call(this);if(b.material!==void 0)this.material=b.material,this.map=void 0,this.blending=material.blending;else if(b.map!==void 0)this.map=b.map instanceof THREE.Texture?b.map:ImageUtils.loadTexture(b.map),this.material=void 0,this.blending=b.blending!==void 0?b.blending:THREE.NormalBlending;this.useScreenCoordinates=b.useScreenCoordinates!==void 0?b.useScreenCoordinates:!0;this.mergeWith3D=b.mergeWith3D!==void 0?b.mergeWith3D:!this.useScreenCoordinates;this.affectedByDistance=
b.affectedByDistance!==void 0?b.affectedByDistance:!this.useScreenCoordinates;this.alignment=b.alignment instanceof THREE.Vector2?b.alignment:THREE.SpriteAlignment.center;this.rotation3d=this.rotation;this.rotation=0;this.opacity=1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=new THREE.Vector2(1,1)};THREE.Sprite.prototype=new THREE.Object3D;THREE.Sprite.prototype.constructor=THREE.Sprite;THREE.Sprite.prototype.supr=THREE.Object3D.prototype;
THREE.Sprite.prototype.updateMatrix=function(){this.matrix.setPosition(this.position);this.rotation3d.set(0,0,this.rotation);this.matrix.setRotationFromEuler(this.rotation3d);if(this.scale.x!==1||this.scale.y!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,this.scale.y);this.matrixWorldNeedsUpdate=!0};THREE.SpriteAlignment={};THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1);
THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1);
THREE.Scene=function(){THREE.Object3D.call(this);this.matrixAutoUpdate=!1;this.collisions=this.fog=null;this.objects=[];this.lights=[];this.sounds=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=new THREE.Object3D;THREE.Scene.prototype.constructor=THREE.Scene;THREE.Scene.prototype.supr=THREE.Object3D.prototype;THREE.Scene.prototype.addChild=function(b){this.supr.addChild.call(this,b);this.addChildRecurse(b)};
THREE.Scene.prototype.addChildRecurse=function(b){if(b instanceof THREE.Light)this.lights.indexOf(b)===-1&&this.lights.push(b);else if(b instanceof THREE.Sound)this.sounds.indexOf(b)===-1&&this.sounds.push(b);else if(!(b instanceof THREE.Camera||b instanceof THREE.Bone)&&this.objects.indexOf(b)===-1)this.objects.push(b),this.__objectsAdded.push(b);for(var c=0;c<b.children.length;c++)this.addChildRecurse(b.children[c])};
THREE.Scene.prototype.removeChild=function(b){this.supr.removeChild.call(this,b);this.removeChildRecurse(b)};THREE.Scene.prototype.removeChildRecurse=function(b){if(b instanceof THREE.Light){var c=this.lights.indexOf(b);c!==-1&&this.lights.splice(c,1)}else b instanceof THREE.Sound?(c=this.sounds.indexOf(b),c!==-1&&this.sounds.splice(c,1)):b instanceof THREE.Camera||(c=this.objects.indexOf(b),c!==-1&&(this.objects.splice(c,1),this.__objectsRemoved.push(b)));for(c=0;c<b.children.length;c++)this.removeChildRecurse(b.children[c])};
THREE.Scene.prototype.addObject=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeObject=THREE.Scene.prototype.removeChild;THREE.Scene.prototype.addLight=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeLight=THREE.Scene.prototype.removeChild;THREE.Fog=function(b,c,d){this.color=new THREE.Color(b);this.near=c||1;this.far=d||1E3};THREE.FogExp2=function(b,c){this.color=new THREE.Color(b);this.density=c!==void 0?c:2.5E-4};
THREE.Projector=function(){function b(){var b=k[j]=k[j]||new THREE.RenderableVertex;j++;return b}function c(b,d){return d.z-b.z}var d,e,g=[],f,j,k=[],m,o,p=[],n,u=[],t,v,A=[],B,y,E=[],x=new THREE.Vector4,F=new THREE.Vector4,D=new THREE.Matrix4,z=new THREE.Matrix4,N=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],H=new THREE.Vector4,L=new THREE.Vector4;this.projectVector=function(b,d){D.multiply(d.projectionMatrix,d.matrixWorldInverse);
D.multiplyVector3(b);return b};this.unprojectVector=function(b,d){D.multiply(d.matrixWorld,THREE.Matrix4.makeInvert(d.projectionMatrix));D.multiplyVector3(b);return b};this.projectObjects=function(b,f,h){var f=[],j,k,m;e=0;k=b.objects;b=0;for(j=k.length;b<j;b++){m=k[b];var n;if(!(n=!m.visible))if(n=m instanceof THREE.Mesh){a:{n=void 0;for(var p=m.matrixWorld,o=-m.geometry.boundingSphere.radius*Math.max(m.scale.x,Math.max(m.scale.y,m.scale.z)),t=0;t<6;t++)if(n=N[t].x*p.n14+N[t].y*p.n24+N[t].z*p.n34+
N[t].w,n<=o){n=!1;break a}n=!0}n=!n}if(!n)n=g[e]=g[e]||new THREE.RenderableObject,e++,d=n,x.copy(m.position),D.multiplyVector3(x),d.object=m,d.z=x.z,f.push(d)}h&&f.sort(c);return f};this.projectScene=function(d,e,h){var g=[],x=e.near,V=e.far,J,S,$,aa,P,Y,da,fa,ka,Z,K,ga,X,R,T,ha,Q;y=v=n=o=0;e.matrixAutoUpdate&&e.update(void 0,!0);d.update(void 0,!1,e);D.multiply(e.projectionMatrix,e.matrixWorldInverse);N[0].set(D.n41-D.n11,D.n42-D.n12,D.n43-D.n13,D.n44-D.n14);N[1].set(D.n41+D.n11,D.n42+D.n12,D.n43+
D.n13,D.n44+D.n14);N[2].set(D.n41+D.n21,D.n42+D.n22,D.n43+D.n23,D.n44+D.n24);N[3].set(D.n41-D.n21,D.n42-D.n22,D.n43-D.n23,D.n44-D.n24);N[4].set(D.n41-D.n31,D.n42-D.n32,D.n43-D.n33,D.n44-D.n34);N[5].set(D.n41+D.n31,D.n42+D.n32,D.n43+D.n33,D.n44+D.n34);for(J=0;J<6;J++)ka=N[J],ka.divideScalar(Math.sqrt(ka.x*ka.x+ka.y*ka.y+ka.z*ka.z));ka=this.projectObjects(d,e,!0);d=0;for(J=ka.length;d<J;d++)if(Z=ka[d].object,Z.visible)if(K=Z.matrixWorld,ga=Z.matrixRotationWorld,X=Z.materials,R=Z.overdraw,j=0,Z instanceof
THREE.Mesh){T=Z.geometry;aa=T.vertices;ha=T.faces;T=T.faceVertexUvs;S=0;for($=aa.length;S<$;S++)f=b(),f.positionWorld.copy(aa[S].position),K.multiplyVector3(f.positionWorld),f.positionScreen.copy(f.positionWorld),D.multiplyVector4(f.positionScreen),f.positionScreen.x/=f.positionScreen.w,f.positionScreen.y/=f.positionScreen.w,f.visible=f.positionScreen.z>x&&f.positionScreen.z<V;aa=0;for(S=ha.length;aa<S;aa++){$=ha[aa];if($ instanceof THREE.Face3)if(P=k[$.a],Y=k[$.b],da=k[$.c],P.visible&&Y.visible&&
da.visible&&(Z.doubleSided||Z.flipSided!=(da.positionScreen.x-P.positionScreen.x)*(Y.positionScreen.y-P.positionScreen.y)-(da.positionScreen.y-P.positionScreen.y)*(Y.positionScreen.x-P.positionScreen.x)<0))fa=p[o]=p[o]||new THREE.RenderableFace3,o++,m=fa,m.v1.copy(P),m.v2.copy(Y),m.v3.copy(da);else continue;else if($ instanceof THREE.Face4)if(P=k[$.a],Y=k[$.b],da=k[$.c],fa=k[$.d],P.visible&&Y.visible&&da.visible&&fa.visible&&(Z.doubleSided||Z.flipSided!=((fa.positionScreen.x-P.positionScreen.x)*(Y.positionScreen.y-
P.positionScreen.y)-(fa.positionScreen.y-P.positionScreen.y)*(Y.positionScreen.x-P.positionScreen.x)<0||(Y.positionScreen.x-da.positionScreen.x)*(fa.positionScreen.y-da.positionScreen.y)-(Y.positionScreen.y-da.positionScreen.y)*(fa.positionScreen.x-da.positionScreen.x)<0)))Q=u[n]=u[n]||new THREE.RenderableFace4,n++,m=Q,m.v1.copy(P),m.v2.copy(Y),m.v3.copy(da),m.v4.copy(fa);else continue;m.normalWorld.copy($.normal);ga.multiplyVector3(m.normalWorld);m.centroidWorld.copy($.centroid);K.multiplyVector3(m.centroidWorld);
m.centroidScreen.copy(m.centroidWorld);D.multiplyVector3(m.centroidScreen);da=$.vertexNormals;P=0;for(Y=da.length;P<Y;P++)fa=m.vertexNormalsWorld[P],fa.copy(da[P]),ga.multiplyVector3(fa);P=0;for(Y=T.length;P<Y;P++)if(Q=T[P][aa]){da=0;for(fa=Q.length;da<fa;da++)m.uvs[P][da]=Q[da]}m.meshMaterials=X;m.faceMaterials=$.materials;m.overdraw=R;m.z=m.centroidScreen.z;g.push(m)}}else if(Z instanceof THREE.Line){z.multiply(D,K);aa=Z.geometry.vertices;P=b();P.positionScreen.copy(aa[0].position);z.multiplyVector4(P.positionScreen);
S=1;for($=aa.length;S<$;S++){P=b();P.positionScreen.copy(aa[S].position);z.multiplyVector4(P.positionScreen);Y=k[j-2];H.copy(P.positionScreen);L.copy(Y.positionScreen);K=H;ga=L;X=0;R=1;T=K.z+K.w;ha=ga.z+ga.w;Q=-K.z+K.w;var ma=-ga.z+ga.w;if(T>=0&&ha>=0&&Q>=0&&ma>=0||(T<0&&ha<0||Q<0&&ma<0?0:(T<0?X=Math.max(X,T/(T-ha)):ha<0&&(R=Math.min(R,T/(T-ha))),Q<0?X=Math.max(X,Q/(Q-ma)):ma<0&&(R=Math.min(R,Q/(Q-ma))),R<X?!1:(K.lerpSelf(ga,X),ga.lerpSelf(K,1-R),!0))))H.multiplyScalar(1/H.w),L.multiplyScalar(1/L.w),
K=A[v]=A[v]||new THREE.RenderableLine,v++,t=K,t.v1.positionScreen.copy(H),t.v2.positionScreen.copy(L),t.z=Math.max(H.z,L.z),t.materials=Z.materials,g.push(t)}}else if(Z instanceof THREE.Particle&&(F.set(Z.matrixWorld.n14,Z.matrixWorld.n24,Z.matrixWorld.n34,1),D.multiplyVector4(F),F.z/=F.w,F.z>0&&F.z<1))K=E[y]=E[y]||new THREE.RenderableParticle,y++,B=K,B.x=F.x/F.w,B.y=F.y/F.w,B.z=F.z,B.rotation=Z.rotation.z,B.scale.x=Z.scale.x*Math.abs(B.x-(F.x+e.projectionMatrix.n11)/(F.w+e.projectionMatrix.n14)),
B.scale.y=Z.scale.y*Math.abs(B.y-(F.y+e.projectionMatrix.n22)/(F.w+e.projectionMatrix.n24)),B.materials=Z.materials,g.push(B);h&&g.sort(c);return g}};
THREE.DOMRenderer=function(){THREE.Renderer.call(this);var b=null,c=new THREE.Projector,d,e,g,f;this.domElement=document.createElement("div");this.setSize=function(b,c){d=b;e=c;g=d/2;f=e/2};this.render=function(d,e){var m,o,p,n,u,t,v,A;b=c.projectScene(d,e);m=0;for(o=b.length;m<o;m++)if(u=b[m],u instanceof THREE.RenderableParticle){v=u.x*g+g;A=u.y*f+f;p=0;for(n=u.material.length;p<n;p++)if(t=u.material[p],t instanceof THREE.ParticleDOMMaterial)t=t.domElement,t.style.left=v+"px",t.style.top=A+"px"}}};
THREE.CanvasRenderer=function(b){function c(b){if(y!=b)v.globalAlpha=y=b}function d(b){if(E!=b){switch(b){case THREE.NormalBlending:v.globalCompositeOperation="source-over";break;case THREE.AdditiveBlending:v.globalCompositeOperation="lighter";break;case THREE.SubtractiveBlending:v.globalCompositeOperation="darker"}E=b}}function e(b){if(x!=b.hex)x=b.hex,v.strokeStyle="#"+f(x.toString(16))}function g(b){if(F!=b.hex)F=b.hex,v.fillStyle="#"+f(F.toString(16))}function f(b){for(;b.length<6;)b="0"+b;return b}
var j=this,k=null,m=new THREE.Projector,b=b||{},o=b.canvas!==void 0?b.canvas:document.createElement("canvas"),p,n,u,t,v=o.getContext("2d"),A=new THREE.Color(0),B=0,y=1,E=0,x=null,F=null,D=null,z=null,N=null,H,L,I,W,h=new THREE.RenderableVertex,ca=new THREE.RenderableVertex,O,V,J,S,$,aa,P,Y,da,fa,ka,Z,K=new THREE.Color(0),ga=new THREE.Color(0),X=new THREE.Color(0),R=new THREE.Color(0),T=new THREE.Color(0),ha,Q,ma,ea,ia,ya,va,U,M,wa,qa=new THREE.Rectangle,ja=new THREE.Rectangle,pa=new THREE.Rectangle,
Sa=!1,sa=new THREE.Color,ra=new THREE.Color,Ma=new THREE.Color,Na=new THREE.Color,na=new THREE.Vector3,Ja,Ka,Ta,ta,La,Oa,b=16;Ja=document.createElement("canvas");Ja.width=Ja.height=2;Ka=Ja.getContext("2d");Ka.fillStyle="rgba(0,0,0,1)";Ka.fillRect(0,0,2,2);Ta=Ka.getImageData(0,0,2,2);ta=Ta.data;La=document.createElement("canvas");La.width=La.height=b;Oa=La.getContext("2d");Oa.translate(-b/2,-b/2);Oa.scale(b,b);b--;this.domElement=o;this.sortElements=this.sortObjects=this.autoClear=!0;this.data={vertices:0,
faces:0};this.setSize=function(b,d){p=b;n=d;u=p/2;t=n/2;o.width=p;o.height=n;qa.set(-u,-t,u,t);y=1;E=0;N=z=D=F=x=null};this.setClearColor=function(b,d){A=b;B=d};this.setClearColorHex=function(b,d){A.setHex(b);B=d};this.clear=function(){v.setTransform(1,0,0,-1,u,t);if(!ja.isEmpty())ja.inflate(1),ja.minSelf(qa),A.hex==0&&B==0?v.clearRect(ja.getX(),ja.getY(),ja.getWidth(),ja.getHeight()):(d(THREE.NormalBlending),c(1),v.fillStyle="rgba("+Math.floor(A.r*255)+","+Math.floor(A.g*255)+","+Math.floor(A.b*
255)+","+B+")",v.fillRect(ja.getX(),ja.getY(),ja.getWidth(),ja.getHeight())),ja.empty()};this.render=function(b,f){function n(b){var d,c,h,e=b.lights;ra.setRGB(0,0,0);Ma.setRGB(0,0,0);Na.setRGB(0,0,0);b=0;for(d=e.length;b<d;b++)c=e[b],h=c.color,c instanceof THREE.AmbientLight?(ra.r+=h.r,ra.g+=h.g,ra.b+=h.b):c instanceof THREE.DirectionalLight?(Ma.r+=h.r,Ma.g+=h.g,Ma.b+=h.b):c instanceof THREE.PointLight&&(Na.r+=h.r,Na.g+=h.g,Na.b+=h.b)}function p(b,d,c,h){var e,f,g,j,k=b.lights,b=0;for(e=k.length;b<
e;b++)f=k[b],g=f.color,f instanceof THREE.DirectionalLight?(j=c.dot(f.position),j<=0||(j*=f.intensity,h.r+=g.r*j,h.g+=g.g*j,h.b+=g.b*j)):f instanceof THREE.PointLight&&(j=c.dot(na.sub(f.position,d).normalize()),j<=0||(j*=f.distance==0?1:1-Math.min(d.distanceTo(f.position)/f.distance,1),j!=0&&(j*=f.intensity,h.r+=g.r*j,h.g+=g.g*j,h.b+=g.b*j)))}function o(b,h,f){c(f.opacity);d(f.blending);var j,k,ja,m,n,p;if(f instanceof THREE.ParticleBasicMaterial){if(f.map)m=f.map.image,n=m.width>>1,p=m.height>>1,
f=h.scale.x*u,ja=h.scale.y*t,j=f*n,k=ja*p,pa.set(b.x-j,b.y-k,b.x+j,b.y+k),qa.instersects(pa)&&(v.save(),v.translate(b.x,b.y),v.rotate(-h.rotation),v.scale(f,-ja),v.translate(-n,-p),v.drawImage(m,0,0),v.restore())}else f instanceof THREE.ParticleCanvasMaterial&&(j=h.scale.x*u,k=h.scale.y*t,pa.set(b.x-j,b.y-k,b.x+j,b.y+k),qa.instersects(pa)&&(e(f.color),g(f.color),v.save(),v.translate(b.x,b.y),v.rotate(-h.rotation),v.scale(j,k),f.program(v),v.restore()))}function y(b,h,f,g){c(g.opacity);d(g.blending);
v.beginPath();v.moveTo(b.positionScreen.x,b.positionScreen.y);v.lineTo(h.positionScreen.x,h.positionScreen.y);v.closePath();if(g instanceof THREE.LineBasicMaterial){b=g.linewidth;if(D!=b)v.lineWidth=D=b;b=g.linecap;if(z!=b)v.lineCap=z=b;b=g.linejoin;if(N!=b)v.lineJoin=N=b;e(g.color);v.stroke();pa.inflate(g.linewidth*2)}}function x(b,h,e,g,k,ja,m,n,o){j.data.vertices+=3;j.data.faces++;c(n.opacity);d(n.blending);O=b.positionScreen.x;V=b.positionScreen.y;J=h.positionScreen.x;S=h.positionScreen.y;$=e.positionScreen.x;
aa=e.positionScreen.y;A(O,V,J,S,$,aa);if(n instanceof THREE.MeshBasicMaterial)if(n.map)n.map.mapping instanceof THREE.UVMapping&&(ea=m.uvs[0],w(O,V,J,S,$,aa,n.map.image,ea[g].u,ea[g].v,ea[k].u,ea[k].v,ea[ja].u,ea[ja].v));else if(n.envMap){if(n.envMap.mapping instanceof THREE.SphericalReflectionMapping)b=f.matrixWorldInverse,na.copy(m.vertexNormalsWorld[0]),ia=(na.x*b.n11+na.y*b.n12+na.z*b.n13)*0.5+0.5,ya=-(na.x*b.n21+na.y*b.n22+na.z*b.n23)*0.5+0.5,na.copy(m.vertexNormalsWorld[1]),va=(na.x*b.n11+na.y*
b.n12+na.z*b.n13)*0.5+0.5,U=-(na.x*b.n21+na.y*b.n22+na.z*b.n23)*0.5+0.5,na.copy(m.vertexNormalsWorld[2]),M=(na.x*b.n11+na.y*b.n12+na.z*b.n13)*0.5+0.5,wa=-(na.x*b.n21+na.y*b.n22+na.z*b.n23)*0.5+0.5,w(O,V,J,S,$,aa,n.envMap.image,ia,ya,va,U,M,wa)}else n.wireframe?C(n.color,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):E(n.color);else if(n instanceof THREE.MeshLambertMaterial)n.map&&!n.wireframe&&(n.map.mapping instanceof THREE.UVMapping&&(ea=m.uvs[0],w(O,V,J,S,$,aa,n.map.image,ea[g].u,
ea[g].v,ea[k].u,ea[k].v,ea[ja].u,ea[ja].v)),d(THREE.SubtractiveBlending)),Sa?!n.wireframe&&n.shading==THREE.SmoothShading&&m.vertexNormalsWorld.length==3?(ga.r=X.r=R.r=ra.r,ga.g=X.g=R.g=ra.g,ga.b=X.b=R.b=ra.b,p(o,m.v1.positionWorld,m.vertexNormalsWorld[0],ga),p(o,m.v2.positionWorld,m.vertexNormalsWorld[1],X),p(o,m.v3.positionWorld,m.vertexNormalsWorld[2],R),T.r=(X.r+R.r)*0.5,T.g=(X.g+R.g)*0.5,T.b=(X.b+R.b)*0.5,ma=Pa(ga,X,R,T),w(O,V,J,S,$,aa,ma,0,0,1,0,0,1)):(sa.r=ra.r,sa.g=ra.g,sa.b=ra.b,p(o,m.centroidWorld,
m.normalWorld,sa),K.r=Math.max(0,Math.min(n.color.r*sa.r,1)),K.g=Math.max(0,Math.min(n.color.g*sa.g,1)),K.b=Math.max(0,Math.min(n.color.b*sa.b,1)),K.updateHex(),n.wireframe?C(K,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):E(K)):n.wireframe?C(n.color,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):E(n.color);else if(n instanceof THREE.MeshDepthMaterial)ha=f.near,Q=f.far,ga.r=ga.g=ga.b=1-Ca(b.positionScreen.z,ha,Q),X.r=X.g=X.b=1-Ca(h.positionScreen.z,ha,Q),R.r=R.g=R.b=1-
Ca(e.positionScreen.z,ha,Q),T.r=(X.r+R.r)*0.5,T.g=(X.g+R.g)*0.5,T.b=(X.b+R.b)*0.5,ma=Pa(ga,X,R,T),w(O,V,J,S,$,aa,ma,0,0,1,0,0,1);else if(n instanceof THREE.MeshNormalMaterial)K.r=Ha(m.normalWorld.x),K.g=Ha(m.normalWorld.y),K.b=Ha(m.normalWorld.z),K.updateHex(),n.wireframe?C(K,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):E(K)}function B(b,h,e,g,k,ja,m,n,o){j.data.vertices+=4;j.data.faces++;c(n.opacity);d(n.blending);if(n.map||n.envMap)x(b,h,g,0,1,3,m,n,o),x(k,e,ja,1,2,3,m,n,o);else if(O=
b.positionScreen.x,V=b.positionScreen.y,J=h.positionScreen.x,S=h.positionScreen.y,$=e.positionScreen.x,aa=e.positionScreen.y,P=g.positionScreen.x,Y=g.positionScreen.y,da=k.positionScreen.x,fa=k.positionScreen.y,ka=ja.positionScreen.x,Z=ja.positionScreen.y,n instanceof THREE.MeshBasicMaterial)F(O,V,J,S,$,aa,P,Y),n.wireframe?C(n.color,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):E(n.color);else if(n instanceof THREE.MeshLambertMaterial)Sa?!n.wireframe&&n.shading==THREE.SmoothShading&&
m.vertexNormalsWorld.length==4?(ga.r=X.r=R.r=T.r=ra.r,ga.g=X.g=R.g=T.g=ra.g,ga.b=X.b=R.b=T.b=ra.b,p(o,m.v1.positionWorld,m.vertexNormalsWorld[0],ga),p(o,m.v2.positionWorld,m.vertexNormalsWorld[1],X),p(o,m.v4.positionWorld,m.vertexNormalsWorld[3],R),p(o,m.v3.positionWorld,m.vertexNormalsWorld[2],T),ma=Pa(ga,X,R,T),A(O,V,J,S,P,Y),w(O,V,J,S,P,Y,ma,0,0,1,0,0,1),A(da,fa,$,aa,ka,Z),w(da,fa,$,aa,ka,Z,ma,1,0,1,1,0,1)):(sa.r=ra.r,sa.g=ra.g,sa.b=ra.b,p(o,m.centroidWorld,m.normalWorld,sa),K.r=Math.max(0,Math.min(n.color.r*
sa.r,1)),K.g=Math.max(0,Math.min(n.color.g*sa.g,1)),K.b=Math.max(0,Math.min(n.color.b*sa.b,1)),K.updateHex(),F(O,V,J,S,$,aa,P,Y),n.wireframe?C(K,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):E(K)):(F(O,V,J,S,$,aa,P,Y),n.wireframe?C(n.color,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):E(n.color));else if(n instanceof THREE.MeshNormalMaterial)K.r=Ha(m.normalWorld.x),K.g=Ha(m.normalWorld.y),K.b=Ha(m.normalWorld.z),K.updateHex(),F(O,V,J,S,$,aa,P,Y),n.wireframe?C(K,n.wireframeLinewidth,
n.wireframeLinecap,n.wireframeLinejoin):E(K);else if(n instanceof THREE.MeshDepthMaterial)ha=f.near,Q=f.far,ga.r=ga.g=ga.b=1-Ca(b.positionScreen.z,ha,Q),X.r=X.g=X.b=1-Ca(h.positionScreen.z,ha,Q),R.r=R.g=R.b=1-Ca(g.positionScreen.z,ha,Q),T.r=T.g=T.b=1-Ca(e.positionScreen.z,ha,Q),ma=Pa(ga,X,R,T),A(O,V,J,S,P,Y),w(O,V,J,S,P,Y,ma,0,0,1,0,0,1),A(da,fa,$,aa,ka,Z),w(da,fa,$,aa,ka,Z,ma,1,0,1,1,0,1)}function A(b,d,c,h,e,f){v.beginPath();v.moveTo(b,d);v.lineTo(c,h);v.lineTo(e,f);v.lineTo(b,d);v.closePath()}
function F(b,d,c,h,e,f,g,j){v.beginPath();v.moveTo(b,d);v.lineTo(c,h);v.lineTo(e,f);v.lineTo(g,j);v.lineTo(b,d);v.closePath()}function C(b,d,c,h){if(D!=d)v.lineWidth=D=d;if(z!=c)v.lineCap=z=c;if(N!=h)v.lineJoin=N=h;e(b);v.stroke();pa.inflate(d*2)}function E(b){g(b);v.fill()}function w(b,d,c,h,e,f,g,j,k,n,m,ja,p){var o,t;o=g.width-1;t=g.height-1;j*=o;k*=t;n*=o;m*=t;ja*=o;p*=t;c-=b;h-=d;e-=b;f-=d;n-=j;m-=k;ja-=j;p-=k;o=n*p-ja*m;o!=0&&(t=1/o,o=(p*c-m*e)*t,m=(p*h-m*f)*t,c=(n*e-ja*c)*t,h=(n*f-ja*h)*t,
b=b-o*j-c*k,d=d-m*j-h*k,v.save(),v.transform(o,m,c,h,b,d),v.clip(),v.drawImage(g,0,0),v.restore())}function Pa(b,d,c,h){var e=~~(b.r*255),f=~~(b.g*255),b=~~(b.b*255),g=~~(d.r*255),j=~~(d.g*255),d=~~(d.b*255),k=~~(c.r*255),m=~~(c.g*255),c=~~(c.b*255),n=~~(h.r*255),ja=~~(h.g*255),h=~~(h.b*255);ta[0]=e<0?0:e>255?255:e;ta[1]=f<0?0:f>255?255:f;ta[2]=b<0?0:b>255?255:b;ta[4]=g<0?0:g>255?255:g;ta[5]=j<0?0:j>255?255:j;ta[6]=d<0?0:d>255?255:d;ta[8]=k<0?0:k>255?255:k;ta[9]=m<0?0:m>255?255:m;ta[10]=c<0?0:c>255?
255:c;ta[12]=n<0?0:n>255?255:n;ta[13]=ja<0?0:ja>255?255:ja;ta[14]=h<0?0:h>255?255:h;Ka.putImageData(Ta,0,0);Oa.drawImage(Ja,0,0);return La}function Ca(b,d,c){b=(b-d)/(c-d);return b*b*(3-2*b)}function Ha(b){b=(b+1)*0.5;return b<0?0:b>1?1:b}function za(b,d){var c=d.x-b.x,h=d.y-b.y,e=1/Math.sqrt(c*c+h*h);c*=e;h*=e;d.x+=c;d.y+=h;b.x-=c;b.y-=h}var Qa,Xa,la,ua,Aa,Ia,Ra,G;this.autoClear?this.clear():v.setTransform(1,0,0,-1,u,t);j.data.vertices=0;j.data.faces=0;k=m.projectScene(b,f,this.sortElements);(Sa=
b.lights.length>0)&&n(b);Qa=0;for(Xa=k.length;Qa<Xa;Qa++){la=k[Qa];pa.empty();if(la instanceof THREE.RenderableParticle){H=la;H.x*=u;H.y*=t;ua=0;for(Aa=la.materials.length;ua<Aa;)G=la.materials[ua++],G.opacity!=0&&o(H,la,G,b)}else if(la instanceof THREE.RenderableLine){if(H=la.v1,L=la.v2,H.positionScreen.x*=u,H.positionScreen.y*=t,L.positionScreen.x*=u,L.positionScreen.y*=t,pa.addPoint(H.positionScreen.x,H.positionScreen.y),pa.addPoint(L.positionScreen.x,L.positionScreen.y),qa.instersects(pa)){ua=
0;for(Aa=la.materials.length;ua<Aa;)G=la.materials[ua++],G.opacity!=0&&y(H,L,la,G,b)}}else if(la instanceof THREE.RenderableFace3){if(H=la.v1,L=la.v2,I=la.v3,H.positionScreen.x*=u,H.positionScreen.y*=t,L.positionScreen.x*=u,L.positionScreen.y*=t,I.positionScreen.x*=u,I.positionScreen.y*=t,la.overdraw&&(za(H.positionScreen,L.positionScreen),za(L.positionScreen,I.positionScreen),za(I.positionScreen,H.positionScreen)),pa.add3Points(H.positionScreen.x,H.positionScreen.y,L.positionScreen.x,L.positionScreen.y,
I.positionScreen.x,I.positionScreen.y),qa.instersects(pa)){ua=0;for(Aa=la.meshMaterials.length;ua<Aa;)if(G=la.meshMaterials[ua++],G instanceof THREE.MeshFaceMaterial){Ia=0;for(Ra=la.faceMaterials.length;Ia<Ra;)(G=la.faceMaterials[Ia++])&&G.opacity!=0&&x(H,L,I,0,1,2,la,G,b)}else G.opacity!=0&&x(H,L,I,0,1,2,la,G,b)}}else if(la instanceof THREE.RenderableFace4&&(H=la.v1,L=la.v2,I=la.v3,W=la.v4,H.positionScreen.x*=u,H.positionScreen.y*=t,L.positionScreen.x*=u,L.positionScreen.y*=t,I.positionScreen.x*=
u,I.positionScreen.y*=t,W.positionScreen.x*=u,W.positionScreen.y*=t,h.positionScreen.copy(L.positionScreen),ca.positionScreen.copy(W.positionScreen),la.overdraw&&(za(H.positionScreen,L.positionScreen),za(L.positionScreen,W.positionScreen),za(W.positionScreen,H.positionScreen),za(I.positionScreen,h.positionScreen),za(I.positionScreen,ca.positionScreen)),pa.addPoint(H.positionScreen.x,H.positionScreen.y),pa.addPoint(L.positionScreen.x,L.positionScreen.y),pa.addPoint(I.positionScreen.x,I.positionScreen.y),
pa.addPoint(W.positionScreen.x,W.positionScreen.y),qa.instersects(pa))){ua=0;for(Aa=la.meshMaterials.length;ua<Aa;)if(G=la.meshMaterials[ua++],G instanceof THREE.MeshFaceMaterial){Ia=0;for(Ra=la.faceMaterials.length;Ia<Ra;)(G=la.faceMaterials[Ia++])&&G.opacity!=0&&B(H,L,I,W,h,ca,la,G,b)}else G.opacity!=0&&B(H,L,I,W,h,ca,la,G,b)}ja.addRectangle(pa)}v.setTransform(1,0,0,1,0,0)}};
THREE.SVGRenderer=function(){function b(b,d,c){var h,e,f,g;h=0;for(e=b.lights.length;h<e;h++)f=b.lights[h],f instanceof THREE.DirectionalLight?(g=d.normalWorld.dot(f.position)*f.intensity,g>0&&(c.r+=f.color.r*g,c.g+=f.color.g*g,c.b+=f.color.b*g)):f instanceof THREE.PointLight&&(W.sub(f.position,d.centroidWorld),W.normalize(),g=d.normalWorld.dot(W)*f.intensity,g>0&&(c.r+=f.color.r*g,c.g+=f.color.g*g,c.b+=f.color.b*g))}function c(d,c,h,k,m,n){j.data.vertices+=3;j.data.faces++;O=e(V++);O.setAttribute("d",
"M "+d.positionScreen.x+" "+d.positionScreen.y+" L "+c.positionScreen.x+" "+c.positionScreen.y+" L "+h.positionScreen.x+","+h.positionScreen.y+"z");m instanceof THREE.MeshBasicMaterial?D.hex=m.color.hex:m instanceof THREE.MeshLambertMaterial?F?(z.r=N.r,z.g=N.g,z.b=N.b,b(n,k,z),D.r=Math.max(0,Math.min(m.color.r*z.r,1)),D.g=Math.max(0,Math.min(m.color.g*z.g,1)),D.b=Math.max(0,Math.min(m.color.b*z.b,1)),D.updateHex()):D.hex=m.color.hex:m instanceof THREE.MeshDepthMaterial?(I=1-m.__2near/(m.__farPlusNear-
k.z*m.__farMinusNear),D.setRGB(I,I,I)):m instanceof THREE.MeshNormalMaterial&&D.setRGB(g(k.normalWorld.x),g(k.normalWorld.y),g(k.normalWorld.z));m.wireframe?O.setAttribute("style","fill: none; stroke: #"+f(D.hex.toString(16))+"; stroke-width: "+m.wireframeLinewidth+"; stroke-opacity: "+m.opacity+"; stroke-linecap: "+m.wireframeLinecap+"; stroke-linejoin: "+m.wireframeLinejoin):O.setAttribute("style","fill: #"+f(D.hex.toString(16))+"; fill-opacity: "+m.opacity);o.appendChild(O)}function d(d,c,h,k,
m,n,p){j.data.vertices+=4;j.data.faces++;O=e(V++);O.setAttribute("d","M "+d.positionScreen.x+" "+d.positionScreen.y+" L "+c.positionScreen.x+" "+c.positionScreen.y+" L "+h.positionScreen.x+","+h.positionScreen.y+" L "+k.positionScreen.x+","+k.positionScreen.y+"z");n instanceof THREE.MeshBasicMaterial?D.hex=n.color.hex:n instanceof THREE.MeshLambertMaterial?F?(z.r=N.r,z.g=N.g,z.b=N.b,b(p,m,z),D.r=Math.max(0,Math.min(n.color.r*z.r,1)),D.g=Math.max(0,Math.min(n.color.g*z.g,1)),D.b=Math.max(0,Math.min(n.color.b*
z.b,1)),D.updateHex()):D.hex=n.color.hex:n instanceof THREE.MeshDepthMaterial?(I=1-n.__2near/(n.__farPlusNear-m.z*n.__farMinusNear),D.setRGB(I,I,I)):n instanceof THREE.MeshNormalMaterial&&D.setRGB(g(m.normalWorld.x),g(m.normalWorld.y),g(m.normalWorld.z));n.wireframe?O.setAttribute("style","fill: none; stroke: #"+f(D.hex.toString(16))+"; stroke-width: "+n.wireframeLinewidth+"; stroke-opacity: "+n.opacity+"; stroke-linecap: "+n.wireframeLinecap+"; stroke-linejoin: "+n.wireframeLinejoin):O.setAttribute("style",
"fill: #"+f(D.hex.toString(16))+"; fill-opacity: "+n.opacity);o.appendChild(O)}function e(b){h[b]==null&&(h[b]=document.createElementNS("http://www.w3.org/2000/svg","path"),S==0&&h[b].setAttribute("shape-rendering","crispEdges"));return h[b]}function g(b){b=(b+1)*0.5;return b<0?0:b>1?1:b}function f(b){for(;b.length<6;)b="0"+b;return b}var j=this,k=null,m=new THREE.Projector,o=document.createElementNS("http://www.w3.org/2000/svg","svg"),p,n,u,t,v,A,B,y,E=new THREE.Rectangle,x=new THREE.Rectangle,F=
!1,D=new THREE.Color(16777215),z=new THREE.Color(16777215),N=new THREE.Color(0),H=new THREE.Color(0),L=new THREE.Color(0),I,W=new THREE.Vector3,h=[],ca=[],O,V,J,S=1;this.domElement=o;this.sortElements=this.sortObjects=this.autoClear=!0;this.data={vertices:0,faces:0};this.setQuality=function(b){switch(b){case "high":S=1;break;case "low":S=0}};this.setSize=function(b,d){p=b;n=d;u=p/2;t=n/2;o.setAttribute("viewBox",-u+" "+-t+" "+p+" "+n);o.setAttribute("width",p);o.setAttribute("height",n);E.set(-u,
-t,u,t)};this.clear=function(){for(;o.childNodes.length>0;)o.removeChild(o.childNodes[0])};this.render=function(b,h){var e,g,n,p,D,I,K,z;this.autoClear&&this.clear();j.data.vertices=0;j.data.faces=0;k=m.projectScene(b,h,this.sortElements);J=V=0;if(F=b.lights.length>0){K=b.lights;N.setRGB(0,0,0);H.setRGB(0,0,0);L.setRGB(0,0,0);e=0;for(g=K.length;e<g;e++)n=K[e],p=n.color,n instanceof THREE.AmbientLight?(N.r+=p.r,N.g+=p.g,N.b+=p.b):n instanceof THREE.DirectionalLight?(H.r+=p.r,H.g+=p.g,H.b+=p.b):n instanceof
THREE.PointLight&&(L.r+=p.r,L.g+=p.g,L.b+=p.b)}e=0;for(g=k.length;e<g;e++)if(K=k[e],x.empty(),K instanceof THREE.RenderableParticle){v=K;v.x*=u;v.y*=-t;n=0;for(p=K.materials.length;n<p;)n++}else if(K instanceof THREE.RenderableLine){if(v=K.v1,A=K.v2,v.positionScreen.x*=u,v.positionScreen.y*=-t,A.positionScreen.x*=u,A.positionScreen.y*=-t,x.addPoint(v.positionScreen.x,v.positionScreen.y),x.addPoint(A.positionScreen.x,A.positionScreen.y),E.instersects(x)){n=0;for(p=K.materials.length;n<p;)if((z=K.materials[n++])&&
z.opacity!=0){D=v;I=A;var W=J++;ca[W]==null&&(ca[W]=document.createElementNS("http://www.w3.org/2000/svg","line"),S==0&&ca[W].setAttribute("shape-rendering","crispEdges"));O=ca[W];O.setAttribute("x1",D.positionScreen.x);O.setAttribute("y1",D.positionScreen.y);O.setAttribute("x2",I.positionScreen.x);O.setAttribute("y2",I.positionScreen.y);z instanceof THREE.LineBasicMaterial&&(O.setAttribute("style","fill: none; stroke: ##"+f(z.color.hex.toString(16))+"; stroke-width: "+z.linewidth+"; stroke-opacity: "+
z.opacity+"; stroke-linecap: "+z.linecap+"; stroke-linejoin: "+z.linejoin),o.appendChild(O))}}}else if(K instanceof THREE.RenderableFace3){if(v=K.v1,A=K.v2,B=K.v3,v.positionScreen.x*=u,v.positionScreen.y*=-t,A.positionScreen.x*=u,A.positionScreen.y*=-t,B.positionScreen.x*=u,B.positionScreen.y*=-t,x.addPoint(v.positionScreen.x,v.positionScreen.y),x.addPoint(A.positionScreen.x,A.positionScreen.y),x.addPoint(B.positionScreen.x,B.positionScreen.y),E.instersects(x)){n=0;for(p=K.meshMaterials.length;n<
p;)if(z=K.meshMaterials[n++],z instanceof THREE.MeshFaceMaterial){D=0;for(I=K.faceMaterials.length;D<I;)(z=K.faceMaterials[D++])&&z.opacity!=0&&c(v,A,B,K,z,b)}else z&&z.opacity!=0&&c(v,A,B,K,z,b)}}else if(K instanceof THREE.RenderableFace4&&(v=K.v1,A=K.v2,B=K.v3,y=K.v4,v.positionScreen.x*=u,v.positionScreen.y*=-t,A.positionScreen.x*=u,A.positionScreen.y*=-t,B.positionScreen.x*=u,B.positionScreen.y*=-t,y.positionScreen.x*=u,y.positionScreen.y*=-t,x.addPoint(v.positionScreen.x,v.positionScreen.y),x.addPoint(A.positionScreen.x,
A.positionScreen.y),x.addPoint(B.positionScreen.x,B.positionScreen.y),x.addPoint(y.positionScreen.x,y.positionScreen.y),E.instersects(x))){n=0;for(p=K.meshMaterials.length;n<p;)if(z=K.meshMaterials[n++],z instanceof THREE.MeshFaceMaterial){D=0;for(I=K.faceMaterials.length;D<I;)(z=K.faceMaterials[D++])&&z.opacity!=0&&d(v,A,B,y,K,z,b)}else z&&z.opacity!=0&&d(v,A,B,y,K,z,b)}}};
THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",fog_fragment:"#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
envmap_pars_fragment:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",envmap_fragment:"#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
envmap_vertex:"#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",map_particle_pars_fragment:"#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
map_particle_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",map_pars_fragment:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",map_pars_vertex:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",map_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",map_vertex:"#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",lightmap_fragment:"#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",lights_pars_vertex:"uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
lights_vertex:"if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}",
lights_pars_fragment:"#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",lights_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
color_pars_fragment:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\nvColor = color;\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",skinning_vertex:"#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
default_vertex:"#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"};THREE.UniformsUtils={merge:function(b){var c,d,e,g={};for(c=0;c<b.length;c++)for(d in e=this.clone(b[c]),e)g[d]=e[d];return g},clone:function(b){var c,d,e,g={};for(c in b)for(d in g[c]={},b[c])e=b[c][d],g[c][d]=e instanceof THREE.Color||e instanceof THREE.Vector3||e instanceof THREE.Texture?e.clone():e;return g}};
THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:0,texture:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:2,texture:null},envMap:{type:"t",value:1,texture:null},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},combine:{type:"i",value:0},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",
value:new THREE.Color(16777215)},morphTargetInfluences:{type:"f",value:0}},lights:{enableLighting:{type:"i",value:1},ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",value:1},scale:{type:"f",value:1},
map:{type:"t",value:0,texture:null},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}}};
THREE.ShaderLib={lensFlareVertexTexture:{vertexShader:"uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nuniform\tsampler2D\tocclusionMap;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvarying\tfloat\tvVisibility;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ));\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvarying\tfloat\t\tvVisibility;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}"},
lensFlare:{vertexShader:"uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tsampler2D\tocclusionMap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 )).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}"},
sprite:{vertexShader:"uniform\tint\t\tuseScreenCoordinates;\nuniform    int     affectedByDistance;\nuniform\tvec3\tscreenPosition;\nuniform \tmat4 \tmodelViewMatrix;\nuniform \tmat4 \tprojectionMatrix;\nuniform    float   rotation;\nuniform    vec2    scale;\nuniform    vec2    alignment;\nuniform    vec2    uvOffset;\nuniform\tvec2    uvScale;\nattribute \tvec2 \tposition;\nattribute  vec2\tuv;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}"},shadowPost:{vertexShader:"uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main(void)\n{\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}",fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main( void )\n{\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}"},
shadowVolumeDynamic:{uniforms:{directionalLightDirection:{type:"fv",value:[]}},vertexShader:"uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos      = objectMatrix * vec4( position, 1.0 );\nvec3 norm     = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm )), 0.0 );\ngl_Position   = projectionMatrix * viewMatrix * ( pos + extruded );\n}",fragmentShader:"void main() {\ngl_FragColor = vec4( 1.0 );\n}"},
depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2E3},opacity:{type:"f",value:1}},fragmentShader:"uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"},normal:{uniforms:{opacity:{type:"f",value:1}},
fragmentShader:"uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",vertexShader:"varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}"},basic:{uniforms:THREE.UniformsLib.common,fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,
THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:[THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,
THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.lights]),
fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,
THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["varying vec3 vLightWeighting;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,
THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"vec3 transformedNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk.lights_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.lights,{ambient:{type:"c",value:new THREE.Color(328965)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30}}]),
fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_pars_fragment,"void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );",THREE.ShaderChunk.lights_fragment,THREE.ShaderChunk.map_fragment,
THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,
"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;",THREE.ShaderChunk.lights_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,
THREE.ShaderChunk.default_vertex,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsLib.particle,fragmentShader:["uniform vec3 psColor;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["uniform float size;\nuniform float scale;",
THREE.ShaderChunk.color_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n")}};
THREE.WebGLRenderer=function(b){function c(b,d,c){var e,f,g,j=b.vertices,k=j.length,n=b.colors,m=n.length,p=b.__vertexArray,o=b.__colorArray,t=b.__sortArray,u=b.__dirtyVertices,v=b.__dirtyColors;if(c.sortParticles){K.multiplySelf(c.matrixWorld);for(e=0;e<k;e++)f=j[e].position,R.copy(f),K.multiplyVector3(R),t[e]=[R.z,e];t.sort(function(b,d){return d[0]-b[0]});for(e=0;e<k;e++)f=j[t[e][1]].position,g=e*3,p[g]=f.x,p[g+1]=f.y,p[g+2]=f.z;for(e=0;e<m;e++)g=e*3,color=n[t[e][1]],o[g]=color.r,o[g+1]=color.g,
o[g+2]=color.b}else{if(u)for(e=0;e<k;e++)f=j[e].position,g=e*3,p[g]=f.x,p[g+1]=f.y,p[g+2]=f.z;if(v)for(e=0;e<m;e++)color=n[e],g=e*3,o[g]=color.r,o[g+1]=color.g,o[g+2]=color.b}if(u||c.sortParticles)h.bindBuffer(h.ARRAY_BUFFER,b.__webglVertexBuffer),h.bufferData(h.ARRAY_BUFFER,p,d);if(v||c.sortParticles)h.bindBuffer(h.ARRAY_BUFFER,b.__webglColorBuffer),h.bufferData(h.ARRAY_BUFFER,o,d)}function d(b,d,c,e,f){e.program||W.initMaterial(e,d,c,f);var g=e.program,j=g.uniforms,k=e.uniforms;g!=O&&(h.useProgram(g),
O=g);h.uniformMatrix4fv(j.projectionMatrix,!1,ga);if(c&&(e instanceof THREE.MeshBasicMaterial||e instanceof THREE.MeshLambertMaterial||e instanceof THREE.MeshPhongMaterial||e instanceof THREE.LineBasicMaterial||e instanceof THREE.ParticleBasicMaterial||e.fog))if(k.fogColor.value=c.color,c instanceof THREE.Fog)k.fogNear.value=c.near,k.fogFar.value=c.far;else if(c instanceof THREE.FogExp2)k.fogDensity.value=c.density;if(e instanceof THREE.MeshPhongMaterial||e instanceof THREE.MeshLambertMaterial||e.lights){var n,
m,p=0,o=0,t=0,u,v,y,x,B=T,A=B.directional.colors,F=B.directional.positions,E=B.point.colors,Q=B.point.positions,I=B.point.distances,H=0,C=0,c=m=0;for(n=d.length;c<n;c++)if(m=d[c],u=m.color,v=m.position,y=m.intensity,x=m.distance,m instanceof THREE.AmbientLight)p+=u.r,o+=u.g,t+=u.b;else if(m instanceof THREE.DirectionalLight)x=H*3,A[x]=u.r*y,A[x+1]=u.g*y,A[x+2]=u.b*y,F[x]=v.x,F[x+1]=v.y,F[x+2]=v.z,H+=1;else if(m instanceof THREE.PointLight)m=C*3,E[m]=u.r*y,E[m+1]=u.g*y,E[m+2]=u.b*y,Q[m]=v.x,Q[m+1]=
v.y,Q[m+2]=v.z,I[C]=x,C+=1;for(c=H*3;c<A.length;c++)A[c]=0;for(c=C*3;c<E.length;c++)E[c]=0;B.point.length=C;B.directional.length=H;B.ambient[0]=p;B.ambient[1]=o;B.ambient[2]=t;c=T;k.enableLighting.value=c.directional.length+c.point.length;k.ambientLightColor.value=c.ambient;k.directionalLightColor.value=c.directional.colors;k.directionalLightDirection.value=c.directional.positions;k.pointLightColor.value=c.point.colors;k.pointLightPosition.value=c.point.positions;k.pointLightDistance.value=c.point.distances}if(e instanceof
THREE.MeshBasicMaterial||e instanceof THREE.MeshLambertMaterial||e instanceof THREE.MeshPhongMaterial)k.diffuse.value=e.color,k.opacity.value=e.opacity,(k.map.texture=e.map)&&k.offsetRepeat.value.set(e.map.offset.x,e.map.offset.y,e.map.repeat.x,e.map.repeat.y),k.lightMap.texture=e.lightMap,k.envMap.texture=e.envMap,k.reflectivity.value=e.reflectivity,k.refractionRatio.value=e.refractionRatio,k.combine.value=e.combine,k.useRefract.value=e.envMap&&e.envMap.mapping instanceof THREE.CubeRefractionMapping;
if(e instanceof THREE.LineBasicMaterial)k.diffuse.value=e.color,k.opacity.value=e.opacity;else if(e instanceof THREE.ParticleBasicMaterial)k.psColor.value=e.color,k.opacity.value=e.opacity,k.size.value=e.size,k.scale.value=ha.height/2,k.map.texture=e.map;else if(e instanceof THREE.MeshPhongMaterial)k.ambient.value=e.ambient,k.specular.value=e.specular,k.shininess.value=e.shininess;else if(e instanceof THREE.MeshDepthMaterial)k.mNear.value=b.near,k.mFar.value=b.far,k.opacity.value=e.opacity;else if(e instanceof
THREE.MeshNormalMaterial)k.opacity.value=e.opacity;for(var L in k)if(o=g.uniforms[L])if(n=k[L],p=n.type,c=n.value,p=="i")h.uniform1i(o,c);else if(p=="f")h.uniform1f(o,c);else if(p=="fv1")h.uniform1fv(o,c);else if(p=="fv")h.uniform3fv(o,c);else if(p=="v2")h.uniform2f(o,c.x,c.y);else if(p=="v3")h.uniform3f(o,c.x,c.y,c.z);else if(p=="v4")h.uniform4f(o,c.x,c.y,c.z,c.w);else if(p=="c")h.uniform3f(o,c.r,c.g,c.b);else if(p=="t"&&(h.uniform1i(o,c),n=n.texture))if(n.image instanceof Array&&n.image.length==
6){if(n.image.length==6){if(n.needsUpdate){if(n.__webglInit){h.bindTexture(h.TEXTURE_CUBE_MAP,n.image.__webglTextureCube);for(p=0;p<6;++p)h.texSubImage2D(h.TEXTURE_CUBE_MAP_POSITIVE_X+p,0,0,0,h.RGBA,h.UNSIGNED_BYTE,n.image[p])}else{n.image.__webglTextureCube=h.createTexture();h.bindTexture(h.TEXTURE_CUBE_MAP,n.image.__webglTextureCube);for(p=0;p<6;++p)h.texImage2D(h.TEXTURE_CUBE_MAP_POSITIVE_X+p,0,h.RGBA,h.RGBA,h.UNSIGNED_BYTE,n.image[p]);n.__webglInit=!0}D(h.TEXTURE_CUBE_MAP,n,n.image[0]);h.bindTexture(h.TEXTURE_CUBE_MAP,
null);n.needsUpdate=!1}h.activeTexture(h.TEXTURE0+c);h.bindTexture(h.TEXTURE_CUBE_MAP,n.image.__webglTextureCube)}}else z(n,c);h.uniformMatrix4fv(j.modelViewMatrix,!1,f._modelViewMatrixArray);h.uniformMatrix3fv(j.normalMatrix,!1,f._normalMatrixArray);(e instanceof THREE.MeshShaderMaterial||e instanceof THREE.MeshPhongMaterial||e.envMap)&&j.cameraPosition!==null&&h.uniform3f(j.cameraPosition,b.position.x,b.position.y,b.position.z);(e instanceof THREE.MeshShaderMaterial||e.envMap||e.skinning)&&j.objectMatrix!==
null&&h.uniformMatrix4fv(j.objectMatrix,!1,f._objectMatrixArray);(e instanceof THREE.MeshPhongMaterial||e instanceof THREE.MeshLambertMaterial||e instanceof THREE.MeshShaderMaterial||e.skinning)&&j.viewMatrix!==null&&h.uniformMatrix4fv(j.viewMatrix,!1,X);if(e instanceof THREE.ShadowVolumeDynamicMaterial)b=k.directionalLightDirection.value,b[0]=-d[1].position.x,b[1]=-d[1].position.y,b[2]=-d[1].position.z,h.uniform3fv(j.directionalLightDirection,b),h.uniformMatrix4fv(j.objectMatrix,!1,f._objectMatrixArray),
h.uniformMatrix4fv(j.viewMatrix,!1,X);e.skinning&&(h.uniformMatrix4fv(j.cameraInverseMatrix,!1,X),h.uniformMatrix4fv(j.boneGlobalMatrices,!1,f.boneMatrices));return g}function e(b,c,e,f,g,j){if(f.opacity!=0){var k,b=d(b,c,e,f,j).attributes;if(!f.morphTargets&&b.position>=0)h.bindBuffer(h.ARRAY_BUFFER,g.__webglVertexBuffer),h.vertexAttribPointer(b.position,3,h.FLOAT,!1,0,0);else{c=f.program.attributes;j.morphTargetBase!==-1?(h.bindBuffer(h.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[j.morphTargetBase]),
h.vertexAttribPointer(c.position,3,h.FLOAT,!1,0,0)):c.position>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglVertexBuffer),h.vertexAttribPointer(c.position,3,h.FLOAT,!1,0,0));if(j.morphTargetForcedOrder.length)for(var e=0,n=j.morphTargetForcedOrder,m=j.morphTargetInfluences;e<f.numSupportedMorphTargets&&e<n.length;)h.bindBuffer(h.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[n[e]]),h.vertexAttribPointer(c["morphTarget"+e],3,h.FLOAT,!1,0,0),j.__webglMorphTargetInfluences[e]=m[n[e]],e++;else{var n=[],p=-1,
o=0,m=j.morphTargetInfluences,t,u=m.length,e=0;for(j.morphTargetBase!==-1&&(n[j.morphTargetBase]=!0);e<f.numSupportedMorphTargets;){for(t=0;t<u;t++)!n[t]&&m[t]>p&&(o=t,p=m[o]);h.bindBuffer(h.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[o]);h.vertexAttribPointer(c["morphTarget"+e],3,h.FLOAT,!1,0,0);j.__webglMorphTargetInfluences[e]=p;n[o]=1;p=-1;e++}}f.program.uniforms.morphTargetInfluences!==null&&h.uniform1fv(f.program.uniforms.morphTargetInfluences,j.__webglMorphTargetInfluences)}if(g.__webglCustomAttributes)for(k in g.__webglCustomAttributes)b[k]>=
0&&(c=g.__webglCustomAttributes[k],h.bindBuffer(h.ARRAY_BUFFER,c.buffer),h.vertexAttribPointer(b[k],c.size,h.FLOAT,!1,0,0));b.color>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglColorBuffer),h.vertexAttribPointer(b.color,3,h.FLOAT,!1,0,0));b.normal>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglNormalBuffer),h.vertexAttribPointer(b.normal,3,h.FLOAT,!1,0,0));b.tangent>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglTangentBuffer),h.vertexAttribPointer(b.tangent,4,h.FLOAT,!1,0,0));b.uv>=0&&(g.__webglUVBuffer?(h.bindBuffer(h.ARRAY_BUFFER,
g.__webglUVBuffer),h.vertexAttribPointer(b.uv,2,h.FLOAT,!1,0,0),h.enableVertexAttribArray(b.uv)):h.disableVertexAttribArray(b.uv));b.uv2>=0&&(g.__webglUV2Buffer?(h.bindBuffer(h.ARRAY_BUFFER,g.__webglUV2Buffer),h.vertexAttribPointer(b.uv2,2,h.FLOAT,!1,0,0),h.enableVertexAttribArray(b.uv2)):h.disableVertexAttribArray(b.uv2));f.skinning&&b.skinVertexA>=0&&b.skinVertexB>=0&&b.skinIndex>=0&&b.skinWeight>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinVertexABuffer),h.vertexAttribPointer(b.skinVertexA,4,
h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinVertexBBuffer),h.vertexAttribPointer(b.skinVertexB,4,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinIndicesBuffer),h.vertexAttribPointer(b.skinIndex,4,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinWeightsBuffer),h.vertexAttribPointer(b.skinWeight,4,h.FLOAT,!1,0,0));j instanceof THREE.Mesh?(f.wireframe?(h.lineWidth(f.wireframeLinewidth),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,g.__webglLineBuffer),h.drawElements(h.LINES,g.__webglLineCount,
h.UNSIGNED_SHORT,0)):(h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,g.__webglFaceBuffer),h.drawElements(h.TRIANGLES,g.__webglFaceCount,h.UNSIGNED_SHORT,0)),W.data.vertices+=g.__webglFaceCount,W.data.faces+=g.__webglFaceCount/3,W.data.drawCalls++):j instanceof THREE.Line?(j=j.type==THREE.LineStrip?h.LINE_STRIP:h.LINES,h.lineWidth(f.linewidth),h.drawArrays(j,0,g.__webglLineCount),W.data.drawCalls++):j instanceof THREE.ParticleSystem?(h.drawArrays(h.POINTS,0,g.__webglParticleCount),W.data.drawCalls++):j instanceof
THREE.Ribbon&&(h.drawArrays(h.TRIANGLE_STRIP,0,g.__webglVertexCount),W.data.drawCalls++)}}function g(b,d,c){if(!b.__webglVertexBuffer)b.__webglVertexBuffer=h.createBuffer();if(!b.__webglNormalBuffer)b.__webglNormalBuffer=h.createBuffer();b.hasPos&&(h.bindBuffer(h.ARRAY_BUFFER,b.__webglVertexBuffer),h.bufferData(h.ARRAY_BUFFER,b.positionArray,h.DYNAMIC_DRAW),h.enableVertexAttribArray(d.attributes.position),h.vertexAttribPointer(d.attributes.position,3,h.FLOAT,!1,0,0));if(b.hasNormal){h.bindBuffer(h.ARRAY_BUFFER,
b.__webglNormalBuffer);if(c==THREE.FlatShading){var e,f,g,j,k,n,m,p,o,t,u=b.count*3;for(t=0;t<u;t+=9)c=b.normalArray,e=c[t],f=c[t+1],g=c[t+2],j=c[t+3],n=c[t+4],p=c[t+5],k=c[t+6],m=c[t+7],o=c[t+8],e=(e+j+k)/3,f=(f+n+m)/3,g=(g+p+o)/3,c[t]=e,c[t+1]=f,c[t+2]=g,c[t+3]=e,c[t+4]=f,c[t+5]=g,c[t+6]=e,c[t+7]=f,c[t+8]=g}h.bufferData(h.ARRAY_BUFFER,b.normalArray,h.DYNAMIC_DRAW);h.enableVertexAttribArray(d.attributes.normal);h.vertexAttribPointer(d.attributes.normal,3,h.FLOAT,!1,0,0)}h.drawArrays(h.TRIANGLES,
0,b.count);b.count=0}function f(b){if(S!=b.doubleSided)b.doubleSided?h.disable(h.CULL_FACE):h.enable(h.CULL_FACE),S=b.doubleSided;if($!=b.flipSided)b.flipSided?h.frontFace(h.CW):h.frontFace(h.CCW),$=b.flipSided}function j(b){P!=b&&(b?h.enable(h.DEPTH_TEST):h.disable(h.DEPTH_TEST),P=b)}function k(b){Z[0].set(b.n41-b.n11,b.n42-b.n12,b.n43-b.n13,b.n44-b.n14);Z[1].set(b.n41+b.n11,b.n42+b.n12,b.n43+b.n13,b.n44+b.n14);Z[2].set(b.n41+b.n21,b.n42+b.n22,b.n43+b.n23,b.n44+b.n24);Z[3].set(b.n41-b.n21,b.n42-
b.n22,b.n43-b.n23,b.n44-b.n24);Z[4].set(b.n41-b.n31,b.n42-b.n32,b.n43-b.n33,b.n44-b.n34);Z[5].set(b.n41+b.n31,b.n42+b.n32,b.n43+b.n33,b.n44+b.n34);for(var d,b=0;b<6;b++)d=Z[b],d.divideScalar(Math.sqrt(d.x*d.x+d.y*d.y+d.z*d.z))}function m(b){for(var d=b.matrixWorld,c=-b.geometry.boundingSphere.radius*Math.max(b.scale.x,Math.max(b.scale.y,b.scale.z)),e=0;e<6;e++)if(b=Z[e].x*d.n14+Z[e].y*d.n24+Z[e].z*d.n34+Z[e].w,b<=c)return!1;return!0}function o(b,d){b.list[b.count]=d;b.count+=1}function p(b){var d,
c,e=b.object,h=b.opaque,f=b.transparent;f.count=0;b=h.count=0;for(d=e.materials.length;b<d;b++)c=e.materials[b],c.transparent?o(f,c):o(h,c)}function n(b){var d,c,e,h,f=b.object,g=b.buffer,j=b.opaque,k=b.transparent;k.count=0;b=j.count=0;for(e=f.materials.length;b<e;b++)if(d=f.materials[b],d instanceof THREE.MeshFaceMaterial){d=0;for(c=g.materials.length;d<c;d++)(h=g.materials[d])&&(h.transparent?o(k,h):o(j,h))}else(h=d)&&(h.transparent?o(k,h):o(j,h))}function u(b,d){return d.z-b.z}function t(b){h.enable(h.POLYGON_OFFSET_FILL);
h.polygonOffset(0.1,1);h.enable(h.STENCIL_TEST);h.enable(h.DEPTH_TEST);h.depthMask(!1);h.colorMask(!1,!1,!1,!1);h.stencilFunc(h.ALWAYS,1,255);h.stencilOpSeparate(h.BACK,h.KEEP,h.INCR,h.KEEP);h.stencilOpSeparate(h.FRONT,h.KEEP,h.DECR,h.KEEP);var d,c=b.lights.length,e,f=b.lights,g=[],j,k,n,m,p,o=b.__webglShadowVolumes.length;for(d=0;d<c;d++)if(e=b.lights[d],e instanceof THREE.DirectionalLight&&e.castShadow){g[0]=-e.position.x;g[1]=-e.position.y;g[2]=-e.position.z;for(p=0;p<o;p++)e=b.__webglShadowVolumes[p].object,
j=b.__webglShadowVolumes[p].buffer,k=e.materials[0],k.program||W.initMaterial(k,f,void 0,e),k=k.program,n=k.uniforms,m=k.attributes,O!==k&&(h.useProgram(k),O=k,h.uniformMatrix4fv(n.projectionMatrix,!1,ga),h.uniformMatrix4fv(n.viewMatrix,!1,X),h.uniform3fv(n.directionalLightDirection,g)),e.matrixWorld.flattenToArray(e._objectMatrixArray),h.uniformMatrix4fv(n.objectMatrix,!1,e._objectMatrixArray),h.bindBuffer(h.ARRAY_BUFFER,j.__webglVertexBuffer),h.vertexAttribPointer(m.position,3,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,
j.__webglNormalBuffer),h.vertexAttribPointer(m.normal,3,h.FLOAT,!1,0,0),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,j.__webglFaceBuffer),h.cullFace(h.FRONT),h.drawElements(h.TRIANGLES,j.__webglFaceCount,h.UNSIGNED_SHORT,0),h.cullFace(h.BACK),h.drawElements(h.TRIANGLES,j.__webglFaceCount,h.UNSIGNED_SHORT,0)}h.disable(h.POLYGON_OFFSET_FILL);h.colorMask(!0,!0,!0,!0);h.stencilFunc(h.NOTEQUAL,0,255);h.stencilOp(h.KEEP,h.KEEP,h.KEEP);h.disable(h.DEPTH_TEST);aa=-1;O=U.program;h.useProgram(U.program);h.uniformMatrix4fv(U.projectionLocation,
!1,ga);h.uniform1f(U.darknessLocation,U.darkness);h.bindBuffer(h.ARRAY_BUFFER,U.vertexBuffer);h.vertexAttribPointer(U.vertexLocation,3,h.FLOAT,!1,0,0);h.enableVertexAttribArray(U.vertexLocation);h.blendFunc(h.ONE,h.ONE_MINUS_SRC_ALPHA);h.blendEquation(h.FUNC_ADD);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,U.elementBuffer);h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0);h.disable(h.STENCIL_TEST);h.enable(h.DEPTH_TEST);h.depthMask(J)}function v(b,d){var c,e,f;c=_sprite.attributes;var g=_sprite.uniforms,j=
ka/fa,k,n=[],m=fa*0.5,p=ka*0.5,o=!0;h.useProgram(_sprite.program);O=_sprite.program;aa=-1;qa||(h.enableVertexAttribArray(_sprite.attributes.position),h.enableVertexAttribArray(_sprite.attributes.uv),qa=!0);h.disable(h.CULL_FACE);h.enable(h.BLEND);h.depthMask(!0);h.bindBuffer(h.ARRAY_BUFFER,_sprite.vertexBuffer);h.vertexAttribPointer(c.position,2,h.FLOAT,!1,16,0);h.vertexAttribPointer(c.uv,2,h.FLOAT,!1,16,8);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,_sprite.elementBuffer);h.uniformMatrix4fv(g.projectionMatrix,
!1,ga);h.activeTexture(h.TEXTURE0);h.uniform1i(g.map,0);c=0;for(e=b.__webglSprites.length;c<e;c++)f=b.__webglSprites[c],f.useScreenCoordinates?f.z=-f.position.z:(f._modelViewMatrix.multiplyToArray(d.matrixWorldInverse,f.matrixWorld,f._modelViewMatrixArray),f.z=-f._modelViewMatrix.n34);b.__webglSprites.sort(u);c=0;for(e=b.__webglSprites.length;c<e;c++)f=b.__webglSprites[c],f.material===void 0&&f.map&&f.map.image&&f.map.image.width&&(f.useScreenCoordinates?(h.uniform1i(g.useScreenCoordinates,1),h.uniform3f(g.screenPosition,
(f.position.x-m)/m,(p-f.position.y)/p,Math.max(0,Math.min(1,f.position.z)))):(h.uniform1i(g.useScreenCoordinates,0),h.uniform1i(g.affectedByDistance,f.affectedByDistance?1:0),h.uniformMatrix4fv(g.modelViewMatrix,!1,f._modelViewMatrixArray)),k=f.map.image.width/(f.affectedByDistance?1:ka),n[0]=k*j*f.scale.x,n[1]=k*f.scale.y,h.uniform2f(g.uvScale,f.uvScale.x,f.uvScale.y),h.uniform2f(g.uvOffset,f.uvOffset.x,f.uvOffset.y),h.uniform2f(g.alignment,f.alignment.x,f.alignment.y),h.uniform1f(g.opacity,f.opacity),
h.uniform1f(g.rotation,f.rotation),h.uniform2fv(g.scale,n),f.mergeWith3D&&!o?(h.enable(h.DEPTH_TEST),o=!0):!f.mergeWith3D&&o&&(h.disable(h.DEPTH_TEST),o=!1),F(f.blending),z(f.map,0),h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0));h.enable(h.CULL_FACE);h.enable(h.DEPTH_TEST);h.depthMask(J)}function A(b,d){var c,e,f=b.__webglLensFlares.length,g,j,k,n=new THREE.Vector3,m=ka/fa,p=fa*0.5,o=ka*0.5,t=16/ka,u=[t*m,t],v=[1,1,0],y=[1,1],x=M.uniforms;c=M.attributes;h.useProgram(M.program);O=M.program;aa=-1;
wa||(h.enableVertexAttribArray(M.attributes.vertex),h.enableVertexAttribArray(M.attributes.uv),wa=!0);h.uniform1i(x.occlusionMap,0);h.uniform1i(x.map,1);h.bindBuffer(h.ARRAY_BUFFER,M.vertexBuffer);h.vertexAttribPointer(c.vertex,2,h.FLOAT,!1,16,0);h.vertexAttribPointer(c.uv,2,h.FLOAT,!1,16,8);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,M.elementBuffer);h.disable(h.CULL_FACE);h.depthMask(!1);h.activeTexture(h.TEXTURE0);h.bindTexture(h.TEXTURE_2D,M.occlusionTexture);h.activeTexture(h.TEXTURE1);for(e=0;e<f;e++)if(c=
b.__webglLensFlares[e].object,n.set(c.matrixWorld.n14,c.matrixWorld.n24,c.matrixWorld.n34),d.matrixWorldInverse.multiplyVector3(n),d.projectionMatrix.multiplyVector3(n),v[0]=n.x,v[1]=n.y,v[2]=n.z,y[0]=v[0]*p+p,y[1]=v[1]*o+o,M.hasVertexTexture||y[0]>0&&y[0]<fa&&y[1]>0&&y[1]<ka){h.bindTexture(h.TEXTURE_2D,M.tempTexture);h.copyTexImage2D(h.TEXTURE_2D,0,h.RGB,y[0]-8,y[1]-8,16,16,0);h.uniform1i(x.renderType,0);h.uniform2fv(x.scale,u);h.uniform3fv(x.screenPosition,v);h.disable(h.BLEND);h.enable(h.DEPTH_TEST);
h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0);h.bindTexture(h.TEXTURE_2D,M.occlusionTexture);h.copyTexImage2D(h.TEXTURE_2D,0,h.RGBA,y[0]-8,y[1]-8,16,16,0);h.uniform1i(x.renderType,1);h.disable(h.DEPTH_TEST);h.bindTexture(h.TEXTURE_2D,M.tempTexture);h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0);c.positionScreen.x=v[0];c.positionScreen.y=v[1];c.positionScreen.z=v[2];c.customUpdateCallback?c.customUpdateCallback(c):c.updateLensFlares();h.uniform1i(x.renderType,2);h.enable(h.BLEND);g=0;for(j=c.lensFlares.length;g<
j;g++)if(k=c.lensFlares[g],k.opacity>0.001&&k.scale>0.001)v[0]=k.x,v[1]=k.y,v[2]=k.z,t=k.size*k.scale/ka,u[0]=t*m,u[1]=t,h.uniform3fv(x.screenPosition,v),h.uniform2fv(x.scale,u),h.uniform1f(x.rotation,k.rotation),h.uniform1f(x.opacity,k.opacity),F(k.blending),z(k.texture,1),h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0)}h.enable(h.CULL_FACE);h.enable(h.DEPTH_TEST);h.depthMask(J)}function B(b,d){b._modelViewMatrix.multiplyToArray(d.matrixWorldInverse,b.matrixWorld,b._modelViewMatrixArray);THREE.Matrix4.makeInvert3x3(b._modelViewMatrix).transposeIntoArray(b._normalMatrixArray)}
function y(b){var d,e,f,g,j;if(b instanceof THREE.Mesh){e=b.geometry;for(d in e.geometryGroups){f=e.geometryGroups[d];j=!1;for(g in f.__webglCustomAttributes)if(f.__webglCustomAttributes[g].needsUpdate){j=!0;break}if(e.__dirtyVertices||e.__dirtyMorphTargets||e.__dirtyElements||e.__dirtyUvs||e.__dirtyNormals||e.__dirtyColors||e.__dirtyTangents||j){j=b;var k=h.DYNAMIC_DRAW;if(f.__inittedArrays){var n=void 0,m=void 0,p=void 0,o=void 0,t=void 0,u=void 0,v=void 0,y=void 0,x=void 0,B=void 0,D=void 0,A=
void 0,ha=void 0,F=void 0,E=void 0,Q=void 0,I=void 0,C=void 0,z=void 0,w=void 0,H=void 0,L=p=p=o=void 0,J=0,K=0,ma=0,M=0,ea=0,N=0,P=0,W=0,O=0,G=0,U=0,z=C=0,S=f.__vertexArray,$=f.__uvArray,aa=f.__uv2Array,Z=f.__normalArray,R=f.__tangentArray,X=f.__colorArray,T=f.__skinVertexAArray,ia=f.__skinVertexBArray,V=f.__skinIndexArray,Y=f.__skinWeightArray,ga=f.__morphTargetsArrays,ca=f.__webglCustomAttributes,w=void 0,da=f.__faceArray,fa=f.__lineArray,ka=f.__needsSmoothNormals,B=f.__vertexColorType,x=f.__uvType,
D=f.__normalType,oa=j.geometry,ya=oa.__dirtyVertices,va=oa.__dirtyElements,qa=oa.__dirtyUvs,wa=oa.__dirtyNormals,Ua=oa.__dirtyTangents,Va=oa.__dirtyColors,Wa=oa.__dirtyMorphTargets,Da=oa.vertices,Ya=f.faces,ab=oa.faces,Za=oa.faceVertexUvs[0],$a=oa.faceVertexUvs[1],Ea=oa.skinVerticesA,Fa=oa.skinVerticesB,Ga=oa.skinIndices,xa=oa.skinWeights,Ba=j instanceof THREE.ShadowVolume?oa.edgeFaces:void 0;morphTargets=oa.morphTargets;if(ca)for(L in ca)ca[L].offset=0,ca[L].offsetSrc=0;n=0;for(m=Ya.length;n<m;n++)if(p=
Ya[n],o=ab[p],Za&&(A=Za[p]),$a&&(ha=$a[p]),p=o.vertexNormals,t=o.normal,u=o.vertexColors,v=o.color,y=o.vertexTangents,o instanceof THREE.Face3){if(ya)F=Da[o.a].position,E=Da[o.b].position,Q=Da[o.c].position,S[K]=F.x,S[K+1]=F.y,S[K+2]=F.z,S[K+3]=E.x,S[K+4]=E.y,S[K+5]=E.z,S[K+6]=Q.x,S[K+7]=Q.y,S[K+8]=Q.z,K+=9;if(ca)for(L in ca)if(w=ca[L],w.needsUpdate)C=w.offset,z=w.offsetSrc,w.size===1?(w.boundTo===void 0||w.boundTo==="vertices"?(w.array[C+0]=w.value[o.a],w.array[C+1]=w.value[o.b],w.array[C+2]=w.value[o.c]):
w.boundTo==="faces"?(w.array[C+0]=w.value[z],w.array[C+1]=w.value[z],w.array[C+2]=w.value[z],w.offsetSrc++):w.boundTo==="faceVertices"&&(w.array[C+0]=w.value[z+0],w.array[C+1]=w.value[z+1],w.array[C+2]=w.value[z+2],w.offsetSrc+=3),w.offset+=3):(w.boundTo===void 0||w.boundTo==="vertices"?(F=w.value[o.a],E=w.value[o.b],Q=w.value[o.c]):w.boundTo==="faces"?(F=w.value[z],E=w.value[z],Q=w.value[z],w.offsetSrc++):w.boundTo==="faceVertices"&&(F=w.value[z+0],E=w.value[z+1],Q=w.value[z+2],w.offsetSrc+=3),w.size===
2?(w.array[C+0]=F.x,w.array[C+1]=F.y,w.array[C+2]=E.x,w.array[C+3]=E.y,w.array[C+4]=Q.x,w.array[C+5]=Q.y,w.offset+=6):w.size===3?(w.type==="c"?(w.array[C+0]=F.r,w.array[C+1]=F.g,w.array[C+2]=F.b,w.array[C+3]=E.r,w.array[C+4]=E.g,w.array[C+5]=E.b,w.array[C+6]=Q.r,w.array[C+7]=Q.g,w.array[C+8]=Q.b):(w.array[C+0]=F.x,w.array[C+1]=F.y,w.array[C+2]=F.z,w.array[C+3]=E.x,w.array[C+4]=E.y,w.array[C+5]=E.z,w.array[C+6]=Q.x,w.array[C+7]=Q.y,w.array[C+8]=Q.z),w.offset+=9):(w.array[C+0]=F.x,w.array[C+1]=F.y,
w.array[C+2]=F.z,w.array[C+3]=F.w,w.array[C+4]=E.x,w.array[C+5]=E.y,w.array[C+6]=E.z,w.array[C+7]=E.w,w.array[C+8]=Q.x,w.array[C+9]=Q.y,w.array[C+10]=Q.z,w.array[C+11]=Q.w,w.offset+=12));if(Wa){C=0;for(z=morphTargets.length;C<z;C++)F=morphTargets[C].vertices[o.a].position,E=morphTargets[C].vertices[o.b].position,Q=morphTargets[C].vertices[o.c].position,w=ga[C],w[U+0]=F.x,w[U+1]=F.y,w[U+2]=F.z,w[U+3]=E.x,w[U+4]=E.y,w[U+5]=E.z,w[U+6]=Q.x,w[U+7]=Q.y,w[U+8]=Q.z;U+=9}if(xa.length)C=xa[o.a],z=xa[o.b],w=
xa[o.c],Y[G]=C.x,Y[G+1]=C.y,Y[G+2]=C.z,Y[G+3]=C.w,Y[G+4]=z.x,Y[G+5]=z.y,Y[G+6]=z.z,Y[G+7]=z.w,Y[G+8]=w.x,Y[G+9]=w.y,Y[G+10]=w.z,Y[G+11]=w.w,C=Ga[o.a],z=Ga[o.b],w=Ga[o.c],V[G]=C.x,V[G+1]=C.y,V[G+2]=C.z,V[G+3]=C.w,V[G+4]=z.x,V[G+5]=z.y,V[G+6]=z.z,V[G+7]=z.w,V[G+8]=w.x,V[G+9]=w.y,V[G+10]=w.z,V[G+11]=w.w,C=Ea[o.a],z=Ea[o.b],w=Ea[o.c],T[G]=C.x,T[G+1]=C.y,T[G+2]=C.z,T[G+3]=1,T[G+4]=z.x,T[G+5]=z.y,T[G+6]=z.z,T[G+7]=1,T[G+8]=w.x,T[G+9]=w.y,T[G+10]=w.z,T[G+11]=1,C=Fa[o.a],z=Fa[o.b],w=Fa[o.c],ia[G]=C.x,ia[G+
1]=C.y,ia[G+2]=C.z,ia[G+3]=1,ia[G+4]=z.x,ia[G+5]=z.y,ia[G+6]=z.z,ia[G+7]=1,ia[G+8]=w.x,ia[G+9]=w.y,ia[G+10]=w.z,ia[G+11]=1,G+=12;if(Va&&B)u.length==3&&B==THREE.VertexColors?(o=u[0],C=u[1],z=u[2]):z=C=o=v,X[O]=o.r,X[O+1]=o.g,X[O+2]=o.b,X[O+3]=C.r,X[O+4]=C.g,X[O+5]=C.b,X[O+6]=z.r,X[O+7]=z.g,X[O+8]=z.b,O+=9;if(Ua&&oa.hasTangents)u=y[0],v=y[1],o=y[2],R[P]=u.x,R[P+1]=u.y,R[P+2]=u.z,R[P+3]=u.w,R[P+4]=v.x,R[P+5]=v.y,R[P+6]=v.z,R[P+7]=v.w,R[P+8]=o.x,R[P+9]=o.y,R[P+10]=o.z,R[P+11]=o.w,P+=12;if(wa&&D)if(p.length==
3&&ka)for(y=0;y<3;y++)t=p[y],Z[N]=t.x,Z[N+1]=t.y,Z[N+2]=t.z,N+=3;else for(y=0;y<3;y++)Z[N]=t.x,Z[N+1]=t.y,Z[N+2]=t.z,N+=3;if(qa&&A!==void 0&&x)for(y=0;y<3;y++)p=A[y],$[ma]=p.u,$[ma+1]=p.v,ma+=2;if(qa&&ha!==void 0&&x)for(y=0;y<3;y++)p=ha[y],aa[M]=p.u,aa[M+1]=p.v,M+=2;va&&(da[ea]=J,da[ea+1]=J+1,da[ea+2]=J+2,ea+=3,fa[W]=J,fa[W+1]=J+1,fa[W+2]=J,fa[W+3]=J+2,fa[W+4]=J+1,fa[W+5]=J+2,W+=6,J+=3)}else if(o instanceof THREE.Face4){if(ya)F=Da[o.a].position,E=Da[o.b].position,Q=Da[o.c].position,I=Da[o.d].position,
S[K]=F.x,S[K+1]=F.y,S[K+2]=F.z,S[K+3]=E.x,S[K+4]=E.y,S[K+5]=E.z,S[K+6]=Q.x,S[K+7]=Q.y,S[K+8]=Q.z,S[K+9]=I.x,S[K+10]=I.y,S[K+11]=I.z,K+=12;if(ca)for(L in ca)if(w=ca[L],w.needsUpdate)C=w.offset,z=w.offsetSrc,w.size===1?(w.boundTo===void 0||w.boundTo==="vertices"?(w.array[C+0]=w.value[o.a],w.array[C+1]=w.value[o.b],w.array[C+2]=w.value[o.c],w.array[C+3]=w.value[o.d]):w.boundTo==="faces"?(w.array[C+0]=w.value[z],w.array[C+1]=w.value[z],w.array[C+2]=w.value[z],w.array[C+3]=w.value[z],w.offsetSrc++):w.boundTo===
"faceVertices"&&(w.array[C+0]=w.value[z+0],w.array[C+1]=w.value[z+1],w.array[C+2]=w.value[z+2],w.array[C+3]=w.value[z+3],w.offsetSrc+=4),w.offset+=4):(w.boundTo===void 0||w.boundTo==="vertices"?(F=w.value[o.a],E=w.value[o.b],Q=w.value[o.c],I=w.value[o.d]):w.boundTo==="faces"?(F=w.value[z],E=w.value[z],Q=w.value[z],I=w.value[z],w.offsetSrc++):w.boundTo==="faceVertices"&&(F=w.value[z+0],E=w.value[z+1],Q=w.value[z+2],I=w.value[z+3],w.offsetSrc+=4),w.size===2?(w.array[C+0]=F.x,w.array[C+1]=F.y,w.array[C+
2]=E.x,w.array[C+3]=E.y,w.array[C+4]=Q.x,w.array[C+5]=Q.y,w.array[C+6]=I.x,w.array[C+7]=I.y,w.offset+=8):w.size===3?(w.type==="c"?(w.array[C+0]=F.r,w.array[C+1]=F.g,w.array[C+2]=F.b,w.array[C+3]=E.r,w.array[C+4]=E.g,w.array[C+5]=E.b,w.array[C+6]=Q.r,w.array[C+7]=Q.g,w.array[C+8]=Q.b,w.array[C+9]=I.r,w.array[C+10]=I.g,w.array[C+11]=I.b):(w.array[C+0]=F.x,w.array[C+1]=F.y,w.array[C+2]=F.z,w.array[C+3]=E.x,w.array[C+4]=E.y,w.array[C+5]=E.z,w.array[C+6]=Q.x,w.array[C+7]=Q.y,w.array[C+8]=Q.z,w.array[C+
9]=I.x,w.array[C+10]=I.y,w.array[C+11]=I.z),w.offset+=12):(w.array[C+0]=F.x,w.array[C+1]=F.y,w.array[C+2]=F.z,w.array[C+3]=F.w,w.array[C+4]=E.x,w.array[C+5]=E.y,w.array[C+6]=E.z,w.array[C+7]=E.w,w.array[C+8]=Q.x,w.array[C+9]=Q.y,w.array[C+10]=Q.z,w.array[C+11]=Q.w,w.array[C+12]=I.x,w.array[C+13]=I.y,w.array[C+14]=I.z,w.array[C+15]=I.w,w.offset+=16));if(Wa){C=0;for(z=morphTargets.length;C<z;C++)F=morphTargets[C].vertices[o.a].position,E=morphTargets[C].vertices[o.b].position,Q=morphTargets[C].vertices[o.c].position,
I=morphTargets[C].vertices[o.d].position,w=ga[C],w[U+0]=F.x,w[U+1]=F.y,w[U+2]=F.z,w[U+3]=E.x,w[U+4]=E.y,w[U+5]=E.z,w[U+6]=Q.x,w[U+7]=Q.y,w[U+8]=Q.z,w[U+9]=I.x,w[U+10]=I.y,w[U+11]=I.z;U+=12}if(xa.length)C=xa[o.a],z=xa[o.b],w=xa[o.c],H=xa[o.d],Y[G]=C.x,Y[G+1]=C.y,Y[G+2]=C.z,Y[G+3]=C.w,Y[G+4]=z.x,Y[G+5]=z.y,Y[G+6]=z.z,Y[G+7]=z.w,Y[G+8]=w.x,Y[G+9]=w.y,Y[G+10]=w.z,Y[G+11]=w.w,Y[G+12]=H.x,Y[G+13]=H.y,Y[G+14]=H.z,Y[G+15]=H.w,C=Ga[o.a],z=Ga[o.b],w=Ga[o.c],H=Ga[o.d],V[G]=C.x,V[G+1]=C.y,V[G+2]=C.z,V[G+3]=C.w,
V[G+4]=z.x,V[G+5]=z.y,V[G+6]=z.z,V[G+7]=z.w,V[G+8]=w.x,V[G+9]=w.y,V[G+10]=w.z,V[G+11]=w.w,V[G+12]=H.x,V[G+13]=H.y,V[G+14]=H.z,V[G+15]=H.w,C=Ea[o.a],z=Ea[o.b],w=Ea[o.c],H=Ea[o.d],T[G]=C.x,T[G+1]=C.y,T[G+2]=C.z,T[G+3]=1,T[G+4]=z.x,T[G+5]=z.y,T[G+6]=z.z,T[G+7]=1,T[G+8]=w.x,T[G+9]=w.y,T[G+10]=w.z,T[G+11]=1,T[G+12]=H.x,T[G+13]=H.y,T[G+14]=H.z,T[G+15]=1,C=Fa[o.a],z=Fa[o.b],w=Fa[o.c],o=Fa[o.d],ia[G]=C.x,ia[G+1]=C.y,ia[G+2]=C.z,ia[G+3]=1,ia[G+4]=z.x,ia[G+5]=z.y,ia[G+6]=z.z,ia[G+7]=1,ia[G+8]=w.x,ia[G+9]=w.y,
ia[G+10]=w.z,ia[G+11]=1,ia[G+12]=o.x,ia[G+13]=o.y,ia[G+14]=o.z,ia[G+15]=1,G+=16;if(Va&&B)u.length==4&&B==THREE.VertexColors?(o=u[0],C=u[1],z=u[2],u=u[3]):u=z=C=o=v,X[O]=o.r,X[O+1]=o.g,X[O+2]=o.b,X[O+3]=C.r,X[O+4]=C.g,X[O+5]=C.b,X[O+6]=z.r,X[O+7]=z.g,X[O+8]=z.b,X[O+9]=u.r,X[O+10]=u.g,X[O+11]=u.b,O+=12;if(Ua&&oa.hasTangents)u=y[0],v=y[1],o=y[2],y=y[3],R[P]=u.x,R[P+1]=u.y,R[P+2]=u.z,R[P+3]=u.w,R[P+4]=v.x,R[P+5]=v.y,R[P+6]=v.z,R[P+7]=v.w,R[P+8]=o.x,R[P+9]=o.y,R[P+10]=o.z,R[P+11]=o.w,R[P+12]=y.x,R[P+13]=
y.y,R[P+14]=y.z,R[P+15]=y.w,P+=16;if(wa&&D)if(p.length==4&&ka)for(y=0;y<4;y++)t=p[y],Z[N]=t.x,Z[N+1]=t.y,Z[N+2]=t.z,N+=3;else for(y=0;y<4;y++)Z[N]=t.x,Z[N+1]=t.y,Z[N+2]=t.z,N+=3;if(qa&&A!==void 0&&x)for(y=0;y<4;y++)p=A[y],$[ma]=p.u,$[ma+1]=p.v,ma+=2;if(qa&&ha!==void 0&&x)for(y=0;y<4;y++)p=ha[y],aa[M]=p.u,aa[M+1]=p.v,M+=2;va&&(da[ea]=J,da[ea+1]=J+1,da[ea+2]=J+3,da[ea+3]=J+1,da[ea+4]=J+2,da[ea+5]=J+3,ea+=6,fa[W]=J,fa[W+1]=J+1,fa[W+2]=J,fa[W+3]=J+3,fa[W+4]=J+1,fa[W+5]=J+2,fa[W+6]=J+2,fa[W+7]=J+3,W+=
8,J+=4)}if(Ba){n=0;for(m=Ba.length;n<m;n++)da[ea]=Ba[n].a,da[ea+1]=Ba[n].b,da[ea+2]=Ba[n].c,da[ea+3]=Ba[n].a,da[ea+4]=Ba[n].c,da[ea+5]=Ba[n].d,ea+=6}ya&&(h.bindBuffer(h.ARRAY_BUFFER,f.__webglVertexBuffer),h.bufferData(h.ARRAY_BUFFER,S,k));if(ca)for(L in ca)if(w=ca[L],w.needsUpdate)h.bindBuffer(h.ARRAY_BUFFER,w.buffer),h.bufferData(h.ARRAY_BUFFER,w.array,k),w.needsUpdate=!1;if(Wa){C=0;for(z=morphTargets.length;C<z;C++)h.bindBuffer(h.ARRAY_BUFFER,f.__webglMorphTargetsBuffers[C]),h.bufferData(h.ARRAY_BUFFER,
ga[C],k)}Va&&O>0&&(h.bindBuffer(h.ARRAY_BUFFER,f.__webglColorBuffer),h.bufferData(h.ARRAY_BUFFER,X,k));wa&&(h.bindBuffer(h.ARRAY_BUFFER,f.__webglNormalBuffer),h.bufferData(h.ARRAY_BUFFER,Z,k));Ua&&oa.hasTangents&&(h.bindBuffer(h.ARRAY_BUFFER,f.__webglTangentBuffer),h.bufferData(h.ARRAY_BUFFER,R,k));qa&&ma>0&&(h.bindBuffer(h.ARRAY_BUFFER,f.__webglUVBuffer),h.bufferData(h.ARRAY_BUFFER,$,k));qa&&M>0&&(h.bindBuffer(h.ARRAY_BUFFER,f.__webglUV2Buffer),h.bufferData(h.ARRAY_BUFFER,aa,k));va&&(h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,
f.__webglFaceBuffer),h.bufferData(h.ELEMENT_ARRAY_BUFFER,da,k),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,f.__webglLineBuffer),h.bufferData(h.ELEMENT_ARRAY_BUFFER,fa,k));G>0&&(h.bindBuffer(h.ARRAY_BUFFER,f.__webglSkinVertexABuffer),h.bufferData(h.ARRAY_BUFFER,T,k),h.bindBuffer(h.ARRAY_BUFFER,f.__webglSkinVertexBBuffer),h.bufferData(h.ARRAY_BUFFER,ia,k),h.bindBuffer(h.ARRAY_BUFFER,f.__webglSkinIndicesBuffer),h.bufferData(h.ARRAY_BUFFER,V,k),h.bindBuffer(h.ARRAY_BUFFER,f.__webglSkinWeightsBuffer),h.bufferData(h.ARRAY_BUFFER,
Y,k));j.dynamic||(delete f.__inittedArrays,delete f.__colorArray,delete f.__normalArray,delete f.__tangentArray,delete f.__uvArray,delete f.__uv2Array,delete f.__faceArray,delete f.__vertexArray,delete f.__lineArray,delete f.__skinVertexAArray,delete f.__skinVertexBArray,delete f.__skinIndexArray,delete f.__skinWeightArray)}}}e.__dirtyVertices=!1;e.__dirtyMorphTargets=!1;e.__dirtyElements=!1;e.__dirtyUvs=!1;e.__dirtyNormals=!1;e.__dirtyTangents=!1;e.__dirtyColors=!1}else if(b instanceof THREE.Ribbon){e=
b.geometry;if(e.__dirtyVertices||e.__dirtyColors){b=e;d=h.DYNAMIC_DRAW;x=b.vertices;f=b.colors;B=x.length;j=f.length;D=b.__vertexArray;k=b.__colorArray;A=b.__dirtyColors;if(b.__dirtyVertices){for(n=0;n<B;n++)m=x[n].position,g=n*3,D[g]=m.x,D[g+1]=m.y,D[g+2]=m.z;h.bindBuffer(h.ARRAY_BUFFER,b.__webglVertexBuffer);h.bufferData(h.ARRAY_BUFFER,D,d)}if(A){for(n=0;n<j;n++)color=f[n],g=n*3,k[g]=color.r,k[g+1]=color.g,k[g+2]=color.b;h.bindBuffer(h.ARRAY_BUFFER,b.__webglColorBuffer);h.bufferData(h.ARRAY_BUFFER,
k,d)}}e.__dirtyVertices=!1;e.__dirtyColors=!1}else if(b instanceof THREE.Line){e=b.geometry;if(e.__dirtyVertices||e.__dirtyColors){b=e;d=h.DYNAMIC_DRAW;x=b.vertices;f=b.colors;B=x.length;j=f.length;D=b.__vertexArray;k=b.__colorArray;A=b.__dirtyColors;if(b.__dirtyVertices){for(n=0;n<B;n++)m=x[n].position,g=n*3,D[g]=m.x,D[g+1]=m.y,D[g+2]=m.z;h.bindBuffer(h.ARRAY_BUFFER,b.__webglVertexBuffer);h.bufferData(h.ARRAY_BUFFER,D,d)}if(A){for(n=0;n<j;n++)color=f[n],g=n*3,k[g]=color.r,k[g+1]=color.g,k[g+2]=color.b;
h.bindBuffer(h.ARRAY_BUFFER,b.__webglColorBuffer);h.bufferData(h.ARRAY_BUFFER,k,d)}}e.__dirtyVertices=!1;e.__dirtyColors=!1}else if(b instanceof THREE.ParticleSystem)e=b.geometry,(e.__dirtyVertices||e.__dirtyColors||b.sortParticles)&&c(e,h.DYNAMIC_DRAW,b),e.__dirtyVertices=!1,e.__dirtyColors=!1}function E(b){function d(b){var f=[];c=0;for(e=b.length;c<e;c++)b[c]==void 0?f.push("undefined"):f.push(b[c].id);return f.join("_")}var c,e,f,h,g,j,k,n,m={},o=b.morphTargets!==void 0?b.morphTargets.length:
0;b.geometryGroups={};f=0;for(h=b.faces.length;f<h;f++)g=b.faces[f],j=g.materials,k=d(j),m[k]==void 0&&(m[k]={hash:k,counter:0}),n=m[k].hash+"_"+m[k].counter,b.geometryGroups[n]==void 0&&(b.geometryGroups[n]={faces:[],materials:j,vertices:0,numMorphTargets:o}),g=g instanceof THREE.Face3?3:4,b.geometryGroups[n].vertices+g>65535&&(m[k].counter+=1,n=m[k].hash+"_"+m[k].counter,b.geometryGroups[n]==void 0&&(b.geometryGroups[n]={faces:[],materials:j,vertices:0,numMorphTargets:o})),b.geometryGroups[n].faces.push(f),
b.geometryGroups[n].vertices+=g}function x(b,d,c){b.push({buffer:d,object:c,opaque:{list:[],count:0},transparent:{list:[],count:0}})}function F(b){if(b!=aa){switch(b){case THREE.AdditiveBlending:h.blendEquation(h.FUNC_ADD);h.blendFunc(h.SRC_ALPHA,h.ONE);break;case THREE.SubtractiveBlending:h.blendEquation(h.FUNC_ADD);h.blendFunc(h.ZERO,h.ONE_MINUS_SRC_COLOR);break;case THREE.MultiplyBlending:h.blendEquation(h.FUNC_ADD);h.blendFunc(h.ZERO,h.SRC_COLOR);break;default:h.blendEquationSeparate(h.FUNC_ADD,
h.FUNC_ADD),h.blendFuncSeparate(h.SRC_ALPHA,h.ONE_MINUS_SRC_ALPHA,h.ONE,h.ONE_MINUS_SRC_ALPHA)}aa=b}}function D(b,d,c){(c.width&c.width-1)==0&&(c.height&c.height-1)==0?(h.texParameteri(b,h.TEXTURE_WRAP_S,I(d.wrapS)),h.texParameteri(b,h.TEXTURE_WRAP_T,I(d.wrapT)),h.texParameteri(b,h.TEXTURE_MAG_FILTER,I(d.magFilter)),h.texParameteri(b,h.TEXTURE_MIN_FILTER,I(d.minFilter)),h.generateMipmap(b)):(h.texParameteri(b,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE),h.texParameteri(b,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE),h.texParameteri(b,
h.TEXTURE_MAG_FILTER,L(d.magFilter)),h.texParameteri(b,h.TEXTURE_MIN_FILTER,L(d.minFilter)))}function z(b,d){if(b.needsUpdate){if(b.__webglTexture)b.__webglTexture=h.deleteTexture(b.__webglTexture);b.__webglTexture=h.createTexture();h.bindTexture(h.TEXTURE_2D,b.__webglTexture);h.texImage2D(h.TEXTURE_2D,0,h.RGBA,h.RGBA,h.UNSIGNED_BYTE,b.image);D(h.TEXTURE_2D,b,b.image);h.bindTexture(h.TEXTURE_2D,null);b.needsUpdate=!1}h.activeTexture(h.TEXTURE0+d);h.bindTexture(h.TEXTURE_2D,b.__webglTexture)}function N(b){if(b&&
!b.__webglFramebuffer){if(b.depthBuffer===void 0)b.depthBuffer=!0;if(b.stencilBuffer===void 0)b.stencilBuffer=!0;b.__webglFramebuffer=h.createFramebuffer();b.__webglRenderbuffer=h.createRenderbuffer();b.__webglTexture=h.createTexture();h.bindTexture(h.TEXTURE_2D,b.__webglTexture);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,I(b.wrapS));h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,I(b.wrapT));h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,I(b.magFilter));h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,
I(b.minFilter));h.texImage2D(h.TEXTURE_2D,0,I(b.format),b.width,b.height,0,I(b.format),I(b.type),null);h.bindRenderbuffer(h.RENDERBUFFER,b.__webglRenderbuffer);h.bindFramebuffer(h.FRAMEBUFFER,b.__webglFramebuffer);h.framebufferTexture2D(h.FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,b.__webglTexture,0);b.depthBuffer&&!b.stencilBuffer?(h.renderbufferStorage(h.RENDERBUFFER,h.DEPTH_COMPONENT16,b.width,b.height),h.framebufferRenderbuffer(h.FRAMEBUFFER,h.DEPTH_ATTACHMENT,h.RENDERBUFFER,b.__webglRenderbuffer)):
b.depthBuffer&&b.stencilBuffer?(h.renderbufferStorage(h.RENDERBUFFER,h.DEPTH_STENCIL,b.width,b.height),h.framebufferRenderbuffer(h.FRAMEBUFFER,h.DEPTH_STENCIL_ATTACHMENT,h.RENDERBUFFER,b.__webglRenderbuffer)):h.renderbufferStorage(h.RENDERBUFFER,h.RGBA4,b.width,b.height);h.bindTexture(h.TEXTURE_2D,null);h.bindRenderbuffer(h.RENDERBUFFER,null);h.bindFramebuffer(h.FRAMEBUFFER,null)}var d,c;b?(d=b.__webglFramebuffer,c=b.width,b=b.height):(d=null,c=fa,b=ka);d!=V&&(h.bindFramebuffer(h.FRAMEBUFFER,d),h.viewport(Y,
da,c,b),V=d)}function H(b,d){var c;b=="fragment"?c=h.createShader(h.FRAGMENT_SHADER):b=="vertex"&&(c=h.createShader(h.VERTEX_SHADER));h.shaderSource(c,d);h.compileShader(c);if(!h.getShaderParameter(c,h.COMPILE_STATUS))return console.error(h.getShaderInfoLog(c)),console.error(d),null;return c}function L(b){switch(b){case THREE.NearestFilter:case THREE.NearestMipMapNearestFilter:case THREE.NearestMipMapLinearFilter:return h.NEAREST;default:return h.LINEAR}}function I(b){switch(b){case THREE.RepeatWrapping:return h.REPEAT;
case THREE.ClampToEdgeWrapping:return h.CLAMP_TO_EDGE;case THREE.MirroredRepeatWrapping:return h.MIRRORED_REPEAT;case THREE.NearestFilter:return h.NEAREST;case THREE.NearestMipMapNearestFilter:return h.NEAREST_MIPMAP_NEAREST;case THREE.NearestMipMapLinearFilter:return h.NEAREST_MIPMAP_LINEAR;case THREE.LinearFilter:return h.LINEAR;case THREE.LinearMipMapNearestFilter:return h.LINEAR_MIPMAP_NEAREST;case THREE.LinearMipMapLinearFilter:return h.LINEAR_MIPMAP_LINEAR;case THREE.ByteType:return h.BYTE;
case THREE.UnsignedByteType:return h.UNSIGNED_BYTE;case THREE.ShortType:return h.SHORT;case THREE.UnsignedShortType:return h.UNSIGNED_SHORT;case THREE.IntType:return h.INT;case THREE.UnsignedShortType:return h.UNSIGNED_INT;case THREE.FloatType:return h.FLOAT;case THREE.AlphaFormat:return h.ALPHA;case THREE.RGBFormat:return h.RGB;case THREE.RGBAFormat:return h.RGBA;case THREE.LuminanceFormat:return h.LUMINANCE;case THREE.LuminanceAlphaFormat:return h.LUMINANCE_ALPHA}return 0}var W=this,h,ca=[],O=null,
V=null,J=!0,S=null,$=null,aa=null,P=null,Y=0,da=0,fa=0,ka=0,Z=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],K=new THREE.Matrix4,ga=new Float32Array(16),X=new Float32Array(16),R=new THREE.Vector4,T={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]}},b=b||{},ha=b.canvas!==void 0?b.canvas:document.createElement("canvas"),Q=b.stencil!==void 0?b.stencil:!0,ma=b.antialias!==void 0?
b.antialias:!1,ea=b.clearColor!==void 0?new THREE.Color(b.clearColor):new THREE.Color(0),ia=b.clearAlpha!==void 0?b.clearAlpha:0;this.data={vertices:0,faces:0,drawCalls:0};this.maxMorphTargets=8;this.domElement=ha;this.sortObjects=this.autoClear=!0;try{if(!(h=ha.getContext("experimental-webgl",{antialias:ma,stencil:Q})))throw"Error creating WebGL context.";}catch(ya){console.error(ya)}
//console.log(navigator.userAgent+" | "+h.getParameter(h.VERSION)+" | "+h.getParameter(h.VENDOR)+" | "+h.getParameter(h.RENDERER)+" | "+h.getParameter(h.SHADING_LANGUAGE_VERSION));
h.clearColor(0,0,0,1);h.clearDepth(1);h.enable(h.DEPTH_TEST);h.depthFunc(h.LEQUAL);h.frontFace(h.CCW);h.cullFace(h.BACK);h.enable(h.CULL_FACE);h.enable(h.BLEND);h.blendEquation(h.FUNC_ADD);h.blendFunc(h.SRC_ALPHA,h.ONE_MINUS_SRC_ALPHA);h.clearColor(ea.r,ea.g,ea.b,ia);this.context=h;var va=h.getParameter(h.MAX_VERTEX_TEXTURE_IMAGE_UNITS)>0;if(Q){var U={};U.vertices=new Float32Array(12);U.faces=new Uint16Array(6);U.darkness=0.5;U.vertices[0]=-20;U.vertices[1]=
-20;U.vertices[2]=-1;U.vertices[3]=20;U.vertices[4]=-20;U.vertices[5]=-1;U.vertices[6]=20;U.vertices[7]=20;U.vertices[8]=-1;U.vertices[9]=-20;U.vertices[10]=20;U.vertices[11]=-1;U.faces[0]=0;U.faces[1]=1;U.faces[2]=2;U.faces[3]=0;U.faces[4]=2;U.faces[5]=3;U.vertexBuffer=h.createBuffer();U.elementBuffer=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,U.vertexBuffer);h.bufferData(h.ARRAY_BUFFER,U.vertices,h.STATIC_DRAW);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,U.elementBuffer);h.bufferData(h.ELEMENT_ARRAY_BUFFER,
U.faces,h.STATIC_DRAW);U.program=h.createProgram();h.attachShader(U.program,H("fragment",THREE.ShaderLib.shadowPost.fragmentShader));h.attachShader(U.program,H("vertex",THREE.ShaderLib.shadowPost.vertexShader));h.linkProgram(U.program);U.vertexLocation=h.getAttribLocation(U.program,"position");U.projectionLocation=h.getUniformLocation(U.program,"projectionMatrix");U.darknessLocation=h.getUniformLocation(U.program,"darkness")}var M={};M.vertices=new Float32Array(16);M.faces=new Uint16Array(6);b=0;
M.vertices[b++]=-1;M.vertices[b++]=-1;M.vertices[b++]=0;M.vertices[b++]=0;M.vertices[b++]=1;M.vertices[b++]=-1;M.vertices[b++]=1;M.vertices[b++]=0;M.vertices[b++]=1;M.vertices[b++]=1;M.vertices[b++]=1;M.vertices[b++]=1;M.vertices[b++]=-1;M.vertices[b++]=1;M.vertices[b++]=0;M.vertices[b++]=1;b=0;M.faces[b++]=0;M.faces[b++]=1;M.faces[b++]=2;M.faces[b++]=0;M.faces[b++]=2;M.faces[b++]=3;M.vertexBuffer=h.createBuffer();M.elementBuffer=h.createBuffer();M.tempTexture=h.createTexture();M.occlusionTexture=
h.createTexture();h.bindBuffer(h.ARRAY_BUFFER,M.vertexBuffer);h.bufferData(h.ARRAY_BUFFER,M.vertices,h.STATIC_DRAW);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,M.elementBuffer);h.bufferData(h.ELEMENT_ARRAY_BUFFER,M.faces,h.STATIC_DRAW);h.bindTexture(h.TEXTURE_2D,M.tempTexture);h.texImage2D(h.TEXTURE_2D,0,h.RGB,16,16,0,h.RGB,h.UNSIGNED_BYTE,null);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,
h.NEAREST);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,h.NEAREST);h.bindTexture(h.TEXTURE_2D,M.occlusionTexture);h.texImage2D(h.TEXTURE_2D,0,h.RGBA,16,16,0,h.RGBA,h.UNSIGNED_BYTE,null);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,h.NEAREST);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,h.NEAREST);h.getParameter(h.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<=0?(M.hasVertexTexture=
!1,M.program=h.createProgram(),h.attachShader(M.program,H("fragment",THREE.ShaderLib.lensFlare.fragmentShader)),h.attachShader(M.program,H("vertex",THREE.ShaderLib.lensFlare.vertexShader))):(M.hasVertexTexture=!0,M.program=h.createProgram(),h.attachShader(M.program,H("fragment",THREE.ShaderLib.lensFlareVertexTexture.fragmentShader)),h.attachShader(M.program,H("vertex",THREE.ShaderLib.lensFlareVertexTexture.vertexShader)));h.linkProgram(M.program);M.attributes={};M.uniforms={};M.attributes.vertex=
h.getAttribLocation(M.program,"position");M.attributes.uv=h.getAttribLocation(M.program,"UV");M.uniforms.renderType=h.getUniformLocation(M.program,"renderType");M.uniforms.map=h.getUniformLocation(M.program,"map");M.uniforms.occlusionMap=h.getUniformLocation(M.program,"occlusionMap");M.uniforms.opacity=h.getUniformLocation(M.program,"opacity");M.uniforms.scale=h.getUniformLocation(M.program,"scale");M.uniforms.rotation=h.getUniformLocation(M.program,"rotation");M.uniforms.screenPosition=h.getUniformLocation(M.program,
"screenPosition");var wa=!1;_sprite={};_sprite.vertices=new Float32Array(16);_sprite.faces=new Uint16Array(6);b=0;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;
b=0;_sprite.faces[b++]=0;_sprite.faces[b++]=1;_sprite.faces[b++]=2;_sprite.faces[b++]=0;_sprite.faces[b++]=2;_sprite.faces[b++]=3;_sprite.vertexBuffer=h.createBuffer();_sprite.elementBuffer=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,_sprite.vertexBuffer);h.bufferData(h.ARRAY_BUFFER,_sprite.vertices,h.STATIC_DRAW);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,_sprite.elementBuffer);h.bufferData(h.ELEMENT_ARRAY_BUFFER,_sprite.faces,h.STATIC_DRAW);_sprite.program=h.createProgram();h.attachShader(_sprite.program,
H("fragment",THREE.ShaderLib.sprite.fragmentShader));h.attachShader(_sprite.program,H("vertex",THREE.ShaderLib.sprite.vertexShader));h.linkProgram(_sprite.program);_sprite.attributes={};_sprite.uniforms={};_sprite.attributes.position=h.getAttribLocation(_sprite.program,"position");_sprite.attributes.uv=h.getAttribLocation(_sprite.program,"uv");_sprite.uniforms.uvOffset=h.getUniformLocation(_sprite.program,"uvOffset");_sprite.uniforms.uvScale=h.getUniformLocation(_sprite.program,"uvScale");_sprite.uniforms.rotation=
h.getUniformLocation(_sprite.program,"rotation");_sprite.uniforms.scale=h.getUniformLocation(_sprite.program,"scale");_sprite.uniforms.alignment=h.getUniformLocation(_sprite.program,"alignment");_sprite.uniforms.map=h.getUniformLocation(_sprite.program,"map");_sprite.uniforms.opacity=h.getUniformLocation(_sprite.program,"opacity");_sprite.uniforms.useScreenCoordinates=h.getUniformLocation(_sprite.program,"useScreenCoordinates");_sprite.uniforms.affectedByDistance=h.getUniformLocation(_sprite.program,
"affectedByDistance");_sprite.uniforms.screenPosition=h.getUniformLocation(_sprite.program,"screenPosition");_sprite.uniforms.modelViewMatrix=h.getUniformLocation(_sprite.program,"modelViewMatrix");_sprite.uniforms.projectionMatrix=h.getUniformLocation(_sprite.program,"projectionMatrix");var qa=!1;this.setSize=function(b,d){ha.width=b;ha.height=d;this.setViewport(0,0,ha.width,ha.height)};this.setViewport=function(b,d,c,e){Y=b;da=d;fa=c;ka=e;h.viewport(Y,da,fa,ka)};this.setScissor=function(b,d,c,e){h.scissor(b,
d,c,e)};this.enableScissorTest=function(b){b?h.enable(h.SCISSOR_TEST):h.disable(h.SCISSOR_TEST)};this.enableDepthBufferWrite=function(b){J=b;h.depthMask(b)};this.setClearColorHex=function(b,d){ea.setHex(b);ia=d;h.clearColor(ea.r,ea.g,ea.b,ia)};this.setClearColor=function(b,d){ea.copy(b);ia=d;h.clearColor(ea.r,ea.g,ea.b,ia)};this.clear=function(){h.clear(h.COLOR_BUFFER_BIT|h.DEPTH_BUFFER_BIT|h.STENCIL_BUFFER_BIT)};this.setStencilShadowDarkness=function(b){U.darkness=b};this.getContext=function(){return h};
this.initMaterial=function(b,d,c,e){var f,g,j;b instanceof THREE.MeshDepthMaterial?j="depth":b instanceof THREE.ShadowVolumeDynamicMaterial?j="shadowVolumeDynamic":b instanceof THREE.MeshNormalMaterial?j="normal":b instanceof THREE.MeshBasicMaterial?j="basic":b instanceof THREE.MeshLambertMaterial?j="lambert":b instanceof THREE.MeshPhongMaterial?j="phong":b instanceof THREE.LineBasicMaterial?j="basic":b instanceof THREE.ParticleBasicMaterial&&(j="particle_basic");if(j){var k=THREE.ShaderLib[j];b.uniforms=
THREE.UniformsUtils.clone(k.uniforms);b.vertexShader=k.vertexShader;b.fragmentShader=k.fragmentShader}var n,m,o;n=o=k=0;for(m=d.length;n<m;n++)g=d[n],g instanceof THREE.DirectionalLight&&o++,g instanceof THREE.PointLight&&k++;k+o<=4?d=o:(d=Math.ceil(4*o/(k+o)),k=4-d);g={directional:d,point:k};o=50;if(e!==void 0&&e instanceof THREE.SkinnedMesh)o=e.bones.length;var p;a:{n=b.fragmentShader;m=b.vertexShader;var k=b.uniforms,d=b.attributes,c={map:!!b.map,envMap:!!b.envMap,lightMap:!!b.lightMap,vertexColors:b.vertexColors,
fog:c,sizeAttenuation:b.sizeAttenuation,skinning:b.skinning,morphTargets:b.morphTargets,maxMorphTargets:this.maxMorphTargets,maxDirLights:g.directional,maxPointLights:g.point,maxBones:o},t;g=[];j?g.push(j):(g.push(n),g.push(m));for(t in c)g.push(t),g.push(c[t]);j=g.join();t=0;for(g=ca.length;t<g;t++)if(ca[t].code==j){p=ca[t].program;break a}t=h.createProgram();prefix_fragment=["#ifdef GL_ES\nprecision highp float;\n#endif","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,
c.fog?"#define USE_FOG":"",c.fog instanceof THREE.FogExp2?"#define FOG_EXP2":"",c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");prefix_vertex=[va?"#define VERTEX_TEXTURES":"","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_BONES "+c.maxBones,c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":
"",c.lightMap?"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"",c.skinning?"#define USE_SKINNING":"",c.morphTargets?"#define USE_MORPHTARGETS":"",c.sizeAttenuation?"#define USE_SIZEATTENUATION":"","uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
h.attachShader(t,H("fragment",prefix_fragment+n));h.attachShader(t,H("vertex",prefix_vertex+m));h.linkProgram(t);h.getProgramParameter(t,h.LINK_STATUS)||console.error("Could not initialise shader\nVALIDATE_STATUS: "+h.getProgramParameter(t,h.VALIDATE_STATUS)+", gl error ["+h.getError()+"]");t.uniforms={};t.attributes={};var u;n=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","objectMatrix","cameraPosition","cameraInverseMatrix","boneGlobalMatrices","morphTargetInfluences"];for(u in k)n.push(u);
u=n;k=0;for(n=u.length;k<n;k++)m=u[k],t.uniforms[m]=h.getUniformLocation(t,m);n=["position","normal","uv","uv2","tangent","color","skinVertexA","skinVertexB","skinIndex","skinWeight"];for(u=0;u<c.maxMorphTargets;u++)n.push("morphTarget"+u);for(p in d)n.push(p);p=n;u=0;for(d=p.length;u<d;u++)c=p[u],t.attributes[c]=h.getAttribLocation(t,c);ca.push({program:t,code:j});p=t}b.program=p;p=b.program.attributes;p.position>=0&&h.enableVertexAttribArray(p.position);p.color>=0&&h.enableVertexAttribArray(p.color);
p.normal>=0&&h.enableVertexAttribArray(p.normal);p.tangent>=0&&h.enableVertexAttribArray(p.tangent);b.skinning&&p.skinVertexA>=0&&p.skinVertexB>=0&&p.skinIndex>=0&&p.skinWeight>=0&&(h.enableVertexAttribArray(p.skinVertexA),h.enableVertexAttribArray(p.skinVertexB),h.enableVertexAttribArray(p.skinIndex),h.enableVertexAttribArray(p.skinWeight));if(b.attributes)for(f in b.attributes)p[f]!==void 0&&p[f]>=0&&h.enableVertexAttribArray(p[f]);if(b.morphTargets){b.numSupportedMorphTargets=0;p.morphTarget0>=
0&&(h.enableVertexAttribArray(p.morphTarget0),b.numSupportedMorphTargets++);p.morphTarget1>=0&&(h.enableVertexAttribArray(p.morphTarget1),b.numSupportedMorphTargets++);p.morphTarget2>=0&&(h.enableVertexAttribArray(p.morphTarget2),b.numSupportedMorphTargets++);p.morphTarget3>=0&&(h.enableVertexAttribArray(p.morphTarget3),b.numSupportedMorphTargets++);p.morphTarget4>=0&&(h.enableVertexAttribArray(p.morphTarget4),b.numSupportedMorphTargets++);p.morphTarget5>=0&&(h.enableVertexAttribArray(p.morphTarget5),
b.numSupportedMorphTargets++);p.morphTarget6>=0&&(h.enableVertexAttribArray(p.morphTarget6),b.numSupportedMorphTargets++);p.morphTarget7>=0&&(h.enableVertexAttribArray(p.morphTarget7),b.numSupportedMorphTargets++);e.__webglMorphTargetInfluences=new Float32Array(this.maxMorphTargets);b=0;for(f=this.maxMorphTargets;b<f;b++)e.__webglMorphTargetInfluences[b]=0}};this.render=function(b,c,o,y){var x,D,z,E,ha,I,H,J,L=b.lights,ea=b.fog;W.data.vertices=0;W.data.faces=0;W.data.drawCalls=0;c.matrixAutoUpdate&&
c.update(void 0,!0);b.update(void 0,!1,c);c.matrixWorldInverse.flattenToArray(X);c.projectionMatrix.flattenToArray(ga);K.multiply(c.projectionMatrix,c.matrixWorldInverse);k(K);this.initWebGLObjects(b);N(o);(this.autoClear||y)&&this.clear();ha=b.__webglObjects.length;for(y=0;y<ha;y++)if(x=b.__webglObjects[y],H=x.object,H.visible)if(!(H instanceof THREE.Mesh)||m(H)){if(H.matrixWorld.flattenToArray(H._objectMatrixArray),B(H,c),n(x),x.render=!0,this.sortObjects)R.copy(H.position),K.multiplyVector3(R),
x.z=R.z}else x.render=!1;else x.render=!1;this.sortObjects&&b.__webglObjects.sort(u);I=b.__webglObjectsImmediate.length;for(y=0;y<I;y++)x=b.__webglObjectsImmediate[y],H=x.object,H.visible&&(H.matrixAutoUpdate&&H.matrixWorld.flattenToArray(H._objectMatrixArray),B(H,c),p(x));F(THREE.NormalBlending);for(y=0;y<ha;y++)if(x=b.__webglObjects[y],x.render){H=x.object;J=x.buffer;z=x.opaque;f(H);for(x=0;x<z.count;x++)E=z.list[x],j(E.depthTest),e(c,L,ea,E,J,H)}for(y=0;y<I;y++)if(x=b.__webglObjectsImmediate[y],
H=x.object,H.visible){z=x.opaque;f(H);for(x=0;x<z.count;x++)E=z.list[x],j(E.depthTest),D=d(c,L,ea,E,H),H.render(function(b){g(b,D,E.shading)})}for(y=0;y<ha;y++)if(x=b.__webglObjects[y],x.render){H=x.object;J=x.buffer;z=x.transparent;f(H);for(x=0;x<z.count;x++)E=z.list[x],F(E.blending),j(E.depthTest),e(c,L,ea,E,J,H)}for(y=0;y<I;y++)if(x=b.__webglObjectsImmediate[y],H=x.object,H.visible){z=x.transparent;f(H);for(x=0;x<z.count;x++)E=z.list[x],F(E.blending),j(E.depthTest),D=d(c,L,ea,E,H),H.render(function(b){g(b,
D,E.shading)})}b.__webglSprites.length&&v(b,c);Q&&b.__webglShadowVolumes.length&&b.lights.length&&t(b);b.__webglLensFlares.length&&A(b,c);o&&o.minFilter!==THREE.NearestFilter&&o.minFilter!==THREE.LinearFilter&&(h.bindTexture(h.TEXTURE_2D,o.__webglTexture),h.generateMipmap(h.TEXTURE_2D),h.bindTexture(h.TEXTURE_2D,null))};this.initWebGLObjects=function(b){if(!b.__webglObjects)b.__webglObjects=[],b.__webglObjectsImmediate=[],b.__webglShadowVolumes=[],b.__webglLensFlares=[],b.__webglSprites=[];for(;b.__objectsAdded.length;){var d=
b.__objectsAdded[0],c=b,e=void 0,f=void 0,g=void 0;if(d._modelViewMatrix==void 0)d._modelViewMatrix=new THREE.Matrix4,d._normalMatrixArray=new Float32Array(9),d._modelViewMatrixArray=new Float32Array(16),d._objectMatrixArray=new Float32Array(16),d.matrixWorld.flattenToArray(d._objectMatrixArray);if(d instanceof THREE.Mesh)for(e in f=d.geometry,f.geometryGroups==void 0&&E(f),f.geometryGroups){g=f.geometryGroups[e];if(!g.__webglVertexBuffer){var j=g;j.__webglVertexBuffer=h.createBuffer();j.__webglNormalBuffer=
h.createBuffer();j.__webglTangentBuffer=h.createBuffer();j.__webglColorBuffer=h.createBuffer();j.__webglUVBuffer=h.createBuffer();j.__webglUV2Buffer=h.createBuffer();j.__webglSkinVertexABuffer=h.createBuffer();j.__webglSkinVertexBBuffer=h.createBuffer();j.__webglSkinIndicesBuffer=h.createBuffer();j.__webglSkinWeightsBuffer=h.createBuffer();j.__webglFaceBuffer=h.createBuffer();j.__webglLineBuffer=h.createBuffer();if(j.numMorphTargets){var k=void 0,n=void 0;j.__webglMorphTargetsBuffers=[];k=0;for(n=
j.numMorphTargets;k<n;k++)j.__webglMorphTargetsBuffers.push(h.createBuffer())}for(var j=g,k=d,m=void 0,o=void 0,p=void 0,t=void 0,u=void 0,v=void 0,D=v=n=0,z=void 0,t=k.geometry,z=t.faces,u=j.faces,m=0,o=u.length;m<o;m++)p=u[m],p=z[p],p instanceof THREE.Face3?(n+=3,v+=1,D+=3):p instanceof THREE.Face4&&(n+=4,v+=2,D+=4);for(var m=j,o=k,B=void 0,A=void 0,B=void 0,p=[],z=0,u=o.materials.length;z<u;z++)if(B=o.materials[z],B instanceof THREE.MeshFaceMaterial){B=0;for(l=m.materials.length;B<l;B++)(A=m.materials[B])&&
p.push(A)}else(A=B)&&p.push(A);m=p;a:{z=void 0;u=m.length;for(o=0;o<u;o++)if(z=m[o],z.map||z.lightMap||z instanceof THREE.MeshShaderMaterial){o=!0;break a}o=!1}a:{z=m;p=void 0;B=z.length;for(u=0;u<B;u++)if(p=z[u],!(p instanceof THREE.MeshBasicMaterial&&!p.envMap||p instanceof THREE.MeshDepthMaterial)){z=p&&p.shading!=void 0&&p.shading==THREE.SmoothShading?THREE.SmoothShading:THREE.FlatShading;break a}z=!1}a:{p=void 0;B=m.length;for(u=0;u<B;u++)if(p=m[u],p.vertexColors){p=p.vertexColors;break a}p=
!1}j.__vertexArray=new Float32Array(n*3);if(z)j.__normalArray=new Float32Array(n*3);if(t.hasTangents)j.__tangentArray=new Float32Array(n*4);if(p)j.__colorArray=new Float32Array(n*3);if(o){if(t.faceUvs.length>0||t.faceVertexUvs.length>0)j.__uvArray=new Float32Array(n*2);if(t.faceUvs.length>1||t.faceVertexUvs.length>1)j.__uv2Array=new Float32Array(n*2)}if(k.geometry.skinWeights.length&&k.geometry.skinIndices.length)j.__skinVertexAArray=new Float32Array(n*4),j.__skinVertexBArray=new Float32Array(n*4),
j.__skinIndexArray=new Float32Array(n*4),j.__skinWeightArray=new Float32Array(n*4);j.__faceArray=new Uint16Array(v*3+(k.geometry.edgeFaces?k.geometry.edgeFaces.length*6:0));j.__lineArray=new Uint16Array(D*2);if(j.numMorphTargets){j.__morphTargetsArrays=[];t=0;for(u=j.numMorphTargets;t<u;t++)j.__morphTargetsArrays.push(new Float32Array(n*3))}j.__needsSmoothNormals=z==THREE.SmoothShading;j.__uvType=o;j.__vertexColorType=p;j.__normalType=z;j.__webglFaceCount=v*3+(k.geometry.edgeFaces?k.geometry.edgeFaces.length*
6:0);j.__webglLineCount=D*2;t=0;for(u=m.length;t<u;t++)if(m[t].attributes)for(a in j.__webglCustomAttributes={},m[t].attributes){o={};for(prop in m[t].attributes[a])o[prop]=m[t].attributes[a][prop];if(!o.__webglInitialized||o.createUniqueBuffers)o.__webglInitialized=!0,v=1,o.type==="v2"?v=2:o.type==="v3"?v=3:o.type==="v4"?v=4:o.type==="c"&&(v=3),o.size=v,o.needsUpdate=!0,o.array=new Float32Array(n*v),o.buffer=h.createBuffer(),o.buffer.belongsToAttribute=a;j.__webglCustomAttributes[a]=o}j.__inittedArrays=
!0;f.__dirtyVertices=!0;f.__dirtyMorphTargets=!0;f.__dirtyElements=!0;f.__dirtyUvs=!0;f.__dirtyNormals=!0;f.__dirtyTangents=!0;f.__dirtyColors=!0}d instanceof THREE.ShadowVolume?x(c.__webglShadowVolumes,g,d):x(c.__webglObjects,g,d)}else if(d instanceof THREE.LensFlare)x(c.__webglLensFlares,void 0,d);else if(d instanceof THREE.Ribbon){f=d.geometry;if(!f.__webglVertexBuffer)e=f,e.__webglVertexBuffer=h.createBuffer(),e.__webglColorBuffer=h.createBuffer(),e=f,g=e.vertices.length,e.__vertexArray=new Float32Array(g*
3),e.__colorArray=new Float32Array(g*3),e.__webglVertexCount=g,f.__dirtyVertices=!0,f.__dirtyColors=!0;x(c.__webglObjects,f,d)}else if(d instanceof THREE.Line){f=d.geometry;if(!f.__webglVertexBuffer)e=f,e.__webglVertexBuffer=h.createBuffer(),e.__webglColorBuffer=h.createBuffer(),e=f,g=e.vertices.length,e.__vertexArray=new Float32Array(g*3),e.__colorArray=new Float32Array(g*3),e.__webglLineCount=g,f.__dirtyVertices=!0,f.__dirtyColors=!0;x(c.__webglObjects,f,d)}else if(d instanceof THREE.ParticleSystem){f=
d.geometry;if(!f.__webglVertexBuffer)e=f,e.__webglVertexBuffer=h.createBuffer(),e.__webglColorBuffer=h.createBuffer(),e=f,g=e.vertices.length,e.__vertexArray=new Float32Array(g*3),e.__colorArray=new Float32Array(g*3),e.__sortArray=[],e.__webglParticleCount=g,f.__dirtyVertices=!0,f.__dirtyColors=!0;x(c.__webglObjects,f,d)}else THREE.MarchingCubes!==void 0&&d instanceof THREE.MarchingCubes?c.__webglObjectsImmediate.push({object:d,opaque:{list:[],count:0},transparent:{list:[],count:0}}):d instanceof
THREE.Sprite&&c.__webglSprites.push(d);b.__objectsAdded.splice(0,1)}for(;b.__objectsRemoved.length;){d=b.__objectsRemoved[0];c=b;e=void 0;if(d instanceof THREE.Mesh)for(f=c.__webglObjects.length-1;f>=0;f--){if(e=c.__webglObjects[f].object,d==e){c.__webglObjects.splice(f,1);break}}else if(d instanceof THREE.Sprite)for(f=c.__webglSprites.length-1;f>=0;f--)if(e=c.__webglSprites[f],d==e){c.__webglSprites.splice(f,1);break}b.__objectsRemoved.splice(0,1)}d=0;for(c=b.__webglObjects.length;d<c;d++)y(b.__webglObjects[d].object,
b);d=0;for(c=b.__webglShadowVolumes.length;d<c;d++)y(b.__webglShadowVolumes[d].object,b);d=0;for(c=b.__webglLensFlares.length;d<c;d++)y(b.__webglLensFlares[d].object,b)};this.setFaceCulling=function(b,d){b?(!d||d=="ccw"?h.frontFace(h.CCW):h.frontFace(h.CW),b=="back"?h.cullFace(h.BACK):b=="front"?h.cullFace(h.FRONT):h.cullFace(h.FRONT_AND_BACK),h.enable(h.CULL_FACE)):h.disable(h.CULL_FACE)};this.supportsVertexTextures=function(){return va}};
THREE.WebGLRenderTarget=function(b,c,d){this.width=b;this.height=c;d=d||{};this.wrapS=d.wrapS!==void 0?d.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=d.wrapT!==void 0?d.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=d.magFilter!==void 0?d.magFilter:THREE.LinearFilter;this.minFilter=d.minFilter!==void 0?d.minFilter:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.format=d.format!==void 0?d.format:THREE.RGBAFormat;this.type=d.type!==void 0?d.type:
THREE.UnsignedByteType;this.depthBuffer=d.depthBuffer!==void 0?d.depthBuffer:!0;this.stencilBuffer=d.stencilBuffer!==void 0?d.stencilBuffer:!0};
THREE.SoundRenderer=function(){this.volume=1;this.domElement=document.createElement("div");this.domElement.id="THREESound";this.cameraPosition=new THREE.Vector3;this.soundPosition=new THREE.Vector3;this.render=function(b,c,d){d&&b.update(void 0,!1,c);var d=b.sounds,e,g=d.length;for(e=0;e<g;e++)b=d[e],this.soundPosition.set(b.matrixWorld.n14,b.matrixWorld.n24,b.matrixWorld.n34),this.soundPosition.subSelf(c.position),b.isPlaying&&b.isLoaded&&(b.isAddedToDOM||b.addToDOM(this.domElement),b.calculateVolumeAndPan(this.soundPosition))}};
THREE.RenderableVertex=function(){this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=!0};THREE.RenderableVertex.prototype.copy=function(b){this.positionWorld.copy(b.positionWorld);this.positionScreen.copy(b.positionScreen)};
THREE.RenderableFace3=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterials=this.meshMaterials=null;this.overdraw=!1;this.uvs=[[]];this.z=null};
THREE.RenderableFace4=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.v4=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterials=this.meshMaterials=null;this.overdraw=!1;this.uvs=[[]];this.z=null};
THREE.RenderableObject=function(){this.z=this.object=null};THREE.RenderableParticle=function(){this.rotation=this.z=this.y=this.x=null;this.scale=new THREE.Vector2;this.materials=null};THREE.RenderableLine=function(){this.z=null;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.materials=null};
THREE.ColorUtils={adjustHSV:function(b,c,d,e){var g=THREE.ColorUtils.__hsv;THREE.ColorUtils.rgbToHsv(b,g);g.h=THREE.ColorUtils.clamp(g.h+c,0,1);g.s=THREE.ColorUtils.clamp(g.s+d,0,1);g.v=THREE.ColorUtils.clamp(g.v+e,0,1);b.setHSV(g.h,g.s,g.v)},rgbToHsv:function(b,c){var d=b.r,e=b.g,g=b.b,f=Math.max(Math.max(d,e),g),j=Math.min(Math.min(d,e),g);if(j==f)j=d=0;else{var k=f-j,j=k/f,d=d==f?(e-g)/k:e==f?2+(g-d)/k:4+(d-e)/k;d/=6;d<0&&(d+=1);d>1&&(d-=1)}c===void 0&&(c={h:0,s:0,v:0});c.h=d;c.s=j;c.v=f;return c},
clamp:function(b,c,d){return b<c?c:b>d?d:b}};THREE.ColorUtils.__hsv={h:0,s:0,v:0};
var GeometryUtils={merge:function(b,c){var d=c instanceof THREE.Mesh,e=b.vertices.length,g=d?c.geometry:c,f=b.vertices,j=g.vertices,k=b.faces,m=g.faces,o=b.faceVertexUvs[0],g=g.faceVertexUvs[0];d&&c.matrixAutoUpdate&&c.updateMatrix();for(var p=0,n=j.length;p<n;p++){var u=new THREE.Vertex(j[p].position.clone());d&&c.matrix.multiplyVector3(u.position);f.push(u)}p=0;for(n=m.length;p<n;p++){var j=m[p],t,v,A=j.vertexNormals,u=j.vertexColors;j instanceof THREE.Face3?t=new THREE.Face3(j.a+e,j.b+e,j.c+e):
j instanceof THREE.Face4&&(t=new THREE.Face4(j.a+e,j.b+e,j.c+e,j.d+e));t.normal.copy(j.normal);d=0;for(f=A.length;d<f;d++)v=A[d],t.vertexNormals.push(v.clone());t.color.copy(j.color);d=0;for(f=u.length;d<f;d++)v=u[d],t.vertexColors.push(v.clone());t.materials=j.materials.slice();t.centroid.copy(j.centroid);k.push(t)}p=0;for(n=g.length;p<n;p++){e=g[p];k=[];d=0;for(f=e.length;d<f;d++)k.push(new THREE.UV(e[d].u,e[d].v));o.push(k)}}};
THREE.ImageUtils={loadTexture:function(b,c,d){var e=new Image,g=new THREE.Texture(e,c);e.onload=function(){g.needsUpdate=!0;d&&d(this)};e.src=b;return g},loadTextureCube:function(b,c,d){var e,g=[],f=new THREE.Texture(g,c),c=g.loadCount=0;for(e=b.length;c<e;++c)g[c]=new Image,g[c].onload=function(){g.loadCount+=1;if(g.loadCount==6)f.needsUpdate=!0;d&&d(this)},g[c].src=b[c];return f}};
THREE.SceneUtils={addMesh:function(b,c,d,e,g,f,j,k,m,o){c=new THREE.Mesh(c,o);c.scale.x=c.scale.y=c.scale.z=d;c.position.x=e;c.position.y=g;c.position.z=f;c.rotation.x=j;c.rotation.y=k;c.rotation.z=m;b.addObject(c);return c},addPanoramaCubeWebGL:function(b,c,d){var e=THREE.ShaderUtils.lib.cube;e.uniforms.tCube.texture=d;d=new THREE.MeshShaderMaterial({fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:e.uniforms});c=new THREE.Mesh(new THREE.Cube(c,c,c,1,1,1,null,!0),d);b.addObject(c);
return c},addPanoramaCube:function(b,c,d){var e=[];e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[0])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[1])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[2])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[3])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[4])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[5])}));c=new THREE.Mesh(new THREE.Cube(c,c,c,1,1,e,!0),
new THREE.MeshFaceMaterial);b.addObject(c);return c},addPanoramaCubePlanes:function(b,c,d){var e=c/2,c=new THREE.Plane(c,c),g=Math.PI,f=Math.PI/2;THREE.SceneUtils.addMesh(b,c,1,0,0,-e,0,0,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[5])}));THREE.SceneUtils.addMesh(b,c,1,-e,0,0,0,f,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[0])}));THREE.SceneUtils.addMesh(b,c,1,e,0,0,0,-f,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[1])}));THREE.SceneUtils.addMesh(b,c,1,0,e,0,f,0,g,
new THREE.MeshBasicMaterial({map:new THREE.Texture(d[2])}));THREE.SceneUtils.addMesh(b,c,1,0,-e,0,-f,0,g,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[3])}))},showHierarchy:function(b,c){THREE.SceneUtils.traverseHierarchy(b,function(b){b.visible=c})},traverseHierarchy:function(b,c){var d,e,g=b.children.length;for(e=0;e<g;e++)d=b.children[e],c(d),THREE.SceneUtils.traverseHierarchy(d,c)}};
THREE.ShaderUtils={lib:{fresnel:{uniforms:{mRefractionRatio:{type:"f",value:1.02},mFresnelBias:{type:"f",value:0.1},mFresnelPower:{type:"f",value:2},mFresnelScale:{type:"f",value:1},tCube:{type:"t",value:1,texture:null}},fragmentShader:"uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
vertexShader:"uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"},
normal:{uniforms:{enableAO:{type:"i",value:0},enableDiffuse:{type:"i",value:0},enableSpecular:{type:"i",value:0},tDiffuse:{type:"t",value:0,texture:null},tNormal:{type:"t",value:2,texture:null},tSpecular:{type:"t",value:3,texture:null},tAO:{type:"t",value:4,texture:null},uNormalScale:{type:"f",value:1},tDisplacement:{type:"t",value:5,texture:null},uDisplacementBias:{type:"f",value:-0.5},uDisplacementScale:{type:"f",value:2.5},uPointLightPos:{type:"v3",value:new THREE.Vector3},uPointLightColor:{type:"c",
value:new THREE.Color(15658734)},uDirLightPos:{type:"v3",value:new THREE.Vector3},uDirLightColor:{type:"c",value:new THREE.Color(15658734)},uAmbientLightColor:{type:"c",value:new THREE.Color(328965)},uDiffuseColor:{type:"c",value:new THREE.Color(15658734)},uSpecularColor:{type:"c",value:new THREE.Color(1118481)},uAmbientColor:{type:"c",value:new THREE.Color(328965)},uShininess:{type:"f",value:30}},fragmentShader:"uniform vec3 uDirLightPos;\nuniform vec3 uAmbientLightColor;\nuniform vec3 uDirLightColor;\nuniform vec3 uPointLightColor;\nuniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform float uNormalScale;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 diffuseTex = vec3( 1.0, 1.0, 1.0 );\nvec3 aoTex = vec3( 1.0, 1.0, 1.0 );\nvec3 specularTex = vec3( 1.0, 1.0, 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ndiffuseTex = texture2D( tDiffuse, vUv ).xyz;\nif( enableAO )\naoTex = texture2D( tAO, vUv ).xyz;\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 pointDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 pointSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec3 pointVector = normalize( vPointLightVector );\nvec3 pointHalfVector = normalize( vPointLightVector + vViewPosition );\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointDiffuse  += vec4( uDiffuseColor, 1.0 ) * pointDiffuseWeight;\npointSpecular += vec4( uSpecularColor, 1.0 ) * pointSpecularWeight * pointDiffuseWeight;\nvec4 dirDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 dirSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirDiffuse  += vec4( uDiffuseColor, 1.0 ) * dirDiffuseWeight;\ndirSpecular += vec4( uSpecularColor, 1.0 ) * dirSpecularWeight * dirDiffuseWeight;\nvec4 totalLight = vec4( uAmbientLightColor * uAmbientColor, 1.0 );\ntotalLight += vec4( uDirLightColor, 1.0 ) * ( dirDiffuse + dirSpecular );\ntotalLight += vec4( uPointLightColor, 1.0 ) * ( pointDiffuse + pointSpecular );\ngl_FragColor = vec4( totalLight.xyz * aoTex * diffuseTex, 1.0 );\n}",
vertexShader:"attribute vec4 tangent;\nuniform vec3 uPointLightPos;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv;\nvec4 lPosition = viewMatrix * vec4( uPointLightPos, 1.0 );\nvPointLightVector = normalize( lPosition.xyz - mvPosition.xyz );\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif\n}"},
cube:{uniforms:{tCube:{type:"t",value:1,texture:null}},vertexShader:"varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}"},convolution:{uniforms:{tDiffuse:{type:"t",
value:0,texture:null},uImageIncrement:{type:"v2",value:new THREE.Vector2(0.001953125,0)},cKernel:{type:"fv1",value:[]}},vertexShader:"varying vec2 vUv;\nuniform vec2 uImageIncrement;\nvoid main(void) {\nvUv = uv - ((KERNEL_SIZE - 1.0) / 2.0) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nuniform float cKernel[KERNEL_SIZE];\nvoid main(void) {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i=0; i<KERNEL_SIZE; ++i ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[i];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}"},
film:{uniforms:{tDiffuse:{type:"t",value:0,texture:null},time:{type:"f",value:0},nIntensity:{type:"f",value:0.5},sIntensity:{type:"f",value:0.05},sCount:{type:"f",value:4096},grayscale:{type:"i",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}"},
screen:{uniforms:{tDiffuse:{type:"t",value:0,texture:null},opacity:{type:"f",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float opacity;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}"},basic:{uniforms:{},vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
fragmentShader:"void main() {\ngl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n}"}},buildKernel:function(b){var c,d,e,g,f=2*Math.ceil(b*3)+1;f>25&&(f=25);g=(f-1)*0.5;d=Array(f);for(c=e=0;c<f;++c)d[c]=Math.exp(-((c-g)*(c-g))/(2*b*b)),e+=d[c];for(c=0;c<f;++c)d[c]/=e;return d}};
THREE.AnimationHandler=function(){var b=[],c={},d={update:function(d){for(var c=0;c<b.length;c++)b[c].update(d)},addToUpdate:function(d){b.indexOf(d)===-1&&b.push(d)},removeFromUpdate:function(d){d=b.indexOf(d);d!==-1&&b.splice(d,1)},add:function(b){c[b.name]!==void 0&&console.log("THREE.AnimationHandler.add: Warning! "+b.name+" already exists in library. Overwriting.");c[b.name]=b;if(b.initialized!==!0){for(var d=0;d<b.hierarchy.length;d++){for(var e=0;e<b.hierarchy[d].keys.length;e++){if(b.hierarchy[d].keys[e].time<
0)b.hierarchy[d].keys[e].time=0;if(b.hierarchy[d].keys[e].rot!==void 0&&!(b.hierarchy[d].keys[e].rot instanceof THREE.Quaternion)){var k=b.hierarchy[d].keys[e].rot;b.hierarchy[d].keys[e].rot=new THREE.Quaternion(k[0],k[1],k[2],k[3])}}if(b.hierarchy[d].keys[0].morphTargets!==void 0){k={};for(e=0;e<b.hierarchy[d].keys.length;e++)for(var m=0;m<b.hierarchy[d].keys[e].morphTargets.length;m++){var o=b.hierarchy[d].keys[e].morphTargets[m];k[o]=-1}b.hierarchy[d].usedMorphTargets=k;for(e=0;e<b.hierarchy[d].keys.length;e++){var p=
{};for(o in k){for(m=0;m<b.hierarchy[d].keys[e].morphTargets.length;m++)if(b.hierarchy[d].keys[e].morphTargets[m]===o){p[o]=b.hierarchy[d].keys[e].morphTargetsInfluences[m];break}m===b.hierarchy[d].keys[e].morphTargets.length&&(p[o]=0)}b.hierarchy[d].keys[e].morphTargetsInfluences=p}}for(e=1;e<b.hierarchy[d].keys.length;e++)b.hierarchy[d].keys[e].time===b.hierarchy[d].keys[e-1].time&&(b.hierarchy[d].keys.splice(e,1),e--);for(e=1;e<b.hierarchy[d].keys.length;e++)b.hierarchy[d].keys[e].index=e}e=parseInt(b.length*
b.fps,10);b.JIT={};b.JIT.hierarchy=[];for(d=0;d<b.hierarchy.length;d++)b.JIT.hierarchy.push(Array(e));b.initialized=!0}},get:function(b){if(typeof b==="string")return c[b]?c[b]:(console.log("THREE.AnimationHandler.get: Couldn't find animation "+b),null)},parse:function(b){var d=[];if(b instanceof THREE.SkinnedMesh)for(var c=0;c<b.bones.length;c++)d.push(b.bones[c]);else e(b,d);return d}},e=function(b,d){d.push(b);for(var c=0;c<b.children.length;c++)e(b.children[c],d)};d.LINEAR=0;d.CATMULLROM=1;d.CATMULLROM_FORWARD=
2;return d}();THREE.Animation=function(b,c,d,e){this.root=b;this.data=THREE.AnimationHandler.get(c);this.hierarchy=THREE.AnimationHandler.parse(b);this.currentTime=0;this.timeScale=1;this.isPlaying=!1;this.loop=this.isPaused=!0;this.interpolationType=d!==void 0?d:THREE.AnimationHandler.LINEAR;this.JITCompile=e!==void 0?e:!0;this.points=[];this.target=new THREE.Vector3};
THREE.Animation.prototype.play=function(b,c){if(!this.isPlaying){this.isPlaying=!0;this.loop=b!==void 0?b:!0;this.currentTime=c!==void 0?c:0;var d,e=this.hierarchy.length,g;for(d=0;d<e;d++){g=this.hierarchy[d];if(this.interpolationType!==THREE.AnimationHandler.CATMULLROM_FORWARD)g.useQuaternion=!0;g.matrixAutoUpdate=!0;if(g.animationCache===void 0)g.animationCache={},g.animationCache.prevKey={pos:0,rot:0,scl:0},g.animationCache.nextKey={pos:0,rot:0,scl:0},g.animationCache.originalMatrix=g instanceof
THREE.Bone?g.skinMatrix:g.matrix;var f=g.animationCache.prevKey;g=g.animationCache.nextKey;f.pos=this.data.hierarchy[d].keys[0];f.rot=this.data.hierarchy[d].keys[0];f.scl=this.data.hierarchy[d].keys[0];g.pos=this.getNextKeyWith("pos",d,1);g.rot=this.getNextKeyWith("rot",d,1);g.scl=this.getNextKeyWith("scl",d,1)}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};
THREE.Animation.prototype.pause=function(){this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};
THREE.Animation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var b=0;b<this.hierarchy.length;b++)if(this.hierarchy[b].animationCache!==void 0)this.hierarchy[b]instanceof THREE.Bone?this.hierarchy[b].skinMatrix=this.hierarchy[b].animationCache.originalMatrix:this.hierarchy[b].matrix=this.hierarchy[b].animationCache.originalMatrix,delete this.hierarchy[b].animationCache};
THREE.Animation.prototype.update=function(b){if(this.isPlaying){var c=["pos","rot","scl"],d,e,g,f,j,k,m,o,p=this.data.JIT.hierarchy,n,u;this.currentTime+=b*this.timeScale;u=this.currentTime;n=this.currentTime%=this.data.length;o=parseInt(Math.min(n*this.data.fps,this.data.length*this.data.fps),10);for(var t=0,v=this.hierarchy.length;t<v;t++)if(b=this.hierarchy[t],m=b.animationCache,this.JITCompile&&p[t][o]!==void 0)b instanceof THREE.Bone?(b.skinMatrix=p[t][o],b.matrixAutoUpdate=!1,b.matrixWorldNeedsUpdate=
!1):(b.matrix=p[t][o],b.matrixAutoUpdate=!1,b.matrixWorldNeedsUpdate=!0);else{if(this.JITCompile)b instanceof THREE.Bone?b.skinMatrix=b.animationCache.originalMatrix:b.matrix=b.animationCache.originalMatrix;for(var A=0;A<3;A++){d=c[A];j=m.prevKey[d];k=m.nextKey[d];if(k.time<=u){if(n<u)if(this.loop){j=this.data.hierarchy[t].keys[0];for(k=this.getNextKeyWith(d,t,1);k.time<n;)j=k,k=this.getNextKeyWith(d,t,k.index+1)}else{this.stop();return}else{do j=k,k=this.getNextKeyWith(d,t,k.index+1);while(k.time<
n)}m.prevKey[d]=j;m.nextKey[d]=k}b.matrixAutoUpdate=!0;b.matrixWorldNeedsUpdate=!0;e=(n-j.time)/(k.time-j.time);g=j[d];f=k[d];if(e<0||e>1)console.log("THREE.Animation.update: Warning! Scale out of bounds:"+e+" on bone "+t),e=e<0?0:1;if(d==="pos")if(d=b.position,this.interpolationType===THREE.AnimationHandler.LINEAR)d.x=g[0]+(f[0]-g[0])*e,d.y=g[1]+(f[1]-g[1])*e,d.z=g[2]+(f[2]-g[2])*e;else{if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)if(this.points[0]=
this.getPrevKeyWith("pos",t,j.index-1).pos,this.points[1]=g,this.points[2]=f,this.points[3]=this.getNextKeyWith("pos",t,k.index+1).pos,e=e*0.33+0.33,g=this.interpolateCatmullRom(this.points,e),d.x=g[0],d.y=g[1],d.z=g[2],this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)e=this.interpolateCatmullRom(this.points,e*1.01),this.target.set(e[0],e[1],e[2]),this.target.subSelf(d),this.target.y=0,this.target.normalize(),e=Math.atan2(this.target.x,this.target.z),b.rotation.set(0,e,0)}else if(d===
"rot")THREE.Quaternion.slerp(g,f,b.quaternion,e);else if(d==="scl")d=b.scale,d.x=g[0]+(f[0]-g[0])*e,d.y=g[1]+(f[1]-g[1])*e,d.z=g[2]+(f[2]-g[2])*e}}if(this.JITCompile&&p[0][o]===void 0){this.hierarchy[0].update(void 0,!0);for(t=0;t<this.hierarchy.length;t++)p[t][o]=this.hierarchy[t]instanceof THREE.Bone?this.hierarchy[t].skinMatrix.clone():this.hierarchy[t].matrix.clone()}}};
THREE.Animation.prototype.interpolateCatmullRom=function(b,c){var d=[],e=[],g,f,j,k,m,o;g=(b.length-1)*c;f=Math.floor(g);g-=f;d[0]=f==0?f:f-1;d[1]=f;d[2]=f>b.length-2?f:f+1;d[3]=f>b.length-3?f:f+2;f=b[d[0]];k=b[d[1]];m=b[d[2]];o=b[d[3]];d=g*g;j=g*d;e[0]=this.interpolate(f[0],k[0],m[0],o[0],g,d,j);e[1]=this.interpolate(f[1],k[1],m[1],o[1],g,d,j);e[2]=this.interpolate(f[2],k[2],m[2],o[2],g,d,j);return e};
THREE.Animation.prototype.interpolate=function(b,c,d,e,g,f,j){b=(d-b)*0.5;e=(e-c)*0.5;return(2*(c-d)+b+e)*j+(-3*(c-d)-2*b-e)*f+b*g+c};THREE.Animation.prototype.getNextKeyWith=function(b,c,d){var e=this.data.hierarchy[c].keys;for(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?d=d<e.length-1?d:e.length-1:d%=e.length;d<e.length;d++)if(e[d][b]!==void 0)return e[d];return this.data.hierarchy[c].keys[0]};
THREE.Animation.prototype.getPrevKeyWith=function(b,c,d){for(var e=this.data.hierarchy[c].keys,d=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?d>0?d:0:d>=0?d:d+e.length;d>=0;d--)if(e[d][b]!==void 0)return e[d];return this.data.hierarchy[c].keys[e.length-1]};
THREE.QuakeCamera=function(b){function c(b,c){return function(){c.apply(b,arguments)}}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.movementSpeed=1;this.lookSpeed=0.005;this.noFly=!1;this.lookVertical=!0;this.autoForward=!1;this.activeLook=!0;this.heightSpeed=!1;this.heightCoef=1;this.heightMin=0;this.constrainVertical=!1;this.verticalMin=0;this.verticalMax=3.14;this.domElement=document;this.lastUpdate=(new Date).getTime();this.tdiff=0;if(b){if(b.movementSpeed!==void 0)this.movementSpeed=
b.movementSpeed;if(b.lookSpeed!==void 0)this.lookSpeed=b.lookSpeed;if(b.noFly!==void 0)this.noFly=b.noFly;if(b.lookVertical!==void 0)this.lookVertical=b.lookVertical;if(b.autoForward!==void 0)this.autoForward=b.autoForward;if(b.activeLook!==void 0)this.activeLook=b.activeLook;if(b.heightSpeed!==void 0)this.heightSpeed=b.heightSpeed;if(b.heightCoef!==void 0)this.heightCoef=b.heightCoef;if(b.heightMin!==void 0)this.heightMin=b.heightMin;if(b.heightMax!==void 0)this.heightMax=b.heightMax;if(b.constrainVertical!==
void 0)this.constrainVertical=b.constrainVertical;if(b.verticalMin!==void 0)this.verticalMin=b.verticalMin;if(b.verticalMax!==void 0)this.verticalMax=b.verticalMax;if(b.domElement!==void 0)this.domElement=b.domElement}this.theta=this.phi=this.lon=this.lat=this.mouseY=this.mouseX=this.autoSpeedFactor=0;this.mouseDragOn=this.freeze=this.moveRight=this.moveLeft=this.moveBackward=this.moveForward=!1;this.windowHalfX=window.innerWidth/2;this.windowHalfY=window.innerHeight/2;this.onMouseDown=function(b){b.preventDefault();
b.stopPropagation();if(this.activeLook)switch(b.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0};this.onMouseUp=function(b){b.preventDefault();b.stopPropagation();if(this.activeLook)switch(b.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1};this.onMouseMove=function(b){this.mouseX=b.clientX-this.windowHalfX;this.mouseY=b.clientY-this.windowHalfY};this.onKeyDown=function(b){switch(b.keyCode){case 38:case 87:this.moveForward=
!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 81:this.freeze=!this.freeze}};this.onKeyUp=function(b){switch(b.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1}};this.update=function(){var b=(new Date).getTime();this.tdiff=(b-this.lastUpdate)/1E3;this.lastUpdate=b;if(!this.freeze){this.autoSpeedFactor=
this.heightSpeed?this.tdiff*((this.position.y<this.heightMin?this.heightMin:this.position.y>this.heightMax?this.heightMax:this.position.y)-this.heightMin)*this.heightCoef:0;var c=this.tdiff*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.translateZ(-(c+this.autoSpeedFactor));this.moveBackward&&this.translateZ(c);this.moveLeft&&this.translateX(-c);this.moveRight&&this.translateX(c);c=this.tdiff*this.lookSpeed;this.activeLook||(c=0);this.lon+=this.mouseX*c;this.lookVertical&&
(this.lat-=this.mouseY*c);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;var b=this.target.position,g=this.position;b.x=g.x+100*Math.sin(this.phi)*Math.cos(this.theta);b.y=g.y+100*Math.cos(this.phi);b.z=g.z+100*Math.sin(this.phi)*Math.sin(this.theta)}this.lon+=this.mouseX*c;this.lookVertical&&(this.lat-=this.mouseY*c);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;if(this.constrainVertical)this.phi=
(this.phi-0)*(this.verticalMax-this.verticalMin)/3.14+this.verticalMin;b=this.target.position;g=this.position;b.x=g.x+100*Math.sin(this.phi)*Math.cos(this.theta);b.y=g.y+100*Math.cos(this.phi);b.z=g.z+100*Math.sin(this.phi)*Math.sin(this.theta);this.supr.update.call(this)};this.domElement.addEventListener("contextmenu",function(b){b.preventDefault()},!1);this.domElement.addEventListener("mousemove",c(this,this.onMouseMove),!1);this.domElement.addEventListener("mousedown",c(this,this.onMouseDown),
!1);this.domElement.addEventListener("mouseup",c(this,this.onMouseUp),!1);this.domElement.addEventListener("keydown",c(this,this.onKeyDown),!1);this.domElement.addEventListener("keyup",c(this,this.onKeyUp),!1)};THREE.QuakeCamera.prototype=new THREE.Camera;THREE.QuakeCamera.prototype.constructor=THREE.QuakeCamera;THREE.QuakeCamera.prototype.supr=THREE.Camera.prototype;
THREE.QuakeCamera.prototype.translate=function(b,c){this.matrix.rotateAxis(c);if(this.noFly)c.y=0;this.position.addSelf(c.multiplyScalar(b));this.target.position.addSelf(c.multiplyScalar(b))};
THREE.PathCamera=function(b){function c(b,d,c,e){var f={name:c,fps:0.6,length:e,hierarchy:[]},g,j=d.getControlPointsArray(),k=d.getLength(),m=j.length,E=0;g=m-1;d={parent:-1,keys:[]};d.keys[0]={time:0,pos:j[0],rot:[0,0,0,1],scl:[1,1,1]};d.keys[g]={time:e,pos:j[g],rot:[0,0,0,1],scl:[1,1,1]};for(g=1;g<m-1;g++)E=e*k.chunks[g]/k.total,d.keys[g]={time:E,pos:j[g]};f.hierarchy[0]=d;THREE.AnimationHandler.add(f);return new THREE.Animation(b,c,THREE.AnimationHandler.CATMULLROM_FORWARD,!1)}function d(b,d){var c,
e,f=new THREE.Geometry;for(c=0;c<b.points.length*d;c++)e=c/(b.points.length*d),e=b.getPoint(e),f.vertices[c]=new THREE.Vertex(new THREE.Vector3(e.x,e.y,e.z));return f}function e(b,c){var e=d(c,10),f=d(c,10),g=new THREE.LineBasicMaterial({color:16711680,linewidth:3});lineObj=new THREE.Line(e,g);particleObj=new THREE.ParticleSystem(f,new THREE.ParticleBasicMaterial({color:16755200,size:3}));lineObj.scale.set(1,1,1);b.addChild(lineObj);particleObj.scale.set(1,1,1);b.addChild(particleObj);f=new THREE.Sphere(1,
16,8);g=new THREE.MeshBasicMaterial({color:65280});for(i=0;i<c.points.length;i++)e=new THREE.Mesh(f,g),e.position.copy(c.points[i]),e.updateMatrix(),b.addChild(e)}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.id="PathCamera"+THREE.PathCameraIdCounter++;this.duration=1E4;this.waypoints=[];this.useConstantSpeed=!0;this.resamplingCoef=50;this.debugPath=new THREE.Object3D;this.debugDummy=new THREE.Object3D;this.animationParent=new THREE.Object3D;this.lookSpeed=0.005;this.lookHorizontal=
this.lookVertical=!0;this.verticalAngleMap={srcRange:[0,6.28],dstRange:[0,6.28]};this.horizontalAngleMap={srcRange:[0,6.28],dstRange:[0,6.28]};this.domElement=document;if(b){if(b.duration!==void 0)this.duration=b.duration*1E3;if(b.waypoints!==void 0)this.waypoints=b.waypoints;if(b.useConstantSpeed!==void 0)this.useConstantSpeed=b.useConstantSpeed;if(b.resamplingCoef!==void 0)this.resamplingCoef=b.resamplingCoef;if(b.createDebugPath!==void 0)this.createDebugPath=b.createDebugPath;if(b.createDebugDummy!==
void 0)this.createDebugDummy=b.createDebugDummy;if(b.lookSpeed!==void 0)this.lookSpeed=b.lookSpeed;if(b.lookVertical!==void 0)this.lookVertical=b.lookVertical;if(b.lookHorizontal!==void 0)this.lookHorizontal=b.lookHorizontal;if(b.verticalAngleMap!==void 0)this.verticalAngleMap=b.verticalAngleMap;if(b.horizontalAngleMap!==void 0)this.horizontalAngleMap=b.horizontalAngleMap;if(b.domElement!==void 0)this.domElement=b.domElement}this.theta=this.phi=this.lon=this.lat=this.mouseY=this.mouseX=0;this.windowHalfX=
window.innerWidth/2;this.windowHalfY=window.innerHeight/2;var g=Math.PI*2,f=Math.PI/180;this.update=function(b,d,c){var e,j;this.lookHorizontal&&(this.lon+=this.mouseX*this.lookSpeed);this.lookVertical&&(this.lat-=this.mouseY*this.lookSpeed);this.lon=Math.max(0,Math.min(360,this.lon));this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*f;this.theta=this.lon*f;e=this.phi%g;this.phi=e>=0?e:e+g;e=this.verticalAngleMap.srcRange;j=this.verticalAngleMap.dstRange;var k=j[1]-j[0];this.phi=
TWEEN.Easing.Quadratic.EaseInOut(((this.phi-e[0])*(j[1]-j[0])/(e[1]-e[0])+j[0]-j[0])/k)*k+j[0];e=this.horizontalAngleMap.srcRange;j=this.horizontalAngleMap.dstRange;k=j[1]-j[0];this.theta=TWEEN.Easing.Quadratic.EaseInOut(((this.theta-e[0])*(j[1]-j[0])/(e[1]-e[0])+j[0]-j[0])/k)*k+j[0];e=this.target.position;e.x=100*Math.sin(this.phi)*Math.cos(this.theta);e.y=100*Math.cos(this.phi);e.z=100*Math.sin(this.phi)*Math.sin(this.theta);this.supr.update.call(this,b,d,c)};this.onMouseMove=function(b){this.mouseX=
b.clientX-this.windowHalfX;this.mouseY=b.clientY-this.windowHalfY};this.spline=new THREE.Spline;this.spline.initFromArray(this.waypoints);this.useConstantSpeed&&this.spline.reparametrizeByArcLength(this.resamplingCoef);if(this.createDebugDummy){var b=new THREE.MeshLambertMaterial({color:30719}),j=new THREE.MeshLambertMaterial({color:65280}),k=new THREE.Cube(10,10,20),m=new THREE.Cube(2,2,10);this.animationParent=new THREE.Mesh(k,b);b=new THREE.Mesh(m,j);b.position.set(0,10,0);this.animation=c(this.animationParent,
this.spline,this.id,this.duration);this.animationParent.addChild(this);this.animationParent.addChild(this.target);this.animationParent.addChild(b)}else this.animation=c(this.animationParent,this.spline,this.id,this.duration),this.animationParent.addChild(this.target),this.animationParent.addChild(this);this.createDebugPath&&e(this.debugPath,this.spline);this.domElement.addEventListener("mousemove",function(b,d){return function(){d.apply(b,arguments)}}(this,this.onMouseMove),!1)};
THREE.PathCamera.prototype=new THREE.Camera;THREE.PathCamera.prototype.constructor=THREE.PathCamera;THREE.PathCamera.prototype.supr=THREE.Camera.prototype;THREE.PathCameraIdCounter=0;
THREE.FlyCamera=function(b){function c(b,c){return function(){c.apply(b,arguments)}}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.tmpQuaternion=new THREE.Quaternion;this.movementSpeed=1;this.rollSpeed=0.005;this.autoForward=this.dragToLook=!1;this.domElement=document;if(b){if(b.movementSpeed!==void 0)this.movementSpeed=b.movementSpeed;if(b.rollSpeed!==void 0)this.rollSpeed=b.rollSpeed;if(b.dragToLook!==void 0)this.dragToLook=b.dragToLook;if(b.autoForward!==void 0)this.autoForward=
b.autoForward;if(b.domElement!==void 0)this.domElement=b.domElement}this.useTarget=!1;this.useQuaternion=!0;this.mouseStatus=0;this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0};this.moveVector=new THREE.Vector3(0,0,0);this.rotationVector=new THREE.Vector3(0,0,0);this.lastUpdate=-1;this.tdiff=0;this.handleEvent=function(b){if(typeof this[b.type]=="function")this[b.type](b)};this.keydown=function(b){if(!b.altKey){switch(b.keyCode){case 16:this.movementSpeedMultiplier=
0.1;break;case 87:this.moveState.forward=1;break;case 83:this.moveState.back=1;break;case 65:this.moveState.left=1;break;case 68:this.moveState.right=1;break;case 82:this.moveState.up=1;break;case 70:this.moveState.down=1;break;case 38:this.moveState.pitchUp=1;break;case 40:this.moveState.pitchDown=1;break;case 37:this.moveState.yawLeft=1;break;case 39:this.moveState.yawRight=1;break;case 81:this.moveState.rollLeft=1;break;case 69:this.moveState.rollRight=1}this.updateMovementVector();this.updateRotationVector()}};
this.keyup=function(b){switch(b.keyCode){case 16:this.movementSpeedMultiplier=1;break;case 87:this.moveState.forward=0;break;case 83:this.moveState.back=0;break;case 65:this.moveState.left=0;break;case 68:this.moveState.right=0;break;case 82:this.moveState.up=0;break;case 70:this.moveState.down=0;break;case 38:this.moveState.pitchUp=0;break;case 40:this.moveState.pitchDown=0;break;case 37:this.moveState.yawLeft=0;break;case 39:this.moveState.yawRight=0;break;case 81:this.moveState.rollLeft=0;break;
case 69:this.moveState.rollRight=0}this.updateMovementVector();this.updateRotationVector()};this.mousedown=function(b){b.preventDefault();b.stopPropagation();if(this.dragToLook)this.mouseStatus++;else switch(b.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}};this.mousemove=function(b){if(!this.dragToLook||this.mouseStatus>0){var c=this.getContainerDimensions(),g=c.size[0]/2,f=c.size[1]/2;this.moveState.yawLeft=-(b.clientX-c.offset[0]-g)/g;this.moveState.pitchDown=(b.clientY-
c.offset[1]-f)/f;this.updateRotationVector()}};this.mouseup=function(b){b.preventDefault();b.stopPropagation();if(this.dragToLook)this.mouseStatus--,this.moveState.yawLeft=this.moveState.pitchDown=0;else switch(b.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.updateRotationVector()};this.update=function(){var b=(new Date).getTime();if(this.lastUpdate==-1)this.lastUpdate=b;this.tdiff=(b-this.lastUpdate)/1E3;this.lastUpdate=b;var b=this.tdiff*this.movementSpeed,c=this.tdiff*
this.rollSpeed;this.translateX(this.moveVector.x*b);this.translateY(this.moveVector.y*b);this.translateZ(this.moveVector.z*b);this.tmpQuaternion.set(this.rotationVector.x*c,this.rotationVector.y*c,this.rotationVector.z*c,1).normalize();this.quaternion.multiplySelf(this.tmpQuaternion);this.matrix.setPosition(this.position);this.matrix.setRotationFromQuaternion(this.quaternion);this.matrixWorldNeedsUpdate=!0;this.supr.update.call(this)};this.updateMovementVector=function(){var b=this.moveState.forward||
this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right;this.moveVector.y=-this.moveState.down+this.moveState.up;this.moveVector.z=-b+this.moveState.back};this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp;this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft;this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft};this.getContainerDimensions=function(){return this.domElement!=
document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}};this.domElement.addEventListener("mousemove",c(this,this.mousemove),!1);this.domElement.addEventListener("mousedown",c(this,this.mousedown),!1);this.domElement.addEventListener("mouseup",c(this,this.mouseup),!1);window.addEventListener("keydown",c(this,this.keydown),!1);window.addEventListener("keyup",c(this,
this.keyup),!1);this.updateMovementVector();this.updateRotationVector()};THREE.FlyCamera.prototype=new THREE.Camera;THREE.FlyCamera.prototype.constructor=THREE.FlyCamera;THREE.FlyCamera.prototype.supr=THREE.Camera.prototype;
THREE.RollCamera=function(b,c,d,e){THREE.Camera.call(this,b,c,d,e);this.mouseLook=!0;this.autoForward=!1;this.rollSpeed=this.movementSpeed=this.lookSpeed=1;this.constrainVertical=[-0.9,0.9];this.domElement=document;this.matrixAutoUpdate=this.useTarget=!1;this.forward=new THREE.Vector3(0,0,1);this.roll=0;this.lastUpdate=-1;this.delta=0;var g=new THREE.Vector3,f=new THREE.Vector3,j=new THREE.Vector3,k=new THREE.Matrix4,m=!1,o=1,p=0,n=0,u=0,t=0,v=0,A=window.innerWidth/2,B=window.innerHeight/2;this.update=
function(){var b=(new Date).getTime();if(this.lastUpdate==-1)this.lastUpdate=b;this.delta=(b-this.lastUpdate)/1E3;this.lastUpdate=b;this.mouseLook&&(b=this.delta*this.lookSpeed,this.rotateHorizontally(b*t),this.rotateVertically(b*v));b=this.delta*this.movementSpeed;this.translateZ(b*(p>0||this.autoForward&&!(p<0)?1:p));this.translateX(b*n);this.translateY(b*u);m&&(this.roll+=this.rollSpeed*this.delta*o);if(this.forward.y>this.constrainVertical[1])this.forward.y=this.constrainVertical[1],this.forward.normalize();
else if(this.forward.y<this.constrainVertical[0])this.forward.y=this.constrainVertical[0],this.forward.normalize();j.copy(this.forward);f.set(0,1,0);g.cross(f,j).normalize();f.cross(j,g).normalize();this.matrix.n11=g.x;this.matrix.n12=f.x;this.matrix.n13=j.x;this.matrix.n21=g.y;this.matrix.n22=f.y;this.matrix.n23=j.y;this.matrix.n31=g.z;this.matrix.n32=f.z;this.matrix.n33=j.z;k.identity();k.n11=Math.cos(this.roll);k.n12=-Math.sin(this.roll);k.n21=Math.sin(this.roll);k.n22=Math.cos(this.roll);this.matrix.multiplySelf(k);
this.matrixWorldNeedsUpdate=!0;this.matrix.n14=this.position.x;this.matrix.n24=this.position.y;this.matrix.n34=this.position.z;this.supr.update.call(this)};this.translateX=function(b){this.position.x+=this.matrix.n11*b;this.position.y+=this.matrix.n21*b;this.position.z+=this.matrix.n31*b};this.translateY=function(b){this.position.x+=this.matrix.n12*b;this.position.y+=this.matrix.n22*b;this.position.z+=this.matrix.n32*b};this.translateZ=function(b){this.position.x-=this.matrix.n13*b;this.position.y-=
this.matrix.n23*b;this.position.z-=this.matrix.n33*b};this.rotateHorizontally=function(b){g.set(this.matrix.n11,this.matrix.n21,this.matrix.n31);g.multiplyScalar(b);this.forward.subSelf(g);this.forward.normalize()};this.rotateVertically=function(b){f.set(this.matrix.n12,this.matrix.n22,this.matrix.n32);f.multiplyScalar(b);this.forward.addSelf(f);this.forward.normalize()};this.domElement.addEventListener("contextmenu",function(b){b.preventDefault()},!1);this.domElement.addEventListener("mousemove",
function(b){t=(b.clientX-A)/window.innerWidth;v=(b.clientY-B)/window.innerHeight},!1);this.domElement.addEventListener("mousedown",function(b){b.preventDefault();b.stopPropagation();switch(b.button){case 0:p=1;break;case 2:p=-1}},!1);this.domElement.addEventListener("mouseup",function(b){b.preventDefault();b.stopPropagation();switch(b.button){case 0:p=0;break;case 2:p=0}},!1);this.domElement.addEventListener("keydown",function(b){switch(b.keyCode){case 38:case 87:p=1;break;case 37:case 65:n=-1;break;
case 40:case 83:p=-1;break;case 39:case 68:n=1;break;case 81:m=!0;o=1;break;case 69:m=!0;o=-1;break;case 82:u=1;break;case 70:u=-1}},!1);this.domElement.addEventListener("keyup",function(b){switch(b.keyCode){case 38:case 87:p=0;break;case 37:case 65:n=0;break;case 40:case 83:p=0;break;case 39:case 68:n=0;break;case 81:m=!1;break;case 69:m=!1;break;case 82:u=0;break;case 70:u=0}},!1)};THREE.RollCamera.prototype=new THREE.Camera;THREE.RollCamera.prototype.constructor=THREE.RollCamera;
THREE.RollCamera.prototype.supr=THREE.Camera.prototype;
THREE.TrackballCamera=function(b){function c(b,c){return function(){c.apply(b,arguments)}}b=b||{};THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.domElement=b.domElement||document;this.screen=b.screen||{width:window.innerWidth,height:window.innerHeight,offsetLeft:0,offsetTop:0};this.radius=b.radius||(this.screen.width+this.screen.height)/4;this.rotateSpeed=b.rotateSpeed||1;this.zoomSpeed=b.zoomSpeed||1.2;this.panSpeed=b.panSpeed||0.3;this.noZoom=b.noZoom||!1;this.noPan=b.noPan||
!1;this.staticMoving=b.staticMoving||!1;this.dynamicDampingFactor=b.dynamicDampingFactor||0.2;this.minDistance=b.minDistance||0;this.maxDistance=b.maxDistance||Infinity;this.keys=b.keys||[65,83,68];this.useTarget=!0;var d=!1,e=this.STATE.NONE,g=new THREE.Vector3,f=new THREE.Vector3,j=new THREE.Vector3,k=new THREE.Vector2,m=new THREE.Vector2,o=new THREE.Vector2,p=new THREE.Vector2;this.handleEvent=function(b){if(typeof this[b.type]=="function")this[b.type](b)};this.getMouseOnScreen=function(b,c){return new THREE.Vector2((b-
this.screen.offsetLeft)/this.radius*0.5,(c-this.screen.offsetTop)/this.radius*0.5)};this.getMouseProjectionOnBall=function(b,c){var d=new THREE.Vector3((b-this.screen.width*0.5-this.screen.offsetLeft)/this.radius,(this.screen.height*0.5+this.screen.offsetTop-c)/this.radius,0),e=d.length();e>1?d.normalize():d.z=Math.sqrt(1-e*e);g=this.position.clone().subSelf(this.target.position);e=this.up.clone().setLength(d.y);e.addSelf(this.up.clone().crossSelf(g).setLength(d.x));e.addSelf(g.setLength(d.z));return e};
this.rotateCamera=function(){var b=Math.acos(f.dot(j)/f.length()/j.length());if(b){var c=(new THREE.Vector3).cross(f,j).normalize(),d=new THREE.Quaternion;b*=this.rotateSpeed;d.setFromAxisAngle(c,-b);d.multiplyVector3(g);d.multiplyVector3(this.up);d.multiplyVector3(j);this.staticMoving?f=j:(d.setFromAxisAngle(c,b*(this.dynamicDampingFactor-1)),d.multiplyVector3(f))}};this.zoomCamera=function(){var b=1+(m.y-k.y)*this.zoomSpeed;b!==1&&b>0&&(g.multiplyScalar(b),this.staticMoving?k=m:k.y+=(m.y-k.y)*this.dynamicDampingFactor)};
this.panCamera=function(){var b=p.clone().subSelf(o);if(b.lengthSq()){b.multiplyScalar(g.length()*this.panSpeed);var c=g.clone().crossSelf(this.up).setLength(b.x);c.addSelf(this.up.clone().setLength(b.y));this.position.addSelf(c);this.target.position.addSelf(c);this.staticMoving?o=p:o.addSelf(b.sub(p,o).multiplyScalar(this.dynamicDampingFactor))}};this.checkDistances=function(){if(!this.noZoom||!this.noPan)this.position.lengthSq()>this.maxDistance*this.maxDistance&&this.position.setLength(this.maxDistance),
g.lengthSq()<this.minDistance*this.minDistance&&this.position.add(this.target.position,g.setLength(this.minDistance))};this.update=function(b,c,d){g=this.position.clone().subSelf(this.target.position);this.rotateCamera();this.noZoom||this.zoomCamera();this.noPan||this.panCamera();this.position.add(this.target.position,g);this.checkDistances();this.supr.update.call(this,b,c,d)};this.domElement.addEventListener("contextmenu",function(b){b.preventDefault()},!1);this.domElement.addEventListener("mousemove",
c(this,function(b){d&&(f=j=this.getMouseProjectionOnBall(b.clientX,b.clientY),k=m=this.getMouseOnScreen(b.clientX,b.clientY),o=p=this.getMouseOnScreen(b.clientX,b.clientY),d=!1);e!==this.STATE.NONE&&(e===this.STATE.ROTATE?j=this.getMouseProjectionOnBall(b.clientX,b.clientY):e===this.STATE.ZOOM&&!this.noZoom?m=this.getMouseOnScreen(b.clientX,b.clientY):e===this.STATE.PAN&&!this.noPan&&(p=this.getMouseOnScreen(b.clientX,b.clientY)))}),!1);this.domElement.addEventListener("mousedown",c(this,function(b){b.preventDefault();
b.stopPropagation();if(e===this.STATE.NONE)e=b.button,e===this.STATE.ROTATE?f=j=this.getMouseProjectionOnBall(b.clientX,b.clientY):e===this.STATE.ZOOM&&!this.noZoom?k=m=this.getMouseOnScreen(b.clientX,b.clientY):this.noPan||(o=p=this.getMouseOnScreen(b.clientX,b.clientY))}),!1);this.domElement.addEventListener("mouseup",c(this,function(b){b.preventDefault();b.stopPropagation();e=this.STATE.NONE}),!1);window.addEventListener("keydown",c(this,function(b){if(e===this.STATE.NONE){if(b.keyCode===this.keys[this.STATE.ROTATE])e=
this.STATE.ROTATE;else if(b.keyCode===this.keys[this.STATE.ZOOM]&&!this.noZoom)e=this.STATE.ZOOM;else if(b.keyCode===this.keys[this.STATE.PAN]&&!this.noPan)e=this.STATE.PAN;e!==this.STATE.NONE&&(d=!0)}}),!1);window.addEventListener("keyup",c(this,function(){if(e!==this.STATE.NONE)e=this.STATE.NONE}),!1)};THREE.TrackballCamera.prototype=new THREE.Camera;THREE.TrackballCamera.prototype.constructor=THREE.TrackballCamera;THREE.TrackballCamera.prototype.supr=THREE.Camera.prototype;
THREE.TrackballCamera.prototype.STATE={NONE:-1,ROTATE:0,ZOOM:1,PAN:2};
THREE.Cube=function(b,c,d,e,g,f,j,k,m){function o(b,c,d,j,k,m,n,o){var t,u,v=e||1,A=g||1,h=k/2,ca=m/2,O=p.vertices.length;if(b=="x"&&c=="y"||b=="y"&&c=="x")t="z";else if(b=="x"&&c=="z"||b=="z"&&c=="x")t="y",A=f||1;else if(b=="z"&&c=="y"||b=="y"&&c=="z")t="x",v=f||1;var V=v+1,J=A+1;k/=v;var S=m/A;for(u=0;u<J;u++)for(m=0;m<V;m++){var $=new THREE.Vector3;$[b]=(m*k-h)*d;$[c]=(u*S-ca)*j;$[t]=n;p.vertices.push(new THREE.Vertex($))}for(u=0;u<A;u++)for(m=0;m<v;m++)p.faces.push(new THREE.Face4(m+V*u+O,m+V*
(u+1)+O,m+1+V*(u+1)+O,m+1+V*u+O,null,null,o)),p.faceVertexUvs[0].push([new THREE.UV(m/v,u/A),new THREE.UV(m/v,(u+1)/A),new THREE.UV((m+1)/v,(u+1)/A),new THREE.UV((m+1)/v,u/A)])}THREE.Geometry.call(this);var p=this,n=b/2,u=c/2,t=d/2,k=k?-1:1;if(j!==void 0)if(j instanceof Array)this.materials=j;else{this.materials=[];for(var v=0;v<6;v++)this.materials.push([j])}else this.materials=[];this.sides={px:!0,nx:!0,py:!0,ny:!0,pz:!0,nz:!0};if(m!=void 0)for(var A in m)this.sides[A]!=void 0&&(this.sides[A]=m[A]);
this.sides.px&&o("z","y",1*k,-1,d,c,-n,this.materials[0]);this.sides.nx&&o("z","y",-1*k,-1,d,c,n,this.materials[1]);this.sides.py&&o("x","z",1*k,1,b,d,u,this.materials[2]);this.sides.ny&&o("x","z",1*k,-1,b,d,-u,this.materials[3]);this.sides.pz&&o("x","y",1*k,-1,b,c,t,this.materials[4]);this.sides.nz&&o("x","y",-1*k,-1,b,c,-t,this.materials[5]);(function(){for(var b=[],c=[],d=0,e=p.vertices.length;d<e;d++){for(var f=p.vertices[d],g=!1,j=0,k=b.length;j<k;j++){var m=b[j];if(f.position.x==m.position.x&&
f.position.y==m.position.y&&f.position.z==m.position.z){c[d]=j;g=!0;break}}if(!g)c[d]=b.length,b.push(new THREE.Vertex(f.position.clone()))}d=0;for(e=p.faces.length;d<e;d++)f=p.faces[d],f.a=c[f.a],f.b=c[f.b],f.c=c[f.c],f.d=c[f.d];p.vertices=b})();this.computeCentroids();this.computeFaceNormals()};THREE.Cube.prototype=new THREE.Geometry;THREE.Cube.prototype.constructor=THREE.Cube;
THREE.Cylinder=function(b,c,d,e,g,f){function j(b,c,d){k.vertices.push(new THREE.Vertex(new THREE.Vector3(b,c,d)))}THREE.Geometry.call(this);var k=this,m,o=Math.PI*2,p=e/2;for(m=0;m<b;m++)j(Math.sin(o*m/b)*c,Math.cos(o*m/b)*c,-p);for(m=0;m<b;m++)j(Math.sin(o*m/b)*d,Math.cos(o*m/b)*d,p);for(m=0;m<b;m++)k.faces.push(new THREE.Face4(m,m+b,b+(m+1)%b,(m+1)%b));if(d>0){j(0,0,-p-(f||0));for(m=b;m<b+b/2;m++)k.faces.push(new THREE.Face4(2*b,(2*m-2*b)%b,(2*m-2*b+1)%b,(2*m-2*b+2)%b))}if(c>0){j(0,0,p+(g||0));
for(m=b+b/2;m<2*b;m++)k.faces.push(new THREE.Face4(2*b+1,(2*m-2*b+2)%b+b,(2*m-2*b+1)%b+b,(2*m-2*b)%b+b))}m=0;for(b=this.faces.length;m<b;m++){var c=[],d=this.faces[m],g=this.vertices[d.a],f=this.vertices[d.b],p=this.vertices[d.c],n=this.vertices[d.d];c.push(new THREE.UV(0.5+Math.atan2(g.position.x,g.position.y)/o,0.5+g.position.z/e));c.push(new THREE.UV(0.5+Math.atan2(f.position.x,f.position.y)/o,0.5+f.position.z/e));c.push(new THREE.UV(0.5+Math.atan2(p.position.x,p.position.y)/o,0.5+p.position.z/
e));d instanceof THREE.Face4&&c.push(new THREE.UV(0.5+Math.atan2(n.position.x,n.position.y)/o,0.5+n.position.z/e));this.faceVertexUvs[0].push(c)}this.computeCentroids();this.computeFaceNormals()};THREE.Cylinder.prototype=new THREE.Geometry;THREE.Cylinder.prototype.constructor=THREE.Cylinder;
THREE.Icosahedron=function(b){function c(b,c,d){var e=Math.sqrt(b*b+c*c+d*d);return g.vertices.push(new THREE.Vertex(new THREE.Vector3(b/e,c/e,d/e)))-1}function d(b,c,d,e){e.faces.push(new THREE.Face3(b,c,d))}function e(b,d){var e=g.vertices[b].position,f=g.vertices[d].position;return c((e.x+f.x)/2,(e.y+f.y)/2,(e.z+f.z)/2)}var g=this,f=new THREE.Geometry,j;this.subdivisions=b||0;THREE.Geometry.call(this);b=(1+Math.sqrt(5))/2;c(-1,b,0);c(1,b,0);c(-1,-b,0);c(1,-b,0);c(0,-1,b);c(0,1,b);c(0,-1,-b);c(0,
1,-b);c(b,0,-1);c(b,0,1);c(-b,0,-1);c(-b,0,1);d(0,11,5,f);d(0,5,1,f);d(0,1,7,f);d(0,7,10,f);d(0,10,11,f);d(1,5,9,f);d(5,11,4,f);d(11,10,2,f);d(10,7,6,f);d(7,1,8,f);d(3,9,4,f);d(3,4,2,f);d(3,2,6,f);d(3,6,8,f);d(3,8,9,f);d(4,9,5,f);d(2,4,11,f);d(6,2,10,f);d(8,6,7,f);d(9,8,1,f);for(b=0;b<this.subdivisions;b++){j=new THREE.Geometry;for(var k in f.faces){var m=e(f.faces[k].a,f.faces[k].b),o=e(f.faces[k].b,f.faces[k].c),p=e(f.faces[k].c,f.faces[k].a);d(f.faces[k].a,m,p,j);d(f.faces[k].b,o,m,j);d(f.faces[k].c,
p,o,j);d(m,o,p,j)}f.faces=j.faces}g.faces=f.faces;delete f;delete j;this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.Icosahedron.prototype=new THREE.Geometry;THREE.Icosahedron.prototype.constructor=THREE.Icosahedron;
THREE.Lathe=function(b,c,d){THREE.Geometry.call(this);this.steps=c||12;this.angle=d||2*Math.PI;for(var c=this.angle/this.steps,d=[],e=[],g=[],f=[],j=(new THREE.Matrix4).setRotationZ(c),k=0;k<b.length;k++)this.vertices.push(new THREE.Vertex(b[k])),d[k]=b[k].clone(),e[k]=this.vertices.length-1;for(var m=0;m<=this.angle+0.001;m+=c){for(k=0;k<d.length;k++)m<this.angle?(d[k]=j.multiplyVector3(d[k].clone()),this.vertices.push(new THREE.Vertex(d[k])),g[k]=this.vertices.length-1):g=f;m==0&&(f=e);for(k=0;k<
e.length-1;k++)this.faces.push(new THREE.Face4(g[k],g[k+1],e[k+1],e[k])),this.faceVertexUvs[0].push([new THREE.UV(1-m/this.angle,k/b.length),new THREE.UV(1-m/this.angle,(k+1)/b.length),new THREE.UV(1-(m-c)/this.angle,(k+1)/b.length),new THREE.UV(1-(m-c)/this.angle,k/b.length)]);e=g;g=[]}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.Lathe.prototype=new THREE.Geometry;THREE.Lathe.prototype.constructor=THREE.Lathe;
THREE.Plane=function(b,c,d,e){THREE.Geometry.call(this);var g,f=b/2,j=c/2,d=d||1,e=e||1,k=d+1,m=e+1;b/=d;var o=c/e;for(g=0;g<m;g++)for(c=0;c<k;c++)this.vertices.push(new THREE.Vertex(new THREE.Vector3(c*b-f,-(g*o-j),0)));for(g=0;g<e;g++)for(c=0;c<d;c++)this.faces.push(new THREE.Face4(c+k*g,c+k*(g+1),c+1+k*(g+1),c+1+k*g)),this.faceVertexUvs[0].push([new THREE.UV(c/d,g/e),new THREE.UV(c/d,(g+1)/e),new THREE.UV((c+1)/d,(g+1)/e),new THREE.UV((c+1)/d,g/e)]);this.computeCentroids();this.computeFaceNormals()};
THREE.Plane.prototype=new THREE.Geometry;THREE.Plane.prototype.constructor=THREE.Plane;
THREE.Sphere=function(b,c,d){THREE.Geometry.call(this);for(var e,g=Math.PI,f=Math.max(3,c||8),j=Math.max(2,d||6),c=[],d=0;d<j+1;d++){e=d/j;var k=b*Math.cos(e*g),m=b*Math.sin(e*g),o=[],p=0;for(e=0;e<f;e++){var n=2*e/f,u=m*Math.sin(n*g),n=m*Math.cos(n*g);(d==0||d==j)&&e>0||(p=this.vertices.push(new THREE.Vertex(new THREE.Vector3(n,k,u)))-1);o.push(p)}c.push(o)}for(var t,v,A,g=c.length,d=0;d<g;d++)if(f=c[d].length,d>0)for(e=0;e<f;e++){o=e==f-1;j=c[d][o?0:e+1];k=c[d][o?f-1:e];m=c[d-1][o?f-1:e];o=c[d-
1][o?0:e+1];u=d/(g-1);t=(d-1)/(g-1);v=(e+1)/f;var n=e/f,p=new THREE.UV(1-v,u),u=new THREE.UV(1-n,u),n=new THREE.UV(1-n,t),B=new THREE.UV(1-v,t);d<c.length-1&&(t=this.vertices[j].position.clone(),v=this.vertices[k].position.clone(),A=this.vertices[m].position.clone(),t.normalize(),v.normalize(),A.normalize(),this.faces.push(new THREE.Face3(j,k,m,[new THREE.Vector3(t.x,t.y,t.z),new THREE.Vector3(v.x,v.y,v.z),new THREE.Vector3(A.x,A.y,A.z)])),this.faceVertexUvs[0].push([p,u,n]));d>1&&(t=this.vertices[j].position.clone(),
v=this.vertices[m].position.clone(),A=this.vertices[o].position.clone(),t.normalize(),v.normalize(),A.normalize(),this.faces.push(new THREE.Face3(j,m,o,[new THREE.Vector3(t.x,t.y,t.z),new THREE.Vector3(v.x,v.y,v.z),new THREE.Vector3(A.x,A.y,A.z)])),this.faceVertexUvs[0].push([p,n,B]))}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals();this.boundingSphere={radius:b}};THREE.Sphere.prototype=new THREE.Geometry;THREE.Sphere.prototype.constructor=THREE.Sphere;
THREE.Torus=function(b,c,d,e){THREE.Geometry.call(this);this.radius=b||100;this.tube=c||40;this.segmentsR=d||8;this.segmentsT=e||6;b=[];for(c=0;c<=this.segmentsR;++c)for(d=0;d<=this.segmentsT;++d){var e=d/this.segmentsT*2*Math.PI,g=c/this.segmentsR*2*Math.PI;this.vertices.push(new THREE.Vertex(new THREE.Vector3((this.radius+this.tube*Math.cos(g))*Math.cos(e),(this.radius+this.tube*Math.cos(g))*Math.sin(e),this.tube*Math.sin(g))));b.push([d/this.segmentsT,1-c/this.segmentsR])}for(c=1;c<=this.segmentsR;++c)for(d=
1;d<=this.segmentsT;++d){var e=(this.segmentsT+1)*c+d,g=(this.segmentsT+1)*c+d-1,f=(this.segmentsT+1)*(c-1)+d-1,j=(this.segmentsT+1)*(c-1)+d;this.faces.push(new THREE.Face4(e,g,f,j));this.faceVertexUvs[0].push([new THREE.UV(b[e][0],b[e][1]),new THREE.UV(b[g][0],b[g][1]),new THREE.UV(b[f][0],b[f][1]),new THREE.UV(b[j][0],b[j][1])])}delete b;this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.Torus.prototype=new THREE.Geometry;THREE.Torus.prototype.constructor=THREE.Torus;
THREE.TorusKnot=function(b,c,d,e,g,f,j){function k(b,c,d,e,f,g){c=d/e*b;d=Math.cos(c);return new THREE.Vector3(f*(2+d)*0.5*Math.cos(b),f*(2+d)*Math.sin(b)*0.5,g*f*Math.sin(c)*0.5)}THREE.Geometry.call(this);this.radius=b||200;this.tube=c||40;this.segmentsR=d||64;this.segmentsT=e||8;this.p=g||2;this.q=f||3;this.heightScale=j||1;this.grid=Array(this.segmentsR);d=new THREE.Vector3;e=new THREE.Vector3;f=new THREE.Vector3;for(b=0;b<this.segmentsR;++b){this.grid[b]=Array(this.segmentsT);for(c=0;c<this.segmentsT;++c){var m=
b/this.segmentsR*2*this.p*Math.PI,j=c/this.segmentsT*2*Math.PI,g=k(m,j,this.q,this.p,this.radius,this.heightScale),m=k(m+0.01,j,this.q,this.p,this.radius,this.heightScale);d.x=m.x-g.x;d.y=m.y-g.y;d.z=m.z-g.z;e.x=m.x+g.x;e.y=m.y+g.y;e.z=m.z+g.z;f.cross(d,e);e.cross(f,d);f.normalize();e.normalize();m=-this.tube*Math.cos(j);j=this.tube*Math.sin(j);g.x+=m*e.x+j*f.x;g.y+=m*e.y+j*f.y;g.z+=m*e.z+j*f.z;this.grid[b][c]=this.vertices.push(new THREE.Vertex(new THREE.Vector3(g.x,g.y,g.z)))-1}}for(b=0;b<this.segmentsR;++b)for(c=
0;c<this.segmentsT;++c){var e=(b+1)%this.segmentsR,f=(c+1)%this.segmentsT,g=this.grid[b][c],d=this.grid[e][c],e=this.grid[e][f],f=this.grid[b][f],j=new THREE.UV(b/this.segmentsR,c/this.segmentsT),m=new THREE.UV((b+1)/this.segmentsR,c/this.segmentsT),o=new THREE.UV((b+1)/this.segmentsR,(c+1)/this.segmentsT),p=new THREE.UV(b/this.segmentsR,(c+1)/this.segmentsT);this.faces.push(new THREE.Face4(g,d,e,f));this.faceVertexUvs[0].push([j,m,o,p])}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};
THREE.TorusKnot.prototype=new THREE.Geometry;THREE.TorusKnot.prototype.constructor=THREE.TorusKnot;THREE.Loader=function(b){this.statusDomElement=(this.showStatus=b)?THREE.Loader.prototype.addStatusElement():null;this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){}};
THREE.Loader.prototype={addStatusElement:function(){var b=document.createElement("div");b.style.position="absolute";b.style.right="0px";b.style.top="0px";b.style.fontSize="0.8em";b.style.textAlign="left";b.style.background="rgba(0,0,0,0.25)";b.style.color="#fff";b.style.width="120px";b.style.padding="0.5em 0.5em 0.5em 0.5em";b.style.zIndex=1E3;b.innerHTML="Loading ...";return b},updateProgress:function(b){var c="Loaded ";c+=b.total?(100*b.loaded/b.total).toFixed(0)+"%":(b.loaded/1E3).toFixed(2)+" KB";
this.statusDomElement.innerHTML=c},extractUrlbase:function(b){b=b.split("/");b.pop();return b.join("/")},init_materials:function(b,c,d){b.materials=[];for(var e=0;e<c.length;++e)b.materials[e]=[THREE.Loader.prototype.createMaterial(c[e],d)]},createMaterial:function(b,c){function d(b){b=Math.log(b)/Math.LN2;return Math.floor(b)==b}function e(b,c){var e=new Image;e.onload=function(){if(!d(this.width)||!d(this.height)){var c=Math.pow(2,Math.round(Math.log(this.width)/Math.LN2)),e=Math.pow(2,Math.round(Math.log(this.height)/
Math.LN2));b.image.width=c;b.image.height=e;b.image.getContext("2d").drawImage(this,0,0,c,e)}else b.image=this;b.needsUpdate=!0};e.src=c}var g,f,j;g="MeshLambertMaterial";f={color:15658734,opacity:1,map:null,lightMap:null,wireframe:b.wireframe};b.shading&&(b.shading=="Phong"?g="MeshPhongMaterial":b.shading=="Basic"&&(g="MeshBasicMaterial"));if(b.blending)if(b.blending=="Additive")f.blending=THREE.AdditiveBlending;else if(b.blending=="Subtractive")f.blending=THREE.SubtractiveBlending;else if(b.blending==
"Multiply")f.blending=THREE.MultiplyBlending;if(b.transparent!==void 0||b.opacity<1)f.transparent=b.transparent;if(b.depthTest!==void 0)f.depthTest=b.depthTest;if(b.vertexColors!==void 0)if(b.vertexColors=="face")f.vertexColors=THREE.FaceColors;else if(b.vertexColors)f.vertexColors=THREE.VertexColors;if(b.mapDiffuse&&c)j=document.createElement("canvas"),f.map=new THREE.Texture(j),f.map.sourceFile=b.mapDiffuse,e(f.map,c+"/"+b.mapDiffuse);else if(b.colorDiffuse)j=(b.colorDiffuse[0]*255<<16)+(b.colorDiffuse[1]*
255<<8)+b.colorDiffuse[2]*255,f.color=j,f.opacity=b.transparency;else if(b.DbgColor)f.color=b.DbgColor;if(b.mapLightmap&&c)j=document.createElement("canvas"),f.lightMap=new THREE.Texture(j),f.lightMap.sourceFile=b.mapLightmap,e(f.lightMap,c+"/"+b.mapLightmap);return new THREE[g](f)}};THREE.JSONLoader=function(b){THREE.Loader.call(this,b)};THREE.JSONLoader.prototype=new THREE.Loader;THREE.JSONLoader.prototype.constructor=THREE.JSONLoader;THREE.JSONLoader.prototype.supr=THREE.Loader.prototype;
THREE.JSONLoader.prototype.load=function(b){var c=this,d=b.model,e=b.callback,g=b.texture_path?b.texture_path:this.extractUrlbase(d),b=new Worker(d);b.onmessage=function(b){c.createModel(b.data,e,g);c.onLoadComplete()};this.onLoadStart();b.postMessage((new Date).getTime())};
THREE.JSONLoader.prototype.createModel=function(b,c,d){var e=new THREE.Geometry,g=b.scale!==void 0?1/b.scale:1;this.init_materials(e,b.materials,d);(function(c){if(b.version===void 0||b.version!=2)console.error("Deprecated file format.");else{var d,g,m,o,p,n,u,t,v,A,B,y,E,x,F=b.faces;n=b.vertices;var D=b.normals,z=b.colors,N=0;for(d=0;d<b.uvs.length;d++)b.uvs[d].length&&N++;for(d=0;d<N;d++)e.faceUvs[d]=[],e.faceVertexUvs[d]=[];o=0;for(p=n.length;o<p;)u=new THREE.Vertex,u.position.x=n[o++]*c,u.position.y=
n[o++]*c,u.position.z=n[o++]*c,e.vertices.push(u);o=0;for(p=F.length;o<p;){c=F[o++];n=c&1;m=c&2;d=c&4;g=c&8;t=c&16;u=c&32;A=c&64;c&=128;n?(B=new THREE.Face4,B.a=F[o++],B.b=F[o++],B.c=F[o++],B.d=F[o++],n=4):(B=new THREE.Face3,B.a=F[o++],B.b=F[o++],B.c=F[o++],n=3);if(m)m=F[o++],B.materials=e.materials[m];m=e.faces.length;if(d)for(d=0;d<N;d++)y=b.uvs[d],v=F[o++],x=y[v*2],v=y[v*2+1],e.faceUvs[d][m]=new THREE.UV(x,v);if(g)for(d=0;d<N;d++){y=b.uvs[d];E=[];for(g=0;g<n;g++)v=F[o++],x=y[v*2],v=y[v*2+1],E[g]=
new THREE.UV(x,v);e.faceVertexUvs[d][m]=E}if(t)t=F[o++]*3,g=new THREE.Vector3,g.x=D[t++],g.y=D[t++],g.z=D[t],B.normal=g;if(u)for(d=0;d<n;d++)t=F[o++]*3,g=new THREE.Vector3,g.x=D[t++],g.y=D[t++],g.z=D[t],B.vertexNormals.push(g);if(A)u=F[o++],u=new THREE.Color(z[u]),B.color=u;if(c)for(d=0;d<n;d++)u=F[o++],u=new THREE.Color(z[u]),B.vertexColors.push(u);e.faces.push(B)}}})(g);(function(){var c,d,g,m;if(b.skinWeights){c=0;for(d=b.skinWeights.length;c<d;c+=2)g=b.skinWeights[c],m=b.skinWeights[c+1],e.skinWeights.push(new THREE.Vector4(g,
m,0,0))}if(b.skinIndices){c=0;for(d=b.skinIndices.length;c<d;c+=2)g=b.skinIndices[c],m=b.skinIndices[c+1],e.skinIndices.push(new THREE.Vector4(g,m,0,0))}e.bones=b.bones;e.animation=b.animation})();(function(c){if(b.morphTargets!==void 0){var d,g,m,o,p,n,u,t,v;d=0;for(g=b.morphTargets.length;d<g;d++){e.morphTargets[d]={};e.morphTargets[d].name=b.morphTargets[d].name;e.morphTargets[d].vertices=[];t=e.morphTargets[d].vertices;v=b.morphTargets[d].vertices;m=0;for(o=v.length;m<o;m+=3)p=v[m]*c,n=v[m+1]*
c,u=v[m+2]*c,t.push(new THREE.Vertex(new THREE.Vector3(p,n,u)))}}if(b.morphColors!==void 0){d=0;for(g=b.morphColors.length;d<g;d++){e.morphColors[d]={};e.morphColors[d].name=b.morphColors[d].name;e.morphColors[d].colors=[];o=e.morphColors[d].colors;p=b.morphColors[d].colors;c=0;for(m=p.length;c<m;c+=3)n=new THREE.Color(16755200),n.setRGB(p[c],p[c+1],p[c+2]),o.push(n)}}})(g);(function(){if(b.edges!==void 0){var c,d,g;for(c=0;c<b.edges.length;c+=2)d=b.edges[c],g=b.edges[c+1],e.edges.push(new THREE.Edge(e.vertices[d],
e.vertices[g],d,g))}})();e.computeCentroids();e.computeFaceNormals();c(e)};THREE.BinaryLoader=function(b){THREE.Loader.call(this,b)};THREE.BinaryLoader.prototype=new THREE.Loader;THREE.BinaryLoader.prototype.constructor=THREE.BinaryLoader;THREE.BinaryLoader.prototype.supr=THREE.Loader.prototype;
THREE.BinaryLoader.prototype={load:function(b){var c=b.model,d=b.callback,e=b.texture_path?b.texture_path:THREE.Loader.prototype.extractUrlbase(c),g=b.bin_path?b.bin_path:THREE.Loader.prototype.extractUrlbase(c),b=(new Date).getTime(),c=new Worker(c),f=this.showProgress?THREE.Loader.prototype.updateProgress:null;c.onmessage=function(b){THREE.BinaryLoader.prototype.loadAjaxBuffers(b.data.buffers,b.data.materials,d,g,e,f)};c.onerror=function(b){alert("worker.onerror: "+b.message+"\n"+b.data);b.preventDefault()};
c.postMessage(b)},loadAjaxBuffers:function(b,c,d,e,g,f){var j=new XMLHttpRequest,k=e+"/"+b,m=0;j.onreadystatechange=function(){j.readyState==4?j.status==200||j.status==0?THREE.BinaryLoader.prototype.createBinModel(j.responseText,d,g,c):alert("Couldn't load ["+k+"] ["+j.status+"]"):j.readyState==3?f&&(m==0&&(m=j.getResponseHeader("Content-Length")),f({total:m,loaded:j.responseText.length})):j.readyState==2&&(m=j.getResponseHeader("Content-Length"))};j.open("GET",k,!0);j.overrideMimeType("text/plain; charset=x-user-defined");
j.setRequestHeader("Content-Type","text/plain");j.send(null)},createBinModel:function(b,c,d,e){var g=function(c){function d(b,c){var e=p(b,c),g=p(b,c+1),f=p(b,c+2),h=p(b,c+3),j=(h<<1&255|f>>7)-127;e|=(f&127)<<16|g<<8;if(e==0&&j==-127)return 0;return(1-2*(h>>7))*(1+e*Math.pow(2,-23))*Math.pow(2,j)}function g(b,c){var d=p(b,c),e=p(b,c+1),f=p(b,c+2);return(p(b,c+3)<<24)+(f<<16)+(e<<8)+d}function m(b,c){var d=p(b,c);return(p(b,c+1)<<8)+d}function o(b,c){var d=p(b,c);return d>127?d-256:d}function p(b,
c){return b.charCodeAt(c)&255}function n(c){var d,e,f;d=g(b,c);e=g(b,c+z);f=g(b,c+N);c=m(b,c+H);THREE.BinaryLoader.prototype.f3(y,d,e,f,c)}function u(c){var d,e,f,h,j,n;d=g(b,c);e=g(b,c+z);f=g(b,c+N);h=m(b,c+H);j=g(b,c+L);n=g(b,c+I);c=g(b,c+W);THREE.BinaryLoader.prototype.f3n(y,F,d,e,f,h,j,n,c)}function t(c){var d,e,f,j;d=g(b,c);e=g(b,c+h);f=g(b,c+ca);j=g(b,c+O);c=m(b,c+V);THREE.BinaryLoader.prototype.f4(y,d,e,f,j,c)}function v(c){var d,e,f,j,n,o,p,t;d=g(b,c);e=g(b,c+h);f=g(b,c+ca);j=g(b,c+O);n=m(b,
c+V);o=g(b,c+J);p=g(b,c+S);t=g(b,c+$);c=g(b,c+aa);THREE.BinaryLoader.prototype.f4n(y,F,d,e,f,j,n,o,p,t,c)}function A(c){var d,e;d=g(b,c);e=g(b,c+P);c=g(b,c+Y);THREE.BinaryLoader.prototype.uv3(y.faceVertexUvs[0],D[d*2],D[d*2+1],D[e*2],D[e*2+1],D[c*2],D[c*2+1])}function B(c){var d,e,f;d=g(b,c);e=g(b,c+da);f=g(b,c+fa);c=g(b,c+ka);THREE.BinaryLoader.prototype.uv4(y.faceVertexUvs[0],D[d*2],D[d*2+1],D[e*2],D[e*2+1],D[f*2],D[f*2+1],D[c*2],D[c*2+1])}var y=this,E=0,x,F=[],D=[],z,N,H,L,I,W,h,ca,O,V,J,S,$,aa,
P,Y,da,fa,ka,Z,K,ga,X,R,T;THREE.Geometry.call(this);THREE.Loader.prototype.init_materials(y,e,c);x={signature:b.substr(E,8),header_bytes:p(b,E+8),vertex_coordinate_bytes:p(b,E+9),normal_coordinate_bytes:p(b,E+10),uv_coordinate_bytes:p(b,E+11),vertex_index_bytes:p(b,E+12),normal_index_bytes:p(b,E+13),uv_index_bytes:p(b,E+14),material_index_bytes:p(b,E+15),nvertices:g(b,E+16),nnormals:g(b,E+16+4),nuvs:g(b,E+16+8),ntri_flat:g(b,E+16+12),ntri_smooth:g(b,E+16+16),ntri_flat_uv:g(b,E+16+20),ntri_smooth_uv:g(b,
E+16+24),nquad_flat:g(b,E+16+28),nquad_smooth:g(b,E+16+32),nquad_flat_uv:g(b,E+16+36),nquad_smooth_uv:g(b,E+16+40)};E+=x.header_bytes;z=x.vertex_index_bytes;N=x.vertex_index_bytes*2;H=x.vertex_index_bytes*3;L=x.vertex_index_bytes*3+x.material_index_bytes;I=x.vertex_index_bytes*3+x.material_index_bytes+x.normal_index_bytes;W=x.vertex_index_bytes*3+x.material_index_bytes+x.normal_index_bytes*2;h=x.vertex_index_bytes;ca=x.vertex_index_bytes*2;O=x.vertex_index_bytes*3;V=x.vertex_index_bytes*4;J=x.vertex_index_bytes*
4+x.material_index_bytes;S=x.vertex_index_bytes*4+x.material_index_bytes+x.normal_index_bytes;$=x.vertex_index_bytes*4+x.material_index_bytes+x.normal_index_bytes*2;aa=x.vertex_index_bytes*4+x.material_index_bytes+x.normal_index_bytes*3;P=x.uv_index_bytes;Y=x.uv_index_bytes*2;da=x.uv_index_bytes;fa=x.uv_index_bytes*2;ka=x.uv_index_bytes*3;c=x.vertex_index_bytes*3+x.material_index_bytes;T=x.vertex_index_bytes*4+x.material_index_bytes;Z=x.ntri_flat*c;K=x.ntri_smooth*(c+x.normal_index_bytes*3);ga=x.ntri_flat_uv*
(c+x.uv_index_bytes*3);X=x.ntri_smooth_uv*(c+x.normal_index_bytes*3+x.uv_index_bytes*3);R=x.nquad_flat*T;c=x.nquad_smooth*(T+x.normal_index_bytes*4);T=x.nquad_flat_uv*(T+x.uv_index_bytes*4);E+=function(c){for(var e,f,g,h=x.vertex_coordinate_bytes*3,k=c+x.nvertices*h;c<k;c+=h)e=d(b,c),f=d(b,c+x.vertex_coordinate_bytes),g=d(b,c+x.vertex_coordinate_bytes*2),THREE.BinaryLoader.prototype.v(y,e,f,g);return x.nvertices*h}(E);E+=function(c){for(var d,e,f,g=x.normal_coordinate_bytes*3,h=c+x.nnormals*g;c<h;c+=
g)d=o(b,c),e=o(b,c+x.normal_coordinate_bytes),f=o(b,c+x.normal_coordinate_bytes*2),F.push(d/127,e/127,f/127);return x.nnormals*g}(E);E+=function(c){for(var e,f,g=x.uv_coordinate_bytes*2,h=c+x.nuvs*g;c<h;c+=g)e=d(b,c),f=d(b,c+x.uv_coordinate_bytes),D.push(e,f);return x.nuvs*g}(E);Z=E+Z;K=Z+K;ga=K+ga;X=ga+X;R=X+R;c=R+c;T=c+T;(function(b){var c,d=x.vertex_index_bytes*3+x.material_index_bytes,e=d+x.uv_index_bytes*3,f=b+x.ntri_flat_uv*e;for(c=b;c<f;c+=e)n(c),A(c+d);return f-b})(K);(function(b){var c,d=
x.vertex_index_bytes*3+x.material_index_bytes+x.normal_index_bytes*3,e=d+x.uv_index_bytes*3,f=b+x.ntri_smooth_uv*e;for(c=b;c<f;c+=e)u(c),A(c+d);return f-b})(ga);(function(b){var c,d=x.vertex_index_bytes*4+x.material_index_bytes,e=d+x.uv_index_bytes*4,f=b+x.nquad_flat_uv*e;for(c=b;c<f;c+=e)t(c),B(c+d);return f-b})(c);(function(b){var c,d=x.vertex_index_bytes*4+x.material_index_bytes+x.normal_index_bytes*4,e=d+x.uv_index_bytes*4,f=b+x.nquad_smooth_uv*e;for(c=b;c<f;c+=e)v(c),B(c+d);return f-b})(T);(function(b){var c,
d=x.vertex_index_bytes*3+x.material_index_bytes,e=b+x.ntri_flat*d;for(c=b;c<e;c+=d)n(c);return e-b})(E);(function(b){var c,d=x.vertex_index_bytes*3+x.material_index_bytes+x.normal_index_bytes*3,e=b+x.ntri_smooth*d;for(c=b;c<e;c+=d)u(c);return e-b})(Z);(function(b){var c,d=x.vertex_index_bytes*4+x.material_index_bytes,e=b+x.nquad_flat*d;for(c=b;c<e;c+=d)t(c);return e-b})(X);(function(b){var c,d=x.vertex_index_bytes*4+x.material_index_bytes+x.normal_index_bytes*4,e=b+x.nquad_smooth*d;for(c=b;c<e;c+=
d)v(c);return e-b})(R);this.computeCentroids();this.computeFaceNormals()};g.prototype=new THREE.Geometry;g.prototype.constructor=g;c(new g(d))},v:function(b,c,d,e){b.vertices.push(new THREE.Vertex(new THREE.Vector3(c,d,e)))},f3:function(b,c,d,e,g){b.faces.push(new THREE.Face3(c,d,e,null,null,b.materials[g]))},f4:function(b,c,d,e,g,f){b.faces.push(new THREE.Face4(c,d,e,g,null,null,b.materials[f]))},f3n:function(b,c,d,e,g,f,j,k,m){var f=b.materials[f],o=c[k*3],p=c[k*3+1],k=c[k*3+2],n=c[m*3],u=c[m*3+
1],m=c[m*3+2];b.faces.push(new THREE.Face3(d,e,g,[new THREE.Vector3(c[j*3],c[j*3+1],c[j*3+2]),new THREE.Vector3(o,p,k),new THREE.Vector3(n,u,m)],null,f))},f4n:function(b,c,d,e,g,f,j,k,m,o,p){var j=b.materials[j],n=c[m*3],u=c[m*3+1],m=c[m*3+2],t=c[o*3],v=c[o*3+1],o=c[o*3+2],A=c[p*3],B=c[p*3+1],p=c[p*3+2];b.faces.push(new THREE.Face4(d,e,g,f,[new THREE.Vector3(c[k*3],c[k*3+1],c[k*3+2]),new THREE.Vector3(n,u,m),new THREE.Vector3(t,v,o),new THREE.Vector3(A,B,p)],null,j))},uv3:function(b,c,d,e,g,f,j){var k=
[];k.push(new THREE.UV(c,d));k.push(new THREE.UV(e,g));k.push(new THREE.UV(f,j));b.push(k)},uv4:function(b,c,d,e,g,f,j,k,m){var o=[];o.push(new THREE.UV(c,d));o.push(new THREE.UV(e,g));o.push(new THREE.UV(f,j));o.push(new THREE.UV(k,m));b.push(o)}};THREE.SceneLoader=function(){this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){};this.callbackSync=function(){};this.callbackProgress=function(){}};
THREE.SceneLoader.prototype={load:function(b,c){var d=this,e=new Worker(b);e.postMessage(0);var g=THREE.Loader.prototype.extractUrlbase(b);e.onmessage=function(b){function e(b,c){return c=="relativeToHTML"?b:g+"/"+b}function k(){for(t in I.objects)if(!J.objects[t])if(E=I.objects[t],E.geometry!==void 0){if(z=J.geometries[E.geometry]){L=[];for(aa=0;aa<E.materials.length;aa++)L[aa]=J.materials[E.materials[aa]];x=E.position;r=E.rotation;q=E.quaternion;s=E.scale;q=0;L.length==0&&(L[0]=new THREE.MeshFaceMaterial);
L.length>1&&(L=[new THREE.MeshFaceMaterial]);object=new THREE.Mesh(z,L);object.name=t;object.position.set(x[0],x[1],x[2]);q?(object.quaternion.set(q[0],q[1],q[2],q[3]),object.useQuaternion=!0):object.rotation.set(r[0],r[1],r[2]);object.scale.set(s[0],s[1],s[2]);object.visible=E.visible;J.scene.addObject(object);J.objects[t]=object;if(E.meshCollider){var b=THREE.CollisionUtils.MeshColliderWBox(object);J.scene.collisions.colliders.push(b)}if(E.castsShadow)b=new THREE.ShadowVolume(z),J.scene.addChild(b),
b.position=object.position,b.rotation=object.rotation,b.scale=object.scale;E.trigger&&E.trigger.toLowerCase()!="none"&&(b={type:E.trigger,object:E},J.triggers[object.name]=b)}}else x=E.position,r=E.rotation,q=E.quaternion,s=E.scale,q=0,object=new THREE.Object3D,object.name=t,object.position.set(x[0],x[1],x[2]),q?(object.quaternion.set(q[0],q[1],q[2],q[3]),object.useQuaternion=!0):object.rotation.set(r[0],r[1],r[2]),object.scale.set(s[0],s[1],s[2]),object.visible=E.visible!==void 0?E.visible:!1,J.scene.addObject(object),
J.objects[t]=object,J.empties[t]=object,E.trigger&&E.trigger.toLowerCase()!="none"&&(b={type:E.trigger,object:E},J.triggers[object.name]=b)}function m(b){return function(c){J.geometries[b]=c;k();h-=1;d.onLoadComplete();p()}}function o(b){return function(c){J.geometries[b]=c}}function p(){d.callbackProgress({totalModels:O,totalTextures:V,loadedModels:O-h,loadedTextures:V-ca},J);d.onLoadProgress();h==0&&ca==0&&c(J)}var n,u,t,v,A,B,y,E,x,F,D,z,N,H,L,I,W,h,ca,O,V,J;I=b.data;b=new THREE.BinaryLoader;W=
new THREE.JSONLoader;ca=h=0;J={scene:new THREE.Scene,geometries:{},materials:{},textures:{},objects:{},cameras:{},lights:{},fogs:{},triggers:{},empties:{}};var S=!1;for(t in I.objects)if(E=I.objects[t],E.meshCollider){S=!0;break}if(S)J.scene.collisions=new THREE.CollisionSystem;if(I.transform){S=I.transform.position;F=I.transform.rotation;var $=I.transform.scale;S&&J.scene.position.set(S[0],S[1],S[2]);F&&J.scene.rotation.set(F[0],F[1],F[2]);$&&J.scene.scale.set($[0],$[1],$[2]);(S||F||$)&&J.scene.updateMatrix()}S=
function(){ca-=1;p();d.onLoadComplete()};for(A in I.cameras){F=I.cameras[A];if(F.type=="perspective")N=new THREE.Camera(F.fov,F.aspect,F.near,F.far);else if(F.type=="ortho")N=new THREE.Camera,N.projectionMatrix=THREE.Matrix4.makeOrtho(F.left,F.right,F.top,F.bottom,F.near,F.far);x=F.position;F=F.target;N.position.set(x[0],x[1],x[2]);N.target.position.set(F[0],F[1],F[2]);J.cameras[A]=N}for(v in I.lights){A=I.lights[v];N=A.color!==void 0?A.color:16777215;F=A.intensity!==void 0?A.intensity:1;if(A.type==
"directional")x=A.direction,light=new THREE.DirectionalLight(N,F),light.position.set(x[0],x[1],x[2]),light.position.normalize();else if(A.type=="point")x=A.position,light=new THREE.PointLight(N,F),light.position.set(x[0],x[1],x[2]);J.scene.addLight(light);J.lights[v]=light}for(B in I.fogs)v=I.fogs[B],v.type=="linear"?H=new THREE.Fog(0,v.near,v.far):v.type=="exp2"&&(H=new THREE.FogExp2(0,v.density)),F=v.color,H.color.setRGB(F[0],F[1],F[2]),J.fogs[B]=H;if(J.cameras&&I.defaults.camera)J.currentCamera=
J.cameras[I.defaults.camera];if(J.fogs&&I.defaults.fog)J.scene.fog=J.fogs[I.defaults.fog];F=I.defaults.bgcolor;J.bgColor=new THREE.Color;J.bgColor.setRGB(F[0],F[1],F[2]);J.bgColorAlpha=I.defaults.bgalpha;for(n in I.geometries)if(B=I.geometries[n],B.type=="bin_mesh"||B.type=="ascii_mesh")h+=1,d.onLoadStart();O=h;for(n in I.geometries)B=I.geometries[n],B.type=="cube"?(z=new THREE.Cube(B.width,B.height,B.depth,B.segmentsWidth,B.segmentsHeight,B.segmentsDepth,null,B.flipped,B.sides),J.geometries[n]=z):
B.type=="plane"?(z=new THREE.Plane(B.width,B.height,B.segmentsWidth,B.segmentsHeight),J.geometries[n]=z):B.type=="sphere"?(z=new THREE.Sphere(B.radius,B.segmentsWidth,B.segmentsHeight),J.geometries[n]=z):B.type=="cylinder"?(z=new THREE.Cylinder(B.numSegs,B.topRad,B.botRad,B.height,B.topOffset,B.botOffset),J.geometries[n]=z):B.type=="torus"?(z=new THREE.Torus(B.radius,B.tube,B.segmentsR,B.segmentsT),J.geometries[n]=z):B.type=="icosahedron"?(z=new THREE.Icosahedron(B.subdivisions),J.geometries[n]=z):
B.type=="bin_mesh"?b.load({model:e(B.url,I.urlBaseType),callback:m(n)}):B.type=="ascii_mesh"?W.load({model:e(B.url,I.urlBaseType),callback:m(n)}):B.type=="embedded_mesh"&&(B=I.embeds[B.id])&&W.createModel(B,o(n),"");for(y in I.textures)if(n=I.textures[y],n.url instanceof Array){ca+=n.url.length;for(b=0;b<n.url.length;b++)d.onLoadStart()}else ca+=1,d.onLoadStart();V=ca;for(y in I.textures){n=I.textures[y];if(n.mapping!=void 0&&THREE[n.mapping]!=void 0)n.mapping=new THREE[n.mapping];if(n.url instanceof
Array){for(var b=[],aa=0;aa<n.url.length;aa++)b[aa]=e(n.url[aa],I.urlBaseType);b=THREE.ImageUtils.loadTextureCube(b,n.mapping,S)}else{b=THREE.ImageUtils.loadTexture(e(n.url,I.urlBaseType),n.mapping,S);if(THREE[n.minFilter]!=void 0)b.minFilter=THREE[n.minFilter];if(THREE[n.magFilter]!=void 0)b.magFilter=THREE[n.magFilter]}J.textures[y]=b}for(u in I.materials){y=I.materials[u];for(D in y.parameters)if(D=="envMap"||D=="map"||D=="lightMap")y.parameters[D]=J.textures[y.parameters[D]];else if(D=="shading")y.parameters[D]=
y.parameters[D]=="flat"?THREE.FlatShading:THREE.SmoothShading;else if(D=="blending")y.parameters[D]=THREE[y.parameters[D]]?THREE[y.parameters[D]]:THREE.NormalBlending;else if(D=="combine")y.parameters[D]=y.parameters[D]=="MixOperation"?THREE.MixOperation:THREE.MultiplyOperation;else if(D=="vertexColors")if(y.parameters[D]=="face")y.parameters[D]=THREE.FaceColors;else if(y.parameters[D])y.parameters[D]=THREE.VertexColors;if(y.parameters.opacity!==void 0&&y.parameters.opacity<1)y.parameters.transparent=
!0;y=new THREE[y.type](y.parameters);J.materials[u]=y}k();d.callbackSync(J)}}};
THREE.MarchingCubes=function(b,c){THREE.Object3D.call(this);this.materials=c instanceof Array?c:[c];this.init=function(b){this.isolation=80;this.size=b;this.size2=this.size*this.size;this.size3=this.size2*this.size;this.halfsize=this.size/2;this.delta=2/this.size;this.yd=this.size;this.zd=this.size2;this.field=new Float32Array(this.size3);this.normal_cache=new Float32Array(this.size3*3);this.vlist=new Float32Array(36);this.nlist=new Float32Array(36);this.firstDraw=!0;this.maxCount=4096;this.count=
0;this.hasNormal=this.hasPos=!1;this.positionArray=new Float32Array(this.maxCount*3);this.normalArray=new Float32Array(this.maxCount*3)};this.lerp=function(b,c,g){return b+(c-b)*g};this.VIntX=function(b,c,g,f,j,k,m,o,p,n){j=(j-p)/(n-p);p=this.normal_cache;c[f]=k+j*this.delta;c[f+1]=m;c[f+2]=o;g[f]=this.lerp(p[b],p[b+3],j);g[f+1]=this.lerp(p[b+1],p[b+4],j);g[f+2]=this.lerp(p[b+2],p[b+5],j)};this.VIntY=function(b,c,g,f,j,k,m,o,p,n){j=(j-p)/(n-p);p=this.normal_cache;c[f]=k;c[f+1]=m+j*this.delta;c[f+
2]=o;c=b+this.yd*3;g[f]=this.lerp(p[b],p[c],j);g[f+1]=this.lerp(p[b+1],p[c+1],j);g[f+2]=this.lerp(p[b+2],p[c+2],j)};this.VIntZ=function(b,c,g,f,j,k,m,o,p,n){j=(j-p)/(n-p);p=this.normal_cache;c[f]=k;c[f+1]=m;c[f+2]=o+j*this.delta;c=b+this.zd*3;g[f]=this.lerp(p[b],p[c],j);g[f+1]=this.lerp(p[b+1],p[c+1],j);g[f+2]=this.lerp(p[b+2],p[c+2],j)};this.compNorm=function(b){var c=b*3;this.normal_cache[c]==0&&(this.normal_cache[c]=this.field[b-1]-this.field[b+1],this.normal_cache[c+1]=this.field[b-this.yd]-this.field[b+
this.yd],this.normal_cache[c+2]=this.field[b-this.zd]-this.field[b+this.zd])};this.polygonize=function(b,c,g,f,j,k){var m=f+1,o=f+this.yd,p=f+this.zd,n=m+this.yd,u=m+this.zd,t=f+this.yd+this.zd,v=m+this.yd+this.zd,A=0,B=this.field[f],y=this.field[m],E=this.field[o],x=this.field[n],F=this.field[p],D=this.field[u],z=this.field[t],N=this.field[v];B<j&&(A|=1);y<j&&(A|=2);E<j&&(A|=8);x<j&&(A|=4);F<j&&(A|=16);D<j&&(A|=32);z<j&&(A|=128);N<j&&(A|=64);var H=THREE.edgeTable[A];if(H==0)return 0;var L=this.delta,
I=b+L,W=c+L,L=g+L;H&1&&(this.compNorm(f),this.compNorm(m),this.VIntX(f*3,this.vlist,this.nlist,0,j,b,c,g,B,y));H&2&&(this.compNorm(m),this.compNorm(n),this.VIntY(m*3,this.vlist,this.nlist,3,j,I,c,g,y,x));H&4&&(this.compNorm(o),this.compNorm(n),this.VIntX(o*3,this.vlist,this.nlist,6,j,b,W,g,E,x));H&8&&(this.compNorm(f),this.compNorm(o),this.VIntY(f*3,this.vlist,this.nlist,9,j,b,c,g,B,E));H&16&&(this.compNorm(p),this.compNorm(u),this.VIntX(p*3,this.vlist,this.nlist,12,j,b,c,L,F,D));H&32&&(this.compNorm(u),
this.compNorm(v),this.VIntY(u*3,this.vlist,this.nlist,15,j,I,c,L,D,N));H&64&&(this.compNorm(t),this.compNorm(v),this.VIntX(t*3,this.vlist,this.nlist,18,j,b,W,L,z,N));H&128&&(this.compNorm(p),this.compNorm(t),this.VIntY(p*3,this.vlist,this.nlist,21,j,b,c,L,F,z));H&256&&(this.compNorm(f),this.compNorm(p),this.VIntZ(f*3,this.vlist,this.nlist,24,j,b,c,g,B,F));H&512&&(this.compNorm(m),this.compNorm(u),this.VIntZ(m*3,this.vlist,this.nlist,27,j,I,c,g,y,D));H&1024&&(this.compNorm(n),this.compNorm(v),this.VIntZ(n*
3,this.vlist,this.nlist,30,j,I,W,g,x,N));H&2048&&(this.compNorm(o),this.compNorm(t),this.VIntZ(o*3,this.vlist,this.nlist,33,j,b,W,g,E,z));A<<=4;for(j=f=0;THREE.triTable[A+j]!=-1;)b=A+j,c=b+1,g=b+2,this.posnormtriv(this.vlist,this.nlist,3*THREE.triTable[b],3*THREE.triTable[c],3*THREE.triTable[g],k),j+=3,f++;return f};this.posnormtriv=function(b,c,g,f,j,k){var m=this.count*3;this.positionArray[m]=b[g];this.positionArray[m+1]=b[g+1];this.positionArray[m+2]=b[g+2];this.positionArray[m+3]=b[f];this.positionArray[m+
4]=b[f+1];this.positionArray[m+5]=b[f+2];this.positionArray[m+6]=b[j];this.positionArray[m+7]=b[j+1];this.positionArray[m+8]=b[j+2];this.normalArray[m]=c[g];this.normalArray[m+1]=c[g+1];this.normalArray[m+2]=c[g+2];this.normalArray[m+3]=c[f];this.normalArray[m+4]=c[f+1];this.normalArray[m+5]=c[f+2];this.normalArray[m+6]=c[j];this.normalArray[m+7]=c[j+1];this.normalArray[m+8]=c[j+2];this.hasNormal=this.hasPos=!0;this.count+=3;this.count>=this.maxCount-3&&k(this)};this.begin=function(){this.count=0;
this.hasNormal=this.hasPos=!1};this.end=function(b){if(this.count!=0){for(var c=this.count*3;c<this.positionArray.length;c++)this.positionArray[c]=0;b(this)}};this.addBall=function(b,c,g,f,j){var k=this.size*Math.sqrt(f/j),m=g*this.size,o=c*this.size,p=b*this.size,n=Math.floor(m-k);n<1&&(n=1);m=Math.floor(m+k);m>this.size-1&&(m=this.size-1);var u=Math.floor(o-k);u<1&&(u=1);o=Math.floor(o+k);o>this.size-1&&(o=this.size-1);var t=Math.floor(p-k);t<1&&(t=1);k=Math.floor(p+k);k>this.size-1&&(k=this.size-
1);for(var v,A,B,y,E,x;n<m;n++){p=this.size2*n;A=n/this.size-g;E=A*A;for(A=u;A<o;A++){B=p+this.size*A;v=A/this.size-c;x=v*v;for(v=t;v<k;v++)y=v/this.size-b,y=f/(1.0E-6+y*y+x+E)-j,y>0&&(this.field[B+v]+=y)}}};this.addPlaneX=function(b,c){var g,f,j,k,m,o=this.size,p=this.yd,n=this.zd,u=this.field,t=o*Math.sqrt(b/c);t>o&&(t=o);for(g=0;g<t;g++)if(f=g/o,f*=f,k=b/(1.0E-4+f)-c,k>0)for(f=0;f<o;f++){m=g+f*p;for(j=0;j<o;j++)u[n*j+m]+=k}};this.addPlaneY=function(b,c){var g,f,j,k,m,o,p=this.size,n=this.yd,u=
this.zd,t=this.field,v=p*Math.sqrt(b/c);v>p&&(v=p);for(f=0;f<v;f++)if(g=f/p,g*=g,k=b/(1.0E-4+g)-c,k>0){m=f*n;for(g=0;g<p;g++){o=m+g;for(j=0;j<p;j++)t[u*j+o]+=k}}};this.addPlaneZ=function(b,c){var g,f,j,k,m,o;size=this.size;yd=this.yd;zd=this.zd;field=this.field;dist=size*Math.sqrt(b/c);dist>size&&(dist=size);for(j=0;j<dist;j++)if(g=j/size,g*=g,k=b/(1.0E-4+g)-c,k>0){m=zd*j;for(f=0;f<size;f++){o=m+f*yd;for(g=0;g<size;g++)field[o+g]+=k}}};this.reset=function(){var b;for(b=0;b<this.size3;b++)this.normal_cache[b*
3]=0,this.field[b]=0};this.render=function(b){this.begin();var c,g,f,j,k,m,o,p,n,u=this.size-2;for(j=1;j<u;j++){n=this.size2*j;o=(j-this.halfsize)/this.halfsize;for(f=1;f<u;f++){p=n+this.size*f;m=(f-this.halfsize)/this.halfsize;for(g=1;g<u;g++)k=(g-this.halfsize)/this.halfsize,c=p+g,this.polygonize(k,m,o,c,this.isolation,b)}}this.end(b)};this.generateGeometry=function(){var b=0,c=new THREE.Geometry,g=[];this.render(function(f){var j,k,m,o,p,n,u,t;for(j=0;j<f.count;j++)u=j*3,p=u+1,t=u+2,k=f.positionArray[u],
m=f.positionArray[p],o=f.positionArray[t],n=new THREE.Vector3(k,m,o),k=f.normalArray[u],m=f.normalArray[p],o=f.normalArray[t],u=new THREE.Vector3(k,m,o),u.normalize(),p=new THREE.Vertex(n),c.vertices.push(p),g.push(u);nfaces=f.count/3;for(j=0;j<nfaces;j++)u=(b+j)*3,p=u+1,t=u+2,n=g[u],k=g[p],m=g[t],u=new THREE.Face3(u,p,t,[n,k,m]),c.faces.push(u);b+=nfaces;f.count=0});return c};this.init(b)};THREE.MarchingCubes.prototype=new THREE.Object3D;THREE.MarchingCubes.prototype.constructor=THREE.MarchingCubes;
THREE.edgeTable=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,
1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,
419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]);
THREE.triTable=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,
-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,
8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,
-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,
5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,
-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,
10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,
6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,
8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,
2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,
-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,
-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,
-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,
-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,
2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,
4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,
2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
THREE.Trident=function(b){function c(c){return new THREE.Mesh(new THREE.Cylinder(30,0.1,b.length/20,b.length/5),new THREE.MeshBasicMaterial({color:c}))}function d(b,c){var d=new THREE.Geometry;d.vertices=[new THREE.Vertex,new THREE.Vertex(b)];return new THREE.Line(d,new THREE.LineBasicMaterial({color:c}))}THREE.Object3D.call(this);var e=Math.PI/2,g,b=b||THREE.Trident.defaultParams;if(b!==THREE.Trident.defaultParams)for(g in THREE.Trident.defaultParams)b.hasOwnProperty(g)||(b[g]=THREE.Trident.defaultParams[g]);
this.scale=new THREE.Vector3(b.scale,b.scale,b.scale);this.addChild(d(new THREE.Vector3(b.length,0,0),b.xAxisColor));this.addChild(d(new THREE.Vector3(0,b.length,0),b.yAxisColor));this.addChild(d(new THREE.Vector3(0,0,b.length),b.zAxisColor));if(b.showArrows)g=c(b.xAxisColor),g.rotation.y=-e,g.position.x=b.length,this.addChild(g),g=c(b.yAxisColor),g.rotation.x=e,g.position.y=b.length,this.addChild(g),g=c(b.zAxisColor),g.rotation.y=Math.PI,g.position.z=b.length,this.addChild(g)};
THREE.Trident.prototype=new THREE.Object3D;THREE.Trident.prototype.constructor=THREE.Trident;THREE.Trident.defaultParams={xAxisColor:16711680,yAxisColor:65280,zAxisColor:255,showArrows:!0,length:100,scale:1};THREE.PlaneCollider=function(b,c){this.point=b;this.normal=c};THREE.SphereCollider=function(b,c){this.center=b;this.radius=c;this.radiusSq=c*c};THREE.BoxCollider=function(b,c){this.min=b;this.max=c;this.dynamic=!0;this.normal=new THREE.Vector3};
THREE.MeshCollider=function(b,c){this.mesh=b;this.box=c;this.numFaces=this.mesh.geometry.faces.length;this.normal=new THREE.Vector3};THREE.CollisionSystem=function(){this.collisionNormal=new THREE.Vector3;this.colliders=[];this.hits=[]};THREE.Collisions=new THREE.CollisionSystem;THREE.CollisionSystem.prototype.merge=function(b){this.colliders=this.colliders.concat(b.colliders);this.hits=this.hits.concat(b.hits)};
THREE.CollisionSystem.prototype.rayCastAll=function(b){b.direction.normalize();this.hits.length=0;var c,d,e,g,f=0;c=0;for(d=this.colliders.length;c<d;c++)if(g=this.colliders[c],e=this.rayCast(b,g),e<Number.MAX_VALUE)g.distance=e,e>f?this.hits.push(g):this.hits.unshift(g),f=e;return this.hits};
THREE.CollisionSystem.prototype.rayCastNearest=function(b){var c=this.rayCastAll(b);if(c.length==0)return null;for(var d=0;c[d]instanceof THREE.MeshCollider;){var e=this.rayMesh(b,c[d]);if(e.dist<Number.MAX_VALUE){c[d].distance=e.dist;c[d].faceIndex=e.faceIndex;break}d++}if(d>c.length)return null;return c[d]};
THREE.CollisionSystem.prototype.rayCast=function(b,c){if(c instanceof THREE.PlaneCollider)return this.rayPlane(b,c);else if(c instanceof THREE.SphereCollider)return this.raySphere(b,c);else if(c instanceof THREE.BoxCollider)return this.rayBox(b,c);else if(c instanceof THREE.MeshCollider&&c.box)return this.rayBox(b,c.box)};
THREE.CollisionSystem.prototype.rayMesh=function(b,c){for(var d=this.makeRayLocal(b,c.mesh),e=Number.MAX_VALUE,g,f=0;f<c.numFaces;f++){var j=c.mesh.geometry.faces[f],k=c.mesh.geometry.vertices[j.a].position,m=c.mesh.geometry.vertices[j.b].position,o=c.mesh.geometry.vertices[j.c].position,p=j instanceof THREE.Face4?c.mesh.geometry.vertices[j.d].position:null;j instanceof THREE.Face3?(j=this.rayTriangle(d,k,m,o,e,this.collisionNormal),j<e&&(e=j,g=f,c.normal.copy(this.collisionNormal),c.normal.normalize())):
j instanceof THREE.Face4&&(j=this.rayTriangle(d,k,m,p,e,this.collisionNormal),j<e&&(e=j,g=f,c.normal.copy(this.collisionNormal),c.normal.normalize()),j=this.rayTriangle(d,m,o,p,e,this.collisionNormal),j<e&&(e=j,g=f,c.normal.copy(this.collisionNormal),c.normal.normalize()))}return{dist:e,faceIndex:g}};
THREE.CollisionSystem.prototype.rayTriangle=function(b,c,d,e,g,f){var j=THREE.CollisionSystem.__v1,k=THREE.CollisionSystem.__v2;f.set(0,0,0);j.sub(d,c);k.sub(e,d);f.cross(j,k);k=f.dot(b.direction);if(!(k<0))return Number.MAX_VALUE;j=f.dot(c)-f.dot(b.origin);if(!(j<=0))return Number.MAX_VALUE;if(!(j>=k*g))return Number.MAX_VALUE;j/=k;k=THREE.CollisionSystem.__v3;k.copy(b.direction);k.multiplyScalar(j);k.addSelf(b.origin);Math.abs(f.x)>Math.abs(f.y)?Math.abs(f.x)>Math.abs(f.z)?(b=k.y-c.y,f=d.y-c.y,
g=e.y-c.y,k=k.z-c.z,d=d.z-c.z,e=e.z-c.z):(b=k.x-c.x,f=d.x-c.x,g=e.x-c.x,k=k.y-c.y,d=d.y-c.y,e=e.y-c.y):Math.abs(f.y)>Math.abs(f.z)?(b=k.x-c.x,f=d.x-c.x,g=e.x-c.x,k=k.z-c.z,d=d.z-c.z,e=e.z-c.z):(b=k.x-c.x,f=d.x-c.x,g=e.x-c.x,k=k.y-c.y,d=d.y-c.y,e=e.y-c.y);c=f*e-d*g;if(c==0)return Number.MAX_VALUE;c=1/c;e=(b*e-k*g)*c;if(!(e>=0))return Number.MAX_VALUE;c*=f*k-d*b;if(!(c>=0))return Number.MAX_VALUE;if(!(1-e-c>=0))return Number.MAX_VALUE;return j};
THREE.CollisionSystem.prototype.makeRayLocal=function(b,c){var d=THREE.CollisionSystem.__m;THREE.Matrix4.makeInvert(c.matrixWorld,d);var e=THREE.CollisionSystem.__r;e.origin.copy(b.origin);e.direction.copy(b.direction);d.multiplyVector3(e.origin);d.rotateAxis(e.direction);e.direction.normalize();return e};
THREE.CollisionSystem.prototype.rayBox=function(b,c){var d;c.dynamic&&c.mesh&&c.mesh.matrixWorld?d=this.makeRayLocal(b,c.mesh):(d=THREE.CollisionSystem.__r,d.origin.copy(b.origin),d.direction.copy(b.direction));var e=0,g=0,f=0,j=0,k=0,m=0,o=!0;d.origin.x<c.min.x?(e=c.min.x-d.origin.x,e/=d.direction.x,o=!1,j=-1):d.origin.x>c.max.x&&(e=c.max.x-d.origin.x,e/=d.direction.x,o=!1,j=1);d.origin.y<c.min.y?(g=c.min.y-d.origin.y,g/=d.direction.y,o=!1,k=-1):d.origin.y>c.max.y&&(g=c.max.y-d.origin.y,g/=d.direction.y,
o=!1,k=1);d.origin.z<c.min.z?(f=c.min.z-d.origin.z,f/=d.direction.z,o=!1,m=-1):d.origin.z>c.max.z&&(f=c.max.z-d.origin.z,f/=d.direction.z,o=!1,m=1);if(o)return-1;o=0;g>e&&(o=1,e=g);f>e&&(o=2,e=f);switch(o){case 0:k=d.origin.y+d.direction.y*e;if(k<c.min.y||k>c.max.y)return Number.MAX_VALUE;d=d.origin.z+d.direction.z*e;if(d<c.min.z||d>c.max.z)return Number.MAX_VALUE;c.normal.set(j,0,0);break;case 1:j=d.origin.x+d.direction.x*e;if(j<c.min.x||j>c.max.x)return Number.MAX_VALUE;d=d.origin.z+d.direction.z*
e;if(d<c.min.z||d>c.max.z)return Number.MAX_VALUE;c.normal.set(0,k,0);break;case 2:j=d.origin.x+d.direction.x*e;if(j<c.min.x||j>c.max.x)return Number.MAX_VALUE;k=d.origin.y+d.direction.y*e;if(k<c.min.y||k>c.max.y)return Number.MAX_VALUE;c.normal.set(0,0,m)}return e};THREE.CollisionSystem.prototype.rayPlane=function(b,c){var d=b.direction.dot(c.normal),e=c.point.dot(c.normal);if(d<0)d=(e-b.origin.dot(c.normal))/d;else return Number.MAX_VALUE;return d>0?d:Number.MAX_VALUE};
THREE.CollisionSystem.prototype.raySphere=function(b,c){var d=c.center.clone().subSelf(b.origin);if(d.lengthSq<c.radiusSq)return-1;var e=d.dot(b.direction.clone());if(e<=0)return Number.MAX_VALUE;d=c.radiusSq-(d.lengthSq()-e*e);if(d>=0)return Math.abs(e)-Math.sqrt(d);return Number.MAX_VALUE};THREE.CollisionSystem.__v1=new THREE.Vector3;THREE.CollisionSystem.__v2=new THREE.Vector3;THREE.CollisionSystem.__v3=new THREE.Vector3;THREE.CollisionSystem.__nr=new THREE.Vector3;THREE.CollisionSystem.__m=new THREE.Matrix4;
THREE.CollisionSystem.__r=new THREE.Ray;THREE.CollisionUtils={};THREE.CollisionUtils.MeshOBB=function(b){b.geometry.computeBoundingBox();var c=b.geometry.boundingBox,d=new THREE.Vector3(c.x[0],c.y[0],c.z[0]),c=new THREE.Vector3(c.x[1],c.y[1],c.z[1]),d=new THREE.BoxCollider(d,c);d.mesh=b;return d};THREE.CollisionUtils.MeshAABB=function(b){var c=THREE.CollisionUtils.MeshOBB(b);c.min.addSelf(b.position);c.max.addSelf(b.position);c.dynamic=!1;return c};
THREE.CollisionUtils.MeshColliderWBox=function(b){return new THREE.MeshCollider(b,THREE.CollisionUtils.MeshOBB(b))};
THREE.AnaglyphWebGLRenderer=function(b){THREE.WebGLRenderer.call(this,b);var c=this,d=this.setSize,e=this.render,g=new THREE.Camera,f=new THREE.Camera,b={minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat},j=new THREE.WebGLRenderTarget(512,512,b),k=new THREE.WebGLRenderTarget(512,512,b),m=new THREE.Camera(53,1,1,1E4);m.position.z=2;_material=new THREE.MeshShaderMaterial({uniforms:{mapLeft:{type:"t",value:0,texture:j},mapRight:{type:"t",value:1,texture:k}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
fragmentShader:"uniform sampler2D mapLeft;\nuniform sampler2D mapRight;\nvarying vec2 vUv;\nvoid main() {\nvec4 colorL, colorR;\nvec2 uv = vUv;\ncolorL = texture2D( mapLeft, uv );\ncolorR = texture2D( mapRight, uv );\ngl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;\n}"});var o=new THREE.Scene;o.addObject(new THREE.Mesh(new THREE.Plane(2,2),_material));this.setSize=function(b,e){d.call(c,b,e);j.width=b;j.height=e;k.width=b;k.height=e};this.render=
function(b,d){g.projectionMatrix=d.projectionMatrix;g.position.copy(d.position);g.target.position.copy(d.target.position);g.translateX(-10);f.projectionMatrix=d.projectionMatrix;f.position.copy(d.position);f.target.position.copy(d.target.position);f.translateX(10);e.call(c,b,g,j,!0);e.call(c,b,f,k,!0);e.call(c,o,m)}};THREE.AnaglyphWebGLRenderer.prototype=new THREE.WebGLRenderer;THREE.AnaglyphWebGLRenderer.prototype.constructor=THREE.AnaglyphWebGLRenderer;

/*	***********
	* Browser *
	***********
	
	This is code to detect your browser and things about it. Built on rsyring's browser-detect.
	http://github.com/rsyring/browser-detect	*/

// All of this BrowserDetect stuff is just one-time setup
var BrowserDetect = {
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

// Sign of a number
Fiesta.sign = function(d) {
	if (d > 0) return 1;
	if (d < 0) return -1;
	return 0;
}

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

/*	*******************
	* Misc. functions *
	*******************
	
	These are miscellaneous functions that do random things.	*/

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
	
	This is all the logic for binding user commands (key presses, clicks, etc)
	to methods. This SHOULD work for any object, whether it's Fiesta or not. */

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
		else
			throw new TypeError(spr + " is not a sprite");
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
	_resetPlayground: function() { this._playground = undefined },
	
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
		if ((typeof m === typeof 1.0) && (m > 0))
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
				var sprite = this.getSprite();
				if (sprite) {
					this._boundingBoxX1 = this.getX() - sprite.getOriginX();
					this._boundingBoxY1 = this.getY() - sprite.getOriginY();
					this._boundingBoxZ1 = this.getZ() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2);
					this._boundingBoxX2 = this.getX() - sprite.getOriginX() + sprite.getWidth();
					this._boundingBoxY2 = this.getY() - sprite.getOriginY() + sprite.getHeight();
					this._boundingBoxZ2 = this._boundingBoxZ1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
				} else {
					this._boundingBoxX1 = this.getX() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2);
					this._boundingBoxY1 = this.getY() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2);
					this._boundingBoxZ1 = this.getZ() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2);
					this._boundingBoxX2 = this._boundingBoxX1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
					this._boundingBoxY2 = this._boundingBoxY1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
					this._boundingBoxZ2 = this._boundingBoxZ1 + Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION;
				}
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
	var massRatio = aMass / bMass;
	var massSum = aMass + bMass;
	var bOldVX = b.getVelocityX();
	var bOldVY = b.getVelocityY();
	var bOldVZ = b.getVelocityZ();
	var distanceXSign = Fiesta.sign(a.getX() - b.getX());
	var distanceYSign = Fiesta.sign(a.getY() - b.getY());
	var distanceZSign = Fiesta.sign(a.getZ() - b.getZ());
	b.setVelocityX(a.getVelocityX() * massRatio);
	b.setVelocityY(a.getVelocityY() * massRatio);
	b.setVelocityZ(a.getVelocityZ() * massRatio);
	a.setVelocityX(bOldVX / massRatio);
	a.setVelocityY(bOldVY / massRatio);
	a.setVelocityZ(bOldVZ / massRatio);
	var aMoves = 1 - (aMass / massSum);
	var bMoves = 1 - (bMass / massSum);
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
	
	// Get my Image() (this also preloads)
	getImage: function() {
		var img = new Image();
		if (this._urls)
			img.src = this._urls[this._currentIndex];
		return img;
	},
	getWidth: function() {
		return this.getImage().width;
	},
	getHeight: function() {
		return this.getImage().height;
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
			throw new TypeError(f + " is not a valid desired FPS");
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
	getBackgroundColor: function() { return this._backgroundColor },
	setBackgroundColor: function(color) {
		if (typeof color !== typeof "")
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
				object._resetPlayground(undefined);
				object.onDestroy();
			}
			else
				throw new Error("Looks like there is no object " + object + " to destroy");
		}
		else
			throw new TypeError(object + " is not something that can be destroyed");
	},
	objectsAt: function(x, y, z) {
		if (z === undefined)
			z = 0;
		if ((typeof x !== typeof 1.0) || (typeof y !== typeof 1.0) || (typeof z !== typeof 1.0))
			throw new TypeError("Cannot look for objects at " + x + ", " + y + ", and " + z);
		var objects = [];
		for (var i in this._gameObjects) {
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
		for (var i = 0; i < this._gameObjects.length; i ++) {
			
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
			
		}
	}
	
});
