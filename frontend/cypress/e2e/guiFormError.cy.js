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
    cy.get('[data-testid="convert-upload-button"]').click();
    cy.get('[data-testid="goto-gui-form"]').click();
    cy.get('[data-testid="invoice-number"]').type('1');
    cy.get('[data-testid="issue-date"]').type('2011-01-01');
    cy.get('[data-testid="due-date"]').type('2011-01-01');
    cy.get('[data-testid="purchase-order-number"]').type('1');
    cy.get('[data-testid="subtotal-amount"]').type('1');
    cy.get('[data-testid="tax-amount"]').type('1');
    cy.get('[data-testid="total-amount"]').type('1');
    cy.get('[data-testid="text-name"]').type('1');
    cy.get('[data-testid="text-name-customer"]').type('1');
    cy.get('[data-testid="text-address-cus"]').type('1');
    cy.get('[data-testid="text-vat_number-cus"]').type('1');

    cy.get('[data-testid="text-id"]').type('1');
    cy.get('[data-testid="text-id-number"]').type('1');
    cy.get('[data-testid="text-id-total"]').type('1');
    cy.get('[data-testid="text-id-description"]').type('1');
    cy.get('[data-testid="text-id-price"]').type('1');
    cy.get('[data-testid="user-name-file"]').type('1');
    cy.get('[data-testid="user-vendor-name-2"]').type('0847976000005');
    cy.get('[data-testid="user-customer-name-2"]').type('0847976000005');

    cy.get('[data-testid="user-save-gln-check-this"]').find('input').check();
    cy.get('[data-testid="gui-form-submit-button"]').click();
  });
});
