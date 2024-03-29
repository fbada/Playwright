
const {expect} = require('@playwright/test');
const{page}=require('../features/Hooks/hooks')

class HerokuLoginPage {

constructor(page){
    this.page = page;
    this.usrInput = "#username";
    this.passInput = "#password";
    this.loginButton = ".fa";
    this.confirmMsg=".subheader";
    this.invalidLoginError="#flash";
    this.logoutButton="//i[@class='icon-2x icon-signout']";
    this.titleLogin="h2";
}
async navigateTo(){
    await this.page.goto("https://the-internet.herokuapp.com/login", {waitUntl:"domcontentloaded"});
  }

  async login(username, password){
    await this.assertTitleLogin();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.assertMessage("Welcome to the Secure Area.");

    
  }

  async enterUsername(username){
    await this.page.fill(this.usrInput, username);
  }

  async enterPassword(password){
    await this.page.fill(this.passInput, password);
  }

  async clickLoginButton(){
    await this.page.click(this.loginButton);
  }

  async clickLogoutButton(){
    await this.page.click(this.logoutButton);
  }

  async checkTitle(title){
    await expect(this.page).toHaveTitle(title);
  }

  async assertMessage(message){
    const messageLocator = this.page.locator(this.confirmMsg);
    await expect(messageLocator).toContainText(message);
  }

  async assertInvalidMessage(message){
    const msg = this.page.locator(this.invalidLoginError);
    await expect(msg).toContainText(message)
  }
  
  async assertTitleLogin(){
    const titleLogin=this.page.locator(this.titleLogin);
    await expect(titleLogin).toContainText("Login");
    await expect(this.page).toHaveURL("https://the-internet.herokuapp.com/login");
  }

}

module.exports = HerokuLoginPage;
