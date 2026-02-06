const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const { SalesPage } = require('../../pages/SalesPage');
const { SellPlantPage } = require('../../pages/SellPlantPage');
const { loginAsAdmin, loginAsUser } = require('../../tests/ui/sales/helpers/auth.helper');

Given('I am logged in as admin', async function () {
  await loginAsAdmin(this.page, this.baseUrl);
});

Given('I am logged in as user', async function () {
  await loginAsUser(this.page, this.baseUrl);
});

Given('I am on the sales page', async function () {
  this.salesPage = new SalesPage(this.page);
  await this.salesPage.goto(this.baseUrl);
  await this.salesPage.verifyPageLoaded();
});

When('I click the delete button', async function () {
  this.dialogMessage = '';
  this.page.once('dialog', async (dialog) => {
    this.dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await this.salesPage.deleteButtons.first().click();
});

Then('I should see delete confirmation popup', async function () {
  expect(this.dialogMessage).toBe('Are you sure you want to delete this sale?');
  await expect(this.salesPage.deleteButtons.first()).toBeVisible();
});

Then('delete buttons should not be visible', async function () {
  await expect(this.salesPage.deleteButtons).toHaveCount(0);
  if (await this.salesPage.deleteButtons.count() > 0) {
    await expect(this.salesPage.deleteButtons.first()).not.toBeVisible();
  }
});

Then('pagination should have multiple pages', async function () {
  const pageCount = await this.salesPage.paginationItems.count();
  expect(pageCount).toBeGreaterThan(2);
});

When('I navigate to the next page', async function () {
  await this.salesPage.goToNextPage();
  await this.page.waitForTimeout(500);
});

Then('the sales rows on the next page should be visible', async function () {
  const rowCount = await this.salesPage.getRowCount();
  expect(rowCount).toBeGreaterThan(0);
});

Then('plants should be sorted by Sold At descending', async function () {
  const soldDates = await this.salesPage.getSoldAtDates();
  for (let i = 1; i < soldDates.length; i++) {
    expect(soldDates[i].getTime()).toBeLessThanOrEqual(soldDates[i - 1].getTime());
  }
});

When('I sell a plant with value {string} and quantity {int}', async function (value, qty) {
  const sellPage = new SellPlantPage(this.page);
  await sellPage.goto(this.baseUrl);
  await sellPage.sellPlant(value, qty);
});

Then('I should be redirected to the sales page', async function () {
  await expect(this.page).toHaveURL(/\/ui\/sales/);
});

Then('new sale should be visible', { timeout: 15_000 }, async function () {
  this.salesPage = new SalesPage(this.page);
  await this.salesPage.goto(this.baseUrl); 
  await this.salesPage.verifyPageLoaded();
  await expect(this.salesPage.deleteButtons.first()).toBeVisible({ timeout: 10000 });
});


Then('delete button should be visible', async function () {
  await this.salesPage.verifyDeleteButtonVisible();
  await expect(this.salesPage.deleteButtons.first()).toBeVisible();
});

Then('there should be more than 1 delete button', async function () {
  const deleteButtonCount = await this.salesPage.deleteButtons.count();
  expect(deleteButtonCount).toBeGreaterThan(1);
});

Then('"No sales found" message should appear if table is empty', async function () {
  const rows = this.page.locator('table tbody tr');
  const rowCount = await rows.count();
  if (rowCount === 0) {
    await expect(this.salesPage.noSalesMessage).toBeVisible();
    await expect(this.salesPage.noSalesMessage).toHaveText('No sales found');
  }
});

Then('Sell Plant button should be visible', async function () {
  await this.salesPage.verifySellPlantButtonVisible();
  await expect(this.salesPage.sellPlantButton).toBeVisible();
  await expect(this.salesPage.sellPlantButton).toHaveText('Sell Plant');
});

When('I navigate to the previous page', async function () {
  await this.salesPage.goToPrevPage();
  await this.page.waitForTimeout(500);
});

Then('the sales rows on the first page should be visible', async function () {
  const rowCount = await this.salesPage.getRowCount();
  expect(rowCount).toBeGreaterThan(0);
});

When('I go to the Sell Plant page', async function () {
  this.sellPage = new SellPlantPage(this.page);
  await this.sellPage.goto(this.baseUrl);
  await this.sellPage.verifyPageLoaded();
});

When('I click Cancel', async function () {
  await this.sellPage.cancel();
});

Then('I should be redirected back to the sales page', async function () {
  await expect(this.page).toHaveURL(/\/ui\/sales/);
});






