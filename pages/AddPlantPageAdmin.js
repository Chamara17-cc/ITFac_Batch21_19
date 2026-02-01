// Plant Page Admin (UI)

class AddPlantPage {
  constructor(page) {
    this.page = page;

    // Form fields
    this.plantName = page.locator('#name');
    this.category  = page.locator('#categoryId');
    this.price     = page.locator('#price');
    this.quantity  = page.locator('#quantity');

    // Buttons
    this.saveBtn   = page.getByRole('button', { name: 'Save' });
    this.cancelBtn = page.getByRole('link', { name: 'Cancel' });

    // Success message
    this.successMessage = page.locator('.toast-success');
  }

  // Open Add Plant page
  async open() {
    await this.page.goto('/ui/plants/add');
  }

  // Add plant with details
  async addPlant(name, categoryLabel, price, quantity) {
    // Fill plant name
    await this.plantName.fill(name);

    // ✅ Wait until the category option exists
    await this.category.locator('option', { hasText: categoryLabel }).waitFor();

    // Select category by visible label
    await this.category.selectOption({ label: categoryLabel });

    // Fill price and quantity
    await this.price.fill(price.toString());
    await this.quantity.fill(quantity.toString());

    // Click Save
    await this.saveBtn.click();
  }
}

module.exports = { AddPlantPage };
