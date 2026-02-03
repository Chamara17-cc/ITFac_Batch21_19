class PlantPage {
  constructor(page) {
    this.page = page;
    this.url = '/ui/plants';

    // Table
    this.tableRows = page.locator('table tbody tr');
    this.plantNameCells = page.locator('table tbody tr td:nth-child(1)');

    // Columns
    this.nameColumnHeader = page.getByRole('columnheader', { name: 'Name' });
    this.categoryColumnHeader = page.getByRole('columnheader', { name: 'Category' });
    this.priceColumnHeader = page.getByRole('columnheader', { name: 'Price' });
    this.stockColumnHeader = page.getByRole('columnheader', { name: 'Stock' });
  }

  async open() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle'); // ensure page fully loaded
    if ((await this.tableRows.count()) > 0) {
      await this.tableRows.first().waitFor({ state: 'visible' });
    }
  }

  async getPlantCount() {
    return await this.tableRows.count();
  }

  async getPlantNames() {
    return await this.plantNameCells.allTextContents();
  }
}

module.exports = { PlantPage };
