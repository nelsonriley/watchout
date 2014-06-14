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

// svg.append("circle")
//   .attr("r", 10)
//   .attr("class", "enemy")
//   .attr("cx", 20)
//   .attr("cy", 20);

var buildEnemies = function(n) {

  var enemies = [];
  for (var i = 0 ; i < n ; i++) {
    enemies.push(randomLocation());
  }
  return enemies;

};

var updateEnemies = function(data) {
  // Join new data with old elements, if any
  var enemies = svg.selectAll("circle")
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
    .attr("r", 10)
    .attr("class", "enemy")
    .attr("cx", function(d, i) {
      return d.x;
    })
    .attr("cy", function(d, i) {
      return d.y;
    });

};

updateEnemies(buildEnemies(enemyCount));
setInterval(function () {
  updateEnemies(buildEnemies(enemyCount));
}, 1000);



