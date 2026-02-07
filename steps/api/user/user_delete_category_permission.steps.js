const { When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { get, del } = require('../../../utils/apiUtils');

When('user attempts to delete an existing category', async function () {
  const getResponse = await get('/api/categories', this.userToken);
  expect(getResponse.status).toBe(200);

  const categories = getResponse.data;

  if (!categories || categories.length === 0) {
    this.noCategoryAvailable = true;
    return;
  }

  const categoryId = categories[0].id;

  this.deleteResponse = await del(
    `/api/categories/${categoryId}`,
    this.userToken
  );
});