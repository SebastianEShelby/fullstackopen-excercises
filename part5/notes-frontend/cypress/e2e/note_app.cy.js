describe('Note app', function () {

  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('root')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('button').contains('log in').click()
      cy.get('input:first').type('root')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })


    it('a new note can be created', function () {
      cy.get('button').contains('new note').click()
      cy.get('input').should('be.visible').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })

})