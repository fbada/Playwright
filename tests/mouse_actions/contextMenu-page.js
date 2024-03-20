const BasePage = require("./BasePage");
const { test, expect } = require('@playwright/test');

class ContextMenuPage extends BasePage{
    constructor(page) {
        super(page)
        this.locators = {
            clickTargetBox: '#hot-spot',
            title:'h3'
        };
    }

     async listenAlertConfirm(message){
        this.page.on('dialog', async dialog => {
            console.log(`Alert message: ${dialog.message()}`);
            expect(dialog.message()).to.equal(message);
            await dialog.accept(); 
          });
    }

    async listenForUnexpectedAlert(timeout) {
        let alertTriggered = false;
    
        return new Promise((resolve) => {
            // Set up the dialog listener
            this.page.once('dialog', async dialog => {
                alertTriggered = true;
                await dialog.dismiss();
                resolve(true); // Immediately resolve the promise as true if a dialog is triggered
            });
    
            // Use setTimeout to wait for a specified period to see if a dialog appears
            setTimeout(() => {
                // If no dialog has been triggered by the end of the timeout, resolve the promise as false
                if (!alertTriggered) {
                    resolve(false);
                }
            }, timeout);
        });
    }
    

    async navigate(path, expectedTitle) {
        await super.navigate(path);
        const pageTitle = await this.page.textContent(this.locators.title);
        expect(pageTitle).toBe(expectedTitle);
    }
    
    async clickOnElement( clickType = 'left') {
        const options = clickType === 'right' ? { button: 'right' } : {};
        await this.page.click(this.locators.clickTargetBox, options);
    }
    
}

module.exports = ContextMenuPage;
