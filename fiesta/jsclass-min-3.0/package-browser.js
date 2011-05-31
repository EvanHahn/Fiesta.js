(function(){var a=(typeof this.global==='object')?this.global:this;a.JS=a.JS||{};JS.ENV=a})();JS.Package=function(a){var b=JS.Package.OrderedSet;JS.Package._4(this);this._0=a;this._1=new b();this._5=new b();this._b=new b();this._c=new b();this._2={};this._6={}};(function(e){e.displayName='Package';e.toString=function(){return e.displayName};var m=e.OrderedSet=function(a,b){this._d=this.list=[];this._4={};if(!a)return;for(var c=0,d=a.length;c<d;c++)this.push(b?b(a[c]):a[c])};m.prototype.push=function(a){var b=(a.id!==undefined)?a.id:a,c=this._4;if(c.hasOwnProperty(b))return;c[b]=this._d.length;this._d.push(a)};e.ENV=JS.ENV;if((this.document||{}).getElementsByTagName){var n=document.getElementsByTagName('script')[0];e._l=(n.readyState!==undefined)}e.onerror=function(a){throw a};e._e=function(a){e.onerror(new Error(a));};var i=e.prototype;i.addDependency=function(a){this._5.push(a)};i.addSoftDependency=function(a){this._b.push(a)};i.addStylesheet=function(a){this._c.push(a)};i.addName=function(a){this._1.push(a);e.getFromCache(a).pkg=this};i.onload=function(a){this._f=a};i.on=function(a,b,c){if(this._6[a])return b.call(c);var d=this._2[a]=this._2[a]||[];d.push([b,c]);this.load()};i.fire=function(a){if(this._6[a])return false;this._6[a]=true;var b=this._2[a];if(!b)return true;delete this._2[a];for(var c=0,d=b.length;c<d;c++)b[c][0].call(b[c][1]);return true};i.isLoaded=function(a){if(!a&&this._7!==undefined)return this._7;var b=this._1.list,c=b.length,d,g;while(c--){d=b[c];g=e.getObject(d,this._g);if(g!==undefined)continue;if(a)return e._e('Expected package at '+this._0+' to define '+d);else return this._7=false}return this._7=true};i.load=function(){if(!this.fire('request'))return;var f=this._5.list.concat(this._b.list),j=f.length;e.when({load:f});e.when({complete:this._5.list},function(){e.when({complete:f,load:[this]},function(){this.fire('complete')},this);var b=this,c=function(a){b._g=a;if(b._f)b._f();b.isLoaded(true);b.fire('load')};if(this.isLoaded()){this.fire('download');return this.fire('load')}if(this._0===undefined)return e._e('No load path found for '+this._1.list[0]);typeof this._0==='function'?this._0(c):e.Loader.loadFile(this._0,c);if(!e.Loader.loadStyle)return;var d=this._c.list,g=d.length;while(g--)e.Loader.loadStyle(d[g]);this.fire('download')},this)};i.toString=function(){return'Package:'+this._1.list.join(',')};e.when=function(a,b,c){var d=[],g={},f,j,h;for(f in a){if(!a.hasOwnProperty(f))continue;g[f]=[];j=new e.OrderedSet(a[f]);h=j.list.length;while(h--)d.push([f,j.list[h],h])}var k=h=d.length;if(k===0)return b&&b.call(c,g);while(h--)(function(f){var l=e.getByName(f[1]);l.on(f[0],function(){g[f[0]][f[2]]=e.getObject(f[1],l._g);k-=1;if(k===0&&b)b.call(c,g)})})(d[h])};e._h=1;e._8={};e._9={};e._i=[];e._4=function(a){a.id=this._h;this._h+=1};e.getByPath=function(a){var b=a.toString();return this._8[b]=this._8[b]||new this(a)};e.getByName=function(a){if(typeof a!=='string')return a;var b=this.getFromCache(a);if(b.pkg)return b.pkg;var c=this._j(a);if(c)return c;var d=new this();d.addName(a);return d};e.remove=function(a){var b=this.getByName(a);delete this._9[a];delete this._8[b._0]};e.autoload=function(a,b){this._i.push([a,b])};e._j=function(d){var g=this._i,f=g.length,j,h,k;for(j=0;j<f;j++){h=g[j];if(!h[0].test(d))continue;k=h[1].from+'/'+d.replace(/([a-z])([A-Z])/g,function(a,b,c){return b+'_'+c}).replace(/\./g,'/').toLowerCase()+'.js';var l=new this(k);l.addName(d);if(k=h[1].require)l.addDependency(d.replace(h[0],k));return l}return null};e.getFromCache=function(a){return this._9[a]=this._9[a]||{}};e.getObject=function(a,b){if(typeof a!=='string')return undefined;var c=b?{}:this.getFromCache(a);if(c.obj!==undefined)return c.obj;var d=b||this.ENV,g=a.split('.'),f;while(f=g.shift())d=d&&d[f];if(b&&d===undefined)return this.getObject(a);return c.obj=d}})(JS.Package);JS.Package.DomLoader={usable:function(){return!!JS.Package.getObject('window.document.getElementsByTagName')},__FILE__:function(){var a=document.getElementsByTagName('script');return a[a.length-1].src},loadFile:function(c,d){if(typeof window.runtime==='object')window.runtime.trace('Loading '+c);if(window.console&&console.info)console.info('Loading '+c);var g=this,f=document.createElement('script');f.type='text/javascript';f.src=c;f.onload=f.onreadystatechange=function(){var a=f.readyState,b=f.status;if(!a||a==='loaded'||a==='complete'||(a===4&&b===200)){d();f.onload=f.onreadystatechange=g._k;f=null}};document.getElementsByTagName('head')[0].appendChild(f)},loadStyle:function(a){var b=document.createElement('link');b.rel='stylesheet';b.type='text/css';b.href=a;document.getElementsByTagName('head')[0].appendChild(b)},_k:function(){}};JS.Package.Loader=JS.Package.DomLoader;JS.Package.DSL={__FILE__:function(){return JS.Package.Loader.__FILE__()},pkg:function(a,b){var c=b?JS.Package.getByPath(b):JS.Package.getByName(a);c.addName(a);return new JS.Package.Description(c)},file:function(a){var b=JS.Package.getByPath(a);return new JS.Package.Description(b)},load:function(a,b){JS.Package.Loader.loadFile(a,b)},autoload:function(a,b){JS.Package.autoload(a,b)}};JS.Package.Description=function(a){this._a=a};(function(g){g._3=function(a,b){var c=b.length,a=this._a[a],d;for(d=0;d<c;d++)a.call(this._a,b[d]);return this};g.provides=function(){return this._3('addName',arguments)};g.requires=function(){return this._3('addDependency',arguments)};g.uses=function(){return this._3('addSoftDependency',arguments)};g.styling=function(){return this._3('addStylesheet',arguments)};g.setup=function(a){this._a.onload(a);return this}})(JS.Package.Description.prototype);JS.Package.DSL.loader=JS.Package.DSL.file;JS.Packages=function(a){a.call(JS.Package.DSL)};JS.require=function(){var b=[],c=0;while(typeof arguments[c]==='string'){b.push(arguments[c]);c+=1}var d=arguments[c],g=arguments[c+1];JS.Package.when({complete:b},function(a){if(!d)return;d.apply(g||null,a&&a.complete)})};