// start slingin' some d3 here.

var width = 500,
    height = 500,
    radius = 10,
    enemyCount = 30;

var randomLocation = function() {
  var spot = {};
  spot.x = Math.random()*(width-(2*radius))+radius;
  spot.y = Math.random()*(height-(2*radius))+radius;
  return spot;
};

var svg = d3.select(".gameboard").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");



var buildEnemies = function(n) {

  var enemies = [];
  for (var i = 0 ; i < n ; i++) {
    enemies.push(randomLocation());
  }
  return enemies;

};

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
    .attr("r", 10)
    .attr("class", "enemy")
    .attr("cx", function(d, i) {
      return d.x;
    })
    .attr("cy", function(d, i) {
      return d.y;
    });

};

svg.append("circle")
  .attr("fill", "orange")
  .attr("r", 10)
  .attr("class", "player")
  .attr("cx", 250)
  .attr("cy", 250);


var dragPlayer = function(d , i) {
  // this is a plain html element
  d.x += d3.event.dx;
  d.y += d3.event.dy;
  d3.select(this).attr("cx", d.x).attr("cy", d.y);
};

var drag = d3.behavior.drag();

drag.on("drag", dragPlayer);

var player = svg.selectAll(".player");

player.call(drag);
player.data([{x: 250, y: 250}]);


updateEnemies(buildEnemies(enemyCount));
setInterval(function () {
  updateEnemies(buildEnemies(enemyCount));
}, 1000);



