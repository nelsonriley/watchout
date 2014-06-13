// start slingin' some d3 here.

var width = 500,
    height = 500,
    radius = 10;

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
    enemies.push(i);
  }
  return enemies;

};

var updateEnemies = function(data) {
  var enemies = svg.selectAll("circle")
    .data(data);


  enemies.enter().append("circle")
    .attr("r", 10)
    .attr("class", "enemy")
    .attr("cy", function(d, i) {
      return randomLocation().y
    })
    .attr("cx", function(d, i) {
      return randomLocation().x
    });

};

updateEnemies(buildEnemies(30));
