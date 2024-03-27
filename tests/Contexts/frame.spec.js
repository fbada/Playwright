const { test, expect } = require('@playwright/test');
const Utils = require('../utils');

const url1 = 'https://skpatro.github.io/demo/iframes';

test('New iFrame Context', async ({ page }) => {

    await page.goto(url1, { waitUntil: 'domcontentloaded' });

   let iframe1 = await page.frameLocator("#Frame1");
    //define the locator in here 
    await expect(iframe1.locator("#frametext")).toHaveText("I am inside Frame");
    //#frametext

    // to switch to another frame, you need the other locator for frame 2 
    let frame2 = await page.frameLocator("#Frame2");
    await expect(frame2.getByText("Category3")).toBeVisible();

    //to go into the main page, just use the page.locator()
    //to make a nested frame scenario work, switch inside the context of the frame and extend into the content of the frame 

});
