const { setWorldConstructor } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { getAdminAuthContext, getUserAuthContext } = require('../utils/apiAuthHelper');

class CustomWorld {
    constructor() {
        this.response = null;
        this.categoryName = null;
    }

    async getAdminRequest() {
        // Pass the Playwright request object directly
        return await getAdminAuthContext(request); // <-- note: request, not this.request
    }

    async getUserRequest() {
        return await getUserAuthContext(request);
    }
}

setWorldConstructor(CustomWorld);
