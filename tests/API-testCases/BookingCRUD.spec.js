const { test, expect, request } = require('@playwright/test');
const postData = require('./data/BookingAPI/postdata.json');
const auth = require('./data/BookingAPI/auth.json');
const putData = require('./data/BookingAPI/updateBooing.json'); 

// FEATURE
test.describe.serial("Booking API Flow Tests", () => {
    const baseURL = "https://restful-booker.herokuapp.com";
    let tokenID;

    // Before each test
    test.beforeEach(async ({ request }) => {
        const postResponse = await request.post(`${baseURL}/auth`, { data: auth });
        const responseBody = await postResponse.json();
        tokenID = responseBody.token; // No need for 'await' here
        console.log("Generated Token:", tokenID);
    });

    // SCENARIO
    test("Verify POST response", async ({ request }) => {
        let id; // Scoped within the test to avoid unintentional reuse

        // STEPS
        await test.step("POST", async () => {
            const postResponse = await request.post(`${baseURL}/booking`, { data: postData });
            const responseBody = await postResponse.json();
            console.log("POST Response Body:", responseBody);
            expect(postResponse.ok()).toBeTruthy();
            expect(postResponse.status()).toBe(200);
            id = responseBody.bookingid;
            expect(responseBody.booking.firstname).toBe("Fenny");
            expect(responseBody.booking).toHaveProperty('firstname');
            expect(typeof responseBody.booking.firstname).toBe('string');
            console.log(`${new Date().toISOString()} POST data and receive response -> PASS`);
            
        });

        await test.step("GET", async () => {
            const getResponse = await request.get(`${baseURL}/booking/${id}`);
            const getResponseBody = await getResponse.json();

            expect(getResponse.ok()).toBeTruthy();
            expect(getResponse.status()).toBe(200);
            await expect(getResponseBody).toMatchObject(postData);
            console.log(`${new Date().toISOString()} GET booking using id -> PASS`);
        });

        await test.step("PUT", async () => {
            const putResponse = await request.put(`${baseURL}/booking/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${tokenID}`
                },
                data: putData
            });

            // Check the status before attempting to parse JSON
            expect(putResponse.ok()).toBeTruthy();
            expect(putResponse.status()).toBe(200);

            const putResponseBody = await putResponse.json(); // Use 'await' here
            console.log("PUT Response Body:", putResponseBody);
            console.log("PUT Booking ID:" + id);
            // Additional assertions can be made on putResponseBody if necessary
            console.log(`${new Date().toISOString()} PUT booking using id -> PASS`);
        });

        await test.step("PATCH", async () => {
            const patchResponse = await request.patch(`${baseURL}/booking/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${tokenID}`
                },
                data: {
                    "firstname": "BOOOO!!!"
                }
            });


            expect(patchResponse.status()).toBe(200);

            const patchResponseBody = await patchResponse.json(); 
            console.log("PATCH Response Body:", patchResponseBody);

            await expect(patchResponseBody.firstname).toBe("BOOOO!!!");
            // Additional assertions can be made on putResponseBody if necessary
            console.log(`${new Date().toISOString()} PATCH booking using id -> PASS`);
            console.log("PATCH Booking ID:" + id);
        });

        await test.step("DELETE", async () => {
            const putResponse = await request.delete(`${baseURL}/booking/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${tokenID}`
                }
            });
            console.log("Delete Booking ID:" + id);
            // Check the status before attempting to parse JSON
            await expect(putResponse.ok()).toBeTruthy();
            await expect(putResponse.status()).toBe(201);
            // Additional assertions can be made on putResponseBody if necessary
            console.log(`${new Date().toISOString()} DELETE -> PASS`);

            //confirm the booking is gone 
            const getResponse = await request.get(`${baseURL}/booking/${id}`);
            await expect(getResponse.status()).toBe(404);
            
        });

    });
});
