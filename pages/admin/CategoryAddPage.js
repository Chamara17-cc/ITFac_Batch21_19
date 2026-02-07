class CategoryAddPage {
    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:8080/ui/categories/add';
        this.categoryNameInput = page.locator('form input#name');
        this.saveButton = page.locator('button[type="submit"]');
        this.validationError = page.locator('.invalid-feedback');
    }

    async open() {
        await this.page.goto(this.url);
    }

    async clickSave() {
        await this.saveButton.click();
    }

    async getValidationMessage() {
        return await this.validationError.innerText();
    }
}

module.exports = { CategoryAddPage };
