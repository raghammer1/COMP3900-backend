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
    cy.get('[data-testid="goto-convert-dashboard"]').click();
    cy.wait(1000);

    // Ensure the element exists and is visible before clicking
    cy.get('[data-testid="convert-upload-button"]')
      .should('be.visible')
      .click();
    cy.get('[data-testid="convert-upload-name"]').type('test');
    cy.get('[data-testid="convert-vendor-gln"]').type('0847976000005');
    cy.get('[data-testid="convert-customer-gln"]').type('0847976000005');
    // Define the file path and MIME type
    const fileName = 'Invoice_BIG.pdf';
    const fileType = 'application/pdf';

    // Intercept the API call for uploading the PDF
    cy.intercept('POST', '/convert/upload-pdf').as('fileUpload');

    // Attach the PDF file with the correct MIME type
    cy.fixture(fileName, 'base64').then((fileContent) => {
      cy.get('[data-testid="convert-upload-file"]').attachFile({
        fileContent,
        fileName,
        mimeType: fileType,
        encoding: 'base64',
      });
    });

    cy.get('[data-testid="upload-pdf-submit-btn"]')
      .should('be.visible')
      .click();

    // Wait for the API call to complete
    cy.wait('@fileUpload').its('response.statusCode').should('eq', 200);

    cy.wait(1000);
    cy.get('[data-testid="conversion-record"]').click();
    cy.wait(1000);

    cy.get('[data-testid="file-manager-convert-pdf"]').click();
    cy.get('[data-testid="file-manager-convert-ubl"]').click();
    cy.get('[data-testid="file-manager-convert-validate"]').click();
    cy.get('[data-testid="file-manager-convert-share"]').click();
    cy.get('[data-testid="file-manager-convert-access"]').click();
    cy.get('[data-testid="file-manager-convert-email-history"]').click();
    cy.get('[data-testid="file-manager-convert-help"]').first().click();

    cy.get('[data-testid="file-manager-convert-share"]').click();
    // You can add further tests to interact with the modal if needed
    cy.get('[data-testid="email-share-board"]').type('hexahunks@gmail.com');
    cy.get('[data-testid="subject-share-board"]').type('test');
    cy.get('[data-testid="body-share-board"]').type('test');

    cy.get('[data-testid="share-convert-validator"]').find('input').check();
    cy.get('[data-testid="share-convert-pdf"]').find('input').check();
    cy.get('[data-testid="share-convert-xml"]').find('input').check();

    cy.intercept('POST', '/sendFile').as('fileSend');
    cy.get('[data-testid="confirm-send-convert-email"]').click();
    cy.wait('@fileSend').its('response.statusCode').should('eq', 200);

    cy.get('[data-testid="file-manager-convert-email-history"]').click();

    cy.get('[data-testid="file-manager-convert-access"]').click();
    cy.get('[data-testid="access-manager-convert-email"]').type(
      'test@loler.com'
    );
    cy.get('[data-testid="access-manager-convert-submit"]').click();
    cy.get('[data-testid="access-manager-convert-submit-yes"]').click();
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
