const { expect } = require('@playwright/test');

class Utils {
    static async switchWindowByTitle(page, locator, targetTitle) {
        await page.click(locator); // Click to open the new window/tab.

        // Wait for the new window/tab to open.
        const newPagePromise = page.context().waitForEvent('page');
        const clicked = page.locator(locator).click();
        await clicked;
        const newPage = await newPagePromise;

        await newPage.waitForLoadState('load');

        // Find the page with the matching title.
        let pages = await page.context().pages();
        for (let pg of pages) {
            if ((await pg.title()) === targetTitle) {
                return pg;
            }
        }
        throw new Error(`No page with title "${targetTitle}" found`);
    }

static async interactWithIframeAndOpenPopup(page, iframeSelector, locator) {
    const frameLocator = page.frameLocator(iframeSelector);
    const popupPromise = page.waitForEvent('popup');
    await frameLocator.locator(locator).click();
    return await popupPromise;
  }

  static async validatePopupContent(popupPage, locator) {
    await expect(popupPage.locator(locator)).toBeVisible();
  }
}

module.exports = Utils;
