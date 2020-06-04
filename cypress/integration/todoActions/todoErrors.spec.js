/// <reference  types= "cypress"/>

describe('todo errors', () => {
    it.only('displays error if getTodos fails', () => {
        const error = `Could not get todos`
        cy.server()
        cy.route({
            url: Cypress.env('API_URL'),
            method: 'GET',
            status: 500,
            response: { error: error}
        })
        cy.visit('/')
        cy.get('.todo-list').children().should('not.have.length.greaterThan', 0)
        cy.get('.error').should('be.visible')
    })
})