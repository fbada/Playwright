const{Given, When, Then} = require('@cucumber/cucumber');
const HerokuLoginPage = require('../../pages/herokuLoginPage');
let herokuLoginPage;


       
         Given('I am on the demo application', async function () {
           herokuLoginPage = new HerokuLoginPage(this.page);
           await herokuLoginPage.navigateTo();
         });
       
  
       
         Given('I enter the username {string}', async function (username) {
          await herokuLoginPage.enterUsername(username);
         });
       

       
         Given('I enter the password {string}',async function (password) {
           await herokuLoginPage.enterPassword(password);
         });
       

       
         When('I click on the login button', async function () {
           await herokuLoginPage.clickLoginButton();
         });

       
         Then('I verify the title of the page is {string}', async function (title) {
            await herokuLoginPage.checkTitle(title);
         });
       
         Then('I should see the message {string}', async function (message) {
            await herokuLoginPage.assertMessage(message);
         });

         Then('I would see the message {string}',{ timeout: 10000 }, async function (message) {
            await herokuLoginPage.assertInvalidMessage(message);
          });
       
          Given('I have logged in successfully to the demo application', async function () {
            herokuLoginPage = new HerokuLoginPage(this.page);
            await herokuLoginPage.navigateTo();
            await herokuLoginPage.login("tomsmith", "SuperSecretPassword!")
          });
        
  
        
          When('I click on the logout button', async function () {
            await herokuLoginPage.clickLogoutButton();
          });
        

    
          Then('I should be redirected to the login page',async function () {
            await herokuLoginPage.assertTitleLogin();
          });