
import React from 'react';
import rd3 from 'react-d3-library';


const Score = React.createClass({
  componentWillMount(){


    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

    var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

    var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

    var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


      console.log(this.props.currentUserScores);
      let data = this.props.currentUserScores.map((d, index) => {
                        d.createdAt = d.createdAt.slice(0,-5);
                        d.createdAt = d.createdAt.replace(/T/g, ' ');
                        // d.createdAt = d.createdAt.slice(0,-14);
                        console.log(d.createdAt);
                        const l  = parseDate(d.createdAt);
                        return {close:d.score, date: l}
              });
              console.log(data);
    // Get the data
    // d3.csv("./data.csv", function(error, data) {
    // data.forEach(function(d) {
    //     d.date = parseDate(d.date);
    //     d.close = +d.close;
    // });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    svg.append("path")		// Add the valueline path.
        .attr("class", "line")
        .attr("d", valueline(data));

    svg.append("g")			// Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")			// Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);
  },

    componentWillUnmount() {
      d3.selectAll("svg > *").remove();
      // svg.selectAll("*").remove();
      // d3.select("svg").remove();
      // d3.select('svg').selectAll("*").data([]).exit().remove()

    },


  render() {
    return (
      <div>
        {this.props.currentUser.highScore}
      </div>
    )
  }
});

export default Score;
