import {test, expect} from '@playwright/test';
const HRMloginPage = require('../../pages/OrangeHRMLogin');
import { allure } from 'allure-playwright';


test("POM login", async function({ page }) {
    let loginPage = new HRMloginPage(page);
  
    await loginPage.goto();
    await loginPage.enterCreds('Admin', 'admin123');
    await expect(loginPage.confirmElem).toBeVisible();
    //allure screenshots 
    await allure.attachment("Confirmed Login", await page.screenshot(), {
      contentType: "image/png",
    });
   

  });