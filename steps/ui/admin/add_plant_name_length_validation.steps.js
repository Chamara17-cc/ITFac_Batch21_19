const { When, Then } = require('@cucumber/cucumber');

When('I click Save', async function () {
  await this.addPlantPage.clickSave();
});



Then('I should not see any validation errors', async function () {
  await this.addPlantPage.expectNoErrors();
});
