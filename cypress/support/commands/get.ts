Cypress.Commands.add('getByTestId', (testId) => {
    return cy.get(`[test-id='${testId}']`);
});

