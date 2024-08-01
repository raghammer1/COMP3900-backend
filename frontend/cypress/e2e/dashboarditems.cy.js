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

    // Replace these with actual data-testid values for elements you want to interact with
    const dashboardElements = [
      'goto-validate-dashboard',
      'goto-convert-dashboard',
      'goto-settings-dashboard',
      'goto-help-dashboard',
    ];

    dashboardElements.forEach((testId) => {
      cy.get(`[data-testid="${testId}"]`).first().click();
      cy.wait(1000); // Adjust wait time as needed
    });
  });

  //   it('navigates and interacts with elements on the dashboard', () => {

  //     // Example of navigating to the validate page and interacting with elements there
  //   });

  after(() => {
    // Navigating to the dashboard and logging out
    cy.get('[data-testid="logout-button"]').click();

    // Making a request to delete the user after each test
    cy.request({
      method: 'DELETE',
      url: `http://localhost:5003/auth/delete-user/${uniqueEmail}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
