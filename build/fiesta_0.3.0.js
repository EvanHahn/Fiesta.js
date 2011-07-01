/*	Fiesta.js namespace
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

var Fiesta = Fiesta || {};
/*	JS.Class version 3.0.1, core.js
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

(function(){var a=(typeof this.global==='object')?this.global:this;a.JS=a.JS||{};JS.ENV=a})();JS.END_WITHOUT_DOT=/([^\.])$/;JS.array=function(a){var b=[],c=a.length;while(c--)b[c]=a[c];return b};JS.bind=function(a,b){return function(){return a.apply(b,arguments)}};JS.extend=function(a,b,c){if(!a||!b)return a;for(var d in b){if(a[d]===b[d])continue;if(c===false&&a.hasOwnProperty(d))continue;a[d]=b[d]}return a};JS.indexOf=function(a,b){if(a.indexOf)return a.indexOf(b);var c=a.length;while(c--){if(a[c]===b)return c}return-1};JS.isType=function(a,b){if(typeof b==='string')return typeof a===b;if(a===null||a===undefined)return false;return(typeof b==='function'&&a instanceof b)||(a.isA&&a.isA(b))||a.constructor===b};JS.makeBridge=function(a){var b=function(){};b.prototype=a.prototype;return new b()};JS.makeClass=function(a){a=a||Object;var b=function(){return this.initialize?this.initialize.apply(this,arguments)||this:this};b.prototype=JS.makeBridge(a);b.superclass=a;b.subclasses=[];if(a.subclasses)a.subclasses.push(b);return b};JS.match=function(a,b){if(b===undefined)return false;return typeof a.test==='function'?a.test(b):a.match(b)};JS.Method=JS.makeClass();JS.extend(JS.Method.prototype,{initialize:function(a,b,c){this.module=a;this.name=b;this.callable=c;this._1={};if(typeof c!=='function')return;this.arity=c.length;var d=c.toString().match(/\b[a-z\_\$][a-z0-9\_\$]*\b/ig),e=d.length;while(e--)this._1[d[e]]=true},setName:function(a){this.callable.displayName=this.displayName=a},contains:function(a){return this._1.hasOwnProperty(a)},call:function(){return this.callable.call.apply(this.callable,arguments)},apply:function(a,b){return this.callable.apply(a,b)},compile:function(h){var i=this,j=i.module.__trace__||h.__trace__,k=i.callable,q=i._1,n=JS.Method._3,o=n.length,l=[],m;while(o--){m=n[o];if(q[m.name])l.push(m)}if(l.length===0&&!j)return k;var p=function(){var a=l.length,b=a,c={},d,e,f;while(b--){d=l[b];e=this[d.name];if(e&&!e.__kwd__)continue;c[d.name]={_2:e,_4:this.hasOwnProperty(d.name)};f=d.filter(i,h,this,arguments);f.__kwd__=true;this[d.name]=f}var g=k.apply(this,arguments),b=a;while(b--){d=l[b];if(!c[d.name])continue;if(c[d.name]._4)this[d.name]=c[d.name]._2;else delete this[d.name]}return g};if(j)return JS.StackTrace.wrap(p,i,h);return p},toString:function(){var a=this.displayName||(this.module.toString()+'#'+this.name);return'#<Method:'+a+'>'}});JS.Method.create=function(a,b,c){if(c&&c.__inc__&&c.__fns__)return c;var d=(typeof c!=='function')?c:new this(a,b,c);this.notify(d);return d};JS.Method.compile=function(a,b){return a&&a.compile?a.compile(b):a};JS.Method.__listeners__=[];JS.Method.added=function(a,b){this.__listeners__.push([a,b])};JS.Method.notify=function(a){var b=this.__listeners__,c=b.length,d;while(c--){d=b[c];d[0].call(d[1],a)}};JS.Method._3=[];JS.Method.keyword=function(a,b){this._3.push({name:a,filter:b})};JS.Method.tracing=function(c,d,e){JS.require('JS.StackTrace',function(){var a=JS.StackTrace.logger,b=a.active;c=[].concat(c);this.trace(c);a.active=true;d.call(e);this.untrace(c);a.active=b},this)};JS.Method.trace=function(a){var b=a.length;while(b--){a[b].__trace__=true;a[b].resolve()}};JS.Method.untrace=function(a){var b=a.length;while(b--){a[b].__trace__=false;a[b].resolve()}};JS.Module=JS.makeClass();JS.Module.__queue__=[];JS.extend(JS.Module.prototype,{initialize:function(a,b,c){if(typeof a!=='string'){c=arguments[1];b=arguments[0];a=undefined}c=c||{};this.__inc__=[];this.__dep__=[];this.__fns__={};this.__tgt__=c._5;this.__anc__=null;this.__mct__={};this.setName(a);this.include(b,{_0:false});if(JS.Module.__queue__)JS.Module.__queue__.push(this)},setName:function(a){this.displayName=a||'';for(var b in this.__fns__)this.__name__(b);if(a&&this.__meta__)this.__meta__.setName(a+'.')},__name__:function(a){if(!this.displayName)return;var b=this.__fns__[a];if(!b)return;a=this.displayName.replace(JS.END_WITHOUT_DOT,'$1#')+a;if(typeof b.setName==='function')return b.setName(a);if(typeof b==='function')b.displayName=a},define:function(a,b,c){var d=JS.Method.create(this,a,b),e=(c||{})._0;this.__fns__[a]=d;this.__name__(a);if(e!==false)this.resolve()},include:function(a,b){if(!a)return this;var b=b||{},c=b._0!==false,d=a.extend,e=a.include,f,g,h,i,j,k;if(a.__fns__&&a.__inc__){this.__inc__.push(a);if((a.__dep__||{}).push)a.__dep__.push(this);if(f=b._6){if(typeof a.extended==='function')a.extended(f)}else{if(typeof a.included==='function')a.included(this)}}else{if(this.shouldIgnore('extend',d)){i=[].concat(d);for(j=0,k=i.length;j<k;j++)this.extend(i[j])}if(this.shouldIgnore('include',e)){i=[].concat(e);for(j=0,k=i.length;j<k;j++)this.include(i[j],{_0:false})}for(g in a){if(!a.hasOwnProperty(g))continue;h=a[g];if(this.shouldIgnore(g,h))continue;this.define(g,h,{_0:false})}if(a.hasOwnProperty('toString'))this.define('toString',a.toString,{_0:false})}if(c)this.resolve();return this},alias:function(a){for(var b in a){if(!a.hasOwnProperty(b))continue;this.define(b,this.instanceMethod(a[b]),{_0:false})}this.resolve()},resolve:function(a){var a=a||this,b=a.__tgt__,c=this.__inc__,d=this.__fns__,e,f,g,h;if(a===this){this.__anc__=null;this.__mct__={};e=this.__dep__.length;while(e--)this.__dep__[e].resolve()}if(!b)return;for(e=0,f=c.length;e<f;e++)c[e].resolve(a);for(g in d){h=JS.Method.compile(d[g],a);if(b[g]!==h)b[g]=h}if(d.hasOwnProperty('toString'))b.toString=JS.Method.compile(d.toString,a)},shouldIgnore:function(a,b){return(a==='extend'||a==='include')&&(typeof b!=='function'||(b.__fns__&&b.__inc__))},ancestors:function(a){var b=!a,a=a||[],c=this.__inc__;if(b&&this.__anc__)return this.__anc__.slice();for(var d=0,e=c.length;d<e;d++)c[d].ancestors(a);if(JS.indexOf(a,this)<0)a.push(this);if(b)this.__anc__=a.slice();return a},lookup:function(a){var b=this.__mct__[a];if(b&&b.slice)return b.slice();var c=this.ancestors(),d=[],e;for(var f=0,g=c.length;f<g;f++){e=c[f].__fns__;if(e.hasOwnProperty(a))d.push(e[a])}this.__mct__[a]=d.slice();return d},includes:function(a){if(a===this)return true;var b=this.__inc__;for(var c=0,d=b.length;c<d;c++){if(b[c].includes(a))return true}return false},instanceMethod:function(a){return this.lookup(a).pop()},instanceMethods:function(a,b){var c=b||[],d=this.__fns__,e;for(e in d){if(!JS.isType(this.__fns__[e],JS.Method))continue;if(JS.indexOf(c,e)>=0)continue;c.push(e)}if(a!==false){var f=this.ancestors(),g=f.length;while(g--)f[g].instanceMethods(false,c)}return c},match:function(a){return a&&a.isA&&a.isA(this)},toString:function(){return this.displayName}});JS.Kernel=new JS.Module('Kernel',{__eigen__:function(){if(this.__meta__)return this.__meta__;var a=this.toString()+'.';this.__meta__=new JS.Module(a,null,{_5:this});return this.__meta__.include(this.klass,{_0:false})},equals:function(a){return this===a},extend:function(a,b){var c=(b||{})._0;this.__eigen__().include(a,{_6:this,_0:c});return this},hash:function(){return JS.Kernel.hashFor(this)},isA:function(a){return(typeof a==='function'&&this instanceof a)||this.__eigen__().includes(a)},method:function(a){var b=this.__mct__=this.__mct__||{},c=b[a],d=this[a];if(typeof d!=='function')return d;if(c&&d===c._2)return c._7;var e=JS.bind(d,this);b[a]={_2:d,_7:e};return e},methods:function(){return this.__eigen__().instanceMethods()},tap:function(a,b){a.call(b||null,this);return this},toString:function(){if(this.displayName)return this.displayName;var a=this.klass.displayName||this.klass.toString();return'#<'+a+':'+this.hash()+'>'}});(function(){var b=1;JS.Kernel.hashFor=function(a){if(a.__hash__!==undefined)return a.__hash__;a.__hash__=(new Date().getTime()+b).toString(16);b+=1;return a.__hash__}})();JS.Class=JS.makeClass(JS.Module);JS.extend(JS.Class.prototype,{initialize:function(a,b,c,d){if(typeof a!=='string'){d=arguments[2];c=arguments[1];b=arguments[0];a=undefined}if(typeof b!=='function'){d=c;c=b;b=Object}JS.Module.prototype.initialize.call(this,a);d=d||{};var e=JS.makeClass(b);JS.extend(e,this);e.prototype.constructor=e.prototype.klass=e;e.__eigen__().include(b.__meta__,{_0:d._0});e.setName(a);e.__tgt__=e.prototype;var f=(b===Object)?{}:(b.__fns__?b:new JS.Module(b.prototype,{_0:false}));e.include(JS.Kernel,{_0:false}).include(f,{_0:false}).include(c,{_0:false});if(d._0!==false)e.resolve();if(typeof b.inherited==='function')b.inherited(e);return e}});(function(){var e=function(a){var b={},c=a.prototype;for(var d in c){if(!c.hasOwnProperty(d))continue;b[d]=JS.Method.create(a,d,c[d])}return b};var f=function(a,b){var c=JS[a],d=JS[b];c.__inc__=[];c.__dep__=[];c.__fns__=e(c);c.__tgt__=c.prototype;c.prototype.constructor=c.prototype.klass=c;JS.extend(c,JS.Class.prototype);c.include(d||JS.Kernel);c.setName(a);c.constructor=c.klass=JS.Class};f('Method');f('Module');f('Class','Module');var g=JS.Kernel.instanceMethod('__eigen__');g.call(JS.Method);g.call(JS.Module);g.call(JS.Class).include(JS.Module.__meta__)})();JS.NotImplementedError=new JS.Class('NotImplementedError',Error);JS.Method.keyword('callSuper',function(c,d,e,f){var g=d.lookup(c.name),h=g.length-1,i=JS.array(f);return function(){var a=arguments.length;while(a--)i[a]=arguments[a];h-=1;var b=g[h].apply(e,i);h+=1;return b}});JS.Method.keyword('blockGiven',function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity),f=(typeof e[0]==='function');return function(){return f}});JS.Method.keyword('yieldWith',function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity);return function(){if(typeof e[0]!=='function')return;return e[0].apply(e[1]||null,arguments)}});JS.Interface=new JS.Class('Interface',{initialize:function(d){this.test=function(a,b){var c=d.length;while(c--){if(typeof a[d[c]]!=='function')return b?d[c]:false}return true}},extend:{ensure:function(){var a=JS.array(arguments),b=a.shift(),c,d;while(c=a.shift()){d=c.test(b,true);if(d!==true)throw new Error('object does not implement '+d+'()');}}}});JS.Singleton=new JS.Class('Singleton',{initialize:function(a,b,c){return new(new JS.Class(a,b,c))}});
Fiesta.Class = JS.Class;	// Alias
/*	Three.js r41/ROME, modified for Fiesta
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

var THREE=THREE||{};if(!window.Int32Array)window.Int32Array=Array,window.Float32Array=Array;THREE.Color=function(b){this.setHex(b)};
THREE.Color.prototype={copy:function(b){this.r=b.r;this.g=b.g;this.b=b.b;this.hex=b.hex},setHex:function(b){this.hex=~~b&16777215;this.updateRGB()},setRGB:function(b,c,d){this.r=b;this.g=c;this.b=d;this.updateHex()},setHSV:function(b,c,d){var e,f,g,j,k,m;if(d==0)e=f=g=0;else switch(j=Math.floor(b*6),k=b*6-j,b=d*(1-c),m=d*(1-c*k),c=d*(1-c*(1-k)),j){case 1:e=m;f=d;g=b;break;case 2:e=b;f=d;g=c;break;case 3:e=b;f=m;g=d;break;case 4:e=c;f=b;g=d;break;case 5:e=d;f=b;g=m;break;case 6:case 0:e=d,f=c,g=b}this.setRGB(e,
f,g)},updateHex:function(){this.hex=~~(this.r*255)<<16^~~(this.g*255)<<8^~~(this.b*255)},updateRGB:function(){this.r=(this.hex>>16&255)/255;this.g=(this.hex>>8&255)/255;this.b=(this.hex&255)/255},clone:function(){return new THREE.Color(this.hex)}};THREE.Vector2=function(b,c){this.set(b||0,c||0)};
THREE.Vector2.prototype={set:function(b,c){this.x=b;this.y=c;return this},copy:function(b){this.x=b.x;this.y=b.y;return this},clone:function(){return new THREE.Vector2(this.x,this.y)},add:function(b,c){this.x=b.x+c.x;this.y=b.y+c.y;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;return this},sub:function(b,c){this.x=b.x-c.x;this.y=b.y-c.y;return this},subSelf:function(b){this.x-=b.x;this.y-=b.y;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;return this},divideScalar:function(b){b?
(this.x/=b,this.y/=b):this.set(0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(b){return Math.sqrt(this.distanceToSquared(b))},distanceToSquared:function(b){var c=this.x-b.x,b=this.y-b.y;return c*c+b*b},setLength:function(b){return this.normalize().multiplyScalar(b)},
unit:function(){return this.normalize()},equals:function(b){return b.x==this.x&&b.y==this.y}};THREE.Vector3=function(b,c,d){this.set(b||0,c||0,d||0)};
THREE.Vector3.prototype={set:function(b,c,d){this.x=b;this.y=c;this.z=d;return this},copy:function(b){this.x=b.x;this.y=b.y;this.z=b.z;return this},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)},add:function(b,c){this.x=b.x+c.x;this.y=b.y+c.y;this.z=b.z+c.z;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;this.z+=b.z;return this},addScalar:function(b){this.x+=b;this.y+=b;this.z+=b;return this},sub:function(b,c){this.x=b.x-c.x;this.y=b.y-c.y;this.z=b.z-c.z;return this},subSelf:function(b){this.x-=
b.x;this.y-=b.y;this.z-=b.z;return this},multiply:function(b,c){this.x=b.x*c.x;this.y=b.y*c.y;this.z=b.z*c.z;return this},multiplySelf:function(b){this.x*=b.x;this.y*=b.y;this.z*=b.y;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;this.z*=b;return this},divideSelf:function(b){return this.divide(this,b)},divideScalar:function(b){b?(this.x/=b,this.y/=b,this.z/=b):this.set(0,0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y+this.z*
b.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.lengthSq())},lengthManhattan:function(){return this.x+this.y+this.z},normalize:function(){return this.divideScalar(this.length())},setLength:function(b){return this.normalize().multiplyScalar(b)},cross:function(b,c){this.x=b.y*c.z-b.z*c.y;this.y=b.z*c.x-b.x*c.z;this.z=b.x*c.y-b.y*c.x;return this},crossSelf:function(b){return this.set(this.y*b.z-this.z*b.y,this.z*b.x-this.x*b.z,this.x*
b.y-this.y*b.x)},distanceTo:function(b){return Math.sqrt(this.distanceToSquared(b))},distanceToSquared:function(b){return(new THREE.Vector3).sub(this,b).lengthSq()},setPositionFromMatrix:function(b){this.x=b.n14;this.y=b.n24;this.z=b.n34},setRotationFromMatrix:function(b){var c=Math.cos(this.y);this.y=Math.asin(b.n13);Math.abs(c)>1.0E-5?(this.x=Math.atan2(-b.n23/c,b.n33/c),this.z=Math.atan2(-b.n12/c,b.n11/c)):(this.x=0,this.z=Math.atan2(b.n21,b.n22))},isZero:function(){return this.lengthSq()<1.0E-4}};
THREE.Vector4=function(b,c,d,e){this.set(b||0,c||0,d||0,e||1)};
THREE.Vector4.prototype={set:function(b,c,d,e){this.x=b;this.y=c;this.z=d;this.w=e;return this},copy:function(b){return this.set(b.x,b.y,b.z,b.w||1)},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)},add:function(b,c){this.x=b.x+c.x;this.y=b.y+c.y;this.z=b.z+c.z;this.w=b.w+c.w;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;this.z+=b.z;this.w+=b.w;return this},sub:function(b,c){this.x=b.x-c.x;this.y=b.y-c.y;this.z=b.z-c.z;this.w=b.w-c.w;return this},subSelf:function(b){this.x-=
b.x;this.y-=b.y;this.z-=b.z;this.w-=b.w;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;this.z*=b;this.w*=b;return this},divideScalar:function(b){b?(this.x/=b,this.y/=b,this.z/=b,this.w/=b):this.set(0,0,0,1);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y+this.z*b.z+this.w*b.w},lengthSq:function(){return this.dot(this)},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},
setLength:function(b){return this.normalize().multiplyScalar(b)},lerpSelf:function(b,c){this.x+=(b.x-this.x)*c;this.y+=(b.y-this.y)*c;this.z+=(b.z-this.z)*c;this.w+=(b.w-this.w)*c;return this}};THREE.Ray=function(b,c){this.origin=b||new THREE.Vector3;this.direction=c||new THREE.Vector3};
THREE.Ray.prototype={intersectScene:function(b){return this.intersectObjects(b.objects)},intersectObjects:function(b){var c,d,e=[];c=0;for(d=b.length;c<d;c++)e=e.concat(this.intersectObject(b[c]));e.sort(function(b,d){return b.distance-d.distance});return e},intersectObject:function(b){function c(b,d,c){var e,c=c.matrixWorld.getPosition();e=c.clone().subSelf(b).dot(d);b=b.clone().addSelf(d.clone().multiplyScalar(e));return c.distanceTo(b)}function d(b,d,c,e){var e=e.clone().subSelf(d),c=c.clone().subSelf(d),
f=b.clone().subSelf(d),b=e.dot(e),d=e.dot(c),e=e.dot(f),g=c.dot(c),c=c.dot(f),f=1/(b*g-d*d),g=(g*e-d*c)*f,b=(b*c-d*e)*f;return g>0&&b>0&&g+b<1}if(b instanceof THREE.Particle){var e=c(this.origin,this.direction,b);if(!e||e>b.scale.x)return[];return[{distance:e,point:b.position,face:null,object:b}]}else if(b instanceof THREE.Mesh){e=c(this.origin,this.direction,b);if(!e||e>b.geometry.boundingSphere.radius*Math.max(b.scale.x,Math.max(b.scale.y,b.scale.z)))return[];var f,g,j,k,m,o,p,t,n,u,v=b.geometry,
y=v.vertices,B=[],e=0;for(f=v.faces.length;e<f;e++)if(g=v.faces[e],n=this.origin.clone(),u=this.direction.clone(),o=b.matrixWorld,j=o.multiplyVector3(y[g.a].position.clone()),k=o.multiplyVector3(y[g.b].position.clone()),m=o.multiplyVector3(y[g.c].position.clone()),o=g instanceof THREE.Face4?o.multiplyVector3(y[g.d].position.clone()):null,p=b.matrixRotationWorld.multiplyVector3(g.normal.clone()),t=u.dot(p),b.doubleSided||(b.flipSided?t>0:t<0))if(p=p.dot((new THREE.Vector3).sub(j,n))/t,n=n.addSelf(u.multiplyScalar(p)),
g instanceof THREE.Face3)d(n,j,k,m)&&(g={distance:this.origin.distanceTo(n),point:n,face:g,object:b},B.push(g));else if(g instanceof THREE.Face4&&(d(n,j,k,o)||d(n,k,m,o)))g={distance:this.origin.distanceTo(n),point:n,face:g,object:b},B.push(g);return B}else return[]}};
THREE.Rectangle=function(){function b(){g=e-c;j=f-d}var c,d,e,f,g,j,k=!0;this.getX=function(){return c};this.getY=function(){return d};this.getWidth=function(){return g};this.getHeight=function(){return j};this.getLeft=function(){return c};this.getTop=function(){return d};this.getRight=function(){return e};this.getBottom=function(){return f};this.set=function(g,j,p,t){k=!1;c=g;d=j;e=p;f=t;b()};this.addPoint=function(g,j){k?(k=!1,c=g,d=j,e=g,f=j):(c=c<g?c:g,d=d<j?d:j,e=e>g?e:g,f=f>j?f:j);b()};this.add3Points=
function(g,j,p,t,n,u){k?(k=!1,c=g<p?g<n?g:n:p<n?p:n,d=j<t?j<u?j:u:t<u?t:u,e=g>p?g>n?g:n:p>n?p:n,f=j>t?j>u?j:u:t>u?t:u):(c=g<p?g<n?g<c?g:c:n<c?n:c:p<n?p<c?p:c:n<c?n:c,d=j<t?j<u?j<d?j:d:u<d?u:d:t<u?t<d?t:d:u<d?u:d,e=g>p?g>n?g>e?g:e:n>e?n:e:p>n?p>e?p:e:n>e?n:e,f=j>t?j>u?j>f?j:f:u>f?u:f:t>u?t>f?t:f:u>f?u:f);b()};this.addRectangle=function(g){k?(k=!1,c=g.getLeft(),d=g.getTop(),e=g.getRight(),f=g.getBottom()):(c=c<g.getLeft()?c:g.getLeft(),d=d<g.getTop()?d:g.getTop(),e=e>g.getRight()?e:g.getRight(),f=f>
g.getBottom()?f:g.getBottom());b()};this.inflate=function(g){c-=g;d-=g;e+=g;f+=g;b()};this.minSelf=function(g){c=c>g.getLeft()?c:g.getLeft();d=d>g.getTop()?d:g.getTop();e=e<g.getRight()?e:g.getRight();f=f<g.getBottom()?f:g.getBottom();b()};this.instersects=function(b){return Math.min(e,b.getRight())-Math.max(c,b.getLeft())>=0&&Math.min(f,b.getBottom())-Math.max(d,b.getTop())>=0};this.empty=function(){k=!0;f=e=d=c=0;b()};this.isEmpty=function(){return k}};THREE.Matrix3=function(){this.m=[]};
THREE.Matrix3.prototype={transpose:function(){var b,c=this.m;b=c[1];c[1]=c[3];c[3]=b;b=c[2];c[2]=c[6];c[6]=b;b=c[5];c[5]=c[7];c[7]=b;return this},transposeIntoArray:function(b){var c=this.m;b[0]=c[0];b[1]=c[3];b[2]=c[6];b[3]=c[1];b[4]=c[4];b[5]=c[7];b[6]=c[2];b[7]=c[5];b[8]=c[8];return this}};THREE.Matrix4=function(b,c,d,e,f,g,j,k,m,o,p,t,n,u,v,y){this.set(b||1,c||0,d||0,e||0,f||0,g||1,j||0,k||0,m||0,o||0,p||1,t||0,n||0,u||0,v||0,y||1);this.flat=Array(16);this.m33=new THREE.Matrix3};
THREE.Matrix4.prototype={set:function(b,c,d,e,f,g,j,k,m,o,p,t,n,u,v,y){this.n11=b;this.n12=c;this.n13=d;this.n14=e;this.n21=f;this.n22=g;this.n23=j;this.n24=k;this.n31=m;this.n32=o;this.n33=p;this.n34=t;this.n41=n;this.n42=u;this.n43=v;this.n44=y;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(b){this.set(b.n11,b.n12,b.n13,b.n14,b.n21,b.n22,b.n23,b.n24,b.n31,b.n32,b.n33,b.n34,b.n41,b.n42,b.n43,b.n44);return this},lookAt:function(b,c,d){var e=THREE.Matrix4.__v1,
f=THREE.Matrix4.__v2,g=THREE.Matrix4.__v3;g.sub(b,c).normalize();if(g.length()===0)g.z=1;e.cross(d,g).normalize();e.length()===0&&(g.x+=1.0E-4,e.cross(d,g).normalize());f.cross(g,e).normalize();this.n11=e.x;this.n12=f.x;this.n13=g.x;this.n21=e.y;this.n22=f.y;this.n23=g.y;this.n31=e.z;this.n32=f.z;this.n33=g.z;return this},multiplyVector3:function(b){var c=b.x,d=b.y,e=b.z,f=1/(this.n41*c+this.n42*d+this.n43*e+this.n44);b.x=(this.n11*c+this.n12*d+this.n13*e+this.n14)*f;b.y=(this.n21*c+this.n22*d+this.n23*
e+this.n24)*f;b.z=(this.n31*c+this.n32*d+this.n33*e+this.n34)*f;return b},multiplyVector4:function(b){var c=b.x,d=b.y,e=b.z,f=b.w;b.x=this.n11*c+this.n12*d+this.n13*e+this.n14*f;b.y=this.n21*c+this.n22*d+this.n23*e+this.n24*f;b.z=this.n31*c+this.n32*d+this.n33*e+this.n34*f;b.w=this.n41*c+this.n42*d+this.n43*e+this.n44*f;return b},rotateAxis:function(b){var c=b.x,d=b.y,e=b.z;b.x=c*this.n11+d*this.n12+e*this.n13;b.y=c*this.n21+d*this.n22+e*this.n23;b.z=c*this.n31+d*this.n32+e*this.n33;b.normalize();
return b},crossVector:function(b){var c=new THREE.Vector4;c.x=this.n11*b.x+this.n12*b.y+this.n13*b.z+this.n14*b.w;c.y=this.n21*b.x+this.n22*b.y+this.n23*b.z+this.n24*b.w;c.z=this.n31*b.x+this.n32*b.y+this.n33*b.z+this.n34*b.w;c.w=b.w?this.n41*b.x+this.n42*b.y+this.n43*b.z+this.n44*b.w:1;return c},multiply:function(b,c){var d=b.n11,e=b.n12,f=b.n13,g=b.n14,j=b.n21,k=b.n22,m=b.n23,o=b.n24,p=b.n31,t=b.n32,n=b.n33,u=b.n34,v=b.n41,y=b.n42,B=b.n43,z=b.n44,I=c.n11,A=c.n12,G=c.n13,F=c.n14,C=c.n21,M=c.n22,
J=c.n23,O=c.n24,w=c.n31,W=c.n32,R=c.n33,S=c.n34;this.n11=d*I+e*C+f*w;this.n12=d*A+e*M+f*W;this.n13=d*G+e*J+f*R;this.n14=d*F+e*O+f*S+g;this.n21=j*I+k*C+m*w;this.n22=j*A+k*M+m*W;this.n23=j*G+k*J+m*R;this.n24=j*F+k*O+m*S+o;this.n31=p*I+t*C+n*w;this.n32=p*A+t*M+n*W;this.n33=p*G+t*J+n*R;this.n34=p*F+t*O+n*S+u;this.n41=v*I+y*C+B*w;this.n42=v*A+y*M+B*W;this.n43=v*G+y*J+B*R;this.n44=v*F+y*O+B*S+z;return this},multiplyToArray:function(b,c,d){this.multiply(b,c);d[0]=this.n11;d[1]=this.n21;d[2]=this.n31;d[3]=
this.n41;d[4]=this.n12;d[5]=this.n22;d[6]=this.n32;d[7]=this.n42;d[8]=this.n13;d[9]=this.n23;d[10]=this.n33;d[11]=this.n43;d[12]=this.n14;d[13]=this.n24;d[14]=this.n34;d[15]=this.n44;return this},multiplySelf:function(b){this.multiply(this,b);return this},multiplyScalar:function(b){this.n11*=b;this.n12*=b;this.n13*=b;this.n14*=b;this.n21*=b;this.n22*=b;this.n23*=b;this.n24*=b;this.n31*=b;this.n32*=b;this.n33*=b;this.n34*=b;this.n41*=b;this.n42*=b;this.n43*=b;this.n44*=b;return this},determinant:function(){var b=
this.n11,c=this.n12,d=this.n13,e=this.n14,f=this.n21,g=this.n22,j=this.n23,k=this.n24,m=this.n31,o=this.n32,p=this.n33,t=this.n34,n=this.n41,u=this.n42,v=this.n43,y=this.n44;return e*j*o*n-d*k*o*n-e*g*p*n+c*k*p*n+d*g*t*n-c*j*t*n-e*j*m*u+d*k*m*u+e*f*p*u-b*k*p*u-d*f*t*u+b*j*t*u+e*g*m*v-c*k*m*v-e*f*o*v+b*k*o*v+c*f*t*v-b*g*t*v-d*g*m*y+c*j*m*y+d*f*o*y-b*j*o*y-c*f*p*y+b*g*p*y},transpose:function(){var b;b=this.n21;this.n21=this.n12;this.n12=b;b=this.n31;this.n31=this.n13;this.n13=b;b=this.n32;this.n32=
this.n23;this.n23=b;b=this.n41;this.n41=this.n14;this.n14=b;b=this.n42;this.n42=this.n24;this.n24=b;b=this.n43;this.n43=this.n34;this.n43=b;return this},clone:function(){var b=new THREE.Matrix4;b.n11=this.n11;b.n12=this.n12;b.n13=this.n13;b.n14=this.n14;b.n21=this.n21;b.n22=this.n22;b.n23=this.n23;b.n24=this.n24;b.n31=this.n31;b.n32=this.n32;b.n33=this.n33;b.n34=this.n34;b.n41=this.n41;b.n42=this.n42;b.n43=this.n43;b.n44=this.n44;return b},flatten:function(){this.flat[0]=this.n11;this.flat[1]=this.n21;
this.flat[2]=this.n31;this.flat[3]=this.n41;this.flat[4]=this.n12;this.flat[5]=this.n22;this.flat[6]=this.n32;this.flat[7]=this.n42;this.flat[8]=this.n13;this.flat[9]=this.n23;this.flat[10]=this.n33;this.flat[11]=this.n43;this.flat[12]=this.n14;this.flat[13]=this.n24;this.flat[14]=this.n34;this.flat[15]=this.n44;return this.flat},flattenToArray:function(b){b[0]=this.n11;b[1]=this.n21;b[2]=this.n31;b[3]=this.n41;b[4]=this.n12;b[5]=this.n22;b[6]=this.n32;b[7]=this.n42;b[8]=this.n13;b[9]=this.n23;b[10]=
this.n33;b[11]=this.n43;b[12]=this.n14;b[13]=this.n24;b[14]=this.n34;b[15]=this.n44;return b},flattenToArrayOffset:function(b,c){b[c]=this.n11;b[c+1]=this.n21;b[c+2]=this.n31;b[c+3]=this.n41;b[c+4]=this.n12;b[c+5]=this.n22;b[c+6]=this.n32;b[c+7]=this.n42;b[c+8]=this.n13;b[c+9]=this.n23;b[c+10]=this.n33;b[c+11]=this.n43;b[c+12]=this.n14;b[c+13]=this.n24;b[c+14]=this.n34;b[c+15]=this.n44;return b},setTranslation:function(b,c,d){this.set(1,0,0,b,0,1,0,c,0,0,1,d,0,0,0,1);return this},setScale:function(b,
c,d){this.set(b,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1);return this},setRotationX:function(b){var c=Math.cos(b),b=Math.sin(b);this.set(1,0,0,0,0,c,-b,0,0,b,c,0,0,0,0,1);return this},setRotationY:function(b){var c=Math.cos(b),b=Math.sin(b);this.set(c,0,b,0,0,1,0,0,-b,0,c,0,0,0,0,1);return this},setRotationZ:function(b){var c=Math.cos(b),b=Math.sin(b);this.set(c,-b,0,0,b,c,0,0,0,0,1,0,0,0,0,1);return this},setRotationAxis:function(b,c){var d=Math.cos(c),e=Math.sin(c),f=1-d,g=b.x,j=b.y,k=b.z,m=f*g,o=f*j;this.set(m*
g+d,m*j-e*k,m*k+e*j,0,m*j+e*k,o*j+d,o*k-e*g,0,m*k-e*j,o*k+e*g,f*k*k+d,0,0,0,0,1);return this},setPosition:function(b){this.n14=b.x;this.n24=b.y;this.n34=b.z;return this},getPosition:function(){if(!this.position)this.position=new THREE.Vector3;this.position.set(this.n14,this.n24,this.n34);return this.position},getColumnX:function(){if(!this.columnX)this.columnX=new THREE.Vector3;this.columnX.set(this.n11,this.n21,this.n31);return this.columnX},getColumnY:function(){if(!this.columnY)this.columnY=new THREE.Vector3;
this.columnY.set(this.n12,this.n22,this.n32);return this.columnY},getColumnZ:function(){if(!this.columnZ)this.columnZ=new THREE.Vector3;this.columnZ.set(this.n13,this.n23,this.n33);return this.columnZ},setRotationFromEuler:function(b){var c=b.x,d=b.y,e=b.z,b=Math.cos(c),c=Math.sin(c),f=Math.cos(d),d=Math.sin(d),g=Math.cos(e),e=Math.sin(e),j=b*d,k=c*d;this.n11=f*g;this.n12=-f*e;this.n13=d;this.n21=k*g+b*e;this.n22=-k*e+b*g;this.n23=-c*f;this.n31=-j*g+c*e;this.n32=j*e+c*g;this.n33=b*f;return this},
setRotationFromQuaternion:function(b){var c=b.x,d=b.y,e=b.z,f=b.w,g=c+c,j=d+d,k=e+e,b=c*g,m=c*j;c*=k;var o=d*j;d*=k;e*=k;g*=f;j*=f;f*=k;this.n11=1-(o+e);this.n12=m-f;this.n13=c+j;this.n21=m+f;this.n22=1-(b+e);this.n23=d-g;this.n31=c-j;this.n32=d+g;this.n33=1-(b+o);return this},scale:function(b){var c=b.x,d=b.y,b=b.z;this.n11*=c;this.n12*=d;this.n13*=b;this.n21*=c;this.n22*=d;this.n23*=b;this.n31*=c;this.n32*=d;this.n33*=b;this.n41*=c;this.n42*=d;this.n43*=b;return this},extractPosition:function(b){this.n14=
b.n14;this.n24=b.n24;this.n34=b.n34},extractRotation:function(b,c){var d=1/c.x,e=1/c.y,f=1/c.z;this.n11=b.n11*d;this.n21=b.n21*d;this.n31=b.n31*d;this.n12=b.n12*e;this.n22=b.n22*e;this.n32=b.n32*e;this.n13=b.n13*f;this.n23=b.n23*f;this.n33=b.n33*f}};
THREE.Matrix4.makeInvert=function(b,c){var d=b.n11,e=b.n12,f=b.n13,g=b.n14,j=b.n21,k=b.n22,m=b.n23,o=b.n24,p=b.n31,t=b.n32,n=b.n33,u=b.n34,v=b.n41,y=b.n42,B=b.n43,z=b.n44;c===void 0&&(c=new THREE.Matrix4);c.n11=m*u*y-o*n*y+o*t*B-k*u*B-m*t*z+k*n*z;c.n12=g*n*y-f*u*y-g*t*B+e*u*B+f*t*z-e*n*z;c.n13=f*o*y-g*m*y+g*k*B-e*o*B-f*k*z+e*m*z;c.n14=g*m*t-f*o*t-g*k*n+e*o*n+f*k*u-e*m*u;c.n21=o*n*v-m*u*v-o*p*B+j*u*B+m*p*z-j*n*z;c.n22=f*u*v-g*n*v+g*p*B-d*u*B-f*p*z+d*n*z;c.n23=g*m*v-f*o*v-g*j*B+d*o*B+f*j*z-d*m*z;c.n24=
f*o*p-g*m*p+g*j*n-d*o*n-f*j*u+d*m*u;c.n31=k*u*v-o*t*v+o*p*y-j*u*y-k*p*z+j*t*z;c.n32=g*t*v-e*u*v-g*p*y+d*u*y+e*p*z-d*t*z;c.n33=f*o*v-g*k*v+g*j*y-d*o*y-e*j*z+d*k*z;c.n34=g*k*p-e*o*p-g*j*t+d*o*t+e*j*u-d*k*u;c.n41=m*t*v-k*n*v-m*p*y+j*n*y+k*p*B-j*t*B;c.n42=e*n*v-f*t*v+f*p*y-d*n*y-e*p*B+d*t*B;c.n43=f*k*v-e*m*v-f*j*y+d*m*y+e*j*B-d*k*B;c.n44=e*m*p-f*k*p+f*j*t-d*m*t-e*j*n+d*k*n;c.multiplyScalar(1/b.determinant());return c};
THREE.Matrix4.makeInvert3x3=function(b){var c=b.m33,d=c.m,e=b.n33*b.n22-b.n32*b.n23,f=-b.n33*b.n21+b.n31*b.n23,g=b.n32*b.n21-b.n31*b.n22,j=-b.n33*b.n12+b.n32*b.n13,k=b.n33*b.n11-b.n31*b.n13,m=-b.n32*b.n11+b.n31*b.n12,o=b.n23*b.n12-b.n22*b.n13,p=-b.n23*b.n11+b.n21*b.n13,t=b.n22*b.n11-b.n21*b.n12,b=b.n11*e+b.n21*j+b.n31*o;b==0&&Fiesta.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible.");b=1/b;d[0]=b*e;d[1]=b*f;d[2]=b*g;d[3]=b*j;d[4]=b*k;d[5]=b*m;d[6]=b*o;d[7]=b*p;d[8]=b*t;return c};
THREE.Matrix4.makeFrustum=function(b,c,d,e,f,g){var j;j=new THREE.Matrix4;j.n11=2*f/(c-b);j.n12=0;j.n13=(c+b)/(c-b);j.n14=0;j.n21=0;j.n22=2*f/(e-d);j.n23=(e+d)/(e-d);j.n24=0;j.n31=0;j.n32=0;j.n33=-(g+f)/(g-f);j.n34=-2*g*f/(g-f);j.n41=0;j.n42=0;j.n43=-1;j.n44=0;return j};THREE.Matrix4.makePerspective=function(b,c,d,e){var f,b=d*Math.tan(b*Math.PI/360);f=-b;return THREE.Matrix4.makeFrustum(f*c,b*c,f,b,d,e)};
THREE.Matrix4.makeOrtho=function(b,c,d,e,f,g){var j,k,m,o;j=new THREE.Matrix4;k=c-b;m=d-e;o=g-f;j.n11=2/k;j.n12=0;j.n13=0;j.n14=-((c+b)/k);j.n21=0;j.n22=2/m;j.n23=0;j.n24=-((d+e)/m);j.n31=0;j.n32=0;j.n33=-2/o;j.n34=-((g+f)/o);j.n41=0;j.n42=0;j.n43=0;j.n44=1;return j};THREE.Matrix4.__v1=new THREE.Vector3;THREE.Matrix4.__v2=new THREE.Vector3;THREE.Matrix4.__v3=new THREE.Vector3;
THREE.Object3D=function(){this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.scale=new THREE.Vector3(1,1,1);this.flipSided=this.doubleSided=this.dynamic=!1;this.renderDepth=null;this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixRotationWorld=new THREE.Matrix4;this.matrixWorldNeedsUpdate=this.matrixAutoUpdate=!0;this.quaternion=new THREE.Quaternion;this.useQuaternion=
!1;this.boundRadius=0;this.boundRadiusScale=1;this.visible=!0;this._vector=new THREE.Vector3;this.name=""};
THREE.Object3D.prototype={translate:function(b,c){this.matrix.rotateAxis(c);this.position.addSelf(c.multiplyScalar(b))},translateX:function(b){this.translate(b,this._vector.set(1,0,0))},translateY:function(b){this.translate(b,this._vector.set(0,1,0))},translateZ:function(b){this.translate(b,this._vector.set(0,0,1))},lookAt:function(b){this.matrix.lookAt(b,this.position,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)},addChild:function(b){if(this.children.indexOf(b)===
-1){b.parent!==void 0&&b.parent.removeChild(b);b.parent=this;this.children.push(b);for(var c=this;c.parent!==void 0;)c=c.parent;c!==void 0&&c instanceof THREE.Scene&&c.addChildRecurse(b)}},removeChild:function(b){var c=this.children.indexOf(b);if(c!==-1)b.parent=void 0,this.children.splice(c,1)},getChildByName:function(b,c){var d,e,f;d=0;for(e=this.children.length;d<e;d++){f=this.children[d];if(f.name===b)return f;if(c&&(f=f.getChildByName(b,c),f!==void 0))return f}},updateMatrix:function(){this.matrix.setPosition(this.position);
this.useQuaternion?this.matrix.setRotationFromQuaternion(this.quaternion):this.matrix.setRotationFromEuler(this.rotation);if(this.scale.x!==1||this.scale.y!==1||this.scale.z!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,Math.max(this.scale.y,this.scale.z));this.matrixWorldNeedsUpdate=!0},update:function(b,c,d){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||c)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixRotationWorld.extractRotation(this.matrixWorld,
this.scale),this.matrixWorldNeedsUpdate=!1,c=!0;for(var b=0,e=this.children.length;b<e;b++)this.children[b].update(this.matrixWorld,c,d)}};THREE.Quaternion=function(b,c,d,e){this.set(b||0,c||0,d||0,e!==void 0?e:1)};
THREE.Quaternion.prototype={set:function(b,c,d,e){this.x=b;this.y=c;this.z=d;this.w=e;return this},copy:function(b){this.x=b.x;this.y=b.y;this.z=b.z;this.w=b.w;return this},setFromEuler:function(b){var c=0.5*Math.PI/360,d=b.x*c,e=b.y*c,f=b.z*c,b=Math.cos(e),e=Math.sin(e),c=Math.cos(-f),f=Math.sin(-f),g=Math.cos(d),d=Math.sin(d),j=b*c,k=e*f;this.w=j*g-k*d;this.x=j*d+k*g;this.y=e*c*g+b*f*d;this.z=b*f*g-e*c*d;return this},setFromAxisAngle:function(b,c){var d=c/2,e=Math.sin(d);this.x=b.x*e;this.y=b.y*
e;this.z=b.z*e;this.w=Math.cos(d);return this},calculateW:function(){this.w=-Math.sqrt(Math.abs(1-this.x*this.x-this.y*this.y-this.z*this.z));return this},inverse:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var b=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);b==0?this.w=this.z=this.y=this.x=0:(b=1/b,this.x*=b,this.y*=b,this.z*=b,this.w*=b);return this},
multiplySelf:function(b){var c=this.x,d=this.y,e=this.z,f=this.w,g=b.x,j=b.y,k=b.z,b=b.w;this.x=c*b+f*g+d*k-e*j;this.y=d*b+f*j+e*g-c*k;this.z=e*b+f*k+c*j-d*g;this.w=f*b-c*g-d*j-e*k;return this},multiply:function(b,c){this.x=b.x*c.w+b.y*c.z-b.z*c.y+b.w*c.x;this.y=-b.x*c.z+b.y*c.w+b.z*c.x+b.w*c.y;this.z=b.x*c.y-b.y*c.x+b.z*c.w+b.w*c.z;this.w=-b.x*c.x-b.y*c.y-b.z*c.z+b.w*c.w;return this},multiplyVector3:function(b,c){c||(c=b);var d=b.x,e=b.y,f=b.z,g=this.x,j=this.y,k=this.z,m=this.w,o=m*d+j*f-k*e,p=
m*e+k*d-g*f,t=m*f+g*e-j*d,d=-g*d-j*e-k*f;c.x=o*m+d*-g+p*-k-t*-j;c.y=p*m+d*-j+t*-g-o*-k;c.z=t*m+d*-k+o*-j-p*-g;return c}};
THREE.Quaternion.slerp=function(b,c,d,e){var f=b.w*c.w+b.x*c.x+b.y*c.y+b.z*c.z;if(Math.abs(f)>=1)return d.w=b.w,d.x=b.x,d.y=b.y,d.z=b.z,d;var g=Math.acos(f),j=Math.sqrt(1-f*f);if(Math.abs(j)<0.001)return d.w=0.5*(b.w+c.w),d.x=0.5*(b.x+c.x),d.y=0.5*(b.y+c.y),d.z=0.5*(b.z+c.z),d;f=Math.sin((1-e)*g)/j;e=Math.sin(e*g)/j;d.w=b.w*f+c.w*e;d.x=b.x*f+c.x*e;d.y=b.y*f+c.y*e;d.z=b.z*f+c.z*e;return d};THREE.Vertex=function(b){this.position=b||new THREE.Vector3};
THREE.Face3=function(b,c,d,e,f,g){this.a=b;this.b=c;this.c=d;this.normal=e instanceof THREE.Vector3?e:new THREE.Vector3;this.vertexNormals=e instanceof Array?e:[];this.color=f instanceof THREE.Color?f:new THREE.Color;this.vertexColors=f instanceof Array?f:[];this.vertexTangents=[];this.materials=g instanceof Array?g:[g];this.centroid=new THREE.Vector3};
THREE.Face4=function(b,c,d,e,f,g,j){this.a=b;this.b=c;this.c=d;this.d=e;this.normal=f instanceof THREE.Vector3?f:new THREE.Vector3;this.vertexNormals=f instanceof Array?f:[];this.color=g instanceof THREE.Color?g:new THREE.Color;this.vertexColors=g instanceof Array?g:[];this.vertexTangents=[];this.materials=j instanceof Array?j:[j];this.centroid=new THREE.Vector3};THREE.UV=function(b,c){this.set(b||0,c||0)};
THREE.UV.prototype={set:function(b,c){this.u=b;this.v=c;return this},copy:function(b){this.set(b.u,b.v);return this}};THREE.Geometry=function(){this.id="Geometry"+THREE.GeometryIdCounter++;this.vertices=[];this.colors=[];this.faces=[];this.edges=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.hasTangents=!1};
THREE.Geometry.prototype={computeCentroids:function(){var b,c,d;b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d.centroid.set(0,0,0),d instanceof THREE.Face3?(d.centroid.addSelf(this.vertices[d.a].position),d.centroid.addSelf(this.vertices[d.b].position),d.centroid.addSelf(this.vertices[d.c].position),d.centroid.divideScalar(3)):d instanceof THREE.Face4&&(d.centroid.addSelf(this.vertices[d.a].position),d.centroid.addSelf(this.vertices[d.b].position),d.centroid.addSelf(this.vertices[d.c].position),
d.centroid.addSelf(this.vertices[d.d].position),d.centroid.divideScalar(4))},computeFaceNormals:function(b){var c,d,e,f,g,j,k=new THREE.Vector3,m=new THREE.Vector3;e=0;for(f=this.faces.length;e<f;e++){g=this.faces[e];if(b&&g.vertexNormals.length){k.set(0,0,0);c=0;for(d=g.vertexNormals.length;c<d;c++)k.addSelf(g.vertexNormals[c]);k.divideScalar(3)}else c=this.vertices[g.a],d=this.vertices[g.b],j=this.vertices[g.c],k.sub(j.position,d.position),m.sub(c.position,d.position),k.crossSelf(m);k.isZero()||
k.normalize();g.normal.copy(k)}},computeVertexNormals:function(){var b,c,d,e;if(this.__tmpVertices==void 0){e=this.__tmpVertices=Array(this.vertices.length);b=0;for(c=this.vertices.length;b<c;b++)e[b]=new THREE.Vector3;b=0;for(c=this.faces.length;b<c;b++)if(d=this.faces[b],d instanceof THREE.Face3)d.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];else if(d instanceof THREE.Face4)d.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]}else{e=
this.__tmpVertices;b=0;for(c=this.vertices.length;b<c;b++)e[b].set(0,0,0)}b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?(e[d.a].addSelf(d.normal),e[d.b].addSelf(d.normal),e[d.c].addSelf(d.normal)):d instanceof THREE.Face4&&(e[d.a].addSelf(d.normal),e[d.b].addSelf(d.normal),e[d.c].addSelf(d.normal),e[d.d].addSelf(d.normal));b=0;for(c=this.vertices.length;b<c;b++)e[b].normalize();b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?(d.vertexNormals[0].copy(e[d.a]),
d.vertexNormals[1].copy(e[d.b]),d.vertexNormals[2].copy(e[d.c])):d instanceof THREE.Face4&&(d.vertexNormals[0].copy(e[d.a]),d.vertexNormals[1].copy(e[d.b]),d.vertexNormals[2].copy(e[d.c]),d.vertexNormals[3].copy(e[d.d]))},computeTangents:function(){function b(b,d,c,h,e,f,g){k=b.vertices[d].position;m=b.vertices[c].position;o=b.vertices[h].position;p=j[e];t=j[f];n=j[g];u=m.x-k.x;v=o.x-k.x;y=m.y-k.y;B=o.y-k.y;z=m.z-k.z;I=o.z-k.z;A=t.u-p.u;G=n.u-p.u;F=t.v-p.v;C=n.v-p.v;M=1/(A*C-G*F);W.set((C*u-F*v)*
M,(C*y-F*B)*M,(C*z-F*I)*M);R.set((A*v-G*u)*M,(A*B-G*y)*M,(A*I-G*z)*M);O[d].addSelf(W);O[c].addSelf(W);O[h].addSelf(W);w[d].addSelf(R);w[c].addSelf(R);w[h].addSelf(R)}var c,d,e,f,g,j,k,m,o,p,t,n,u,v,y,B,z,I,A,G,F,C,M,J,O=[],w=[],W=new THREE.Vector3,R=new THREE.Vector3,S=new THREE.Vector3,h=new THREE.Vector3,Q=new THREE.Vector3;c=0;for(d=this.vertices.length;c<d;c++)O[c]=new THREE.Vector3,w[c]=new THREE.Vector3;c=0;for(d=this.faces.length;c<d;c++)g=this.faces[c],j=this.faceVertexUvs[0][c],g instanceof
THREE.Face3?b(this,g.a,g.b,g.c,0,1,2):g instanceof THREE.Face4&&(b(this,g.a,g.b,g.c,0,1,2),b(this,g.a,g.b,g.d,0,1,3));var L=["a","b","c","d"];c=0;for(d=this.faces.length;c<d;c++){g=this.faces[c];for(e=0;e<g.vertexNormals.length;e++)Q.copy(g.vertexNormals[e]),f=g[L[e]],J=O[f],S.copy(J),S.subSelf(Q.multiplyScalar(Q.dot(J))).normalize(),h.cross(g.vertexNormals[e],J),f=h.dot(w[f]),f=f<0?-1:1,g.vertexTangents[e]=new THREE.Vector4(S.x,S.y,S.z,f)}this.hasTangents=!0},computeBoundingBox:function(){var b;
if(this.vertices.length>0){this.boundingBox={x:[this.vertices[0].position.x,this.vertices[0].position.x],y:[this.vertices[0].position.y,this.vertices[0].position.y],z:[this.vertices[0].position.z,this.vertices[0].position.z]};for(var c=1,d=this.vertices.length;c<d;c++){b=this.vertices[c];if(b.position.x<this.boundingBox.x[0])this.boundingBox.x[0]=b.position.x;else if(b.position.x>this.boundingBox.x[1])this.boundingBox.x[1]=b.position.x;if(b.position.y<this.boundingBox.y[0])this.boundingBox.y[0]=b.position.y;
else if(b.position.y>this.boundingBox.y[1])this.boundingBox.y[1]=b.position.y;if(b.position.z<this.boundingBox.z[0])this.boundingBox.z[0]=b.position.z;else if(b.position.z>this.boundingBox.z[1])this.boundingBox.z[1]=b.position.z}}},computeBoundingSphere:function(){for(var b=0,c=0,d=this.vertices.length;c<d;c++)b=Math.max(b,this.vertices[c].position.length());this.boundingSphere={radius:b}},computeEdgeFaces:function(){function b(b,d){return Math.min(b,d)+"_"+Math.max(b,d)}function c(b,d,c){b[d]===
void 0?(b[d]={set:{},array:[]},b[d].set[c]=1,b[d].array.push(c)):b[d].set[c]===void 0&&(b[d].set[c]=1,b[d].array.push(c))}var d,e,f,g,j,k={};d=0;for(e=this.faces.length;d<e;d++)j=this.faces[d],j instanceof THREE.Face3?(f=b(j.a,j.b),c(k,f,d),f=b(j.b,j.c),c(k,f,d),f=b(j.a,j.c),c(k,f,d)):j instanceof THREE.Face4&&(f=b(j.b,j.d),c(k,f,d),f=b(j.a,j.b),c(k,f,d),f=b(j.a,j.d),c(k,f,d),f=b(j.b,j.c),c(k,f,d),f=b(j.c,j.d),c(k,f,d));d=0;for(e=this.edges.length;d<e;d++){j=this.edges[d];f=j.vertexIndices[0];g=j.vertexIndices[1];
j.faceIndices=k[b(f,g)].array;for(f=0;f<j.faceIndices.length;f++)g=j.faceIndices[f],j.faces.push(this.faces[g])}}};THREE.GeometryIdCounter=0;
THREE.Spline=function(b){function c(b,d,c,e,f,g,j){b=(c-b)*0.5;e=(e-d)*0.5;return(2*(d-c)+b+e)*j+(-3*(d-c)-2*b-e)*g+b*f+d}this.points=b;var d=[],e={x:0,y:0,z:0},f,g,j,k,m,o,p,t,n;this.initFromArray=function(b){this.points=[];for(var d=0;d<b.length;d++)this.points[d]={x:b[d][0],y:b[d][1],z:b[d][2]}};this.getPoint=function(b){f=(this.points.length-1)*b;g=Math.floor(f);j=f-g;d[0]=g==0?g:g-1;d[1]=g;d[2]=g>this.points.length-2?g:g+1;d[3]=g>this.points.length-3?g:g+2;o=this.points[d[0]];p=this.points[d[1]];
t=this.points[d[2]];n=this.points[d[3]];k=j*j;m=j*k;e.x=c(o.x,p.x,t.x,n.x,j,k,m);e.y=c(o.y,p.y,t.y,n.y,j,k,m);e.z=c(o.z,p.z,t.z,n.z,j,k,m);return e};this.getControlPointsArray=function(){var b,d,c=this.points.length,e=[];for(b=0;b<c;b++)d=this.points[b],e[b]=[d.x,d.y,d.z];return e};this.getLength=function(b){var d,c,e=d=d=0,f=new THREE.Vector3,g=new THREE.Vector3,j=[],k=0;j[0]=0;b||(b=100);c=this.points.length*b;f.copy(this.points[0]);for(b=1;b<c;b++)d=b/c,position=this.getPoint(d),g.copy(position),
k+=g.distanceTo(f),f.copy(position),d*=this.points.length-1,d=Math.floor(d),d!=e&&(j[d]=k,e=d);j[j.length]=k;return{chunks:j,total:k}};this.reparametrizeByArcLength=function(b){var d,c,e,f,g,j,k=[],m=new THREE.Vector3,o=this.getLength();k.push(m.copy(this.points[0]).clone());for(d=1;d<this.points.length;d++){c=o.chunks[d]-o.chunks[d-1];j=Math.ceil(b*c/o.total);f=(d-1)/(this.points.length-1);g=d/(this.points.length-1);for(c=1;c<j-1;c++)e=f+c*(1/j)*(g-f),position=this.getPoint(e),k.push(m.copy(position).clone());
k.push(m.copy(this.points[d]).clone())}this.points=k}};THREE.Edge=function(b,c,d,e){this.vertices=[b,c];this.vertexIndices=[d,e];this.faces=[];this.faceIndices=[]};THREE.Camera=function(b,c,d,e,f){THREE.Object3D.call(this);this.fov=b||50;this.aspect=c||1;this.near=d||0.1;this.far=e||2E3;this.target=f||new THREE.Object3D;this.useTarget=!0;this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=null;this.updateProjectionMatrix()};THREE.Camera.prototype=new THREE.Object3D;
THREE.Camera.prototype.constructor=THREE.Camera;THREE.Camera.prototype.supr=THREE.Object3D.prototype;THREE.Camera.prototype.translate=function(b,c){this.matrix.rotateAxis(c);c.multiplyScalar(b);this.position.addSelf(c);this.target.position.addSelf(c)};
THREE.Camera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var b=this.fullWidth/this.fullHeight,c=Math.tan(this.fov*Math.PI/360)*this.near,d=-c,e=b*d,b=Math.abs(b*c-e),d=Math.abs(c-d);this.projectionMatrix=THREE.Matrix4.makeFrustum(e+this.x*b/this.fullWidth,e+(this.x+this.width)*b/this.fullWidth,c-(this.y+this.height)*d/this.fullHeight,c-this.y*d/this.fullHeight,this.near,this.far)}else this.projectionMatrix=THREE.Matrix4.makePerspective(this.fov,this.aspect,this.near,this.far)};
THREE.Camera.prototype.setViewOffset=function(b,c,d,e,f,g){this.fullWidth=b;this.fullHeight=c;this.x=d;this.y=e;this.width=f;this.height=g;this.updateProjectionMatrix()};
THREE.Camera.prototype.update=function(b,c,d){if(this.useTarget)this.matrix.lookAt(this.position,this.target.position,this.up),this.matrix.setPosition(this.position),b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse),c=!0;else if(this.matrixAutoUpdate&&this.updateMatrix(),c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=
!1,c=!0,THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse);for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,c,d)};THREE.Light=function(b){THREE.Object3D.call(this);this.color=new THREE.Color(b)};THREE.Light.prototype=new THREE.Object3D;THREE.Light.prototype.constructor=THREE.Light;THREE.Light.prototype.supr=THREE.Object3D.prototype;THREE.AmbientLight=function(b){THREE.Light.call(this,b)};THREE.AmbientLight.prototype=new THREE.Light;
THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;THREE.DirectionalLight=function(b,c,d,e){THREE.Light.call(this,b);this.position=new THREE.Vector3(0,1,0);this.intensity=c||1;this.distance=d||0;this.castShadow=e!==void 0?e:!1};THREE.DirectionalLight.prototype=new THREE.Light;THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.PointLight=function(b,c,d){THREE.Light.call(this,b);this.position=new THREE.Vector3;this.intensity=c||1;this.distance=d||0};
THREE.PointLight.prototype=new THREE.Light;THREE.PointLight.prototype.constructor=THREE.PointLight;THREE.LensFlare=function(b,c,d,e){THREE.Object3D.call(this);this.positionScreen=new THREE.Vector3;this.lensFlares=[];this.customUpdateCallback=void 0;b!==void 0&&this.add(b,c,d,e)};THREE.LensFlare.prototype=new THREE.Object3D;THREE.LensFlare.prototype.constructor=THREE.LensFlare;THREE.LensFlare.prototype.supr=THREE.Object3D.prototype;
THREE.LensFlare.prototype.add=function(b,c,d,e){c===void 0&&(c=-1);d===void 0&&(d=0);if(e===void 0)e=THREE.BillboardBlending;d=Math.min(d,Math.max(0,d));this.lensFlares.push({texture:b,size:c,distance:d,x:0,y:0,z:0,scale:1,rotation:1,opacity:1,blending:e})};
THREE.LensFlare.prototype.updateLensFlares=function(){var b,c=this.lensFlares.length,d,e=-this.positionScreen.x*2,f=-this.positionScreen.y*2;for(b=0;b<c;b++)d=this.lensFlares[b],d.x=this.positionScreen.x+e*d.distance,d.y=this.positionScreen.y+f*d.distance,d.wantedRotation=d.x*Math.PI*0.25,d.rotation+=(d.wantedRotation-d.rotation)*0.25};
THREE.Material=function(b){this.id=THREE.MaterialCounter.value++;b=b||{};this.opacity=b.opacity!==void 0?b.opacity:1;this.transparent=b.transparent!==void 0?b.transparent:!1;this.blending=b.blending!==void 0?b.blending:THREE.NormalBlending;this.depthTest=b.depthTest!==void 0?b.depthTest:!0;this.polygonOffset=b.polygonOffset!==void 0?b.polygonOffset:!1;this.polygonOffsetFactor=b.polygonOffsetFactor!==void 0?b.polygonOffsetFactor:0;this.polygonOffsetUnits=b.polygonOffsetUnits!==void 0?b.polygonOffsetUnits:
0};THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NormalBlending=0;THREE.AdditiveBlending=1;THREE.SubtractiveBlending=2;THREE.MultiplyBlending=3;THREE.AdditiveAlphaBlending=4;THREE.MaterialCounter={value:0};THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.LatitudeReflectionMapping=function(){};THREE.LatitudeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};
THREE.SphericalRefractionMapping=function(){};THREE.UVMapping=function(){};THREE.LineBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==void 0?new THREE.Color(b.color):new THREE.Color(16777215);this.linewidth=b.linewidth!==void 0?b.linewidth:1;this.linecap=b.linecap!==void 0?b.linecap:"round";this.linejoin=b.linejoin!==void 0?b.linejoin:"round";this.vertexColors=b.vertexColors?b.vertexColors:!1};THREE.LineBasicMaterial.prototype=new THREE.Material;
THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial;
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
THREE.Texture=function(b,c,d,e,f,g){this.image=b;this.mapping=c!==void 0?c:new THREE.UVMapping;this.wrapS=d!==void 0?d:THREE.ClampToEdgeWrapping;this.wrapT=e!==void 0?e:THREE.ClampToEdgeWrapping;this.magFilter=f!==void 0?f:THREE.LinearFilter;this.minFilter=g!==void 0?g:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.needsUpdate=!1};
THREE.Texture.prototype={clone:function(){return new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter)}};THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.RepeatWrapping=0;THREE.ClampToEdgeWrapping=1;THREE.MirroredRepeatWrapping=2;THREE.NearestFilter=3;THREE.NearestMipMapNearestFilter=4;THREE.NearestMipMapLinearFilter=5;THREE.LinearFilter=6;THREE.LinearMipMapNearestFilter=7;THREE.LinearMipMapLinearFilter=8;THREE.ByteType=9;THREE.UnsignedByteType=10;
THREE.ShortType=11;THREE.UnsignedShortType=12;THREE.IntType=13;THREE.UnsignedIntType=14;THREE.FloatType=15;THREE.AlphaFormat=16;THREE.RGBFormat=17;THREE.RGBAFormat=18;THREE.LuminanceFormat=19;THREE.LuminanceAlphaFormat=20;THREE.Particle=function(b){THREE.Object3D.call(this);this.materials=b instanceof Array?b:[b]};THREE.Particle.prototype=new THREE.Object3D;THREE.Particle.prototype.constructor=THREE.Particle;
THREE.ParticleSystem=function(b,c){THREE.Object3D.call(this);this.geometry=b;this.materials=c instanceof Array?c:[c];this.sortParticles=!1};THREE.ParticleSystem.prototype=new THREE.Object3D;THREE.ParticleSystem.prototype.constructor=THREE.ParticleSystem;THREE.Line=function(b,c,d){THREE.Object3D.call(this);this.geometry=b;this.materials=c instanceof Array?c:[c];this.type=d!=void 0?d:THREE.LineStrip};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=new THREE.Object3D;
THREE.Line.prototype.constructor=THREE.Line;
THREE.Mesh=function(b,c){THREE.Object3D.call(this);this.geometry=b;this.materials=c&&c.length?c:[c];this.overdraw=!1;if(this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere(),this.boundRadius=b.boundingSphere.radius,this.geometry.morphTargets.length)){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var d=0;d<this.geometry.morphTargets.length;d++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[d].name]=
d}};THREE.Mesh.prototype=new THREE.Object3D;THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.supr=THREE.Object3D.prototype;THREE.Mesh.prototype.getMorphTargetIndexByName=function(b){if(this.morphTargetDictionary[b]!==void 0)return this.morphTargetDictionary[b];Fiesta.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+b+" does not exist. Returning 0.");return 0};
THREE.Bone=function(b){THREE.Object3D.call(this);this.skin=b;this.skinMatrix=new THREE.Matrix4;this.hasNoneBoneChildren=!1};THREE.Bone.prototype=new THREE.Object3D;THREE.Bone.prototype.constructor=THREE.Bone;THREE.Bone.prototype.supr=THREE.Object3D.prototype;
THREE.Bone.prototype.update=function(b,c,d){this.matrixAutoUpdate&&(c|=this.updateMatrix());if(c||this.matrixWorldNeedsUpdate)b?this.skinMatrix.multiply(b,this.matrix):this.skinMatrix.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;var e,f=this.children.length;if(this.hasNoneBoneChildren){this.matrixWorld.multiply(this.skin.matrixWorld,this.skinMatrix);for(e=0;e<f;e++)b=this.children[e],b instanceof THREE.Bone?b.update(this.skinMatrix,c,d):b.update(this.matrixWorld,!0,d)}else for(e=0;e<f;e++)this.children[e].update(this.skinMatrix,
c,d)};THREE.Bone.prototype.addChild=function(b){if(this.children.indexOf(b)===-1&&(b.parent!==void 0&&b.parent.removeChild(b),b.parent=this,this.children.push(b),!(b instanceof THREE.Bone)))this.hasNoneBoneChildren=!0};
THREE.SkinnedMesh=function(b,c){THREE.Mesh.call(this,b,c);this.identityMatrix=new THREE.Matrix4;this.bones=[];this.boneMatrices=[];var d,e,f,g,j,k;if(this.geometry.bones!==void 0){for(d=0;d<this.geometry.bones.length;d++)f=this.geometry.bones[d],g=f.pos,j=f.rotq,k=f.scl,e=this.addBone(),e.name=f.name,e.position.set(g[0],g[1],g[2]),e.quaternion.set(j[0],j[1],j[2],j[3]),e.useQuaternion=!0,k!==void 0?e.scale.set(k[0],k[1],k[2]):e.scale.set(1,1,1);for(d=0;d<this.bones.length;d++)f=this.geometry.bones[d],
e=this.bones[d],f.parent===-1?this.addChild(e):this.bones[f.parent].addChild(e);this.boneMatrices=new Float32Array(16*this.bones.length);this.pose()}};THREE.SkinnedMesh.prototype=new THREE.Mesh;THREE.SkinnedMesh.prototype.constructor=THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update=function(b,c,d){if(this.visible){this.matrixAutoUpdate&&(c|=this.updateMatrix());if(c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;var e,f=this.children.length;for(e=0;e<f;e++)b=this.children[e],b instanceof THREE.Bone?b.update(this.identityMatrix,!1,d):b.update(this.matrixWorld,c,d);d=this.bones.length;ba=this.bones;bm=this.boneMatrices;for(c=0;c<d;c++)ba[c].skinMatrix.flattenToArrayOffset(bm,
c*16)}};THREE.SkinnedMesh.prototype.addBone=function(b){b===void 0&&(b=new THREE.Bone(this));this.bones.push(b);return b};
THREE.SkinnedMesh.prototype.pose=function(){this.update(void 0,!0);for(var b,c=[],d=0;d<this.bones.length;d++)b=this.bones[d],c.push(THREE.Matrix4.makeInvert(b.skinMatrix)),b.skinMatrix.flattenToArrayOffset(this.boneMatrices,d*16);if(this.geometry.skinVerticesA===void 0){this.geometry.skinVerticesA=[];this.geometry.skinVerticesB=[];var e;for(b=0;b<this.geometry.skinIndices.length;b++){var d=this.geometry.vertices[b].position,f=this.geometry.skinIndices[b].x,g=this.geometry.skinIndices[b].y;e=new THREE.Vector3(d.x,
d.y,d.z);this.geometry.skinVerticesA.push(c[f].multiplyVector3(e));e=new THREE.Vector3(d.x,d.y,d.z);this.geometry.skinVerticesB.push(c[g].multiplyVector3(e));this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y!==1&&(d=(1-(this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y))*0.5,this.geometry.skinWeights[b].x+=d,this.geometry.skinWeights[b].y+=d)}}};THREE.Ribbon=function(b,c){THREE.Object3D.call(this);this.geometry=b;this.materials=c instanceof Array?c:[c]};
THREE.Ribbon.prototype=new THREE.Object3D;THREE.Ribbon.prototype.constructor=THREE.Ribbon;
THREE.Sound=function(b,c,d,e){THREE.Object3D.call(this);this.isPlaying=this.isAddedToDOM=this.isLoaded=!1;this.duration=-1;this.radius=c!==void 0?Math.abs(c):100;this.volume=Math.min(1,Math.max(0,d!==void 0?d:1));this.domElement=document.createElement("audio");this.domElement.volume=0;this.domElement.pan=0;this.domElement.loop=e!==void 0?e:!0;this.sources=b instanceof Array?b:[b];for(var f,d=this.sources.length,b=0;b<d;b++)if(c=this.sources[b],c.toLowerCase(),c.indexOf(".mp3")!==-1?f="audio/mpeg":
c.indexOf(".ogg")!==-1?f="audio/ogg":c.indexOf(".wav")!==-1&&(f="audio/wav"),this.domElement.canPlayType(f)){f=document.createElement("source");f.src=this.sources[b];this.domElement.THREESound=this;this.domElement.appendChild(f);this.domElement.addEventListener("canplay",this.onLoad,!0);this.domElement.load();break}};THREE.Sound.prototype=new THREE.Object3D;THREE.Sound.prototype.constructor=THREE.Sound;THREE.Sound.prototype.supr=THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad=function(){var b=this.THREESound;if(!b.isLoaded)this.removeEventListener("canplay",this.onLoad,!0),b.isLoaded=!0,b.duration=this.duration,b.isPlaying&&b.play()};THREE.Sound.prototype.addToDOM=function(b){this.isAddedToDOM=!0;b.appendChild(this.domElement)};THREE.Sound.prototype.play=function(b){this.isPlaying=!0;if(this.isLoaded&&(this.domElement.play(),b))this.domElement.currentTime=b%this.duration};THREE.Sound.prototype.pause=function(){this.isPlaying=!1;this.domElement.pause()};
THREE.Sound.prototype.stop=function(){this.isPlaying=!1;this.domElement.pause();this.domElement.currentTime=0};THREE.Sound.prototype.calculateVolumeAndPan=function(b){b=b.length();this.domElement.volume=b<=this.radius?this.volume*(1-b/this.radius):0};
THREE.Sound.prototype.update=function(b,c,d){this.matrixAutoUpdate&&(this.matrix.setPosition(this.position),c=!0);if(c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;for(var e=this.children.length,b=0;b<e;b++)this.children[b].update(this.matrixWorld,c,d)};THREE.LOD=function(){THREE.Object3D.call(this);this.LODs=[]};THREE.LOD.prototype=new THREE.Object3D;THREE.LOD.prototype.constructor=THREE.LOD;
THREE.LOD.prototype.supr=THREE.Object3D.prototype;THREE.LOD.prototype.add=function(b,c){c===void 0&&(c=0);for(var c=Math.abs(c),d=0;d<this.LODs.length;d++)if(c<this.LODs[d].visibleAtDistance)break;this.LODs.splice(d,0,{visibleAtDistance:c,object3D:b});this.addChild(b)};
THREE.LOD.prototype.update=function(b,c,d){this.matrixAutoUpdate&&(c|=this.updateMatrix());if(c||this.matrixWorldNeedsUpdate)b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,c=!0;if(this.LODs.length>1){b=d.matrixWorldInverse;b=-(b.n31*this.position.x+b.n32*this.position.y+b.n33*this.position.z+b.n34);this.LODs[0].object3D.visible=!0;for(var e=1;e<this.LODs.length;e++)if(b>=this.LODs[e].visibleAtDistance)this.LODs[e-1].object3D.visible=!1,
this.LODs[e].object3D.visible=!0;else break;for(;e<this.LODs.length;e++)this.LODs[e].object3D.visible=!1}for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,c,d)};THREE.ShadowVolume=function(b,c){b instanceof THREE.Mesh?(THREE.Mesh.call(this,b.geometry,c?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]),b.addChild(this)):THREE.Mesh.call(this,b,c?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]);this.calculateShadowVolumeGeometry()};
THREE.ShadowVolume.prototype=new THREE.Mesh;THREE.ShadowVolume.prototype.constructor=THREE.ShadowVolume;THREE.ShadowVolume.prototype.supr=THREE.Mesh.prototype;
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry=function(){if(this.geometry.edges&&this.geometry.edges.length){var b,c,d,e,f,g,j,k,m,o,p,t,n,u,v=new THREE.Geometry;v.vertices=this.geometry.vertices;e=v.faces=this.geometry.faces;var y=v.egdes=this.geometry.edges,B=v.edgeFaces=[];f=0;var z=[];b=0;for(c=e.length;b<c;b++)if(d=e[b],z.push(f),f+=d instanceof THREE.Face3?3:4,d.vertexNormals[0]=d.normal,d.vertexNormals[1]=d.normal,d.vertexNormals[2]=d.normal,d instanceof THREE.Face4)d.vertexNormals[3]=
d.normal;b=0;for(c=y.length;b<c;b++)k=y[b],d=k.faces[0],e=k.faces[1],f=k.faceIndices[0],g=k.faceIndices[1],j=k.vertexIndices[0],k=k.vertexIndices[1],d.a===j?(m="a",p=z[f]+0):d.b===j?(m="b",p=z[f]+1):d.c===j?(m="c",p=z[f]+2):d.d===j&&(m="d",p=z[f]+3),d.a===k?(m+="a",t=z[f]+0):d.b===k?(m+="b",t=z[f]+1):d.c===k?(m+="c",t=z[f]+2):d.d===k&&(m+="d",t=z[f]+3),e.a===j?(o="a",n=z[g]+0):e.b===j?(o="b",n=z[g]+1):e.c===j?(o="c",n=z[g]+2):e.d===j&&(o="d",n=z[g]+3),e.a===k?(o+="a",u=z[g]+0):e.b===k?(o+="b",u=z[g]+
1):e.c===k?(o+="c",u=z[g]+2):e.d===k&&(o+="d",u=z[g]+3),m==="ac"||m==="ad"||m==="ca"||m==="da"?p>t&&(d=p,p=t,t=d):p<t&&(d=p,p=t,t=d),o==="ac"||o==="ad"||o==="ca"||o==="da"?n>u&&(d=n,n=u,u=d):n<u&&(d=n,n=u,u=d),d=new THREE.Face4(p,t,n,u),d.normal.set(1,0,0),B.push(d);this.geometry=v}else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry)};
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo=function(b){this.geometry=new THREE.Geometry;this.geometry.boundingSphere=b.boundingSphere;this.geometry.edgeFaces=[];var c=this.geometry.vertices,d=this.geometry.faces,e=this.geometry.edgeFaces,f=b.faces,b=b.vertices,g=f.length,j,k,m,o,p,t=["a","b","c","d"];for(m=0;m<g;m++){k=c.length;j=f[m];j instanceof THREE.Face4?(o=4,k=new THREE.Face4(k,k+1,k+2,k+3)):(o=3,k=new THREE.Face3(k,k+1,k+2));k.normal.copy(j.normal);d.push(k);
for(k=0;k<o;k++)p=b[j[t[k]]],c.push(new THREE.Vertex(p.position.clone()))}for(g=0;g<f.length-1;g++){b=d[g];for(j=g+1;j<f.length;j++)k=d[j],k=this.facesShareEdge(c,b,k),k!==void 0&&(k=new THREE.Face4(k.indices[0],k.indices[3],k.indices[2],k.indices[1]),k.normal.set(1,0,0),e.push(k))}};
THREE.ShadowVolume.prototype.facesShareEdge=function(b,c,d){var e,f,g,j,k,m,o,p,t,n,u,v,y,B=0,z=["a","b","c","d"];e=c instanceof THREE.Face4?4:3;f=d instanceof THREE.Face4?4:3;for(v=0;v<e;v++){g=c[z[v]];k=b[g];for(y=0;y<f;y++)if(j=d[z[y]],m=b[j],Math.abs(k.position.x-m.position.x)<1.0E-4&&Math.abs(k.position.y-m.position.y)<1.0E-4&&Math.abs(k.position.z-m.position.z)<1.0E-4&&(B++,B===1&&(o=k,p=m,t=g,n=j,u=z[v]),B===2))return u+=z[v],u==="ad"||u==="ac"?{faces:[c,d],vertices:[o,p,m,k],indices:[t,n,
j,g],vertexTypes:[1,2,2,1],extrudable:!0}:{faces:[c,d],vertices:[o,k,m,p],indices:[t,g,j,n],vertexTypes:[1,1,2,2],extrudable:!0}}};
THREE.Sprite=function(b){THREE.Object3D.call(this);if(b.material!==void 0)this.material=b.material,this.map=void 0,this.blending=material.blending;else if(b.map!==void 0)this.map=b.map instanceof THREE.Texture?b.map:THREE.ImageUtils.loadTexture(b.map),this.material=void 0,this.blending=b.blending!==void 0?b.blending:THREE.NormalBlending;this.useScreenCoordinates=b.useScreenCoordinates!==void 0?b.useScreenCoordinates:!0;this.mergeWith3D=b.mergeWith3D!==void 0?b.mergeWith3D:!this.useScreenCoordinates;
this.affectedByDistance=b.affectedByDistance!==void 0?b.affectedByDistance:!this.useScreenCoordinates;this.scaleByViewport=b.scaleByViewport!==void 0?b.scaleByViewport:!this.affectedByDistance;this.alignment=b.alignment instanceof THREE.Vector2?b.alignment:THREE.SpriteAlignment.center;this.rotation3d=this.rotation;this.rotation=0;this.opacity=1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=new THREE.Vector2(1,1)};THREE.Sprite.prototype=new THREE.Object3D;THREE.Sprite.prototype.constructor=THREE.Sprite;
THREE.Sprite.prototype.supr=THREE.Object3D.prototype;THREE.Sprite.prototype.updateMatrix=function(){this.matrix.setPosition(this.position);this.rotation3d.set(0,0,this.rotation);this.matrix.setRotationFromEuler(this.rotation3d);if(this.scale.x!==1||this.scale.y!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,this.scale.y);this.matrixWorldNeedsUpdate=!0};THREE.SpriteAlignment={};THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);
THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1);THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1);
THREE.Scene=function(){THREE.Object3D.call(this);this.matrixAutoUpdate=!1;this.collisions=this.fog=null;this.objects=[];this.lights=[];this.sounds=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=new THREE.Object3D;THREE.Scene.prototype.constructor=THREE.Scene;THREE.Scene.prototype.supr=THREE.Object3D.prototype;THREE.Scene.prototype.addChild=function(b){this.supr.addChild.call(this,b);this.addChildRecurse(b)};
THREE.Scene.prototype.addChildRecurse=function(b){if(b instanceof THREE.Light)this.lights.indexOf(b)===-1&&this.lights.push(b);else if(b instanceof THREE.Sound)this.sounds.indexOf(b)===-1&&this.sounds.push(b);else if(!(b instanceof THREE.Camera||b instanceof THREE.Bone)&&this.objects.indexOf(b)===-1)this.objects.push(b),this.__objectsAdded.push(b);for(var c=0;c<b.children.length;c++)this.addChildRecurse(b.children[c])};
THREE.Scene.prototype.removeChild=function(b){this.supr.removeChild.call(this,b);this.removeChildRecurse(b)};THREE.Scene.prototype.removeChildRecurse=function(b){if(b instanceof THREE.Light){var c=this.lights.indexOf(b);c!==-1&&this.lights.splice(c,1)}else b instanceof THREE.Sound?(c=this.sounds.indexOf(b),c!==-1&&this.sounds.splice(c,1)):b instanceof THREE.Camera||(c=this.objects.indexOf(b),c!==-1&&(this.objects.splice(c,1),this.__objectsRemoved.push(b)));for(c=0;c<b.children.length;c++)this.removeChildRecurse(b.children[c])};
THREE.Scene.prototype.addObject=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeObject=THREE.Scene.prototype.removeChild;THREE.Scene.prototype.addLight=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeLight=THREE.Scene.prototype.removeChild;THREE.Fog=function(b,c,d){this.color=new THREE.Color(b);this.near=c||1;this.far=d||1E3};THREE.FogExp2=function(b,c){this.color=new THREE.Color(b);this.density=c!==void 0?c:2.5E-4};
THREE.Projector=function(){function b(){var b=m[k]=m[k]||new THREE.RenderableVertex;k++;return b}function c(b,d){return d.z-b.z}function d(b,d){var c=0,h=1,e=b.z+b.w,f=d.z+d.w,g=-b.z+b.w,j=-d.z+d.w;return e>=0&&f>=0&&g>=0&&j>=0?!0:e<0&&f<0||g<0&&j<0?!1:(e<0?c=Math.max(c,e/(e-f)):f<0&&(h=Math.min(h,e/(e-f))),g<0?c=Math.max(c,g/(g-j)):j<0&&(h=Math.min(h,g/(g-j))),h<c?!1:(b.lerpSelf(d,c),d.lerpSelf(b,1-h),!0))}var e,f,g=[],j,k,m=[],o,p,t=[],n,u=[],v,y,B=[],z,I,A=[],G=new THREE.Vector4,F=new THREE.Vector4,
C=new THREE.Matrix4,M=new THREE.Matrix4,J=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],O=new THREE.Vector4,w=new THREE.Vector4;this.projectVector=function(b,d){C.multiply(d.projectionMatrix,d.matrixWorldInverse);C.multiplyVector3(b);return b};this.unprojectVector=function(b,d){C.multiply(d.matrixWorld,THREE.Matrix4.makeInvert(d.projectionMatrix));C.multiplyVector3(b);return b};this.projectObjects=function(b,d,j){var d=[],h,k,m;f=0;k=
b.objects;b=0;for(h=k.length;b<h;b++){m=k[b];var o;if(!(o=!m.visible))if(o=m instanceof THREE.Mesh){a:{o=void 0;for(var t=m.matrixWorld,p=-m.geometry.boundingSphere.radius*Math.max(m.scale.x,Math.max(m.scale.y,m.scale.z)),n=0;n<6;n++)if(o=J[n].x*t.n14+J[n].y*t.n24+J[n].z*t.n34+J[n].w,o<=p){o=!1;break a}o=!0}o=!o}if(!o)o=g[f]=g[f]||new THREE.RenderableObject,f++,e=o,G.copy(m.position),C.multiplyVector3(G),e.object=m,e.z=G.z,d.push(e)}j&&d.sort(c);return d};this.projectScene=function(e,f,g){var h=[],
G=f.near,L=f.far,N,T,P,Y,V,Z,U,ea,ia,D,H,$,ca,aa,oa,va,pa;I=y=n=p=0;f.matrixAutoUpdate&&f.update(void 0,!0);e.update(void 0,!1,f);C.multiply(f.projectionMatrix,f.matrixWorldInverse);J[0].set(C.n41-C.n11,C.n42-C.n12,C.n43-C.n13,C.n44-C.n14);J[1].set(C.n41+C.n11,C.n42+C.n12,C.n43+C.n13,C.n44+C.n14);J[2].set(C.n41+C.n21,C.n42+C.n22,C.n43+C.n23,C.n44+C.n24);J[3].set(C.n41-C.n21,C.n42-C.n22,C.n43-C.n23,C.n44-C.n24);J[4].set(C.n41-C.n31,C.n42-C.n32,C.n43-C.n33,C.n44-C.n34);J[5].set(C.n41+C.n31,C.n42+C.n32,
C.n43+C.n33,C.n44+C.n34);for(N=0;N<6;N++)ia=J[N],ia.divideScalar(Math.sqrt(ia.x*ia.x+ia.y*ia.y+ia.z*ia.z));ia=this.projectObjects(e,f,!0);e=0;for(N=ia.length;e<N;e++)if(D=ia[e].object,D.visible)if(H=D.matrixWorld,$=D.matrixRotationWorld,ca=D.materials,aa=D.overdraw,k=0,D instanceof THREE.Mesh){oa=D.geometry;Y=oa.vertices;va=oa.faces;oa=oa.faceVertexUvs;T=0;for(P=Y.length;T<P;T++)j=b(),j.positionWorld.copy(Y[T].position),H.multiplyVector3(j.positionWorld),j.positionScreen.copy(j.positionWorld),C.multiplyVector4(j.positionScreen),
j.positionScreen.x/=j.positionScreen.w,j.positionScreen.y/=j.positionScreen.w,j.visible=j.positionScreen.z>G&&j.positionScreen.z<L;Y=0;for(T=va.length;Y<T;Y++){P=va[Y];if(P instanceof THREE.Face3)if(V=m[P.a],Z=m[P.b],U=m[P.c],V.visible&&Z.visible&&U.visible&&(D.doubleSided||D.flipSided!=(U.positionScreen.x-V.positionScreen.x)*(Z.positionScreen.y-V.positionScreen.y)-(U.positionScreen.y-V.positionScreen.y)*(Z.positionScreen.x-V.positionScreen.x)<0))ea=t[p]=t[p]||new THREE.RenderableFace3,p++,o=ea,o.v1.copy(V),
o.v2.copy(Z),o.v3.copy(U);else continue;else if(P instanceof THREE.Face4)if(V=m[P.a],Z=m[P.b],U=m[P.c],ea=m[P.d],V.visible&&Z.visible&&U.visible&&ea.visible&&(D.doubleSided||D.flipSided!=((ea.positionScreen.x-V.positionScreen.x)*(Z.positionScreen.y-V.positionScreen.y)-(ea.positionScreen.y-V.positionScreen.y)*(Z.positionScreen.x-V.positionScreen.x)<0||(Z.positionScreen.x-U.positionScreen.x)*(ea.positionScreen.y-U.positionScreen.y)-(Z.positionScreen.y-U.positionScreen.y)*(ea.positionScreen.x-U.positionScreen.x)<
0)))pa=u[n]=u[n]||new THREE.RenderableFace4,n++,o=pa,o.v1.copy(V),o.v2.copy(Z),o.v3.copy(U),o.v4.copy(ea);else continue;o.normalWorld.copy(P.normal);$.multiplyVector3(o.normalWorld);o.centroidWorld.copy(P.centroid);H.multiplyVector3(o.centroidWorld);o.centroidScreen.copy(o.centroidWorld);C.multiplyVector3(o.centroidScreen);U=P.vertexNormals;V=0;for(Z=U.length;V<Z;V++)ea=o.vertexNormalsWorld[V],ea.copy(U[V]),$.multiplyVector3(ea);V=0;for(Z=oa.length;V<Z;V++)if(pa=oa[V][Y]){U=0;for(ea=pa.length;U<ea;U++)o.uvs[V][U]=
pa[U]}o.meshMaterials=ca;o.faceMaterials=P.materials;o.overdraw=aa;o.z=o.centroidScreen.z;h.push(o)}}else if(D instanceof THREE.Line){M.multiply(C,H);Y=D.geometry.vertices;V=b();V.positionScreen.copy(Y[0].position);M.multiplyVector4(V.positionScreen);T=1;for(P=Y.length;T<P;T++)if(V=b(),V.positionScreen.copy(Y[T].position),M.multiplyVector4(V.positionScreen),Z=m[k-2],O.copy(V.positionScreen),w.copy(Z.positionScreen),d(O,w))O.multiplyScalar(1/O.w),w.multiplyScalar(1/w.w),H=B[y]=B[y]||new THREE.RenderableLine,
y++,v=H,v.v1.positionScreen.copy(O),v.v2.positionScreen.copy(w),v.z=Math.max(O.z,w.z),v.materials=D.materials,h.push(v)}else if(D instanceof THREE.Particle&&(F.set(D.matrixWorld.n14,D.matrixWorld.n24,D.matrixWorld.n34,1),C.multiplyVector4(F),F.z/=F.w,F.z>0&&F.z<1))H=A[I]=A[I]||new THREE.RenderableParticle,I++,z=H,z.x=F.x/F.w,z.y=F.y/F.w,z.z=F.z,z.rotation=D.rotation.z,z.scale.x=D.scale.x*Math.abs(z.x-(F.x+f.projectionMatrix.n11)/(F.w+f.projectionMatrix.n14)),z.scale.y=D.scale.y*Math.abs(z.y-(F.y+
f.projectionMatrix.n22)/(F.w+f.projectionMatrix.n24)),z.materials=D.materials,h.push(z);g&&h.sort(c);return h}};
THREE.DOMRenderer=function(){THREE.Renderer.call(this);var b=null,c=new THREE.Projector,d,e,f,g;this.domElement=document.createElement("div");this.setSize=function(b,c){d=b;e=c;f=d/2;g=e/2};this.render=function(d,e){var m,o,p,t,n,u,v,y;b=c.projectScene(d,e);m=0;for(o=b.length;m<o;m++)if(n=b[m],n instanceof THREE.RenderableParticle){v=n.x*f+f;y=n.y*g+g;p=0;for(t=n.material.length;p<t;p++)if(u=n.material[p],u instanceof THREE.ParticleDOMMaterial)u=u.domElement,u.style.left=v+"px",u.style.top=y+"px"}}};
THREE.CanvasRenderer=function(b){function c(b){if(z!=b)v.globalAlpha=z=b}function d(b){if(I!=b){switch(b){case THREE.NormalBlending:v.globalCompositeOperation="source-over";break;case THREE.AdditiveBlending:v.globalCompositeOperation="lighter";break;case THREE.SubtractiveBlending:v.globalCompositeOperation="darker"}I=b}}function e(b){if(A!=b.hex)A=b.hex,v.strokeStyle="#"+g(A.toString(16))}function f(b){if(G!=b.hex)G=b.hex,v.fillStyle="#"+g(G.toString(16))}function g(b){for(;b.length<6;)b="0"+b;return b}
var j=this,k=null,m=new THREE.Projector,b=b||{},o=b.canvas!==void 0?b.canvas:document.createElement("canvas"),p,t,n,u,v=o.getContext("2d"),y=new THREE.Color(0),B=0,z=1,I=0,A=null,G=null,F=null,C=null,M=null,J,O,w,W,R=new THREE.RenderableVertex,S=new THREE.RenderableVertex,h,Q,L,N,T,P,Y,V,Z,U,ea,ia,D=new THREE.Color(0),H=new THREE.Color(0),$=new THREE.Color(0),ca=new THREE.Color(0),aa=new THREE.Color(0),oa,va,pa,ta,$a,ab,bb,cb,db,eb,Da=new THREE.Rectangle,wa=new THREE.Rectangle,na=new THREE.Rectangle,
Sa=!1,ua=new THREE.Color,qa=new THREE.Color,Na=new THREE.Color,Oa=new THREE.Color,ja=new THREE.Vector3,La,Ma,Ta,xa,E,Pa,b=16;La=document.createElement("canvas");La.width=La.height=2;Ma=La.getContext("2d");Ma.fillStyle="rgba(0,0,0,1)";Ma.fillRect(0,0,2,2);Ta=Ma.getImageData(0,0,2,2);xa=Ta.data;E=document.createElement("canvas");E.width=E.height=b;Pa=E.getContext("2d");Pa.translate(-b/2,-b/2);Pa.scale(b,b);b--;this.domElement=o;this.sortElements=this.sortObjects=this.autoClear=!0;this.data={vertices:0,
faces:0};this.setSize=function(b,d){p=b;t=d;n=p/2;u=t/2;o.width=p;o.height=t;Da.set(-n,-u,n,u);z=1;I=0;M=C=F=G=A=null};this.setClearColor=function(b,d){y=b;B=d};this.setClearColorHex=function(b,d){y.setHex(b);B=d};this.clear=function(){v.setTransform(1,0,0,-1,n,u);if(!wa.isEmpty())wa.inflate(1),wa.minSelf(Da),y.hex==0&&B==0?v.clearRect(wa.getX(),wa.getY(),wa.getWidth(),wa.getHeight()):(d(THREE.NormalBlending),c(1),v.fillStyle="rgba("+Math.floor(y.r*255)+","+Math.floor(y.g*255)+","+Math.floor(y.b*
255)+","+B+")",v.fillRect(wa.getX(),wa.getY(),wa.getWidth(),wa.getHeight())),wa.empty()};this.render=function(b,g){function o(b){var d,c,e,h=b.lights;qa.setRGB(0,0,0);Na.setRGB(0,0,0);Oa.setRGB(0,0,0);b=0;for(d=h.length;b<d;b++)c=h[b],e=c.color,c instanceof THREE.AmbientLight?(qa.r+=e.r,qa.g+=e.g,qa.b+=e.b):c instanceof THREE.DirectionalLight?(Na.r+=e.r,Na.g+=e.g,Na.b+=e.b):c instanceof THREE.PointLight&&(Oa.r+=e.r,Oa.g+=e.g,Oa.b+=e.b)}function t(b,d,c,e){var h,f,g,j,k=b.lights,b=0;for(h=k.length;b<
h;b++)f=k[b],g=f.color,f instanceof THREE.DirectionalLight?(j=c.dot(f.position),j<=0||(j*=f.intensity,e.r+=g.r*j,e.g+=g.g*j,e.b+=g.b*j)):f instanceof THREE.PointLight&&(j=c.dot(ja.sub(f.position,d).normalize()),j<=0||(j*=f.distance==0?1:1-Math.min(d.distanceTo(f.position)/f.distance,1),j!=0&&(j*=f.intensity,e.r+=g.r*j,e.g+=g.g*j,e.b+=g.b*j)))}function p(b,h,g){c(g.opacity);d(g.blending);var j,k,m,o,aa,t;if(g instanceof THREE.ParticleBasicMaterial){if(g.map)o=g.map.image,aa=o.width>>1,t=o.height>>
1,g=h.scale.x*n,m=h.scale.y*u,j=g*aa,k=m*t,na.set(b.x-j,b.y-k,b.x+j,b.y+k),Da.instersects(na)&&(v.save(),v.translate(b.x,b.y),v.rotate(-h.rotation),v.scale(g,-m),v.translate(-aa,-t),v.drawImage(o,0,0),v.restore())}else g instanceof THREE.ParticleCanvasMaterial&&(j=h.scale.x*n,k=h.scale.y*u,na.set(b.x-j,b.y-k,b.x+j,b.y+k),Da.instersects(na)&&(e(g.color),f(g.color),v.save(),v.translate(b.x,b.y),v.rotate(-h.rotation),v.scale(j,k),g.program(v),v.restore()))}function z(b,h,f,g){c(g.opacity);d(g.blending);
v.beginPath();v.moveTo(b.positionScreen.x,b.positionScreen.y);v.lineTo(h.positionScreen.x,h.positionScreen.y);v.closePath();if(g instanceof THREE.LineBasicMaterial){b=g.linewidth;if(F!=b)v.lineWidth=F=b;b=g.linecap;if(C!=b)v.lineCap=C=b;b=g.linejoin;if(M!=b)v.lineJoin=M=b;e(g.color);v.stroke();na.inflate(g.linewidth*2)}}function y(b,e,f,k,m,o,p,n,u){j.data.vertices+=3;j.data.faces++;c(n.opacity);d(n.blending);h=b.positionScreen.x;Q=b.positionScreen.y;L=e.positionScreen.x;N=e.positionScreen.y;T=f.positionScreen.x;
P=f.positionScreen.y;B(h,Q,L,N,T,P);if(n instanceof THREE.MeshBasicMaterial)if(n.map)n.map.mapping instanceof THREE.UVMapping&&(ta=p.uvs[0],K(h,Q,L,N,T,P,n.map.image,ta[k].u,ta[k].v,ta[m].u,ta[m].v,ta[o].u,ta[o].v));else if(n.envMap){if(n.envMap.mapping instanceof THREE.SphericalReflectionMapping)b=g.matrixWorldInverse,ja.copy(p.vertexNormalsWorld[0]),$a=(ja.x*b.n11+ja.y*b.n12+ja.z*b.n13)*0.5+0.5,ab=-(ja.x*b.n21+ja.y*b.n22+ja.z*b.n23)*0.5+0.5,ja.copy(p.vertexNormalsWorld[1]),bb=(ja.x*b.n11+ja.y*b.n12+
ja.z*b.n13)*0.5+0.5,cb=-(ja.x*b.n21+ja.y*b.n22+ja.z*b.n23)*0.5+0.5,ja.copy(p.vertexNormalsWorld[2]),db=(ja.x*b.n11+ja.y*b.n12+ja.z*b.n13)*0.5+0.5,eb=-(ja.x*b.n21+ja.y*b.n22+ja.z*b.n23)*0.5+0.5,K(h,Q,L,N,T,P,n.envMap.image,$a,ab,bb,cb,db,eb)}else n.wireframe?G(n.color,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):Aa(n.color);else if(n instanceof THREE.MeshLambertMaterial)n.map&&!n.wireframe&&(n.map.mapping instanceof THREE.UVMapping&&(ta=p.uvs[0],K(h,Q,L,N,T,P,n.map.image,ta[k].u,ta[k].v,
ta[m].u,ta[m].v,ta[o].u,ta[o].v)),d(THREE.SubtractiveBlending)),Sa?!n.wireframe&&n.shading==THREE.SmoothShading&&p.vertexNormalsWorld.length==3?(H.r=$.r=ca.r=qa.r,H.g=$.g=ca.g=qa.g,H.b=$.b=ca.b=qa.b,t(u,p.v1.positionWorld,p.vertexNormalsWorld[0],H),t(u,p.v2.positionWorld,p.vertexNormalsWorld[1],$),t(u,p.v3.positionWorld,p.vertexNormalsWorld[2],ca),aa.r=($.r+ca.r)*0.5,aa.g=($.g+ca.g)*0.5,aa.b=($.b+ca.b)*0.5,pa=Qa(H,$,ca,aa),K(h,Q,L,N,T,P,pa,0,0,1,0,0,1)):(ua.r=qa.r,ua.g=qa.g,ua.b=qa.b,t(u,p.centroidWorld,
p.normalWorld,ua),D.r=Math.max(0,Math.min(n.color.r*ua.r,1)),D.g=Math.max(0,Math.min(n.color.g*ua.g,1)),D.b=Math.max(0,Math.min(n.color.b*ua.b,1)),D.updateHex(),n.wireframe?G(D,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):Aa(D)):n.wireframe?G(n.color,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):Aa(n.color);else if(n instanceof THREE.MeshDepthMaterial)oa=g.near,va=g.far,H.r=H.g=H.b=1-Ea(b.positionScreen.z,oa,va),$.r=$.g=$.b=1-Ea(e.positionScreen.z,oa,va),ca.r=ca.g=ca.b=
1-Ea(f.positionScreen.z,oa,va),aa.r=($.r+ca.r)*0.5,aa.g=($.g+ca.g)*0.5,aa.b=($.b+ca.b)*0.5,pa=Qa(H,$,ca,aa),K(h,Q,L,N,T,P,pa,0,0,1,0,0,1);else if(n instanceof THREE.MeshNormalMaterial)D.r=Ka(p.normalWorld.x),D.g=Ka(p.normalWorld.y),D.b=Ka(p.normalWorld.z),D.updateHex(),n.wireframe?G(D,n.wireframeLinewidth,n.wireframeLinecap,n.wireframeLinejoin):Aa(D)}function A(b,e,f,k,m,o,n,p,u){j.data.vertices+=4;j.data.faces++;c(p.opacity);d(p.blending);if(p.map||p.envMap)y(b,e,k,0,1,3,n,p,u),y(m,f,o,1,2,3,n,p,
u);else if(h=b.positionScreen.x,Q=b.positionScreen.y,L=e.positionScreen.x,N=e.positionScreen.y,T=f.positionScreen.x,P=f.positionScreen.y,Y=k.positionScreen.x,V=k.positionScreen.y,Z=m.positionScreen.x,U=m.positionScreen.y,ea=o.positionScreen.x,ia=o.positionScreen.y,p instanceof THREE.MeshBasicMaterial)I(h,Q,L,N,T,P,Y,V),p.wireframe?G(p.color,p.wireframeLinewidth,p.wireframeLinecap,p.wireframeLinejoin):Aa(p.color);else if(p instanceof THREE.MeshLambertMaterial)Sa?!p.wireframe&&p.shading==THREE.SmoothShading&&
n.vertexNormalsWorld.length==4?(H.r=$.r=ca.r=aa.r=qa.r,H.g=$.g=ca.g=aa.g=qa.g,H.b=$.b=ca.b=aa.b=qa.b,t(u,n.v1.positionWorld,n.vertexNormalsWorld[0],H),t(u,n.v2.positionWorld,n.vertexNormalsWorld[1],$),t(u,n.v4.positionWorld,n.vertexNormalsWorld[3],ca),t(u,n.v3.positionWorld,n.vertexNormalsWorld[2],aa),pa=Qa(H,$,ca,aa),B(h,Q,L,N,Y,V),K(h,Q,L,N,Y,V,pa,0,0,1,0,0,1),B(Z,U,T,P,ea,ia),K(Z,U,T,P,ea,ia,pa,1,0,1,1,0,1)):(ua.r=qa.r,ua.g=qa.g,ua.b=qa.b,t(u,n.centroidWorld,n.normalWorld,ua),D.r=Math.max(0,Math.min(p.color.r*
ua.r,1)),D.g=Math.max(0,Math.min(p.color.g*ua.g,1)),D.b=Math.max(0,Math.min(p.color.b*ua.b,1)),D.updateHex(),I(h,Q,L,N,T,P,Y,V),p.wireframe?G(D,p.wireframeLinewidth,p.wireframeLinecap,p.wireframeLinejoin):Aa(D)):(I(h,Q,L,N,T,P,Y,V),p.wireframe?G(p.color,p.wireframeLinewidth,p.wireframeLinecap,p.wireframeLinejoin):Aa(p.color));else if(p instanceof THREE.MeshNormalMaterial)D.r=Ka(n.normalWorld.x),D.g=Ka(n.normalWorld.y),D.b=Ka(n.normalWorld.z),D.updateHex(),I(h,Q,L,N,T,P,Y,V),p.wireframe?G(D,p.wireframeLinewidth,
p.wireframeLinecap,p.wireframeLinejoin):Aa(D);else if(p instanceof THREE.MeshDepthMaterial)oa=g.near,va=g.far,H.r=H.g=H.b=1-Ea(b.positionScreen.z,oa,va),$.r=$.g=$.b=1-Ea(e.positionScreen.z,oa,va),ca.r=ca.g=ca.b=1-Ea(k.positionScreen.z,oa,va),aa.r=aa.g=aa.b=1-Ea(f.positionScreen.z,oa,va),pa=Qa(H,$,ca,aa),B(h,Q,L,N,Y,V),K(h,Q,L,N,Y,V,pa,0,0,1,0,0,1),B(Z,U,T,P,ea,ia),K(Z,U,T,P,ea,ia,pa,1,0,1,1,0,1)}function B(b,d,c,e,h,f){v.beginPath();v.moveTo(b,d);v.lineTo(c,e);v.lineTo(h,f);v.lineTo(b,d);v.closePath()}
function I(b,d,c,e,h,f,g,j){v.beginPath();v.moveTo(b,d);v.lineTo(c,e);v.lineTo(h,f);v.lineTo(g,j);v.lineTo(b,d);v.closePath()}function G(b,d,c,h){if(F!=d)v.lineWidth=F=d;if(C!=c)v.lineCap=C=c;if(M!=h)v.lineJoin=M=h;e(b);v.stroke();na.inflate(d*2)}function Aa(b){f(b);v.fill()}function K(b,d,c,e,h,f,g,j,k,m,o,aa,p){var n,t;n=g.width-1;t=g.height-1;j*=n;k*=t;m*=n;o*=t;aa*=n;p*=t;c-=b;e-=d;h-=b;f-=d;m-=j;o-=k;aa-=j;p-=k;n=m*p-aa*o;n!=0&&(t=1/n,n=(p*c-o*h)*t,o=(p*e-o*f)*t,c=(m*h-aa*c)*t,e=(m*f-aa*e)*t,
b=b-n*j-c*k,d=d-o*j-e*k,v.save(),v.transform(n,o,c,e,b,d),v.clip(),v.drawImage(g,0,0),v.restore())}function Qa(b,d,c,e){var h=~~(b.r*255),f=~~(b.g*255),b=~~(b.b*255),g=~~(d.r*255),j=~~(d.g*255),d=~~(d.b*255),k=~~(c.r*255),m=~~(c.g*255),c=~~(c.b*255),o=~~(e.r*255),aa=~~(e.g*255),e=~~(e.b*255);xa[0]=h<0?0:h>255?255:h;xa[1]=f<0?0:f>255?255:f;xa[2]=b<0?0:b>255?255:b;xa[4]=g<0?0:g>255?255:g;xa[5]=j<0?0:j>255?255:j;xa[6]=d<0?0:d>255?255:d;xa[8]=k<0?0:k>255?255:k;xa[9]=m<0?0:m>255?255:m;xa[10]=c<0?0:c>255?
255:c;xa[12]=o<0?0:o>255?255:o;xa[13]=aa<0?0:aa>255?255:aa;xa[14]=e<0?0:e>255?255:e;Ma.putImageData(Ta,0,0);Pa.drawImage(La,0,0);return E}function Ea(b,d,c){b=(b-d)/(c-d);return b*b*(3-2*b)}function Ka(b){b=(b+1)*0.5;return b<0?0:b>1?1:b}function Ba(b,d){var c=d.x-b.x,e=d.y-b.y,h=1/Math.sqrt(c*c+e*e);c*=h;e*=h;d.x+=c;d.y+=e;b.x-=c;b.y-=e}var Ra,hb,X,da,fa,ga,ha,la;this.autoClear?this.clear():v.setTransform(1,0,0,-1,n,u);j.data.vertices=0;j.data.faces=0;k=m.projectScene(b,g,this.sortElements);(Sa=
b.lights.length>0)&&o(b);Ra=0;for(hb=k.length;Ra<hb;Ra++){X=k[Ra];na.empty();if(X instanceof THREE.RenderableParticle){J=X;J.x*=n;J.y*=u;da=0;for(fa=X.materials.length;da<fa;)la=X.materials[da++],la.opacity!=0&&p(J,X,la,b)}else if(X instanceof THREE.RenderableLine){if(J=X.v1,O=X.v2,J.positionScreen.x*=n,J.positionScreen.y*=u,O.positionScreen.x*=n,O.positionScreen.y*=u,na.addPoint(J.positionScreen.x,J.positionScreen.y),na.addPoint(O.positionScreen.x,O.positionScreen.y),Da.instersects(na)){da=0;for(fa=
X.materials.length;da<fa;)la=X.materials[da++],la.opacity!=0&&z(J,O,X,la,b)}}else if(X instanceof THREE.RenderableFace3){if(J=X.v1,O=X.v2,w=X.v3,J.positionScreen.x*=n,J.positionScreen.y*=u,O.positionScreen.x*=n,O.positionScreen.y*=u,w.positionScreen.x*=n,w.positionScreen.y*=u,X.overdraw&&(Ba(J.positionScreen,O.positionScreen),Ba(O.positionScreen,w.positionScreen),Ba(w.positionScreen,J.positionScreen)),na.add3Points(J.positionScreen.x,J.positionScreen.y,O.positionScreen.x,O.positionScreen.y,w.positionScreen.x,
w.positionScreen.y),Da.instersects(na)){da=0;for(fa=X.meshMaterials.length;da<fa;)if(la=X.meshMaterials[da++],la instanceof THREE.MeshFaceMaterial){ga=0;for(ha=X.faceMaterials.length;ga<ha;)(la=X.faceMaterials[ga++])&&la.opacity!=0&&y(J,O,w,0,1,2,X,la,b)}else la.opacity!=0&&y(J,O,w,0,1,2,X,la,b)}}else if(X instanceof THREE.RenderableFace4&&(J=X.v1,O=X.v2,w=X.v3,W=X.v4,J.positionScreen.x*=n,J.positionScreen.y*=u,O.positionScreen.x*=n,O.positionScreen.y*=u,w.positionScreen.x*=n,w.positionScreen.y*=
u,W.positionScreen.x*=n,W.positionScreen.y*=u,R.positionScreen.copy(O.positionScreen),S.positionScreen.copy(W.positionScreen),X.overdraw&&(Ba(J.positionScreen,O.positionScreen),Ba(O.positionScreen,W.positionScreen),Ba(W.positionScreen,J.positionScreen),Ba(w.positionScreen,R.positionScreen),Ba(w.positionScreen,S.positionScreen)),na.addPoint(J.positionScreen.x,J.positionScreen.y),na.addPoint(O.positionScreen.x,O.positionScreen.y),na.addPoint(w.positionScreen.x,w.positionScreen.y),na.addPoint(W.positionScreen.x,
W.positionScreen.y),Da.instersects(na))){da=0;for(fa=X.meshMaterials.length;da<fa;)if(la=X.meshMaterials[da++],la instanceof THREE.MeshFaceMaterial){ga=0;for(ha=X.faceMaterials.length;ga<ha;)(la=X.faceMaterials[ga++])&&la.opacity!=0&&A(J,O,w,W,R,S,X,la,b)}else la.opacity!=0&&A(J,O,w,W,R,S,X,la,b)}wa.addRectangle(na)}v.setTransform(1,0,0,1,0,0)}};
THREE.SVGRenderer=function(){function b(b,d,c){var e,h,f,g;e=0;for(h=b.lights.length;e<h;e++)f=b.lights[e],f instanceof THREE.DirectionalLight?(g=d.normalWorld.dot(f.position)*f.intensity,g>0&&(c.r+=f.color.r*g,c.g+=f.color.g*g,c.b+=f.color.b*g)):f instanceof THREE.PointLight&&(W.sub(f.position,d.centroidWorld),W.normalize(),g=d.normalWorld.dot(W)*f.intensity,g>0&&(c.r+=f.color.r*g,c.g+=f.color.g*g,c.b+=f.color.b*g))}function c(d,c,k,m,p,n){j.data.vertices+=3;j.data.faces++;h=e(Q++);h.setAttribute("d",
"M "+d.positionScreen.x+" "+d.positionScreen.y+" L "+c.positionScreen.x+" "+c.positionScreen.y+" L "+k.positionScreen.x+","+k.positionScreen.y+"z");p instanceof THREE.MeshBasicMaterial?F.hex=p.color.hex:p instanceof THREE.MeshLambertMaterial?G?(C.r=M.r,C.g=M.g,C.b=M.b,b(n,m,C),F.r=Math.max(0,Math.min(p.color.r*C.r,1)),F.g=Math.max(0,Math.min(p.color.g*C.g,1)),F.b=Math.max(0,Math.min(p.color.b*C.b,1)),F.updateHex()):F.hex=p.color.hex:p instanceof THREE.MeshDepthMaterial?(w=1-p.__2near/(p.__farPlusNear-
m.z*p.__farMinusNear),F.setRGB(w,w,w)):p instanceof THREE.MeshNormalMaterial&&F.setRGB(f(m.normalWorld.x),f(m.normalWorld.y),f(m.normalWorld.z));p.wireframe?h.setAttribute("style","fill: none; stroke: #"+g(F.hex.toString(16))+"; stroke-width: "+p.wireframeLinewidth+"; stroke-opacity: "+p.opacity+"; stroke-linecap: "+p.wireframeLinecap+"; stroke-linejoin: "+p.wireframeLinejoin):h.setAttribute("style","fill: #"+g(F.hex.toString(16))+"; fill-opacity: "+p.opacity);o.appendChild(h)}function d(d,c,k,m,
p,n,t){j.data.vertices+=4;j.data.faces++;h=e(Q++);h.setAttribute("d","M "+d.positionScreen.x+" "+d.positionScreen.y+" L "+c.positionScreen.x+" "+c.positionScreen.y+" L "+k.positionScreen.x+","+k.positionScreen.y+" L "+m.positionScreen.x+","+m.positionScreen.y+"z");n instanceof THREE.MeshBasicMaterial?F.hex=n.color.hex:n instanceof THREE.MeshLambertMaterial?G?(C.r=M.r,C.g=M.g,C.b=M.b,b(t,p,C),F.r=Math.max(0,Math.min(n.color.r*C.r,1)),F.g=Math.max(0,Math.min(n.color.g*C.g,1)),F.b=Math.max(0,Math.min(n.color.b*
C.b,1)),F.updateHex()):F.hex=n.color.hex:n instanceof THREE.MeshDepthMaterial?(w=1-n.__2near/(n.__farPlusNear-p.z*n.__farMinusNear),F.setRGB(w,w,w)):n instanceof THREE.MeshNormalMaterial&&F.setRGB(f(p.normalWorld.x),f(p.normalWorld.y),f(p.normalWorld.z));n.wireframe?h.setAttribute("style","fill: none; stroke: #"+g(F.hex.toString(16))+"; stroke-width: "+n.wireframeLinewidth+"; stroke-opacity: "+n.opacity+"; stroke-linecap: "+n.wireframeLinecap+"; stroke-linejoin: "+n.wireframeLinejoin):h.setAttribute("style",
"fill: #"+g(F.hex.toString(16))+"; fill-opacity: "+n.opacity);o.appendChild(h)}function e(b){R[b]==null&&(R[b]=document.createElementNS("http://www.w3.org/2000/svg","path"),N==0&&R[b].setAttribute("shape-rendering","crispEdges"));return R[b]}function f(b){b=(b+1)*0.5;return b<0?0:b>1?1:b}function g(b){for(;b.length<6;)b="0"+b;return b}var j=this,k=null,m=new THREE.Projector,o=document.createElementNS("http://www.w3.org/2000/svg","svg"),p,t,n,u,v,y,B,z,I=new THREE.Rectangle,A=new THREE.Rectangle,G=
!1,F=new THREE.Color(16777215),C=new THREE.Color(16777215),M=new THREE.Color(0),J=new THREE.Color(0),O=new THREE.Color(0),w,W=new THREE.Vector3,R=[],S=[],h,Q,L,N=1;this.domElement=o;this.sortElements=this.sortObjects=this.autoClear=!0;this.data={vertices:0,faces:0};this.setQuality=function(b){switch(b){case "high":N=1;break;case "low":N=0}};this.setSize=function(b,d){p=b;t=d;n=p/2;u=t/2;o.setAttribute("viewBox",-n+" "+-u+" "+p+" "+t);o.setAttribute("width",p);o.setAttribute("height",t);I.set(-n,-u,
n,u)};this.clear=function(){for(;o.childNodes.length>0;)o.removeChild(o.childNodes[0])};this.render=function(b,e){var f,p,t,F,C,w,D,H;this.autoClear&&this.clear();j.data.vertices=0;j.data.faces=0;k=m.projectScene(b,e,this.sortElements);L=Q=0;if(G=b.lights.length>0){D=b.lights;M.setRGB(0,0,0);J.setRGB(0,0,0);O.setRGB(0,0,0);f=0;for(p=D.length;f<p;f++)t=D[f],F=t.color,t instanceof THREE.AmbientLight?(M.r+=F.r,M.g+=F.g,M.b+=F.b):t instanceof THREE.DirectionalLight?(J.r+=F.r,J.g+=F.g,J.b+=F.b):t instanceof
THREE.PointLight&&(O.r+=F.r,O.g+=F.g,O.b+=F.b)}f=0;for(p=k.length;f<p;f++)if(D=k[f],A.empty(),D instanceof THREE.RenderableParticle){v=D;v.x*=n;v.y*=-u;t=0;for(F=D.materials.length;t<F;)t++}else if(D instanceof THREE.RenderableLine){if(v=D.v1,y=D.v2,v.positionScreen.x*=n,v.positionScreen.y*=-u,y.positionScreen.x*=n,y.positionScreen.y*=-u,A.addPoint(v.positionScreen.x,v.positionScreen.y),A.addPoint(y.positionScreen.x,y.positionScreen.y),I.instersects(A)){t=0;for(F=D.materials.length;t<F;)if((H=D.materials[t++])&&
H.opacity!=0){C=v;w=y;var W=L++;S[W]==null&&(S[W]=document.createElementNS("http://www.w3.org/2000/svg","line"),N==0&&S[W].setAttribute("shape-rendering","crispEdges"));h=S[W];h.setAttribute("x1",C.positionScreen.x);h.setAttribute("y1",C.positionScreen.y);h.setAttribute("x2",w.positionScreen.x);h.setAttribute("y2",w.positionScreen.y);H instanceof THREE.LineBasicMaterial&&(h.setAttribute("style","fill: none; stroke: ##"+g(H.color.hex.toString(16))+"; stroke-width: "+H.linewidth+"; stroke-opacity: "+
H.opacity+"; stroke-linecap: "+H.linecap+"; stroke-linejoin: "+H.linejoin),o.appendChild(h))}}}else if(D instanceof THREE.RenderableFace3){if(v=D.v1,y=D.v2,B=D.v3,v.positionScreen.x*=n,v.positionScreen.y*=-u,y.positionScreen.x*=n,y.positionScreen.y*=-u,B.positionScreen.x*=n,B.positionScreen.y*=-u,A.addPoint(v.positionScreen.x,v.positionScreen.y),A.addPoint(y.positionScreen.x,y.positionScreen.y),A.addPoint(B.positionScreen.x,B.positionScreen.y),I.instersects(A)){t=0;for(F=D.meshMaterials.length;t<
F;)if(H=D.meshMaterials[t++],H instanceof THREE.MeshFaceMaterial){C=0;for(w=D.faceMaterials.length;C<w;)(H=D.faceMaterials[C++])&&H.opacity!=0&&c(v,y,B,D,H,b)}else H&&H.opacity!=0&&c(v,y,B,D,H,b)}}else if(D instanceof THREE.RenderableFace4&&(v=D.v1,y=D.v2,B=D.v3,z=D.v4,v.positionScreen.x*=n,v.positionScreen.y*=-u,y.positionScreen.x*=n,y.positionScreen.y*=-u,B.positionScreen.x*=n,B.positionScreen.y*=-u,z.positionScreen.x*=n,z.positionScreen.y*=-u,A.addPoint(v.positionScreen.x,v.positionScreen.y),A.addPoint(y.positionScreen.x,
y.positionScreen.y),A.addPoint(B.positionScreen.x,B.positionScreen.y),A.addPoint(z.positionScreen.x,z.positionScreen.y),I.instersects(A))){t=0;for(F=D.meshMaterials.length;t<F;)if(H=D.meshMaterials[t++],H instanceof THREE.MeshFaceMaterial){C=0;for(w=D.faceMaterials.length;C<w;)(H=D.faceMaterials[C++])&&H.opacity!=0&&d(v,y,B,z,D,H,b)}else H&&H.opacity!=0&&d(v,y,B,z,D,H,b)}}};
THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",fog_fragment:"#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
envmap_pars_fragment:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",envmap_fragment:"#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
envmap_vertex:"#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",map_particle_pars_fragment:"#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
map_particle_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",map_pars_fragment:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",map_pars_vertex:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",map_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",map_vertex:"#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",lightmap_fragment:"#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",lights_pars_vertex:"uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
lights_vertex:"if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}",
lights_pars_fragment:"#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",lights_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
color_pars_fragment:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\nvColor = color;\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",skinning_vertex:"#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
default_vertex:"#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"};THREE.UniformsUtils={merge:function(b){var c,d,e,f={};for(c=0;c<b.length;c++)for(d in e=this.clone(b[c]),e)f[d]=e[d];return f},clone:function(b){var c,d,e,f={};for(c in b)for(d in f[c]={},b[c])e=b[c][d],f[c][d]=e instanceof THREE.Color||e instanceof THREE.Vector3||e instanceof THREE.Texture?e.clone():e;return f}};
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
THREE.WebGLRenderer=function(b){function c(b,d,c){var e,f,g,j=b.vertices,k=j.length,m=b.colors,o=m.length,p=b.__vertexArray,n=b.__colorArray,t=b.__sortArray,u=b.__dirtyVertices,v=b.__dirtyColors;if(c.sortParticles){_projScreenMatrix.multiplySelf(c.matrixWorld);for(e=0;e<k;e++)f=j[e].position,_vector3.copy(f),_projScreenMatrix.multiplyVector3(_vector3),t[e]=[_vector3.z,e];t.sort(function(b,d){return d[0]-b[0]});for(e=0;e<k;e++)f=j[t[e][1]].position,g=e*3,p[g]=f.x,p[g+1]=f.y,p[g+2]=f.z;for(e=0;e<o;e++)g=
e*3,color=m[t[e][1]],n[g]=color.r,n[g+1]=color.g,n[g+2]=color.b}else{if(u)for(e=0;e<k;e++)f=j[e].position,g=e*3,p[g]=f.x,p[g+1]=f.y,p[g+2]=f.z;if(v)for(e=0;e<o;e++)color=m[e],g=e*3,n[g]=color.r,n[g+1]=color.g,n[g+2]=color.b}if(u||c.sortParticles)h.bindBuffer(h.ARRAY_BUFFER,b.__webglVertexBuffer),h.bufferData(h.ARRAY_BUFFER,p,d);if(v||c.sortParticles)h.bindBuffer(h.ARRAY_BUFFER,b.__webglColorBuffer),h.bufferData(h.ARRAY_BUFFER,n,d)}function d(b,d,c,e,f){e.program||S.initMaterial(e,d,c,f);var g=e.program,
j=g.uniforms,k=e.uniforms;g!=L&&(h.useProgram(g),L=g);h.uniformMatrix4fv(j.projectionMatrix,!1,_projectionMatrixArray);if(c&&(e instanceof THREE.MeshBasicMaterial||e instanceof THREE.MeshLambertMaterial||e instanceof THREE.MeshPhongMaterial||e instanceof THREE.LineBasicMaterial||e instanceof THREE.ParticleBasicMaterial||e.fog))if(k.fogColor.value=c.color,c instanceof THREE.Fog)k.fogNear.value=c.near,k.fogFar.value=c.far;else if(c instanceof THREE.FogExp2)k.fogDensity.value=c.density;if(e instanceof
THREE.MeshPhongMaterial||e instanceof THREE.MeshLambertMaterial||e.lights){var m,p,o=0,n=0,t=0,u,v,z,y,B=_lights,A=B.directional.colors,F=B.directional.positions,I=B.point.colors,C=B.point.positions,G=B.point.distances,D=0,E=0,c=p=y=0;for(m=d.length;c<m;c++)if(p=d[c],u=p.color,v=p.position,z=p.intensity,y=p.distance,p instanceof THREE.AmbientLight)o+=u.r,n+=u.g,t+=u.b;else if(p instanceof THREE.DirectionalLight)y=D*3,A[y]=u.r*z,A[y+1]=u.g*z,A[y+2]=u.b*z,F[y]=v.x,F[y+1]=v.y,F[y+2]=v.z,D+=1;else if(p instanceof
THREE.PointLight)p=E*3,I[p]=u.r*z,I[p+1]=u.g*z,I[p+2]=u.b*z,C[p]=v.x,C[p+1]=v.y,C[p+2]=v.z,G[E]=y,E+=1;for(c=D*3;c<A.length;c++)A[c]=0;for(c=E*3;c<I.length;c++)I[c]=0;B.point.length=E;B.directional.length=D;B.ambient[0]=o;B.ambient[1]=n;B.ambient[2]=t;c=_lights;k.enableLighting.value=c.directional.length+c.point.length;k.ambientLightColor.value=c.ambient;k.directionalLightColor.value=c.directional.colors;k.directionalLightDirection.value=c.directional.positions;k.pointLightColor.value=c.point.colors;
k.pointLightPosition.value=c.point.positions;k.pointLightDistance.value=c.point.distances}if(e instanceof THREE.MeshBasicMaterial||e instanceof THREE.MeshLambertMaterial||e instanceof THREE.MeshPhongMaterial)k.diffuse.value=e.color,k.opacity.value=e.opacity,(k.map.texture=e.map)&&k.offsetRepeat.value.set(e.map.offset.x,e.map.offset.y,e.map.repeat.x,e.map.repeat.y),k.lightMap.texture=e.lightMap,k.envMap.texture=e.envMap,k.reflectivity.value=e.reflectivity,k.refractionRatio.value=e.refractionRatio,
k.combine.value=e.combine,k.useRefract.value=e.envMap&&e.envMap.mapping instanceof THREE.CubeRefractionMapping;if(e instanceof THREE.LineBasicMaterial)k.diffuse.value=e.color,k.opacity.value=e.opacity;else if(e instanceof THREE.ParticleBasicMaterial)k.psColor.value=e.color,k.opacity.value=e.opacity,k.size.value=e.size,k.scale.value=_canvas.height/2,k.map.texture=e.map;else if(e instanceof THREE.MeshPhongMaterial)k.ambient.value=e.ambient,k.specular.value=e.specular,k.shininess.value=e.shininess;else if(e instanceof
THREE.MeshDepthMaterial)k.mNear.value=b.near,k.mFar.value=b.far,k.opacity.value=e.opacity;else if(e instanceof THREE.MeshNormalMaterial)k.opacity.value=e.opacity;for(var H in k)if(n=g.uniforms[H])if(m=k[H],o=m.type,c=m.value,o=="i")h.uniform1i(n,c);else if(o=="f")h.uniform1f(n,c);else if(o=="fv1")h.uniform1fv(n,c);else if(o=="fv")h.uniform3fv(n,c);else if(o=="v2")h.uniform2f(n,c.x,c.y);else if(o=="v3")h.uniform3f(n,c.x,c.y,c.z);else if(o=="v4")h.uniform4f(n,c.x,c.y,c.z,c.w);else if(o=="c")h.uniform3f(n,
c.r,c.g,c.b);else if(o=="t"&&(h.uniform1i(n,c),m=m.texture))if(m.image instanceof Array&&m.image.length==6){if(m.image.length==6){if(m.needsUpdate){if(m.__webglInit){h.bindTexture(h.TEXTURE_CUBE_MAP,m.image.__webglTextureCube);for(o=0;o<6;++o)h.texSubImage2D(h.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,0,0,h.RGBA,h.UNSIGNED_BYTE,m.image[o])}else{m.image.__webglTextureCube=h.createTexture();h.bindTexture(h.TEXTURE_CUBE_MAP,m.image.__webglTextureCube);for(o=0;o<6;++o)h.texImage2D(h.TEXTURE_CUBE_MAP_POSITIVE_X+
o,0,h.RGBA,h.RGBA,h.UNSIGNED_BYTE,m.image[o]);m.__webglInit=!0}M(h.TEXTURE_CUBE_MAP,m,m.image[0]);h.bindTexture(h.TEXTURE_CUBE_MAP,null);m.needsUpdate=!1}h.activeTexture(h.TEXTURE0+c);h.bindTexture(h.TEXTURE_CUBE_MAP,m.image.__webglTextureCube)}}else J(m,c);h.uniformMatrix4fv(j.modelViewMatrix,!1,f._modelViewMatrixArray);h.uniformMatrix3fv(j.normalMatrix,!1,f._normalMatrixArray);(e instanceof THREE.MeshShaderMaterial||e instanceof THREE.MeshPhongMaterial||e.envMap)&&j.cameraPosition!==null&&h.uniform3f(j.cameraPosition,
b.position.x,b.position.y,b.position.z);(e instanceof THREE.MeshShaderMaterial||e.envMap||e.skinning)&&j.objectMatrix!==null&&h.uniformMatrix4fv(j.objectMatrix,!1,f._objectMatrixArray);(e instanceof THREE.MeshPhongMaterial||e instanceof THREE.MeshLambertMaterial||e instanceof THREE.MeshShaderMaterial||e.skinning)&&j.viewMatrix!==null&&h.uniformMatrix4fv(j.viewMatrix,!1,_viewMatrixArray);if(e instanceof THREE.ShadowVolumeDynamicMaterial)b=k.directionalLightDirection.value,b[0]=-d[1].position.x,b[1]=
-d[1].position.y,b[2]=-d[1].position.z,h.uniform3fv(j.directionalLightDirection,b),h.uniformMatrix4fv(j.objectMatrix,!1,f._objectMatrixArray),h.uniformMatrix4fv(j.viewMatrix,!1,_viewMatrixArray);e.skinning&&(h.uniformMatrix4fv(j.cameraInverseMatrix,!1,_viewMatrixArray),h.uniformMatrix4fv(j.boneGlobalMatrices,!1,f.boneMatrices));return g}function e(b,c,e,f,g,j){if(f.opacity!=0){var k,b=d(b,c,e,f,j).attributes;if(!f.morphTargets&&b.position>=0)h.bindBuffer(h.ARRAY_BUFFER,g.__webglVertexBuffer),h.vertexAttribPointer(b.position,
3,h.FLOAT,!1,0,0);else{c=f.program.attributes;j.morphTargetBase!==-1?(h.bindBuffer(h.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[j.morphTargetBase]),h.vertexAttribPointer(c.position,3,h.FLOAT,!1,0,0)):c.position>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglVertexBuffer),h.vertexAttribPointer(c.position,3,h.FLOAT,!1,0,0));if(j.morphTargetForcedOrder.length)for(var e=0,m=j.morphTargetForcedOrder,o=j.morphTargetInfluences;e<f.numSupportedMorphTargets&&e<m.length;)h.bindBuffer(h.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[m[e]]),
h.vertexAttribPointer(c["morphTarget"+e],3,h.FLOAT,!1,0,0),j.__webglMorphTargetInfluences[e]=o[m[e]],e++;else{var m=[],p=-1,n=0,o=j.morphTargetInfluences,t,u=o.length,e=0;for(j.morphTargetBase!==-1&&(m[j.morphTargetBase]=!0);e<f.numSupportedMorphTargets;){for(t=0;t<u;t++)!m[t]&&o[t]>p&&(n=t,p=o[n]);h.bindBuffer(h.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[n]);h.vertexAttribPointer(c["morphTarget"+e],3,h.FLOAT,!1,0,0);j.__webglMorphTargetInfluences[e]=p;m[n]=1;p=-1;e++}}f.program.uniforms.morphTargetInfluences!==
null&&h.uniform1fv(f.program.uniforms.morphTargetInfluences,j.__webglMorphTargetInfluences)}if(g.__webglCustomAttributes)for(k in g.__webglCustomAttributes)b[k]>=0&&(c=g.__webglCustomAttributes[k],h.bindBuffer(h.ARRAY_BUFFER,c.buffer),h.vertexAttribPointer(b[k],c.size,h.FLOAT,!1,0,0));b.color>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglColorBuffer),h.vertexAttribPointer(b.color,3,h.FLOAT,!1,0,0));b.normal>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglNormalBuffer),h.vertexAttribPointer(b.normal,3,h.FLOAT,
!1,0,0));b.tangent>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglTangentBuffer),h.vertexAttribPointer(b.tangent,4,h.FLOAT,!1,0,0));b.uv>=0&&(g.__webglUVBuffer?(h.bindBuffer(h.ARRAY_BUFFER,g.__webglUVBuffer),h.vertexAttribPointer(b.uv,2,h.FLOAT,!1,0,0),h.enableVertexAttribArray(b.uv)):h.disableVertexAttribArray(b.uv));b.uv2>=0&&(g.__webglUV2Buffer?(h.bindBuffer(h.ARRAY_BUFFER,g.__webglUV2Buffer),h.vertexAttribPointer(b.uv2,2,h.FLOAT,!1,0,0),h.enableVertexAttribArray(b.uv2)):h.disableVertexAttribArray(b.uv2));
f.skinning&&b.skinVertexA>=0&&b.skinVertexB>=0&&b.skinIndex>=0&&b.skinWeight>=0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinVertexABuffer),h.vertexAttribPointer(b.skinVertexA,4,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinVertexBBuffer),h.vertexAttribPointer(b.skinVertexB,4,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinIndicesBuffer),h.vertexAttribPointer(b.skinIndex,4,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinWeightsBuffer),h.vertexAttribPointer(b.skinWeight,
4,h.FLOAT,!1,0,0));j instanceof THREE.Mesh?(f.wireframe?(h.lineWidth(f.wireframeLinewidth),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,g.__webglLineBuffer),h.drawElements(h.LINES,g.__webglLineCount,h.UNSIGNED_SHORT,0)):(h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,g.__webglFaceBuffer),h.drawElements(h.TRIANGLES,g.__webglFaceCount,h.UNSIGNED_SHORT,0)),S.data.vertices+=g.__webglFaceCount,S.data.faces+=g.__webglFaceCount/3,S.data.drawCalls++):j instanceof THREE.Line?(j=j.type==THREE.LineStrip?h.LINE_STRIP:h.LINES,h.lineWidth(f.linewidth),
h.drawArrays(j,0,g.__webglLineCount),S.data.drawCalls++):j instanceof THREE.ParticleSystem?(h.drawArrays(h.POINTS,0,g.__webglParticleCount),S.data.drawCalls++):j instanceof THREE.Ribbon&&(h.drawArrays(h.TRIANGLE_STRIP,0,g.__webglVertexCount),S.data.drawCalls++)}}function f(b,d,c){if(!b.__webglVertexBuffer)b.__webglVertexBuffer=h.createBuffer();if(!b.__webglNormalBuffer)b.__webglNormalBuffer=h.createBuffer();b.hasPos&&(h.bindBuffer(h.ARRAY_BUFFER,b.__webglVertexBuffer),h.bufferData(h.ARRAY_BUFFER,
b.positionArray,h.DYNAMIC_DRAW),h.enableVertexAttribArray(d.attributes.position),h.vertexAttribPointer(d.attributes.position,3,h.FLOAT,!1,0,0));if(b.hasNormal){h.bindBuffer(h.ARRAY_BUFFER,b.__webglNormalBuffer);if(c==THREE.FlatShading){var e,f,g,j,k,m,o,p,n,t,u=b.count*3;for(t=0;t<u;t+=9)c=b.normalArray,e=c[t],f=c[t+1],g=c[t+2],j=c[t+3],m=c[t+4],p=c[t+5],k=c[t+6],o=c[t+7],n=c[t+8],e=(e+j+k)/3,f=(f+m+o)/3,g=(g+p+n)/3,c[t]=e,c[t+1]=f,c[t+2]=g,c[t+3]=e,c[t+4]=f,c[t+5]=g,c[t+6]=e,c[t+7]=f,c[t+8]=g}h.bufferData(h.ARRAY_BUFFER,
b.normalArray,h.DYNAMIC_DRAW);h.enableVertexAttribArray(d.attributes.normal);h.vertexAttribPointer(d.attributes.normal,3,h.FLOAT,!1,0,0)}h.drawArrays(h.TRIANGLES,0,b.count);b.count=0}function g(b){if(P!=b.doubleSided)b.doubleSided?h.disable(h.CULL_FACE):h.enable(h.CULL_FACE),P=b.doubleSided;if(Y!=b.flipSided)b.flipSided?h.frontFace(h.CW):h.frontFace(h.CCW),Y=b.flipSided}function j(b){Z!=b&&(b?h.enable(h.DEPTH_TEST):h.disable(h.DEPTH_TEST),Z=b)}function k(b,d,c){U!=b&&(b?h.enable(h.POLYGON_OFFSET_FILL):
h.disable(h.POLYGON_OFFSET_FILL),U=b);if(b&&(_oldPolygonOffsetFactor!=d||_oldPolygonOffsetUnits!=c))h.polygonOffset(d,c),_oldPolygonOffsetFactor=d,_oldPolygonOffsetUnits=c}function m(b){_frustum[0].set(b.n41-b.n11,b.n42-b.n12,b.n43-b.n13,b.n44-b.n14);_frustum[1].set(b.n41+b.n11,b.n42+b.n12,b.n43+b.n13,b.n44+b.n14);_frustum[2].set(b.n41+b.n21,b.n42+b.n22,b.n43+b.n23,b.n44+b.n24);_frustum[3].set(b.n41-b.n21,b.n42-b.n22,b.n43-b.n23,b.n44-b.n24);_frustum[4].set(b.n41-b.n31,b.n42-b.n32,b.n43-b.n33,b.n44-
b.n34);_frustum[5].set(b.n41+b.n31,b.n42+b.n32,b.n43+b.n33,b.n44+b.n34);for(var d,b=0;b<6;b++)d=_frustum[b],d.divideScalar(Math.sqrt(d.x*d.x+d.y*d.y+d.z*d.z))}function o(b){for(var d=b.matrixWorld,c=-b.geometry.boundingSphere.radius*Math.max(b.scale.x,Math.max(b.scale.y,b.scale.z)),e=0;e<6;e++)if(b=_frustum[e].x*d.n14+_frustum[e].y*d.n24+_frustum[e].z*d.n34+_frustum[e].w,b<=c)return!1;return!0}function p(b,d){b.list[b.count]=d;b.count+=1}function t(b){var d,c,e=b.object,f=b.opaque,g=b.transparent;
g.count=0;b=f.count=0;for(d=e.materials.length;b<d;b++)c=e.materials[b],c.transparent?p(g,c):p(f,c)}function n(b){var d,c,e,f,g=b.object,h=b.buffer,j=b.opaque,k=b.transparent;k.count=0;b=j.count=0;for(e=g.materials.length;b<e;b++)if(d=g.materials[b],d instanceof THREE.MeshFaceMaterial){d=0;for(c=h.materials.length;d<c;d++)(f=h.materials[d])&&(f.transparent?p(k,f):p(j,f))}else(f=d)&&(f.transparent?p(k,f):p(j,f))}function u(b,d){return d.z-b.z}function v(b){h.enable(h.POLYGON_OFFSET_FILL);h.polygonOffset(0.1,
1);h.enable(h.STENCIL_TEST);h.enable(h.DEPTH_TEST);h.depthMask(!1);h.colorMask(!1,!1,!1,!1);h.stencilFunc(h.ALWAYS,1,255);h.stencilOpSeparate(h.BACK,h.KEEP,h.INCR,h.KEEP);h.stencilOpSeparate(h.FRONT,h.KEEP,h.DECR,h.KEEP);var d,c=b.lights.length,e,f=b.lights,g=[],j,k,m,o,p,n=b.__webglShadowVolumes.length;for(d=0;d<c;d++)if(e=b.lights[d],e instanceof THREE.DirectionalLight&&e.castShadow){g[0]=-e.position.x;g[1]=-e.position.y;g[2]=-e.position.z;for(p=0;p<n;p++)e=b.__webglShadowVolumes[p].object,j=b.__webglShadowVolumes[p].buffer,
k=e.materials[0],k.program||S.initMaterial(k,f,void 0,e),k=k.program,m=k.uniforms,o=k.attributes,L!==k&&(h.useProgram(k),L=k,h.uniformMatrix4fv(m.projectionMatrix,!1,_projectionMatrixArray),h.uniformMatrix4fv(m.viewMatrix,!1,_viewMatrixArray),h.uniform3fv(m.directionalLightDirection,g)),e.matrixWorld.flattenToArray(e._objectMatrixArray),h.uniformMatrix4fv(m.objectMatrix,!1,e._objectMatrixArray),h.bindBuffer(h.ARRAY_BUFFER,j.__webglVertexBuffer),h.vertexAttribPointer(o.position,3,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,
j.__webglNormalBuffer),h.vertexAttribPointer(o.normal,3,h.FLOAT,!1,0,0),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,j.__webglFaceBuffer),h.cullFace(h.FRONT),h.drawElements(h.TRIANGLES,j.__webglFaceCount,h.UNSIGNED_SHORT,0),h.cullFace(h.BACK),h.drawElements(h.TRIANGLES,j.__webglFaceCount,h.UNSIGNED_SHORT,0)}h.disable(h.POLYGON_OFFSET_FILL);h.colorMask(!0,!0,!0,!0);h.stencilFunc(h.NOTEQUAL,0,255);h.stencilOp(h.KEEP,h.KEEP,h.KEEP);h.disable(h.DEPTH_TEST);V=-1;L=D.program;h.useProgram(D.program);h.uniformMatrix4fv(D.projectionLocation,
!1,_projectionMatrixArray);h.uniform1f(D.darknessLocation,D.darkness);h.bindBuffer(h.ARRAY_BUFFER,D.vertexBuffer);h.vertexAttribPointer(D.vertexLocation,3,h.FLOAT,!1,0,0);h.enableVertexAttribArray(D.vertexLocation);h.blendFunc(h.ONE,h.ONE_MINUS_SRC_ALPHA);h.blendEquation(h.FUNC_ADD);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,D.elementBuffer);h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0);h.disable(h.STENCIL_TEST);h.enable(h.DEPTH_TEST);h.depthMask(T)}function y(b,d){var c,e,f;c=_sprite.attributes;var g=
_sprite.uniforms,j=_viewportHeight/_viewportWidth,k,m=[],o=_viewportWidth*0.5,p=_viewportHeight*0.5,n=!0;h.useProgram(_sprite.program);L=_sprite.program;V=-1;ca||(h.enableVertexAttribArray(_sprite.attributes.position),h.enableVertexAttribArray(_sprite.attributes.uv),ca=!0);h.disable(h.CULL_FACE);h.enable(h.BLEND);h.depthMask(!0);h.bindBuffer(h.ARRAY_BUFFER,_sprite.vertexBuffer);h.vertexAttribPointer(c.position,2,h.FLOAT,!1,16,0);h.vertexAttribPointer(c.uv,2,h.FLOAT,!1,16,8);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,
_sprite.elementBuffer);h.uniformMatrix4fv(g.projectionMatrix,!1,_projectionMatrixArray);h.activeTexture(h.TEXTURE0);h.uniform1i(g.map,0);c=0;for(e=b.__webglSprites.length;c<e;c++)f=b.__webglSprites[c],f.useScreenCoordinates?f.z=-f.position.z:(f._modelViewMatrix.multiplyToArray(d.matrixWorldInverse,f.matrixWorld,f._modelViewMatrixArray),f.z=-f._modelViewMatrix.n34);b.__webglSprites.sort(u);c=0;for(e=b.__webglSprites.length;c<e;c++)f=b.__webglSprites[c],f.material===void 0&&f.map&&f.map.image&&f.map.image.width&&
(f.useScreenCoordinates?(h.uniform1i(g.useScreenCoordinates,1),h.uniform3f(g.screenPosition,(f.position.x-o)/o,(p-f.position.y)/p,Math.max(0,Math.min(1,f.position.z)))):(h.uniform1i(g.useScreenCoordinates,0),h.uniform1i(g.affectedByDistance,f.affectedByDistance?1:0),h.uniformMatrix4fv(g.modelViewMatrix,!1,f._modelViewMatrixArray)),k=f.map.image.width/(f.scaleByViewport?_viewportHeight:1),m[0]=k*j*f.scale.x,m[1]=k*f.scale.y,h.uniform2f(g.uvScale,f.uvScale.x,f.uvScale.y),h.uniform2f(g.uvOffset,f.uvOffset.x,
f.uvOffset.y),h.uniform2f(g.alignment,f.alignment.x,f.alignment.y),h.uniform1f(g.opacity,f.opacity),h.uniform1f(g.rotation,f.rotation),h.uniform2fv(g.scale,m),f.mergeWith3D&&!n?(h.enable(h.DEPTH_TEST),n=!0):!f.mergeWith3D&&n&&(h.disable(h.DEPTH_TEST),n=!1),C(f.blending),J(f.map,0),h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0));h.enable(h.CULL_FACE);h.enable(h.DEPTH_TEST);h.depthMask(T)}function B(b,d){var c,e,f=b.__webglLensFlares.length,g,j,k,m=new THREE.Vector3,o=_viewportHeight/_viewportWidth,
p=_viewportWidth*0.5,n=_viewportHeight*0.5,t=16/_viewportHeight,u=[t*o,t],v=[1,1,0],z=[1,1],y=H.uniforms;c=H.attributes;h.useProgram(H.program);L=H.program;V=-1;$||(h.enableVertexAttribArray(H.attributes.vertex),h.enableVertexAttribArray(H.attributes.uv),$=!0);h.uniform1i(y.occlusionMap,0);h.uniform1i(y.map,1);h.bindBuffer(h.ARRAY_BUFFER,H.vertexBuffer);h.vertexAttribPointer(c.vertex,2,h.FLOAT,!1,16,0);h.vertexAttribPointer(c.uv,2,h.FLOAT,!1,16,8);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,H.elementBuffer);
h.disable(h.CULL_FACE);h.depthMask(!1);h.activeTexture(h.TEXTURE0);h.bindTexture(h.TEXTURE_2D,H.occlusionTexture);h.activeTexture(h.TEXTURE1);for(e=0;e<f;e++)if(c=b.__webglLensFlares[e].object,m.set(c.matrixWorld.n14,c.matrixWorld.n24,c.matrixWorld.n34),d.matrixWorldInverse.multiplyVector3(m),d.projectionMatrix.multiplyVector3(m),v[0]=m.x,v[1]=m.y,v[2]=m.z,z[0]=v[0]*p+p,z[1]=v[1]*n+n,H.hasVertexTexture||z[0]>0&&z[0]<_viewportWidth&&z[1]>0&&z[1]<_viewportHeight){h.bindTexture(h.TEXTURE_2D,H.tempTexture);
h.copyTexImage2D(h.TEXTURE_2D,0,h.RGB,z[0]-8,z[1]-8,16,16,0);h.uniform1i(y.renderType,0);h.uniform2fv(y.scale,u);h.uniform3fv(y.screenPosition,v);h.disable(h.BLEND);h.enable(h.DEPTH_TEST);h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0);h.bindTexture(h.TEXTURE_2D,H.occlusionTexture);h.copyTexImage2D(h.TEXTURE_2D,0,h.RGBA,z[0]-8,z[1]-8,16,16,0);h.uniform1i(y.renderType,1);h.disable(h.DEPTH_TEST);h.bindTexture(h.TEXTURE_2D,H.tempTexture);h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0);c.positionScreen.x=
v[0];c.positionScreen.y=v[1];c.positionScreen.z=v[2];c.customUpdateCallback?c.customUpdateCallback(c):c.updateLensFlares();h.uniform1i(y.renderType,2);h.enable(h.BLEND);g=0;for(j=c.lensFlares.length;g<j;g++)if(k=c.lensFlares[g],k.opacity>0.001&&k.scale>0.001)v[0]=k.x,v[1]=k.y,v[2]=k.z,t=k.size*k.scale/_viewportHeight,u[0]=t*o,u[1]=t,h.uniform3fv(y.screenPosition,v),h.uniform2fv(y.scale,u),h.uniform1f(y.rotation,k.rotation),h.uniform1f(y.opacity,k.opacity),C(k.blending),J(k.texture,1),h.drawElements(h.TRIANGLES,
6,h.UNSIGNED_SHORT,0)}h.enable(h.CULL_FACE);h.enable(h.DEPTH_TEST);h.depthMask(T)}function z(b,d){b._modelViewMatrix.multiplyToArray(d.matrixWorldInverse,b.matrixWorld,b._modelViewMatrixArray);THREE.Matrix4.makeInvert3x3(b._modelViewMatrix).transposeIntoArray(b._normalMatrixArray)}function I(b){var d,e,f,g;if(b instanceof THREE.Mesh){e=b.geometry;for(d in e.geometryGroups){f=e.geometryGroups[d];a:{for(var j=g=void 0,k=void 0,m=void 0,o=void 0,o=f.__materials,j=0,k=o.length;j<k;j++)if(m=o[j],m.attributes)for(g in m.attributes)if(m.attributes[g].needsUpdate){g=
!0;break a}g=!1}if(e.__dirtyVertices||e.__dirtyMorphTargets||e.__dirtyElements||e.__dirtyUvs||e.__dirtyNormals||e.__dirtyColors||e.__dirtyTangents||g)if(g=f,j=b,k=h.DYNAMIC_DRAW,g.__inittedArrays){var p=o=m=void 0,n=void 0,t=p=void 0,u=void 0,v=void 0,z=void 0,y=void 0,B=void 0,A=void 0,F=void 0,I=void 0,C=void 0,D=void 0,G=void 0,H=void 0,E=n=z=n=v=u=void 0,w=void 0,x=w=E=u=void 0,J=void 0,O=x=w=E=p=p=t=z=n=x=w=E=J=x=w=E=J=x=w=E=void 0,L=0,M=0,W=0,V=0,P=0,S=0,N=0,T=0,Y=0,K=0,Q=0,w=E=0,R=g.__vertexArray,
$=g.__uvArray,ca=g.__uv2Array,Z=g.__normalArray,U=g.__tangentArray,X=g.__colorArray,da=g.__skinVertexAArray,fa=g.__skinVertexBArray,ga=g.__skinIndexArray,ha=g.__skinWeightArray,ia=g.__morphTargetsArrays,ea=g.__webglCustomAttributes,x=void 0,ra=g.__faceArray,sa=g.__lineArray,fb=g.__needsSmoothNormals,B=g.__vertexColorType,y=g.__uvType,A=g.__normalType,ka=j.geometry,Ua=ka.__dirtyVertices,Va=ka.__dirtyElements,Ja=ka.__dirtyUvs,Wa=ka.__dirtyNormals,Xa=ka.__dirtyTangents,Ya=ka.__dirtyColors,Za=ka.__dirtyMorphTargets,
Fa=ka.vertices,gb=g.faces,kb=ka.faces,ib=ka.faceVertexUvs[0],jb=ka.faceVertexUvs[1],Ga=ka.skinVerticesA,Ha=ka.skinVerticesB,Ia=ka.skinIndices,za=ka.skinWeights,Ca=j instanceof THREE.ShadowVolume?ka.edgeFaces:void 0,ya=ka.morphTargets;if(ea)for(O in ea)ea[O].offset=0,ea[O].offsetSrc=0;m=0;for(o=gb.length;m<o;m++)if(p=gb[m],n=kb[p],ib&&(F=ib[p]),jb&&(I=jb[p]),p=n.vertexNormals,t=n.normal,u=n.vertexColors,v=n.color,z=n.vertexTangents,n instanceof THREE.Face3){if(Ua)C=Fa[n.a].position,D=Fa[n.b].position,
G=Fa[n.c].position,R[M]=C.x,R[M+1]=C.y,R[M+2]=C.z,R[M+3]=D.x,R[M+4]=D.y,R[M+5]=D.z,R[M+6]=G.x,R[M+7]=G.y,R[M+8]=G.z,M+=9;if(ea)for(O in ea)if(x=ea[O],x.__original.needsUpdate)E=x.offset,w=x.offsetSrc,x.size===1?(x.boundTo===void 0||x.boundTo==="vertices"?(x.array[E+0]=x.value[n.a],x.array[E+1]=x.value[n.b],x.array[E+2]=x.value[n.c]):x.boundTo==="faces"?(x.array[E+0]=x.value[w],x.array[E+1]=x.value[w],x.array[E+2]=x.value[w],x.offsetSrc++):x.boundTo==="faceVertices"&&(x.array[E+0]=x.value[w+0],x.array[E+
1]=x.value[w+1],x.array[E+2]=x.value[w+2],x.offsetSrc+=3),x.offset+=3):(x.boundTo===void 0||x.boundTo==="vertices"?(C=x.value[n.a],D=x.value[n.b],G=x.value[n.c]):x.boundTo==="faces"?(C=x.value[w],D=x.value[w],G=x.value[w],x.offsetSrc++):x.boundTo==="faceVertices"&&(C=x.value[w+0],D=x.value[w+1],G=x.value[w+2],x.offsetSrc+=3),x.size===2?(x.array[E+0]=C.x,x.array[E+1]=C.y,x.array[E+2]=D.x,x.array[E+3]=D.y,x.array[E+4]=G.x,x.array[E+5]=G.y,x.offset+=6):x.size===3?(x.type==="c"?(x.array[E+0]=C.r,x.array[E+
1]=C.g,x.array[E+2]=C.b,x.array[E+3]=D.r,x.array[E+4]=D.g,x.array[E+5]=D.b,x.array[E+6]=G.r,x.array[E+7]=G.g,x.array[E+8]=G.b):(x.array[E+0]=C.x,x.array[E+1]=C.y,x.array[E+2]=C.z,x.array[E+3]=D.x,x.array[E+4]=D.y,x.array[E+5]=D.z,x.array[E+6]=G.x,x.array[E+7]=G.y,x.array[E+8]=G.z),x.offset+=9):(x.array[E+0]=C.x,x.array[E+1]=C.y,x.array[E+2]=C.z,x.array[E+3]=C.w,x.array[E+4]=D.x,x.array[E+5]=D.y,x.array[E+6]=D.z,x.array[E+7]=D.w,x.array[E+8]=G.x,x.array[E+9]=G.y,x.array[E+10]=G.z,x.array[E+11]=G.w,
x.offset+=12));if(Za){E=0;for(w=ya.length;E<w;E++)C=ya[E].vertices[n.a].position,D=ya[E].vertices[n.b].position,G=ya[E].vertices[n.c].position,x=ia[E],x[Q+0]=C.x,x[Q+1]=C.y,x[Q+2]=C.z,x[Q+3]=D.x,x[Q+4]=D.y,x[Q+5]=D.z,x[Q+6]=G.x,x[Q+7]=G.y,x[Q+8]=G.z;Q+=9}if(za.length)E=za[n.a],w=za[n.b],x=za[n.c],ha[K]=E.x,ha[K+1]=E.y,ha[K+2]=E.z,ha[K+3]=E.w,ha[K+4]=w.x,ha[K+5]=w.y,ha[K+6]=w.z,ha[K+7]=w.w,ha[K+8]=x.x,ha[K+9]=x.y,ha[K+10]=x.z,ha[K+11]=x.w,E=Ia[n.a],w=Ia[n.b],x=Ia[n.c],ga[K]=E.x,ga[K+1]=E.y,ga[K+2]=
E.z,ga[K+3]=E.w,ga[K+4]=w.x,ga[K+5]=w.y,ga[K+6]=w.z,ga[K+7]=w.w,ga[K+8]=x.x,ga[K+9]=x.y,ga[K+10]=x.z,ga[K+11]=x.w,E=Ga[n.a],w=Ga[n.b],x=Ga[n.c],da[K]=E.x,da[K+1]=E.y,da[K+2]=E.z,da[K+3]=1,da[K+4]=w.x,da[K+5]=w.y,da[K+6]=w.z,da[K+7]=1,da[K+8]=x.x,da[K+9]=x.y,da[K+10]=x.z,da[K+11]=1,E=Ha[n.a],w=Ha[n.b],x=Ha[n.c],fa[K]=E.x,fa[K+1]=E.y,fa[K+2]=E.z,fa[K+3]=1,fa[K+4]=w.x,fa[K+5]=w.y,fa[K+6]=w.z,fa[K+7]=1,fa[K+8]=x.x,fa[K+9]=x.y,fa[K+10]=x.z,fa[K+11]=1,K+=12;if(Ya&&B)u.length==3&&B==THREE.VertexColors?(n=
u[0],E=u[1],w=u[2]):w=E=n=v,X[Y]=n.r,X[Y+1]=n.g,X[Y+2]=n.b,X[Y+3]=E.r,X[Y+4]=E.g,X[Y+5]=E.b,X[Y+6]=w.r,X[Y+7]=w.g,X[Y+8]=w.b,Y+=9;if(Xa&&ka.hasTangents)u=z[0],v=z[1],n=z[2],U[N]=u.x,U[N+1]=u.y,U[N+2]=u.z,U[N+3]=u.w,U[N+4]=v.x,U[N+5]=v.y,U[N+6]=v.z,U[N+7]=v.w,U[N+8]=n.x,U[N+9]=n.y,U[N+10]=n.z,U[N+11]=n.w,N+=12;if(Wa&&A)if(p.length==3&&fb)for(z=0;z<3;z++)t=p[z],Z[S]=t.x,Z[S+1]=t.y,Z[S+2]=t.z,S+=3;else for(z=0;z<3;z++)Z[S]=t.x,Z[S+1]=t.y,Z[S+2]=t.z,S+=3;if(Ja&&F!==void 0&&y)for(z=0;z<3;z++)p=F[z],$[W]=
p.u,$[W+1]=p.v,W+=2;if(Ja&&I!==void 0&&y)for(z=0;z<3;z++)p=I[z],ca[V]=p.u,ca[V+1]=p.v,V+=2;Va&&(ra[P]=L,ra[P+1]=L+1,ra[P+2]=L+2,P+=3,sa[T]=L,sa[T+1]=L+1,sa[T+2]=L,sa[T+3]=L+2,sa[T+4]=L+1,sa[T+5]=L+2,T+=6,L+=3)}else if(n instanceof THREE.Face4){if(Ua)C=Fa[n.a].position,D=Fa[n.b].position,G=Fa[n.c].position,H=Fa[n.d].position,R[M]=C.x,R[M+1]=C.y,R[M+2]=C.z,R[M+3]=D.x,R[M+4]=D.y,R[M+5]=D.z,R[M+6]=G.x,R[M+7]=G.y,R[M+8]=G.z,R[M+9]=H.x,R[M+10]=H.y,R[M+11]=H.z,M+=12;if(ea)for(O in ea)if(x=ea[O],x.__original.needsUpdate)E=
x.offset,w=x.offsetSrc,x.size===1?(x.boundTo===void 0||x.boundTo==="vertices"?(x.array[E+0]=x.value[n.a],x.array[E+1]=x.value[n.b],x.array[E+2]=x.value[n.c],x.array[E+3]=x.value[n.d]):x.boundTo==="faces"?(x.array[E+0]=x.value[w],x.array[E+1]=x.value[w],x.array[E+2]=x.value[w],x.array[E+3]=x.value[w],x.offsetSrc++):x.boundTo==="faceVertices"&&(x.array[E+0]=x.value[w+0],x.array[E+1]=x.value[w+1],x.array[E+2]=x.value[w+2],x.array[E+3]=x.value[w+3],x.offsetSrc+=4),x.offset+=4):(x.boundTo===void 0||x.boundTo===
"vertices"?(C=x.value[n.a],D=x.value[n.b],G=x.value[n.c],H=x.value[n.d]):x.boundTo==="faces"?(C=x.value[w],D=x.value[w],G=x.value[w],H=x.value[w],x.offsetSrc++):x.boundTo==="faceVertices"&&(C=x.value[w+0],D=x.value[w+1],G=x.value[w+2],H=x.value[w+3],x.offsetSrc+=4),x.size===2?(x.array[E+0]=C.x,x.array[E+1]=C.y,x.array[E+2]=D.x,x.array[E+3]=D.y,x.array[E+4]=G.x,x.array[E+5]=G.y,x.array[E+6]=H.x,x.array[E+7]=H.y,x.offset+=8):x.size===3?(x.type==="c"?(x.array[E+0]=C.r,x.array[E+1]=C.g,x.array[E+2]=C.b,
x.array[E+3]=D.r,x.array[E+4]=D.g,x.array[E+5]=D.b,x.array[E+6]=G.r,x.array[E+7]=G.g,x.array[E+8]=G.b,x.array[E+9]=H.r,x.array[E+10]=H.g,x.array[E+11]=H.b):(x.array[E+0]=C.x,x.array[E+1]=C.y,x.array[E+2]=C.z,x.array[E+3]=D.x,x.array[E+4]=D.y,x.array[E+5]=D.z,x.array[E+6]=G.x,x.array[E+7]=G.y,x.array[E+8]=G.z,x.array[E+9]=H.x,x.array[E+10]=H.y,x.array[E+11]=H.z),x.offset+=12):(x.array[E+0]=C.x,x.array[E+1]=C.y,x.array[E+2]=C.z,x.array[E+3]=C.w,x.array[E+4]=D.x,x.array[E+5]=D.y,x.array[E+6]=D.z,x.array[E+
7]=D.w,x.array[E+8]=G.x,x.array[E+9]=G.y,x.array[E+10]=G.z,x.array[E+11]=G.w,x.array[E+12]=H.x,x.array[E+13]=H.y,x.array[E+14]=H.z,x.array[E+15]=H.w,x.offset+=16));if(Za){E=0;for(w=ya.length;E<w;E++)C=ya[E].vertices[n.a].position,D=ya[E].vertices[n.b].position,G=ya[E].vertices[n.c].position,H=ya[E].vertices[n.d].position,x=ia[E],x[Q+0]=C.x,x[Q+1]=C.y,x[Q+2]=C.z,x[Q+3]=D.x,x[Q+4]=D.y,x[Q+5]=D.z,x[Q+6]=G.x,x[Q+7]=G.y,x[Q+8]=G.z,x[Q+9]=H.x,x[Q+10]=H.y,x[Q+11]=H.z;Q+=12}if(za.length)E=za[n.a],w=za[n.b],
x=za[n.c],J=za[n.d],ha[K]=E.x,ha[K+1]=E.y,ha[K+2]=E.z,ha[K+3]=E.w,ha[K+4]=w.x,ha[K+5]=w.y,ha[K+6]=w.z,ha[K+7]=w.w,ha[K+8]=x.x,ha[K+9]=x.y,ha[K+10]=x.z,ha[K+11]=x.w,ha[K+12]=J.x,ha[K+13]=J.y,ha[K+14]=J.z,ha[K+15]=J.w,E=Ia[n.a],w=Ia[n.b],x=Ia[n.c],J=Ia[n.d],ga[K]=E.x,ga[K+1]=E.y,ga[K+2]=E.z,ga[K+3]=E.w,ga[K+4]=w.x,ga[K+5]=w.y,ga[K+6]=w.z,ga[K+7]=w.w,ga[K+8]=x.x,ga[K+9]=x.y,ga[K+10]=x.z,ga[K+11]=x.w,ga[K+12]=J.x,ga[K+13]=J.y,ga[K+14]=J.z,ga[K+15]=J.w,E=Ga[n.a],w=Ga[n.b],x=Ga[n.c],J=Ga[n.d],da[K]=E.x,
da[K+1]=E.y,da[K+2]=E.z,da[K+3]=1,da[K+4]=w.x,da[K+5]=w.y,da[K+6]=w.z,da[K+7]=1,da[K+8]=x.x,da[K+9]=x.y,da[K+10]=x.z,da[K+11]=1,da[K+12]=J.x,da[K+13]=J.y,da[K+14]=J.z,da[K+15]=1,E=Ha[n.a],w=Ha[n.b],x=Ha[n.c],n=Ha[n.d],fa[K]=E.x,fa[K+1]=E.y,fa[K+2]=E.z,fa[K+3]=1,fa[K+4]=w.x,fa[K+5]=w.y,fa[K+6]=w.z,fa[K+7]=1,fa[K+8]=x.x,fa[K+9]=x.y,fa[K+10]=x.z,fa[K+11]=1,fa[K+12]=n.x,fa[K+13]=n.y,fa[K+14]=n.z,fa[K+15]=1,K+=16;if(Ya&&B)u.length==4&&B==THREE.VertexColors?(n=u[0],E=u[1],w=u[2],u=u[3]):u=w=E=n=v,X[Y]=
n.r,X[Y+1]=n.g,X[Y+2]=n.b,X[Y+3]=E.r,X[Y+4]=E.g,X[Y+5]=E.b,X[Y+6]=w.r,X[Y+7]=w.g,X[Y+8]=w.b,X[Y+9]=u.r,X[Y+10]=u.g,X[Y+11]=u.b,Y+=12;if(Xa&&ka.hasTangents)u=z[0],v=z[1],n=z[2],z=z[3],U[N]=u.x,U[N+1]=u.y,U[N+2]=u.z,U[N+3]=u.w,U[N+4]=v.x,U[N+5]=v.y,U[N+6]=v.z,U[N+7]=v.w,U[N+8]=n.x,U[N+9]=n.y,U[N+10]=n.z,U[N+11]=n.w,U[N+12]=z.x,U[N+13]=z.y,U[N+14]=z.z,U[N+15]=z.w,N+=16;if(Wa&&A)if(p.length==4&&fb)for(z=0;z<4;z++)t=p[z],Z[S]=t.x,Z[S+1]=t.y,Z[S+2]=t.z,S+=3;else for(z=0;z<4;z++)Z[S]=t.x,Z[S+1]=t.y,Z[S+
2]=t.z,S+=3;if(Ja&&F!==void 0&&y)for(z=0;z<4;z++)p=F[z],$[W]=p.u,$[W+1]=p.v,W+=2;if(Ja&&I!==void 0&&y)for(z=0;z<4;z++)p=I[z],ca[V]=p.u,ca[V+1]=p.v,V+=2;Va&&(ra[P]=L,ra[P+1]=L+1,ra[P+2]=L+3,ra[P+3]=L+1,ra[P+4]=L+2,ra[P+5]=L+3,P+=6,sa[T]=L,sa[T+1]=L+1,sa[T+2]=L,sa[T+3]=L+3,sa[T+4]=L+1,sa[T+5]=L+2,sa[T+6]=L+2,sa[T+7]=L+3,T+=8,L+=4)}if(Ca){m=0;for(o=Ca.length;m<o;m++)ra[P]=Ca[m].a,ra[P+1]=Ca[m].b,ra[P+2]=Ca[m].c,ra[P+3]=Ca[m].a,ra[P+4]=Ca[m].c,ra[P+5]=Ca[m].d,P+=6}Ua&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglVertexBuffer),
h.bufferData(h.ARRAY_BUFFER,R,k));if(ea)for(O in ea)x=ea[O],x.__original.needsUpdate&&(h.bindBuffer(h.ARRAY_BUFFER,x.buffer),h.bufferData(h.ARRAY_BUFFER,x.array,k));if(Za){E=0;for(w=ya.length;E<w;E++)h.bindBuffer(h.ARRAY_BUFFER,g.__webglMorphTargetsBuffers[E]),h.bufferData(h.ARRAY_BUFFER,ia[E],k)}Ya&&Y>0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglColorBuffer),h.bufferData(h.ARRAY_BUFFER,X,k));Wa&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglNormalBuffer),h.bufferData(h.ARRAY_BUFFER,Z,k));Xa&&ka.hasTangents&&
(h.bindBuffer(h.ARRAY_BUFFER,g.__webglTangentBuffer),h.bufferData(h.ARRAY_BUFFER,U,k));Ja&&W>0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglUVBuffer),h.bufferData(h.ARRAY_BUFFER,$,k));Ja&&V>0&&(h.bindBuffer(h.ARRAY_BUFFER,g.__webglUV2Buffer),h.bufferData(h.ARRAY_BUFFER,ca,k));Va&&(h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,g.__webglFaceBuffer),h.bufferData(h.ELEMENT_ARRAY_BUFFER,ra,k),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,g.__webglLineBuffer),h.bufferData(h.ELEMENT_ARRAY_BUFFER,sa,k));K>0&&(h.bindBuffer(h.ARRAY_BUFFER,
g.__webglSkinVertexABuffer),h.bufferData(h.ARRAY_BUFFER,da,k),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinVertexBBuffer),h.bufferData(h.ARRAY_BUFFER,fa,k),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinIndicesBuffer),h.bufferData(h.ARRAY_BUFFER,ga,k),h.bindBuffer(h.ARRAY_BUFFER,g.__webglSkinWeightsBuffer),h.bufferData(h.ARRAY_BUFFER,ha,k));j.dynamic||(delete g.__inittedArrays,delete g.__colorArray,delete g.__normalArray,delete g.__tangentArray,delete g.__uvArray,delete g.__uv2Array,delete g.__faceArray,delete g.__vertexArray,
delete g.__lineArray,delete g.__skinVertexAArray,delete g.__skinVertexBArray,delete g.__skinIndexArray,delete g.__skinWeightArray)}}e.__dirtyVertices=!1;e.__dirtyMorphTargets=!1;e.__dirtyElements=!1;e.__dirtyUvs=!1;e.__dirtyNormals=!1;e.__dirtyTangents=!1;e.__dirtyColors=!1;var ma;f=f.__materials;e=0;for(b=f.length;e<b;e++)if(d=f[e],d.attributes)for(ma in d.attributes)d.attributes[ma].needsUpdate=!1}else if(b instanceof THREE.Ribbon){e=b.geometry;if(e.__dirtyVertices||e.__dirtyColors){ma=e;b=h.DYNAMIC_DRAW;
o=ma.vertices;f=ma.colors;y=o.length;g=f.length;B=ma.__vertexArray;j=ma.__colorArray;A=ma.__dirtyColors;if(ma.__dirtyVertices){for(k=0;k<y;k++)m=o[k].position,d=k*3,B[d]=m.x,B[d+1]=m.y,B[d+2]=m.z;h.bindBuffer(h.ARRAY_BUFFER,ma.__webglVertexBuffer);h.bufferData(h.ARRAY_BUFFER,B,b)}if(A){for(k=0;k<g;k++)color=f[k],d=k*3,j[d]=color.r,j[d+1]=color.g,j[d+2]=color.b;h.bindBuffer(h.ARRAY_BUFFER,ma.__webglColorBuffer);h.bufferData(h.ARRAY_BUFFER,j,b)}}e.__dirtyVertices=!1;e.__dirtyColors=!1}else if(b instanceof
THREE.Line){e=b.geometry;if(e.__dirtyVertices||e.__dirtyColors){ma=e;b=h.DYNAMIC_DRAW;o=ma.vertices;f=ma.colors;y=o.length;g=f.length;B=ma.__vertexArray;j=ma.__colorArray;A=ma.__dirtyColors;if(ma.__dirtyVertices){for(k=0;k<y;k++)m=o[k].position,d=k*3,B[d]=m.x,B[d+1]=m.y,B[d+2]=m.z;h.bindBuffer(h.ARRAY_BUFFER,ma.__webglVertexBuffer);h.bufferData(h.ARRAY_BUFFER,B,b)}if(A){for(k=0;k<g;k++)color=f[k],d=k*3,j[d]=color.r,j[d+1]=color.g,j[d+2]=color.b;h.bindBuffer(h.ARRAY_BUFFER,ma.__webglColorBuffer);h.bufferData(h.ARRAY_BUFFER,
j,b)}}e.__dirtyVertices=!1;e.__dirtyColors=!1}else if(b instanceof THREE.ParticleSystem)e=b.geometry,(e.__dirtyVertices||e.__dirtyColors||b.sortParticles)&&c(e,h.DYNAMIC_DRAW,b),e.__dirtyVertices=!1,e.__dirtyColors=!1}function A(b,d){var c;for(c=b.length-1;c>=0;c--)b[c].object==d&&b.splice(c,1)}function G(b){function d(b){var g=[];c=0;for(e=b.length;c<e;c++)b[c]==void 0?g.push("undefined"):g.push(b[c].id);return g.join("_")}var c,e,g,f,h,j,k,n,m={},p=b.morphTargets!==void 0?b.morphTargets.length:
0;b.geometryGroups={};g=0;for(f=b.faces.length;g<f;g++)h=b.faces[g],j=h.materials,k=d(j),m[k]==void 0&&(m[k]={hash:k,counter:0}),n=m[k].hash+"_"+m[k].counter,b.geometryGroups[n]==void 0&&(b.geometryGroups[n]={faces:[],materials:j,vertices:0,numMorphTargets:p}),h=h instanceof THREE.Face3?3:4,b.geometryGroups[n].vertices+h>65535&&(m[k].counter+=1,n=m[k].hash+"_"+m[k].counter,b.geometryGroups[n]==void 0&&(b.geometryGroups[n]={faces:[],materials:j,vertices:0,numMorphTargets:p})),b.geometryGroups[n].faces.push(g),
b.geometryGroups[n].vertices+=h}function F(b,d,c){b.push({buffer:d,object:c,opaque:{list:[],count:0},transparent:{list:[],count:0}})}function C(b){if(b!=V){switch(b){case THREE.AdditiveBlending:h.blendEquation(h.FUNC_ADD);h.blendFunc(h.SRC_ALPHA,h.ONE);break;case THREE.SubtractiveBlending:h.blendEquation(h.FUNC_ADD);h.blendFunc(h.ZERO,h.ONE_MINUS_SRC_COLOR);break;case THREE.MultiplyBlending:h.blendEquation(h.FUNC_ADD);h.blendFunc(h.ZERO,h.SRC_COLOR);break;default:h.blendEquationSeparate(h.FUNC_ADD,
h.FUNC_ADD),h.blendFuncSeparate(h.SRC_ALPHA,h.ONE_MINUS_SRC_ALPHA,h.ONE,h.ONE_MINUS_SRC_ALPHA)}V=b}}function M(b,d,c){(c.width&c.width-1)==0&&(c.height&c.height-1)==0?(h.texParameteri(b,h.TEXTURE_WRAP_S,R(d.wrapS)),h.texParameteri(b,h.TEXTURE_WRAP_T,R(d.wrapT)),h.texParameteri(b,h.TEXTURE_MAG_FILTER,R(d.magFilter)),h.texParameteri(b,h.TEXTURE_MIN_FILTER,R(d.minFilter)),h.generateMipmap(b)):(h.texParameteri(b,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE),h.texParameteri(b,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE),h.texParameteri(b,
h.TEXTURE_MAG_FILTER,W(d.magFilter)),h.texParameteri(b,h.TEXTURE_MIN_FILTER,W(d.minFilter)))}function J(b,d){if(b.needsUpdate)b.__webglInit?(h.bindTexture(h.TEXTURE_2D,b.__webglTexture),h.texSubImage2D(h.TEXTURE_2D,0,0,0,h.RGBA,h.UNSIGNED_BYTE,b.image)):(b.__webglTexture=h.createTexture(),h.bindTexture(h.TEXTURE_2D,b.__webglTexture),h.texImage2D(h.TEXTURE_2D,0,h.RGBA,h.RGBA,h.UNSIGNED_BYTE,b.image),b.__webglInit=!0),M(h.TEXTURE_2D,b,b.image),h.bindTexture(h.TEXTURE_2D,null),b.needsUpdate=!1;h.activeTexture(h.TEXTURE0+
d);h.bindTexture(h.TEXTURE_2D,b.__webglTexture)}function O(b){if(b&&!b.__webglFramebuffer){if(b.depthBuffer===void 0)b.depthBuffer=!0;if(b.stencilBuffer===void 0)b.stencilBuffer=!0;b.__webglFramebuffer=h.createFramebuffer();b.__webglRenderbuffer=h.createRenderbuffer();b.__webglTexture=h.createTexture();h.bindTexture(h.TEXTURE_2D,b.__webglTexture);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,R(b.wrapS));h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,R(b.wrapT));h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,
R(b.magFilter));h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,R(b.minFilter));h.texImage2D(h.TEXTURE_2D,0,R(b.format),b.width,b.height,0,R(b.format),R(b.type),null);h.bindRenderbuffer(h.RENDERBUFFER,b.__webglRenderbuffer);h.bindFramebuffer(h.FRAMEBUFFER,b.__webglFramebuffer);h.framebufferTexture2D(h.FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,b.__webglTexture,0);b.depthBuffer&&!b.stencilBuffer?(h.renderbufferStorage(h.RENDERBUFFER,h.DEPTH_COMPONENT16,b.width,b.height),h.framebufferRenderbuffer(h.FRAMEBUFFER,
h.DEPTH_ATTACHMENT,h.RENDERBUFFER,b.__webglRenderbuffer)):b.depthBuffer&&b.stencilBuffer?(h.renderbufferStorage(h.RENDERBUFFER,h.DEPTH_STENCIL,b.width,b.height),h.framebufferRenderbuffer(h.FRAMEBUFFER,h.DEPTH_STENCIL_ATTACHMENT,h.RENDERBUFFER,b.__webglRenderbuffer)):h.renderbufferStorage(h.RENDERBUFFER,h.RGBA4,b.width,b.height);h.bindTexture(h.TEXTURE_2D,null);h.bindRenderbuffer(h.RENDERBUFFER,null);h.bindFramebuffer(h.FRAMEBUFFER,null)}var d,c;b?(d=b.__webglFramebuffer,c=b.width,b=b.height):(d=null,
c=_viewportWidth,b=_viewportHeight);d!=N&&(h.bindFramebuffer(h.FRAMEBUFFER,d),h.viewport(_viewportX,_viewportY,c,b),N=d)}function w(b,d){var c;b=="fragment"?c=h.createShader(h.FRAGMENT_SHADER):b=="vertex"&&(c=h.createShader(h.VERTEX_SHADER));h.shaderSource(c,d);h.compileShader(c);if(!h.getShaderParameter(c,h.COMPILE_STATUS))return Fiesta.error(h.getShaderInfoLog(c)),Fiesta.error(d),null;return c}function W(b){switch(b){case THREE.NearestFilter:case THREE.NearestMipMapNearestFilter:case THREE.NearestMipMapLinearFilter:return h.NEAREST;
default:return h.LINEAR}}function R(b){switch(b){case THREE.RepeatWrapping:return h.REPEAT;case THREE.ClampToEdgeWrapping:return h.CLAMP_TO_EDGE;case THREE.MirroredRepeatWrapping:return h.MIRRORED_REPEAT;case THREE.NearestFilter:return h.NEAREST;case THREE.NearestMipMapNearestFilter:return h.NEAREST_MIPMAP_NEAREST;case THREE.NearestMipMapLinearFilter:return h.NEAREST_MIPMAP_LINEAR;case THREE.LinearFilter:return h.LINEAR;case THREE.LinearMipMapNearestFilter:return h.LINEAR_MIPMAP_NEAREST;case THREE.LinearMipMapLinearFilter:return h.LINEAR_MIPMAP_LINEAR;
case THREE.ByteType:return h.BYTE;case THREE.UnsignedByteType:return h.UNSIGNED_BYTE;case THREE.ShortType:return h.SHORT;case THREE.UnsignedShortType:return h.UNSIGNED_SHORT;case THREE.IntType:return h.INT;case THREE.UnsignedShortType:return h.UNSIGNED_INT;case THREE.FloatType:return h.FLOAT;case THREE.AlphaFormat:return h.ALPHA;case THREE.RGBFormat:return h.RGB;case THREE.RGBAFormat:return h.RGBA;case THREE.LuminanceFormat:return h.LUMINANCE;case THREE.LuminanceAlphaFormat:return h.LUMINANCE_ALPHA}return 0}
var S=this,h,Q=[],L=null,N=null,T=!0,P=null,Y=null,V=null,Z=null,U=null;_oldPolygonOffsetUnits=_oldPolygonOffsetFactor=null;_cullEnabled=!0;_viewportHeight=_viewportWidth=_viewportY=_viewportX=0;_frustum=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4];_projScreenMatrix=new THREE.Matrix4;_projectionMatrixArray=new Float32Array(16);_viewMatrixArray=new Float32Array(16);_vector3=new THREE.Vector4;_lights={ambient:[0,0,0],directional:{length:0,
colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]}};b=b||{};_canvas=b.canvas!==void 0?b.canvas:document.createElement("canvas");_stencil=b.stencil!==void 0?b.stencil:!0;_antialias=b.antialias!==void 0?b.antialias:!1;_clearColor=b.clearColor!==void 0?new THREE.Color(b.clearColor):new THREE.Color(0);_clearAlpha=b.clearAlpha!==void 0?b.clearAlpha:0;this.data={vertices:0,faces:0,drawCalls:0};this.maxMorphTargets=8;this.domElement=_canvas;this.sortObjects=this.autoClear=!0;try{if(!(h=
_canvas.getContext("experimental-webgl",{antialias:_antialias,stencil:_stencil})))throw"Error creating WebGL context.";}catch(ea){Fiesta.error(ea)}Fiesta.log(navigator.userAgent+" | "+h.getParameter(h.VERSION)+" | "+h.getParameter(h.VENDOR)+" | "+h.getParameter(h.RENDERER)+" | "+h.getParameter(h.SHADING_LANGUAGE_VERSION));h.clearColor(0,0,0,1);h.clearDepth(1);h.enable(h.DEPTH_TEST);h.depthFunc(h.LEQUAL);h.frontFace(h.CCW);h.cullFace(h.BACK);h.enable(h.CULL_FACE);h.enable(h.BLEND);h.blendEquation(h.FUNC_ADD);
h.blendFunc(h.SRC_ALPHA,h.ONE_MINUS_SRC_ALPHA);h.clearColor(_clearColor.r,_clearColor.g,_clearColor.b,_clearAlpha);_cullEnabled=!0;this.context=h;var ia=h.getParameter(h.MAX_VERTEX_TEXTURE_IMAGE_UNITS)>0;if(_stencil){var D={};D.vertices=new Float32Array(12);D.faces=new Uint16Array(6);D.darkness=0.5;D.vertices[0]=-20;D.vertices[1]=-20;D.vertices[2]=-1;D.vertices[3]=20;D.vertices[4]=-20;D.vertices[5]=-1;D.vertices[6]=20;D.vertices[7]=20;D.vertices[8]=-1;D.vertices[9]=-20;D.vertices[10]=20;D.vertices[11]=
-1;D.faces[0]=0;D.faces[1]=1;D.faces[2]=2;D.faces[3]=0;D.faces[4]=2;D.faces[5]=3;D.vertexBuffer=h.createBuffer();D.elementBuffer=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,D.vertexBuffer);h.bufferData(h.ARRAY_BUFFER,D.vertices,h.STATIC_DRAW);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,D.elementBuffer);h.bufferData(h.ELEMENT_ARRAY_BUFFER,D.faces,h.STATIC_DRAW);D.program=h.createProgram();h.attachShader(D.program,w("fragment",THREE.ShaderLib.shadowPost.fragmentShader));h.attachShader(D.program,w("vertex",
THREE.ShaderLib.shadowPost.vertexShader));h.linkProgram(D.program);D.vertexLocation=h.getAttribLocation(D.program,"position");D.projectionLocation=h.getUniformLocation(D.program,"projectionMatrix");D.darknessLocation=h.getUniformLocation(D.program,"darkness")}var H={};H.vertices=new Float32Array(16);H.faces=new Uint16Array(6);b=0;H.vertices[b++]=-1;H.vertices[b++]=-1;H.vertices[b++]=0;H.vertices[b++]=0;H.vertices[b++]=1;H.vertices[b++]=-1;H.vertices[b++]=1;H.vertices[b++]=0;H.vertices[b++]=1;H.vertices[b++]=
1;H.vertices[b++]=1;H.vertices[b++]=1;H.vertices[b++]=-1;H.vertices[b++]=1;H.vertices[b++]=0;H.vertices[b++]=1;b=0;H.faces[b++]=0;H.faces[b++]=1;H.faces[b++]=2;H.faces[b++]=0;H.faces[b++]=2;H.faces[b++]=3;H.vertexBuffer=h.createBuffer();H.elementBuffer=h.createBuffer();H.tempTexture=h.createTexture();H.occlusionTexture=h.createTexture();h.bindBuffer(h.ARRAY_BUFFER,H.vertexBuffer);h.bufferData(h.ARRAY_BUFFER,H.vertices,h.STATIC_DRAW);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,H.elementBuffer);h.bufferData(h.ELEMENT_ARRAY_BUFFER,
H.faces,h.STATIC_DRAW);h.bindTexture(h.TEXTURE_2D,H.tempTexture);h.texImage2D(h.TEXTURE_2D,0,h.RGB,16,16,0,h.RGB,h.UNSIGNED_BYTE,null);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,h.NEAREST);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,h.NEAREST);h.bindTexture(h.TEXTURE_2D,H.occlusionTexture);h.texImage2D(h.TEXTURE_2D,0,h.RGBA,16,16,0,h.RGBA,h.UNSIGNED_BYTE,null);
h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,h.NEAREST);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,h.NEAREST);h.getParameter(h.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<=0?(H.hasVertexTexture=!1,H.program=h.createProgram(),h.attachShader(H.program,w("fragment",THREE.ShaderLib.lensFlare.fragmentShader)),h.attachShader(H.program,w("vertex",THREE.ShaderLib.lensFlare.vertexShader))):
(H.hasVertexTexture=!0,H.program=h.createProgram(),h.attachShader(H.program,w("fragment",THREE.ShaderLib.lensFlareVertexTexture.fragmentShader)),h.attachShader(H.program,w("vertex",THREE.ShaderLib.lensFlareVertexTexture.vertexShader)));h.linkProgram(H.program);H.attributes={};H.uniforms={};H.attributes.vertex=h.getAttribLocation(H.program,"position");H.attributes.uv=h.getAttribLocation(H.program,"UV");H.uniforms.renderType=h.getUniformLocation(H.program,"renderType");H.uniforms.map=h.getUniformLocation(H.program,
"map");H.uniforms.occlusionMap=h.getUniformLocation(H.program,"occlusionMap");H.uniforms.opacity=h.getUniformLocation(H.program,"opacity");H.uniforms.scale=h.getUniformLocation(H.program,"scale");H.uniforms.rotation=h.getUniformLocation(H.program,"rotation");H.uniforms.screenPosition=h.getUniformLocation(H.program,"screenPosition");var $=!1;_sprite={};_sprite.vertices=new Float32Array(16);_sprite.faces=new Uint16Array(6);b=0;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=
0;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;b=0;_sprite.faces[b++]=0;_sprite.faces[b++]=1;_sprite.faces[b++]=2;_sprite.faces[b++]=0;_sprite.faces[b++]=2;_sprite.faces[b++]=3;_sprite.vertexBuffer=h.createBuffer();_sprite.elementBuffer=
h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,_sprite.vertexBuffer);h.bufferData(h.ARRAY_BUFFER,_sprite.vertices,h.STATIC_DRAW);h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,_sprite.elementBuffer);h.bufferData(h.ELEMENT_ARRAY_BUFFER,_sprite.faces,h.STATIC_DRAW);_sprite.program=h.createProgram();h.attachShader(_sprite.program,w("fragment",THREE.ShaderLib.sprite.fragmentShader));h.attachShader(_sprite.program,w("vertex",THREE.ShaderLib.sprite.vertexShader));h.linkProgram(_sprite.program);_sprite.attributes={};
_sprite.uniforms={};_sprite.attributes.position=h.getAttribLocation(_sprite.program,"position");_sprite.attributes.uv=h.getAttribLocation(_sprite.program,"uv");_sprite.uniforms.uvOffset=h.getUniformLocation(_sprite.program,"uvOffset");_sprite.uniforms.uvScale=h.getUniformLocation(_sprite.program,"uvScale");_sprite.uniforms.rotation=h.getUniformLocation(_sprite.program,"rotation");_sprite.uniforms.scale=h.getUniformLocation(_sprite.program,"scale");_sprite.uniforms.alignment=h.getUniformLocation(_sprite.program,
"alignment");_sprite.uniforms.map=h.getUniformLocation(_sprite.program,"map");_sprite.uniforms.opacity=h.getUniformLocation(_sprite.program,"opacity");_sprite.uniforms.useScreenCoordinates=h.getUniformLocation(_sprite.program,"useScreenCoordinates");_sprite.uniforms.affectedByDistance=h.getUniformLocation(_sprite.program,"affectedByDistance");_sprite.uniforms.screenPosition=h.getUniformLocation(_sprite.program,"screenPosition");_sprite.uniforms.modelViewMatrix=h.getUniformLocation(_sprite.program,
"modelViewMatrix");_sprite.uniforms.projectionMatrix=h.getUniformLocation(_sprite.program,"projectionMatrix");var ca=!1;this.setSize=function(b,d){_canvas.width=b;_canvas.height=d;this.setViewport(0,0,_canvas.width,_canvas.height)};this.setViewport=function(b,d,c,e){_viewportX=b;_viewportY=d;_viewportWidth=c;_viewportHeight=e;h.viewport(_viewportX,_viewportY,_viewportWidth,_viewportHeight)};this.setScissor=function(b,d,c,e){h.scissor(b,d,c,e)};this.enableScissorTest=function(b){b?h.enable(h.SCISSOR_TEST):
h.disable(h.SCISSOR_TEST)};this.enableDepthBufferWrite=function(b){T=b;h.depthMask(b)};this.setClearColorHex=function(b,d){_clearColor.setHex(b);_clearAlpha=d;h.clearColor(_clearColor.r,_clearColor.g,_clearColor.b,_clearAlpha)};this.setClearColor=function(b,d){_clearColor.copy(b);_clearAlpha=d;h.clearColor(_clearColor.r,_clearColor.g,_clearColor.b,_clearAlpha)};this.clear=function(){h.clear(h.COLOR_BUFFER_BIT|h.DEPTH_BUFFER_BIT|h.STENCIL_BUFFER_BIT)};this.setStencilShadowDarkness=function(b){D.darkness=
b};this.getContext=function(){return h};this.initMaterial=function(b,d,c,e){var g,f,j;b instanceof THREE.MeshDepthMaterial?j="depth":b instanceof THREE.ShadowVolumeDynamicMaterial?j="shadowVolumeDynamic":b instanceof THREE.MeshNormalMaterial?j="normal":b instanceof THREE.MeshBasicMaterial?j="basic":b instanceof THREE.MeshLambertMaterial?j="lambert":b instanceof THREE.MeshPhongMaterial?j="phong":b instanceof THREE.LineBasicMaterial?j="basic":b instanceof THREE.ParticleBasicMaterial&&(j="particle_basic");
if(j){var k=THREE.ShaderLib[j];b.uniforms=THREE.UniformsUtils.clone(k.uniforms);b.vertexShader=k.vertexShader;b.fragmentShader=k.fragmentShader}var n,m,p;n=p=k=0;for(m=d.length;n<m;n++)f=d[n],f instanceof THREE.DirectionalLight&&p++,f instanceof THREE.PointLight&&k++;k+p<=4?d=p:(d=Math.ceil(4*p/(k+p)),k=4-d);f={directional:d,point:k};p=50;if(e!==void 0&&e instanceof THREE.SkinnedMesh)p=e.bones.length;var o;a:{n=b.fragmentShader;m=b.vertexShader;var k=b.uniforms,d=b.attributes,c={map:!!b.map,envMap:!!b.envMap,
lightMap:!!b.lightMap,vertexColors:b.vertexColors,fog:c,sizeAttenuation:b.sizeAttenuation,skinning:b.skinning,morphTargets:b.morphTargets,maxMorphTargets:this.maxMorphTargets,maxDirLights:f.directional,maxPointLights:f.point,maxBones:p},t;f=[];j?f.push(j):(f.push(n),f.push(m));for(t in c)f.push(t),f.push(c[t]);j=f.join();t=0;for(f=Q.length;t<f;t++)if(Q[t].code==j){o=Q[t].program;break a}t=h.createProgram();f=["#ifdef GL_ES\nprecision highp float;\n#endif","#define MAX_DIR_LIGHTS "+c.maxDirLights,
"#define MAX_POINT_LIGHTS "+c.maxPointLights,c.fog?"#define USE_FOG":"",c.fog instanceof THREE.FogExp2?"#define FOG_EXP2":"",c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");p=[ia?"#define VERTEX_TEXTURES":"","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_BONES "+c.maxBones,c.map?"#define USE_MAP":
"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"",c.skinning?"#define USE_SKINNING":"",c.morphTargets?"#define USE_MORPHTARGETS":"",c.sizeAttenuation?"#define USE_SIZEATTENUATION":"","uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
h.attachShader(t,w("fragment",f+n));h.attachShader(t,w("vertex",p+m));h.linkProgram(t);h.getProgramParameter(t,h.LINK_STATUS)||Fiesta.error("Could not initialise shader\nVALIDATE_STATUS: "+h.getProgramParameter(t,h.VALIDATE_STATUS)+", gl error ["+h.getError()+"]");t.uniforms={};t.attributes={};var u;n=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","objectMatrix","cameraPosition","cameraInverseMatrix","boneGlobalMatrices","morphTargetInfluences"];for(u in k)n.push(u);u=n;k=0;for(n=
u.length;k<n;k++)m=u[k],t.uniforms[m]=h.getUniformLocation(t,m);n=["position","normal","uv","uv2","tangent","color","skinVertexA","skinVertexB","skinIndex","skinWeight"];for(u=0;u<c.maxMorphTargets;u++)n.push("morphTarget"+u);for(o in d)n.push(o);o=n;u=0;for(d=o.length;u<d;u++)c=o[u],t.attributes[c]=h.getAttribLocation(t,c);Q.push({program:t,code:j});o=t}b.program=o;o=b.program.attributes;o.position>=0&&h.enableVertexAttribArray(o.position);o.color>=0&&h.enableVertexAttribArray(o.color);o.normal>=
0&&h.enableVertexAttribArray(o.normal);o.tangent>=0&&h.enableVertexAttribArray(o.tangent);b.skinning&&o.skinVertexA>=0&&o.skinVertexB>=0&&o.skinIndex>=0&&o.skinWeight>=0&&(h.enableVertexAttribArray(o.skinVertexA),h.enableVertexAttribArray(o.skinVertexB),h.enableVertexAttribArray(o.skinIndex),h.enableVertexAttribArray(o.skinWeight));if(b.attributes)for(g in b.attributes)o[g]!==void 0&&o[g]>=0&&h.enableVertexAttribArray(o[g]);if(b.morphTargets){b.numSupportedMorphTargets=0;o.morphTarget0>=0&&(h.enableVertexAttribArray(o.morphTarget0),
b.numSupportedMorphTargets++);o.morphTarget1>=0&&(h.enableVertexAttribArray(o.morphTarget1),b.numSupportedMorphTargets++);o.morphTarget2>=0&&(h.enableVertexAttribArray(o.morphTarget2),b.numSupportedMorphTargets++);o.morphTarget3>=0&&(h.enableVertexAttribArray(o.morphTarget3),b.numSupportedMorphTargets++);o.morphTarget4>=0&&(h.enableVertexAttribArray(o.morphTarget4),b.numSupportedMorphTargets++);o.morphTarget5>=0&&(h.enableVertexAttribArray(o.morphTarget5),b.numSupportedMorphTargets++);o.morphTarget6>=
0&&(h.enableVertexAttribArray(o.morphTarget6),b.numSupportedMorphTargets++);o.morphTarget7>=0&&(h.enableVertexAttribArray(o.morphTarget7),b.numSupportedMorphTargets++);e.__webglMorphTargetInfluences=new Float32Array(this.maxMorphTargets);b=0;for(g=this.maxMorphTargets;b<g;b++)e.__webglMorphTargetInfluences[b]=0}};this.render=function(b,c,p,A){var w,D,G,F,I,H,J,L,M=b.lights,N=b.fog;S.data.vertices=0;S.data.faces=0;S.data.drawCalls=0;c.matrixAutoUpdate&&c.update(void 0,!0);b.update(void 0,!1,c);c.matrixWorldInverse.flattenToArray(_viewMatrixArray);
c.projectionMatrix.flattenToArray(_projectionMatrixArray);_projScreenMatrix.multiply(c.projectionMatrix,c.matrixWorldInverse);m(_projScreenMatrix);this.initWebGLObjects(b);O(p);(this.autoClear||A)&&this.clear();I=b.__webglObjects.length;for(A=0;A<I;A++)if(w=b.__webglObjects[A],J=w.object,J.visible)if(!(J instanceof THREE.Mesh)||o(J)){if(J.matrixWorld.flattenToArray(J._objectMatrixArray),z(J,c),n(w),w.render=!0,this.sortObjects)w.object.renderDepth?w.z=w.object.renderDepth:(_vector3.copy(J.position),
_projScreenMatrix.multiplyVector3(_vector3),w.z=_vector3.z)}else w.render=!1;else w.render=!1;this.sortObjects&&b.__webglObjects.sort(u);H=b.__webglObjectsImmediate.length;for(A=0;A<H;A++)w=b.__webglObjectsImmediate[A],J=w.object,J.visible&&(J.matrixAutoUpdate&&J.matrixWorld.flattenToArray(J._objectMatrixArray),z(J,c),t(w));C(THREE.NormalBlending);for(A=0;A<I;A++)if(w=b.__webglObjects[A],w.render){J=w.object;L=w.buffer;G=w.opaque;g(J);for(w=0;w<G.count;w++)F=G.list[w],j(F.depthTest),k(F.polygonOffset,
F.polygonOffsetFactor,F.polygonOffsetUnits),e(c,M,N,F,L,J)}for(A=0;A<H;A++)if(w=b.__webglObjectsImmediate[A],J=w.object,J.visible){G=w.opaque;g(J);for(w=0;w<G.count;w++)F=G.list[w],j(F.depthTest),k(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),D=d(c,M,N,F,J),J.render(function(b){f(b,D,F.shading)})}for(A=0;A<I;A++)if(w=b.__webglObjects[A],w.render){J=w.object;L=w.buffer;G=w.transparent;g(J);for(w=0;w<G.count;w++)F=G.list[w],C(F.blending),j(F.depthTest),k(F.polygonOffset,F.polygonOffsetFactor,
F.polygonOffsetUnits),e(c,M,N,F,L,J)}for(A=0;A<H;A++)if(w=b.__webglObjectsImmediate[A],J=w.object,J.visible){G=w.transparent;g(J);for(w=0;w<G.count;w++)F=G.list[w],C(F.blending),j(F.depthTest),k(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),D=d(c,M,N,F,J),J.render(function(b){f(b,D,F.shading)})}b.__webglSprites.length&&y(b,c);_stencil&&b.__webglShadowVolumes.length&&b.lights.length&&v(b);b.__webglLensFlares.length&&B(b,c);p&&p.minFilter!==THREE.NearestFilter&&p.minFilter!==THREE.LinearFilter&&
(h.bindTexture(h.TEXTURE_2D,p.__webglTexture),h.generateMipmap(h.TEXTURE_2D),h.bindTexture(h.TEXTURE_2D,null))};this.initWebGLObjects=function(b){if(!b.__webglObjects)b.__webglObjects=[],b.__webglObjectsImmediate=[],b.__webglShadowVolumes=[],b.__webglLensFlares=[],b.__webglSprites=[];for(;b.__objectsAdded.length;){var c=b.__objectsAdded[0],d=b,e=void 0,g=void 0,f=void 0;if(c._modelViewMatrix==void 0)c._modelViewMatrix=new THREE.Matrix4,c._normalMatrixArray=new Float32Array(9),c._modelViewMatrixArray=
new Float32Array(16),c._objectMatrixArray=new Float32Array(16),c.matrixWorld.flattenToArray(c._objectMatrixArray);if(c instanceof THREE.Mesh)for(e in g=c.geometry,g.geometryGroups==void 0&&G(g),g.geometryGroups){f=g.geometryGroups[e];if(!f.__webglVertexBuffer){var j=f;j.__webglVertexBuffer=h.createBuffer();j.__webglNormalBuffer=h.createBuffer();j.__webglTangentBuffer=h.createBuffer();j.__webglColorBuffer=h.createBuffer();j.__webglUVBuffer=h.createBuffer();j.__webglUV2Buffer=h.createBuffer();j.__webglSkinVertexABuffer=
h.createBuffer();j.__webglSkinVertexBBuffer=h.createBuffer();j.__webglSkinIndicesBuffer=h.createBuffer();j.__webglSkinWeightsBuffer=h.createBuffer();j.__webglFaceBuffer=h.createBuffer();j.__webglLineBuffer=h.createBuffer();if(j.numMorphTargets){var k=void 0,n=void 0;j.__webglMorphTargetsBuffers=[];k=0;for(n=j.numMorphTargets;k<n;k++)j.__webglMorphTargetsBuffers.push(h.createBuffer())}for(var j=f,k=c,m=void 0,o=void 0,p=void 0,t=p=void 0,u=void 0,v=void 0,z=v=n=0,w=p=o=void 0,y=w=o=m=void 0,p=void 0,
t=k.geometry,u=t.faces,w=j.faces,m=0,o=w.length;m<o;m++)p=w[m],p=u[p],p instanceof THREE.Face3?(n+=3,v+=1,z+=3):p instanceof THREE.Face4&&(n+=4,v+=2,z+=4);for(var m=j,o=k,B=w=u=void 0,C=void 0,B=void 0,p=[],u=0,w=o.materials.length;u<w;u++)if(B=o.materials[u],B instanceof THREE.MeshFaceMaterial){B=0;for(l=m.materials.length;B<l;B++)(C=m.materials[B])&&p.push(C)}else(C=B)&&p.push(C);m=p;j.__materials=m;a:{u=o=void 0;w=m.length;for(o=0;o<w;o++)if(u=m[o],u.map||u.lightMap||u instanceof THREE.MeshShaderMaterial){o=
!0;break a}o=!1}a:{w=u=void 0;p=m.length;for(u=0;u<p;u++)if(w=m[u],!(w instanceof THREE.MeshBasicMaterial&&!w.envMap||w instanceof THREE.MeshDepthMaterial)){w=w&&w.shading!=void 0&&w.shading==THREE.SmoothShading?THREE.SmoothShading:THREE.FlatShading;break a}w=!1}a:{p=u=void 0;B=m.length;for(u=0;u<B;u++)if(p=m[u],p.vertexColors){p=p.vertexColors;break a}p=!1}j.__vertexArray=new Float32Array(n*3);if(w)j.__normalArray=new Float32Array(n*3);if(t.hasTangents)j.__tangentArray=new Float32Array(n*4);if(p)j.__colorArray=
new Float32Array(n*3);if(o){if(t.faceUvs.length>0||t.faceVertexUvs.length>0)j.__uvArray=new Float32Array(n*2);if(t.faceUvs.length>1||t.faceVertexUvs.length>1)j.__uv2Array=new Float32Array(n*2)}if(k.geometry.skinWeights.length&&k.geometry.skinIndices.length)j.__skinVertexAArray=new Float32Array(n*4),j.__skinVertexBArray=new Float32Array(n*4),j.__skinIndexArray=new Float32Array(n*4),j.__skinWeightArray=new Float32Array(n*4);j.__faceArray=new Uint16Array(v*3+(k.geometry.edgeFaces?k.geometry.edgeFaces.length*
6:0));j.__lineArray=new Uint16Array(z*2);if(j.numMorphTargets){j.__morphTargetsArrays=[];t=0;for(u=j.numMorphTargets;t<u;t++)j.__morphTargetsArrays.push(new Float32Array(n*3))}j.__needsSmoothNormals=w==THREE.SmoothShading;j.__uvType=o;j.__vertexColorType=p;j.__normalType=w;j.__webglFaceCount=v*3+(k.geometry.edgeFaces?k.geometry.edgeFaces.length*6:0);j.__webglLineCount=z*2;t=0;for(u=m.length;t<u;t++)if(o=m[t],o.attributes)for(a in j.__webglCustomAttributes={},o.attributes){p=o.attributes[a];w={};for(y in p)w[y]=
p[y];if(!w.__webglInitialized||w.createUniqueBuffers)w.__webglInitialized=!0,v=1,w.type==="v2"?v=2:w.type==="v3"?v=3:w.type==="v4"?v=4:w.type==="c"&&(v=3),w.size=v,w.array=new Float32Array(n*v),w.buffer=h.createBuffer(),w.buffer.belongsToAttribute=a,p.needsUpdate=!0,w.__original=p;j.__webglCustomAttributes[a]=w}j.__inittedArrays=!0;g.__dirtyVertices=!0;g.__dirtyMorphTargets=!0;g.__dirtyElements=!0;g.__dirtyUvs=!0;g.__dirtyNormals=!0;g.__dirtyTangents=!0;g.__dirtyColors=!0}c instanceof THREE.ShadowVolume?
F(d.__webglShadowVolumes,f,c):F(d.__webglObjects,f,c)}else if(c instanceof THREE.LensFlare)F(d.__webglLensFlares,void 0,c);else if(c instanceof THREE.Ribbon){g=c.geometry;if(!g.__webglVertexBuffer)e=g,e.__webglVertexBuffer=h.createBuffer(),e.__webglColorBuffer=h.createBuffer(),e=g,f=e.vertices.length,e.__vertexArray=new Float32Array(f*3),e.__colorArray=new Float32Array(f*3),e.__webglVertexCount=f,g.__dirtyVertices=!0,g.__dirtyColors=!0;F(d.__webglObjects,g,c)}else if(c instanceof THREE.Line){g=c.geometry;
if(!g.__webglVertexBuffer)e=g,e.__webglVertexBuffer=h.createBuffer(),e.__webglColorBuffer=h.createBuffer(),e=g,f=e.vertices.length,e.__vertexArray=new Float32Array(f*3),e.__colorArray=new Float32Array(f*3),e.__webglLineCount=f,g.__dirtyVertices=!0,g.__dirtyColors=!0;F(d.__webglObjects,g,c)}else if(c instanceof THREE.ParticleSystem){g=c.geometry;if(!g.__webglVertexBuffer)e=g,e.__webglVertexBuffer=h.createBuffer(),e.__webglColorBuffer=h.createBuffer(),e=g,f=e.vertices.length,e.__vertexArray=new Float32Array(f*
3),e.__colorArray=new Float32Array(f*3),e.__sortArray=[],e.__webglParticleCount=f,g.__dirtyVertices=!0,g.__dirtyColors=!0;F(d.__webglObjects,g,c)}else THREE.MarchingCubes!==void 0&&c instanceof THREE.MarchingCubes?d.__webglObjectsImmediate.push({object:c,opaque:{list:[],count:0},transparent:{list:[],count:0}}):c instanceof THREE.Sprite&&d.__webglSprites.push(c);b.__objectsAdded.splice(0,1)}for(;b.__objectsRemoved.length;)c=b.__objectsRemoved[0],d=b,c instanceof THREE.ShadowVolume?A(d.__webglShadowVolumes,
c):c instanceof THREE.Mesh||c instanceof THREE.ParticleSystem||c instanceof THREE.Ribbon||c instanceof THREE.Line?A(d.__webglObjects,c):c instanceof THREE.Sprite?A(d.__webglSprites,c):c instanceof THREE.LensFlare?A(d.__webglLensFlares,c):c instanceof THREE.MarchingCubes&&A(d.__webglObjectsImmediate,c),b.__objectsRemoved.splice(0,1);c=0;for(d=b.__webglObjects.length;c<d;c++)I(b.__webglObjects[c].object,b);c=0;for(d=b.__webglShadowVolumes.length;c<d;c++)I(b.__webglShadowVolumes[c].object,b);c=0;for(d=
b.__webglLensFlares.length;c<d;c++)I(b.__webglLensFlares[c].object,b)};this.setFaceCulling=function(b,c){b?(!c||c=="ccw"?h.frontFace(h.CCW):h.frontFace(h.CW),b=="back"?h.cullFace(h.BACK):b=="front"?h.cullFace(h.FRONT):h.cullFace(h.FRONT_AND_BACK),h.enable(h.CULL_FACE)):h.disable(h.CULL_FACE)};this.supportsVertexTextures=function(){return ia}};
THREE.WebGLRenderTarget=function(b,c,d){this.width=b;this.height=c;d=d||{};this.wrapS=d.wrapS!==void 0?d.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=d.wrapT!==void 0?d.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=d.magFilter!==void 0?d.magFilter:THREE.LinearFilter;this.minFilter=d.minFilter!==void 0?d.minFilter:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.format=d.format!==void 0?d.format:THREE.RGBAFormat;this.type=d.type!==void 0?d.type:
THREE.UnsignedByteType;this.depthBuffer=d.depthBuffer!==void 0?d.depthBuffer:!0;this.stencilBuffer=d.stencilBuffer!==void 0?d.stencilBuffer:!0};
THREE.SoundRenderer=function(){this.volume=1;this.domElement=document.createElement("div");this.domElement.id="THREESound";this.cameraPosition=new THREE.Vector3;this.soundPosition=new THREE.Vector3;this.render=function(b,c,d){d&&b.update(void 0,!1,c);var d=b.sounds,e,f=d.length;for(e=0;e<f;e++)b=d[e],this.soundPosition.set(b.matrixWorld.n14,b.matrixWorld.n24,b.matrixWorld.n34),this.soundPosition.subSelf(c.position),b.isPlaying&&b.isLoaded&&(b.isAddedToDOM||b.addToDOM(this.domElement),b.calculateVolumeAndPan(this.soundPosition))}};
THREE.RenderableVertex=function(){this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=!0};THREE.RenderableVertex.prototype.copy=function(b){this.positionWorld.copy(b.positionWorld);this.positionScreen.copy(b.positionScreen)};
THREE.RenderableFace3=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterials=this.meshMaterials=null;this.overdraw=!1;this.uvs=[[]];this.z=null};
THREE.RenderableFace4=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.v4=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterials=this.meshMaterials=null;this.overdraw=!1;this.uvs=[[]];this.z=null};
THREE.RenderableObject=function(){this.z=this.object=null};THREE.RenderableParticle=function(){this.rotation=this.z=this.y=this.x=null;this.scale=new THREE.Vector2;this.materials=null};THREE.RenderableLine=function(){this.z=null;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.materials=null};
THREE.ColorUtils={adjustHSV:function(b,c,d,e){var f=THREE.ColorUtils.__hsv;THREE.ColorUtils.rgbToHsv(b,f);f.h=THREE.ColorUtils.clamp(f.h+c,0,1);f.s=THREE.ColorUtils.clamp(f.s+d,0,1);f.v=THREE.ColorUtils.clamp(f.v+e,0,1);b.setHSV(f.h,f.s,f.v)},rgbToHsv:function(b,c){var d=b.r,e=b.g,f=b.b,g=Math.max(Math.max(d,e),f),j=Math.min(Math.min(d,e),f);if(j==g)j=d=0;else{var k=g-j,j=k/g,d=d==g?(e-f)/k:e==g?2+(f-d)/k:4+(d-e)/k;d/=6;d<0&&(d+=1);d>1&&(d-=1)}c===void 0&&(c={h:0,s:0,v:0});c.h=d;c.s=j;c.v=g;return c},
clamp:function(b,c,d){return b<c?c:b>d?d:b}};THREE.ColorUtils.__hsv={h:0,s:0,v:0};
var GeometryUtils={merge:function(b,c){var d=c instanceof THREE.Mesh,e=b.vertices.length,f=d?c.geometry:c,g=b.vertices,j=f.vertices,k=b.faces,m=f.faces,o=b.faceVertexUvs[0],f=f.faceVertexUvs[0];d&&c.matrixAutoUpdate&&c.updateMatrix();for(var p=0,t=j.length;p<t;p++){var n=new THREE.Vertex(j[p].position.clone());d&&c.matrix.multiplyVector3(n.position);g.push(n)}p=0;for(t=m.length;p<t;p++){var j=m[p],u,v,y=j.vertexNormals,n=j.vertexColors;j instanceof THREE.Face3?u=new THREE.Face3(j.a+e,j.b+e,j.c+e):
j instanceof THREE.Face4&&(u=new THREE.Face4(j.a+e,j.b+e,j.c+e,j.d+e));u.normal.copy(j.normal);d=0;for(g=y.length;d<g;d++)v=y[d],u.vertexNormals.push(v.clone());u.color.copy(j.color);d=0;for(g=n.length;d<g;d++)v=n[d],u.vertexColors.push(v.clone());u.materials=j.materials.slice();u.centroid.copy(j.centroid);k.push(u)}p=0;for(t=f.length;p<t;p++){e=f[p];k=[];d=0;for(g=e.length;d<g;d++)k.push(new THREE.UV(e[d].u,e[d].v));o.push(k)}}};
THREE.ImageUtils={loadTexture:function(b,c,d){var e=new Image,f=new THREE.Texture(e,c);e.onload=function(){f.needsUpdate=!0;d&&d(this)};e.src=b;return f},loadTextureCube:function(b,c,d){var e,f=[],g=new THREE.Texture(f,c),c=f.loadCount=0;for(e=b.length;c<e;++c)f[c]=new Image,f[c].onload=function(){f.loadCount+=1;if(f.loadCount==6)g.needsUpdate=!0;d&&d(this)},f[c].src=b[c];return g}};
THREE.SceneUtils={addMesh:function(b,c,d,e,f,g,j,k,m,o){c=new THREE.Mesh(c,o);c.scale.x=c.scale.y=c.scale.z=d;c.position.x=e;c.position.y=f;c.position.z=g;c.rotation.x=j;c.rotation.y=k;c.rotation.z=m;b.addObject(c);return c},addPanoramaCubeWebGL:function(b,c,d){var e=THREE.ShaderUtils.lib.cube;e.uniforms.tCube.texture=d;d=new THREE.MeshShaderMaterial({fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:e.uniforms});c=new THREE.Mesh(new THREE.CubeGeometry(c,c,c,1,1,1,null,!0),d);b.addObject(c);
return c},addPanoramaCube:function(b,c,d){var e=[];e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[0])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[1])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[2])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[3])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[4])}));e.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(d[5])}));c=new THREE.Mesh(new THREE.Cube(c,c,c,1,1,e,!0),
new THREE.MeshFaceMaterial);b.addObject(c);return c},addPanoramaCubePlanes:function(b,c,d){var e=c/2,c=new THREE.Plane(c,c),f=Math.PI,g=Math.PI/2;THREE.SceneUtils.addMesh(b,c,1,0,0,-e,0,0,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[5])}));THREE.SceneUtils.addMesh(b,c,1,-e,0,0,0,g,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[0])}));THREE.SceneUtils.addMesh(b,c,1,e,0,0,0,-g,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[1])}));THREE.SceneUtils.addMesh(b,c,1,0,e,0,g,0,f,
new THREE.MeshBasicMaterial({map:new THREE.Texture(d[2])}));THREE.SceneUtils.addMesh(b,c,1,0,-e,0,-g,0,f,new THREE.MeshBasicMaterial({map:new THREE.Texture(d[3])}))},showHierarchy:function(b,c){THREE.SceneUtils.traverseHierarchy(b,function(b){b.visible=c})},traverseHierarchy:function(b,c){var d,e,f=b.children.length;for(e=0;e<f;e++)d=b.children[e],c(d),THREE.SceneUtils.traverseHierarchy(d,c)}};
THREE.ShaderUtils={lib:{fresnel:{uniforms:{mRefractionRatio:{type:"f",value:1.02},mFresnelBias:{type:"f",value:0.1},mFresnelPower:{type:"f",value:2},mFresnelScale:{type:"f",value:1},tCube:{type:"t",value:1,texture:null}},fragmentShader:"uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
vertexShader:"uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"},
normal:{uniforms:{enableAO:{type:"i",value:0},enableDiffuse:{type:"i",value:0},enableSpecular:{type:"i",value:0},tDiffuse:{type:"t",value:0,texture:null},tNormal:{type:"t",value:2,texture:null},tSpecular:{type:"t",value:3,texture:null},tAO:{type:"t",value:4,texture:null},uNormalScale:{type:"f",value:1},tDisplacement:{type:"t",value:5,texture:null},uDisplacementBias:{type:"f",value:-0.5},uDisplacementScale:{type:"f",value:2.5},uPointLightPos:{type:"v3",value:new THREE.Vector3},uPointLightColor:{type:"c",
value:new THREE.Color(15658734)},uDirLightPos:{type:"v3",value:new THREE.Vector3},uDirLightColor:{type:"c",value:new THREE.Color(15658734)},uAmbientLightColor:{type:"c",value:new THREE.Color(328965)},uDiffuseColor:{type:"c",value:new THREE.Color(15658734)},uSpecularColor:{type:"c",value:new THREE.Color(1118481)},uAmbientColor:{type:"c",value:new THREE.Color(328965)},uShininess:{type:"f",value:30}},fragmentShader:"uniform vec3 uDirLightPos;\nuniform vec3 uAmbientLightColor;\nuniform vec3 uDirLightColor;\nuniform vec3 uPointLightColor;\nuniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform float uNormalScale;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 diffuseTex = vec3( 1.0, 1.0, 1.0 );\nvec3 aoTex = vec3( 1.0, 1.0, 1.0 );\nvec3 specularTex = vec3( 1.0, 1.0, 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ndiffuseTex = texture2D( tDiffuse, vUv ).xyz;\nif( enableAO )\naoTex = texture2D( tAO, vUv ).xyz;\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 pointDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 pointSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec3 pointVector = normalize( vPointLightVector );\nvec3 pointHalfVector = normalize( vPointLightVector + vViewPosition );\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointDiffuse  += vec4( uDiffuseColor, 1.0 ) * pointDiffuseWeight;\npointSpecular += vec4( uSpecularColor, 1.0 ) * pointSpecularWeight * pointDiffuseWeight;\nvec4 dirDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 dirSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirDiffuse  += vec4( uDiffuseColor, 1.0 ) * dirDiffuseWeight;\ndirSpecular += vec4( uSpecularColor, 1.0 ) * dirSpecularWeight * dirDiffuseWeight;\nvec4 totalLight = vec4( uAmbientLightColor * uAmbientColor, 1.0 );\ntotalLight += vec4( uDirLightColor, 1.0 ) * ( dirDiffuse + dirSpecular );\ntotalLight += vec4( uPointLightColor, 1.0 ) * ( pointDiffuse + pointSpecular );\ngl_FragColor = vec4( totalLight.xyz * aoTex * diffuseTex, 1.0 );\n}",
vertexShader:"attribute vec4 tangent;\nuniform vec3 uPointLightPos;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv;\nvec4 lPosition = viewMatrix * vec4( uPointLightPos, 1.0 );\nvPointLightVector = normalize( lPosition.xyz - mvPosition.xyz );\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif\n}"},
cube:{uniforms:{tCube:{type:"t",value:1,texture:null}},vertexShader:"varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}"},convolution:{uniforms:{tDiffuse:{type:"t",
value:0,texture:null},uImageIncrement:{type:"v2",value:new THREE.Vector2(0.001953125,0)},cKernel:{type:"fv1",value:[]}},vertexShader:"varying vec2 vUv;\nuniform vec2 uImageIncrement;\nvoid main(void) {\nvUv = uv - ((KERNEL_SIZE - 1.0) / 2.0) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nuniform float cKernel[KERNEL_SIZE];\nvoid main(void) {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i=0; i<KERNEL_SIZE; ++i ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[i];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}"},
film:{uniforms:{tDiffuse:{type:"t",value:0,texture:null},time:{type:"f",value:0},nIntensity:{type:"f",value:0.5},sIntensity:{type:"f",value:0.05},sCount:{type:"f",value:4096},grayscale:{type:"i",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}"},
screen:{uniforms:{tDiffuse:{type:"t",value:0,texture:null},opacity:{type:"f",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float opacity;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}"},basic:{uniforms:{},vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
fragmentShader:"void main() {\ngl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n}"}},buildKernel:function(b){var c,d,e,f,g=2*Math.ceil(b*3)+1;g>25&&(g=25);f=(g-1)*0.5;d=Array(g);for(c=e=0;c<g;++c)d[c]=Math.exp(-((c-f)*(c-f))/(2*b*b)),e+=d[c];for(c=0;c<g;++c)d[c]/=e;return d}};
THREE.AnimationHandler=function(){var b=[],c={},d={update:function(c){for(var d=0;d<b.length;d++)b[d].update(c)},addToUpdate:function(c){b.indexOf(c)===-1&&b.push(c)},removeFromUpdate:function(c){c=b.indexOf(c);c!==-1&&b.splice(c,1)},add:function(b){c[b.name]!==void 0&&Fiesta.log("THREE.AnimationHandler.add: Warning! "+b.name+" already exists in library. Overwriting.");c[b.name]=b;if(b.initialized!==!0){for(var d=0;d<b.hierarchy.length;d++){for(var e=0;e<b.hierarchy[d].keys.length;e++){if(b.hierarchy[d].keys[e].time<
0)b.hierarchy[d].keys[e].time=0;if(b.hierarchy[d].keys[e].rot!==void 0&&!(b.hierarchy[d].keys[e].rot instanceof THREE.Quaternion)){var k=b.hierarchy[d].keys[e].rot;b.hierarchy[d].keys[e].rot=new THREE.Quaternion(k[0],k[1],k[2],k[3])}}if(b.hierarchy[d].keys[0].morphTargets!==void 0){k={};for(e=0;e<b.hierarchy[d].keys.length;e++)for(var m=0;m<b.hierarchy[d].keys[e].morphTargets.length;m++){var o=b.hierarchy[d].keys[e].morphTargets[m];k[o]=-1}b.hierarchy[d].usedMorphTargets=k;for(e=0;e<b.hierarchy[d].keys.length;e++){var p=
{};for(o in k){for(m=0;m<b.hierarchy[d].keys[e].morphTargets.length;m++)if(b.hierarchy[d].keys[e].morphTargets[m]===o){p[o]=b.hierarchy[d].keys[e].morphTargetsInfluences[m];break}m===b.hierarchy[d].keys[e].morphTargets.length&&(p[o]=0)}b.hierarchy[d].keys[e].morphTargetsInfluences=p}}for(e=1;e<b.hierarchy[d].keys.length;e++)b.hierarchy[d].keys[e].time===b.hierarchy[d].keys[e-1].time&&(b.hierarchy[d].keys.splice(e,1),e--);for(e=1;e<b.hierarchy[d].keys.length;e++)b.hierarchy[d].keys[e].index=e}e=parseInt(b.length*
b.fps,10);b.JIT={};b.JIT.hierarchy=[];for(d=0;d<b.hierarchy.length;d++)b.JIT.hierarchy.push(Array(e));b.initialized=!0}},get:function(b){if(typeof b==="string")return c[b]?c[b]:(Fiesta.log("THREE.AnimationHandler.get: Couldn't find animation "+b),null)},parse:function(b){var c=[];if(b instanceof THREE.SkinnedMesh)for(var d=0;d<b.bones.length;d++)c.push(b.bones[d]);else e(b,c);return c}},e=function(b,c){c.push(b);for(var d=0;d<b.children.length;d++)e(b.children[d],c)};d.LINEAR=0;d.CATMULLROM=1;d.CATMULLROM_FORWARD=
2;return d}();THREE.Animation=function(b,c,d,e){this.root=b;this.data=THREE.AnimationHandler.get(c);this.hierarchy=THREE.AnimationHandler.parse(b);this.currentTime=0;this.timeScale=1;this.isPlaying=!1;this.loop=this.isPaused=!0;this.interpolationType=d!==void 0?d:THREE.AnimationHandler.LINEAR;this.JITCompile=e!==void 0?e:!0;this.points=[];this.target=new THREE.Vector3};
THREE.Animation.prototype.play=function(b,c){if(!this.isPlaying){this.isPlaying=!0;this.loop=b!==void 0?b:!0;this.currentTime=c!==void 0?c:0;var d,e=this.hierarchy.length,f;for(d=0;d<e;d++){f=this.hierarchy[d];if(this.interpolationType!==THREE.AnimationHandler.CATMULLROM_FORWARD)f.useQuaternion=!0;f.matrixAutoUpdate=!0;if(f.animationCache===void 0)f.animationCache={},f.animationCache.prevKey={pos:0,rot:0,scl:0},f.animationCache.nextKey={pos:0,rot:0,scl:0},f.animationCache.originalMatrix=f instanceof
THREE.Bone?f.skinMatrix:f.matrix;var g=f.animationCache.prevKey;f=f.animationCache.nextKey;g.pos=this.data.hierarchy[d].keys[0];g.rot=this.data.hierarchy[d].keys[0];g.scl=this.data.hierarchy[d].keys[0];f.pos=this.getNextKeyWith("pos",d,1);f.rot=this.getNextKeyWith("rot",d,1);f.scl=this.getNextKeyWith("scl",d,1)}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};
THREE.Animation.prototype.pause=function(){this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};
THREE.Animation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var b=0;b<this.hierarchy.length;b++)if(this.hierarchy[b].animationCache!==void 0)this.hierarchy[b]instanceof THREE.Bone?this.hierarchy[b].skinMatrix=this.hierarchy[b].animationCache.originalMatrix:this.hierarchy[b].matrix=this.hierarchy[b].animationCache.originalMatrix,delete this.hierarchy[b].animationCache};
THREE.Animation.prototype.update=function(b){if(this.isPlaying){var c=["pos","rot","scl"],d,e,f,g,j,k,m,o,p=this.data.JIT.hierarchy,t,n;this.currentTime+=b*this.timeScale;n=this.currentTime;t=this.currentTime%=this.data.length;o=parseInt(Math.min(t*this.data.fps,this.data.length*this.data.fps),10);for(var u=0,v=this.hierarchy.length;u<v;u++)if(b=this.hierarchy[u],m=b.animationCache,this.JITCompile&&p[u][o]!==void 0)b instanceof THREE.Bone?(b.skinMatrix=p[u][o],b.matrixAutoUpdate=!1,b.matrixWorldNeedsUpdate=
!1):(b.matrix=p[u][o],b.matrixAutoUpdate=!1,b.matrixWorldNeedsUpdate=!0);else{if(this.JITCompile)b instanceof THREE.Bone?b.skinMatrix=b.animationCache.originalMatrix:b.matrix=b.animationCache.originalMatrix;for(var y=0;y<3;y++){d=c[y];j=m.prevKey[d];k=m.nextKey[d];if(k.time<=n){if(t<n)if(this.loop){j=this.data.hierarchy[u].keys[0];for(k=this.getNextKeyWith(d,u,1);k.time<t;)j=k,k=this.getNextKeyWith(d,u,k.index+1)}else{this.stop();return}else{do j=k,k=this.getNextKeyWith(d,u,k.index+1);while(k.time<
t)}m.prevKey[d]=j;m.nextKey[d]=k}b.matrixAutoUpdate=!0;b.matrixWorldNeedsUpdate=!0;e=(t-j.time)/(k.time-j.time);f=j[d];g=k[d];if(e<0||e>1)Fiesta.log("THREE.Animation.update: Warning! Scale out of bounds:"+e+" on bone "+u),e=e<0?0:1;if(d==="pos")if(d=b.position,this.interpolationType===THREE.AnimationHandler.LINEAR)d.x=f[0]+(g[0]-f[0])*e,d.y=f[1]+(g[1]-f[1])*e,d.z=f[2]+(g[2]-f[2])*e;else{if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)if(this.points[0]=
this.getPrevKeyWith("pos",u,j.index-1).pos,this.points[1]=f,this.points[2]=g,this.points[3]=this.getNextKeyWith("pos",u,k.index+1).pos,e=e*0.33+0.33,f=this.interpolateCatmullRom(this.points,e),d.x=f[0],d.y=f[1],d.z=f[2],this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)e=this.interpolateCatmullRom(this.points,e*1.01),this.target.set(e[0],e[1],e[2]),this.target.subSelf(d),this.target.y=0,this.target.normalize(),e=Math.atan2(this.target.x,this.target.z),b.rotation.set(0,e,0)}else if(d===
"rot")THREE.Quaternion.slerp(f,g,b.quaternion,e);else if(d==="scl")d=b.scale,d.x=f[0]+(g[0]-f[0])*e,d.y=f[1]+(g[1]-f[1])*e,d.z=f[2]+(g[2]-f[2])*e}}if(this.JITCompile&&p[0][o]===void 0){this.hierarchy[0].update(void 0,!0);for(u=0;u<this.hierarchy.length;u++)p[u][o]=this.hierarchy[u]instanceof THREE.Bone?this.hierarchy[u].skinMatrix.clone():this.hierarchy[u].matrix.clone()}}};
THREE.Animation.prototype.interpolateCatmullRom=function(b,c){var d=[],e=[],f,g,j,k,m,o;f=(b.length-1)*c;g=Math.floor(f);f-=g;d[0]=g==0?g:g-1;d[1]=g;d[2]=g>b.length-2?g:g+1;d[3]=g>b.length-3?g:g+2;g=b[d[0]];k=b[d[1]];m=b[d[2]];o=b[d[3]];d=f*f;j=f*d;e[0]=this.interpolate(g[0],k[0],m[0],o[0],f,d,j);e[1]=this.interpolate(g[1],k[1],m[1],o[1],f,d,j);e[2]=this.interpolate(g[2],k[2],m[2],o[2],f,d,j);return e};
THREE.Animation.prototype.interpolate=function(b,c,d,e,f,g,j){b=(d-b)*0.5;e=(e-c)*0.5;return(2*(c-d)+b+e)*j+(-3*(c-d)-2*b-e)*g+b*f+c};THREE.Animation.prototype.getNextKeyWith=function(b,c,d){var e=this.data.hierarchy[c].keys;for(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?d=d<e.length-1?d:e.length-1:d%=e.length;d<e.length;d++)if(e[d][b]!==void 0)return e[d];return this.data.hierarchy[c].keys[0]};
THREE.Animation.prototype.getPrevKeyWith=function(b,c,d){for(var e=this.data.hierarchy[c].keys,d=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?d>0?d:0:d>=0?d:d+e.length;d>=0;d--)if(e[d][b]!==void 0)return e[d];return this.data.hierarchy[c].keys[e.length-1]};
THREE.QuakeCamera=function(b){function c(b,c){return function(){c.apply(b,arguments)}}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.movementSpeed=1;this.lookSpeed=0.005;this.noFly=!1;this.lookVertical=!0;this.autoForward=!1;this.activeLook=!0;this.heightSpeed=!1;this.heightCoef=1;this.heightMin=0;this.constrainVertical=!1;this.verticalMin=0;this.verticalMax=3.14;this.domElement=document;this.lastUpdate=(new Date).getTime();this.tdiff=0;if(b){if(b.movementSpeed!==void 0)this.movementSpeed=
b.movementSpeed;if(b.lookSpeed!==void 0)this.lookSpeed=b.lookSpeed;if(b.noFly!==void 0)this.noFly=b.noFly;if(b.lookVertical!==void 0)this.lookVertical=b.lookVertical;if(b.autoForward!==void 0)this.autoForward=b.autoForward;if(b.activeLook!==void 0)this.activeLook=b.activeLook;if(b.heightSpeed!==void 0)this.heightSpeed=b.heightSpeed;if(b.heightCoef!==void 0)this.heightCoef=b.heightCoef;if(b.heightMin!==void 0)this.heightMin=b.heightMin;if(b.heightMax!==void 0)this.heightMax=b.heightMax;if(b.constrainVertical!==
void 0)this.constrainVertical=b.constrainVertical;if(b.verticalMin!==void 0)this.verticalMin=b.verticalMin;if(b.verticalMax!==void 0)this.verticalMax=b.verticalMax;if(b.domElement!==void 0)this.domElement=b.domElement}this.theta=this.phi=this.lon=this.lat=this.mouseY=this.mouseX=this.autoSpeedFactor=0;this.mouseDragOn=this.freeze=this.moveRight=this.moveLeft=this.moveBackward=this.moveForward=!1;this.windowHalfX=window.innerWidth/2;this.windowHalfY=window.innerHeight/2;this.onMouseDown=function(b){b.preventDefault();
b.stopPropagation();if(this.activeLook)switch(b.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0};this.onMouseUp=function(b){b.preventDefault();b.stopPropagation();if(this.activeLook)switch(b.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1};this.onMouseMove=function(b){this.mouseX=b.clientX-this.windowHalfX;this.mouseY=b.clientY-this.windowHalfY};this.onKeyDown=function(b){switch(b.keyCode){case 38:case 87:this.moveForward=
!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 81:this.freeze=!this.freeze}};this.onKeyUp=function(b){switch(b.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1}};this.update=function(){var b=(new Date).getTime();this.tdiff=(b-this.lastUpdate)/1E3;this.lastUpdate=b;if(!this.freeze){this.autoSpeedFactor=
this.heightSpeed?this.tdiff*((this.position.y<this.heightMin?this.heightMin:this.position.y>this.heightMax?this.heightMax:this.position.y)-this.heightMin)*this.heightCoef:0;var c=this.tdiff*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.translateZ(-(c+this.autoSpeedFactor));this.moveBackward&&this.translateZ(c);this.moveLeft&&this.translateX(-c);this.moveRight&&this.translateX(c);c=this.tdiff*this.lookSpeed;this.activeLook||(c=0);this.lon+=this.mouseX*c;this.lookVertical&&
(this.lat-=this.mouseY*c);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;var b=this.target.position,f=this.position;b.x=f.x+100*Math.sin(this.phi)*Math.cos(this.theta);b.y=f.y+100*Math.cos(this.phi);b.z=f.z+100*Math.sin(this.phi)*Math.sin(this.theta)}this.lon+=this.mouseX*c;this.lookVertical&&(this.lat-=this.mouseY*c);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;if(this.constrainVertical)this.phi=
(this.phi-0)*(this.verticalMax-this.verticalMin)/3.14+this.verticalMin;b=this.target.position;f=this.position;b.x=f.x+100*Math.sin(this.phi)*Math.cos(this.theta);b.y=f.y+100*Math.cos(this.phi);b.z=f.z+100*Math.sin(this.phi)*Math.sin(this.theta);this.supr.update.call(this)};this.domElement.addEventListener("contextmenu",function(b){b.preventDefault()},!1);this.domElement.addEventListener("mousemove",c(this,this.onMouseMove),!1);this.domElement.addEventListener("mousedown",c(this,this.onMouseDown),
!1);this.domElement.addEventListener("mouseup",c(this,this.onMouseUp),!1);this.domElement.addEventListener("keydown",c(this,this.onKeyDown),!1);this.domElement.addEventListener("keyup",c(this,this.onKeyUp),!1)};THREE.QuakeCamera.prototype=new THREE.Camera;THREE.QuakeCamera.prototype.constructor=THREE.QuakeCamera;THREE.QuakeCamera.prototype.supr=THREE.Camera.prototype;
THREE.QuakeCamera.prototype.translate=function(b,c){this.matrix.rotateAxis(c);if(this.noFly)c.y=0;this.position.addSelf(c.multiplyScalar(b));this.target.position.addSelf(c.multiplyScalar(b))};
THREE.PathCamera=function(b){function c(b,c,d,e){var g={name:d,fps:0.6,length:e,hierarchy:[]},f,j=c.getControlPointsArray(),k=c.getLength(),m=j.length,I=0;f=m-1;c={parent:-1,keys:[]};c.keys[0]={time:0,pos:j[0],rot:[0,0,0,1],scl:[1,1,1]};c.keys[f]={time:e,pos:j[f],rot:[0,0,0,1],scl:[1,1,1]};for(f=1;f<m-1;f++)I=e*k.chunks[f]/k.total,c.keys[f]={time:I,pos:j[f]};g.hierarchy[0]=c;THREE.AnimationHandler.add(g);return new THREE.Animation(b,d,THREE.AnimationHandler.CATMULLROM_FORWARD,!1)}function d(b,c){var d,
e,g=new THREE.Geometry;for(d=0;d<b.points.length*c;d++)e=d/(b.points.length*c),e=b.getPoint(e),g.vertices[d]=new THREE.Vertex(new THREE.Vector3(e.x,e.y,e.z));return g}function e(b,c){var e=d(c,10),g=d(c,10),f=new THREE.LineBasicMaterial({color:16711680,linewidth:3});lineObj=new THREE.Line(e,f);particleObj=new THREE.ParticleSystem(g,new THREE.ParticleBasicMaterial({color:16755200,size:3}));lineObj.scale.set(1,1,1);b.addChild(lineObj);particleObj.scale.set(1,1,1);b.addChild(particleObj);g=new THREE.SphereGeometry(1,
16,8);f=new THREE.MeshBasicMaterial({color:65280});for(i=0;i<c.points.length;i++)e=new THREE.Mesh(g,f),e.position.copy(c.points[i]),e.updateMatrix(),b.addChild(e)}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.id="PathCamera"+THREE.PathCameraIdCounter++;this.duration=1E4;this.waypoints=[];this.useConstantSpeed=!0;this.resamplingCoef=50;this.debugPath=new THREE.Object3D;this.debugDummy=new THREE.Object3D;this.animationParent=new THREE.Object3D;this.lookSpeed=0.005;this.lookHorizontal=
this.lookVertical=!0;this.verticalAngleMap={srcRange:[0,6.28],dstRange:[0,6.28]};this.horizontalAngleMap={srcRange:[0,6.28],dstRange:[0,6.28]};this.domElement=document;if(b){if(b.duration!==void 0)this.duration=b.duration*1E3;if(b.waypoints!==void 0)this.waypoints=b.waypoints;if(b.useConstantSpeed!==void 0)this.useConstantSpeed=b.useConstantSpeed;if(b.resamplingCoef!==void 0)this.resamplingCoef=b.resamplingCoef;if(b.createDebugPath!==void 0)this.createDebugPath=b.createDebugPath;if(b.createDebugDummy!==
void 0)this.createDebugDummy=b.createDebugDummy;if(b.lookSpeed!==void 0)this.lookSpeed=b.lookSpeed;if(b.lookVertical!==void 0)this.lookVertical=b.lookVertical;if(b.lookHorizontal!==void 0)this.lookHorizontal=b.lookHorizontal;if(b.verticalAngleMap!==void 0)this.verticalAngleMap=b.verticalAngleMap;if(b.horizontalAngleMap!==void 0)this.horizontalAngleMap=b.horizontalAngleMap;if(b.domElement!==void 0)this.domElement=b.domElement}this.theta=this.phi=this.lon=this.lat=this.mouseY=this.mouseX=0;this.windowHalfX=
window.innerWidth/2;this.windowHalfY=window.innerHeight/2;var f=Math.PI*2,g=Math.PI/180;this.update=function(b,c,d){var e,j;this.lookHorizontal&&(this.lon+=this.mouseX*this.lookSpeed);this.lookVertical&&(this.lat-=this.mouseY*this.lookSpeed);this.lon=Math.max(0,Math.min(360,this.lon));this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*g;this.theta=this.lon*g;e=this.phi%f;this.phi=e>=0?e:e+f;e=this.verticalAngleMap.srcRange;j=this.verticalAngleMap.dstRange;var k=j[1]-j[0];this.phi=
TWEEN.Easing.Quadratic.EaseInOut(((this.phi-e[0])*(j[1]-j[0])/(e[1]-e[0])+j[0]-j[0])/k)*k+j[0];e=this.horizontalAngleMap.srcRange;j=this.horizontalAngleMap.dstRange;k=j[1]-j[0];this.theta=TWEEN.Easing.Quadratic.EaseInOut(((this.theta-e[0])*(j[1]-j[0])/(e[1]-e[0])+j[0]-j[0])/k)*k+j[0];e=this.target.position;e.x=100*Math.sin(this.phi)*Math.cos(this.theta);e.y=100*Math.cos(this.phi);e.z=100*Math.sin(this.phi)*Math.sin(this.theta);this.supr.update.call(this,b,c,d)};this.onMouseMove=function(b){this.mouseX=
b.clientX-this.windowHalfX;this.mouseY=b.clientY-this.windowHalfY};this.spline=new THREE.Spline;this.spline.initFromArray(this.waypoints);this.useConstantSpeed&&this.spline.reparametrizeByArcLength(this.resamplingCoef);if(this.createDebugDummy){var b=new THREE.MeshLambertMaterial({color:30719}),j=new THREE.MeshLambertMaterial({color:65280}),k=new THREE.CubeGeometry(10,10,20),m=new THREE.CubeGeometry(2,2,10);this.animationParent=new THREE.Mesh(k,b);b=new THREE.Mesh(m,j);b.position.set(0,10,0);this.animation=
c(this.animationParent,this.spline,this.id,this.duration);this.animationParent.addChild(this);this.animationParent.addChild(this.target);this.animationParent.addChild(b)}else this.animation=c(this.animationParent,this.spline,this.id,this.duration),this.animationParent.addChild(this.target),this.animationParent.addChild(this);this.createDebugPath&&e(this.debugPath,this.spline);this.domElement.addEventListener("mousemove",function(b,c){return function(){c.apply(b,arguments)}}(this,this.onMouseMove),
!1)};THREE.PathCamera.prototype=new THREE.Camera;THREE.PathCamera.prototype.constructor=THREE.PathCamera;THREE.PathCamera.prototype.supr=THREE.Camera.prototype;THREE.PathCameraIdCounter=0;
THREE.FlyCamera=function(b){function c(b,c){return function(){c.apply(b,arguments)}}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.tmpQuaternion=new THREE.Quaternion;this.movementSpeed=1;this.rollSpeed=0.005;this.autoForward=this.dragToLook=!1;this.domElement=document;if(b){if(b.movementSpeed!==void 0)this.movementSpeed=b.movementSpeed;if(b.rollSpeed!==void 0)this.rollSpeed=b.rollSpeed;if(b.dragToLook!==void 0)this.dragToLook=b.dragToLook;if(b.autoForward!==void 0)this.autoForward=
b.autoForward;if(b.domElement!==void 0)this.domElement=b.domElement}this.useTarget=!1;this.useQuaternion=!0;this.mouseStatus=0;this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0};this.moveVector=new THREE.Vector3(0,0,0);this.rotationVector=new THREE.Vector3(0,0,0);this.lastUpdate=-1;this.tdiff=0;this.handleEvent=function(b){if(typeof this[b.type]=="function")this[b.type](b)};this.keydown=function(b){if(!b.altKey){switch(b.keyCode){case 16:this.movementSpeedMultiplier=
0.1;break;case 87:this.moveState.forward=1;break;case 83:this.moveState.back=1;break;case 65:this.moveState.left=1;break;case 68:this.moveState.right=1;break;case 82:this.moveState.up=1;break;case 70:this.moveState.down=1;break;case 38:this.moveState.pitchUp=1;break;case 40:this.moveState.pitchDown=1;break;case 37:this.moveState.yawLeft=1;break;case 39:this.moveState.yawRight=1;break;case 81:this.moveState.rollLeft=1;break;case 69:this.moveState.rollRight=1}this.updateMovementVector();this.updateRotationVector()}};
this.keyup=function(b){switch(b.keyCode){case 16:this.movementSpeedMultiplier=1;break;case 87:this.moveState.forward=0;break;case 83:this.moveState.back=0;break;case 65:this.moveState.left=0;break;case 68:this.moveState.right=0;break;case 82:this.moveState.up=0;break;case 70:this.moveState.down=0;break;case 38:this.moveState.pitchUp=0;break;case 40:this.moveState.pitchDown=0;break;case 37:this.moveState.yawLeft=0;break;case 39:this.moveState.yawRight=0;break;case 81:this.moveState.rollLeft=0;break;
case 69:this.moveState.rollRight=0}this.updateMovementVector();this.updateRotationVector()};this.mousedown=function(b){b.preventDefault();b.stopPropagation();if(this.dragToLook)this.mouseStatus++;else switch(b.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}};this.mousemove=function(b){if(!this.dragToLook||this.mouseStatus>0){var c=this.getContainerDimensions(),f=c.size[0]/2,g=c.size[1]/2;this.moveState.yawLeft=-(b.clientX-c.offset[0]-f)/f;this.moveState.pitchDown=(b.clientY-
c.offset[1]-g)/g;this.updateRotationVector()}};this.mouseup=function(b){b.preventDefault();b.stopPropagation();if(this.dragToLook)this.mouseStatus--,this.moveState.yawLeft=this.moveState.pitchDown=0;else switch(b.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.updateRotationVector()};this.update=function(){var b=(new Date).getTime();if(this.lastUpdate==-1)this.lastUpdate=b;this.tdiff=(b-this.lastUpdate)/1E3;this.lastUpdate=b;var b=this.tdiff*this.movementSpeed,c=this.tdiff*
this.rollSpeed;this.translateX(this.moveVector.x*b);this.translateY(this.moveVector.y*b);this.translateZ(this.moveVector.z*b);this.tmpQuaternion.set(this.rotationVector.x*c,this.rotationVector.y*c,this.rotationVector.z*c,1).normalize();this.quaternion.multiplySelf(this.tmpQuaternion);this.matrix.setPosition(this.position);this.matrix.setRotationFromQuaternion(this.quaternion);this.matrixWorldNeedsUpdate=!0;this.supr.update.call(this)};this.updateMovementVector=function(){var b=this.moveState.forward||
this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right;this.moveVector.y=-this.moveState.down+this.moveState.up;this.moveVector.z=-b+this.moveState.back};this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp;this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft;this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft};this.getContainerDimensions=function(){return this.domElement!=
document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}};this.domElement.addEventListener("mousemove",c(this,this.mousemove),!1);this.domElement.addEventListener("mousedown",c(this,this.mousedown),!1);this.domElement.addEventListener("mouseup",c(this,this.mouseup),!1);window.addEventListener("keydown",c(this,this.keydown),!1);window.addEventListener("keyup",c(this,
this.keyup),!1);this.updateMovementVector();this.updateRotationVector()};THREE.FlyCamera.prototype=new THREE.Camera;THREE.FlyCamera.prototype.constructor=THREE.FlyCamera;THREE.FlyCamera.prototype.supr=THREE.Camera.prototype;
THREE.RollCamera=function(b,c,d,e){THREE.Camera.call(this,b,c,d,e);this.mouseLook=!0;this.autoForward=!1;this.rollSpeed=this.movementSpeed=this.lookSpeed=1;this.constrainVertical=[-0.9,0.9];this.domElement=document;this.matrixAutoUpdate=this.useTarget=!1;this.forward=new THREE.Vector3(0,0,1);this.roll=0;this.lastUpdate=-1;this.delta=0;var f=new THREE.Vector3,g=new THREE.Vector3,j=new THREE.Vector3,k=new THREE.Matrix4,m=!1,o=1,p=0,t=0,n=0,u=0,v=0,y=window.innerWidth/2,B=window.innerHeight/2;this.update=
function(){var b=(new Date).getTime();if(this.lastUpdate==-1)this.lastUpdate=b;this.delta=(b-this.lastUpdate)/1E3;this.lastUpdate=b;this.mouseLook&&(b=this.delta*this.lookSpeed,this.rotateHorizontally(b*u),this.rotateVertically(b*v));b=this.delta*this.movementSpeed;this.translateZ(b*(p>0||this.autoForward&&!(p<0)?1:p));this.translateX(b*t);this.translateY(b*n);m&&(this.roll+=this.rollSpeed*this.delta*o);if(this.forward.y>this.constrainVertical[1])this.forward.y=this.constrainVertical[1],this.forward.normalize();
else if(this.forward.y<this.constrainVertical[0])this.forward.y=this.constrainVertical[0],this.forward.normalize();j.copy(this.forward);g.set(0,1,0);f.cross(g,j).normalize();g.cross(j,f).normalize();this.matrix.n11=f.x;this.matrix.n12=g.x;this.matrix.n13=j.x;this.matrix.n21=f.y;this.matrix.n22=g.y;this.matrix.n23=j.y;this.matrix.n31=f.z;this.matrix.n32=g.z;this.matrix.n33=j.z;k.identity();k.n11=Math.cos(this.roll);k.n12=-Math.sin(this.roll);k.n21=Math.sin(this.roll);k.n22=Math.cos(this.roll);this.matrix.multiplySelf(k);
this.matrixWorldNeedsUpdate=!0;this.matrix.n14=this.position.x;this.matrix.n24=this.position.y;this.matrix.n34=this.position.z;this.supr.update.call(this)};this.translateX=function(b){this.position.x+=this.matrix.n11*b;this.position.y+=this.matrix.n21*b;this.position.z+=this.matrix.n31*b};this.translateY=function(b){this.position.x+=this.matrix.n12*b;this.position.y+=this.matrix.n22*b;this.position.z+=this.matrix.n32*b};this.translateZ=function(b){this.position.x-=this.matrix.n13*b;this.position.y-=
this.matrix.n23*b;this.position.z-=this.matrix.n33*b};this.rotateHorizontally=function(b){f.set(this.matrix.n11,this.matrix.n21,this.matrix.n31);f.multiplyScalar(b);this.forward.subSelf(f);this.forward.normalize()};this.rotateVertically=function(b){g.set(this.matrix.n12,this.matrix.n22,this.matrix.n32);g.multiplyScalar(b);this.forward.addSelf(g);this.forward.normalize()};this.domElement.addEventListener("contextmenu",function(b){b.preventDefault()},!1);this.domElement.addEventListener("mousemove",
function(b){u=(b.clientX-y)/window.innerWidth;v=(b.clientY-B)/window.innerHeight},!1);this.domElement.addEventListener("mousedown",function(b){b.preventDefault();b.stopPropagation();switch(b.button){case 0:p=1;break;case 2:p=-1}},!1);this.domElement.addEventListener("mouseup",function(b){b.preventDefault();b.stopPropagation();switch(b.button){case 0:p=0;break;case 2:p=0}},!1);this.domElement.addEventListener("keydown",function(b){switch(b.keyCode){case 38:case 87:p=1;break;case 37:case 65:t=-1;break;
case 40:case 83:p=-1;break;case 39:case 68:t=1;break;case 81:m=!0;o=1;break;case 69:m=!0;o=-1;break;case 82:n=1;break;case 70:n=-1}},!1);this.domElement.addEventListener("keyup",function(b){switch(b.keyCode){case 38:case 87:p=0;break;case 37:case 65:t=0;break;case 40:case 83:p=0;break;case 39:case 68:t=0;break;case 81:m=!1;break;case 69:m=!1;break;case 82:n=0;break;case 70:n=0}},!1)};THREE.RollCamera.prototype=new THREE.Camera;THREE.RollCamera.prototype.constructor=THREE.RollCamera;
THREE.RollCamera.prototype.supr=THREE.Camera.prototype;
THREE.TrackballCamera=function(b){function c(b,c){return function(){c.apply(b,arguments)}}b=b||{};THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.domElement=b.domElement||document;this.screen=b.screen||{width:window.innerWidth,height:window.innerHeight,offsetLeft:0,offsetTop:0};this.radius=b.radius||(this.screen.width+this.screen.height)/4;this.rotateSpeed=b.rotateSpeed||1;this.zoomSpeed=b.zoomSpeed||1.2;this.panSpeed=b.panSpeed||0.3;this.noZoom=b.noZoom||!1;this.noPan=b.noPan||
!1;this.staticMoving=b.staticMoving||!1;this.dynamicDampingFactor=b.dynamicDampingFactor||0.2;this.minDistance=b.minDistance||0;this.maxDistance=b.maxDistance||Infinity;this.keys=b.keys||[65,83,68];this.useTarget=!0;var d=!1,e=this.STATE.NONE,f=new THREE.Vector3,g=new THREE.Vector3,j=new THREE.Vector3,k=new THREE.Vector2,m=new THREE.Vector2,o=new THREE.Vector2,p=new THREE.Vector2;this.handleEvent=function(b){if(typeof this[b.type]=="function")this[b.type](b)};this.getMouseOnScreen=function(b,c){return new THREE.Vector2((b-
this.screen.offsetLeft)/this.radius*0.5,(c-this.screen.offsetTop)/this.radius*0.5)};this.getMouseProjectionOnBall=function(b,c){var d=new THREE.Vector3((b-this.screen.width*0.5-this.screen.offsetLeft)/this.radius,(this.screen.height*0.5+this.screen.offsetTop-c)/this.radius,0),e=d.length();e>1?d.normalize():d.z=Math.sqrt(1-e*e);f=this.position.clone().subSelf(this.target.position);e=this.up.clone().setLength(d.y);e.addSelf(this.up.clone().crossSelf(f).setLength(d.x));e.addSelf(f.setLength(d.z));return e};
this.rotateCamera=function(){var b=Math.acos(g.dot(j)/g.length()/j.length());if(b){var c=(new THREE.Vector3).cross(g,j).normalize(),d=new THREE.Quaternion;b*=this.rotateSpeed;d.setFromAxisAngle(c,-b);d.multiplyVector3(f);d.multiplyVector3(this.up);d.multiplyVector3(j);this.staticMoving?g=j:(d.setFromAxisAngle(c,b*(this.dynamicDampingFactor-1)),d.multiplyVector3(g))}};this.zoomCamera=function(){var b=1+(m.y-k.y)*this.zoomSpeed;b!==1&&b>0&&(f.multiplyScalar(b),this.staticMoving?k=m:k.y+=(m.y-k.y)*this.dynamicDampingFactor)};
this.panCamera=function(){var b=p.clone().subSelf(o);if(b.lengthSq()){b.multiplyScalar(f.length()*this.panSpeed);var c=f.clone().crossSelf(this.up).setLength(b.x);c.addSelf(this.up.clone().setLength(b.y));this.position.addSelf(c);this.target.position.addSelf(c);this.staticMoving?o=p:o.addSelf(b.sub(p,o).multiplyScalar(this.dynamicDampingFactor))}};this.checkDistances=function(){if(!this.noZoom||!this.noPan)this.position.lengthSq()>this.maxDistance*this.maxDistance&&this.position.setLength(this.maxDistance),
f.lengthSq()<this.minDistance*this.minDistance&&this.position.add(this.target.position,f.setLength(this.minDistance))};this.update=function(b,c,d){f=this.position.clone().subSelf(this.target.position);this.rotateCamera();this.noZoom||this.zoomCamera();this.noPan||this.panCamera();this.position.add(this.target.position,f);this.checkDistances();this.supr.update.call(this,b,c,d)};this.domElement.addEventListener("contextmenu",function(b){b.preventDefault()},!1);this.domElement.addEventListener("mousemove",
c(this,function(b){d&&(g=j=this.getMouseProjectionOnBall(b.clientX,b.clientY),k=m=this.getMouseOnScreen(b.clientX,b.clientY),o=p=this.getMouseOnScreen(b.clientX,b.clientY),d=!1);e!==this.STATE.NONE&&(e===this.STATE.ROTATE?j=this.getMouseProjectionOnBall(b.clientX,b.clientY):e===this.STATE.ZOOM&&!this.noZoom?m=this.getMouseOnScreen(b.clientX,b.clientY):e===this.STATE.PAN&&!this.noPan&&(p=this.getMouseOnScreen(b.clientX,b.clientY)))}),!1);this.domElement.addEventListener("mousedown",c(this,function(b){b.preventDefault();
b.stopPropagation();if(e===this.STATE.NONE)e=b.button,e===this.STATE.ROTATE?g=j=this.getMouseProjectionOnBall(b.clientX,b.clientY):e===this.STATE.ZOOM&&!this.noZoom?k=m=this.getMouseOnScreen(b.clientX,b.clientY):this.noPan||(o=p=this.getMouseOnScreen(b.clientX,b.clientY))}),!1);this.domElement.addEventListener("mouseup",c(this,function(b){b.preventDefault();b.stopPropagation();e=this.STATE.NONE}),!1);window.addEventListener("keydown",c(this,function(b){if(e===this.STATE.NONE){if(b.keyCode===this.keys[this.STATE.ROTATE])e=
this.STATE.ROTATE;else if(b.keyCode===this.keys[this.STATE.ZOOM]&&!this.noZoom)e=this.STATE.ZOOM;else if(b.keyCode===this.keys[this.STATE.PAN]&&!this.noPan)e=this.STATE.PAN;e!==this.STATE.NONE&&(d=!0)}}),!1);window.addEventListener("keyup",c(this,function(){if(e!==this.STATE.NONE)e=this.STATE.NONE}),!1)};THREE.TrackballCamera.prototype=new THREE.Camera;THREE.TrackballCamera.prototype.constructor=THREE.TrackballCamera;THREE.TrackballCamera.prototype.supr=THREE.Camera.prototype;
THREE.TrackballCamera.prototype.STATE={NONE:-1,ROTATE:0,ZOOM:1,PAN:2};
THREE.CubeGeometry=function(b,c,d,e,f,g,j,k,m){function o(b,c,d,j,k,m,n,o){var t,u,v=e||1,y=f||1,R=k/2,S=m/2,h=p.vertices.length;if(b=="x"&&c=="y"||b=="y"&&c=="x")t="z";else if(b=="x"&&c=="z"||b=="z"&&c=="x")t="y",y=g||1;else if(b=="z"&&c=="y"||b=="y"&&c=="z")t="x",v=g||1;var Q=v+1,L=y+1;k/=v;var N=m/y;for(u=0;u<L;u++)for(m=0;m<Q;m++){var T=new THREE.Vector3;T[b]=(m*k-R)*d;T[c]=(u*N-S)*j;T[t]=n;p.vertices.push(new THREE.Vertex(T))}for(u=0;u<y;u++)for(m=0;m<v;m++)p.faces.push(new THREE.Face4(m+Q*u+
h,m+Q*(u+1)+h,m+1+Q*(u+1)+h,m+1+Q*u+h,null,null,o)),p.faceVertexUvs[0].push([new THREE.UV(m/v,u/y),new THREE.UV(m/v,(u+1)/y),new THREE.UV((m+1)/v,(u+1)/y),new THREE.UV((m+1)/v,u/y)])}THREE.Geometry.call(this);var p=this,t=b/2,n=c/2,u=d/2,k=k?-1:1;if(j!==void 0)if(j instanceof Array)this.materials=j;else{this.materials=[];for(var v=0;v<6;v++)this.materials.push([j])}else this.materials=[];this.sides={px:!0,nx:!0,py:!0,ny:!0,pz:!0,nz:!0};if(m!=void 0)for(var y in m)this.sides[y]!=void 0&&(this.sides[y]=
m[y]);this.sides.px&&o("z","y",1*k,-1,d,c,-t,this.materials[0]);this.sides.nx&&o("z","y",-1*k,-1,d,c,t,this.materials[1]);this.sides.py&&o("x","z",1*k,1,b,d,n,this.materials[2]);this.sides.ny&&o("x","z",1*k,-1,b,d,-n,this.materials[3]);this.sides.pz&&o("x","y",1*k,-1,b,c,u,this.materials[4]);this.sides.nz&&o("x","y",-1*k,-1,b,c,-u,this.materials[5]);(function(){for(var b=[],c=[],d=0,e=p.vertices.length;d<e;d++){for(var g=p.vertices[d],f=!1,j=0,k=b.length;j<k;j++){var m=b[j];if(g.position.x==m.position.x&&
g.position.y==m.position.y&&g.position.z==m.position.z){c[d]=j;f=!0;break}}if(!f)c[d]=b.length,b.push(new THREE.Vertex(g.position.clone()))}d=0;for(e=p.faces.length;d<e;d++)g=p.faces[d],g.a=c[g.a],g.b=c[g.b],g.c=c[g.c],g.d=c[g.d];p.vertices=b})();this.computeCentroids();this.computeFaceNormals()};THREE.CubeGeometry.prototype=new THREE.Geometry;THREE.CubeGeometry.prototype.constructor=THREE.CubeGeometry;
THREE.CylinderGeometry=function(b,c,d,e,f,g){function j(b,c,d){k.vertices.push(new THREE.Vertex(new THREE.Vector3(b,c,d)))}THREE.Geometry.call(this);var k=this,m,o=Math.PI*2,p=e/2;for(m=0;m<b;m++)j(Math.sin(o*m/b)*c,Math.cos(o*m/b)*c,-p);for(m=0;m<b;m++)j(Math.sin(o*m/b)*d,Math.cos(o*m/b)*d,p);for(m=0;m<b;m++)k.faces.push(new THREE.Face4(m,m+b,b+(m+1)%b,(m+1)%b));if(d>0){j(0,0,-p-(g||0));for(m=b;m<b+b/2;m++)k.faces.push(new THREE.Face4(2*b,(2*m-2*b)%b,(2*m-2*b+1)%b,(2*m-2*b+2)%b))}if(c>0){j(0,0,p+
(f||0));for(m=b+b/2;m<2*b;m++)k.faces.push(new THREE.Face4(2*b+1,(2*m-2*b+2)%b+b,(2*m-2*b+1)%b+b,(2*m-2*b)%b+b))}m=0;for(b=this.faces.length;m<b;m++){var c=[],d=this.faces[m],f=this.vertices[d.a],g=this.vertices[d.b],p=this.vertices[d.c],t=this.vertices[d.d];c.push(new THREE.UV(0.5+Math.atan2(f.position.x,f.position.y)/o,0.5+f.position.z/e));c.push(new THREE.UV(0.5+Math.atan2(g.position.x,g.position.y)/o,0.5+g.position.z/e));c.push(new THREE.UV(0.5+Math.atan2(p.position.x,p.position.y)/o,0.5+p.position.z/
e));d instanceof THREE.Face4&&c.push(new THREE.UV(0.5+Math.atan2(t.position.x,t.position.y)/o,0.5+t.position.z/e));this.faceVertexUvs[0].push(c)}this.computeCentroids();this.computeFaceNormals()};THREE.CylinderGeometry.prototype=new THREE.Geometry;THREE.CylinderGeometry.prototype.constructor=THREE.CylinderGeometry;
THREE.IcosahedronGeometry=function(b){function c(b,c,d){var e=Math.sqrt(b*b+c*c+d*d);return f.vertices.push(new THREE.Vertex(new THREE.Vector3(b/e,c/e,d/e)))-1}function d(b,c,d,e){e.faces.push(new THREE.Face3(b,c,d))}function e(b,d){var e=f.vertices[b].position,g=f.vertices[d].position;return c((e.x+g.x)/2,(e.y+g.y)/2,(e.z+g.z)/2)}var f=this,g=new THREE.Geometry,j;this.subdivisions=b||0;THREE.Geometry.call(this);b=(1+Math.sqrt(5))/2;c(-1,b,0);c(1,b,0);c(-1,-b,0);c(1,-b,0);c(0,-1,b);c(0,1,b);c(0,-1,
-b);c(0,1,-b);c(b,0,-1);c(b,0,1);c(-b,0,-1);c(-b,0,1);d(0,11,5,g);d(0,5,1,g);d(0,1,7,g);d(0,7,10,g);d(0,10,11,g);d(1,5,9,g);d(5,11,4,g);d(11,10,2,g);d(10,7,6,g);d(7,1,8,g);d(3,9,4,g);d(3,4,2,g);d(3,2,6,g);d(3,6,8,g);d(3,8,9,g);d(4,9,5,g);d(2,4,11,g);d(6,2,10,g);d(8,6,7,g);d(9,8,1,g);for(b=0;b<this.subdivisions;b++){j=new THREE.Geometry;for(var k in g.faces){var m=e(g.faces[k].a,g.faces[k].b),o=e(g.faces[k].b,g.faces[k].c),p=e(g.faces[k].c,g.faces[k].a);d(g.faces[k].a,m,p,j);d(g.faces[k].b,o,m,j);
d(g.faces[k].c,p,o,j);d(m,o,p,j)}g.faces=j.faces}f.faces=g.faces;delete g;delete j;this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.IcosahedronGeometry.prototype=new THREE.Geometry;THREE.IcosahedronGeometry.prototype.constructor=THREE.IcosahedronGeometry;
THREE.LatheGeometry=function(b,c,d){THREE.Geometry.call(this);this.steps=c||12;this.angle=d||2*Math.PI;for(var c=this.angle/this.steps,d=[],e=[],f=[],g=[],j=(new THREE.Matrix4).setRotationZ(c),k=0;k<b.length;k++)this.vertices.push(new THREE.Vertex(b[k])),d[k]=b[k].clone(),e[k]=this.vertices.length-1;for(var m=0;m<=this.angle+0.001;m+=c){for(k=0;k<d.length;k++)m<this.angle?(d[k]=j.multiplyVector3(d[k].clone()),this.vertices.push(new THREE.Vertex(d[k])),f[k]=this.vertices.length-1):f=g;m==0&&(g=e);
for(k=0;k<e.length-1;k++)this.faces.push(new THREE.Face4(f[k],f[k+1],e[k+1],e[k])),this.faceVertexUvs[0].push([new THREE.UV(1-m/this.angle,k/b.length),new THREE.UV(1-m/this.angle,(k+1)/b.length),new THREE.UV(1-(m-c)/this.angle,(k+1)/b.length),new THREE.UV(1-(m-c)/this.angle,k/b.length)]);e=f;f=[]}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.LatheGeometry.prototype=new THREE.Geometry;THREE.LatheGeometry.prototype.constructor=THREE.LatheGeometry;
THREE.PlaneGeometry=function(b,c,d,e){THREE.Geometry.call(this);var f,g=b/2,j=c/2,d=d||1,e=e||1,k=d+1,m=e+1;b/=d;var o=c/e;for(f=0;f<m;f++)for(c=0;c<k;c++)this.vertices.push(new THREE.Vertex(new THREE.Vector3(c*b-g,-(f*o-j),0)));for(f=0;f<e;f++)for(c=0;c<d;c++)this.faces.push(new THREE.Face4(c+k*f,c+k*(f+1),c+1+k*(f+1),c+1+k*f)),this.faceVertexUvs[0].push([new THREE.UV(c/d,f/e),new THREE.UV(c/d,(f+1)/e),new THREE.UV((c+1)/d,(f+1)/e),new THREE.UV((c+1)/d,f/e)]);this.computeCentroids();this.computeFaceNormals()};
THREE.PlaneGeometry.prototype=new THREE.Geometry;THREE.PlaneGeometry.prototype.constructor=THREE.PlaneGeometry;
THREE.SphereGeometry=function(b,c,d){THREE.Geometry.call(this);for(var b=b||50,e,f=Math.PI,g=Math.max(3,c||8),j=Math.max(2,d||6),c=[],d=0;d<j+1;d++){e=d/j;var k=b*Math.cos(e*f),m=b*Math.sin(e*f),o=[],p=0;for(e=0;e<g;e++){var t=2*e/g,n=m*Math.sin(t*f),t=m*Math.cos(t*f);(d==0||d==j)&&e>0||(p=this.vertices.push(new THREE.Vertex(new THREE.Vector3(t,k,n)))-1);o.push(p)}c.push(o)}for(var u,v,y,f=c.length,d=0;d<f;d++)if(g=c[d].length,d>0)for(e=0;e<g;e++){o=e==g-1;j=c[d][o?0:e+1];k=c[d][o?g-1:e];m=c[d-1][o?
g-1:e];o=c[d-1][o?0:e+1];n=d/(f-1);u=(d-1)/(f-1);v=(e+1)/g;var t=e/g,p=new THREE.UV(1-v,n),n=new THREE.UV(1-t,n),t=new THREE.UV(1-t,u),B=new THREE.UV(1-v,u);d<c.length-1&&(u=this.vertices[j].position.clone(),v=this.vertices[k].position.clone(),y=this.vertices[m].position.clone(),u.normalize(),v.normalize(),y.normalize(),this.faces.push(new THREE.Face3(j,k,m,[new THREE.Vector3(u.x,u.y,u.z),new THREE.Vector3(v.x,v.y,v.z),new THREE.Vector3(y.x,y.y,y.z)])),this.faceVertexUvs[0].push([p,n,t]));d>1&&(u=
this.vertices[j].position.clone(),v=this.vertices[m].position.clone(),y=this.vertices[o].position.clone(),u.normalize(),v.normalize(),y.normalize(),this.faces.push(new THREE.Face3(j,m,o,[new THREE.Vector3(u.x,u.y,u.z),new THREE.Vector3(v.x,v.y,v.z),new THREE.Vector3(y.x,y.y,y.z)])),this.faceVertexUvs[0].push([p,t,B]))}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals();this.boundingSphere={radius:b}};THREE.SphereGeometry.prototype=new THREE.Geometry;
THREE.SphereGeometry.prototype.constructor=THREE.SphereGeometry;THREE.TextGeometry=function(b,c){THREE.Geometry.call(this);this.parameters=c||{};this.set(b)};THREE.TextGeometry.prototype=new THREE.Geometry;THREE.TextGeometry.prototype.constructor=THREE.TextGeometry;
THREE.TextGeometry.prototype.set=function(b,c){function d(b,c,d){v.vertices.push(new THREE.Vertex(new THREE.Vector3(b,c,d)))}function e(b,c,d,e){v.faces.push(new THREE.Face4(b,c,d,e))}this.text=b;var c=c||this.parameters,f=c.height!==void 0?c.height:50,g=c.curveSegments!==void 0?c.curveSegments:4,j=c.font!==void 0?c.font:"helvetiker",k=c.weight!==void 0?c.weight:"normal",m=c.style!==void 0?c.style:"normal",o=c.bezelThickness!==void 0?c.bezelThickness:10,p=c.bezelSize!==void 0?c.bezelSize:8,t=c.bezelEnabled!==
void 0?c.bezelEnabled:!1;THREE.FontUtils.size=c.size!==void 0?c.size:100;THREE.FontUtils.divisions=g;THREE.FontUtils.face=j;THREE.FontUtils.weight=k;THREE.FontUtils.style=m;THREE.FontUtils.bezelSize=p;var k=THREE.FontUtils.drawText(b),g=k.points,n=k.faces,j=k.contour,u=k.bezel,v=this;v.vertices=[];v.faces=[];for(var y,m=g.length,B=n.length,p=u.length,k=0;k<m;k++)y=g[k],d(y.x,y.y,0);for(k=0;k<m;k++)y=g[k],d(y.x,y.y,f);if(t){for(k=0;k<p;k++)y=u[k],d(y.x,y.y,o);for(k=0;k<p;k++)y=u[k],d(y.x,y.y,f-o)}for(k=
0;k<B;k++)f=n[k],v.faces.push(new THREE.Face3(f[2],f[1],f[0]));for(k=0;k<B;k++)f=n[k],v.faces.push(new THREE.Face3(f[0]+m,f[1]+m,f[2]+m));var z;if(t)for(k=u.length;--k>0;){if(z){if(z.equals(j[k])){z=null;continue}}else z=j[k];o=m*2+k;n=o-1;e(o,n,n+p,o+p);for(t=0;t<m;t++)if(g[t].equals(j[k]))break;for(f=0;f<m;f++)if(g[f].equals(j[k-1]))break;e(t,f,n,o);e(o+p,n+p,f+m,t+m)}else for(k=j.length;--k>0;){if(z){if(z.equals(j[k])){z=null;continue}}else z=j[k];for(t=0;t<m;t++)if(g[t].equals(j[k]))break;for(f=
0;f<m;f++)if(g[f].equals(j[k-1]))break;e(t,f,f+m,t+m)}this.computeCentroids();this.computeFaceNormals()};
THREE.FontUtils={faces:{},face:"helvetiker",weight:"normal",style:"normal",size:150,divisions:10,getFace:function(){return this.faces[this.face][this.weight][this.style]},loadFace:function(b){var c=b.familyName.toLowerCase();this.faces[c]=this.faces[c]||{};this.faces[c][b.cssFontWeight]=this.faces[c][b.cssFontWeight]||{};this.faces[c][b.cssFontWeight][b.cssFontStyle]=b;return this.faces[c][b.cssFontWeight][b.cssFontStyle]=b},extractPoints:function(b,c){if(b.length<3)return Fiesta.log("not valid polygon"),
{points:b,faces:[]};var d,e,f,g,j=[],k;for(k in c){b=c[k];g=[];for(d in b)e=b[d],g.push(e.x+","+e.y);var m,o;o=g.slice(1).indexOf(g[0]);var p=this.Triangulate.area(b.slice(0,o+1))<0;e=[];for(o=-1;o<g.length;){m=o+1;o=g[m];o=g.slice(m+1).indexOf(o)+m;if(o<=m)break;var t=b.slice(m,o+1);p?this.Triangulate.area(t)<0?(m>0&&j.push({shape:f,holes:e}),f=t,e=[]):e.push(t):this.Triangulate.area(t)<0?(j.push({shape:t,holes:e}),e=[]):e.push(t);o++}p&&j.push({shape:f,holes:e})}var n,u,v,y,B,z;g=[];for(k=0;k<j.length;k++){m=
j[k];f=m.shape;e=m.holes;for(p=0;p<e.length;p++){o=e[p];v=Number.POSITIVE_INFINITY;for(t=0;t<o.length;t++){B=o[t];for(d=0;d<f.length;d++)y=f[d],y=B.distanceTo(y),y<v&&(v=y,n=t,u=d)}d=u-1>=0?u-1:f.length-1;var t=n-1>=0?n-1:o.length-1,I=[];I.push(o[n]);I.push(f[u]);I.push(f[d]);v=this.Triangulate.area(I);var A=[];A.push(o[n]);A.push(o[t]);A.push(f[u]);B=this.Triangulate.area(A);y=u;z=n;u+=1;n+=-1;u<0&&(u+=f.length);u%=f.length;n<0&&(n+=o.length);n%=f.length;d=u-1>=0?u-1:f.length-1;t=n-1>=0?n-1:o.length-
1;I=[];I.push(o[n]);I.push(f[u]);I.push(f[d]);I=this.Triangulate.area(I);A=[];A.push(o[n]);A.push(o[t]);A.push(f[u]);A=this.Triangulate.area(A);v+B>I+A&&(u=y,n=z,u<0&&(u+=f.length),u%=f.length,n<0&&(n+=o.length),n%=f.length,d=u-1>=0?u-1:f.length-1,t=n-1>=0?n-1:o.length-1);v=f.slice(0,u);B=f.slice(u);y=o.slice(n);z=o.slice(0,n);g.push(o[n]);g.push(f[u]);g.push(f[d]);g.push(o[n]);g.push(o[t]);g.push(f[u]);f=v.concat(y).concat(z).concat(B)}m.shape=f}b=[];n=[];for(k=p=0;k<j.length;k++){m=j[k];f=m.shape;
b=b.concat(f);m=THREE.FontUtils.Triangulate(f,!0);for(u=0;u<m.length;u++)e=m[u],e[0]+=p,e[1]+=p,e[2]+=p;n=n.concat(m);p+=f.length}var G;for(u=0;u<g.length/3;u++){e=[];for(j=0;j<3;j++){k=!1;for(f=0;f<b.length&&!k;f++)G=u*3+j,b[f].equals(g[G])&&(e.push(f),k=!0);k||(b.push(g[G]),e.push(b.length-1),Fiesta.log("not found"))}n.push(e)}return{points:b,faces:n}},drawText:function(b){var c=[],d=[],e,f=this.getFace(),g=this.size/f.resolution,j=0;e=String(b).split("");for(var k=e.length,b=0;b<k;b++){var m=
this.extractGlyphPoints(e[b],f,g,j);j+=m.offset;c.push(m.points);d=d.concat(m.points)}b=j/2;for(e=0;e<d.length;e++)d[e].x-=b;c=this.extractPoints(d,c);c.contour=d;f=[];g=[];e=[];for(var j=[],k=new THREE.Vector2,o,b=d.length;--b>=0;){if(o){if(o.equals(d[b])){o=null;m=this.Triangulate.area(e)>0;j.push(m);g.push(k.divideScalar(e.length));e=[];k=new THREE.Vector2;continue}}else o=d[b];k.addSelf(d[b]);e.push(d[b])}b=d.length;e=0;for(var p;--b>=0;)m=d[b],k=g[e],m=m.clone().subSelf(k),p=this.bezelSize/m.length(),
j[e]?p+=1:p=1-p,p=m.multiplyScalar(p).addSelf(k),f.unshift(p),o?o.equals(d[b])&&(o=null,e++):o=d[b];c.bezel=f;return c},b2p0:function(b,c){var d=1-b;return d*d*c},b2p1:function(b,c){return 2*(1-b)*b*c},b2p2:function(b,c){return b*b*c},b2:function(b,c,d,e){return this.b2p0(b,c)+this.b2p1(b,d)+this.b2p2(b,e)},b3p0:function(b,c){var d=1-b;return d*d*d*c},b3p1:function(b,c){var d=1-b;return 3*d*d*b*c},b3p2:function(b,c){return 3*(1-b)*b*b*c},b3p3:function(b,c){return b*b*b*c},b3:function(b,c,d,e,f){return this.b3p0(b,
c)+this.b3p1(b,d)+this.b3p2(b,e)+this.b3p3(b,f)},extractGlyphPoints:function(b,c,d,e){var f=[],g,j,k,m,o,p,t,n,u,v,y=c.glyphs[b]||c.glyphs[ctxt.options.fallbackCharacter];if(y){if(y.o){c=y._cachedOutline||(y._cachedOutline=y.o.split(" "));k=c.length;for(b=0;b<k;)switch(j=c[b++],j){case "m":j=c[b++]*d+e;m=c[b++]*d;f.push(new THREE.Vector2(j,m));break;case "l":j=c[b++]*d+e;m=c[b++]*d;f.push(new THREE.Vector2(j,m));break;case "q":j=c[b++]*d+e;m=c[b++]*d;t=c[b++]*d+e;n=c[b++]*d;if(g=f[f.length-1]){o=
g.x;p=g.y;g=1;for(divisions=this.divisions;g<=divisions;g++){var B=g/divisions,z=THREE.FontUtils.b2(B,o,t,j),B=THREE.FontUtils.b2(B,p,n,m);f.push(new THREE.Vector2(z,B))}}break;case "b":if(j=c[b++]*d+e,m=c[b++]*d,t=c[b++]*d+e,n=c[b++]*-d,u=c[b++]*d+e,v=c[b++]*-d,g=f[f.length-1]){o=g.x;p=g.y;g=1;for(divisions=this.divisions;g<=divisions;g++)B=g/divisions,z=THREE.FontUtils.b3(B,o,t,u,j),B=THREE.FontUtils.b3(B,p,n,v,m),f.push(new THREE.Vector2(z,B))}}}return{offset:y.ha*d,points:f}}}};
(function(b){var c=function(b){for(var c=b.length,f=0,g=c-1,j=0;j<c;g=j++)f+=b[g].x*b[j].y-b[j].x*b[g].y;return f*0.5};b.Triangulate=function(b,e){var f=b.length;if(f<3)return null;var g=[],j=[],k=[],m,o,p;if(c(b)>0)for(o=0;o<f;o++)j[o]=o;else for(o=0;o<f;o++)j[o]=f-1-o;var t=2*f;for(o=f-1;f>2;){if(t--<=0){Fiesta.log("Warning, unable to triangulate polygon!");if(e)return k;return g}m=o;f<=m&&(m=0);o=m+1;f<=o&&(o=0);p=o+1;f<=p&&(p=0);var n;a:{n=b;var u=m,v=o,y=p,B=f,z=j,I=void 0,A=void 0,G=void 0,
F=void 0,C=void 0,M=void 0,J=void 0,O=void 0,w=void 0,A=n[z[u]].x,G=n[z[u]].y,F=n[z[v]].x,C=n[z[v]].y,M=n[z[y]].x,J=n[z[y]].y;if(1.0E-10>(F-A)*(J-G)-(C-G)*(M-A))n=!1;else{for(I=0;I<B;I++)if(!(I==u||I==v||I==y)){var O=n[z[I]].x,w=n[z[I]].y,W=void 0,R=void 0,S=void 0,h=void 0,Q=void 0,L=void 0,N=void 0,T=void 0,P=void 0,Y=void 0,V=void 0,Z=void 0,W=S=Q=void 0,W=M-F,R=J-C,S=A-M,h=G-J,Q=F-A,L=C-G,N=O-A,T=w-G,P=O-F,Y=w-C,V=O-M,Z=w-J,W=W*Y-R*P,Q=Q*T-L*N,S=S*Z-h*V;if(W>=0&&S>=0&&Q>=0){n=!1;break a}}n=!0}}if(n){t=
j[m];n=j[o];u=j[p];g.push(b[t]);g.push(b[n]);g.push(b[u]);k.push([j[m],j[o],j[p]]);m=o;for(p=o+1;p<f;m++,p++)j[m]=j[p];f--;t=2*f}}if(e)return k;return g};b.Triangulate.area=c;return b})(THREE.FontUtils);window._typeface_js={faces:THREE.FontUtils.faces,loadFace:THREE.FontUtils.loadFace};
THREE.TorusGeometry=function(b,c,d,e){THREE.Geometry.call(this);this.radius=b||100;this.tube=c||40;this.segmentsR=d||8;this.segmentsT=e||6;b=[];for(c=0;c<=this.segmentsR;++c)for(d=0;d<=this.segmentsT;++d){var e=d/this.segmentsT*2*Math.PI,f=c/this.segmentsR*2*Math.PI;this.vertices.push(new THREE.Vertex(new THREE.Vector3((this.radius+this.tube*Math.cos(f))*Math.cos(e),(this.radius+this.tube*Math.cos(f))*Math.sin(e),this.tube*Math.sin(f))));b.push([d/this.segmentsT,1-c/this.segmentsR])}for(c=1;c<=this.segmentsR;++c)for(d=
1;d<=this.segmentsT;++d){var e=(this.segmentsT+1)*c+d,f=(this.segmentsT+1)*c+d-1,g=(this.segmentsT+1)*(c-1)+d-1,j=(this.segmentsT+1)*(c-1)+d;this.faces.push(new THREE.Face4(e,f,g,j));this.faceVertexUvs[0].push([new THREE.UV(b[e][0],b[e][1]),new THREE.UV(b[f][0],b[f][1]),new THREE.UV(b[g][0],b[g][1]),new THREE.UV(b[j][0],b[j][1])])}delete b;this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.TorusGeometry.prototype=new THREE.Geometry;
THREE.TorusGeometry.prototype.constructor=THREE.TorusGeometry;
THREE.TorusKnotGeometry=function(b,c,d,e,f,g,j){function k(b,c,d,e,g,f){c=d/e*b;d=Math.cos(c);return new THREE.Vector3(g*(2+d)*0.5*Math.cos(b),g*(2+d)*Math.sin(b)*0.5,f*g*Math.sin(c)*0.5)}THREE.Geometry.call(this);this.radius=b||200;this.tube=c||40;this.segmentsR=d||64;this.segmentsT=e||8;this.p=f||2;this.q=g||3;this.heightScale=j||1;this.grid=Array(this.segmentsR);d=new THREE.Vector3;e=new THREE.Vector3;g=new THREE.Vector3;for(b=0;b<this.segmentsR;++b){this.grid[b]=Array(this.segmentsT);for(c=0;c<
this.segmentsT;++c){var m=b/this.segmentsR*2*this.p*Math.PI,j=c/this.segmentsT*2*Math.PI,f=k(m,j,this.q,this.p,this.radius,this.heightScale),m=k(m+0.01,j,this.q,this.p,this.radius,this.heightScale);d.x=m.x-f.x;d.y=m.y-f.y;d.z=m.z-f.z;e.x=m.x+f.x;e.y=m.y+f.y;e.z=m.z+f.z;g.cross(d,e);e.cross(g,d);g.normalize();e.normalize();m=-this.tube*Math.cos(j);j=this.tube*Math.sin(j);f.x+=m*e.x+j*g.x;f.y+=m*e.y+j*g.y;f.z+=m*e.z+j*g.z;this.grid[b][c]=this.vertices.push(new THREE.Vertex(new THREE.Vector3(f.x,f.y,
f.z)))-1}}for(b=0;b<this.segmentsR;++b)for(c=0;c<this.segmentsT;++c){var e=(b+1)%this.segmentsR,g=(c+1)%this.segmentsT,f=this.grid[b][c],d=this.grid[e][c],e=this.grid[e][g],g=this.grid[b][g],j=new THREE.UV(b/this.segmentsR,c/this.segmentsT),m=new THREE.UV((b+1)/this.segmentsR,c/this.segmentsT),o=new THREE.UV((b+1)/this.segmentsR,(c+1)/this.segmentsT),p=new THREE.UV(b/this.segmentsR,(c+1)/this.segmentsT);this.faces.push(new THREE.Face4(f,d,e,g));this.faceVertexUvs[0].push([j,m,o,p])}this.computeCentroids();
this.computeFaceNormals();this.computeVertexNormals()};THREE.TorusKnotGeometry.prototype=new THREE.Geometry;THREE.TorusKnotGeometry.prototype.constructor=THREE.TorusKnotGeometry;THREE.Loader=function(b){this.statusDomElement=(this.showStatus=b)?THREE.Loader.prototype.addStatusElement():null;this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){}};
THREE.Loader.prototype={addStatusElement:function(){var b=document.createElement("div");b.style.position="absolute";b.style.right="0px";b.style.top="0px";b.style.fontSize="0.8em";b.style.textAlign="left";b.style.background="rgba(0,0,0,0.25)";b.style.color="#fff";b.style.width="120px";b.style.padding="0.5em 0.5em 0.5em 0.5em";b.style.zIndex=1E3;b.innerHTML="Loading ...";return b},updateProgress:function(b){var c="Loaded ";c+=b.total?(100*b.loaded/b.total).toFixed(0)+"%":(b.loaded/1E3).toFixed(2)+" KB";
this.statusDomElement.innerHTML=c},extractUrlbase:function(b){b=b.split("/");b.pop();return b.join("/")},init_materials:function(b,c,d){b.materials=[];for(var e=0;e<c.length;++e)b.materials[e]=[THREE.Loader.prototype.createMaterial(c[e],d)]},createMaterial:function(b,c){function d(b){b=Math.log(b)/Math.LN2;return Math.floor(b)==b}function e(b,c){var e=new Image;e.onload=function(){if(!d(this.width)||!d(this.height)){var c=Math.pow(2,Math.round(Math.log(this.width)/Math.LN2)),e=Math.pow(2,Math.round(Math.log(this.height)/
Math.LN2));b.image.width=c;b.image.height=e;b.image.getContext("2d").drawImage(this,0,0,c,e)}else b.image=this;b.needsUpdate=!0};e.src=c}var f,g,j;f="MeshLambertMaterial";g={color:15658734,opacity:1,map:null,lightMap:null,wireframe:b.wireframe};b.shading&&(b.shading=="Phong"?f="MeshPhongMaterial":b.shading=="Basic"&&(f="MeshBasicMaterial"));if(b.blending)if(b.blending=="Additive")g.blending=THREE.AdditiveBlending;else if(b.blending=="Subtractive")g.blending=THREE.SubtractiveBlending;else if(b.blending==
"Multiply")g.blending=THREE.MultiplyBlending;if(b.transparent!==void 0||b.opacity<1)g.transparent=b.transparent;if(b.depthTest!==void 0)g.depthTest=b.depthTest;if(b.vertexColors!==void 0)if(b.vertexColors=="face")g.vertexColors=THREE.FaceColors;else if(b.vertexColors)g.vertexColors=THREE.VertexColors;if(b.mapDiffuse&&c){j=document.createElement("canvas");g.map=new THREE.Texture(j);g.map.sourceFile=b.mapDiffuse;if(b.mapDiffuseRepeat)g.map.repeat.set(b.mapDiffuseRepeat[0],b.mapDiffuseRepeat[1]),g.map.wrapS=
g.map.wrapT=THREE.RepeatWrapping;b.mapDiffuseOffset&&g.map.offset.set(b.mapDiffuseOffset[0],b.mapDiffuseOffset[1]);e(g.map,c+"/"+b.mapDiffuse)}else if(b.colorDiffuse)j=(b.colorDiffuse[0]*255<<16)+(b.colorDiffuse[1]*255<<8)+b.colorDiffuse[2]*255,g.color=j,g.opacity=b.transparency;else if(b.DbgColor)g.color=b.DbgColor;if(b.mapLight&&c){j=document.createElement("canvas");g.lightMap=new THREE.Texture(j);g.lightMap.sourceFile=b.mapLight;if(b.mapLightmapRepeat)g.lightMap.repeat.set(b.mapLightRepeat[0],
b.mapLightRepeat[1]),g.lightMap.wrapS=g.lightMap.wrapT=THREE.RepeatWrapping;b.mapLightmapOffset&&g.lightMap.offset.set(b.mapLightmapOffset[0],b.mapLightmapOffset[1]);e(g.lightMap,c+"/"+b.mapLightmap)}return new THREE[f](g)}};THREE.JSONLoader=function(b){THREE.Loader.call(this,b)};THREE.JSONLoader.prototype=new THREE.Loader;THREE.JSONLoader.prototype.constructor=THREE.JSONLoader;THREE.JSONLoader.prototype.supr=THREE.Loader.prototype;
THREE.JSONLoader.prototype.load=function(b){var c=this,d=b.model,e=b.callback,f=b.texture_path?b.texture_path:this.extractUrlbase(d),b=new Worker(d);b.onmessage=function(b){c.createModel(b.data,e,f);c.onLoadComplete()};this.onLoadStart();b.postMessage((new Date).getTime())};
THREE.JSONLoader.prototype.createModel=function(b,c,d){var e=new THREE.Geometry,f=b.scale!==void 0?1/b.scale:1;this.init_materials(e,b.materials,d);(function(c){if(b.version===void 0||b.version!=2)Fiesta.error("Deprecated file format.");else{var d,f,m,o,p,t,n,u,v,y,B,z,I,A,G=b.faces;t=b.vertices;var F=b.normals,C=b.colors,M=0;for(d=0;d<b.uvs.length;d++)b.uvs[d].length&&M++;for(d=0;d<M;d++)e.faceUvs[d]=[],e.faceVertexUvs[d]=[];o=0;for(p=t.length;o<p;)n=new THREE.Vertex,n.position.x=t[o++]*c,n.position.y=
t[o++]*c,n.position.z=t[o++]*c,e.vertices.push(n);o=0;for(p=G.length;o<p;){c=G[o++];t=c&1;m=c&2;d=c&4;f=c&8;u=c&16;n=c&32;y=c&64;c&=128;t?(B=new THREE.Face4,B.a=G[o++],B.b=G[o++],B.c=G[o++],B.d=G[o++],t=4):(B=new THREE.Face3,B.a=G[o++],B.b=G[o++],B.c=G[o++],t=3);if(m)m=G[o++],B.materials=e.materials[m];m=e.faces.length;if(d)for(d=0;d<M;d++)z=b.uvs[d],v=G[o++],A=z[v*2],v=z[v*2+1],e.faceUvs[d][m]=new THREE.UV(A,v);if(f)for(d=0;d<M;d++){z=b.uvs[d];I=[];for(f=0;f<t;f++)v=G[o++],A=z[v*2],v=z[v*2+1],I[f]=
new THREE.UV(A,v);e.faceVertexUvs[d][m]=I}if(u)u=G[o++]*3,f=new THREE.Vector3,f.x=F[u++],f.y=F[u++],f.z=F[u],B.normal=f;if(n)for(d=0;d<t;d++)u=G[o++]*3,f=new THREE.Vector3,f.x=F[u++],f.y=F[u++],f.z=F[u],B.vertexNormals.push(f);if(y)n=G[o++],n=new THREE.Color(C[n]),B.color=n;if(c)for(d=0;d<t;d++)n=G[o++],n=new THREE.Color(C[n]),B.vertexColors.push(n);e.faces.push(B)}}})(f);(function(){var c,d,f,m;if(b.skinWeights){c=0;for(d=b.skinWeights.length;c<d;c+=2)f=b.skinWeights[c],m=b.skinWeights[c+1],e.skinWeights.push(new THREE.Vector4(f,
m,0,0))}if(b.skinIndices){c=0;for(d=b.skinIndices.length;c<d;c+=2)f=b.skinIndices[c],m=b.skinIndices[c+1],e.skinIndices.push(new THREE.Vector4(f,m,0,0))}e.bones=b.bones;e.animation=b.animation})();(function(c){if(b.morphTargets!==void 0){var d,f,m,o,p,t,n,u,v;d=0;for(f=b.morphTargets.length;d<f;d++){e.morphTargets[d]={};e.morphTargets[d].name=b.morphTargets[d].name;e.morphTargets[d].vertices=[];u=e.morphTargets[d].vertices;v=b.morphTargets[d].vertices;m=0;for(o=v.length;m<o;m+=3)p=v[m]*c,t=v[m+1]*
c,n=v[m+2]*c,u.push(new THREE.Vertex(new THREE.Vector3(p,t,n)))}}if(b.morphColors!==void 0){d=0;for(f=b.morphColors.length;d<f;d++){e.morphColors[d]={};e.morphColors[d].name=b.morphColors[d].name;e.morphColors[d].colors=[];o=e.morphColors[d].colors;p=b.morphColors[d].colors;c=0;for(m=p.length;c<m;c+=3)t=new THREE.Color(16755200),t.setRGB(p[c],p[c+1],p[c+2]),o.push(t)}}})(f);(function(){if(b.edges!==void 0){var c,d,f;for(c=0;c<b.edges.length;c+=2)d=b.edges[c],f=b.edges[c+1],e.edges.push(new THREE.Edge(e.vertices[d],
e.vertices[f],d,f))}})();e.computeCentroids();e.computeFaceNormals();c(e)};THREE.BinaryLoader=function(b){THREE.Loader.call(this,b)};THREE.BinaryLoader.prototype=new THREE.Loader;THREE.BinaryLoader.prototype.constructor=THREE.BinaryLoader;THREE.BinaryLoader.prototype.supr=THREE.Loader.prototype;
THREE.BinaryLoader.prototype={load:function(b){var c=b.model,d=b.callback,e=b.texture_path?b.texture_path:THREE.Loader.prototype.extractUrlbase(c),f=b.bin_path?b.bin_path:THREE.Loader.prototype.extractUrlbase(c),b=(new Date).getTime(),c=new Worker(c),g=this.showProgress?THREE.Loader.prototype.updateProgress:null;c.onmessage=function(b){THREE.BinaryLoader.prototype.loadAjaxBuffers(b.data.buffers,b.data.materials,d,f,e,g)};c.onerror=function(b){alert("worker.onerror: "+b.message+"\n"+b.data);b.preventDefault()};
c.postMessage(b)},loadAjaxBuffers:function(b,c,d,e,f,g){var j=new XMLHttpRequest,k=e+"/"+b,m=0;j.onreadystatechange=function(){j.readyState==4?j.status==200||j.status==0?THREE.BinaryLoader.prototype.createBinModel(j.responseText,d,f,c):alert("Couldn't load ["+k+"] ["+j.status+"]"):j.readyState==3?g&&(m==0&&(m=j.getResponseHeader("Content-Length")),g({total:m,loaded:j.responseText.length})):j.readyState==2&&(m=j.getResponseHeader("Content-Length"))};j.open("GET",k,!0);j.overrideMimeType("text/plain; charset=x-user-defined");
j.setRequestHeader("Content-Type","text/plain");j.send(null)},createBinModel:function(b,c,d,e){var f=function(c){function d(b,c){var e=p(b,c),f=p(b,c+1),g=p(b,c+2),h=p(b,c+3),j=(h<<1&255|g>>7)-127;e|=(g&127)<<16|f<<8;if(e==0&&j==-127)return 0;return(1-2*(h>>7))*(1+e*Math.pow(2,-23))*Math.pow(2,j)}function f(b,c){var d=p(b,c),e=p(b,c+1),g=p(b,c+2);return(p(b,c+3)<<24)+(g<<16)+(e<<8)+d}function m(b,c){var d=p(b,c);return(p(b,c+1)<<8)+d}function o(b,c){var d=p(b,c);return d>127?d-256:d}function p(b,
c){return b.charCodeAt(c)&255}function t(c){var d,e,g;d=f(b,c);e=f(b,c+C);g=f(b,c+M);c=m(b,c+J);THREE.BinaryLoader.prototype.f3(z,d,e,g,c)}function n(c){var d,e,g,h,j,o;d=f(b,c);e=f(b,c+C);g=f(b,c+M);h=m(b,c+J);j=f(b,c+O);o=f(b,c+w);c=f(b,c+W);THREE.BinaryLoader.prototype.f3n(z,G,d,e,g,h,j,o,c)}function u(c){var d,e,g,j;d=f(b,c);e=f(b,c+R);g=f(b,c+S);j=f(b,c+h);c=m(b,c+Q);THREE.BinaryLoader.prototype.f4(z,d,e,g,j,c)}function v(c){var d,e,g,j,o,n,p,t;d=f(b,c);e=f(b,c+R);g=f(b,c+S);j=f(b,c+h);o=m(b,
c+Q);n=f(b,c+L);p=f(b,c+N);t=f(b,c+T);c=f(b,c+P);THREE.BinaryLoader.prototype.f4n(z,G,d,e,g,j,o,n,p,t,c)}function y(c){var d,e;d=f(b,c);e=f(b,c+Y);c=f(b,c+V);THREE.BinaryLoader.prototype.uv3(z.faceVertexUvs[0],F[d*2],F[d*2+1],F[e*2],F[e*2+1],F[c*2],F[c*2+1])}function B(c){var d,e,g;d=f(b,c);e=f(b,c+Z);g=f(b,c+U);c=f(b,c+ea);THREE.BinaryLoader.prototype.uv4(z.faceVertexUvs[0],F[d*2],F[d*2+1],F[e*2],F[e*2+1],F[g*2],F[g*2+1],F[c*2],F[c*2+1])}var z=this,I=0,A,G=[],F=[],C,M,J,O,w,W,R,S,h,Q,L,N,T,P,Y,V,
Z,U,ea,ia,D,H,$,ca,aa;THREE.Geometry.call(this);THREE.Loader.prototype.init_materials(z,e,c);A={signature:b.substr(I,8),header_bytes:p(b,I+8),vertex_coordinate_bytes:p(b,I+9),normal_coordinate_bytes:p(b,I+10),uv_coordinate_bytes:p(b,I+11),vertex_index_bytes:p(b,I+12),normal_index_bytes:p(b,I+13),uv_index_bytes:p(b,I+14),material_index_bytes:p(b,I+15),nvertices:f(b,I+16),nnormals:f(b,I+16+4),nuvs:f(b,I+16+8),ntri_flat:f(b,I+16+12),ntri_smooth:f(b,I+16+16),ntri_flat_uv:f(b,I+16+20),ntri_smooth_uv:f(b,
I+16+24),nquad_flat:f(b,I+16+28),nquad_smooth:f(b,I+16+32),nquad_flat_uv:f(b,I+16+36),nquad_smooth_uv:f(b,I+16+40)};I+=A.header_bytes;C=A.vertex_index_bytes;M=A.vertex_index_bytes*2;J=A.vertex_index_bytes*3;O=A.vertex_index_bytes*3+A.material_index_bytes;w=A.vertex_index_bytes*3+A.material_index_bytes+A.normal_index_bytes;W=A.vertex_index_bytes*3+A.material_index_bytes+A.normal_index_bytes*2;R=A.vertex_index_bytes;S=A.vertex_index_bytes*2;h=A.vertex_index_bytes*3;Q=A.vertex_index_bytes*4;L=A.vertex_index_bytes*
4+A.material_index_bytes;N=A.vertex_index_bytes*4+A.material_index_bytes+A.normal_index_bytes;T=A.vertex_index_bytes*4+A.material_index_bytes+A.normal_index_bytes*2;P=A.vertex_index_bytes*4+A.material_index_bytes+A.normal_index_bytes*3;Y=A.uv_index_bytes;V=A.uv_index_bytes*2;Z=A.uv_index_bytes;U=A.uv_index_bytes*2;ea=A.uv_index_bytes*3;c=A.vertex_index_bytes*3+A.material_index_bytes;aa=A.vertex_index_bytes*4+A.material_index_bytes;ia=A.ntri_flat*c;D=A.ntri_smooth*(c+A.normal_index_bytes*3);H=A.ntri_flat_uv*
(c+A.uv_index_bytes*3);$=A.ntri_smooth_uv*(c+A.normal_index_bytes*3+A.uv_index_bytes*3);ca=A.nquad_flat*aa;c=A.nquad_smooth*(aa+A.normal_index_bytes*4);aa=A.nquad_flat_uv*(aa+A.uv_index_bytes*4);I+=function(c){for(var e,f,g,h=A.vertex_coordinate_bytes*3,k=c+A.nvertices*h;c<k;c+=h)e=d(b,c),f=d(b,c+A.vertex_coordinate_bytes),g=d(b,c+A.vertex_coordinate_bytes*2),THREE.BinaryLoader.prototype.v(z,e,f,g);return A.nvertices*h}(I);I+=function(c){for(var d,e,f,g=A.normal_coordinate_bytes*3,h=c+A.nnormals*
g;c<h;c+=g)d=o(b,c),e=o(b,c+A.normal_coordinate_bytes),f=o(b,c+A.normal_coordinate_bytes*2),G.push(d/127,e/127,f/127);return A.nnormals*g}(I);I+=function(c){for(var e,f,g=A.uv_coordinate_bytes*2,h=c+A.nuvs*g;c<h;c+=g)e=d(b,c),f=d(b,c+A.uv_coordinate_bytes),F.push(e,f);return A.nuvs*g}(I);ia=I+ia;D=ia+D;H=D+H;$=H+$;ca=$+ca;c=ca+c;aa=c+aa;(function(b){var c,d=A.vertex_index_bytes*3+A.material_index_bytes,e=d+A.uv_index_bytes*3,f=b+A.ntri_flat_uv*e;for(c=b;c<f;c+=e)t(c),y(c+d);return f-b})(D);(function(b){var c,
d=A.vertex_index_bytes*3+A.material_index_bytes+A.normal_index_bytes*3,e=d+A.uv_index_bytes*3,f=b+A.ntri_smooth_uv*e;for(c=b;c<f;c+=e)n(c),y(c+d);return f-b})(H);(function(b){var c,d=A.vertex_index_bytes*4+A.material_index_bytes,e=d+A.uv_index_bytes*4,f=b+A.nquad_flat_uv*e;for(c=b;c<f;c+=e)u(c),B(c+d);return f-b})(c);(function(b){var c,d=A.vertex_index_bytes*4+A.material_index_bytes+A.normal_index_bytes*4,e=d+A.uv_index_bytes*4,f=b+A.nquad_smooth_uv*e;for(c=b;c<f;c+=e)v(c),B(c+d);return f-b})(aa);
(function(b){var c,d=A.vertex_index_bytes*3+A.material_index_bytes,e=b+A.ntri_flat*d;for(c=b;c<e;c+=d)t(c);return e-b})(I);(function(b){var c,d=A.vertex_index_bytes*3+A.material_index_bytes+A.normal_index_bytes*3,e=b+A.ntri_smooth*d;for(c=b;c<e;c+=d)n(c);return e-b})(ia);(function(b){var c,d=A.vertex_index_bytes*4+A.material_index_bytes,e=b+A.nquad_flat*d;for(c=b;c<e;c+=d)u(c);return e-b})($);(function(b){var c,d=A.vertex_index_bytes*4+A.material_index_bytes+A.normal_index_bytes*4,e=b+A.nquad_smooth*
d;for(c=b;c<e;c+=d)v(c);return e-b})(ca);this.computeCentroids();this.computeFaceNormals()};f.prototype=new THREE.Geometry;f.prototype.constructor=f;c(new f(d))},v:function(b,c,d,e){b.vertices.push(new THREE.Vertex(new THREE.Vector3(c,d,e)))},f3:function(b,c,d,e,f){b.faces.push(new THREE.Face3(c,d,e,null,null,b.materials[f]))},f4:function(b,c,d,e,f,g){b.faces.push(new THREE.Face4(c,d,e,f,null,null,b.materials[g]))},f3n:function(b,c,d,e,f,g,j,k,m){var g=b.materials[g],o=c[k*3],p=c[k*3+1],k=c[k*3+2],
t=c[m*3],n=c[m*3+1],m=c[m*3+2];b.faces.push(new THREE.Face3(d,e,f,[new THREE.Vector3(c[j*3],c[j*3+1],c[j*3+2]),new THREE.Vector3(o,p,k),new THREE.Vector3(t,n,m)],null,g))},f4n:function(b,c,d,e,f,g,j,k,m,o,p){var j=b.materials[j],t=c[m*3],n=c[m*3+1],m=c[m*3+2],u=c[o*3],v=c[o*3+1],o=c[o*3+2],y=c[p*3],B=c[p*3+1],p=c[p*3+2];b.faces.push(new THREE.Face4(d,e,f,g,[new THREE.Vector3(c[k*3],c[k*3+1],c[k*3+2]),new THREE.Vector3(t,n,m),new THREE.Vector3(u,v,o),new THREE.Vector3(y,B,p)],null,j))},uv3:function(b,
c,d,e,f,g,j){var k=[];k.push(new THREE.UV(c,d));k.push(new THREE.UV(e,f));k.push(new THREE.UV(g,j));b.push(k)},uv4:function(b,c,d,e,f,g,j,k,m){var o=[];o.push(new THREE.UV(c,d));o.push(new THREE.UV(e,f));o.push(new THREE.UV(g,j));o.push(new THREE.UV(k,m));b.push(o)}};THREE.SceneLoader=function(){this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){};this.callbackSync=function(){};this.callbackProgress=function(){}};
THREE.SceneLoader.prototype={load:function(b,c){var d=this,e=new Worker(b);e.postMessage(0);var f=THREE.Loader.prototype.extractUrlbase(b);e.onmessage=function(b){function e(b,c){return c=="relativeToHTML"?b:f+"/"+b}function k(){for(u in w.objects)if(!L.objects[u])if(I=w.objects[u],I.geometry!==void 0){if(C=L.geometries[I.geometry]){O=[];for(P=0;P<I.materials.length;P++)O[P]=L.materials[I.materials[P]];A=I.position;r=I.rotation;q=I.quaternion;s=I.scale;q=0;O.length==0&&(O[0]=new THREE.MeshFaceMaterial);
O.length>1&&(O=[new THREE.MeshFaceMaterial]);object=new THREE.Mesh(C,O);object.name=u;object.position.set(A[0],A[1],A[2]);q?(object.quaternion.set(q[0],q[1],q[2],q[3]),object.useQuaternion=!0):object.rotation.set(r[0],r[1],r[2]);object.scale.set(s[0],s[1],s[2]);object.visible=I.visible;L.scene.addObject(object);L.objects[u]=object;if(I.meshCollider){var b=THREE.CollisionUtils.MeshColliderWBox(object);L.scene.collisions.colliders.push(b)}if(I.castsShadow)b=new THREE.ShadowVolume(C),L.scene.addChild(b),
b.position=object.position,b.rotation=object.rotation,b.scale=object.scale;I.trigger&&I.trigger.toLowerCase()!="none"&&(b={type:I.trigger,object:I},L.triggers[object.name]=b)}}else A=I.position,r=I.rotation,q=I.quaternion,s=I.scale,q=0,object=new THREE.Object3D,object.name=u,object.position.set(A[0],A[1],A[2]),q?(object.quaternion.set(q[0],q[1],q[2],q[3]),object.useQuaternion=!0):object.rotation.set(r[0],r[1],r[2]),object.scale.set(s[0],s[1],s[2]),object.visible=I.visible!==void 0?I.visible:!1,L.scene.addObject(object),
L.objects[u]=object,L.empties[u]=object,I.trigger&&I.trigger.toLowerCase()!="none"&&(b={type:I.trigger,object:I},L.triggers[object.name]=b)}function m(b){return function(c){L.geometries[b]=c;k();R-=1;d.onLoadComplete();p()}}function o(b){return function(c){L.geometries[b]=c}}function p(){d.callbackProgress({totalModels:h,totalTextures:Q,loadedModels:h-R,loadedTextures:Q-S},L);d.onLoadProgress();R==0&&S==0&&c(L)}var t,n,u,v,y,B,z,I,A,G,F,C,M,J,O,w,W,R,S,h,Q,L;w=b.data;b=new THREE.BinaryLoader;W=new THREE.JSONLoader;
S=R=0;L={scene:new THREE.Scene,geometries:{},materials:{},textures:{},objects:{},cameras:{},lights:{},fogs:{},triggers:{},empties:{}};var N=!1;for(u in w.objects)if(I=w.objects[u],I.meshCollider){N=!0;break}if(N)L.scene.collisions=new THREE.CollisionSystem;if(w.transform){N=w.transform.position;G=w.transform.rotation;var T=w.transform.scale;N&&L.scene.position.set(N[0],N[1],N[2]);G&&L.scene.rotation.set(G[0],G[1],G[2]);T&&L.scene.scale.set(T[0],T[1],T[2]);(N||G||T)&&L.scene.updateMatrix()}N=function(){S-=
1;p();d.onLoadComplete()};for(y in w.cameras){G=w.cameras[y];if(G.type=="perspective")M=new THREE.Camera(G.fov,G.aspect,G.near,G.far);else if(G.type=="ortho")M=new THREE.Camera,M.projectionMatrix=THREE.Matrix4.makeOrtho(G.left,G.right,G.top,G.bottom,G.near,G.far);A=G.position;G=G.target;M.position.set(A[0],A[1],A[2]);M.target.position.set(G[0],G[1],G[2]);L.cameras[y]=M}for(v in w.lights){y=w.lights[v];M=y.color!==void 0?y.color:16777215;G=y.intensity!==void 0?y.intensity:1;if(y.type=="directional")A=
y.direction,light=new THREE.DirectionalLight(M,G),light.position.set(A[0],A[1],A[2]),light.position.normalize();else if(y.type=="point")A=y.position,light=new THREE.PointLight(M,G),light.position.set(A[0],A[1],A[2]);L.scene.addLight(light);L.lights[v]=light}for(B in w.fogs)v=w.fogs[B],v.type=="linear"?J=new THREE.Fog(0,v.near,v.far):v.type=="exp2"&&(J=new THREE.FogExp2(0,v.density)),G=v.color,J.color.setRGB(G[0],G[1],G[2]),L.fogs[B]=J;if(L.cameras&&w.defaults.camera)L.currentCamera=L.cameras[w.defaults.camera];
if(L.fogs&&w.defaults.fog)L.scene.fog=L.fogs[w.defaults.fog];G=w.defaults.bgcolor;L.bgColor=new THREE.Color;L.bgColor.setRGB(G[0],G[1],G[2]);L.bgColorAlpha=w.defaults.bgalpha;for(t in w.geometries)if(B=w.geometries[t],B.type=="bin_mesh"||B.type=="ascii_mesh")R+=1,d.onLoadStart();h=R;for(t in w.geometries)B=w.geometries[t],B.type=="cube"?(C=new THREE.CubeGeometry(B.width,B.height,B.depth,B.segmentsWidth,B.segmentsHeight,B.segmentsDepth,null,B.flipped,B.sides),L.geometries[t]=C):B.type=="plane"?(C=
new THREE.PlaneGeometry(B.width,B.height,B.segmentsWidth,B.segmentsHeight),L.geometries[t]=C):B.type=="sphere"?(C=new THREE.SphereGeometry(B.radius,B.segmentsWidth,B.segmentsHeight),L.geometries[t]=C):B.type=="cylinder"?(C=new THREE.CylinderGeometry(B.numSegs,B.topRad,B.botRad,B.height,B.topOffset,B.botOffset),L.geometries[t]=C):B.type=="torus"?(C=new THREE.TorusGeometry(B.radius,B.tube,B.segmentsR,B.segmentsT),L.geometries[t]=C):B.type=="icosahedron"?(C=new THREE.IcosahedronGeometry(B.subdivisions),
L.geometries[t]=C):B.type=="bin_mesh"?b.load({model:e(B.url,w.urlBaseType),callback:m(t)}):B.type=="ascii_mesh"?W.load({model:e(B.url,w.urlBaseType),callback:m(t)}):B.type=="embedded_mesh"&&(B=w.embeds[B.id])&&W.createModel(B,o(t),"");for(z in w.textures)if(t=w.textures[z],t.url instanceof Array){S+=t.url.length;for(b=0;b<t.url.length;b++)d.onLoadStart()}else S+=1,d.onLoadStart();Q=S;for(z in w.textures){t=w.textures[z];if(t.mapping!=void 0&&THREE[t.mapping]!=void 0)t.mapping=new THREE[t.mapping];
if(t.url instanceof Array){for(var b=[],P=0;P<t.url.length;P++)b[P]=e(t.url[P],w.urlBaseType);b=THREE.ImageUtils.loadTextureCube(b,t.mapping,N)}else{b=THREE.ImageUtils.loadTexture(e(t.url,w.urlBaseType),t.mapping,N);if(THREE[t.minFilter]!=void 0)b.minFilter=THREE[t.minFilter];if(THREE[t.magFilter]!=void 0)b.magFilter=THREE[t.magFilter];if(t.repeat)b.repeat.set(t.repeat[0],t.repeat[1]),b.wrapS=b.wrapT=THREE.RepeatWrapping}L.textures[z]=b}for(n in w.materials){z=w.materials[n];for(F in z.parameters)if(F==
"envMap"||F=="map"||F=="lightMap")z.parameters[F]=L.textures[z.parameters[F]];else if(F=="shading")z.parameters[F]=z.parameters[F]=="flat"?THREE.FlatShading:THREE.SmoothShading;else if(F=="blending")z.parameters[F]=THREE[z.parameters[F]]?THREE[z.parameters[F]]:THREE.NormalBlending;else if(F=="combine")z.parameters[F]=z.parameters[F]=="MixOperation"?THREE.MixOperation:THREE.MultiplyOperation;else if(F=="vertexColors")if(z.parameters[F]=="face")z.parameters[F]=THREE.FaceColors;else if(z.parameters[F])z.parameters[F]=
THREE.VertexColors;if(z.parameters.opacity!==void 0&&z.parameters.opacity<1)z.parameters.transparent=!0;z=new THREE[z.type](z.parameters);L.materials[n]=z}k();d.callbackSync(L)}}};
THREE.MarchingCubes=function(b,c){THREE.Object3D.call(this);this.materials=c instanceof Array?c:[c];this.init=function(b){this.isolation=80;this.size=b;this.size2=this.size*this.size;this.size3=this.size2*this.size;this.halfsize=this.size/2;this.delta=2/this.size;this.yd=this.size;this.zd=this.size2;this.field=new Float32Array(this.size3);this.normal_cache=new Float32Array(this.size3*3);this.vlist=new Float32Array(36);this.nlist=new Float32Array(36);this.firstDraw=!0;this.maxCount=4096;this.count=
0;this.hasNormal=this.hasPos=!1;this.positionArray=new Float32Array(this.maxCount*3);this.normalArray=new Float32Array(this.maxCount*3)};this.lerp=function(b,c,f){return b+(c-b)*f};this.VIntX=function(b,c,f,g,j,k,m,o,p,t){j=(j-p)/(t-p);p=this.normal_cache;c[g]=k+j*this.delta;c[g+1]=m;c[g+2]=o;f[g]=this.lerp(p[b],p[b+3],j);f[g+1]=this.lerp(p[b+1],p[b+4],j);f[g+2]=this.lerp(p[b+2],p[b+5],j)};this.VIntY=function(b,c,f,g,j,k,m,o,p,t){j=(j-p)/(t-p);p=this.normal_cache;c[g]=k;c[g+1]=m+j*this.delta;c[g+
2]=o;c=b+this.yd*3;f[g]=this.lerp(p[b],p[c],j);f[g+1]=this.lerp(p[b+1],p[c+1],j);f[g+2]=this.lerp(p[b+2],p[c+2],j)};this.VIntZ=function(b,c,f,g,j,k,m,o,p,t){j=(j-p)/(t-p);p=this.normal_cache;c[g]=k;c[g+1]=m;c[g+2]=o+j*this.delta;c=b+this.zd*3;f[g]=this.lerp(p[b],p[c],j);f[g+1]=this.lerp(p[b+1],p[c+1],j);f[g+2]=this.lerp(p[b+2],p[c+2],j)};this.compNorm=function(b){var c=b*3;this.normal_cache[c]==0&&(this.normal_cache[c]=this.field[b-1]-this.field[b+1],this.normal_cache[c+1]=this.field[b-this.yd]-this.field[b+
this.yd],this.normal_cache[c+2]=this.field[b-this.zd]-this.field[b+this.zd])};this.polygonize=function(b,c,f,g,j,k){var m=g+1,o=g+this.yd,p=g+this.zd,t=m+this.yd,n=m+this.zd,u=g+this.yd+this.zd,v=m+this.yd+this.zd,y=0,B=this.field[g],z=this.field[m],I=this.field[o],A=this.field[t],G=this.field[p],F=this.field[n],C=this.field[u],M=this.field[v];B<j&&(y|=1);z<j&&(y|=2);I<j&&(y|=8);A<j&&(y|=4);G<j&&(y|=16);F<j&&(y|=32);C<j&&(y|=128);M<j&&(y|=64);var J=THREE.edgeTable[y];if(J==0)return 0;var O=this.delta,
w=b+O,W=c+O,O=f+O;J&1&&(this.compNorm(g),this.compNorm(m),this.VIntX(g*3,this.vlist,this.nlist,0,j,b,c,f,B,z));J&2&&(this.compNorm(m),this.compNorm(t),this.VIntY(m*3,this.vlist,this.nlist,3,j,w,c,f,z,A));J&4&&(this.compNorm(o),this.compNorm(t),this.VIntX(o*3,this.vlist,this.nlist,6,j,b,W,f,I,A));J&8&&(this.compNorm(g),this.compNorm(o),this.VIntY(g*3,this.vlist,this.nlist,9,j,b,c,f,B,I));J&16&&(this.compNorm(p),this.compNorm(n),this.VIntX(p*3,this.vlist,this.nlist,12,j,b,c,O,G,F));J&32&&(this.compNorm(n),
this.compNorm(v),this.VIntY(n*3,this.vlist,this.nlist,15,j,w,c,O,F,M));J&64&&(this.compNorm(u),this.compNorm(v),this.VIntX(u*3,this.vlist,this.nlist,18,j,b,W,O,C,M));J&128&&(this.compNorm(p),this.compNorm(u),this.VIntY(p*3,this.vlist,this.nlist,21,j,b,c,O,G,C));J&256&&(this.compNorm(g),this.compNorm(p),this.VIntZ(g*3,this.vlist,this.nlist,24,j,b,c,f,B,G));J&512&&(this.compNorm(m),this.compNorm(n),this.VIntZ(m*3,this.vlist,this.nlist,27,j,w,c,f,z,F));J&1024&&(this.compNorm(t),this.compNorm(v),this.VIntZ(t*
3,this.vlist,this.nlist,30,j,w,W,f,A,M));J&2048&&(this.compNorm(o),this.compNorm(u),this.VIntZ(o*3,this.vlist,this.nlist,33,j,b,W,f,I,C));y<<=4;for(j=g=0;THREE.triTable[y+j]!=-1;)b=y+j,c=b+1,f=b+2,this.posnormtriv(this.vlist,this.nlist,3*THREE.triTable[b],3*THREE.triTable[c],3*THREE.triTable[f],k),j+=3,g++;return g};this.posnormtriv=function(b,c,f,g,j,k){var m=this.count*3;this.positionArray[m]=b[f];this.positionArray[m+1]=b[f+1];this.positionArray[m+2]=b[f+2];this.positionArray[m+3]=b[g];this.positionArray[m+
4]=b[g+1];this.positionArray[m+5]=b[g+2];this.positionArray[m+6]=b[j];this.positionArray[m+7]=b[j+1];this.positionArray[m+8]=b[j+2];this.normalArray[m]=c[f];this.normalArray[m+1]=c[f+1];this.normalArray[m+2]=c[f+2];this.normalArray[m+3]=c[g];this.normalArray[m+4]=c[g+1];this.normalArray[m+5]=c[g+2];this.normalArray[m+6]=c[j];this.normalArray[m+7]=c[j+1];this.normalArray[m+8]=c[j+2];this.hasNormal=this.hasPos=!0;this.count+=3;this.count>=this.maxCount-3&&k(this)};this.begin=function(){this.count=0;
this.hasNormal=this.hasPos=!1};this.end=function(b){if(this.count!=0){for(var c=this.count*3;c<this.positionArray.length;c++)this.positionArray[c]=0;b(this)}};this.addBall=function(b,c,f,g,j){var k=this.size*Math.sqrt(g/j),m=f*this.size,o=c*this.size,p=b*this.size,t=Math.floor(m-k);t<1&&(t=1);m=Math.floor(m+k);m>this.size-1&&(m=this.size-1);var n=Math.floor(o-k);n<1&&(n=1);o=Math.floor(o+k);o>this.size-1&&(o=this.size-1);var u=Math.floor(p-k);u<1&&(u=1);k=Math.floor(p+k);k>this.size-1&&(k=this.size-
1);for(var v,y,B,z,I,A;t<m;t++){p=this.size2*t;y=t/this.size-f;I=y*y;for(y=n;y<o;y++){B=p+this.size*y;v=y/this.size-c;A=v*v;for(v=u;v<k;v++)z=v/this.size-b,z=g/(1.0E-6+z*z+A+I)-j,z>0&&(this.field[B+v]+=z)}}};this.addPlaneX=function(b,c){var f,g,j,k,m,o=this.size,p=this.yd,t=this.zd,n=this.field,u=o*Math.sqrt(b/c);u>o&&(u=o);for(f=0;f<u;f++)if(g=f/o,g*=g,k=b/(1.0E-4+g)-c,k>0)for(g=0;g<o;g++){m=f+g*p;for(j=0;j<o;j++)n[t*j+m]+=k}};this.addPlaneY=function(b,c){var f,g,j,k,m,o,p=this.size,t=this.yd,n=
this.zd,u=this.field,v=p*Math.sqrt(b/c);v>p&&(v=p);for(g=0;g<v;g++)if(f=g/p,f*=f,k=b/(1.0E-4+f)-c,k>0){m=g*t;for(f=0;f<p;f++){o=m+f;for(j=0;j<p;j++)u[n*j+o]+=k}}};this.addPlaneZ=function(b,c){var f,g,j,k,m,o;size=this.size;yd=this.yd;zd=this.zd;field=this.field;dist=size*Math.sqrt(b/c);dist>size&&(dist=size);for(j=0;j<dist;j++)if(f=j/size,f*=f,k=b/(1.0E-4+f)-c,k>0){m=zd*j;for(g=0;g<size;g++){o=m+g*yd;for(f=0;f<size;f++)field[o+f]+=k}}};this.reset=function(){var b;for(b=0;b<this.size3;b++)this.normal_cache[b*
3]=0,this.field[b]=0};this.render=function(b){this.begin();var c,f,g,j,k,m,o,p,t,n=this.size-2;for(j=1;j<n;j++){t=this.size2*j;o=(j-this.halfsize)/this.halfsize;for(g=1;g<n;g++){p=t+this.size*g;m=(g-this.halfsize)/this.halfsize;for(f=1;f<n;f++)k=(f-this.halfsize)/this.halfsize,c=p+f,this.polygonize(k,m,o,c,this.isolation,b)}}this.end(b)};this.generateGeometry=function(){var b=0,c=new THREE.Geometry,f=[];this.render(function(g){var j,k,m,o,p,t,n,u;for(j=0;j<g.count;j++)n=j*3,p=n+1,u=n+2,k=g.positionArray[n],
m=g.positionArray[p],o=g.positionArray[u],t=new THREE.Vector3(k,m,o),k=g.normalArray[n],m=g.normalArray[p],o=g.normalArray[u],n=new THREE.Vector3(k,m,o),n.normalize(),p=new THREE.Vertex(t),c.vertices.push(p),f.push(n);nfaces=g.count/3;for(j=0;j<nfaces;j++)n=(b+j)*3,p=n+1,u=n+2,t=f[n],k=f[p],m=f[u],n=new THREE.Face3(n,p,u,[t,k,m]),c.faces.push(n);b+=nfaces;g.count=0});return c};this.init(b)};THREE.MarchingCubes.prototype=new THREE.Object3D;THREE.MarchingCubes.prototype.constructor=THREE.MarchingCubes;
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
THREE.Trident=function(b){function c(c){return new THREE.Mesh(new THREE.CylinderGeometry(30,0.1,b.length/20,b.length/5),new THREE.MeshBasicMaterial({color:c}))}function d(b,c){var d=new THREE.Geometry;d.vertices=[new THREE.Vertex,new THREE.Vertex(b)];return new THREE.Line(d,new THREE.LineBasicMaterial({color:c}))}THREE.Object3D.call(this);var e=Math.PI/2,f,b=b||THREE.Trident.defaultParams;if(b!==THREE.Trident.defaultParams)for(f in THREE.Trident.defaultParams)b.hasOwnProperty(f)||(b[f]=THREE.Trident.defaultParams[f]);
this.scale=new THREE.Vector3(b.scale,b.scale,b.scale);this.addChild(d(new THREE.Vector3(b.length,0,0),b.xAxisColor));this.addChild(d(new THREE.Vector3(0,b.length,0),b.yAxisColor));this.addChild(d(new THREE.Vector3(0,0,b.length),b.zAxisColor));if(b.showArrows)f=c(b.xAxisColor),f.rotation.y=-e,f.position.x=b.length,this.addChild(f),f=c(b.yAxisColor),f.rotation.x=e,f.position.y=b.length,this.addChild(f),f=c(b.zAxisColor),f.rotation.y=Math.PI,f.position.z=b.length,this.addChild(f)};
THREE.Trident.prototype=new THREE.Object3D;THREE.Trident.prototype.constructor=THREE.Trident;THREE.Trident.defaultParams={xAxisColor:16711680,yAxisColor:65280,zAxisColor:255,showArrows:!0,length:100,scale:1};THREE.PlaneCollider=function(b,c){this.point=b;this.normal=c};THREE.SphereCollider=function(b,c){this.center=b;this.radius=c;this.radiusSq=c*c};THREE.BoxCollider=function(b,c){this.min=b;this.max=c;this.dynamic=!0;this.normal=new THREE.Vector3};
THREE.MeshCollider=function(b,c){this.mesh=b;this.box=c;this.numFaces=this.mesh.geometry.faces.length;this.normal=new THREE.Vector3};THREE.CollisionSystem=function(){this.collisionNormal=new THREE.Vector3;this.colliders=[];this.hits=[]};THREE.Collisions=new THREE.CollisionSystem;THREE.CollisionSystem.prototype.merge=function(b){this.colliders=this.colliders.concat(b.colliders);this.hits=this.hits.concat(b.hits)};
THREE.CollisionSystem.prototype.rayCastAll=function(b){b.direction.normalize();this.hits.length=0;var c,d,e,f,g=0;c=0;for(d=this.colliders.length;c<d;c++)if(f=this.colliders[c],e=this.rayCast(b,f),e<Number.MAX_VALUE)f.distance=e,e>g?this.hits.push(f):this.hits.unshift(f),g=e;return this.hits};
THREE.CollisionSystem.prototype.rayCastNearest=function(b){var c=this.rayCastAll(b);if(c.length==0)return null;for(var d=0;c[d]instanceof THREE.MeshCollider;){var e=this.rayMesh(b,c[d]);if(e.dist<Number.MAX_VALUE){c[d].distance=e.dist;c[d].faceIndex=e.faceIndex;break}d++}if(d>c.length)return null;return c[d]};
THREE.CollisionSystem.prototype.rayCast=function(b,c){if(c instanceof THREE.PlaneCollider)return this.rayPlane(b,c);else if(c instanceof THREE.SphereCollider)return this.raySphere(b,c);else if(c instanceof THREE.BoxCollider)return this.rayBox(b,c);else if(c instanceof THREE.MeshCollider&&c.box)return this.rayBox(b,c.box)};
THREE.CollisionSystem.prototype.rayMesh=function(b,c){for(var d=this.makeRayLocal(b,c.mesh),e=Number.MAX_VALUE,f,g=0;g<c.numFaces;g++){var j=c.mesh.geometry.faces[g],k=c.mesh.geometry.vertices[j.a].position,m=c.mesh.geometry.vertices[j.b].position,o=c.mesh.geometry.vertices[j.c].position,p=j instanceof THREE.Face4?c.mesh.geometry.vertices[j.d].position:null;j instanceof THREE.Face3?(j=this.rayTriangle(d,k,m,o,e,this.collisionNormal),j<e&&(e=j,f=g,c.normal.copy(this.collisionNormal),c.normal.normalize())):
j instanceof THREE.Face4&&(j=this.rayTriangle(d,k,m,p,e,this.collisionNormal),j<e&&(e=j,f=g,c.normal.copy(this.collisionNormal),c.normal.normalize()),j=this.rayTriangle(d,m,o,p,e,this.collisionNormal),j<e&&(e=j,f=g,c.normal.copy(this.collisionNormal),c.normal.normalize()))}return{dist:e,faceIndex:f}};
THREE.CollisionSystem.prototype.rayTriangle=function(b,c,d,e,f,g){var j=THREE.CollisionSystem.__v1,k=THREE.CollisionSystem.__v2;g.set(0,0,0);j.sub(d,c);k.sub(e,d);g.cross(j,k);k=g.dot(b.direction);if(!(k<0))return Number.MAX_VALUE;j=g.dot(c)-g.dot(b.origin);if(!(j<=0))return Number.MAX_VALUE;if(!(j>=k*f))return Number.MAX_VALUE;j/=k;k=THREE.CollisionSystem.__v3;k.copy(b.direction);k.multiplyScalar(j);k.addSelf(b.origin);Math.abs(g.x)>Math.abs(g.y)?Math.abs(g.x)>Math.abs(g.z)?(b=k.y-c.y,g=d.y-c.y,
f=e.y-c.y,k=k.z-c.z,d=d.z-c.z,e=e.z-c.z):(b=k.x-c.x,g=d.x-c.x,f=e.x-c.x,k=k.y-c.y,d=d.y-c.y,e=e.y-c.y):Math.abs(g.y)>Math.abs(g.z)?(b=k.x-c.x,g=d.x-c.x,f=e.x-c.x,k=k.z-c.z,d=d.z-c.z,e=e.z-c.z):(b=k.x-c.x,g=d.x-c.x,f=e.x-c.x,k=k.y-c.y,d=d.y-c.y,e=e.y-c.y);c=g*e-d*f;if(c==0)return Number.MAX_VALUE;c=1/c;e=(b*e-k*f)*c;if(!(e>=0))return Number.MAX_VALUE;c*=g*k-d*b;if(!(c>=0))return Number.MAX_VALUE;if(!(1-e-c>=0))return Number.MAX_VALUE;return j};
THREE.CollisionSystem.prototype.makeRayLocal=function(b,c){var d=THREE.CollisionSystem.__m;THREE.Matrix4.makeInvert(c.matrixWorld,d);var e=THREE.CollisionSystem.__r;e.origin.copy(b.origin);e.direction.copy(b.direction);d.multiplyVector3(e.origin);d.rotateAxis(e.direction);e.direction.normalize();return e};
THREE.CollisionSystem.prototype.rayBox=function(b,c){var d;c.dynamic&&c.mesh&&c.mesh.matrixWorld?d=this.makeRayLocal(b,c.mesh):(d=THREE.CollisionSystem.__r,d.origin.copy(b.origin),d.direction.copy(b.direction));var e=0,f=0,g=0,j=0,k=0,m=0,o=!0;d.origin.x<c.min.x?(e=c.min.x-d.origin.x,e/=d.direction.x,o=!1,j=-1):d.origin.x>c.max.x&&(e=c.max.x-d.origin.x,e/=d.direction.x,o=!1,j=1);d.origin.y<c.min.y?(f=c.min.y-d.origin.y,f/=d.direction.y,o=!1,k=-1):d.origin.y>c.max.y&&(f=c.max.y-d.origin.y,f/=d.direction.y,
o=!1,k=1);d.origin.z<c.min.z?(g=c.min.z-d.origin.z,g/=d.direction.z,o=!1,m=-1):d.origin.z>c.max.z&&(g=c.max.z-d.origin.z,g/=d.direction.z,o=!1,m=1);if(o)return-1;o=0;f>e&&(o=1,e=f);g>e&&(o=2,e=g);switch(o){case 0:k=d.origin.y+d.direction.y*e;if(k<c.min.y||k>c.max.y)return Number.MAX_VALUE;d=d.origin.z+d.direction.z*e;if(d<c.min.z||d>c.max.z)return Number.MAX_VALUE;c.normal.set(j,0,0);break;case 1:j=d.origin.x+d.direction.x*e;if(j<c.min.x||j>c.max.x)return Number.MAX_VALUE;d=d.origin.z+d.direction.z*
e;if(d<c.min.z||d>c.max.z)return Number.MAX_VALUE;c.normal.set(0,k,0);break;case 2:j=d.origin.x+d.direction.x*e;if(j<c.min.x||j>c.max.x)return Number.MAX_VALUE;k=d.origin.y+d.direction.y*e;if(k<c.min.y||k>c.max.y)return Number.MAX_VALUE;c.normal.set(0,0,m)}return e};THREE.CollisionSystem.prototype.rayPlane=function(b,c){var d=b.direction.dot(c.normal),e=c.point.dot(c.normal);if(d<0)d=(e-b.origin.dot(c.normal))/d;else return Number.MAX_VALUE;return d>0?d:Number.MAX_VALUE};
THREE.CollisionSystem.prototype.raySphere=function(b,c){var d=c.center.clone().subSelf(b.origin);if(d.lengthSq<c.radiusSq)return-1;var e=d.dot(b.direction.clone());if(e<=0)return Number.MAX_VALUE;d=c.radiusSq-(d.lengthSq()-e*e);if(d>=0)return Math.abs(e)-Math.sqrt(d);return Number.MAX_VALUE};THREE.CollisionSystem.__v1=new THREE.Vector3;THREE.CollisionSystem.__v2=new THREE.Vector3;THREE.CollisionSystem.__v3=new THREE.Vector3;THREE.CollisionSystem.__nr=new THREE.Vector3;THREE.CollisionSystem.__m=new THREE.Matrix4;
THREE.CollisionSystem.__r=new THREE.Ray;THREE.CollisionUtils={};THREE.CollisionUtils.MeshOBB=function(b){b.geometry.computeBoundingBox();var c=b.geometry.boundingBox,d=new THREE.Vector3(c.x[0],c.y[0],c.z[0]),c=new THREE.Vector3(c.x[1],c.y[1],c.z[1]),d=new THREE.BoxCollider(d,c);d.mesh=b;return d};THREE.CollisionUtils.MeshAABB=function(b){var c=THREE.CollisionUtils.MeshOBB(b);c.min.addSelf(b.position);c.max.addSelf(b.position);c.dynamic=!1;return c};
THREE.CollisionUtils.MeshColliderWBox=function(b){return new THREE.MeshCollider(b,THREE.CollisionUtils.MeshOBB(b))};
if(THREE.WebGLRenderer)THREE.AnaglyphWebGLRenderer=function(b){THREE.WebGLRenderer.call(this,b);var c=this,d=this.setSize,e=this.render,f=new THREE.Camera,g=new THREE.Camera,j=new THREE.Matrix4,k=new THREE.Matrix4,m,o,p;f.useTarget=g.useTarget=!1;f.matrixAutoUpdate=g.matrixAutoUpdate=!1;var b={minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat},t=new THREE.WebGLRenderTarget(512,512,b),n=new THREE.WebGLRenderTarget(512,512,b),u=new THREE.Camera(53,1,1,1E4);u.position.z=
2;_material=new THREE.MeshShaderMaterial({uniforms:{mapLeft:{type:"t",value:0,texture:t},mapRight:{type:"t",value:1,texture:n}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D mapLeft;\nuniform sampler2D mapRight;\nvarying vec2 vUv;\nvoid main() {\nvec4 colorL, colorR;\nvec2 uv = vUv;\ncolorL = texture2D( mapLeft, uv );\ncolorR = texture2D( mapRight, uv );\ngl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;\n}"});
var v=new THREE.Scene;v.addObject(new THREE.Mesh(new THREE.PlaneGeometry(2,2),_material));this.setSize=function(b,e){d.call(c,b,e);t.width=b;t.height=e;n.width=b;n.height=e};this.render=function(b,d){d.update(null,!0);if(m!==d.aspect||o!==d.near||p!==d.fov){m=d.aspect;o=d.near;p=d.fov;var z=d.projectionMatrix.clone(),I=125/30*0.5,A=I*o/125,G=o*Math.tan(p*Math.PI/360),F;j.n14=I;k.n14=-I;I=-G*m+A;F=G*m+A;z.n11=2*o/(F-I);z.n13=(F+I)/(F-I);f.projectionMatrix=z.clone();I=-G*m-A;F=G*m-A;z.n11=2*o/(F-I);
z.n13=(F+I)/(F-I);g.projectionMatrix=z.clone()}f.matrix=d.matrixWorld.clone().multiplySelf(k);f.update(null,!0);f.position.copy(d.position);f.near=o;f.far=d.far;e.call(c,b,f,t,!0);g.matrix=d.matrixWorld.clone().multiplySelf(j);g.update(null,!0);g.position.copy(d.position);g.near=o;g.far=d.far;e.call(c,b,g,n,!0);e.call(c,v,u)}};
if(THREE.WebGLRenderer)THREE.CrosseyedWebGLRenderer=function(b){THREE.WebGLRenderer.call(this,b);this.autoClear=!1;var c=this,d=this.setSize,e=this.render,f,g,j=new THREE.Camera,k=new THREE.Camera;c.separation=10;if(b&&b.separation!==void 0)c.separation=b.separation;(new THREE.Camera(53,window.innerWidth/2/window.innerHeight,1,1E4)).position.z=-10;this.setSize=function(b,e){d.call(c,b,e);f=b/2;g=e};this.render=function(b,d){this.clear();j.fov=d.fov;j.aspect=0.5*d.aspect;j.near=d.near;j.far=d.far;
j.updateProjectionMatrix();j.position.copy(d.position);j.target.position.copy(d.target.position);j.translateX(c.separation);k.projectionMatrix=j.projectionMatrix;k.position.copy(d.position);k.target.position.copy(d.target.position);k.translateX(-c.separation);this.setViewport(0,0,f,g);e.call(c,b,j);this.setViewport(f,0,f,g);e.call(c,b,k,!1)}};/*	Fiesta.js stats
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Stats.js r6
var Stats=function(){function s(a,g,d){var f,c,e;for(c=0;c<30;c++)for(f=0;f<73;f++)e=(f+c*74)*4,a[e]=a[e+4],a[e+1]=a[e+5],a[e+2]=a[e+6];for(c=0;c<30;c++)e=(73+c*74)*4,c<g?(a[e]=b[d].bg.r,a[e+1]=b[d].bg.g,a[e+2]=b[d].bg.b):(a[e]=b[d].fg.r,a[e+1]=b[d].fg.g,a[e+2]=b[d].fg.b)}var r=0,t=2,g,u=0,j=(new Date).getTime(),F=j,v=j,l=0,w=1E3,x=0,k,d,a,m,y,n=0,z=1E3,A=0,f,c,o,B,p=0,C=1E3,D=0,h,i,q,E,b={fps:{bg:{r:16,g:16,b:48},fg:{r:0,g:255,b:255}},ms:{bg:{r:16,g:48,b:16},fg:{r:0,g:255,b:0}},mb:{bg:{r:48,g:16,
b:26},fg:{r:255,g:0,b:128}}};g=document.createElement("div");g.style.cursor="pointer";g.style.width="80px";g.style.opacity="0.9";g.style.zIndex="10001";g.addEventListener("click",function(){r++;r==t&&(r=0);k.style.display="none";f.style.display="none";h.style.display="none";switch(r){case 0:k.style.display="block";break;case 1:f.style.display="block";break;case 2:h.style.display="block"}},!1);k=document.createElement("div");k.style.backgroundColor="rgb("+Math.floor(b.fps.bg.r/2)+","+Math.floor(b.fps.bg.g/
2)+","+Math.floor(b.fps.bg.b/2)+")";k.style.padding="2px 0px 3px 0px";g.appendChild(k);d=document.createElement("div");d.style.fontFamily="Helvetica, Arial, sans-serif";d.style.textAlign="left";d.style.fontSize="9px";d.style.color="rgb("+b.fps.fg.r+","+b.fps.fg.g+","+b.fps.fg.b+")";d.style.margin="0px 0px 1px 3px";d.innerHTML='<span style="font-weight:bold">FPS</span>';k.appendChild(d);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";k.appendChild(a);
m=a.getContext("2d");m.fillStyle="rgb("+b.fps.bg.r+","+b.fps.bg.g+","+b.fps.bg.b+")";m.fillRect(0,0,a.width,a.height);y=m.getImageData(0,0,a.width,a.height);f=document.createElement("div");f.style.backgroundColor="rgb("+Math.floor(b.ms.bg.r/2)+","+Math.floor(b.ms.bg.g/2)+","+Math.floor(b.ms.bg.b/2)+")";f.style.padding="2px 0px 3px 0px";f.style.display="none";g.appendChild(f);c=document.createElement("div");c.style.fontFamily="Helvetica, Arial, sans-serif";c.style.textAlign="left";c.style.fontSize=
"9px";c.style.color="rgb("+b.ms.fg.r+","+b.ms.fg.g+","+b.ms.fg.b+")";c.style.margin="0px 0px 1px 3px";c.innerHTML='<span style="font-weight:bold">MS</span>';f.appendChild(c);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";f.appendChild(a);o=a.getContext("2d");o.fillStyle="rgb("+b.ms.bg.r+","+b.ms.bg.g+","+b.ms.bg.b+")";o.fillRect(0,0,a.width,a.height);B=o.getImageData(0,0,a.width,a.height);try{performance&&performance.memory&&performance.memory.totalJSHeapSize&&
(t=3)}catch(G){}h=document.createElement("div");h.style.backgroundColor="rgb("+Math.floor(b.mb.bg.r/2)+","+Math.floor(b.mb.bg.g/2)+","+Math.floor(b.mb.bg.b/2)+")";h.style.padding="2px 0px 3px 0px";h.style.display="none";g.appendChild(h);i=document.createElement("div");i.style.fontFamily="Helvetica, Arial, sans-serif";i.style.textAlign="left";i.style.fontSize="9px";i.style.color="rgb("+b.mb.fg.r+","+b.mb.fg.g+","+b.mb.fg.b+")";i.style.margin="0px 0px 1px 3px";i.innerHTML='<span style="font-weight:bold">MB</span>';
h.appendChild(i);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";h.appendChild(a);q=a.getContext("2d");q.fillStyle="#301010";q.fillRect(0,0,a.width,a.height);E=q.getImageData(0,0,a.width,a.height);return{domElement:g,update:function(){u++;j=(new Date).getTime();n=j-F;z=Math.min(z,n);A=Math.max(A,n);s(B.data,Math.min(30,30-n/200*30),"ms");c.innerHTML='<span style="font-weight:bold">'+n+" MS</span> ("+z+"-"+A+")";o.putImageData(B,0,0);F=j;if(j>
v+1E3){l=Math.round(u*1E3/(j-v));w=Math.min(w,l);x=Math.max(x,l);s(y.data,Math.min(30,30-l/100*30),"fps");d.innerHTML='<span style="font-weight:bold">'+l+" FPS</span> ("+w+"-"+x+")";m.putImageData(y,0,0);if(t==3)p=performance.memory.usedJSHeapSize*9.54E-7,C=Math.min(C,p),D=Math.max(D,p),s(E.data,Math.min(30,30-p/2),"mb"),i.innerHTML='<span style="font-weight:bold">'+Math.round(p)+" MB</span> ("+Math.round(C)+"-"+Math.round(D)+")",q.putImageData(E,0,0);v=j;u=0}}}};

// Show stats
Fiesta.showStats = function() {
	var stats = new Stats();
	stats.domElement.style.position = "absolute";
	stats.domElement.style.left = Fiesta.DEFAULT_STATS_LEFT_POSITION;
	stats.domElement.style.top = Fiesta.DEFAULT_STATS_UP_POSITION;
	document.body.appendChild(stats.domElement);
	setInterval(function() {
		stats.update();
	}, 1000 / 60);
	return stats.domElement;
};/*	Fiesta.js configs
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

// Graphics
Fiesta.DEFAULT_GRAPHIC_ORIGIN_X = Fiesta.DEFAULT_GRAPHIC_ORIGIN_X || 0;
Fiesta.DEFAULT_GRAPHIC_ORIGIN_Y = Fiesta.DEFAULT_GRAPHIC_ORIGIN_Y || 0;
Fiesta.DEFAULT_GRAPHIC_ORIGIN_Z = Fiesta.DEFAULT_GRAPHIC_ORIGIN_Z || 0;

// Sprites
Fiesta.DEFAULT_SPRITE_STARTING_INDEX = Fiesta.DEFAULT_SPRITE_STARTING_INDEX || 0;
Fiesta.DEFAULT_SPRITE_ANIMATE_SPEED = Fiesta.DEFAULT_SPRITE_ANIMATE_SPEED || 30;

// 3D graphics
Fiesta.DEFAULT_3D_MATERIAL = Fiesta.DEFAULT_3D_MATERIAL || new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
Fiesta.DEFAULT_BOX3D_SIZE = Fiesta.DEFAULT_BOX3D_SIZE || 0;

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
};/*	Fiesta.js misc. function
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Check value types
Fiesta.isNumber = function(n) { return (((typeof n === typeof 1.0) || (n instanceof Number)) && (!isNaN(n))) };
Fiesta.isInteger = function(i) { return ((Fiesta.isNumber(i)) && (Math.floor(i) === i)) };
Fiesta.isString = function(s) { return ((typeof s === typeof "") || (s instanceof String)) };
Fiesta.isBoolean = function(b) { return ((typeof b === typeof true) || (b instanceof Boolean)) };
Fiesta.isArray = function(a) { return a.constructor == Array };
Fiesta.isUndefined = function(u) { return u === void(0) };

// "Create" undefined (nicer-looking version of void())
Fiesta.makeUndefined = function() { return void(0) };

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
};/*	Fiesta.js browser detection
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Built on browser-detect
var _BrowserDetect = {
	init: function () {
		
		// Store data
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		
		// Clear old functions
		this.searchString = Fiesta.makeUndefined();
		this.searchVersion = Fiesta.makeUndefined();
		this.dataBrowser = Fiesta.makeUndefined();
		this.dataOS = Fiesta.makeUndefined();
		
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

// Get the current browser, version, OS
Fiesta.getBrowser = function() { return _BrowserDetect.browser };
Fiesta.getBrowserVersion = function() { return _BrowserDetect.version };
Fiesta.getOS = function() { return _BrowserDetect.OS };

// Get PPI
Fiesta.calculatePPI = function() {
	var ruler = document.createElement("div");
	ruler.style.width = "1in";
	document.body.appendChild(ruler);
	_BrowserDetect.ppi = parseInt(document.defaultView.getComputedStyle(ruler, null).getPropertyValue("width"));
	document.body.removeChild(ruler);
	return _BrowserDetect.ppi;
};
Fiesta.getPPI = function() { return _BrowserDetect.ppi || Fiesta.calculatePPI() };

// Does my browser support Fiesta?
Fiesta.checkSupport = function() {
	var canvas = !!document.createElement("canvas").getContext;
	var audio = !!document.createElement("audio").canPlayType;
	return (canvas && audio);
};

// Console logs, warnings, and errors
Fiesta.log = function(l) {
	if (Fiesta.SHOW_LOGS)
		console.log(l);
};
Fiesta.warn = function(w) {
	if (Fiesta.SHOW_WARNINGS)
		console.warn(w);
};
Fiesta.error = function(e) {
	if (Fiesta.SHOW_ERRORS)
		console.error(e);
};/*	Fiesta.js command binding
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

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
/*	Fiesta.js math
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Sign of a number
Fiesta.sign = function(d) {
	if (!Fiesta.isNumber(d))
		throw new TypeError("Cannot find sign of " + typeof d + " " + d);
	if (d > 0) return 1;
	if (d < 0) return -1;
	return 0;
}

// Wrap a value around (examples below are good examples)
Fiesta.wrap = function(min, max, value) {
	if (!Fiesta.isNumber(min)) throw new TypeError(min + " is not a valid minimum");
	if (!Fiesta.isNumber(max)) throw new TypeError(max + " is not a valid maximum");
	if (!Fiesta.isNumber(value)) throw new TypeError(value + " is not a valid value");
	if (min > max) throw new Error("Cannot wrap if the minimum (" + min + ") is greater than the maximum (" + max + ")");
	
	var diff = max - min;
	if (value > max)
		return Fiesta.wrap(min, max, value - diff);
	if (value < min)
		return Fiesta.wrap(min, max, value + diff);
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

/*	Fiesta.js base object
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.BaseObject = new Fiesta.Class({
	initialize: function() {}
});
/*	Fiesta.js entity
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Entity = new Fiesta.Class(Fiesta.BaseObject, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
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
		this._playground = Fiesta.makeUndefined();
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
/*	Fiesta.js locatable entity
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.LocatableEntity = new Fiesta.Class(Fiesta.Entity, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._x;
		this._y;
		this._z;
		
		this.setCoordinates(Fiesta.DEFAULT_X, Fiesta.DEFAULT_Y, Fiesta.DEFAULT_Z);
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
		if (!Fiesta.isUndefined(xCoord))
			this.setX(xCoord);
		if (!Fiesta.isUndefined(yCoord))
			this.setY(yCoord);
		if (!Fiesta.isUndefined(zCoord))
			this.setZ(zCoord);
	},
	addX: function(a) { this.setX(a + this.getX()) },
	addY: function(a) { this.setY(a + this.getY()) },
	addZ: function(a) { this.setZ(a + this.getZ()) }
	
});
/*	Fiesta.js physical entity
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.PhysicalEntity = new Fiesta.Class(Fiesta.LocatableEntity, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
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
					this.getY() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getZ() - (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getX() + (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getY() + (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2),
					this.getZ() + (Fiesta.BOUNDING_BOX_DEFAULT_DIMENSION / 2)
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
};/*	Fiesta.js graphic
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Graphic = new Fiesta.Class(Fiesta.BaseObject, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._originX;
		this._originY;
		this._originZ;
		this._boundingBox = [];
		this._boundingBoxChanged = true;
		
		this.setOrigin(Fiesta.DEFAULT_GRAPHIC_ORIGIN_X, Fiesta.DEFAULT_GRAPHIC_ORIGIN_Y, Fiesta.DEFAULT_GRAPHIC_ORIGIN_Z);
	},
	
	// Origin API
	getOriginX: function() { return this._originX; },
	getOriginY: function() { return this._originY; },
	getOriginZ: function() { return this._originZ; },
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
	setOriginZ: function(coord) {
		if (Fiesta.isNumber(coord)) {
			this._originZ = coord;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(coord + " is not a valid Z coordinate");
	},
	setOrigin: function(xCoord, yCoord, zCoord) {
		this.setOriginX(xCoord);
		this.setOriginY(yCoord);
		if (!Fiesta.isUndefined(zCoord)) this.setOriginZ(zCoord);
	},
	
	// "Abstract" functions
	getBoundingBox: function() { throw new Error("This graphic must know how to get a bounding box") }
	
});/*	Fiesta.js 2D graphic
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Graphic2D = new Fiesta.Class(Fiesta.Graphic, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
	},
	
	// "Abstract" draw function
	draw: function() { throw new Error("This 2D graphic must know how to draw itself") }
	
});/*	Fiesta.js 3D graphic
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Graphic3D = new Fiesta.Class(Fiesta.Graphic, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._threeModel;
		this._material;
		
		this.setMaterial(Fiesta.DEFAULT_3D_MATERIAL);
	},
	
	// Model API
	getThreeModel: function() { return this._threeModel },
	setThreeModel: function(m) {
		this._threeModel = m;
	},
	
	// Material API
	getMaterial: function() { return this._material },
	setMaterial: function(m) {
		this._material = m;	
	},
	setColor: function(c) {
		this._material = new THREE.MeshLambertMaterial({
			color: c
		});
	}
	
});/*	Fiesta.js sprite 2D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Sprite2D = new Fiesta.Class(Fiesta.Graphic2D, {
	
	// Constructor
	initialize: function() {
		this.callSuper();
		
		this._urls = [];
		this._currentIndex = Fiesta.DEFAULT_SPRITE_STARTING_INDEX;
		this._animateSpeed = Fiesta.DEFAULT_SPRITE_ANIMATE_SPEED;
		
		if (arguments)
			this.setURLs(arguments);
		this.setIndex(0);
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
		this._currentIndex += Fiesta.sign(this._animateSpeed);	// Forward/backwards animation
		if (this._currentIndex >= this._urls.length)
			this._currentIndex = 0;
		var me = this;	// I have to do this for the setTimeout
		if (this._animateSpeed > 0) {
			if (this._urls.length)
				this._boundingBoxChanged = true;
			setTimeout(function() { me.animate() }, Math.abs(this._animateSpeed));
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
		if (Fiesta.isNumber(a))
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
	draw: function(playground, xCoord, yCoord, zCoord) {
		if (!(playground instanceof Fiesta.Playground))
			throw new TypeError(playground + " is not a playground that I can draw sprites on");
		if (!Fiesta.isNumber(xCoord))
			throw new TypeError(xCoord + " is not a valid X coordinate");
		if (!Fiesta.isNumber(yCoord))
			throw new TypeError(yCoord + " is not a valid Y coordinate");
		var image = this.getImage();
		var spriteWidth = image.width;
		var spriteHeight = image.height;
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
/*	Fiesta.js box 3D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Box3D = new Fiesta.Class(Fiesta.Graphic3D, {
	
	// Constructor
	initialize: function(xSize, ySize, zSize) {
		this.callSuper();
		
		this._xSize;
		this._ySize;
		this._zSize;
		
		xSize = xSize || Fiesta.DEFAULT_BOX3D_SIZE;
		this.setSize(xSize, ySize, zSize);
		this.setThreeModel(new THREE.Mesh(
			new THREE.CubeGeometry(this._xSize, this._ySize, this._zSize),
			this.getMaterial()
		));
	},
	
	// Size API
	getXSize: function() { return this._xSize },
	getYSize: function() { return this._ySize },
	getZSize: function() { return this._zSize },
	getSize: function() { return [this._xSize, this._ySize, this._zSize] },
	setXSize: function(s) {
		if ((Fiesta.isNumber(s)) && (s >= 0)) {
			this._xSize = s;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(s + " is not a valid X size");
	},
	setYSize: function(s) {
		if ((Fiesta.isNumber(s)) && (s >= 0)) {
			this._ySize = s;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(s + " is not a valid Y size");
	},
	setZSize: function(s) {
		if ((Fiesta.isNumber(s)) && (s >= 0)) {
			this._zSize = s;
			this._boundingBoxChanged = true;
		}
		else
			throw new TypeError(s + " is not a valid Z size");
	},
	setSize: function(xSize, ySize, zSize) {
		if (Fiesta.isUndefined(ySize) && Fiesta.isUndefined(zSize)) {	// Only 1 size = cube
			this.setXSize(xSize);
			this.setYSize(xSize);
			this.setZSize(xSize);
		} else {	// All sizes assigned = rectangular prism
			this.setXSize(xSize);
			this.setYSize(ySize);
			this.setZSize(zSize);
		}
	},
	
	// Get my bounding box
	getBoundingBox: function() {
		if (this._boundingBoxChanged) {
			this._boundingBox = [
				-this.getOriginX(), -this.getOriginY(), -this.getOriginZ(),
				this.getXSize() - this.getOriginX(), this.getYSize() - this.getOriginY(), this.getZSize() - this.getOriginZ()
			];
			this._boundingBoxChanged = false;
		}
		return this._boundingBox;
	}
	
});/*	Fiesta.js camera 3D
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Camera3D = new Fiesta.Class(Fiesta.LocatableEntity, {
	
	// Constructor
	initialize: function() {
		this._viewAngle = 70;	// this is temporary
		this._aspect = 4 / 3;
		this._near = 1;
		this._far = 1000;
		
		this._threeCamera = new THREE.Camera(this._viewAngle, this._aspect, this._near, this._far);
		
		this.callSuper();
	},
	
	// THREE API
	getThreeCamera: function() { return this._threeCamera },
	
	// Position API
	setX: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this._threeCamera.position.x = coord;
		else
			throw new TypeError(coord + " is not a valid X coordinate for the camera");
	},
	setY: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this._threeCamera.position.y = coord;
		else
			throw new TypeError(coord + " is not a valid Y coordinate for the camera");
	},
	setZ: function(coord) {
		this.callSuper(coord);
		if (Fiesta.isNumber(coord))
			this._threeCamera.position.z = coord;
		else
			throw new TypeError(coord + " is not a valid Z coordinate for the camera");
	},
	setCoordinates: function(xCoord, yCoord, zCoord) {
		if (!Fiesta.isUndefined(xCoord))
			this.setX(xCoord);
		if (!Fiesta.isUndefined(yCoord))
			this.setY(yCoord);
		if (!Fiesta.isUndefined(zCoord))
			this.setZ(zCoord);
	},
	addX: function(a) { this.setX(a + this.getX()) },
	addY: function(a) { this.setY(a + this.getY()) },
	addZ: function(a) { this.setZ(a + this.getZ()) }
	
});/*	Fiesta.js playground
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Playground = new Fiesta.Class(Fiesta.BaseObject, {
	
	// Constructor
	initialize: function(theWidth, theHeight, theContext, framerate) {
		this._entities = [];
		
		this._width;
		this._height;
		this._backgroundColor;
		this._element;
		this._desiredFPS;
		this._context;
		this._redraw;
		this._timePlaced;
		
		this._threeRenderer;
		this._camera3D;
		this._threeScene;
		
		this.setWidth(theWidth || Fiesta.PLAYGROUND_DEFAULT_WIDTH);
		this.setHeight(theHeight || Fiesta.PLAYGROUND_DEFAULT_HEIGHT);
		this.setContext(theContext || Fiesta.PLAYGROUND_DEFAULT_CONTEXT);
		this.setDesiredFPS(framerate || Fiesta.PLAYGROUND_DEFAULT_FPS);
		this.setRedraw(Fiesta.PLAYGROUND_DEFAULT_REDRAW);
	},
	
	// Size API
	getWidth: function() { return this._width },
	getHeight: function() { return this._height },
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
	getDesiredFPS: function() { return this._desiredFPS },
	setDesiredFPS: function(f) {
		if ((Fiesta.isNumber(f)) && (f >= 0))
			this._desiredFPS = f;
		else
			throw new TypeError(f + " is not a valid desired FPS");
	},
	
	// Redraw API
	getRedraw: function() { return this._redraw },
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
		
		if (this._context === "2d") {
			this._element = document.createElement("canvas");
			this._element.style.overflow = "hidden";
			this._element.setAttribute("width", this._width);
			this._element.setAttribute("height", this._height);
		}
		
		if (this._context === "3d") {
			this._element = this._threeRenderer.domElement;
			this._threeRenderer.setSize(this._width, this._height);
		}
		
		this._element.setAttribute("class", "fiesta_playground");
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
		var context = c.toLowerCase();
		if ((Fiesta.isString(context)) && ((context === "2d") || (context === "3d"))) {
			if (context === "3d") {
				if (THREE) {
					this._threeRenderer = new THREE.WebGLRenderer();
					this._camera3D = new Fiesta.Camera3D();
					this._threeScene = new THREE.Scene();
					this._threeRenderer.setSize(this.getWidth(), this.getHeight());
				} else
					throw new Error("Cannot set context to 3D without three.js");
			}
			this._context = context;
		}
		else
			throw new Error(c + " is not a valid context");
	},
	getTimePlaced: function() { return this._timePlaced || false },
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
		if (object instanceof Fiesta.Entity) {
			this._entities.push(object);
			object._setPlayground(this);
			if (Fiesta.isNumber(x))
				object.setX(x);
			if (Fiesta.isNumber(y))
				object.setY(y);
			if (Fiesta.isNumber(z))
				object.setZ(z);
			object.onSpawn();
			if (this._context === "3d")
				this._threeScene.addChild(object.getGraphic().getThreeModel());
		}
		else
			throw new TypeError(object + " is not something that can be spawned");
	},
	destroy: function(object) {
		if (object instanceof Fiesta.Entity) {
			var location = this._entities.indexOf(object);
			if (location !== -1) {
				this._entities.splice(location, 1);
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
		var i = this._entities.length;
		while (i --) {
			if (this._entities[i] instanceof Fiesta.PhysicalEntity) {
				var bound = this._entities[i].getBoundingBox();
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
					objects.push(this._entities[i]);
				}
			}
		}
		if (objects.length === 0)
			return false;
		return objects;
	},
	
	// 3D API
	getCamera: function() { return this._camera3D },
	
	// Do this every frame
	frame: function() {
		
		// Prepare the next frame
		var thisObject = this;	// So the next statement works
		setTimeout(function() { thisObject.frame() }, 1000 / this.getDesiredFPS());
		
		// Redraw (if I should, of course)
		if (this.getRedraw() && (this._context === "2d"))
			this.getContext().clearRect(0, 0, this._width, this._height);
		
		// Deal with every object
		// The pieces are in try/catch blocks so that one object doesn't break
		// everything for everyone else
		var size = this._entities.length;	// This is for a bit later
		var i = size;
		while (i --) {
			
			// Assign a local object variable
			var obj = this._entities[i];
			
			// Draw 2D entities
			if (this._context === "2d") {
				try {
					if (obj instanceof Fiesta.LocatableEntity)
						obj.getGraphic().draw(this, obj.getX(), obj.getY(), obj.getZ());
				} catch (e) { Fiesta.error(e) }
			}
			
			// Render 3D
			if (this._context === "3d") {
				try {
					this._threeRenderer.render(this._threeScene, this._camera3D.getThreeCamera());
				} catch (e) { Fiesta.error(e) }
			}
			
			// Execute each object's onFrame event
			try {
				obj.onFrame();
			} catch (e) { Fiesta.error(e) }
			
			// Collisions
			try {
				if (obj instanceof Fiesta.PhysicalEntity) {
					var objBound = obj.getBoundingBox();
					for (var j = i + 1; j < size; j ++) {
						var obj2 = this._entities[j];
						if (obj2 instanceof Fiesta.PhysicalEntity) {
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