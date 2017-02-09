import React from 'react';

const Score = React.createClass({
  getInitialState() {
    return {
      data: []
    }
  },
  componentWillMount(){
    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
    let data = this.props.currentUserScores.map((d, index) => {
                      let l = d.createdAt.slice(0,-5);
                      l = l.replace(/T/g, ' ');
                      l  = parseDate(l);
                      return {close:d.score, date: l}
            });
      this.setState({ data: data });
  },

  componentDidMount(){
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

    var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

    var svg = d3.select("#user-content")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // Get the data

    x.domain(d3.extent(this.state.data, function(d) { return d.date; }));
    y.domain([0, d3.max(this.state.data, function(d) { return d.close; })]);

    svg.append("path")		// Add the valueline path.
        .attr("class", "line")
        .attr("d", valueline(this.state.data));

    svg.append("g")			// Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")			// Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

    // svg.append("text")
    // .attr("x", width / 2 )
    // .attr("y",  0 - (margin.top / 2))
    // .style("font-size", "16px")
    // .style("text-anchor", "middle")
    // .style("text-decoration", "underline")
    // .text("Score vs Date Graph");
  },

  componentWillUnmount() {
    d3.select("svg").remove();
  },

  render() {
    return (
      <div>
        High Score: {this.props.currentUser.highScore}
      </div>
    )
  }
});

export default Score;
