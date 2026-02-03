// const { test, expect } = require('@playwright/test');
// const { loginAsAdmin } = require('../../../utils/authHelper');
// const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

// test('UI-ADM-PLANT-05 | Cancel edit plant', async ({ page }) => {
//   await loginAsAdmin(page);

//   const adminPage = new PlantPageAdmin(page);
//   await adminPage.editBtn.click();
//   await adminPage.cancelBtn.click();

//   await expect(page).toHaveURL('/ui/plants');
// });

const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

test('UI-ADM-PLANT-05 | Cancel edit plant', async ({ page }) => {
  await loginAsAdmin(page);

  const adminPage = new PlantPageAdmin(page);

  await page.goto('/ui/plants');
  await adminPage.waitForPageLoad();
  await adminPage.expectEditDeleteVisible();

  await adminPage.editBtn.click();
  await adminPage.cancelBtn.click();

  await expect(page).toHaveURL('/ui/plants');
});

