/* eslint-disable no-unused-vars */
var choices = []
var choiceId

function choice($userChoiceInput, $userNameInput) {
  var $choiceContainer = document.createElement('div')
  var $choiceContent = document.createElement('li')
  $choiceContainer.setAttribute('class', 'choice col s8 offset-s2')
  $choiceContainer.setAttribute('data-id', choiceId)
  $choiceContent.setAttribute('class', 'card-panel animated bounceInUp')
  $choiceContent.textContent = $userChoiceInput.value
  $choiceContainer.appendChild($choiceContent)

  var choiceInfo = {
    id: choiceId,
    choice: $userChoiceInput.value,
    author: $userNameInput.value,
    htmlElement: $choiceContainer
  }
  choiceId++
  return choiceInfo
}

function renderChoices(data) {
  var $choices = []
  for (var i = 0; i < data.length; i++) {
    $choices.push(data[i].htmlElement)
  }
  return $choices
}

function addChoicesToList($choices) {
  var $choicesList = document.querySelector('#choices-list')
  for (var i = 0; i < $choices.length; i++) {
    $choicesList.appendChild($choices[i])
  }
}

function clearAllChoices() {
  var $choicesList = document.querySelector('#choices-list')
  while ($choicesList.firstChild) {
    $choicesList.removeChild($choicesList.firstChild)
  }
}

function clearUserInput($userChoiceInput, $userNameInput) {
  $userChoiceInput.value = ''
  $userNameInput.value = ''
}

var $submitButton = document.querySelector('#submit')
$submitButton.addEventListener('click', function (e) {
  e.preventDefault()
  var $userChoiceInput = document.querySelector('#user-choice')
  var $userNameInput = document.querySelector('#user-name')
  var newChoice = choice($userChoiceInput, $userNameInput)
  choices.push(newChoice)
  var $choices = renderChoices(choices)
  addChoicesToList($choices)
  // clearUserInput($userChoiceInput, $userNameInput)
})

var $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function (e) {
  e.preventDefault()
  choices = []
  clearAllChoices()
})

var $randomizeButton = document.querySelector('#randomize')
$randomizeButton.addEventListener('click', function (e) {
  e.preventDefault()
})

var Typed = require('typed.js')

var header = new Typed('.app-header', {
  strings: ["Let's grab: McDonalds", "Let's grab: Burger King", "Let's grab: Pizza Hut", 'To Be Determined...'],
  typeSpeed: 50,
  backSpeed: 50,
  smartBackSpace: true,
  showCursor: false
})

var slogan = new Typed('.app-slogan', {
  strings: ["^10000 Can't decide? Let us decide."],
  typeSpeed: 80,
  showCursor: false
})
