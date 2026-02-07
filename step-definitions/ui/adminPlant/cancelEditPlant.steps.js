const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

When('admin starts editing a plant', async function () {
  this.adminPage = new PlantPageAdmin(this.page);

  await this.adminPage.waitForPageLoad();
  await this.adminPage.expectEditDeleteVisible();
  await this.adminPage.editBtn.click();
});

When('admin clicks cancel button', async function () {
  await this.adminPage.cancelBtn.click();
});

Then('admin should be redirected to plant list', async function () {
  await expect(this.page).toHaveURL('/ui/plants');
});