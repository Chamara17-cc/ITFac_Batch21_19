const { expect } = require('@playwright/test');

class PlantPageAdmin {
  constructor(page) {
    this.page = page;

    this.addPlantBtn = page.getByRole('link', { name: /add\s*a\s*plant/i });
    this.editBtn = page.locator('a[title="Edit"]').first();
    this.deleteBtn = page.locator('form[action*="/plants/delete"] button').first();
    this.cancelBtn = page.getByRole('link', { name: 'Cancel' });
  }

  get saveBtn() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async expectAddButtonVisible() {
    await expect(this.addPlantBtn).toBeVisible({ timeout: 15000 });
  }

  async expectEditDeleteVisible() {
    await expect(this.editBtn).toBeVisible({ timeout: 15000 });
    await expect(this.deleteBtn).toBeVisible({ timeout: 15000 });
  }
}

module.exports = { PlantPageAdmin };
