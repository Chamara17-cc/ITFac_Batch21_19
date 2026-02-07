const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('I should see at least one plant in the list', async function () {
  const plantNames = await this.plantPageUser.getPlantNames();
  expect(plantNames.length).toBeGreaterThan(0);
});

Then('I should see the Name, Category, Price, and Stock columns', async function () {
  const page = this.page;

  const nameColumn = page.getByRole('columnheader', { name: 'Name' });
  const categoryColumn = page.getByRole('columnheader', { name: 'Category' });
  const priceColumn = page.getByRole('columnheader', { name: 'Price' });
  const stockColumn = page.getByRole('columnheader', { name: 'Stock' });

  await expect(nameColumn).toBeVisible();
  await expect(categoryColumn).toBeVisible();
  await expect(priceColumn).toBeVisible();
  await expect(stockColumn).toBeVisible();
});
