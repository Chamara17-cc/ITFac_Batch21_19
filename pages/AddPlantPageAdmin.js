// pages/AddPlantPageAdmin.js
import { expect } from '@playwright/test';

export class AddPlantPageAdmin {
  constructor(page) {
    this.page = page;
    this.url = 'http://localhost:8080/ui/plants/add';

    // Inputs
    this.nameInput = page.locator(
      '//label[normalize-space()="Plant Name"]/following::input[1]'
    );
    this.priceInput = page.locator(
      '//label[normalize-space()="Price"]/following::input[1]'
    );
    this.quantityInput = page.locator(
      '//label[normalize-space()="Quantity"]/following::input[1]'
    );
    this.categorySelect = page.locator('select');

    // Buttons
    this.saveButton = page.locator('button.btn.btn-primary', { hasText: 'Save' });
    this.cancelButton = page.locator('a.btn.btn-secondary', { hasText: 'Cancel' });

    // Validation messages
    this.nameRequiredError = page.locator('text=Plant name is required');
    this.nameLengthError = page.locator('text=Plant name must be between 3 and 25 characters');
    this.categoryError = page.locator('text=Category is required');
    this.priceError = page.locator('text=Price is required');
    this.quantityError = page.locator('text=Quantity is required');
    this.priceGreaterThanZeroError = page.locator('text=Price must be greater than 0');
  }

  // Open Add Plant page
  async open() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.saveButton).toBeVisible();
    await expect(this.nameInput).toBeVisible();
  }

  // Click Save
  async clickSave() {
    await this.saveButton.click();
  }

  // Click Cancel
  async clickCancel() {
    await this.cancelButton.click();
  }

  // Fill fields ONLY when explicitly provided
  async fillBasicDetails({
    name = '',
    categoryIndex = null,
    price = '',
    quantity = ''
  } = {}) {
    if (name !== '') await this.nameInput.fill(name);
    if (categoryIndex !== null) {
      await this.categorySelect.selectOption({ index: categoryIndex });
    }
    if (price !== '') await this.priceInput.fill(price);
    if (quantity !== '') await this.quantityInput.fill(quantity);
  }

  // ✅ REQUIRED for UI-ADMIN-AP-02
  async expectAllMandatoryErrors() {
    await expect(this.nameRequiredError).toBeVisible();
    await expect(this.categoryError).toBeVisible();
    await expect(this.priceError).toBeVisible();
    await expect(this.quantityError).toBeVisible();
  }

  // UI-ADMIN-AP-03
  async expectPlantNameLengthError() {
    await expect(this.nameLengthError).toBeVisible();
  }

  // UI-ADMIN-AP-04
  async expectPriceError() {
    await expect(this.priceGreaterThanZeroError).toBeVisible();
  }

  // For valid cases
  async expectNoErrors() {
    await expect(this.nameRequiredError).toHaveCount(0);
    await expect(this.nameLengthError).toHaveCount(0);
    await expect(this.categoryError).toHaveCount(0);
    await expect(this.priceError).toHaveCount(0);
    await expect(this.quantityError).toHaveCount(0);
    await expect(this.priceGreaterThanZeroError).toHaveCount(0);
  }
}
