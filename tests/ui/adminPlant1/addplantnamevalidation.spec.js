// UI-ADMIN-AP-03 - Verify plant name length validation
// This test verifies validation rules for Plant Name length:
// - Less than 3 characters (invalid)
// - More than 25 characters (invalid)
// - Between 3 and 25 characters (valid)

import { test } from '@playwright/test';
import { AddPlantPageAdmin } from '../../../pages/addPlantPageAdmin';
import { loginAsAdmin } from '../../../utils/authHelper';

// Ensures the admin is logged in before performing actions
test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});
test('UI-ADMIN-AP-03 | Plant name length validation', async ({ page }) => {

  // Pass Playwright page instance
  const addPlantPage = new AddPlantPageAdmin(page);
  await addPlantPage.open();

  
  // CASE 1: Plant name < 3 characters (INVALID)
  
  await addPlantPage.fillBasicDetails({
    name: 'AB',              
    categoryIndex: 1,        
    price: '100',           
    quantity: '10'        
  });

  await addPlantPage.clickSave();

  // Verify that plant name length validation error is displayed
  await addPlantPage.expectPlantNameLengthError();

  
  // Reset form for next case
  await page.reload();
  await addPlantPage.open();

  // CASE 2: Plant name > 25 characters (INVALID)
  

  // Fill the form with a very long plant name (>25 characters)
  await addPlantPage.fillBasicDetails({
    name: 'ThisPlantNameIsWayTooLongToBeValid', 
    categoryIndex: 1,                            
    price: '100',                              
    quantity: '10'                            
  });

  // Click Save to trigger validation
  await addPlantPage.clickSave();

  // Verify length validation error appears again
  await addPlantPage.expectPlantNameLengthError();

 // Reset form for next case
  await page.reload();

  await addPlantPage.open();

 // CASE 3: Plant name between 3–25 characters (VALID)
  await addPlantPage.fillBasicDetails({
    name: 'Valid Plant Name', 
    categoryIndex: 1,         
    price: '100',             
    quantity: '10'          
  });


  await addPlantPage.clickSave();

  // Verify that NO validation errors are displayed
  await addPlantPage.expectNoErrors();
});
