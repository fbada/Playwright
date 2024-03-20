const { test, expect } = require('@playwright/test');
const GuruPage = require('./guruContext-page');
let guruPage;
const maxElements = 3;

test.beforeEach(async ({ page }) => {
    guruPage = new GuruPage(page);
    await guruPage.navigate("hovers");
});

test("Hover over image, check for the text below", async ({ page }) => {
    for (let index = 0; index < maxElements; index++) {
        const isMatch = await guruPage.hoverAndConfirmText(index);
        await expect(isMatch).toBe(true);
    }
});

test("Hover and confirm text with invalid index", async ({ page }) => {
    // Pass an invalid index value to the function
    const invalidIndex = -1;
    const isMatch = await guruPage.hoverAndConfirmText(invalidIndex);
    // Assert that the function returns false for invalid index
    await expect(isMatch).toBe(false);
});


// Comments:

// - Imports and Dependencies
//   - The test script imports necessary functions from the Playwright Test library (`test` and `expect`) and the `GuruPage` class from the `guruContext-page` module. This ensures that all required dependencies are properly imported before running the tests.

// - Setup Phase
//   - The `beforeEach` hook is used to perform setup tasks before each test case execution. In this case, it initializes the `guruPage` variable with a new instance of the `GuruPage` class and navigates to a specified URL using the `navigate` method. This setup ensures that each test case starts with a consistent state.

// - Test Case
//   - The test case itself is straightforward and self-explanatory. It iterates through each element up to `maxElements` and calls the `hoverAndConfirmText` method from the `GuruPage` class to perform hover actions and confirm text.
//   - Each iteration expects the result of `hoverAndConfirmText` to be `true`, indicating that the text matches the expected text after hovering over the image.

// - Clarity and Readability
//   - Comments are provided at the bottom of the page to explain the purpose of each section, making it easy to understand the flow of execution.
//   - Variable names are descriptive (`guruPage`, `maxElements`), which enhances code readability and maintainability.
