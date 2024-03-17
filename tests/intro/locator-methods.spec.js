// locator methods 

const { test, expect } = require("@playwright/test");

test.only("Locator Practice", async ({ page }) => {
    await page.goto("https://formy-project.herokuapp.com/form");

    // Prefer CSS selectors for simplicity and speed
    await page.locator('#first-name').fill("Fenny");
    await page.locator('#last-name').fill("Benny");
    await page.locator('#job-title').fill("Master Foof");

    // Group actions on radio and checkbox using CSS selectors
    await page.locator('[id="radio-button-1"]').click();
    await page.locator('[id="checkbox-1"]').click();

    // Utilize the `selectOption` directly on the selector
    await page.locator('select#select-menu').selectOption({ value: '1' });

    // Fill the date with a slight delay to mimic user input
    await page.locator('#datepicker').fill("10/12/2021", { delay: 100 });

    // Submit the form
    await page.locator("a[role='button']").click();

    // Assertion to check form submission
    await expect(page.locator("div[role='alert']")).toHaveText("The form was successfully submitted!");
});

// fill(), clear()
//click()
//check()
// getAttribute(name)