Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos') => {
    cy.server()
    cy.fixture('todos').each((todo) =>
        cy.request('POST', `${Cypress.env('API_URL')}/add`, todo)
    )
    cy.visit('/')
})
