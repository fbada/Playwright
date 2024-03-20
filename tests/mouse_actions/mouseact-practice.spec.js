const { test, expect } = require('@playwright/test');
const ContextMenuPage = require('./contextMenu-page');
const { clickElement } = require('../intro/POM/testUtils');

test.describe('Context Menu Page Interactions', () => {
    let contextMenuPage;

    test.beforeEach(async ({ page }) => {
        contextMenuPage = new ContextMenuPage(page);
        // Navigate to the page and confirm title
        await contextMenuPage.navigate('context_menu', "Context Menu");
    });

    test('Right-click on the target box triggers correct alert', async ({ page }) => {
        // Right-click on the targetBox
        await contextMenuPage.clickOnElement("right");
        await contextMenuPage.listenAlertConfirm("You selected a context menu");
    });

    test.only('Left-click on the target box does NOT trigger the context menu alert', async ({ page }) => {
// left click on the target box 
       await contextMenuPage.clickOnElement();
       const alertTriggered = await contextMenuPage.listenForUnexpectedAlert(1000);
       //confirm the event to not trigger the box 
       expect(alertTriggered).toBeFalsy();
});
});

