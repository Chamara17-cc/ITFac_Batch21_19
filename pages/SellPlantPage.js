class SellPlantPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('h3', { hasText: 'Sell Plant' });
    this.plantSelect = page.locator('#plantId');
    this.quantityInput = page.locator('#quantity');
    this.sellButton = page.locator('button', { hasText: 'Sell' });
    this.cancelButton = page.locator('a', { hasText: 'Cancel' });
  }

  async goto() {
    await this.page.goto('/ui/sales/new');
  }

  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ timeout: 5000 });
  }

  async sellPlant(plantName, quantity) {
    await this.plantSelect.selectOption({ label: plantName });
    await this.quantityInput.fill(String(quantity));
    await this.sellButton.click();
  }
}

module.exports = { SellPlantPage };
