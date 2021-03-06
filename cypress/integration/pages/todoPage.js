export class TodoPage {
    addTodo = (text) => {
        cy.get('.todo-input').type(`${text}{enter}`)
    }
    deleteTodo = (index) =>{
        cy.get(`.todo`).eq(index).find(`.delete-icon`).click()
    }
    toggleTodo = (index) =>{
        cy.get(`.todo`).eq(index).click()
    }
    validateInputCleared = () =>{
        cy.get('.todo-input').should('have.value','')
    }
    validateTodoText = (index, text) =>{
        cy.get(`.todo`).eq(index).should('have.text', text)
    }
    validateTodoIncomplete =(index)=>{
        cy.get(`.todo`).eq(index).find('.todo-text').should('not.have.class', 'line-through text-mint')
    }
    validateTodoComplete =(index)=>{
        cy.get(`.todo`).eq(index).find('.todo-text').should('have.class', 'line-through text-mint')
    }
    validateTodoDeleted = (index) =>{
        cy.get(`.todo`).eq(index).should('not.exist')
    }
}