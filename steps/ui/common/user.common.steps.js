const { Given } = require('@cucumber/cucumber');
const { PlantPageUser } = require('../../../pages/PlantPageUser');
const { loginAsUser } = require('../../../utils/authHelper');

Given('I am logged in as a user', async function () {
  await loginAsUser(this.page);
});

Given('I am on the Plant List page as a user', async function () {
  this.plantPageUser = new PlantPageUser(this.page);
  await this.plantPageUser.open();
});
