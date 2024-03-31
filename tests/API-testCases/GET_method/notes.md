# JSONPlaceholder API Tests - Student Notes

This document outlines the structure and purpose of a set of automated tests designed for the JSONPlaceholder API using Playwright. Playwright is a Node.js library used for browser automation, which allows for the testing of web applications by simulating user actions and API requests. The tests focus on validating the functionality and responses of the API's endpoints, specifically for GET, POST, and PUT requests.

## Test Setup

The test suite begins by importing necessary modules and test data from local files:

- `@playwright/test`: Provides the testing framework, including the `test`, `expect`, and `request` objects used to create and execute tests.
- `../data/putdata.json`: Contains the data payload for PUT requests.
- `../data/putResp.json`: Contains the expected response for validation in PUT requests.
- `../data/postReq.json`: Contains the data payload for POST requests.

## Test Suite: JSONPlaceholder API Tests

### Base URL

All tests are performed against the base URL of the JSONPlaceholder API: `https://jsonplaceholder.typicode.com`.

### Test 1: Verify GET Response Headers

**Objective**: To ensure that the GET request to the `/users/2` endpoint returns the correct headers and user data.

**Key Steps**:
1. Make a GET request to fetch data for user with ID 2.
2. Validate that the response status is successful (HTTP 200 OK).
3. Check the response headers for the correct content type (`application/json; charset=utf-8`).
4. Verify the latitude in the user's address to match "-43.9509".

### Test 2: Verify POST Responses

**Objective**: To validate the API's handling of POST requests by adding new posts.

**Key Steps**:
1. Submit a POST request to the `/posts` endpoint with a predefined request payload.
2. Ensure the request was successful and the response status code is 201 (Created).
3. Verify the response body contains an ID of 101 and the title includes the word 'Nikola'.

### Test 3: Verify PUT Responses

**Objective**: To check the API's ability to handle PUT requests by updating an existing post.

**Key Steps**:
1. Send a PUT request to the `/posts/1` endpoint with a specified data payload for updating a post.
2. Confirm the request was successful and returned a status code of 200 (OK).
3. Validate the response body against expected values, including the ID being 1 and the title containing 'JSON placeholder put request'.
4. Ensure the entire response matches the expected JSON object.

## Conclusion

This set of automated tests is designed to verify the functionality of the JSONPlaceholder API, focusing on the correct handling of GET, POST, and PUT requests. By validating response statuses, headers, and body content, these tests ensure that the API behaves as expected, providing a reliable interface for client applications.