import React from "react";

import {
  filterByCategory,
  aggregateAmount,
  filterRoundsByCategory,
  volumeOfFunding,
  fundingRoundsPerCategory,
  generateRandomColour
} from "../components/dataUtils";
import {
  resultsArray,
  healthArray,
  aggregateAmountObject,
  totalVolumeOfFundingResults,
  totalFundingRoundsPerCategory
} from "../components/data";

test("testing filterByCategory function", () => {
  expect(filterByCategory(resultsArray, "Health")).toEqual(healthArray);
});

test("testing aggregateAmount function", () => {
  expect(aggregateAmount(healthArray, 1)).toEqual(aggregateAmountObject);
});

test("testing filterRoundsyCategory function", () => {
  expect(filterRoundsByCategory(resultsArray, "Games")).toEqual(3);
});

test("testing volumeOfFunding function", () => {
  expect(volumeOfFunding(resultsArray)).toEqual(totalVolumeOfFundingResults);
});

test("testing fundingRoundsPerCategory function", () => {
  expect(fundingRoundsPerCategory(resultsArray)).toEqual(
    totalFundingRoundsPerCategory
  );
});

test("testing generateRandomColour function", () => {
  expect(generateRandomColour()).not.toBeNull();
});
