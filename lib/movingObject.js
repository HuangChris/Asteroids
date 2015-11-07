  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var A = window.Asteroids;

  A.MovingObject = function (options) {

    this.pos = options.pos || [0,0];
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.orientation = options.orientation || (2 * Math.PI * Math.random())
    // this.orientation = options.orientation || 0;
    // 0 is falsey
    if (options.rotation === undefined) {
      options.rotation = (Math.random() - 0.5) / 3;
    }
    this.rotation = options.rotation;
  };

  // var whatever = MovingObject.prototype;

  A.MovingObject.prototype.draw = function (ctx) {
    // ctx.strokeStyle = this.color;
    // ctx.beginPath();
    //
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // // ctx.fill();
    // ctx.stroke();

    //Probably makes more sense to put that back, and move this to asteroid?
    //or just move this, and make one for bullet specifically.
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.points[0][0], this.points[0][1]);
    this.points.slice(1).forEach(function(point) {
      ctx.lineTo(point[0],point[1]);
    })
    ctx.lineTo(this.points[0][0], this.points[0][1]);
    ctx.stroke();
  };

  A.MovingObject.prototype.movePoints = function() {
    if(this.points === undefined) {
      this.points = this.createVertices();
    } else {
      var radii = this.points.map(function(point){return point[2]})
      this.points = this.createVertices(radii)
    }
  }

  A.MovingObject.prototype.createVertices = function(radii) {
    var POINT_COUNT = 11;
    if (radii === undefined || radii.length === 0) {
      radii = [];
      for (var i = 0; i < POINT_COUNT; i++) {
        radii.push(1.0 * Math.random() + 0.5)
      }
    }

    var vertices = [];
    var xPos = this.pos[0];
    var yPos = this.pos[1];
    var ori = this.orientation

    var point = function(radMult, rotAdd) {
      return [xPos + radMult * this.radius
        * Math.cos(ori + rotAdd * 4 * Math.PI / Math.floor(POINT_COUNT)),
        yPos + radMult * this.radius
        * Math.sin(ori + rotAdd *  4 * Math.PI / Math.floor(POINT_COUNT)), radMult]
    }.bind(this);
    // 11
    for (var i = 0; i < POINT_COUNT / 2; i ++) {
      vertices.push(point(radii.shift(), i))
      vertices.push(point(radii.shift(), i))
    }
    if (vertices.length === 0){ debugger; }
    return vertices;
  }

  A.MovingObject.prototype.wrap = function(){
    var wrapped = false;
    if(this.pos[0] > window.innerWidth + 25){
      this.pos[0] = 0;
      wrapped = true;
    }
    if(this.pos[1] > window.innerHeight + 25){
      this.pos[1] = 0;
      wrapped = true;
    }
    if(this.pos[0] < -25){
      this.pos[0] = window.innerWidth;
      wrapped = true;
    }
    if(this.pos[1] < -25){
      this.pos[1] = window.innerHeight;
      wrapped = true;
    }
    return wrapped;
  };

  A.MovingObject.prototype.move = function (caller) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.orientation += this.rotation;
    this.movePoints();
    this.wrap(caller);
  };
