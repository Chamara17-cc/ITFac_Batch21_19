import { expect } from '@playwright/test';

export class AddPlantPageAdmin {
  constructor(page) {
    this.page = page;
    this.url = 'http://localhost:8080/ui/plants/add';

    // Inputs
    this.nameInput = page.locator('//label[normalize-space()="Plant Name"]/following::input[1]');
    this.priceInput = page.locator('//label[normalize-space()="Price"]/following::input[1]');
    this.quantityInput = page.locator('//label[normalize-space()="Quantity"]/following::input[1]');
    this.categorySelect = page.locator('select');

    // Save button
    this.saveButton = page.locator('button.btn.btn-primary', { hasText: 'Save' });

    // Validation messages
    this.nameRequiredError = page.locator('text=Plant name is required');
    this.nameLengthError = page.locator('text=Plant name must be between 3 and 25 characters');
    this.categoryError = page.locator('text=Category is required');
    this.priceError = page.locator('text=Price is required');
    this.quantityError = page.locator('text=Quantity is required');

    // ✅ Price > 0 validation
   // Price validation error (EXACT match)
this.priceGreaterThanZeroError = page.locator(
  'text=Price must be greater than 0'
);

  }

  async open() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.saveButton).toBeVisible();
    await expect(this.nameInput).toBeVisible();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async fillBasicDetails({
    name = '',
    categoryIndex = 1,
    price = '',
    quantity = ''
  } = {}) {
    if (name) await this.nameInput.fill(name);
    if (categoryIndex) await this.categorySelect.selectOption({ index: categoryIndex });
    if (price) await this.priceInput.fill(price);
    if (quantity) await this.quantityInput.fill(quantity);
  }

  async expectAllMandatoryErrors() {
    await expect(this.nameRequiredError).toBeVisible();
    await expect(this.categoryError).toBeVisible();
    await expect(this.priceError).toBeVisible();
    await expect(this.quantityError).toBeVisible();
  }

  async expectPlantNameLengthError() {
    await expect(this.nameLengthError).toBeVisible();
  }

  // ✅ NEW (for UI-ADMIN-AP-04)
  async expectPriceError() {
  await expect(this.priceGreaterThanZeroError).toBeVisible();
}

  async expectNoErrors() {
    await expect(this.nameRequiredError).toHaveCount(0);
    await expect(this.nameLengthError).toHaveCount(0);
    await expect(this.categoryError).toHaveCount(0);
    await expect(this.priceError).toHaveCount(0);
    await expect(this.quantityError).toHaveCount(0);
    await expect(this.priceGreaterThanZeroError).toHaveCount(0);
  }
}
