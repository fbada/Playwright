const { test, expect } = require('@playwright/test');

test("Screenshot", async({page})=>{

    await page.goto("https://example.com");
    await page.screenshot({path:'./Screenshots/Example/ex-page.png'});

    // use locator 

    const element = page.locator("h1");
    const screenshot = await element.screenshot({path: './Screenshots/Example/element.png'});

    // await element.screenshot({path: 'element.png'})



});

//https://www.techtorialacademy.com/home
 //img[@id='el_1593094758413_21']


    test('Full Page and Element Screenshot', async ({ page }) => {
        // Navigate to the page
        await page.goto("https://www.techtorialacademy.com/home", { waitUntil: 'domcontentloaded' });
        
        // Ensure the directory exists or create it beforehand to avoid errors
        // Taking and saving a full-page screenshot for reference
        await page.screenshot({ path: './Screenshots/Techtorial/ex-page.png' });
    
        // Capture and save a screenshot of a specific element
        const elementLocator = page.locator("#el_1593094758324_16");
        await elementLocator.screenshot({ path: './Screenshots/Techtorial/element.png' });
    
 
       
    });


    