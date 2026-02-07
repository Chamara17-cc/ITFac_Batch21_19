const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I search for plant {string}', async function (searchText) {
  await this.plantPageUser.searchPlant(searchText);
});

Then('I should see some plants matching the search', async function () {
  const filteredPlants = await this.plantPageUser.getPlantNames();
  expect(filteredPlants.length).toBeGreaterThan(0);
});

When('I click the Reset button', async function () {
  await this.plantPageUser.resetSearch();
});

Then('I should see all plants listed', async function () {
  const allPlants = await this.plantPageUser.getPlantNames();
  // Ensures table is repopulated
  expect(allPlants.length).toBeGreaterThan(0);
});
