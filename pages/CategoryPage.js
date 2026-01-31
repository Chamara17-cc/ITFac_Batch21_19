class CategoryPage {
    constructor(page) {
        this.page = page;
        this.url = '/ui/categories';
        this.tableRows = 'table tbody tr';
        this.pageTitle = page.locator('h3.mb-4', { hasText: 'Categories' });
    }
    async open() {
        await this.page.goto(this.url);
    }
    pageHeader() {
        return this.pageTitle;
    }

    async fetCategoryCount() {
        return await this.page.locator(this.tableRows).count();
    }

}
module.exports = { CategoryPage };