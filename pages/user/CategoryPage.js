const { BaseCategoryPage } = require("../BaseCategoryPage");

class CategoryPage extends BaseCategoryPage {
    constructor(page) {
        super(page);
        this.url = 'http://localhost:8080/ui/categories';
        this.addCategoryButton = page.locator('a:has-text("Add Category")');
        this.editButtons = page.locator('a[title="Edit"]');
        this.deleteButton = page.locator('button[title="Delete"]');
        this.categoryRows = page.locator('table tbody tr');
        this.noCategoryMessage = page.locator('table tbody tr td').first(); // first td when table empty
    }

    async open() {
        await this.page.goto(this.url);
    }

    async isCategoryTableEmpty() {
        const rowCount = await this.categoryRows.count();
        return rowCount === 0;
    }

    async getNoCategoryText() {
        return await this.noCategoryMessage.textContent();
    }
}

module.exports = { CategoryPage };
