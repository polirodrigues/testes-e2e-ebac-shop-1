/// <reference types="cypress"/>
import FaturamentoPage from '../support/page_objects/faturamento.page'
const perfil = require('../fixtures/perfil.json')
const dadosBilling = require('../fixtures/billing.json')

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
            cy.get('.checkout-button').click({force: true})

            cy.get('#billing_first_name').clear().type('Lichia') 
            cy.get('#billing_last_name').clear().type('Teste')
            cy.get('#billing_company').clear().type('Taylor Nation')
            cy.get('#select2-billing_country-container').click().type('Brasil').get('[aria-selected="true"]').click()
            cy.get('#billing_address_1').clear().type('Av. Rio Branco')
            cy.get('#billing_address_2').clear().type('1989')
            cy.get('#billing_city').clear().type('Recife')
            cy.get('#select2-billing_state-container').click().type('Pernambuco' + '{enter}')
            cy.get('#billing_postcode').clear().type('50030090')
            cy.get('#billing_phone').clear().type('81000000000000')
            cy.get('#billing_email').clear().type('lichiateste@email.com')
            cy.get('#payment_method_cod').click()
            cy.get('#terms').check()
            cy.get('#place_order').click()
            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
            

        })
    });

})