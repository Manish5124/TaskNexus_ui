describe('User Auth Flow Tests', () => {

  let validManagerUsername: string;
  let validManagerPassword: string;
  let validAdminUsername: string;
  let validAdminPassword: string;
  let invalidUsername: string;
  let invalidPassword: string;
  let errorMessage: string;
  let userMessage: string;
  let adminMessage: string;

  before(() => {
    cy.fixture('auth.json').then((authData) => {
      validManagerUsername = authData.validManager.username;
      validManagerPassword = authData.validManager.password;

      validAdminUsername = authData.validAdmin.username;
      validAdminPassword = authData.validAdmin.password;

      invalidUsername = authData.invalidUser.username;
      invalidPassword = authData.invalidUser.password;

      errorMessage = authData.errorMessage;
      userMessage = authData.userMessage;
      adminMessage = authData.adminMessage;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
  });


  it('should disable Sign In button when form is empty', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should enable Sign In button when valid data is entered', () => {
    cy.get('[data-testid="username-input"]').type(validManagerUsername);
    cy.get('[data-testid="username-password"]').type(validManagerPassword);

    cy.get('button[type="submit"]').should('not.be.disabled');
  });


  it('should show error message for invalid credentials', () => {

    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: { message: errorMessage }
    }).as('loginRequest');

    cy.get('[data-testid="username-input"]').type(invalidUsername);
    cy.get('[data-testid="username-password"]').type(invalidPassword);
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.get('.error')
      .should('be.visible')
      .and('contain', errorMessage);
  });


  it('should navigate to register page', () => {
    cy.contains('Register').click();
    cy.url().should('include', '/register');
  });

});