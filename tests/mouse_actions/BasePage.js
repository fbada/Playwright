const { baseUrl } = require('./config');

class BasePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = baseUrl; // Assign the imported baseUrl value
    }

    async navigate(path) {
        await this.page.goto(`${this.baseUrl}${path}`);
    }
}

module.exports = BasePage;
