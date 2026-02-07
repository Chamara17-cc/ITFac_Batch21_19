// pages/AddPlantPageAdmin.js
// This file represents the Page Object Model (POM) for the
// "Add Plant" page in the Admin UI

import { expect } from '@playwright/test';

// Export the AddPlantPageAdmin class so it can be used in test files
export class addPlantPageAdmin {

  // Constructor runs when a new object of this class is created
  constructor(page) {

    // Store the Playwright page instance
    this.page = page;


    this.url = 'http://localhost:8080/ui/plants/add';

    
    // INPUT FIELD LOCATORS
  

    // Locate the Plant Name input using label text and XPath
    this.nameInput = page.locator(
      '//label[normalize-space()="Plant Name"]/following::input[1]'
    );

    // Locate the Price input field
    this.priceInput = page.locator(
      '//label[normalize-space()="Price"]/following::input[1]'
    );

    // Locate the Quantity input field
    this.quantityInput = page.locator(
      '//label[normalize-space()="Quantity"]/following::input[1]'
    );

    // Locate the Category dropdown (select element)
    this.categorySelect = page.locator('select');

   
    // BUTTON LOCATORS
    

    // Locate the Save button using class and visible text
    this.saveButton = page.locator(
      'button.btn.btn-primary',
      { hasText: 'Save' }
    );

    // Locate the Cancel button
    this.cancelButton = page.locator(
      'a.btn.btn-secondary',
      { hasText: 'Cancel' }
    );

     // VALIDATION MESSAGE LOCATORS
     // Error message when plant name is empty
    this.nameRequiredError = page.locator(
      'text=Plant name is required'
    );

    // Error message when plant name length is invalid
    this.nameLengthError = page.locator(
      'text=Plant name must be between 3 and 25 characters'
    );

    // Error message when category is not selected
    this.categoryError = page.locator(
      'text=Category is required'
    );

    // Error message when price is empty
    this.priceError = page.locator(
      'text=Price is required'
    );

    // Error message when quantity is empty
    this.quantityError = page.locator(
      'text=Quantity is required'
    );

    // Error message when price is less than or equal to zero
    this.priceGreaterThanZeroError = page.locator(
      'text=Price must be greater than 0'
    );
  }

  // PAGE ACTION METHODS
// Method to open the Add Plant page
  async open() {

    // Navigate to the Add Plant URL
    await this.page.goto(this.url);

    // Wait until all network requests are finished
    await this.page.waitForLoadState('networkidle');

    // Verify Save button is visible (page loaded correctly)
    await expect(this.saveButton).toBeVisible();

    // Verify Plant Name input is visible
    await expect(this.nameInput).toBeVisible();
  }

  // Method to click the Save button
  async clickSave() {
    await this.saveButton.click();
  }

  // Method to click the Cancel button
  async clickCancel() {
    await this.cancelButton.click();
  }

  // FORM FILLING METHOD

  // Fill only the fields that are provided
  // This allows testing different validation scenarios
  async fillBasicDetails({
    name = '',
    categoryIndex = null,
    price = '',
    quantity = ''
  } = {}) {

    // Fill plant name if value is provided
    if (name !== '') {
      await this.nameInput.fill(name);
    }

    // Select category only if index is provided
    if (categoryIndex !== null) {
      await this.categorySelect.selectOption({ index: categoryIndex });
    }

    // Fill price if provided
    if (price !== '') {
      await this.priceInput.fill(price);
    }

    // Fill quantity if provided
    if (quantity !== '') {
      await this.quantityInput.fill(quantity);
    }
  }

  // VALIDATION ASSERTION METHODS

  // Used in UI-ADMIN-AP-02
  // Verifies all mandatory field errors are shown
  async expectAllMandatoryErrors() {
    await expect(this.nameRequiredError).toBeVisible();
    await expect(this.categoryError).toBeVisible();
    await expect(this.priceError).toBeVisible();
    await expect(this.quantityError).toBeVisible();
  }

  // Used in UI-ADMIN-AP-03
  // Verifies plant name length validation error
  async expectPlantNameLengthError() {
    await expect(this.nameLengthError).toBeVisible();
  }

  // Used in UI-ADMIN-AP-04
  // Verifies price greater than zero validation
  async expectPriceError() {
    await expect(this.priceGreaterThanZeroError).toBeVisible();
  }

  // Used when form submission is valid
  // Confirms that NO validation errors are displayed
  async expectNoErrors() {
    await expect(this.nameRequiredError).toHaveCount(0);
    await expect(this.nameLengthError).toHaveCount(0);
    await expect(this.categoryError).toHaveCount(0);
    await expect(this.priceError).toHaveCount(0);
    await expect(this.quantityError).toHaveCount(0);
    await expect(this.priceGreaterThanZeroError).toHaveCount(0);
  }
}
