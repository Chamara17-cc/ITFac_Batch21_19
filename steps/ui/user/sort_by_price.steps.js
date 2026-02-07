const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I sort plants by Price column', async function () {
  await this.plantPageUser.clickPriceColumn();
});

Then('I should see the plants sorted by Price in ascending order', async function () {
  const prices = await this.plantPageUser.getPlantPrices();
  const expected = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(expected);
});

Then('I should see the plants sorted by Price in descending order', async function () {
  const prices = await this.plantPageUser.getPlantPrices();
  const expected = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(expected);
});
