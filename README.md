# Automated Testing Suite for Form Submission

This repository contains a Playwright-based automated testing suite designed to validate the functionality and security of a form submission feature. It leverages the Page Object Model (POM) for maintainability and implements Data-Driven Testing (DDT) to cover a wide range of input scenarios, including negative and security-related tests.

## Features

- **Page Object Model (POM)**: Organizes code structure to improve maintainability and readability. Each page involved in the tests has a corresponding page object file that encapsulates the page's functionalities.
  
- **Data-Driven Testing (DDT)**: Enhances test coverage by running tests across multiple data sets, including positive, negative, and security vulnerability scenarios.

---

# Playwright Testing Framework with POM and DDT

This repository demonstrates an automated testing framework using [Playwright](https://playwright.dev/), incorporating the Page Object Model (POM) for maintainability and Data-Driven Testing (DDT) for scalability. The framework is designed to test web form submissions with various sets of data to ensure robustness and security against common vulnerabilities like XSS.

## Project Structure

```
POM/
│   ├── BasePage.js         # Base class for page objects, containing common methods
│   ├── FormPage.js         # Page object for the form, extending BasePage
│   ├── FormTest.spec.js    # Basic Playwright test script using POM
│   ├── FormTestDDT.spec.js # Data-driven test script using POM and external test data
│   ├── testData.js         # Test data for DDT
│   └── testUtils.js        # Utility functions for common test actions
```

## Installation

To set up the testing environment, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org/) installed (v12.x or higher recommended).
2. Clone this repository to your local machine.
3. Navigate to the project directory and install dependencies:
   ```bash
   cd POM
   npm install
   ```

## Running Tests

- To run a specific test file, use the `npx playwright test` command followed by the file path:
  ```bash
  npx playwright test FormTest.spec.js
  ```

- To run tests with Data-Driven Testing (DDT):
  ```bash
  npx playwright test FormTestDDT.spec.js
  ```

- Node.js (v12 or later)
- npm (v6 or later)

### Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-repository-url.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-project-directory
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```

### Running the Tests

Execute the following command to run the test suite:

```bash
npx playwright test
```

To run specific tests, use the test file's path with the command:

```bash
npx playwright test path/to/your/test/file
```
