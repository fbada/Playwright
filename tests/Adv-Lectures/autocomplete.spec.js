import {test, expect} from '@playwright/test'

test("Autocomplete", async function({ page }) {
    await page.goto("https://alphagov.github.io/accessible-autocomplete/examples/");

    const countryInput = page.locator("//input[@id='autocomplete-default']");
    const searchValue = "Ch";
    const selectValue = "China";

    // all thhe elements in the dropdown
    const countryElements = page.locator("//ul[@id='autocomplete-default__listbox']/li");

    await countryInput.type(searchValue, {delay: 100});
    
    const countValues = await countryElements.count();
//loop through the values and search for the value above
    for(let i=0; i < countValues; i++){
        const text = await countryElements.nth(i).textContent();
        if(text === selectValue){
            await countryElements.nth(i).click();
            break;
        }
    }

})

test("Basic Auth", async ({ page }) => {

    //Defiine basic Auth creds
    const username= 'admin';
    const password = 'admin';

    //encode them in Base64
    const base64Creds= Buffer.from(`${username}:${password}`).toString('base64');
    
    //setup request initercept
    await page.route('**/*', (route)=>{
    const headers ={
            'Authorization': `Basic ${base64Creds}`,
        };
        route.continue({headers})
    });

    await page.goto("https://the-internet.herokuapp.com/basic_auth");
   
    //assert res
    const assertText = page.locator("//p[contains(.,'Congratulations! You must have the proper credentials')]");
    await expect(assertText).toContainText("Congratulations");

    });

    test("Broken Images", async ({ page }) => {
        // go to the page
        await page.goto("https://the-internet.herokuapp.com/broken_images");
    
        // Use page.evaluate to count broken images
        const brokenImages = await page.evaluate(async () => {
            const images = Array.from(document.querySelectorAll('img'));
            const brokenImagePromises = images.map(image => fetch(image.src, { method: 'HEAD' })
                .then(response => response.ok ? null : image.src) 
                // Mark as broken if fetch isn't ok
                .catch(() => image.src)); // Mark as broken if fetch fails
            return Promise.all(brokenImagePromises).then(results => results.filter(src => src !== null));
        });
    
        // Print the broken images in Node.js context
        console.log(`Total broken images: ${brokenImages.length}`);
        console.log("Broken Images URLs:");
        brokenImages.forEach(src => {
            console.log(src);
        });
    });