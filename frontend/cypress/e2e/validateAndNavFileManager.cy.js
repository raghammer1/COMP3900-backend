describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
  });
});

describe('Auth Testing', () => {
  let uniqueEmail;
  let timestamp;
  let name = 'Raghav Agarwal';

  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    timestamp = Date.now();
    uniqueEmail = `newUser${timestamp}@example.com`;
  });

  it('allows a user to register', () => {
    cy.visit('/register');
    cy.viewport(1500, 1000);

    // Registering a new user and going to the dashboard
    cy.get('[data-testid="register-name"]').type(name);
    cy.get('[data-testid="register-email"]').type(uniqueEmail);
    cy.get('[data-testid="register-password"]').type('T@123timestamp');
    cy.get('[data-testid="register-check-password"]').type('T@123timestamp');
    cy.get('[data-testid="register-submit"]').click();

    cy.wait(2000);
    cy.url().should('include', '/dashboard');

    cy.wait(1000);

    // Navigating to the validate page
    // cy.visit('/dashboard/validate');
    cy.get('[data-testid="goto-validate-dashboard"]').click();
    cy.wait(1000);

    // Ensure the element exists and is visible before clicking
    cy.get('[data-testid="upload-xml-plus-btn"]').should('be.visible').click();
    cy.get('[data-testid="validate-upload-name"]').type('test');
    // Define the file path and MIME type
    const fileName = 'test.xml';
    const fileType = 'text/xml';

    cy.intercept('POST', '/validate/validate-ubl').as('getValidationData');

    // Attach the file with the correct MIME type
    cy.fixture(fileName, 'base64').then((fileContent) => {
      cy.get('[data-testid="validate-upload-file"]').attachFile({
        fileContent,
        fileName,
        mimeType: fileType,
        encoding: 'base64',
      });
    });

    cy.get('[data-testid="upload-xml-submit-btn"]')
      .should('be.visible')
      .click();

    // Wait for the API call to complete
    cy.wait('@getValidationData').its('response.statusCode').should('eq', 200);

    cy.wait(1000);
    cy.get('[data-testid="validation-record"]').click();
    cy.wait(1000);

    cy.get('[data-testid="file-manager-validate-ubl"]').click();
    cy.get('[data-testid="file-manager-validate-validate"]').click();
    cy.get('[data-testid="download-html"]').click();
    cy.get('[data-testid="pdf-lol-validation"]').click();
    cy.get('[data-testid="json-validation"]').click();
    cy.get('[data-testid="json-download"]').click();
    cy.get('[data-testid="file-manager-validate-share"]').click();
    cy.get('[data-testid="file-manager-validate-access"]').click();
    cy.get('[data-testid="file-manager-validate-email-history"]').click();
    cy.get('[data-testid="file-manager-validate-help"]').first().click();

    cy.get('[data-testid="file-manager-validate-share"]').click();
    // You can add further tests to interact with the modal if needed
    cy.get('[data-testid="email-share-board"]').type('hexahunks@gmail.com');
    cy.get('[data-testid="subject-share-board"]').type('test');
    cy.get('[data-testid="body-share-board"]').type('test');

    cy.get('[data-testid="share-validate-validator"]').find('input').check();
    cy.get('[data-testid="share-validate-xml"]').find('input').check();

    cy.intercept('POST', '/sendFile').as('fileSend');
    cy.get('[data-testid="confirm-send-validate-email"]').click();
    cy.wait('@fileSend').its('response.statusCode').should('eq', 200);

    cy.get('[data-testid="file-manager-validate-email-history"]').click();

    cy.get('[data-testid="file-manager-validate-access"]').click();
    cy.get('[data-testid="access-manager-validate-email"]').type(
      'test@loler.com'
    );
    cy.get('[data-testid="access-manager-validate-submit"]').click();
    cy.get('[data-testid="access-manager-validate-submit-yes"]').click();
  });

  // after(() => {
  //   cy.get('[data-testid="dashboard-button"]').click();
  //   cy.get('[data-testid="logout-button"]').click();
  //   // Making a request to delete the user after each test
  //   cy.request({
  //     method: 'DELETE',
  //     url: `http://localhost:5003/auth/delete-user/${uniqueEmail}`,
  //     failOnStatusCode: false,
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //   });
  // });
});
