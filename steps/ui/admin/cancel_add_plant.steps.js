const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { addPlantPageAdmin } = require('../../../pages/addPlantPageAdmin');

When('I open the Add Plant page', async function () {
  this.addPlantPage = new addPlantPageAdmin(this.page);
  await this.addPlantPage.open();
});

When('I click the Cancel button', async function () {
  await this.addPlantPage.clickCancel();
});

Then('I should be redirected to the Plant List page', async function () {
  await expect(this.page).toHaveURL('http://localhost:8080/ui/plants');
});
