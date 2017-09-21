/* global describe, it, expect */
const chai = require('chai')
chai.use(require('chai-dom'))
const expect = chai.expect

const createChoice = require('./functions.js').createChoice
const createDecision = require('./functions.js').createDecision
const renderChoice = require('./functions.js').renderChoice
const renderRemoveButton = require('./functions.js').renderRemoveButton
const renderGif = require('./functions.js').renderGif
const renderWinningChoice = require('./functions.js').renderWinningChoice
const renderWinner = require('./functions.js').renderWinner
const renderResult = require('./functions.js').renderResult
const disableButton = require('./functions.js').disableButton
const enableButton = require('./functions.js').enableButton
const clearUserInput = require('./functions.js').clearUserInput
const fadeOutAllChoices = require('./functions.js').fadeOutAllChoices
const fadeOutOtherChoices = require('./functions.js').fadeOutOtherChoices

const window = require('./jsdom.js').window
const document = window.document
global.window = window
global.document = global.window.document

describe('Creates', function () {

  it('a choice.', function () {
    var $choice = document.querySelector('#choice')
    $choice.value = 'Basketball'
    var $author = document.querySelector('#author')
    $author.value = 'Ryan'
    expect(createChoice($choice, $author)).to.be.an('object')
    expect(createChoice($choice, $author).choice).to.equal($choice.value)
    expect(createChoice($choice, $author).author).to.equal($author.value)
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

    expect(choices).to.be.an('array')
    expect(createDecision(choices, 0)).to.be.an('object')
    expect(createDecision(choices, 0).winningId).to.equal(0)
    expect(createDecision(choices, 0).winningChoice).to.equal('Basketball')
    expect(createDecision(choices, 0).winner).to.equal('Ryan')
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
    expect($choice).to.contain.text('Basketball')
    expect($choice).to.contain('button')
    expect($choice).to.have.attribute('data-id', '0')
    expect($choice).to.have.attribute('data-author', 'Ryan')
  })

  it('a remove button.', function () {
    var $removeButton = renderRemoveButton()
    expect($removeButton).to.have.attribute('class', 'btn-floating btn-large waves-effect waves-light red')
    expect($removeButton).to.have.id('remove')
    expect($removeButton).to.contain('i')

    var $removeButtonIcon = $removeButton.firstChild
    expect($removeButtonIcon).to.have.attribute('aria-hidden', 'true')
    expect($removeButtonIcon).to.have.attribute('class', 'fa fa-trash')
  })

  it('a gif.', function () {
    var link = 'https://giphy.com/embed/b7f0X8Okk1uyk'
    var $gif = renderGif(link)
    expect($gif).to.have.attribute('src', link)
    expect($gif).to.have.attribute('width', '480')
    expect($gif).to.have.attribute('height', '270')
    expect($gif).to.have.attribute('class', 'giphy-embed col s12')
  })

  it('a winning choice.', function () {
    var $winningChoice = renderWinningChoice('Soccer')
    expect($winningChoice).to.contain.text('Soccer')
    expect($winningChoice).to.have.attribute('class', 'col s8 offset-s2')
  })

  it('a winner.', function () {
    var $winner = renderWinner('John')
    expect($winner).to.contain.text('John')
    expect($winner).to.have.attribute('class', 'card-title col s8 offset-s2')
  })

  it('a result.', function () {
    var $result = renderResult('Pizza Hut', 'Ron')
    expect($result).to.contain('iframe')
    expect($result).to.contain('h5')
    expect($result).to.contain('h6')
    expect($result).to.have.attribute('class', 'card-panel row winner animated bounceInUp')
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
  var $choices = document.querySelector('#choices')
  for (var i = 0; i < choices.length; i++) {
    $choices.appendChild(renderChoice(choices[i]))
  }
  fadeOutAllChoices($choices)

  it('all of the choices.', function () {
    expect($choices.children[0]).to.have.attribute('class', 'choice card-panel animated fadeOut')
    expect($choices.children[1]).to.have.attribute('class', 'choice card-panel animated fadeOut')
    expect($choices.children[2]).to.have.attribute('class', 'choice card-panel animated fadeOut')
  })
})

describe('Disables', function () {
  it('the remove button.', function () {
    var $removeButton = renderRemoveButton()
    disableButton($removeButton)
    expect($removeButton).to.have.attribute('class', 'btn-floating btn-large waves-effect waves-light red disabled')
  })

  it('the submit button.', function () {
    var $submitButton = document.querySelector('#submit')
    disableButton($submitButton)
    expect($submitButton).to.have.attribute('class', 'waves-effect waves-light btn-large disabled')
  })
})

describe('Enables', function () {
  it('the remove button.', function () {
    var $removeButton = renderRemoveButton()
    enableButton($removeButton)
    expect($removeButton).to.have.attribute('class', 'btn-floating btn-large waves-effect waves-light red')
  })

  it('the submit button.', function () {
    var $submitButton = document.querySelector('#submit')
    enableButton($submitButton)
    expect($submitButton).to.have.attribute('class', 'waves-effect waves-light btn-large')
  })
})

describe('Clears', function () {
  it('the choice and author inputs.', function () {
    var $choice = document.querySelector('#choice')
    var $author = document.querySelector('#author')
    clearUserInput($choice, $author)
    expect($choice.value).to.equal('')
    expect($author.value).to.equal('')
  })
})
