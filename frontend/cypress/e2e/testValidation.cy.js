// // describe('template spec', () => {
// //   it('passes', () => {
// //     cy.visit('http://localhost:3000/');
// //   });
// // });
// // describe('File Upload Test', () => {
// //   let uniqueEmail;
// //   let timestamp;
// //   let name = 'Raghav Agarwal';

// //   before(() => {
// //     cy.clearCookies();
// //     cy.clearLocalStorage();
// //     timestamp = Date.now();
// //     uniqueEmail = `newUser${timestamp}@example.com`;
// //   });

// //   it('should upload an XML file successfully', () => {
// //     cy.visit('/register');
// //     // Registering a new user and going to the dashboard
// //     cy.get('[data-testid="register-name"]').type(name);
// //     cy.get('[data-testid="register-email"]').type(uniqueEmail);
// //     cy.get('[data-testid="register-password"]').type('T@123timestamp');
// //     cy.get('[data-testid="register-check-password"]').type('T@123timestamp');
// //     cy.get('[data-testid="register-submit"]').click();

// //     cy.url().should('include', '/dashboard');

// //     cy.wait(1000);

// //     cy.visit('/dashboard/validate');
// //     // Click the upload box to open the modal
// //     cy.get('[data-testid="upload-xml-plus-btn"]').click();

// //     // Fill in the file name input
// //     cy.get('input[type="text"]').type('Test File Name');

// //     // Upload the XML file
// //     cy.get('input[type="file"]').attachFile('sample1.xml');

// //     // Click the upload button
// //     cy.get('[data-testid="upload-xml-submit-btn"]').click();

// //     // Add assertions to verify the upload behavior
// //     // For example, you might check if a specific API request was made or a success message is shown
// //     // This will depend on your application's behavior after the file upload
// //   });

// //   after(() => {
// //     // Making a request to delete the user after each test
// //     cy.request({
// //       method: 'DELETE',
// //       url: `http://localhost:5003/auth/delete-user/${uniqueEmail}`,
// //       failOnStatusCode: false,
// //     }).then((response) => {
// //       expect(response.status).to.eq(200);
// //     });
// //   });
// // });
// describe('File Upload Test', () => {
//   let uniqueEmail;
//   let timestamp;
//   const name = 'Raghav Agarwal';
//   const password = `T@123${Date.now()}`;

//   before(() => {
//     cy.clearCookies();
//     cy.clearLocalStorage();
//     timestamp = Date.now();
//     uniqueEmail = `newUser${timestamp}@example.com`;
//   });

//   it('should upload an XML file successfully', () => {
//     cy.visit('/register');

//     // Registering a new user and going to the dashboard
//     cy.get('[data-testid="register-name"]').type(name);
//     cy.get('[data-testid="register-email"]').type(uniqueEmail);
//     cy.get('[data-testid="register-password"]').type(password);
//     cy.get('[data-testid="register-check-password"]').type(password);
//     cy.get('[data-testid="register-submit"]').click();

//     cy.url().should('include', '/dashboard');
//     cy.wait(1000);

//     cy.visit('/dashboard/validate');

//     // Click the upload box to open the modal
//     cy.get('[data-testid="upload-xml-plus-btn"]').click();

//     // Fill in the file name input
//     cy.get('input[type="text"]').type('Test File Name');

//     // Upload the XML file
//     const fileName = 'sample1.xml';
//     const mimeType = 'application/xml';

//     cy.fixture(fileName).then((fileContent) => {
//       const blob = Cypress.Blob.binaryStringToBlob(fileContent, mimeType);
//       const file = new File([blob], fileName, { type: mimeType });
//       const dataTransfer = new DataTransfer();
//       dataTransfer.items.add(file);

//       cy.get('input[type="file"]').then((input) => {
//         input[0].files = dataTransfer.files;
//         input[0].dispatchEvent(new Event('change', { bubbles: true }));
//       });
//     });

//     // Wait for the upload button to be enabled
//     cy.get('[data-testid="upload-xml-submit-btn"]').should('not.be.disabled');

//     // Click the upload button
//     cy.get('[data-testid="upload-xml-submit-btn"]').click();

//     // Add assertions to verify the upload behavior
//     cy.contains('Upload successful').should('be.visible'); // Example assertion for success message
//   });

//   after(() => {
//     // Making a request to delete the user after each test
//     cy.request({
//       method: 'DELETE',
//       url: `http://localhost:5003/auth/delete-user/${uniqueEmail}`,
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//     });
//   });
// });
