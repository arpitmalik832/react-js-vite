describe('app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('display header along with the button', () => {
    cy.get('[data-cy=button]').should('have.text', 'count is 0');
  });
});
