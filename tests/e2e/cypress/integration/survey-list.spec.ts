import { getLocalStorageItem, setLocalStorageItem, testUrl } from '../utils/helpers'
import * as Helper from '../utils/http-mocks'

const path = /api\/surveys/
export const mockUnexpectedError = (): void => Helper.mockServerError(path, 'GET')
export const mockAccessDeniedError = (): void => Helper.mockForbiddenError(path, 'GET')
const mockOk = (): void => Helper.mockOk(path, 'GET', 'survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'An error has occurred. Please try again.')
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.wait('@requestError').then(res => {
      cy.getByTestId('error').should('contain.text', 'An error has occurred. Please try again.')
      mockOk()
      cy.getByTestId('reload').click()
      cy.get('li:not(:empty)').should('have.length', 2)
    })
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { name } = getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    cy.visit('')
    cy.getByTestId('logout')
      .click()
      .then(() => {
        testUrl('/login')
      })
  })

  it('Should present survey items', () => {
    mockOk()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.wait('@request').then(res => {
      cy.get('li:not(:empty)').should('have.length', 2)
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="day"]').text(), '03')
        assert.equal(li.find('[data-testid="month"]').text(), 'Feb')
        assert.equal(li.find('[data-testid="year"]').text(), '2018')
        assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
        cy.fixture('icons').then(icon => {
          assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
        })
      })
    })
  })
})
