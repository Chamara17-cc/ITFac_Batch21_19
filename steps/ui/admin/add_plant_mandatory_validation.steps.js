const { When, Then } = require('@cucumber/cucumber');

When('I click Save without entering any details', async function () {
  await this.addPlantPage.clickSave();
});

Then('I should see all mandatory field validation messages', async function () {
  await this.addPlantPage.expectAllMandatoryErrors();
});

