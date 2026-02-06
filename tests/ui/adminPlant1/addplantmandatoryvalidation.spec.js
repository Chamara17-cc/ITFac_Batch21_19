//UI-ADMIN-AP-02  Verify validation when mandatory fields are empty (Done)

import { test } from '@playwright/test';
import { addPlantPageAdmin } from '../../../pages/addPlantPageAdmin';
import { loginAsAdmin } from '../../../utils/authHelper';

test('UI-ADMIN-AP-02 | Mandatory field validation', async ({ page }) => {
  // 1️⃣ Login as Admin
  await loginAsAdmin(page);

  // 2️⃣ Open Add Plant Page
  const addPlantPage = new addPlantPageAdmin(page);
  await addPlantPage.open();

  // 3️⃣ Click Save without entering any data
  await addPlantPage.clickSave();

  // 4️⃣ Check all validation messages
  await addPlantPage.expectAllMandatoryErrors();

  // Optional: check extra message for plant name length
  await addPlantPage.expectPlantNameLengthError();
});
