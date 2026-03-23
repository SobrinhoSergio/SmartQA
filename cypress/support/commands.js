import LoginPage from '../pages/LoginPage'

Cypress.Commands.add('login', (username = "standard_user", password = "secret_sauce")=>{

    LoginPage.visit()
    
    LoginPage.username(username)
    
    LoginPage.password(password)

    LoginPage.loginButton()

    LoginPage.verifyURL()
    
})