const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');


When('admin opens the plant page', async function () {
  this.plantPage = new PlantPage(this.page);
  await this.plantPage.open();

  this.adminPage = new PlantPageAdmin(this.page);
});

Then('"Add a Plant" button should be visible', async function () {
  await expect(this.adminPage.addPlantBtn).toBeVisible();
});
