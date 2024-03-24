const { test, expect } = require('@playwright/test');
const GuruPage = require('./guruContext-page'); 
// Conventionally, class names start with a capital letter

let guruPage; // Declare guruPage with let if you plan to reassign it

test.beforeEach(async ({ page }) => {
    guruPage = new GuruPage(page); // Reassigning to a let variable
    await guruPage.navigate("https://demo.guru99.com/test/simple_context_menu.html");
});


    test.only('Double-click to reveal the alert', async () => { // Removed {page} as it's not used here
        // double click the button
        await guruPage.doubleclick(guruPage.locators.contextClick);
        //confirm appearance of the alert
        await guruPage.listenAlertConfirm("You double clicked me.. Thank You..");
    });


