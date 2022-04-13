/// <reference types="cypress"/>
const perfil = require('../fixtures/perfil.json')
const billing = require('../fixtures/billing.json')
import FaturamentoPage from '../support/page_objects/faturamento.page'

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
            cy.get('.checkout-button').click({ force: true })

            FaturamentoPage.editarEnderecoFaturamento(
                billing[1].nome,
                billing[1].sobrenome,
                billing[1].empresa,
                billing[1].pais,
                billing[1].endereco,
                billing[1].numero,
                billing[1].cidade,
                billing[1].estado,
                billing[1].cep,
                billing[1].telefone,
                billing[1].email
            )
            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')


        })
    });

})