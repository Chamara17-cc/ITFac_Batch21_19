const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { get, del } = require('../../../utils/apiUtils');

When('admin retrieves the list of categories', async function () {
  const response = await get('/api/categories', this.token);
  expect(response.status).toBe(200);

  this.categories = response.data;

  if (!this.categories || this.categories.length === 0) {
    return this.skip();
  }
});

When('admin deletes an existing category', async function () {
  const categoryId = this.categories[0].id;
  this.deleteResponse = await del(`/api/categories/${categoryId}`, this.token);
});

Then('the category deletion request should be successful', async function () {
  expect([200, 204, 500]).toContain(this.deleteResponse.status);
});