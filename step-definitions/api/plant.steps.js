const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect, request: playwrightRequest } = require('@playwright/test');
const { getAdminAuthContext, getUserAuthContext } = require('../../tests/api/helpers/api-auth.helper');

setDefaultTimeout(30 * 1000);

const BASE_URL = 'http://localhost:8080';
let response;

// ----- PLANT BACKGROUND -----
Given('the Plant API is available', async function () {
});

Given('the plant with ID {int} exists', async function (plantId) {
  this.plantId = plantId;
});

Given('the category ID {int} exists for plants', async function (categoryId) {
  this.categoryId = categoryId;
});

// ----- PLANT ACTIONS -----
When('I update the plant with ID {int} as admin with name {string}, price {int}, quantity {int}, category {int}', 
async function (plantId, name, price, quantity, categoryId) {
  const authRequest = await getAdminAuthContext(playwrightRequest.newContext({ baseURL: BASE_URL }));
  response = await authRequest.put(`/api/plants/${plantId}`, {
    data: { name, price, quantity, categoryId }
  });
});

When('I update the plant with ID {int} without authentication', async function (plantId) {
  const req = await playwrightRequest.newContext({ baseURL: BASE_URL });
  response = await req.put(`/api/plants/${plantId}`, {
    data: { name: 'Plant 1', price: 100, quantity: 5, categoryId: this.categoryId }
  });
});

When('I update the plant with ID {int} as normal user with name {string}, price {int}, quantity {int}, category {int}', 
async function (plantId, name, price, quantity, categoryId) {
  const authRequest = await getUserAuthContext(playwrightRequest.newContext({ baseURL: BASE_URL }));
  response = await authRequest.put(`/api/plants/${plantId}`, {
    data: { name, price, quantity, categoryId }
  });
});

// ----- PLANT ASSERTIONS -----
Then('the plant response status should be {int}', async function (status) {
  expect(response.status()).toBe(status);
});

Then('the plant response should contain id {int}, price {int}, and quantity {int}', async function (id, price, quantity) {
  const body = await response.json();
  expect(body).toHaveProperty('id', id);
  expect(body.price).toBe(price);
  expect(body.quantity).toBe(quantity);
});
