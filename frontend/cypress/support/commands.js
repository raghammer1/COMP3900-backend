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
// Cypress.Commands.add('login', (email, password) => { ... })
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
import 'cypress-file-upload';

// Custom command to attach a file and verify its extension
Cypress.Commands.add('attachFileAndCheckExtension', (fileName, mimeType) => {
  cy.fixture(fileName).then((fileContent) => {
    const file = new File([fileContent], fileName, { type: mimeType });
    const event = { dataTransfer: { files: [file] } };

    // Check the file extension
    const extension = fileName.split('.').pop().toLowerCase();
    expect(extension).to.equal('xml', 'File extension should be xml');

    // Attach the file
    cy.get('input[type="file"]').trigger('drop', event);
  });
});
