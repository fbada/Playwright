@smoke
Feature: Demo Applicaton on Heroku


    Scenario: Verify Login on Demo Application

        Given I am on the demo application
        Given I enter the username "tomsmith"
        And I enter the password "SuperSecretPassword!"
        When  I click on the login button
        Then I verify the title of the page is "The Internet"
        Then I should see the message "Welcome to the Secure Area."


    Scenario: Verify invalid password login on Demo Application

        Given I am on the demo application
        Given I enter the username "tomsmith"
        And I enter the password "SuperSecretPassword"
        When  I click on the login button
        Then I would see the message "Your password is invalid!"

    Scenario: Verify invalid username login on Demo Application

        Given I am on the demo application
        Given I enter the username "invalidUser"
        And I enter the password "SuperSecretPassword"
        When  I click on the login button
        Then I would see the message "Your username is invalid!"

@wip
    Scenario: Successful logout
        Given I have logged in successfully to the demo application
        When I click on the logout button
        Then I should be redirected to the login page

    
    Scenario Outline: Attempt to XSS the login form with various scripts
        Given I am on the demo application
        When I enter the username "<username>"
        And I enter the password "<password>"
        And I click on the login button
        Then I would see the message "Your username is invalid!"


        Examples:
            | username                                  | password    |
            | <script>alert('XSS')</script>             | password123 |
            | <img src=x onerror=alert('XSS')>          | password123 |
            | ' onmouseover=alert('XSS')                | password123 |
            | <div onclick=alert('XSS')>Click me!</div> | password123 |
            | <iframe src=javascript:alert('XSS')>      | password123 |

