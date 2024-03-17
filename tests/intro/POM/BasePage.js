// BasePage.js
class BasePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://formy-project.herokuapp.com';
    }

    async navigate(path) {
        await this.page.goto(`${this.baseUrl}${path}`);
    }
}

module.exports = BasePage;
