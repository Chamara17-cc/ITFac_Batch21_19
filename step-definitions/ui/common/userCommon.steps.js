const { Given, When } = require('@cucumber/cucumber');
const { loginAsUser } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');

Given('user is logged in', async function () {
  await loginAsUser(this.page);
});

When('user opens plant page', async function () {
  this.plantPage = new PlantPage(this.page);
  await this.plantPage.open();
});