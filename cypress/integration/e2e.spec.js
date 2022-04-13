/// <reference types="cypress"/>
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade E2E', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 4
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()

            cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('#primary-menu > .menu-item-629 > a').click()
            cy.get('[class="product-block grid"]').first().click()
            cy.get('.button-variable-item-XL').click()
            cy.get('.button-variable-item-Red').click()
            cy.get('.input-text').clear().type(quantidade)
            cy.get('.single_add_to_cart_button').click()
            cy.get('.woocommerce-message > .button').click()
            cy.get('.quantity > .input-text').clear().type(quantidade)
            cy.get('.actions > .clearfix > .pull-right').click()
            cy.get('.checkout-button').click()
        })
    });

})