const { BaseCategoryPage } = require("../BaseCategoryPage");

class CategoryPage extends BaseCategoryPage {
    constructor(page) {
        super(page);
        this.url = '/ui/categories';
        this.addCategoryButton = page.locator('a:has-text("Add Category")');
        this.editButtons = page.locator('a[title="Edit"]');
        this.deleteButton = page.locator('button[title="Delete"]');

    }
    async open() {
        await this.page.goto(this.url);
    }

}
module.exports = { CategoryPage };