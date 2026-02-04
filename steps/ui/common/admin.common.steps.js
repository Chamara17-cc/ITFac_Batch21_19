const { Given, When, Then } = require('@cucumber/cucumber');
const { AddPlantPageAdmin } = require('../../../pages/AddPlantPageAdmin');
const { loginAsAdmin } = require('../../../utils/authHelper');

Given('I am logged in as an admin', async function () {
  await loginAsAdmin(this.page);
});

Given('I am on the Add Plant page', async function () {
  this.addPlantPage = new AddPlantPageAdmin(this.page);
  await this.addPlantPage.open();
});

When('I enter plant details with name {string}', async function (plantName) {
  await this.addPlantPage.fillBasicDetails({
    name: plantName,
    categoryIndex: 1,
    price: '100',
    quantity: '10'
  });
});

Then('I should see the plant name length validation message', async function () {
  await this.addPlantPage.expectPlantNameLengthError();
});
