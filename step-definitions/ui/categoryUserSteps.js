const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { CategoryPage } = require('../../pages/user/CategoryPage');
const { loginAsUser } = require('../../utils/authHelper');

Given('I am logged in as user', async function () {
  this.browser = await chromium.launch({ headless: false });
  this.page = await this.browser.newPage();
  await loginAsUser(this.page);
});

When('I open the category page as user', async function () {
  this.categoryPage = new CategoryPage(this.page); // store in World
  await this.categoryPage.open();
});

Then('I should NOT see the Add Category button as user', async function () {
  const addButton = this.page.locator('a:has-text("Add Category")');
  await expect(addButton).toHaveCount(0);
});

When('I try to click the Edit button as user', async function () {
  const firstEdit = this.categoryPage.editButtons.first();
  this.urlBefore = this.page.url();

  const isVisible = await firstEdit.isVisible();
  if (isVisible) await firstEdit.click({ force: true });
});

Then('the URL should NOT change as user', async function () {
  const urlAfter = this.page.url();
  expect(urlAfter).toBe(this.urlBefore);
});

When('I search category by name {string} as user', async function (name) {
  await this.categoryPage.searchByName(name);
});

When('I click the reset button as user', async function () {
  await this.categoryPage.resetButton.click();
});

Then('the search input should be empty as user', async function () {
  await expect(this.categoryPage.searchInput).toHaveValue('');
});

Then('the first row name should be {string} as user', async function (expectedName) {
  const firstRowName = await this.categoryPage.getFirstRowName();
  expect(firstRowName).toBe(expectedName);
});

Then('the Delete button should be disabled as user', async function () {
  const deleteButton = this.categoryPage.deleteButton.first();
  await expect(deleteButton).toBeDisabled();
});
Then('I should see {string} message', async function (expectedMessage) {
  const isEmpty = await this.categoryPage.isCategoryTableEmpty();

  if (!isEmpty) {
    throw new Error("Category table is not empty");
  }

  const actualMessage = await this.categoryPage.getNoCategoryText();
  expect(actualMessage.trim()).toBe(expectedMessage);
});


After(async function () {
  if (this.browser) await this.browser.close();
});
