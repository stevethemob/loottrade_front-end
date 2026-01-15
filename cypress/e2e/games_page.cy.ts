describe('Admin can see Add Game button', () => {
  it('logs in as admin and sees Add Game button', () => {
    cy.visit('/login')

    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin1')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/games')

    cy.get('.add-game-button').should('be.visible')
    cy.contains('+ Add Game')
  })
})