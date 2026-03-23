import LoginPage from '../pages/LoginPage'

describe('Login', () => {

    beforeEach(()=>{
        LoginPage.visit()
    })

  it('Login com sucess', () => {

    cy.login()

  })


    it('Login sem sucess', () => {
    
    LoginPage.username('teste')
    
    LoginPage.password('costa')

    LoginPage.loginButton()

    LoginPage.errorMessage()

  })

})