const { expect, test } = require('@playwright/test');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const expData = require('./data/singleUnknown.json');

// Initialize AJV with Draft-07 support and add format validation
const ajv = new Ajv();
addFormats(ajv);

// Load your schema
const schema = require('./responseSchema.json');
const schema2 = require('./schema2.json');
const schemaUnknownSingle = require('./singleUnknown.json');

test.describe.serial('Other Operations', () => {
    test('API GET request - List Users', async ({ request }) => {
        // Assuming the request method should be GET based on your tests
        const response = await request.get("https://reqres.in/api/users?page=2");
        await expect(response.status()).toBe(200);

        const resBody = await response.json();
        await checkSchema(schema, resBody);
        await expect(resBody.total).toBe(12);
    });


    test('API POST request - Single User Not found', async ({ request }) => {
        // Sending a POST request to create a new user
        const response = await request.get("https://reqres.in//api/users/23"
        );
        await expect(response.status()).toBe(404);

    });


    test('API GET request - List<Resources>', async ({ request }) => {
        const response = await request.get("https://reqres.in/api/unknown");
        await expect(response.status()).toBe(200);
        const resBody = await response.json();
        await checkSchema(schema2, resBody);

        const data = resBody.data;
        await expect(data[0].id).toBe(1);
        await expect(data[3].year).toBe(2003);
    });

    test('API POST request - single <Resources>', async ({ request }) => {
        // Sending a POST request to create a new user
        const response = await request.get("https://reqres.in/api/unknown/2"
        );
        // Verifying the user creation was successful with a 201 status code
        await expect(response.status()).toBe(200);
        // Parsing and logging the response body
        const resBody = await response.json();
        await checkSchema(schemaUnknownSingle, resBody);
        await expect(resBody).toStrictEqual(expData);

    });

    test('API POST request - failed Registration', async ({ request }) => {
        // Sending a POST request to create a new user
        const response = await request.post("https://reqres.in/api/register", {
            data: {
                "email": "sydney@fife"
            }
        });
        await expect(response.status()).toBe(400);
        const resBodyText = await response.text();
        console.log(resBodyText);
        expect(resBodyText).toContain("Missing password");
    });

    test('API POST request - failed Login -> no username', async ({ request }) => {
       
        const response = await request.post("https://reqres.in/api/login", {
            data: {
                "password": "potsa"
            }
        });
        await expect(response.status()).toBe(400);
        const resBodyText = await response.text();
        console.log(resBodyText);
        expect(resBodyText).toContain("Missing email or username");
    });

    test('API GET request - delayed response', async ({ request }) => {
       
        const startTime = Date.now();

        // Sending a POST request to the endpoint with a delayed response
        const response = await request.get("https://reqres.in/api/usersdelay=3");
    
        const endTime = Date.now();

        const duration = endTime - startTime;
    
        // Verify that the response status is 200
        await expect(response.status()).toBe(200);
    
        // Now you can assert that the duration matches the expected delay
        const expectedDelay = 150; // Assuming the delay is 300 ms
        expect(duration).toBeGreaterThanOrEqual(expectedDelay);
        console.log("Recordeed Delay: "+ duration);
     
    });

});

async function checkSchema(schema, body) {

    const validate = ajv.compile(schema);
    const valid = validate(body);

    if (!valid) {
        console.error('Validation errors:', validate.errors);
        // Throwing an error or failing the test here might be more appropriate
        // depending on how you want to handle schema validation failures.
    }

    // This will assert true only if validation passed, causing the test to fail otherwise.
    expect(valid).toBe(true);

}
