const { test, expect } = require('@playwright/test');
const DragAndDrop = require('../POM-intro/DragDrop/dragPage')
const logger = require('../logger')
import { allure } from "allure-playwright";

test.describe('Drag and Drop tests', () => {
  let dragDropPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the DragAndDrop page object with the current page context
    dragDropPage = new DragAndDrop(page);

    // Navigate to the Telerik Drag and Drop Demo page and accept cookies
    await dragDropPage.navigateToTelerik();
    await dragDropPage.dismissCookie(); // Make sure this method is correctly defined in your DragAndDrop class

    // Reset to initial state if needed
    //await dragDropPage.initialState(); // Uncomment if you have this method implemented to set the initial state

    // Check CSS properties and take screenshots
    await dragDropPage.checkCssAndScreenshot('draggable', 'rgb(3, 169, 244)', 'source');
    await dragDropPage.checkCssAndScreenshot('blueBox', 'rgb(63, 81, 181)', 'target1');
    await dragDropPage.checkCssAndScreenshot('orgBox', 'rgb(238, 111, 11)', 'target2');
  });

test('Drag and Drop functionality and CSS check', async ({ page }) => {
  
  const source = page.locator("#draggable");
  const target1 = page.locator(".test1");
  const target2 = page.locator(".test2");

  logger.info('Checking the CSS of the source element and taking a screenshot');
  await expect(source).toHaveCSS('background-color', 'rgb(3, 169, 244)');
  await source.screenshot({ path: './Screenshots/DragDrop/source.png' });

  logger.info('Checking the CSS of the first target element and taking a screenshot');
  await expect(target1).toHaveCSS('background-color', 'rgb(63, 81, 181)');
  await target1.screenshot({ path: './Screenshots/DragDrop/target1.png' });

  logger.info('Checking the CSS of the second target element and taking a screenshot');
  await expect(target2).toHaveCSS('background-color', 'rgb(238, 111, 11)');
  await target2.screenshot({ path: './Screenshots/DragDrop/target2.png' });

  logger.info('Performing drag and drop from the source to the first target');
  await source.dragTo(target1);

  logger.info('Taking a screenshot of the entire page after the first drag and drop');
  await page.screenshot({ path: './Screenshots/DragDrop/ex-page.png' });
  logger.info('Verifying text presence in the first target');
  await expect(target1).toHaveText("You did great!");

  logger.info('Performing drag and drop from the source to the second target');
  await source.dragTo(target2);

  logger.info('Taking a screenshot of the entire page after the second drag and drop');
  await page.screenshot({ path: './Screenshots/DragDrop/orangeBox.png' });
  logger.info('Verifying text presence in the second target');
  await expect(target2).toHaveText("You did great!");
});


test('Drag and Drop functionality using POM', async ({ page }) => {
  await allure.attachment("basic-page-screen", await page.screenshot(), {
    contentType: "image/png",
  });
  dragDropPage = new DragAndDrop(page);
  // Perform drag and drop actions
  await dragDropPage.dragDrop(dragDropPage.locators.blueBox);
  await allure.attachment("basic-page-screen", await page.screenshot(), {
    contentType: "image/png",
  });
  await dragDropPage.dragDrop( dragDropPage.locators.orgBox);
  await allure.attachment("basic-page-screen", await page.screenshot(), {
    contentType: "image/png",
  });
  
});

test('Drag and Drop functionality using POM negative', async ({ page }) => {
  await allure.attachment("basic-page-screen", await page.screenshot(), {
    contentType: "image/png",
  });
   dragDropPage = new DragAndDrop(page);
  await dragDropPage.dragDropWrong('wrongDrag', 'blueBox');
  await allure.attachment("basic-page-screen", await page.screenshot(), {
    contentType: "image/png",
  });

});

});