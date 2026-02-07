const { Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('admin sends request to get all plants', async function () {
  this.response = await this.api.get('/api/plants');
});

When('admin requests plant with id {int}', async function (id) {
  this.response = await this.api.get(`/api/plants/${id}`);
});

When('admin requests plants by category id {int}', async function (categoryId) {
  this.response = await this.api.get(`/api/plants/category/${categoryId}`);
});

Then('response status should be {int}', async function (status) {
  expect(this.response.status()).toBe(status);
});

Then('response should be a list of plants', async function () {
  const body = await this.response.json();
  expect(Array.isArray(body)).toBeTruthy();
});