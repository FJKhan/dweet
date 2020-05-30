/// <reference types="cypress"/>

import { TodoPage } from '../pages/todoPage'

const todoPage = new TodoPage()
it('should load successfully', () => {
    cy.visit('/')
})
describe('todo actions', () => {
    beforeEach(() => {
        //Delete any existing todos
        cy.request('GET', Cypress.env('API_URL'))
        .its('body.todos')
        .each(todo => cy.request('DELETE', `${Cypress.env('API_URL')}/id/${todo._id}`))
        cy.visit('/')
    })
    it('should render todo form', () => {
        cy.get('.todo-input').should('exist')
        cy.focused().should('have.class', 'todo-input')
    })
    it('should not add empty todo', () => {
        todoPage.addTodo('')
        cy.get('.todo-text').should('not.exist')
    })
    it('should add non-empty todo', () => {
        const text = 'do something'
        todoPage.addTodo(text)
        todoPage.validateInputCleared()
        todoPage.validateTodoText(1, text)
        todoPage.validateTodoIncomplete(1)
    })
})
