const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

When('admin clicks edit button', async function () {
  this.adminPage = new PlantPageAdmin(this.page);

  await this.adminPage.waitForPageLoad();
  await this.adminPage.expectEditDeleteVisible();
  await this.adminPage.editBtn.click();
});

Then('save button should be visible', async function () {
  await expect(this.adminPage.saveBtn).toBeVisible();
});