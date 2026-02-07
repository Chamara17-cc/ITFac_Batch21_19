const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I create a category with random name', async function () {
  const authRequest = await this.getAdminRequest();
  const uniqueName = `Cat_${Math.floor(Math.random() * 1000000)}`.slice(0, 10);

  this.response = await authRequest.post('/api/categories', {
    data: { name: uniqueName, subCategories: [] }
  });

  this.categoryName = uniqueName;
});

When('I create a category with empty name', async function () {
  const authRequest = await this.getAdminRequest();
  this.response = await authRequest.post('/api/categories', {
    data: { name: '' }
  });
});

When('I create category with name {string}', async function (name) {
  const authRequest = await this.getAdminRequest();
  this.response = await authRequest.post('/api/categories', {
    data: { name, subCategories: [] }
  });
});

Then('response should contain category id', async function () {
  const body = await this.response.json();
  expect(body).toHaveProperty('id');
  expect(body.name).toBe(this.categoryName);
});

Then('response should contain error message', async function () {
  const body = await this.response.json();
  expect(body).toHaveProperty('message');
});

Then('response message should be {string}', async function (msg) {
  const body = await this.response.json();
  expect(body.message).toBe(msg);
});
