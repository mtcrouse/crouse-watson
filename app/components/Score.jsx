import React from 'react';

const Score = React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },

  componentWillMount() {
    this.setState({ data: this.props.currentUserScores });
  },

  componentDidMount() {
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(this.state.data.length);

    var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

    let counter = 1;

    var valueline = d3.svg.line()
    .x(function(d) {
      let returnValue = counter;
      counter += 1;

      return x(returnValue);
    })
    .y(function(d) { return y(d.score); });

    var svg = d3.select("#user-content")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    x.domain([1, this.state.data.length]);
    y.domain([0, d3.max(this.state.data, function(d) { return d.score; })]);

    svg.append("path") // Add the valueline path.
        .attr("class", "line")
        .attr("d", valueline(this.state.data));

    svg.append("g") // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text") // add x axis label
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Session");

    svg.append("text") // add y axis label
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Score");

    svg.append("g") // Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);
  },

  componentWillUnmount() {
    d3.select("svg").remove();
  },

  render() {
    return (
      <div>
        High Score: {this.props.currentUser.highScore}<br/>
        User since: {this.props.currentUser.createdAt.slice(0,-14)}<br/>
        {/* Your scores:
          Newbie 🙂 (0-100):
          Pretty OK 😃 (100-250):
          Intermediate 😎 (250-500):
          Pro 💪 (500-750):
          Amazing 😍 (750-1000):
          Master 🏆 (1000+): */}
      </div>
    )
  }
});

export default Score;
