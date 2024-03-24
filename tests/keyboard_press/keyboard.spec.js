const { test, expect } = require("@playwright/test");

test("Keyboard Action Test", async({page})=> {

    const googleSearchInput = await page.getByLabel('Search', { exact: true });
    //search google
    await page.goto("https://www.google.com/", {waitUntil:'domcontentloaded'});

    // find the locator for the search field  -> use --debug option and have the playwright define the explicit label 

    googleSearchInput.fill("Techtorial");
    googleSearchInput.press("Backspace"); // there is a sep button for backspace in windows, playwright is a microsoft product like Pupeteer, so it will follow the rules of Windows envt.

    googleSearchInput.press("Enter");

    // write the assertions 
    await expect(page).toHaveTitle('Techtoria - Google Search');
    //await page.pause();

});