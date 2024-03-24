const { test, expect } = require("@playwright/test");
const { testData } = require("./data.js"); // Adjust the path as necessary

Object.entries(testData).forEach(([testName, data]) => {
    test.describe(`${testName}`, () => {
        test(`Dynamic Selection and URL Validation for ${data.make} ${data.model}`, async ({ page }) => {
            await page.goto("https://www.cars.com/", { waitUntil: 'domcontentloaded' });

            await page.locator("select[name='makes[]']").selectOption(data.make);
            await page.locator("select[name='models[]']").selectOption(data.model);
            await page.locator("select[name='maximum_distance']").selectOption(data.dist);
            await page.locator("input[name='zip']").fill(data.zip);
            await page.locator("button[type='submit']").first().click();

            // Construct expectedParams object dynamically based on the current data set
            const expectedParams = {
                stock_type: 'all',
                'makes[]': data.make,
                'models[]': data.model,
                maximum_distance: data.dist,
                zip: data.zip,
            };

            // Validate the URL with expected parameters
            const currentURL = new URL(page.url());
            console.log(currentURL.toString());
            for (const [key, value] of Object.entries(expectedParams)) {
                expect(currentURL.searchParams.get(key)).toBe(value);
            }
        });
    });
});
