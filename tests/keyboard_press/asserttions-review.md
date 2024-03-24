## Assertions

## ListOfWebElements

```javascript

const links = page.locator('//a').all(); // will return an array of all links
links.first().click();
links.last().click();

// to iterate over all links
for (let link of links) { // this is better than a for loop, use a for of loop 
   await link.nth(i);
}

fill('value'), fill('') // fill input field with value

```

## Mouse Actions

### Left Click

```javascript
await page.locator('//button').click();
```

### Right Click

```javascript
await page.locator('//button').click({button: 'right'}); // can also use 'middle', or 'left'
```

### Double Click

```javascript
await page.locator('//button').dblclick();
```

### Hover

```javascript
await page.locator('//button').hover();
```

### Drag and Drop

```javascript
await page.locator('//button').dragAndDrop(page.locator('//div'));
```

## Keyboard Actions

We can perform keyboard actions using the keyboard object in Playwright. It accepts the logical key names as arguments. These are pre-defined key names that are mapped to the physical keys on the keyboard.

### Press

 you can use shift, alt and control keys as well which are predefined in Playwright as shortcuts.

```javascript
await page.getByText('username').press('Shift+KeyA');

await page.keyboard.press('Enter');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowUp');
await page.keyboard.press('ArrowLeft');
await page.keyboard.press('ArrowRight');
await page.keyboard.press('Backspace');
await page.keyboard.press('Tab');
```

### Type

```javascript
await page.keyboard.type('Hello World');
```

### Down

```javascript

await page.keyboard.down('Shift');
await page.keyboard.down('Control');
await page.keyboard.down('Alt');
await page.keyboard.down('Meta');
```

### Up

```javascript
await page.keyboard.up('Shift');
await page.keyboard.up('Control');
await page.keyboard.up('Alt');
await page.keyboard.up('Meta');
```
