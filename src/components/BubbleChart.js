import React, { Component } from "react";
import * as d3 from "d3";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  makeBubbleChart = () => {};

  componentDidMount() {
    this.makeBubbleChart();
  }

  render() {
    return <div ref={this.myRef}>My BubbleChart</div>;
  }
}

export default BubbleChart;
