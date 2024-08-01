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
    cy.get('[data-testid="goto-settings-dashboard"]').click();
    cy.get('[data-testid="delete-profile-button"]').click();

    cy.get('[data-testid="delete-user-password-final"]').type('T@123timestamp');

    cy.get('[data-testid="submit-delete-user-button"]').click();
    cy.wait(1000);
  });
});
