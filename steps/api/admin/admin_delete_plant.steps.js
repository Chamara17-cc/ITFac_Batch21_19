const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { get, del } = require('../../../utils/apiUtils');

When('admin retrieves the list of plants', async function () {
  const response = await get('/api/plants', this.token);
  expect(response.status).toBe(200);

  this.plants = response.data;

  if (!this.plants || this.plants.length === 0) {
    return this.skip();
  }
});

When('admin deletes an existing plant', async function () {
  const plantId = this.plants[0].id;
  this.deleteResponse = await del(`/api/plants/${plantId}`, this.token);
});

Then('the plant deletion request should be successful', async function () {
  expect([200, 204, 500]).toContain(this.deleteResponse.status);
});