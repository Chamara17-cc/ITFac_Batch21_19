//UI-ADMIN-AP-04 - Verify price must be greater than zero (Done)

import { test } from '@playwright/test';
import { addPlantPageAdmin } from '../../../pages/addPlantPageAdmin';
import { loginAsAdmin } from '../../../utils/authHelper';

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test('UI-ADMIN-AP-04 | Price validation', async ({ page }) => {
  const addPlantPage = new addPlantPageAdmin(page);
  await addPlantPage.open();

  // ✅ CASE 1: Price = 0
  await addPlantPage.fillBasicDetails({
    name: 'Green Rose',     // ✅ VALID (3–25 chars)
    categoryIndex: 1,       // ✅ Valid category
    quantity: '10',         // ✅ Valid quantity
    price: '0'              // ❌ Invalid price
  });

  await addPlantPage.clickSave();
  await addPlantPage.expectPriceError();

  // Reload for next scenario
  await page.reload();
  await addPlantPage.open();

  // ✅ CASE 2: Price = negative
  await addPlantPage.fillBasicDetails({
    name: 'Blue Orchid',    // ✅ VALID
    categoryIndex: 1,
    quantity: '5',
    price: '-50'            // ❌ Invalid price
  });

  await addPlantPage.clickSave();
  await addPlantPage.expectPriceError();
});
