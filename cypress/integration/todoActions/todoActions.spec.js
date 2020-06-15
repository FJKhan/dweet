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
        it('should render todo form', () => {
            cy.get('.todo-input').should('exist')
            cy.focused().should('have.class', 'todo-input')
        })
        it('should not add empty todo', () => {
            todoPage.addTodo('')
            cy.get('.todo-text').should('not.exist')
        })
        it('should add non-empty todo', () => {
            cy.server()
            cy.route('POST', `${Cypress.env('API_URL')}add`).as('saveTodo')
            cy.fixture('todos').each((todo, index) => {
                todoPage.addTodo(todo.name)
                cy.wait('@saveTodo')
                todoPage.validateInputCleared()
                todoPage.validateTodoText(index, todo.name)
                todoPage.validateTodoIncomplete(index)
            })
        })
    })
    context('with saved todos', () => {
        beforeEach(() => {
            //Delete any existing todos
            deleteTodos()
        })
        it('should load and display existing todos', () => {
            //load and save todos from fixtures
            cy.seedAndVisit()
            cy.get('.todo-list').children().should('have.length', 3)
        })
    })
})
