const { BaseCategoryPage } = require("../BaseCategoryPage");

class CategoryPage extends BaseCategoryPage {
    constructor(page) {
        super(page);
        this.url = '/ui/categories';
        this.categorynameCell = page.locator('form input[name="name"]');
    }

    async open() {
        await this.page.goto(this.url);
    }
      
}

module.exports = { CategoryPage };
