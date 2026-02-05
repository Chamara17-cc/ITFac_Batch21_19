const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the forbidden error response should be returned', async function () {
  if (
    this.noCategoryAvailable ||
    this.noPlantAvailable ||
    this.noSaleAvailable
  ) {
    return;
  }

  expect(this.deleteResponse).toBeTruthy();
  expect(this.deleteResponse.status).toBe(403);
});