import React, { Component } from "react";
import * as d3 from "d3";

import {
  volumeOfFunding,
  fundingRoundsPerCategory,
  generateRandomColour
} from "./dataUtils";

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

  makeBubbleChart = data => {
    const width = 700;
    const height = 500;
    const padding = 50;

    const xScale = d3
      .scaleLinear()
      .domain([6000000, 60000000])//([d3.min(data), d3.max(data)])
      .range([padding, width - padding]); //.range([6000000, 60000000]);

    //domain values are so because there are 5 categories and I am plotting
    //categories against total numbers of funding volumes and rounds
    const yScale = d3
      .scaleLinear()
      .domain([0, 6])
      .range([height - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const bubbleSize = d3
      .scaleLinear()
      .domain([70000, 50000000])
      .range([1000, 10000])//.range([1, 5]);

    const svgCanvas = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid cyan");

    svgCanvas
      .selectAll(".bubble")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 0)
    //   .attr("cx", (d) => xScale(d.amount))
    //   .attr("cy", (d) => yScale(d.categoryNumber))
    //   .attr("r", d => bubbleSize(d)) //.attr("r", 0)
      .classed("bubble", true)
      .attr("fill", generateRandomColour())
      .attr("stroke", d3.rgb().darker())

    const bubbles = d3.selectAll(".bubble");
    bubbles
      .attr("stroke-width", 2)
      .transition()
      .duration(100)
      .attr("cx", (d) => xScale(d.amount))
      .attr("cy", (d) => yScale(d.categoryNumber))
      .attr("r", d => bubbleSize(d));

    svgCanvas
      .append("g")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis);

    svgCanvas
      .append("g")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);
  };

  componentDidMount() {
    this.getFundingData();
    this.makeBubbleChart(this.state.totalVolumeOfFunding);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default BubbleChart;
