const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

test('UI-ADM-PLANT-02 | Add Plant button visible', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);

  // Navigate to Plants page
  const plantPage = new PlantPage(page);
  await plantPage.open();

  // Admin-specific actions
  const adminPage = new PlantPageAdmin(page);

  // Assertion (auto-waits)
  await expect(adminPage.addPlantBtn).toBeVisible();
});
