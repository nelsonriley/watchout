// start slingin' some d3 here.

var width = 500,
    height = 500,
    radius = 10,
    enemyCount = 20;

var randomLocation = function() {
  var spot = {};
  spot.x = Math.random()*(width-(2*radius))+radius;
  spot.y = Math.random()*(height-(2*radius))+radius;
  return spot;
};

// set up the board
var svg = d3.select(".gameboard").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

// set up the enemy data
var buildEnemies = function(n) {
  var enemies = [];
  for (var i = 0 ; i < n ; i++) {
    enemies.push(randomLocation());
  }
  return enemies;
};

// update enemy positions
var updateEnemies = function(data) {
  // Join new data with old elements, if any
  var enemies = svg.selectAll(".enemy")
    .data(data);

  // update
  enemies.transition().duration(900)
    .attr("cx", function(d, i) {
      return d.x;
    })
    .attr("cy", function(d, i) {
      return d.y;
    });

  // add new
  // elements with data but without dom node
  enemies.enter().append("circle")
    .attr("fill", "black")
    .attr("r", radius)
    .attr("class", "enemy")
    .attr("cx", function(d, i) {
      return d.x;
    })
    .attr("cy", function(d, i) {
      return d.y;
    });

};

// add player to board
svg.append("circle")
  .attr("fill", "orange")
  .attr("r", radius)
  .attr("class", "player")
  .attr("cx", 250)
  .attr("cy", 250);

// drag player
var dragPlayer = function(d , i) {
  // this is a plain html element
  d.x += d3.event.dx;
  d.y += d3.event.dy;
  d3.select(this).attr("cx", d.x).attr("cy", d.y);
};
var drag = d3.behavior.drag();
drag.on("drag", dragPlayer);

// attach drag listener to player
var player = svg.selectAll(".player");
player.call(drag);
player.data([{x: 250, y: 250}]);


// place enemies on the board
updateEnemies(buildEnemies(enemyCount));
setInterval(function () {
  updateEnemies(buildEnemies(enemyCount));
}, 1000);


// detect collisions
var collisionsEnabled = true;
var detectCollisions = function() {
  var player = svg.selectAll(".player");
  var enemies = svg.selectAll(".enemy");
  var threshold = radius*2;
  enemies.each(function(d , i) {
    var px = parseInt(player.attr("cx")); // player.data()[0].x;
    var py = parseInt(player.attr("cy"));
    var deltaX = px - parseInt(d3.select(this).attr("cx"));
    var deltaY = py - parseInt(d3.select(this).attr("cy"));
    var deltaDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    if( deltaDistance <= threshold ){
      if ( collisionsEnabled ) {
        collisionDetected();
        // turn off collision detection for half a second
        collisionsEnabled = false;
        setTimeout(function() { collisionsEnabled = true; }, 500);
      }
    }
  });
};
setInterval(detectCollisions, 10);

// adjust score
var highScore = 0;
var currentScore = 0;
var collisionCount = 0;
var highScoreD3 = d3.selectAll('.high span');
var currentScoreD3 = d3.selectAll('.current span');
var collisionCountD3 = d3.selectAll('.collisions span');

var collisionDetected = function() {
  collisionCount++;
  collisionCountD3.text(collisionCount);
  if(currentScore > highScore){
    highScore = currentScore;
    highScoreD3.text(highScore);
  }
  currentScore = 0;
  currentScoreD3.text(currentScore);
};

setInterval(function() {
  currentScore++;
  currentScoreD3.text(currentScore);
}, 300);





