const { test, expect } = require('@playwright/test');
const testCases = require('./testCasesForm');
const dateCases = require('./dateCases');

testCases.forEach(testCase => {
  test(`Fill out the form with edge case: ${JSON.stringify(testCase)}`, async ({ page }) => {
    // Navigate to the form page
    await page.goto("https://formy-project.herokuapp.com/form");
    await page.waitForSelector("#first-name", { state: 'visible' });

    // Input values for text fields using data from the current test case
    await page.fill("#first-name", testCase.firstName);
    await page.fill("#last-name", testCase.lastName);
    await page.fill("#job-title", testCase.occupation);

    // Select a radio button
    let radiobtn = await page.locator("//input[@type='radio']").all();
    for (let radio of radiobtn) {
      await radio.check();
      await expect(radio).toBeChecked();
    }
    await page.click("#radio-button-2");

    // Check checkboxes
    let boxes = await page.locator("//input[@type='checkbox']").all();
    for (let box of boxes) {
      await box.check();
      expect(await box.isChecked()).toBeTruthy();
      await box.uncheck();
      expect(await box.isChecked()).toBeFalsy();
    }

    // Validate select menu options
    let options = ["Select an option", "0-1", "2-4", "5-9", "10+"];
    let selectMenu = await page.locator("#select-menu");
    for (let value of options) {
      await selectMenu.click();
      await selectMenu.selectOption({ label: value });
      const selectedOption = await page.$eval("#select-menu", select => select.selectedOptions[0].innerText.trim());
      console.log(`Selected option: ${selectedOption}`);
      expect(selectedOption).toBe(value);
    }

    // Select an option from the select menu
    await page.selectOption("#select-menu", { label: "2-4" });

    for (let date of dateCases) {
        try {
          await page.fill("#datepicker", date);
         // await page.waitForTimeout(1000); // Wait for 4 seconds

          console.log(`Filled datepicker with: ${date}`);
          await expect(page.locator("#datepicker")).toHaveValue(date);
          console.log(`Confirmed datepicker value matches: ${date}`);
        } catch (error) {
          console.error(`Error testing date ${date}: ${error.message}`);
        }
      }
      
    
    

    // Submit the form
    await page.click("a.btn-primary");
    // Confirm form submission by checking the URL or a success message on the next page
    const url = await page.url();
    //confirm with the url end ponit "/thanks"
    expect(url).toContain("/thanks");
  });
});
