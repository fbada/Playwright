#!/bin/bash

# Prompt the user to enter the tag
read -p "Enter the tag: " TAG

# Run Cucumber-JS tests with the specified tag and output JSON report
npx cucumber-js --tags $TAG --format=json > report.json

# Run the custom reporter script to open the generated report
node generate-reporter.js
open cucumber_report.html
