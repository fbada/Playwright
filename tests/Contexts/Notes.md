## How to switch windows ?

context() --> gives context of the current window that has a page
waitForEvent('page') --> waits for a new page to be created
    -> will promise a new page

```javascript
    const newPagePromise =  page.context()waitForEvent('page');
    await page.click('button');
    const newPage = await newPagePromise;
    await newPage.waitForLoadState('domcontentloaded');

```

### What is a Promise?

A promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

For example, a promise can be used to handle the result of an asynchronous function that returns a value or throws an error.

A promise has three stages:

1. Pending: The initial state of a promise before it is resolved or rejected.
2. Fulfilled: The state of a promise representing a successful operation.
3. Rejected: The state of a promise representing a failed operation.

Promises are commonly used in JavaScript to handle asynchronous operations like fetching data from a server, reading files, or waiting for a timer to finish.

### How to Use Promises in JavaScript?

To create a promise, you can use the `Promise` constructor and pass a function with two arguments: `resolve` and `reject`. Inside this function, you can perform asynchronous operations and call `resolve` with the result value or `reject` with an error.

Here's an example of creating a promise that resolves after a delay:

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

delay(2000).then(() => {
    console.log('Promise resolved after 2 seconds');
});
```

You can also chain multiple promises using `then` to handle the result of each asynchronous operation:

```javascript

const fetchUserData = () => {
    return fetch('https://api.example.com/user')
        .then((response) => response.json())
        .then((data) => {
            console.log('User data:', data);
        });
};

fetchUserData();
```

In the example above, `fetchUserData` returns a promise that fetches user data from an API and logs the result when the promise is resolved.

### How to Handle Promise Rejections?

To handle errors in promises, you can use the `catch` method to catch any errors that occur during the asynchronous operation:

```javascript

const fetchUserData = () => {
    return fetch('https://api.example.com/user')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then((data) => {
            console.log('User data:', data);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
};

fetchUserData();
```

In the example above, if the fetch operation fails or the response is not OK, an error is thrown, and the `catch` method handles the error.

### How to Use Promises with `async` and `await`?

The `async` and `await` keywords provide a more concise way to work with promises in JavaScript. You can use `async` to define an asynchronous function that returns a promise, and `await` to wait for the resolution of a promise inside the function.

Here's an example of using `async` and `await` with promises in Playwright:

```javascript

test('Example Test', async ({ page }) => {
    await page.goto('https://example.com');
    const title = await page.title();
    console.log('Page title:', title);
});

```

In the example above, the `test` function is defined as `async`, allowing the use of `await` to wait for the `page.goto` and `page.title` promises to resolve.

### Summary

Promises are a powerful tool for handling asynchronous operations in JavaScript. By using promises, you can write cleaner and more maintainable code that handles asynchronous tasks effectively. With the `async` and `await` keywords, you can further simplify working with promises and make your code more readable. Promises are widely used in modern JavaScript frameworks and libraries, making them an essential concept to understand for web development.
