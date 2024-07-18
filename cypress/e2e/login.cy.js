describe('login', () => {
  it('shows logged-in user\'s username', () => {
    cy.visit('/');
    cy.findByRole('link', { name: /Log In/i }).click();
    cy.findByLabelText(/Username/i).type('Tester');
    cy.findByLabelText(/Password/i).type('pass');
    cy.findByRole('button', { name: /Log In/i }).click();
    cy.findByRole('link', { name: /Log In/i }).should('not.exist');
    cy.findByText(/Tester/i);
  })  
})