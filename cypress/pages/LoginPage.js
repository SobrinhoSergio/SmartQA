class LoginPage {

    visit(){
        cy.visit('/')
    }

    username(username){
        cy.get('[data-test="username"]').type(username)
    }

    password(password){
        cy.get('[data-test="password"]').type(password)
    }

    loginButton(){
        cy.get('[data-test="login-button"]').click()
    }

    verifyURL(){
        cy.url().should('include', '/inventory')
    }

    errorMessage(){
        cy.get('[data-test="error"]').should('contain',
            'Epic sadface: Username and password do not match any user in this service')
    }

}

export default new LoginPage()