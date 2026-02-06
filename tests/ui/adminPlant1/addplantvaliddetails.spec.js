//UI-ADMIN-AP-01 - Verify that admin can add a plant using valid inputs (Done)

import { test, expect } from '@playwright/test';
import { addPlantPageAdmin } from '../../../pages/addPlantPageAdmin';
import { loginAsAdmin } from '../../../utils/authHelper';

test('UI-ADMIN-AP-01 | Add plant with valid details', async ({ page }) => {

  // 1️⃣ Admin login
  await loginAsAdmin(page);

  // 2️⃣ Open Add Plant page
  const addPlantPage = new addPlantPageAdmin(page);
  await addPlantPage.open();

  // 🔑 Generate UNIQUE plant name
  const uniquePlantName = `TestPlant_${Date.now()}`;

  // 3️⃣ Fill valid details
  await addPlantPage.fillBasicDetails({
    name: uniquePlantName,
    categoryIndex: 1,
    price: '120',
    quantity: '15'
  });

  // 4️⃣ Click Save
  await addPlantPage.clickSave();

  // 5️⃣ Verify redirect to Plant List page
  await expect(page).toHaveURL(/\/ui\/plants$/);

  // 6️⃣ Verify success message on Plant List page
  const successMessage = page.locator(
    'text=/plant added successfully/i'
  );
  await expect(successMessage).toBeVisible({ timeout: 10000 });
});
