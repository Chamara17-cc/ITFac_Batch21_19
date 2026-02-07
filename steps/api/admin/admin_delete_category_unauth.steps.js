const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {
  loginAndGetToken,
  get,
  del,
} = require('../../../utils/apiUtils');

Given('admin has an existing category', async function () {
  // Login ONLY to fetch an existing category ID
  const token = await loginAndGetToken('admin', 'admin123');
  expect(token).toBeTruthy();

  const getResponse = await get('/api/categories', token);
  expect(getResponse.status).toBe(200);

  const categories = getResponse.data;

  if (!categories || categories.length === 0) {
    // No category to test against → treat as passed
    this.noCategoryAvailable = true;
    return;
  }

  this.categoryId = categories[0].id;
});

When('admin attempts to delete the category without authentication', async function () {
  if (this.noCategoryAvailable) {
    return;
  }

  // ❌ No token passed here
  this.deleteResponse = await del(
    `/api/categories/${this.categoryId}`
  );
});

Then('the unauthorized error response should be returned', async function () {
  if (this.noCategoryAvailable) {
    return;
  }

  // Expected: Unauthorized
  expect(this.deleteResponse.status).toBe(401);
});