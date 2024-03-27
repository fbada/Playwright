// DragAndDrop.js
const { expect } = require('@playwright/test');
const logger = require('../../logger'); 
class DragAndDrop {
    constructor(page) {
        this.page = page;
        this.locators = {
            draggable: "//div[@class='demo-section']/div[@id='draggable']",
            blueBox: "//div[@id='droptarget']/div[@class='test1']",
            orgBox: "//div[@id='droptarget']/div[@class='test2']",
            acceptCookie: '#onetrust-accept-btn-handler',
            wrongElement: "//a[@class='kd-link active']"
        };
    }

    async initialState(){
        await expect(this.page.locator(this.locators.blueBox)).toContainText("Drag the small circle here ...", { timeout: 10000 });

        await expect(this.page.locator(this.locators.orgBox)).toContainText("... Or here."), { timeout: 10000 };

    }

    async navigateToTelerik() {
        await this.page.goto("https://demos.telerik.com/kendo-ui/dragdrop/area", { waitUntil: 'domcontentloaded' });
    }

    // Example method to dismiss consent dialog; adjust based on actual application behavior
    async dismissCookie() {
        await this.page.locator(this.locators.acceptCookie).click();
      }


    async dragDrop( targetBoxLocatorPath) {
        // Use the passed locator paths instead of hard-coded values
        const draggableLocator = this.page.locator(this.locators.draggable);
        const targetBoxLocator = this.page.locator(targetBoxLocatorPath); // Renamed variable
    
        // Perform the drag and drop action
        await draggableLocator.dragTo(targetBoxLocator); // Use the renamed variable here
        await expect(targetBoxLocator).toHaveText("You did great!");
    }

    async dragDropWrong(fileNamePart, locatorKey) {
        // Use the passed locator paths instead of hard-coded values
        const draggableLocator = this.page.locator(this.locators.draggable);
        const targetBoxLocator = this.page.locator(this.locators.wrongElement); 
    
        // Perform the drag and drop action
        await draggableLocator.dragTo(targetBoxLocator); 
       

        await this.takeScreenshot(fileNamePart, locatorKey); 
        await expect(this.page.locator(this.locators.blueBox)).toContainText("(Try again)");
    }
    

    async checkCssAndScreenshot(locatorKey, color, fileNamePart) {
        const element = this.page.locator(this.locators[locatorKey]);
        await expect(element).toHaveCSS('background-color', color);
        await this.takeScreenshot(fileNamePart, locatorKey); 
    }

    async takeScreenshot(fileNamePart, locatorKey) {
        const element = this.page.locator(this.locators[locatorKey]); // Retrieve the element using the locator key
        const screenshotPath = `./Screenshots/DragDrop/${fileNamePart}.png`;
        await element.screenshot({ path: screenshotPath });
        logger.info(`Screenshot taken for ${locatorKey}: ${screenshotPath}`);
    }
}

module.exports = DragAndDrop;
