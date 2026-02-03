// Plant Page for User (UI)
class PlantPageUser {
  constructor(page) {
    this.page = page;
    this.url = '/ui/plants';

    // Columns
    this.nameColumnHeader = page.getByRole('columnheader', { name: 'Name' });
    this.plantNameCells = page.locator('table tbody tr td:nth-child(1)');

    // Price column (new)
    this.priceColumnHeader = page.getByRole('link', { name: 'Price' });
    this.priceColumnCells = page.locator('table tbody tr td:nth-child(3)'); // adjust nth-child if Price column changes

    // Actions (hidden for user)
    this.editButtons = page.locator('button', { hasText: 'Edit' });
    this.deleteButtons = page.locator('button', { hasText: 'Delete' });

    // Search & Reset
    this.searchInput = page.locator('input[placeholder="Search plant"]');
    this.resetBtn = page.locator('a.btn', { hasText: 'Reset' });
  }

  // ✅ Open plant page
  async open() {
    await this.page.goto(this.url);
    await this.plantNameCells.first().waitFor(); // ensure table loaded
  }

  // ✅ Sorting: click Name column header
  async clickNameColumn() {
    await this.nameColumnHeader.click();
    await this.plantNameCells.first().waitFor(); // wait table to update
  }

  // ✅ Sorting: click Price column header
  async clickPriceColumn() {
    await this.priceColumnHeader.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ✅ Get plant names from table
  async getPlantNames() {
    return await this.plantNameCells.allTextContents();
  }

    // ✅ Get numeric prices from table
  async getPlantPrices() {
    const priceValues = await this.priceColumnCells.allTextContents();

    // Convert everything to string first, then remove non-numeric chars
    return priceValues.map(price =>
      Number(String(price).replace(/[^0-9.-]+/g, ''))
    );
  }


  // ✅ Count visible Edit buttons
  async getVisibleEditCount() {
    const count = await this.editButtons.count();
    let visibleCount = 0;
    for (let i = 0; i < count; i++) {
      if (await this.editButtons.nth(i).isVisible()) visibleCount++;
    }
    return visibleCount;
  }

  // ✅ Count visible Delete buttons
  async getVisibleDeleteCount() {
    const count = await this.deleteButtons.count();
    let visibleCount = 0;
    for (let i = 0; i < count; i++) {
      if (await this.deleteButtons.nth(i).isVisible()) visibleCount++;
    }
    return visibleCount;
  }

  // ✅ Search helper
  async searchPlant(searchText) {
    await this.searchInput.fill(searchText);
    await this.searchInput.press('Enter');
    await this.plantNameCells.first().waitFor();
  }

  // ✅ Reset helper
  async resetSearch() {
    await this.resetBtn.click();
    await this.plantNameCells.first().waitFor();
  }
}

module.exports = { PlantPageUser };