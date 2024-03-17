const { test, expect } = require('@playwright/test');
const FormPage = require('./FormPage');
const testData = require('./testData');

test.describe('Form submission with Multiple Data Sets', () => {
    testData.forEach(data => {
        test(`Submit form with ${data.firstName} ${data.lastName}`, async ({ page }) => {
            const formPage = new FormPage(page);
            await formPage.navigate("/form");

            // Use methods from FormPage for actions, with data from the current iteration
            await formPage.fillFirstName(data.firstName);
            await formPage.fillLastName(data.lastName);
            await formPage.clickRadioButton(data.radio);
            await formPage.clickCheckbox(data.checkbox);
            await formPage.selectDropdownOption(data.dropdown);
            await formPage.fillDatePicker(data.date);
            await formPage.clickSubmitButton();

            // Assertion to verify form submission
            await expect(page.locator(formPage.locators.confirmationAlert)).toHaveText("The form was successfully submitted!");
        });
    });
});
