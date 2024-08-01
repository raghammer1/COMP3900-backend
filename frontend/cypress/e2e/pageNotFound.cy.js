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

    cy.visit('/error');
  });

  after(() => {
    // Navigating to the dashboard and logging out
    cy.visit('/dashboard/main');
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
