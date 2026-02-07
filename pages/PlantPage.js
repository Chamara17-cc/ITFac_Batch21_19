const { expect } = require('@playwright/test');

class PlantPage {
  constructor(page) {
    this.page = page;
    this.url = '/ui/plants';

    this.tableRows = page.locator('table tbody tr');
    this.plantNameCells = page.locator('table tbody tr td:nth-child(1)');

    this.nameColumnHeader = page.getByRole('columnheader', { name: 'Name' });
    this.categoryColumnHeader = page.getByRole('columnheader', { name: 'Category' });
    this.priceColumnHeader = page.getByRole('columnheader', { name: 'Price' });
    this.stockColumnHeader = page.getByRole('columnheader', { name: 'Stock' });

    this.searchInput = page.getByPlaceholder(/search/i);
    this.categoryFilter = page.locator('select');
    this.lowStockBadge = page.getByText(/low/i);
    this.noPlantsMessage = page.getByText(/no plants found/i);
  }


  async open() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');

    const rowsCount = await this.tableRows.count();

    if (rowsCount > 0) {
        await this.tableRows.first().waitFor({ state: 'visible' });
    } else {
        await this.page.locator('text=No plants found').first().waitFor({ state: 'visible' });
    }
}

async expectNoPlantsMessage() {
    const msg = this.page.locator('text=No plants found');
    await expect(msg.first()).toBeVisible();
}

  async getPlantCount() {
    return await this.tableRows.count();
  }

  async getPlantNames() {
    return await this.plantNameCells.allTextContents();
  }

  async searchPlant(name) {
    await this.searchInput.fill(name);
  }

  async filterByCategory(category) {
    await this.categoryFilter.selectOption({ label: category });
  }

  async expectLowStockVisible() {
    if ((await this.tableRows.count()) === 0) {
        throw new Error('No plants in the table to check low stock.');
    }

    // Check that at least one visible low stock badge exists
    const lowBadge = this.page.locator('td >> span:has-text("Low")');
    await expect(lowBadge.first()).toBeVisible();
}


  
}

module.exports = { PlantPage };
