//UI-ADMIN-AP-05 - Verify cancel button navigation (Done)

import { test, expect } from '@playwright/test';
import { AddPlantPageAdmin } from '../../../pages/addPlantPageAdmin';
import { loginAsAdmin } from '../../../utils/authHelper';

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test('UI-ADMIN-AP-05 | Cancel add plant', async ({ page }) => {
  const addPlantPage = new AddPlantPageAdmin(page);

  await addPlantPage.open();
  await addPlantPage.clickCancel();

  // ✅ Verify redirection to Plant List page
  await expect(page).toHaveURL('http://localhost:8080/ui/plants');
});
