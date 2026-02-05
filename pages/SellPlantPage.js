class SellPlantPage {
  constructor(page) {
    this.page = page;

    // Page elements
    this.pageTitle = page.locator('h3', { hasText: 'Sell Plant' });
    this.plantSelect = page.locator('#plantId');
    this.quantityInput = page.locator('#quantity');
    this.sellButton = page.locator('button', { hasText: 'Sell' });
    this.cancelButton = page.locator('a', { hasText: 'Cancel' });
  }

  // Go to the Sell Plant page
  async goto() {
    await this.page.goto('/ui/sales/new');
    await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
  }

  // Verify page loaded correctly
  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Sell a plant
   * @param {string} plantValue - the value of the plant option (e.g., "2" or "3")
   * @param {number} quantity - quantity to sell
   */
  async sellPlant(plantValue, quantity) {
    // Wait for dropdown to be ready
    await this.plantSelect.waitFor({ state: 'visible', timeout: 5000 });

    // Check if the option exists
    const optionExists = await this.plantSelect.locator(`option[value="${plantValue}"]`).count();
    if (optionExists === 0) {
      throw new Error(`Option with value "${plantValue}" not found in Plant dropdown`);
    }

    // Select the plant by value
    await this.plantSelect.selectOption({ value: plantValue });

    // Fill quantity
    await this.quantityInput.fill(String(quantity));

    // Click Sell
    await this.sellButton.click();
  }

  // Click Cancel button
  async cancel() {
    await this.cancelButton.click();
  }
}

module.exports = { SellPlantPage };