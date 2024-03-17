const { test, expect } = require('@playwright/test');
const FormPage = require('./FormPage');

test.only('Form submission with Integrated FormPage Methods', async ({ page }) => {
    const formPage = new FormPage(page);
    
    await formPage.navigate("/form");
    
    // Use methods from FormPage for actions
    await formPage.fillFirstName("Fenny");
    await formPage.fillLastName("Benny");
    
    // Integrated utility functions within FormPage
    await formPage.clickRadioButton(2);
    await formPage.clickCheckbox(3);
    await formPage.selectDropdownOption('3');
    await formPage.fillDatePicker("10/12/2021");

    await formPage.clickSubmitButton();

    // Assertion to verify form submission
    await expect(page.locator(formPage.locators.confirmationAlert)).toHaveText("The form was successfully submitted!");
});
