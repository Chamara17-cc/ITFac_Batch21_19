const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginAndGetToken, get, del } = require('../../../utils/apiUtils');

Given('an existing category is available', async function () {
  // Login as admin to fetch a valid category ID
  const adminToken = await loginAndGetToken('admin', 'admin123');
  expect(adminToken).toBeTruthy();

  const getResponse = await get('/api/categories', adminToken);
  expect(getResponse.status).toBe(200);

  const categories = getResponse.data;

  if (!categories || categories.length === 0) {
    this.noCategoryAvailable = true;
    return;
  }

  this.categoryId = categories[0].id;
});

When('a delete category request is sent without authentication', async function () {
  if (this.noCategoryAvailable) {
    return;
  }

  // ❌ No token passed here
  this.deleteResponse = await del(
    `/api/categories/${this.categoryId}`
  );
});

Then('an unauthorized error response should be returned', async function () {
  if (this.noCategoryAvailable) {
    return;
  }

  expect(this.deleteResponse).toBeTruthy();
  expect(this.deleteResponse.status).toBe(401);
});