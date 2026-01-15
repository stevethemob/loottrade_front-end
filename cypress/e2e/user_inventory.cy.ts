describe('User Inventory Test', () => {
    it('logs in, goes to Black Myth Wukong, and sees Woodiron Staff in inventory', () => {
        cy.visit('/login')

        cy.get('input[placeholder="Username"]').type('user')
        cy.get('input[placeholder="Password"]').type('user1')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/games')

        cy.contains('black myth wukong').click()

        cy.contains('your inventory').click()

        cy.contains('woodiron staff').should('be.visible')
    })
})
