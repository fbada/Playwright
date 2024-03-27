const { test, expect } = require('@playwright/test');
const Utils = require('../utils');


test('New Window Context', async ({ page }) => {
    // Go to base page.
    await page.goto('https://the-internet.herokuapp.com/windows', { waitUntil: 'domcontentloaded' });

    // Confirm title on page using your specific locator.
    const titleElem = page.locator("//h3[.='Opening a new window']");
    const clickElem = page.locator("//a[.='Click Here']");
    await expect(titleElem).toContainText('Opening a new window');

    // Listen for the next opened page/tab and click the link to open new page.
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), // This listens for the new page to open.
        clickElem.click(), // This action triggers the new page to open.
    ]);

    // Wait for the new page to be fully loaded.
    await newPage.waitForLoadState('domcontentloaded');
    // Assertions on the new page.
    const newWindowText = newPage.locator("//h3[.='New Window']");
    await expect(newWindowText).toHaveText('New Window');

    // Close the new page.
    await newPage.close();
});


test('Multi Window Context', async ({ page }) => {

    await page.goto("https://www.hyrtutorials.com/p/window-handles-practice.html", {waitUntil:'domcontentloaded'});

    const[newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator("#newWindowsBtn").click()
     ]);
     
     let pages = await newPage.context().pages();

     for(let page of pages){
        console.log(await page.title());
        console.log(await page.url());
     }
     //pages method will return all the windows which are opened under the same context <-- browser context
});


test.only("Switch window with method", async ({page}) => {
    await page.goto("https://www.hyrtutorials.com/p/window-handles-practice.html", {waitUntil:'domcontentloaded'});

    const newPage = await Utils.switchWindowByTitle(page, "#newWindowsBtn", "Window Handles Practice - H Y R Tutorials");

    await expect(newPage).toHaveTitle("Window Handles Practice - H Y R Tutorials");

    // To log the title and URL of the new page, ensure you're using newPage, not page.
    console.log("New window/tab title:", await newPage.title());
    console.log("New window/tab URL:", await newPage.url());

    // Optional: Close the new window/tab if it's no longer needed.
    await newPage.close();
});


