class SalesPage {


  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('h1, h2, .sales, .Sales').first();
    this.noSalesMessage = page.locator('table tbody tr td[colspan="5"]');
    this.sellPlantButton = page.locator('a[href="/ui/sales/new"]');
    this.deleteButtons = page.locator('form[action^="/ui/sales/delete"] button');
    this.soldAtCells = page.locator('table tbody tr td:nth-child(4)');

    // Pagination
    this.paginationItems = page.locator('ul.pagination li.page-item');
    this.nextButton = page.locator('ul.pagination li >> text=Next');
    this.prevButton = page.locator('ul.pagination li >> text=Previous');
  }

  // Dynamic getters

  get tableRows() {
    return this.page.locator('table tbody tr');
  }


  async goto(baseUrl) {
  await this.page.goto(`${baseUrl}/ui/sales`);
  }


  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ timeout: 5000 });
  }

  async verifyNoSalesMessage() {
    await this.noSalesMessage.waitFor({ timeout: 5000 });
  }

  async verifySellPlantButtonVisible() {
    await this.sellPlantButton.waitFor({ timeout: 5000 });
  }

    async verifyDeleteButtonVisible() {
    await this.deleteButtons.first().waitFor({ timeout: 5000 });
  }

    async getSoldAtDates() {
    const texts = await this.soldAtCells.allTextContents();
    return texts.map(t => new Date(t.replace(' ', 'T')));
  }

// Pagination methods

async getRowCount() {
    return await this.tableRows.count();
  }

  async goToNextPage() {
    if (await this.nextButton.isEnabled()) {
      await this.nextButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async goToPrevPage() {
    if (await this.prevButton.isEnabled()) {
      await this.prevButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

}

module.exports = { SalesPage };
