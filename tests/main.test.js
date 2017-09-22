/* global describe, it, expect */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function renderUserInput(input) {
  var $input = document.createElement('input')
  $input.value = input
  return $input
}

function renderButton(type) {
  var $button = document.createElement('button')
  if (type === 'submit') {
    $button.setAttribute('id', '#submit')
  }
  else {
    $button.setAttribute('id', 'remove')
  }
  return $button
}

describe('Creates', function () {

  it('a choice.', function () {
    var $choice = renderUserInput('Basketball')
    var $author = renderUserInput('Ryan')

    var choice = createChoice($choice, $author)
    expect(choice).to.be.an('object')
    expect(choice.id).to.equal(0)
    expect(choice.choice).to.equal('Basketball')
    expect(choice.author).to.equal('Ryan')
  })

  it('a decision.', function () {
    var choices = [
      {
        id: 0,
        choice: 'Basketball',
        author: 'Ryan'
      },
      {
        id: 1,
        choice: 'Baseball',
        author: 'Joe'
      }
    ]
    var randomNumber = 1
    var decision = createDecision(choices, randomNumber)
    expect(decision).to.be.an('object')
    expect(decision.winningId).to.equal(1)
    expect(decision.winningChoice).to.equal('Baseball')
    expect(decision.winner).to.equal('Joe')
  })
})

describe('Renders', function () {
  var choice = {
    id: 0,
    choice: 'Basketball',
    author: 'Ryan'
  }

  it('a choice.', function () {
    var $choice = renderChoice(choice)
    expect($choice).to.have.attribute('class', 'choice card-panel animated bounceInUp')
    expect($choice).to.have.attribute('data-id', '0')
    expect($choice).to.have.attribute('data-author', 'Ryan')
    expect($choice.textContent).to.equal('Basketball')
    expect($choice).to.contain('button')
    expect($choice).to.contain('i')
  })

  it('a remove button.', function () {
    var $removeButton = renderRemoveButton()
    expect($removeButton).to.have.attribute('class', 'btn-floating btn-large waves-effect waves-light red')
    expect($removeButton).to.have.attribute('id', 'remove')
    expect($removeButton).to.contain('i')
    expect($removeButton).to.have.attribute('id', 'remove')

    var $removeButtonIcon = $removeButton.firstChild
    expect($removeButtonIcon).to.have.attribute('class', 'fa fa-trash')
    expect($removeButtonIcon).to.have.attribute('aria-hidden', 'true')
  })

  it('a gif.', function () {
    var link = 'https://giphy.com/embed/b7f0X8Okk1uyk'
    var $justDoItGif = renderGif()
    expect($justDoItGif).to.have.attribute('src', link)
    expect($justDoItGif).to.have.attribute('width', '480')
    expect($justDoItGif).to.have.attribute('height', '270')
    expect($justDoItGif).to.have.attribute('frameBorder', '0')
    expect($justDoItGif).to.have.attribute('class', 'giphy-embed col s12')
  })

  it('a winning choice.', function () {
    var $winningChoice = renderWinningChoice('Baseball')
    expect($winningChoice).to.have.attribute('class', 'col s8 offset-s2')
    expect($winningChoice.textContent).to.equal('So therefore, the decision is Baseball')
  })

  it('a winner.', function () {
    var $winner = renderWinner('Ryan')
    expect($winner).to.have.attribute('class', 'card-title col s8 offset-s2')
    expect($winner.textContent).to.equal('Ryan is the winner!')
  })

  it('a result.', function () {
    var $result = renderResult('Swimming', 'Blake')
    expect($result).to.have.attribute('class', 'card-panel row winner animated bounceInUp')
    expect($result).to.contain('h5')
    expect($result).to.contain('h6')
  })
})

describe('Fades out', function () {
  var choices = [
    {
      id: 0,
      choice: 'Basketball',
      author: 'Ryan'
    },
    {
      id: 1,
      choice: 'Baseball',
      author: 'Joe'
    },
    {
      id: 2,
      choice: 'Football',
      author: 'Young'
    }
  ]

  it('all of the choices.', function () {
  })
})

describe('Disables', function () {
  it('the remove button.', function () {
    var $removeButton = renderButton('remove')
    disableButton($removeButton)
    expect($removeButton).to.have.attribute('class', 'btn-floating btn-large waves-effect waves-light red disabled')
  })

  it('the submit button.', function () {
    var $submitButton = renderButton('submit')
    disableButton($submitButton)
    expect($submitButton).to.have.attribute('class', 'waves-effect waves-light btn-large disabled')
  })
})

describe('Enables', function () {
  it('the remove button.', function () {
    var $removeButton = renderButton('remove')
    enableButton($removeButton)
    expect($removeButton).to.have.attribute('class', 'btn-floating btn-large waves-effect waves-light red')
  })

  it('the submit button.', function () {
    var $submitButton = renderButton('submit')
    enableButton($submitButton)
    expect($submitButton).to.have.attribute('class', 'waves-effect waves-light btn-large')
  })
})

describe('Clears', function () {
  it('the choice and author inputs.', function () {
    var $choice = renderUserInput('Basketball')
    var $author = renderUserInput('Ryan')

    clearUserInput($choice, $author)
    expect($choice.value).to.equal('')
    expect($author.value).to.equal('')
  })
})
