/// <reference types="cypress" />
import faker from 'faker'
import { theme as chakraTheme } from '@chakra-ui/react'
import { theme } from '../../../src/styles/theme'
import { hexToRgb } from '../../support/test-utils'
describe('404', () => {
  it('should render a 404 page when call an inexistent page', () => {
    const url = `/${faker.random.word()}`
    cy.request({ url, failOnStatusCode: false })
      .its('status')
      .should('equal', 404)

    cy.visit(url, { failOnStatusCode: false })
    cy.title().should('eq', '404 | Next Auth')
  })

  context('render a correct 404 content', () => {
    it('should render a correct text', () => {
      cy.get('main > div > h2').should('contain.text', 'Oops!')
      cy.get('main > div > strong').should(
        'contain.text',
        '404 - Página não encontrada'
      )
      cy.get('main > div > p').should(
        'contain.text',
        'A página que você procura talvez tenha sido removida, nome alterado ou temporariamente indisponivel.'
      )
    })

    it('should render a h2 with text gradient', () => {
      cy.get('main > div > h2').should(
        'have.css',
        'background-image',
        `linear-gradient(to right, ${hexToRgb(
          theme.colors.blue[500]
        )}, ${hexToRgb(chakraTheme.colors.pink[500])})`
      )
    })

    it('should render a white strong', () => {
      cy.get('main > div > strong').should(
        'have.css',
        'color',
        chakraTheme.colors.whiteAlpha[900]
      )
    })

    it('should render a gray paragraph', () => {
      cy.get('main > div > p').should(
        'have.css',
        'color',
        hexToRgb(chakraTheme.colors.gray[500])
      )
    })

    it('should render an anchor with blue background and white text', () => {
      cy.get('main > div > a')
        .should(
          'have.css',
          'background-color',
          hexToRgb(theme.colors.blue[500])
        )
        .should('have.css', 'color', chakraTheme.colors.whiteAlpha[900])
        .should('have.attr', 'href', '/')
    })
  })
})
