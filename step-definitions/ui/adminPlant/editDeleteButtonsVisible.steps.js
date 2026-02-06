const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

Then('edit and delete buttons should be visible', async function () {
  const adminPage = new PlantPageAdmin(this.page);

  await expect(adminPage.editBtn).toBeVisible();
  await expect(adminPage.deleteBtn).toBeVisible();
});