const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginAndGetToken, del } = require('../../../utils/apiUtils');



When('user attempts to delete a category with an invalid ID', async function () {
  const invalidCategoryId = 999999;

  this.deleteResponse = await del(
    `/api/categories/${invalidCategoryId}`,
    this.userToken
  );
});

Then(
  'a category deletion error response should be returned for user',
  async function () {
    expect(this.deleteResponse).toBeTruthy();
    expect([403, 404]).toContain(this.deleteResponse.status);
  }
);