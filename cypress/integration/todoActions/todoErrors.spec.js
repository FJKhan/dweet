/// <reference  types= "cypress"/>

describe('todo errors', () => {
    beforeEach(()=>{
        cy.deleteTodos()
    })
    it('displays error if getTodos fails', () => {
        const error = `Could not get todos`
        cy.server()
        cy.route({
            url: 'api/todos',
            method: 'GET',
            status: 500,
            response: { error: error}
        }).as('loadPage')
        cy.visit('/')
        cy.wait('@loadPage')
        cy.get('.todo-list').children().should('not.have.length.greaterThan', 0)
        cy.get('.error').should('be.visible')
    })
})