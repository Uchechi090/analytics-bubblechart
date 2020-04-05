import React, { Component } from "react";
import * as d3 from "d3";

import { volumeOfFunding, fundingRoundsPerCategory } from "./dataUtils";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVolumeOfFunding: [],
      totalFundingRounds: []
    };
    this.myRef = React.createRef();
  }

  getFundingData = () => {
    fetch("http://demo0377384.mockable.io/funding-test")
      .then(res => res.json())
      .then(
        results => {
          console.log(results);
          const totalVolumeOfFunding = volumeOfFunding(results);
          const totalFundingRounds = fundingRoundsPerCategory(results);

          this.setState({ totalVolumeOfFunding, totalFundingRounds });
        },
        error => {
          console.log(error);
        }
      );
  };

  makeBubbleChart = (data) => {
    const svgCanvas = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", 700)
      .attr("height", 500)
      .style("border", "1px solid cyan"); 
  };

  componentDidMount() {
    this.getFundingData();
    this.makeBubbleChart();
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default BubbleChart;
