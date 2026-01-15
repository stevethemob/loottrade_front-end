describe('log in button exists', () => {
    it('looks wether log in button exists', () => {
        cy.visit('/login')

        cy.contains('Log in')
    })
})