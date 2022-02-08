const apiUrl = `${Cypress.env("apiUrl")}`

describe('Frontend Test Spec', () => {
  it('should visit index', () => {
    cy.visit('/')
  })
})
