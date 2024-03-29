const { expect } = require('@playwright/test');
const { test } = require('./sharedState');

test.describe.serial('User CRUD Operations', () => {
// Create a new user
test('API POST request - Create User', async ({ request, userData }) => {
    // Sending a POST request to create a new user
    const response = await request.post("https://reqres.in/api/users", {
        data: {
            "name": "Fenrir",
            "job": "pistol"
        }
    });
    
    // Verifying the user creation was successful with a 201 status code
    await expect(response.status()).toBe(201);

    // Parsing and logging the response body
    const resBody = await response.json();
    userData.id = resBody.id; // Storing the new user's ID for use in subsequent tests
    await expect(resBody.name).toBe('Fenrir');
    console.log("Created User Response:", resBody);
});

// Read the newly created user's details
test('API GET Request - Read User', async ({ request, userData }) => {
    // Fetching the user details of the newly created user
    const response = await request.get("https://reqres.in/api/users/2");
    
    // Verifying the fetch operation was successful with a 200 status code
    expect(response.status()).toBe(200);
    
    // Parsing and asserting the response to contain the user's details
    const textRes = await response.text();
    await expect(textRes).toContain('Janet');
    console.log("Fetched User Details:", await response.json());
});

// Update the user's details
test('API PUT request - Update User', async ({ request, userData }) => {
    // Updating the user's name and job
    const response = await request.put(`https://reqres.in/api/users/${userData.id}`, {
        data: {
            "name": "morpheus",
            "job": "zion resident"
        }
    });

    // Verifying the update was successful with a 200 status code
    await expect(response.status()).toBe(200);

    // Parsing and asserting the response to reflect the updates
    const textRes = await response.text();
    await expect(textRes).toContain('morpheus');
    console.log("Updated User Details:", await response.json());
});


// Delete the user
test('API DELETE request - Delete User', async ({ request, userData }) => {
    // Sending a DELETE request to remove the user
    const response = await request.delete(`https://reqres.in/api/users/${userData.id}`);
    
    // Verifying the deletion was successful with a 204 status code
    await expect(response.status()).toBe(204);

    // Attempting to fetch the deleted user to confirm removal
    const getResponse = await request.get(`https://reqres.in/api/users/${userData.id}`);
    
    // Expecting to receive a 404 status code indicating the user no longer exists
    await expect(getResponse.status()).toBe(404);
});

});