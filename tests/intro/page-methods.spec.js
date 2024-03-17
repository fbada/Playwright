const{test, expect} = require('@playwright/test');

test("Page methods practice", async({page}) => {
    await page.goto("https://google.com");
    await page.goto("https://www.techtorialacademy.com");

    await page.goBack({timeout:3000, waitUntil:"networkidle"});

//    await page.waitForURL("https://google.com");


   // await page.goForward();
    await expect(page).toHaveTitle("Google");
});




