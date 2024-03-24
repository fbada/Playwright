const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
class guruContextPage extends BasePage{
    constructor(page){

        super(page);
        this.locators= {
            contextClick:"button[ondblclick='myFunction()']",
            hoverImage: "//div[@id='content']//img",
            secImage: (userNumber) => `//h5[.='name: user${userNumber}']`
        };
    }

    

    async doubleclick(element){
    
        await this.page.dblclick(element);
    }

    async listenAlertConfirm(message){
        this.page.on('dialog', async dialog => {
            console.log(`Alert message: ${dialog.message()}`);
            expect(dialog.message()).to.equal(message);
            await dialog.accept(); 
          }); //You double clicked me.. Thank You..
    }

    async hoverAndConfirmText(index) {
        try {
            const images = this.page.locator(this.locators.hoverImage);
            await images.nth(index).hover();
    
            const userNumber = index + 1;
            const userLocator = this.locators.secImage(userNumber);
            const userElement = await this.page.locator(userLocator).first();
    
            await expect(userElement).toBeVisible();
    
            const actualText = await userElement.innerText();
            const expectedText = `name: user${userNumber}`;
    
            console.log(`Hovered over image at index ${index}. Expected text: "${expectedText}". Found text: "${actualText.trim()}".`);
            return true;
            
        } catch (error) {
            console.error(`Error occurred while hovering and confirming text: ${error}`);
            return false;
        }
    }
    
    
    
    
    
}    
   

module.exports = guruContextPage;