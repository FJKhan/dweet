export class TodoPage {
    addTodo = (text) => {
        cy.get('.todo-input').type(`${text}{enter}`)
    }
    deleteTodo = () =>{
        cy.get(`.todo-list:nth-child(${index})`)
    }
    toggleTodo = (index) =>{
        cy.get(`.todo-list:nth-child(${index})`).click()
    }
    validateInputCleared = () =>{
        cy.get('.todo-input').should('have.value','')
    }
    validateTodoText = (index=0, text) =>{
        cy.get(`.todo-list:nth-child(${index})`).should('have.text', text)
    }
    validateTodoIncomplete =(index)=>{
        cy.get(`.todo-list:nth-child(${index})`).should('not.have.class', 'completed')
    }
    validateTodoComplete =(index)=>{
        cy.get(`.todo-list:nth-child(${index})`).should('have.class', 'completed')
    }
}