  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var A = window.Asteroids;

  A.MovingObject = function (options) {

    this.pos = options.pos || [0,0];
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.orientation = options.orientation || (2*Math.PI * Math.random())
    // this.orientation = options.orientation || 0;
    if (options.rotation === undefined) {
      options.rotation = Math.random() / 5;
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
    if (radii === undefined) {
      radii = [];
      for (var i = 0; i < 10; i++) {
        radii.push(Math.random() + 0.5)
      }
    }
    var vertices = [];
    var xPos = this.pos[0];
    var yPos = this.pos[1];
    var ori = this.orientation

    var point = function(radMult, rotAdd) {
      return [xPos + radMult * this.radius * Math.cos(ori + rotAdd * Math.PI/5),
        yPos + radMult * this.radius * Math.sin(ori + rotAdd * Math.PI/5), radMult]
    }.bind(this);
    vertices.push(point(radii.shift(),0));
    vertices.push(point(radii.shift(),1));
    vertices.push(point(radii.shift(),2));
    vertices.push(point(radii.shift(),3));
    vertices.push(point(radii.shift(),4));
    vertices.push(point(radii.shift(),5));
    vertices.push(point(radii.shift(),6));
    vertices.push(point(radii.shift(),7));
    vertices.push(point(radii.shift(),8));
    vertices.push(point(radii.shift(),9));
    vertices.push(point(radii.shift(),10));

    return vertices;
  }

  A.MovingObject.prototype.wrap = function(){
    if(this.pos[0] > window.innerWidth + 25){
      this.pos[0] = 0;
    }
    if(this.pos[1] > window.innerHeight + 25){
      this.pos[1] = 0;
    }
    if(this.pos[0] < -50){
      this.pos[0] = window.innerWidth;
    }
    if(this.pos[1] < -50){
      this.pos[1] = window.innerHeight;
    }
  };

  A.MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.orientation += this.rotation;
    this.movePoints();
    this.wrap();
  };
