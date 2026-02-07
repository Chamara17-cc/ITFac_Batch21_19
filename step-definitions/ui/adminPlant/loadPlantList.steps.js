const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');


When('admin opens plant page', async function () {
  this.plantPage = new PlantPage(this.page);
  await this.plantPage.open();
});

Then('plant list should be displayed', async function () {
  const count = await this.plantPage.getPlantCount();
  expect(count).toBeGreaterThan(0);
});
