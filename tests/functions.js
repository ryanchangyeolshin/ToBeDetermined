/* eslint-disable no-unused-vars */
var choices = []
var choiceId = 0

const window = require('./jsdom.js').window
const document = window.document

function createChoice($choice, $author) {
  if ($choice.value && $author.value) {
    var choice = {
      id: choiceId,
      choice: $choice.value,
      author: $author.value
    }
    return choice
  }
}

function createDecision(data, number) {
  for (var i = 0; i < data.length; i++) {
    var decision = {
      winningId: data[i].id,
      winningChoice: data[i].choice,
      winner: data[i].author,
      choices: data
    }
    return decision
  }
}

function renderRemoveButton() {
  var $removeButton = document.createElement('button')
  $removeButton.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
  $removeButton.setAttribute('id', 'remove')

  var $removeButtonIcon = document.createElement('i')
  $removeButtonIcon.setAttribute('class', 'fa fa-trash')
  $removeButtonIcon.setAttribute('aria-hidden', 'true')
  $removeButton.appendChild($removeButtonIcon)

  return $removeButton
}

function renderChoice(data) {
  if (data) {
    var $choice = document.createElement('li')
    $choice.setAttribute('class', 'choice card-panel animated bounceInUp')
    $choice.setAttribute('data-id', choiceId)
    $choice.setAttribute('data-author', data.author)
    $choice.textContent = data.choice
    var $removeButton = renderRemoveButton()
    $choice.appendChild($removeButton)
    return $choice
  }
}

function renderGif(link) {
  var $justDoItGif = document.createElement('iframe')
  $justDoItGif.setAttribute('src', link)
  $justDoItGif.setAttribute('width', '480')
  $justDoItGif.setAttribute('height', '270')
  $justDoItGif.setAttribute('frameBorder', '0')
  $justDoItGif.setAttribute('class', 'giphy-embed col s12')

  return $justDoItGif
}

function renderWinner(winner) {
  var $winner = document.createElement('h5')
  $winner.setAttribute('class', 'card-title col s8 offset-s2')
  $winner.textContent = winner + ' is the winner!'
  return $winner
}

function renderWinningChoice(winningChoice) {
  var $winningChoice = document.createElement('h6')
  $winningChoice.setAttribute('class', 'col s8 offset-s2')
  $winningChoice.textContent = 'So therefore, the decision is ' + winningChoice
  return $winningChoice
}

function renderResult(winningChoice, winner) {
  var $result = document.createElement('li')
  $result.setAttribute('class', 'card-panel row winner animated bounceInUp')

  var $winner = renderWinner(winner)
  var $winningChoice = renderWinningChoice(winningChoice)
  var $justDoItGif = renderGif()

  $result.appendChild($winner)
  $result.appendChild($winningChoice)
  $result.appendChild($justDoItGif)

  return $result
}

function disableButton($button) {
  if ($button.getAttribute('id') === 'remove') {
    $button.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red disabled')
  }
  else {
    $button.setAttribute('class', 'waves-effect waves-light btn-large disabled')
  }
}

function enableButton($button) {
  if ($button.getAttribute('id') === 'remove') {
    $button.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
  }
  else {
    $button.setAttribute('class', 'waves-effect waves-light btn-large')
  }
}

function clearUserInput($choice, $author) {
  $choice.value = ''
  $author.value = ''
}

module.exports = {
  choices,
  choiceId,
  createChoice,
  createDecision,
  renderChoice,
  renderRemoveButton,
  renderGif,
  renderWinningChoice,
  renderWinner,
  renderResult,
  disableButton,
  enableButton,
  clearUserInput
}
