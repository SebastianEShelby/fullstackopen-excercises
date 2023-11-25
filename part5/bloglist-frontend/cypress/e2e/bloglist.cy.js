describe('Blog app', function () {
  const user = {
    name: 'John Doe',
    username: 'john',
    password: '1234'
  }

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#login-button').should('be.visible')
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      const validLogin = {
        username: user.username,
        password: user.password
      }

      cy.get('#username').type(validLogin.username)
      cy.get('#password').type(validLogin.password)
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', `${user.name} logged in!`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function () {

      const invalidLogin = {
        username: 'john',
        password: 'wrongpassword'
      }

      cy.get('#username').type(invalidLogin.username)
      cy.get('#password').type(invalidLogin.password)
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function () {
      cy.get('button').contains('create new blog').click()
      cy.get('[data-testid="title"]').should('be.visible').type('Title')
      cy.get('[data-testid="author"]').should('be.visible').type('John Doe')
      cy.get('[data-testid="url"]').should('be.visible').type('fake@domain.com')

      cy.get('[data-testid="create-blog"]').click()
      cy.contains('Title John Doe')
    })


    describe.only('and several blogs exist', function () {
      beforeEach(function () {
        const blogs = [
          {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
          },
          {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          },
          {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          },
        ]
        cy.login({ username: user.username, password: user.password })
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
      })

      it('one of those can be liked', function () {
        cy.contains('Canonical string reduction').parent().as('blog')

        cy.get('@blog').find('button').contains('view').as('viewButton').click()
        cy.get('@blog').find('button').contains('like').as('likeButton').click()
        cy.get('@blog').contains('Likes').contains(1)
      })
    })

  })
})