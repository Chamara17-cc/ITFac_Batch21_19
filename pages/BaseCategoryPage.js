class BaseCategoryPage {
    constructor(page) {
        this.page = page;
        this.tableRows = page.locator('table tbody tr');
        this.pageTitle = page.locator('h3.mb-4', { hasText: 'Categories' });
        this.nextButton = page.locator('a.page-link', { hasText: 'Next' });
        this.prevButton = page.locator('a.page-link', { hasText: 'Previous' });
        this.searchInput = page.locator('input[name="name"]');
        this.searchButton = page.locator('button', { hasText: 'Search' });
        this.resetButton = page.locator('a:has-text("Reset")');

    }
    pageHeader() {
        return this.pageTitle;
    }

    async fetCategoryCount() {
        return await this.tableRows.count();
    }

    async clickNext() {
        await this.nextButton.click();
        await this.page.waitForURL(/page=\d+/);
    }

    getCurrentPageNumber() {
        const url = new URL(this.page.url());
        return url.searchParams.get('page');
    }
    async getFirstRowName() {
        return await this.tableRows
            .first()
            .locator('td:nth-child(2)')
            .innerText();
    }
    async searchByName(name) {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(name);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { BaseCategoryPage };