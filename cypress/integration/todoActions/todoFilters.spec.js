/// <reference types="cypress"/>
import {TodoPage} from '../pages/todoPage'
describe('todo filters', () => {
    const todoPage = new TodoPage()
    beforeEach(() => {
        cy.deleteTodos()
        cy.seedAndVisit()
    })
    it('shows todo filters', () => {
        cy.visit('/')
        cy.contains(/all/i)
        cy.contains(/active/i)
        cy.contains(/completed/i)
    })
    it('shows all todos on startup', () => {
        cy.get('.todo-list').children().should('have.length', 3)
    })
    it.only('shows correct todos when filter is clicked', () => {
        //check for active todos
        cy.contains(/active/i).click()
        cy.get('.todo-list').children().should('have.length', 2)
        todoPage.validateTodoIncomplete(0)
        todoPage.validateTodoIncomplete(1)
        //check for completed todos
        cy.contains(/completed/i).click()
        cy.get('.todo-list').children().should('have.length', 1)
        todoPage.validateTodoComplete(0)
        //check for all todos
        cy.contains(/all/i).click()
        cy.get('.todo-list').children().should('have.length', 3)
    })
})
