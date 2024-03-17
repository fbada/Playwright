const { test, expect } = require("@playwright/test");

test.only("Locator Practice with Error Handling and Optimization", async ({ page }) => {
    try {
        await page.goto("https://formy-project.herokuapp.com/form");
    } catch (error) {
        console.error("Failed to navigate to the form page:", error.message);
        throw new Error("Navigation to the form page failed.");
    }

    // Define a helper function for filling input fields with error handling
    const safelyFillInput = async (selector, value) => {
        const locator = page.locator(selector);
        if (await locator.isVisible()) {
            try {
                await locator.fill(value);
            } catch (error) {
                console.error(`Error filling input ${selector}:`, error.message);
            }
        } else {
            console.log(`${selector} is not visible.`);
        }
    };

    // Fill out the form using the helper function
    await safelyFillInput('#first-name', 'Fenny');
    await safelyFillInput('#last-name', 'Benny');
    await safelyFillInput('#job-title', 'Master Foof');

    // Handle clickable elements (radio buttons, checkboxes) with error handling
    const safelyClickElement = async (selector) => {
        const locator = page.locator(selector);
        if (await locator.isVisible()) {
            try {
                await locator.click();
            } catch (error) {
                console.error(`Error clicking element ${selector}:`, error.message);
            }
        } else {
            console.log(`${selector} is not visible.`);
        }
    };

    // Use the helper function for clickable elements
    await safelyClickElement('[id="radio-button-1"]');
    await safelyClickElement('[id="checkbox-1"]');

    // Select an option with error handling
    try {
        const selectElement = page.locator('select#select-menu');
        await selectElement.selectOption({ value: '1' });
    } catch (error) {
        console.error("Error selecting an option:", error.message);
    }

    // Fill the date field with error handling
    await safelyFillInput('#datepicker', '10/12/2021');

    // Submit the form and check for confirmation with error handling
    try {
        await page.locator("a[role='button']").click();
        await expect(page.locator("div[role='alert']")).toHaveText("The form was successfully submitted!");
    } catch (error) {
        console.error("Error during form submission or confirmation check:", error.message);
        throw new Error("Form submission or confirmation failed.");
    }
});
