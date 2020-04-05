export const filterByCategory = (results, category) => {
  const newCategory = results.filter(result => result.category === category);
  return newCategory;
};

export const aggregateAmount = itemsArray => {
  const aggregatedAmount = itemsArray.reduce(
    (accumulatedAmount, item) => accumulatedAmount + item.fundingAmount,
    0
  );
  return aggregatedAmount;
};

export const filterRoundsByCategory = (results, category) => {
  const newCategoryRounds = results.filter(
    result => result.category === category
  );
  return newCategoryRounds.length;
};

export const volumeOfFunding = results => {
  const totalVolumeOfFunding = [];

  const beautyCategory = filterByCategory(results, "Beauty");
  totalVolumeOfFunding.push(aggregateAmount(beautyCategory));

  //console.log(totalVolumeOfFunding);
  const healthCategory = filterByCategory(results, "Health");
  totalVolumeOfFunding.push(aggregateAmount(healthCategory));

  const gamesCategory = filterByCategory(results, "Games");
  totalVolumeOfFunding.push(aggregateAmount(gamesCategory));

  const toolsCategory = filterByCategory(results, "Tools");
  totalVolumeOfFunding.push(aggregateAmount(toolsCategory));

  const automotiveCategory = filterByCategory(results, "Automotive");
  totalVolumeOfFunding.push(aggregateAmount(automotiveCategory));

  return totalVolumeOfFunding;
};

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
