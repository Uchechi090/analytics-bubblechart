//This takes a results array and a specified category to filter objects that
//has the category specified out of the array
export const filterByCategory = (results, category) => {
  const newCategory = results.filter(result => result.category === category);
  return newCategory;
};

//This takes an array of items and adds up all the fundingAmounts; the counter
//is used in the chart for the y axis
export const aggregateAmount = (itemsArray, counter) => {
  const aggregatedAmount = itemsArray.reduce(
    (accumulatedAmount, item) => accumulatedAmount + item.fundingAmount,
    0
  );
  return { amount: aggregatedAmount, categoryNumber: (counter += 1) };
};

//This takes a results array and a specific category to filter and returns the
//length of the array as the total number of funding rounds
export const filterRoundsByCategory = (results, category) => {
  const newCategoryRounds = results.filter(
    result => result.category === category
  );
  return newCategoryRounds.length;
};

//This is used to compute the total volume of funding per category
export const volumeOfFunding = results => {
  const totalVolumeOfFunding = [];

  const beautyCategory = filterByCategory(results, "Beauty");
  totalVolumeOfFunding.push(aggregateAmount(beautyCategory, 0));

  const healthCategory = filterByCategory(results, "Health");
  totalVolumeOfFunding.push(aggregateAmount(healthCategory, 1));

  const gamesCategory = filterByCategory(results, "Games");
  totalVolumeOfFunding.push(aggregateAmount(gamesCategory, 2));

  const toolsCategory = filterByCategory(results, "Tools");
  totalVolumeOfFunding.push(aggregateAmount(toolsCategory, 3));

  const automotiveCategory = filterByCategory(results, "Automotive");
  totalVolumeOfFunding.push(aggregateAmount(automotiveCategory, 4));
  //console.log(totalVolumeOfFunding);

  return totalVolumeOfFunding;
};

//This is used to compute the total funding rounds per category
export const fundingRoundsPerCategory = results => {
  const totalFundingRounds = [];

  const beautyRounds = filterRoundsByCategory(results, "Beauty");
  totalFundingRounds.push(beautyRounds);

  const healthRounds = filterRoundsByCategory(results, "Health");
  totalFundingRounds.push(healthRounds);

  const gamesRounds = filterRoundsByCategory(results, "Games");
  totalFundingRounds.push(gamesRounds);

  const toolsRounds = filterRoundsByCategory(results, "Tools");
  totalFundingRounds.push(toolsRounds);

  const automotiveRounds = filterRoundsByCategory(results, "Automotive");
  totalFundingRounds.push(automotiveRounds);
  //console.log(totalFundingRounds);

  return totalFundingRounds;
};

//This is used to generate a hexadecial colour (from dev.to)
export const generateRandomColour = () => {
  var randomColour = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return randomColour;
};

//This filters the results array based on the range of total funding amount
export const filterFundingRange = (totalfundingAmount, results) => {
  const categories = results.filter(
    result => result.fundingAmount >= totalfundingAmount
  );

  return categories;
};
