class CategoryPage {
    constructor(page) {
        this.page = page;
        this.url = '/ui/categories';

        // ✅ FIX: locator, not string
        this.tableRows = page.locator('table tbody tr');

        this.pageTitle = page.locator('h3.mb-4', { hasText: 'Categories' });
        this.nextButton = page.locator('a.page-link', { hasText: 'Next' });
        this.prevButton = page.locator('a.page-link', { hasText: 'Previous' });

        this.searchInput = page.locator('input[name="name"]');
        this.searchButton = page.locator('button', { hasText: 'Search' });
        this.categorynameCell = page.locator('form input[name="name"]');
        this.categoryNameInput = page.locator('form input#name');
        this.saveButton = page.locator('button[type="submit"]');
        this.validationError = page.locator('.invalid-feedback');

    }

    async open() {
        await this.page.goto(this.url);
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

    async searchByName(name) {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(name);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getFirstRowName() {
        return await this.tableRows
            .first()
            .locator('td:nth-child(2)')
            .innerText();
    }
    
}

module.exports = { CategoryPage };
