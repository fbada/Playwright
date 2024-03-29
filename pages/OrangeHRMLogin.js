const{expect} = require('@playwright/test')
class HRMloginPage{

    constructor(page){
        this.page = page;
        this.usernameInput = page.locator("input[placeholder='Username']"); 
        this.passwordInput = page.locator("input[placeholder='Password']"); 
        this.submitButton = page.locator(".oxd-button");
        this.confirmElem = page.locator(".oxd-text--h6");

    }



    async goto() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", {waitUntil: "domcontentloaded"});
    }
    

    async enterCreds(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickSubmit(){
    await this.submitButton.click();
    }

    async checkDashboardElement(){
        await expect(this.confirmElem).toBeVisible();
    }
}
module.exports = {HRMloginPage};