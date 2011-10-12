(function() {
  /*
  
  	Fiesta.js, a JavaScript game library
  	http://github.com/EvanHahn/Fiesta.js/
  	Copyright (c) 2011 Evan Hahn
  
  	Fiesta.js is licensed under the MIT license. Check the LICENSE file for
  	more information.
  	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt
  
  */
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.Fiesta || (window.Fiesta = Object.create(null));
  /*
  	Fiesta.js misc. functions
  
  	Requires:
  		namespace.coffee
  */
  Fiesta.sign = function(x) {
    if (x > 0) {
      return 1;
    } else if (x < 0) {
      return -1;
    }
    return 0;
  };
  Fiesta.isString = function(s) {
    return (typeof s === 'string') || (s instanceof String);
  };
  Fiesta.isInternetExplorer = function() {
    return window.navigator.userAgent.indexOf('MSIE') !== -1;
  };
  /*
  	Fiesta.js events
  	Games are very event-driven; this file is SUPER IMPORTANT!
  
  	Requires:
  		namespace.coffee
  		types.coffee
  */
  Fiesta.addEvent = function(scope, name, fn) {
    if (Fiesta.isString(scope)) {
      fn = name;
      name = scope;
      scope = window;
    }
    scope._events || (scope._events = Object.create(null));
    scope._events[name] = scope._events[name] || [];
    return scope._events[name].push(fn);
  };
  Fiesta.fireEvent = function(scope, name, eventObject) {
    var fn, _i, _len, _ref, _results;
    if (Fiesta.isString(scope)) {
      eventObject = name;
      name = scope;
      scope = window;
    }
    if (scope._events && scope._events[name]) {
      _ref = scope._events[name];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        _results.push(fn(eventObject));
      }
      return _results;
    }
  };
  /*
  	Fiesta.js 3D vector
  
  	Requires:
  		namespace.coffee
  */
  Fiesta.Vector = (function() {
    function Vector(x, y, z) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
      this.z = z;
    }
    return Vector;
  })();
  /*
  	Fiesta.js boundary
  	Bounds determine the bounds of an entity. Most simple ones are boxes,
  	more complex ones can also exist.
  
  	Requires:
  		namespace.coffee
  		vector.coffee
  */
  Fiesta.Boundary = (function() {
    function Boundary(x1, y1, z1, x2, y2, z2) {
      if (x1 == null) {
        x1 = 0;
      }
      if (y1 == null) {
        y1 = 0;
      }
      if (z1 == null) {
        z1 = 0;
      }
      if (x2 == null) {
        x2 = 0;
      }
      if (!(y2 != null) && !(z2 != null)) {
        z2 = 0;
        y2 = x2;
        x2 = z1;
        z1 = 0;
      }
      this.position = new Fiesta.Vector(x1, y1, z1);
      this.size = new Fiesta.Vector(x2, y2, z2);
    }
    return Boundary;
  })();
  Fiesta.Boundary.checkCollision = function(a, aPosition, b, bPosition) {
    if (a instanceof Fiesta.Boundary && b instanceof Fiesta.Boundary) {
      return !(b.position.x + bPosition.x > a.size.x + aPosition.x || b.size.x + bPosition.x < a.position.x + aPosition.x || b.position.y + bPosition.y > a.size.x + aPosition.y || b.size.x + bPosition.y < a.position.y + aPosition.y || b.position.z + bPosition.z > a.size.z + aPosition.z || b.size.z + bPosition.z < a.position.z + aPosition.z);
    } else {
      return false;
    }
  };
  /*
  	Fiesta.js graphic
  	This is a graphic, which knows how to draw itself.
  
  	Requires:
  		namespace.coffee
  		vector.coffee
  		boundary.coffee
  */
  Fiesta.Graphic = (function() {
    function Graphic() {
      this.origin = new Fiesta.Vector;
    }
    return Graphic;
  })();
  /*
  	Fiesta.js box
  	Can be a square, rectangle, or 3D prism.
  
  	Requires:
  		namespace.coffee
  		graphic.coffee
  		boundary.coffee
  */
  Fiesta.Box = (function() {
    __extends(Box, Fiesta.Graphic);
    function Box(width, height, depth, fillStyle) {
      if (width == null) {
        width = 0;
      }
      if (height == null) {
        height = width;
      }
      if (depth == null) {
        depth = width;
      }
      this.fillStyle = fillStyle != null ? fillStyle : 'rgb(0, 0, 0)';
      Box.__super__.constructor.apply(this, arguments);
      if (Fiesta.isString(depth)) {
        this.fillStyle = depth;
        depth = 0;
      }
      this.size = new Fiesta.Vector(width, height);
      this.boundary = new Fiesta.Boundary(0, 0, 0, width, height, 0);
    }
    Box.prototype.draw = function(context, position) {
      context.fillStyle = this.fillStyle;
      return context.fillRect(position.x - this.origin.x, position.y - this.origin.y, this.size.x, this.size.y);
    };
    return Box;
  })();
  /*
  	Fiesta.js entity
  	This is an entity that represents most game objects.
  
  	Requires:
  		namespace.coffee
  		vector.coffee
  */
  Fiesta.Entity = (function() {
    function Entity() {
      this.position = new Fiesta.Vector(0, 0, 0);
      this.velocity = new Fiesta.Vector(0, 0, 0);
      this.acceleration = new Fiesta.Vector(0, 0, 0);
      this.friction = new Fiesta.Vector(0, 0, 0);
      this.lastPhysicsCalculation = new Date;
    }
    Entity.prototype.spawn = function(scene) {
      return scene.spawn(this);
    };
    Entity.prototype.calculatePhysics = function(lastTime) {
      var frictionX, frictionY, frictionZ, t;
      if (lastTime == null) {
        lastTime = this.lastPhysicsCalculation;
      }
      t = (new Date - lastTime) / 1000;
      this.velocity.x += this.acceleration.x * t;
      this.velocity.y += this.acceleration.y * t;
      this.velocity.z += this.acceleration.z * t;
      if (this.friction.x) {
        frictionX = this.friction.x;
        if (this.velocity.x < 0) {
          frictionX = -frictionX;
        }
        if (Math.abs(this.velocity.x > Math.abs(this.friction.x))) {
          this.velocity.x += frictionX * t;
        } else {
          this.velocity.x = 0;
        }
      }
      if (this.friction.y) {
        frictionY = this.friction.y;
        if (this.velocity.y < 0) {
          frictionY = -frictionY;
        }
        if (Math.abs(this.velocity.y > Math.abs(this.friction.y))) {
          this.velocity.y += frictionY * t;
        } else {
          this.velocity.y = 0;
        }
      }
      if (this.friction.z) {
        frictionZ = this.friction.z;
        if (this.velocity.z < 0) {
          frictionZ = -frictionZ;
        }
        if (Math.abs(this.velocity.z > Math.abs(this.friction.z))) {
          this.velocity.z += frictionZ * t;
        } else {
          this.velocity.z = 0;
        }
      }
      this.position.x += this.velocity.x * t;
      this.position.y += this.velocity.y * t;
      this.position.z += this.velocity.z * t;
      return this.lastPhysicsCalculation = new Date;
    };
    return Entity;
  })();
  Fiesta.Entity.collide = function(a, b) {
    var aMass, aMoves, bMass, bMoves, bOldV, distanceXSign, distanceYSign, distanceZSign, massRatio, massSum;
    aMass = a.mass || 1;
    bMass = b.mass || 1;
    massRatio = aMass / bMass;
    massSum = aMass + bMass;
    distanceXSign = Fiesta.sign(a.position.x - b.position.x);
    distanceYSign = Fiesta.sign(a.position.y - b.position.y);
    distanceZSign = Fiesta.sign(a.position.z - b.position.z);
    aMoves = (1 - (aMass / massSum)) || 0;
    bMoves = (1 - (bMass / massSum)) || 0;
    a.position.x += distanceXSign * aMoves;
    a.position.y += distanceYSign * aMoves;
    a.position.z += distanceZSign * aMoves;
    b.position.x -= distanceXSign * bMoves;
    b.position.y -= distanceYSign * bMoves;
    b.position.z -= distanceZSign * bMoves;
    bOldV = new Fiesta.Vector(b.velocity.x, b.velocity.y, b.velocity.z);
    b.velocity.x = (a.velocity.x * massRatio) || 0;
    b.velocity.y = (a.velocity.y * massRatio) || 0;
    b.velocity.z = (a.velocity.z * massRatio) || 0;
    a.velocity.x = (bOldV.x / massRatio) || 0;
    a.velocity.y = (bOldV.y / massRatio) || 0;
    a.velocity.z = (bOldV.z / massRatio) || 0;
    Fiesta.fireEvent(a, 'collide', b);
    return Fiesta.fireEvent(b, 'collide', a);
  };
  /*
  	Fiesta.js scenes
  	Scenes are where games happen. Each level could be a different scene.
  
  	Requires:
  		namespace.coffee
  		vector.coffee
  */
  Fiesta.Scene = (function() {
    function Scene(width, height, context, targetFramerate) {
      if (width == null) {
        width = 400;
      }
      if (height == null) {
        height = 300;
      }
      this.context = context != null ? context : '2d';
      this.targetFramerate = targetFramerate != null ? targetFramerate : 60;
      this.size = new Fiesta.Vector(width, height);
      this.entities = [];
    }
    Scene.prototype.place = function(parentElement) {
      if (parentElement == null) {
        parentElement = window.document.body;
      }
      if (this.context === '2d') {
        this.domElement = window.document.createElement('canvas');
        this.domElement.style.overflow = 'hidden';
        this.domElement.setAttribute('width', this.size.x);
        this.domElement.setAttribute('height', this.size.y);
      } else if (this.context === '3d') {
        throw new Error('3D not finished');
      } else {
        throw new Error('Context not assigned properly');
      }
      parentElement.appendChild(this.domElement);
      return this.frame();
    };
    Scene.prototype.spawn = function(entity) {
      this.entities.push(entity);
      return Fiesta.fireEvent(entity, 'spawn');
    };
    Scene.prototype.canvasContext = function() {
      return this.domElement.getContext(this.context);
    };
    Scene.prototype.frame = function() {
      var boundary1, boundary2, entity, entity2, i, j, size, thisObject, _results;
      thisObject = this;
      setTimeout((function() {
        return thisObject.frame();
      }), 1000 / this.targetFramerate);
      if (this.context === '2d') {
        this.canvasContext().clearRect(0, 0, this.size.x, this.size.y);
      }
      size = this.entities.length;
      i = 0;
      _results = [];
      while (i < size) {
        entity = this.entities[i];
        entity.calculatePhysics();
        Fiesta.fireEvent(entity, 'frame');
        if (this.context === '2d' && (entity.graphic != null) && (entity.graphic.draw != null)) {
          entity.graphic.draw(this.canvasContext(), entity.position);
        }
        j = 0;
        while (j < i) {
          entity2 = this.entities[j];
          boundary1 = entity.boundary;
          if (entity.graphic) {
            boundary1 = entity.boundary || entity.graphic.boundary;
          }
          boundary2 = entity.boundary;
          if (entity2.graphic) {
            boundary2 = entity2.boundary || entity2.graphic.boundary;
          }
          if (Fiesta.Boundary.checkCollision(boundary1, entity.position, boundary2, entity2.position)) {
            Fiesta.Entity.collide(entity, entity2);
          }
          j += 1;
        }
        _results.push(i += 1);
      }
      return _results;
    };
    return Scene;
  })();
}).call(this);
