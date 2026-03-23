class InventoryPage {

    escolherProduto(nome){
        cy.contains('.inventory_item_name', nome)
            .closest('.inventory_item')
            .find('button')
            .click()
    }

    excluirProdutoCarrinho(nome){
        cy.contains('.inventory_item_name', nome)
            .closest('.inventory_item')
            .find('button')
            .click()
    }

    carrinhoDeveConter(numero){
        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .should('contain', numero)
    }

    abrirProdutosDetalhes(nome){
        cy.contains('.inventory_item_name', nome)
            .click()
    }
}

export default new InventoryPage()