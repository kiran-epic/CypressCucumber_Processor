const report = require('multiple-cucumber-html-reporter');
report.generate({
    jsonDir: 'cypress/reports/cucumber-json', // ** Path of .json file **//
    reportPath: 'cypress/reports/cucumber-report',
    displayDuration: true,
    hideMetadata: true,
});
