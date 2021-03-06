/// <reference types="cypress"/>

import { TodoPage } from '../pages/todoPage'

const todoPage = new TodoPage()
it('should load successfully', () => {
    cy.visit('/')
})
describe('todo actions', () => {
    context('with no todos', () => {
        beforeEach(() => {
            cy.deleteTodos()
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
        it('should toggle todo', ()=>{
            cy.server()
            cy.route('POST', `${Cypress.env('API_URL')}add`).as('saveTodo')
            cy.fixture('todos').then(todos =>{
                const target = Cypress._.head(todos)
                todoPage.addTodo(target.name)
                cy.wait('@saveTodo')
                todoPage.validateInputCleared()
                todoPage.validateTodoText(0, target.name)
                todoPage.validateTodoIncomplete(0)
                todoPage.toggleTodo(0)
                todoPage.validateTodoComplete(0)
            })
        })
        it('should delete todo', ()=>{
            cy.server()
            cy.route('POST', `${Cypress.env('API_URL')}add`).as('saveTodo')
            cy.fixture('todos').then(todos =>{
                const target = Cypress._.head(todos)
                todoPage.addTodo(target.name)
                cy.wait('@saveTodo')
                todoPage.validateInputCleared()
                todoPage.validateTodoText(0, target.name)
                todoPage.validateTodoIncomplete(0)
                todoPage.deleteTodo(0)
                todoPage.validateTodoDeleted(0)
            })
        })
    })
    context('with saved todos', () => {
        beforeEach(() => {
            cy.deleteTodos()
        })
        it('should load and display existing todos', () => {
            //load and save todos from fixtures
            cy.seedAndVisit()
            cy.get('.todo-list').children().should('have.length', 3)
        })
    })
})
