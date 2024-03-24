## URL modelling

The `page.goto()` function to navigate to the URL "https://www.google.com/". The second argument `{waitUntil:'domcontentloaded'}` specifies that the code should wait until the DOM (Document Object Model) of the page is fully loaded before proceeding.


###  `{waitUntil:'domcontentloaded'}`

The `waitUntil` option is used to specify when the navigation should be considered successful. The possible values are:

- `'load'`: The navigation is successful when the load event is fired.
- `'domcontentloaded'`: The navigation is successful when the DOMContentLoaded event is fired.
- `'networkidle'`: The navigation is successful when there are no more than 2 network connections for at least 500 ms.
- `'networkidle0'`: The navigation is successful when there are no more than 0 network connections for at least 500 ms.
- `'networkidle2'`: The navigation is successful when there are no more than 2 network connections for at least 500 ms.

The `domcontentloaded` value is used in this case to ensure that the page is fully loaded before proceeding with the next steps.

```javascript

await page.goto('https://www.google.com/', {waitUntil:'domcontentloaded'});
// networkidle0, networkidle2, load
await page.goto('https://www.google.com/', {waitUntil:'networkidle0'});
// this will speed up the process of loading the page, and only wait for 0 network connections for 500ms
// this is useful when you are testing a page that has a lot of network requests
```

In comparisson to Selenium, Playwright has a more efficient way of waiting for the page to load. The `networkidle0` option is particularly useful when testing pages with a lot of network requests, as it allows the test to proceed as soon as the network connections are idle for a specified period of time.


## Select multiple Values in DropDown

The `selectOption()` function is used to select an option in a dropdown list. It accepts the value of the option to be selected as an argument. If the dropdown list allows multiple selections, you can pass an array of values to select multiple options.

```javascript
//single select option 
await page.selectOption('select#dropdown', 'option1');

//multiple select options using the array
await page.selectOption('select#dropdown', ['option1', 'option2', 'option3']);
```

The `selectOption()` function is a convenient way to select options in a dropdown list. It simplifies the process of selecting options, especially when dealing with multiple selections.

```html
<select multiple>
    <option value='red'>Red</option>
    <option value='green'>Green</option>
    <option value='blue'>Blue</option>
</select>
```

In the above example, the dropdown list allows multiple selections, and the `selectOption()` function can be used to select multiple options by passing an array of values.

```javascript
await page.selectOption({label: 'Red'});
await page.selectOption({index: 1});
await page.selectOption({value: 'red'});
```

The `selectOption()` function provides a flexible and efficient way to interact with dropdown lists in Playwright tests, which may include selecting single or multiple options based on their values, labels, or indexes.



