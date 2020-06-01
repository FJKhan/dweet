/// <reference types="cypress"/>

import { TodoPage } from '../pages/todoPage'

const todoPage = new TodoPage()
const deleteTodos = () => {
    cy.request('GET', Cypress.env('API_URL'))
        .its('body.todos')
        .each((todo) =>
            cy.request('DELETE', `${Cypress.env('API_URL')}/id/${todo._id}`)
        )
}
it('should load successfully', () => {
    cy.visit('/')
})
describe('todo actions', () => {
    context('with no todos', () => {
        beforeEach(() => {
            //Delete any existing todos
            deleteTodos()
            cy.visit('/')
        })
        afterEach(() => {
            //Delete any existing todos
            deleteTodos()
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

    context('with saved todos', () => {
        afterEach(() => {
            //Delete any existing todos
            deleteTodos()
        })
        it('should load and display existing todos', () => {
            //load and save todos from fixtures
            cy.fixture('todos').each((todo) =>
                cy.request('POST', `${Cypress.env('API_URL')}/add`, todo)
            )
            cy.visit('/')
            cy.get('.todo-list').children().should('have.length', 3)
        })
    })
})
