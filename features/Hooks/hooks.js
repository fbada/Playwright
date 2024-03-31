
const { Before, After, Given, Then, When } = require('@cucumber/cucumber');
const { headless } = require('chrome-aws-lambda');
const playwright = require('playwright');
const { chromium } = playwright;

let browser;
let context;


Before(async function () {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    const page = await context.newPage();

    this.page = page;
});

After(async function () {
    this.page.close();
    context.close();
    browser.close();
});


