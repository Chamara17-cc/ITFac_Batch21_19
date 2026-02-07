const { Before, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('plant list should be empty', async function () {
  const body = await this.response.json();
  expect(body.length).toBe(0);
});