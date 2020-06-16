/// <reference types="cypress"/>

describe('todo filters', () => {
    beforeEach(()=>{
        cy.visit('/')
    })
    it.only('shows todo filters', () => {
        cy.contains(/all/i)
        cy.contains(/active/i)
        cy.contains(/completed/i)
    })
})
