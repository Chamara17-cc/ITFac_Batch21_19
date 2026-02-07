const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { CategoryPage } = require('../../pages/admin/CategoryPage');
const { CategoryAddPage } = require('../../pages/admin/CategoryAddPage');
const { loginAsAdmin } = require('../../utils/authHelper');

let browser, page, categoryPage, categoryAddPage, initialPageNumber, secondPage;


Given('I am logged in as admin', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await loginAsAdmin(page);
});


When('I open the category page as admin', { timeout: 10000 }, async function () {
  categoryPage = new CategoryPage(page);
  await categoryPage.open();
});

Then('I should see the category page URL as admin', async function () {
  await expect(page).toHaveURL('http://localhost:8080/ui/categories');
});

Then('the category page header should be visible as admin', async function () {
  await expect(categoryPage.pageHeader()).toBeVisible();
});

Then('the category count should be greater than 0 as admin', async function () {
  const count = await categoryPage.fetCategoryCount();
  expect(count).toBeGreaterThan(0);
});


When('I click the next page button as admin', async function () {
  initialPageNumber = await categoryPage.getCurrentPageNumber();
  await categoryPage.clickNext();
  secondPage = await categoryPage.getCurrentPageNumber();
});

Then('the page number should change as admin', async function () {
  expect(secondPage).not.toBe(initialPageNumber);
});


When('I search category by name {string} as admin', async function (name) {
  await categoryPage.searchByName(name);
});

Then('the first row name should be {string} as admin', async function (expectedName) {
  const firstRowName = await categoryPage.getFirstRowName();
  expect(firstRowName).toBe(expectedName);
});


When('I open the add category page as admin', async function () {
  categoryAddPage = new CategoryAddPage(page);
  await categoryAddPage.open();
});

When('I click save without entering a name as admin', async function () {
  await categoryAddPage.clickSave();
});

Then('I should see validation error {string} as admin', async function (message) {
  await expect(categoryAddPage.validationError).toContainText(message);
});


After(async function () {
  if (browser) await browser.close();
});
