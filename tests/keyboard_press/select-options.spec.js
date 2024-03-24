const { test, expect } = require("@playwright/test");

test("Select Options", async({page}) => {

    //define and store the locator
    const dropdown = page.locator('#dropdown');

    await page.goto("https://the-internet.herokuapp.com/dropdown", {waitUntil:'domcontentloaded'});
    
    await dropdown.selectOption({label: 'Option 1'});   
    await dropdown.selectOption({value: '2'});     
   // you can also just write ('1')
    await dropdown.selectOption({index: 1}); // using index

   // await page.pause();
});

test.only("Find ShadowDom", async({page})=> {
    await page.goto("https://the-internet.herokuapp.com/shadowdom", {waitUntil:'domcontentloaded'});

    await expect(page).toHaveURL("https://the-internet.herokuapp.com/shadowdom");

    //check text for shadowDOM element
   const content =  await page.locator("[name='my-text']").first().textContent();
   console.log(content);


})