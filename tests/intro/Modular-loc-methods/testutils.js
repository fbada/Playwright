// testUtils.js

// Helper functions with error handling
async function fillForm(page, locator, text) {
    try {
        await page.locator(locator).fill(text);
    } catch (error) {
        console.error(`Error filling form element ${locator}:`, error.message);
    }
}

async function clickElement(page, locator) {
    try {
        await page.locator(locator).click();
    } catch (error) {
        console.error(`Error clicking element ${locator}:`, error.message);
    }
}

async function selectDropdownOption(page, locator, value) {
    try {
        await page.locator(locator).selectOption({ value });
    } catch (error) {
        console.error(`Error selecting option from ${locator}:`, error.message);
    }
}

async function fillFormWithDelay(page, locator, text, delay) {
    try {
        await page.locator(locator).fill(text, { delay });
    } catch (error) {
        console.error(`Error filling form element ${locator} with delay:`, error.message);
    }
}

module.exports = {
    fillForm,
    clickElement,
    selectDropdownOption,
    fillFormWithDelay
};
