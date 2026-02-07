const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('user searches for plant {string}', async function (plantName) {
  await this.plantPage.searchPlant(plantName);
});

Then('matching plants should be displayed', async function () {
  const count = await this.plantPage.getPlantCount();
  expect(count).toBeGreaterThan(0);
});