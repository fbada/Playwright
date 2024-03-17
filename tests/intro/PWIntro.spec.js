const { test, expect } = require("@playwright/test");
const { brotliCompress } = require("zlib");
const { firefox } = require('playwright');



test("My first PW automation", async function({ page }) {
    await page.goto("https://www.google.com");

    let title=await page.title();
    console.log(title);

    await expect(page).toHaveTitle("Google");
});

test("Browser Context", async ({ browser }) => {

    let context = await browser.newContext();

    let page1 = await context.newPage();
    await page1.goto("https://www.google.com/");

    let page2 = await context.newPage();
    await page2.goto("https://www.google.com/maps");

    let title=await page1.title();
    console.log(title);

    await expect(page1).toHaveTitle("Google");

});

