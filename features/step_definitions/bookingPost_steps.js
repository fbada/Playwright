const{Given, When, Then} = require('@cucumber/cucumber');
const {chromium, request, expect } = require('@playwright/test');
const load = require('lodash')
let bookingPOST;
let response, page, browser;



Given('the user provides {string} and {string}', async function (baseURL, endPoint) {

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    this.baseURL=baseURL;
    this.endPoint=endPoint;

  });

  When('the user sets the data using {string}', function (dataFileName) {
    bookingPOST = require("/Users/rds1/Desktop/Playwrght_Techtorial/PW-Test001/features/step_definitions/data/BookingAPI/"+dataFileName); 
  });



  When('the user sends a {string} request', async function (methodName) {
 
    switch(methodName){
        case "POST":
           response=await page.request.post(`${this.baseURL}/${this.endPoint}`, {data:bookingPOST});
    }

  });



  Then('the user should see the response code {int}', async function (int) {
    await expect(response.status()).toBe(int);

  });




  Then('the user {string} should be {string}',  async function (jsonPath, expValue) {

    let respBody = await response.json();
    const actualValue = load.get(respBody, jsonPath);
    await expect(actualValue).toBe(expValue);

  });
