// FormPage.js
const BasePage = require('./BasePage');
const utils = require('./testUtils');

class FormPage extends BasePage{
    constructor(page) {
        super(page);
        this.locators = {
            firstName: '#first-name',
            lastName: '#last-name',
            jobTitle: '#job-title',
            radioButton: (number) => `[id='radio-button-${number}']`,
            checkbox: (number) => `[id='checkbox-${number}']`,
            selectMenu: 'select#select-menu',
            datePicker: '#datepicker',
            submitButton: "a[role='button']",
            confirmationAlert: "div[role='alert']"
        };
    }

    async fillFirstName(name) {
        await utils.fillForm(this.page, this.locators.firstName, name);
    }

    async fillLastName(name) {
        await utils.fillForm(this.page, this.locators.lastName, name);
    }

    // Method to click the radio button
    async clickRadioButton(number) {
        await utils.clickElement(this.page, this.locators.radioButton(number));
    }

    // Method to click the checkbox
    async clickCheckbox(number) {
        await utils.clickElement(this.page, this.locators.checkbox(number));
    }

    // Method to select an option from the dropdown
    async selectDropdownOption(value) {
        await utils.selectDropdownOption(this.page, this.locators.selectMenu, value);
    }

    // Method to fill the date picker with delay
    async fillDatePicker(text, delay = 100) {
        await utils.fillFormWithDelay(this.page, this.locators.datePicker, text, delay);
    }

    // Method to click the submit button
    async clickSubmitButton() {
        await utils.clickElement(this.page, this.locators.submitButton);
    }

}

module.exports = FormPage;
