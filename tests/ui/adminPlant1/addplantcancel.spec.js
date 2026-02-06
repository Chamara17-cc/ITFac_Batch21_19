// UI-ADMIN-AP-05 - Verify cancel button navigation
// This test checks whether clicking the Cancel button
// on the Add Plant page redirects the admin to the Plant List page

import { test, expect } from '@playwright/test';
import { addPlantPageAdmin } from '../../../pages/addPlantPageAdmin';
import { loginAsAdmin } from '../../../utils/authHelper';


// Used to ensure the admin is logged in before test execution
test.beforeEach(async ({ page }) => {

  // This opens login page, enters credentials, and submits
  await loginAsAdmin(page);
});

test('UI-ADMIN-AP-05 | Cancel add plant', async ({ page }) => {

  // Pass the Playwright page object to the page class
  const addPlantPage = new addPlantPageAdmin(page);

  // Open the Add Plant page
 
  await addPlantPage.open();

  // Click the Cancel button on the Add Plant page
  await addPlantPage.clickCancel();

  // Verify that the user is redirected to the Plant List page
await expect(page).toHaveURL('http://localhost:8080/ui/plants');
});
