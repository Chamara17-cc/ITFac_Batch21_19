const { Then } = require('@cucumber/cucumber');

Then('low stock badge should be visible', async function () {
  await this.plantPage.expectLowStockVisible();
});