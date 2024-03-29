const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'report.json', // Path to your JSON output
    output: 'cucumber_report.html', // Name of the HTML report to generate
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true, // Automatically open the report in a browser
    "metadata": {
        "App Version": "0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome 90, Firefox 88",
        "Operating System": "macOS Big Sur, Windows 10",
        "Test Runner": "Cucumber with Playwright",
        "Execution Date": "2024-03-29",
        "Test Data Source": "Version 1.2 of TestData.xlsx",
        "Commit Hash": "abc123",
        "Build Number": "Build 456",
        "Test Coverage": "Login, Logout",
    }
    
};

reporter.generate(options);
