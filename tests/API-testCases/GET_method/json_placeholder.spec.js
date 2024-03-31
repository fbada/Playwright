const { test, expect, request } = require('@playwright/test');
const putData = require('../data/putdata.json');
const putDataResp = require('../data/putResp.json');
const postReq = require('../data/postReq.json');
const patchReq = require('../data/patchData.json');



test.describe("JSONPlaceholder API Tests", () => {
   
const baseURL = "https://jsonplaceholder.typicode.com";

    test("Verify GET response headers", async ({ request }) => {
        // Fetch the API endpoint
        const response = await request.get(`${baseURL}/users/2`);
        expect(response.ok()).toBeTruthy();
    
        const usrData = await response.json();
        // Retrieve response headers
        const headers = await response.headersArray();
        expect(headers).toContainEqual({ name: "Content-Type", value: "application/json; charset=utf-8" });
        expect(usrData.address.geo.lat).toBe("-43.9509");
    });
    

    test("Verify POST responses", async ({ request }) => {
        const response = await request.post(`${baseURL}/posts`, {
            data: postReq 
        });
    
        // Check if the request was successful and status code is 201 (Created)
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
    
       
         const respBody = await response.json();

        await expect(respBody.id).toBe(101);
        await expect(respBody.title).toContain('Nikola');
        console.log(await respBody);

    });

    test("Verify PUT responses", async ({ request }) => {
        const response = await request.put(`${baseURL}/posts/1`, {
            data: putData
        });
        
        // Check if the request was successful and status code is 200 (OK)
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        // Parse the response body as JSON
        const respBody = await response.json();
        
        // Verify the content of the response body
        expect(respBody.id).toBe(1);
        expect(respBody.title).toContain('JSON placeholder put request');
        console.log(respBody); // Log the updated resource

        await expect(respBody).toMatchObject(putDataResp);

    });

  
    test("Verify PATCH responses", async ({ request }) => {
        const response = await request.patch(`${baseURL}/posts/1`, {
            data: patchReq
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const respBody = await response.json();

        await expect(respBody.title).toContain(patchReq.title);
        await expect(respBody.body).toContain(patchReq.body);
        console.log(respBody); // Log the updated resource

        // const getResponse = await request.get(`${baseURL}/posts/1`);
        // console.log(await getResponse.json());
    


    });

    test("Verify DELETE responses", async ({ request }) => {

        const response = await request.delete(`${baseURL}/posts/1`);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const respBody = await response.json();
        await expect(respBody).toMatchObject({});

        console.log(await respBody);

        const getResponse = await request.get(`${baseURL}/posts/1`);
        console.log(await getResponse.json());

    });

});