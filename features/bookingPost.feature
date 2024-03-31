@WIP
Feature: E2E flow of a booking in Restful Booker API


Scenario: POST request

Given the user provides "https://restful-booker.herokuapp.com" and "booking"
When the user sets the data using "postdata.json"
And the user sends a "POST" request
Then the user should see the response code 200
And the user "booking.firstname" should be "Fenny"


Scenario: negative POST request

Given the user provides "https://restful-booker.herokuapp.com" and "bookingg"
When the user sets the data using "postdata.json"
And the user sends a "POST" request
Then the user should see the response code 404


