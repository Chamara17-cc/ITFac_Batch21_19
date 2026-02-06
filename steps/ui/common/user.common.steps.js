const { Given } = require('@cucumber/cucumber');
const { plantPageUser } = require('../../../pages/plantPageUser');
const { loginAsUser } = require('../../../utils/authHelper');

Given('I am logged in as a user', async function () {
  await loginAsUser(this.page);
});

Given('I am on the Plant List page as a user', async function () {
  this.plantPageUser = new plantPageUser(this.page);
  await this.plantPageUser.open();
});
