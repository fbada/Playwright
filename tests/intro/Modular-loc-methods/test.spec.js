// testScript.js
const { test, expect } = require("@playwright/test");
const locators = require("./locators");
const { fillForm, clickElement, selectDropdownOption, fillFormWithDelay } = require("./testutils");

test.only("Locator Practice with Error Handling and Abstracted Locators", async ({ page }) => {
    try {
        await page.goto("https://formy-project.herokuapp.com/form");
        // Using utility functions
        await fillForm(page, locators.firstName, "Fenny");
        await fillForm(page, locators.lastName, "Benny");
        await fillForm(page, locators.jobTitle, "Master Foof");

        await clickElement(page, locators.radioButton1);
        await clickElement(page, locators.checkbox1);
        await selectDropdownOption(page, locators.selectMenu, '1');
        await fillFormWithDelay(page, locators.datePicker, "10/12/2021", 100);

        // Submit the form and check for confirmation
        await clickElement(page, locators.submitButton);
        await expect(page.locator(locators.confirmationAlert)).toHaveText("The form was successfully submitted!");
        
    } catch (error) {
        console.error("An error occurred during the test:", error.message);
        throw error; 
        // Rethrow error to fail the test in case of exception
    }
});
