/// <reference types="cypress"/>

it('should load successfully', ()=>{
    cy.visit('/')
})
describe('todo actions', ()=>{
    beforeEach(() => {
        cy.visit('/')
    })
    it('should render todo form', () => {
        cy.get('.todo-input').should('exist')
    })
})