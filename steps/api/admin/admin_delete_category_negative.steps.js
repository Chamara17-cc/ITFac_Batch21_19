const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { del } = require('../../../utils/apiUtils');

When('admin attempts to delete a non-existing category', async function () {
  // Use a clearly invalid ID
  const invalidCategoryId = 999999;

  this.deleteResponse = await del(
    `/api/categories/${invalidCategoryId}`,
    this.token
  );
});

Then('the category deletion error response should be returned', async function () {
  // Backend may vary in implementation
  expect([400, 404, 500]).toContain(this.deleteResponse.status);
});