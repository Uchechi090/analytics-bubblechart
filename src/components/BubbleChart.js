import React, { Component } from "react";
import * as d3 from "d3";

import {
  volumeOfFunding,
  fundingRoundsPerCategory,
  generateRandomColour,
  filterFundingRange
} from "./dataUtils";
import BubbleTable from "./BubbleTable";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVolumeOfFunding: [],
      totalFundingRounds: [],
      results: [],
      categoriesArray: []
    };
    this.myRef = React.createRef();
  }

  //This sets the array of categories in a funding range to statea
  setFundingRange = (e, totalFundingAmount) => {
    //event.preventDefault();
    const { results } = this.state;
    const categoriesArray = filterFundingRange(totalFundingAmount, results);

    this.setState({ categoriesArray });
  };

  //fetching the data and setting to state using the utility functions
  getFundingData = () => {
    fetch("http://demo0377384.mockable.io/funding-test")
      .then(res => res.json())
      .then(
        results => {
          //console.log(results);
          this.setState({ results });
          const totalVolumeOfFunding = volumeOfFunding(results);
          const totalFundingRounds = fundingRoundsPerCategory(results);

          this.setState(
            { totalVolumeOfFunding, totalFundingRounds },
            this.makeBubbleChart(totalVolumeOfFunding)
          );
        },
        error => {
          console.log(error);
        }
      );
  };

  //The function for making the bubble chart
  makeBubbleChart = data => {
    const width = 700;
    const height = 500;
    const padding = 50;

    //declaring scaling for the x and y axes
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.amount)])
      .range([padding, width - padding]);

    //domain values are so because there are 5 categories and I am plotting
    //categories against total numbers of funding volumes and rounds
    const yScale = d3
      .scaleLinear()
      .domain([0, 6])
      .range([height - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    //scaling for size of the bubble
    const bubbleSize = d3
      .scaleQuantize()
      .domain([0, d3.max(data, d => d.amount)])
      .range([10, 50]);

    //creating the canvas
    const svgCanvas = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid cyan");

    //creating the bubbles
    svgCanvas
      .selectAll(".bubble")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 0)
      .classed("bubble", true)
      .attr("fill", "red")
      .attr("stroke", d3.rgb("red").darker());

    const bubbles = d3.selectAll(".bubble");
    bubbles
      .attr("stroke-width", 2)
      .transition()
      .duration(100)
      .attr("cx", d => xScale(d.amount))
      .attr("cy", d => yScale(d.categoryNumber))
      .attr("r", d => bubbleSize(d.amount))
      
    bubbles.on("click", (d, e)=> this.setFundingRange(e, d.amount))

    //adding the x and y axes
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
  }

  render() {
    const {
      categoriesArray,
      totalVolumeOfFunding,
      totalFundingRounds
    } = this.state;
    return (
      <>
        <div ref={this.myRef}>
          <div>
            <label>Data: </label>
            <select>
              <option value={totalVolumeOfFunding}>Funding Amount</option>
              <option value={totalFundingRounds}>
                Funding Rounds per Category
              </option>
            </select>
          </div>
        </div>
        {categoriesArray.length
          ? categoriesArray.map(item => (
              <BubbleTable
                id={item.id}
                category={item.category}
                location={item.location}
                fundingAmount={item.fundingAmount}
                announcedDate={item.announcedDate}
              />
            ))
          : null}
      </>
    );
  }
}

export default BubbleChart;
