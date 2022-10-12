// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

const defaultTimeout = 4000;
const retryInterval = 250;

// Cypress.Commands.add('login', (email, password) => { ... })
function checkIfElementExists(selector, timeout, waitedFor = 0) {
    if (waitedFor > timeout) {
        return cy.wrap(null);
    }

    cy.get('body').then(($body) => {
        if ($body.find(selector).length == 0) {
            cy.wait(retryInterval, { log: false });
            checkIfElementExists(
                selector,
                timeout,
                (waitedFor += retryInterval)
            );
        } else {
            return cy.get(selector);
        }
    });
}

Cypress.Commands.add('exists', (selector, timeout) => {
    checkIfElementExists(selector, timeout ?? defaultTimeout);
});

Cypress.Commands.add('dataCy', (elementIdentifier) => {
    return cy.get(`[data-cy=${elementIdentifier}]`);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
