    class LoginPage {
        constructor(page) {
            this.page = page;
            this.url = '/ui/login';

            this.username = 'input[name="username"]';
            this.password = 'input[name="password"]';
            this.submit = 'button[type="submit"]';
        }

        async open(baseUrl) {
        await this.page.goto(`${baseUrl}/ui/login`);
        }


        async login(user, pass) {
            await this.page.fill(this.username, user);
            await this.page.fill(this.password, pass);
            await this.page.click(this.submit);
        }
    }

    module.exports = { LoginPage };
