const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('response should contain plant details', async function () {
  const body = await this.response.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('name');
  expect(body).toHaveProperty('price');
});