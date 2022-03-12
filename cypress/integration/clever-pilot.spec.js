/// <reference types="cypress" />

describe('Clever pilot game', () => {
    beforeEach(() => {
        cy.visit('https://clever-pilot.vercel.app/')
    })

    it('drags and drops correctly', () => {
        cy.dragAndDrop(
            '[data-rbd-draggable-id="1"]',
            '[data-rbd-droppable-id="lighters"]'
        )

        cy.get('[data-rbd-droppable-id="lighters"] li').should('have.length', 1)
        cy.get('[data-rbd-droppable-id="darkers"] li').should('not.exist')

    })

    it('resets game when clicked on the button', () => {
        cy.dragAndDrop(
            '[data-rbd-draggable-id="2"]',
            '[data-rbd-droppable-id="darkers"]'
        )

        cy.contains("Try again").click()
        cy.get('[data-rbd-droppable-id="lighters"] li').should('not.exist')
        cy.get('[data-rbd-droppable-id="darkers"] li').should('not.exist')
    })

    it('shows a message when the game is not finished', () => {
        cy.dragAndDrop(
            '[data-rbd-draggable-id="2"]',
            '[data-rbd-droppable-id="lighters"]'
        )

        cy.contains("Submit").click()
        cy.contains("the game is not finished yet!").should("exist")
    })
})