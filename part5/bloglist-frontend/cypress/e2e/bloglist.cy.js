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
    cy.get('[data-testid="username"]').should('be.visible')
    cy.get('[data-testid="password"]').should('be.visible')
    cy.get('[data-testid="login-button"]').should('be.visible')
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      const validLogin = {
        username: user.username,
        password: user.password
      }

      cy.get('[data-testid="username"]').type(validLogin.username)
      cy.get('[data-testid="password"]').type(validLogin.password)
      cy.get('[data-testid="login-button"]').click()

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

      cy.get('[data-testid="username"]').type(invalidLogin.username)
      cy.get('[data-testid="password"]').type(invalidLogin.password)
      cy.get('[data-testid="login-button"]').click()

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


    describe('and several blogs exist', function () {
      const blogs = [
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5
        },
        {
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 10
        },
        {
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        },
      ]
      beforeEach(function () {
        cy.login({ username: user.username, password: user.password })
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
      })

      it('one of those can be liked', function () {
        const originalLikes = blogs[2].likes || 0
        cy.get('[data-testid="blogs"]').contains(blogs[2].title).as('blog')

        cy.get('@blog').find('button').contains('view').click()
        cy.get('@blog').find('button').contains('like').click()
        cy.get('@blog').contains('Likes').contains(originalLikes + 1)
      })

      it('one of those can be deleted by the user who created it', function () {
        cy.get('[data-testid="blogs"]').contains(blogs[2].title).as('blog')

        cy.get('@blog').find('button').contains('view').click()
        cy.get('@blog').find('button').contains('remove').click()
        cy.get('@blog').should('not.exist')
      })

      it('blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.get('[data-testid="blog"]').should('have.length', 3)
        cy.get('[data-testid="blog"]').eq(0).should('contain', blogs[1].title)
        cy.get('[data-testid="blog"]').eq(1).should('contain', blogs[0].title)
        cy.get('[data-testid="blog"]').eq(2).should('contain', blogs[2].title)
      })
    })
  })

  it('only the creator can see the delete button of a blog, not anyone else', function () {

    const secondUser = {
      name: 'Jane Doe',
      username: 'jane',
      password: '1234'
    }

    const userBlog = {
      title: 'User 1 Blog Title',
      author: 'User 1 Blog Author',
      url: 'User 1 Blog URL',
    }

    const secondUserBlog = {
      title: 'User 2 Blog Title',
      author: 'User 2 Blog Author',
      url: 'User 2 Blog URL',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)
    cy.visit('')
    cy.login({ username: user.username, password: user.password })
    cy.createBlog(userBlog)
    cy.logout()
    cy.login({ username: secondUser.username, password: secondUser.password })
    cy.createBlog(secondUserBlog)

    cy.get('[data-testid="blogs"]').contains('User 1 Blog Title').as('blog1')
    cy.get('[data-testid="blogs"]').contains('User 2 Blog Title').as('blog2')

    cy.get('@blog1').find('[data-testid="toggle-blog-details-button"]').click()
    cy.get('@blog2').find('[data-testid="toggle-blog-details-button"]').click()

    cy.get('@blog1').find('[data-testid="remove-blog-button"]').should('not.exist')
    cy.get('@blog2').find('[data-testid="remove-blog-button"]').should('be.visible')

  })
})