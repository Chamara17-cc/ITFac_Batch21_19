const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

test('UI-ADM-PLANT-04 | Edit plant details', async ({ page }) => {
  await loginAsAdmin(page);

  const adminPage = new PlantPageAdmin(page);

  await page.goto('/ui/plants');
  await adminPage.waitForPageLoad();
  await adminPage.expectEditDeleteVisible();

  await adminPage.editBtn.click();
  await expect(adminPage.saveBtn).toBeVisible();
});

