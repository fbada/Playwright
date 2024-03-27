const {test, expect} = require('@playwright/test');


test('File Upload', async({page})=> {

//https://demo.guru99.com/test/upload/

await page.goto('https://demo.guru99.com/test/upload/', { waitUntil: 'domcontentloaded' });

await page.locator("#uploadfile_0").setInputFiles('/Users/rds1/Desktop/Playwrght_Techtorial/PW-Test001/Screenshots/Techtorial/element.png');

await page.screenshot({ path: './Screenshots/Guru99/ex-page.png' });
page.pause();
await page.locator("#terms").click();

await page.screenshot({ path: './Screenshots/Guru99/ex-page2.png' });
await page.locator('#submitbutton').click();
page.pause();


const res = page.locator('#res');
await expect(res).toBeVisible();
await expect(res).toHaveText("1 file has been successfully uploaded.");
await page.screenshot({ path: './Screenshots/Guru99/ex-page3.png' });
});