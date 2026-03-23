describe('SauceDemo - Acesso inicial', () => {

  it('Deve abrir a página e exibir o login', () => {
    
    cy.visit('https://www.saucedemo.com/')

    // Valida se os elementos principais estão visíveis
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')

  })

})