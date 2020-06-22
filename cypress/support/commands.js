Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos') => {
    cy.server()
    cy.fixture('todos').each((todo) =>
        cy.request('POST', `${Cypress.env('API_URL')}/add`, todo)
    )
    cy.visit('/')
})

Cypress.Commands.add('deleteTodos', () => {
    cy.request('GET', Cypress.env('API_URL'))
        .its('body.todos')
        .each((todo) =>
            cy.request('DELETE', `${Cypress.env('API_URL')}/id/${todo._id}`)
        )
})
