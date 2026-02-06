class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:8080/ui/login'; // ✅ FULL URL

        this.username = 'input[name="username"]';
        this.password = 'input[name="password"]';
        this.submit = 'button[type="submit"]';
    }

    async open() {
        await this.page.goto(this.url);
    }

    async login(user, pass) {
        await this.page.fill(this.username, user);
        await this.page.fill(this.password, pass);
        await this.page.click(this.submit);
    }
}

module.exports = { LoginPage };
