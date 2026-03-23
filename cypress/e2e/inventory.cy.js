import InventoryPage from '../pages/InventoryPage'

describe('Inventory', () => {

    beforeEach(()=>{
        cy.login()
    })

  it('Checar se é possível colocar produto no carrinho', () => {    
    InventoryPage.escolherProduto("Sauce Labs Backpack")
    InventoryPage.escolherProduto("Sauce Labs Bolt T-Shirt")
    InventoryPage.carrinhoDeveConter('2')
  })

  it('Remover algum item do carrinho e validar', ()=>{
    InventoryPage.escolherProduto("Sauce Labs Backpack")
    InventoryPage.escolherProduto("Sauce Labs Bolt T-Shirt")
    InventoryPage.carrinhoDeveConter('2')

    InventoryPage.excluirProdutoCarrinho("Sauce Labs Backpack")
    InventoryPage.carrinhoDeveConter('1')
  })

  it('Abre detalhes de produtos específicos e validar', ()=>{
    InventoryPage.abrirProdutosDetalhes("Sauce Labs Fleece Jacket")
    cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=5')
    cy.contains('.inventory_details_name', 'Sauce Labs Fleece Jacket').should('be.visible')
    cy.contains('.inventory_details_price', '49.99')
  })

  it('Testar lista e visibilidade de produtos', ()=>{
    cy.get('.inventory_list')
      .should('exist')
      .and('be.visible')

    cy.get('.inventory_item')
      .should('have.length.greaterThan', 0)
      .and('be.visible')

    cy.get('.inventory_item_name')
      .should('not.be.empty')
      .and('contain', 'Sauce')

    cy.get('.inventory_item_price')
      .should('not.be.empty')
      .and('contain', '$')

    cy.get('.inventory_item').first()
      .should('attr', 'data-test')
  })

  it('Seleção de produtos e conteúdo dos produtos', ()=>{
    cy.get('.product_sort_container')
      .should('exist')
      .and('be.visible')
      .select('Name (Z to A)')

    cy.get('.inventory_item_name').first()
      .should('not.be.empty')
      .and('contain', 'T-Shirt')
      .click()

    cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=3')

    cy.get('[data-test="inventory-item-name"]')
      .should('be.visible')
      .and('not.be.empty')
      .and('have.text', 'Test.allTheThings() T-Shirt (Red)')

    cy.get('[data-test="inventory-item-desc"]')
      .should('be.visible')
      .and('not.be.empty')
      .and('have.text', 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.')

    cy.get('[data-test="inventory-item-price"]')
      .should('be.visible')
      .and('have.text', '$15.99')

    cy.get('[data-test="add-to-cart"]')
      .should('be.visible')
      .and('have.text', 'Add to cart')

  })

  it('Adicionar e remover produtos do carrinho', ()=>{

    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
      .closest('.inventory_item')
      .find('button')
      .as('botaoCarrinho')
      .click()

    cy.get('@botaoCarrinho')
      .should('have.text', 'Remove')
      .and('have.class', 'btn_secondary')
      .and('not.have.class', 'btn_primary')

    cy.get('[data-test="shopping-cart-badge"]')
      .should('be.visible')
      .and('have.text', '1')

    cy.get('@botaoCarrinho').click()

    cy.get('@botaoCarrinho')
      .should('have.text', 'Add to cart')
      .and('have.class', 'btn_primary')
      .and('not.have.class', 'btn_secondary')

    cy.get('[data-teste="shopping-cart-badge"]')
      .should('not.exist')

  })
    it('Adicionar e remover produtos do carrinho', ()=>{

      cy.get('.inventory_item')
      .should('have.length', 6)

    cy.get('.product_sort_container')
      .select('Price (low to high)')

    cy.get('.inventory_item')
      .should('have.length', 6)

    cy.get('.inventory_item_price')
      .first()
      .should('have.text', '$7.99')

    cy.get('.product_sort_container')
      .select('Price (high to low)')

    cy.get('.inventory_item')
      .should('have.length', 6)

    cy.get('.inventory_item_price')
      .first()
      .should('have.text', '$49.99')

    cy.get('.inventory_item_name')
      .first()
      .should('have.text', 'Sauce Labs Fleece Jacket')
  })

  it('Checkout', ()=>{
    
    InventoryPage.escolherProduto('Sauce Labs Backpack')

    cy.get('[data-test="shopping-cart-link"]')
      .should('exist')
      .and('be.visible')
      .click()

    cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

    cy.get('[data-test="checkout"]')
      .should('exist')
      .and('be.visible')
      .click()

    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')

    cy.get('[data-test="firstName"]')
      .should('exist')
      .and('be.visible')
      .and('be.enabled')
      .and('have.attr', 'placeholder', 'First Name')

    cy.get('[data-test="lastName"]')
      .should('exist')
      .and('be.visible')
      .and('be.enabled')
      .and('have.attr', 'placeholder', 'Last Name')

    cy.get('[data-test="postalCode"]')
      .should('exist')
      .and('be.visible')
      .and('be.enabled')
      .and('have.attr', 'placeholder', 'Zip/Postal Code')

    cy.get('[data-test="continue"]')
      .should('exist')
      .and('be.visible')
      .and('be.enabled')
      .and('have.attr', 'value', 'Continue')

    cy.get('[data-test="firstName"]').type('Smart')
    cy.get('[data-test="lastName"]').type('QA')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html')

    cy.get('.summary_info')
      .should('exist')
      .and('be.visible')

    cy.get('[data-test="subtotal-label"]')
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Item total: $29.99')

    
   cy.get('[data-test="finish"]')
      .should('exist')
      .and('be.visible')
      .and('be.enabled')
      .and('have.text', 'Finish')
      .click()

    cy.get('[data-test="complete-header"]')
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Thank you for your order!')

    cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html')

  })

})