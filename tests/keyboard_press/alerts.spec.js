const { test, expect } = require("@playwright/test");
const utils = require('./utils');

test("Alerts and Prompts", async ({ page }) => {

  
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts", { waitUntil: 'domcontentloaded' });

    // Define the locators using XPath
    const JSalert = page.locator("//button[.='Click for JS Alert']");
    const resultJSAlert = page.locator("#result");
    const JSprompt = page.locator("//button[.='Click for JS Prompt']");

    // Preemptively set up the dialog listener for the entire test scope - hide in utils 
    utils.alertListener(page, "Peep");

    // Click the JS Alert button and check the result text
    await JSalert.click();
    await expect(resultJSAlert).toHaveText('You successfully clicked an alert');

    // Click the JS Prompt button and check if the result contains the test text
    await JSprompt.click();
    // This is the text we entered in the prompt
    await expect(resultJSAlert).toContainText('Peep');
});


