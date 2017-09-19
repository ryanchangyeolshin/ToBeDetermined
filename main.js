/* eslint-disable no-unused-vars */
var choices = []
var choiceId = 0

function choice(data) {
  if (data) {
    var $choice = document.createElement('li')
    $choice.setAttribute('class', 'choice card-panel animated bounceInUp')
    $choice.setAttribute('data-id', choiceId)
    $choice.textContent = data.userChoice
    return $choice
  }
}

function createChoiceInfo($userChoiceInput, $userNameInput) {
  if ($userChoiceInput.value && $userNameInput.value) {
    var choiceInfo = {
      id: choiceId,
      userChoice: $userChoiceInput.value,
      userName: $userNameInput.value
    }
    return choiceInfo
  }
}

function renderChoices(data) {
  var $choices = []
  for (var i = 0; i < data.length; i++) {
    $choices.push(data[i].htmlElement)
  }
  return $choices
}

function fadeOutAllChoices($choicesList) {
  var $choices = $choicesList.children
  for (var i = 0; i < $choices.length; i++) {
    $choices[i].setAttribute('class', 'choice card-panel animated fadeOut')
  }
}

function clearAllChoices($choicesList) {
  while ($choicesList.firstChild) {
    $choicesList.removeChild($choicesList.firstChild)
  }
}

function createRemoveButton() {
  var $removeButton = document.createElement('button')
  $removeButton.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
  $removeButton.setAttribute('id', 'remove')
  $removeButton.textContent = 'X'

  return $removeButton
}

function removeChoice($choicesList, $choice) {
  $choice.setAttribute('class', 'choice card-panel animated fadeOut')
  setTimeout(function () {
    $choicesList.removeChild($choice)
  }, 1000)
}

function randomNumber(data) {
  if (data.length !== 0) {
    var number = Math.round(Math.random() * (data.length - 1))
  }
  return number
}

function renderDecision(data, number) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === number) {
      var decision = {
        winningId: data[i].id,
        winningChoice: data[i].userChoice,
        winner: data[i].userName,
        choices: data
      }
      return decision
    }
  }
}

function fadeOutOtherChoices(data) {
  var $choices = document.querySelectorAll('.choice')
  for (var i = 0; i < $choices.length; i++) {
    var choiceDataId = $choices[i].getAttribute('data-id')
    if (choiceDataId !== data.winningId.toString()) {
      $choices[i].setAttribute('class', 'choice card-panel animated fadeOut')
    }
    else {
      $choices[i].setAttribute('class', 'choice card-panel')
    }
  }
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

function clearUserInput($userChoiceInput, $userNameInput) {
  $userChoiceInput.value = ''
  $userNameInput.value = ''
}

var $submitButton = document.querySelector('#submit')
$submitButton.addEventListener('click', function (e) {
  e.preventDefault()
  var $userChoiceInput = document.querySelector('#user-choice')
  var $userNameInput = document.querySelector('#user-name')
  var choiceInfo = createChoiceInfo($userChoiceInput, $userNameInput)
  if (choiceInfo) {
    choices.push(choiceInfo)
    var $choice = choice(choiceInfo)
    var $removeButton = createRemoveButton()
    $choice.appendChild($removeButton)
    var $choicesList = document.querySelector('#choices-list')
    $choicesList.appendChild($choice)
    choiceId++
  }
  clearUserInput($userChoiceInput, $userNameInput)
})

var $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function (e) {
  e.preventDefault()
  enableButton($submitButton)
  enableButton($randomizeButton)
  choices = []
  choiceId = 0
  var $choicesList = document.querySelector('#choices-list')
  fadeOutAllChoices($choicesList)
  setTimeout(function () {
    clearAllChoices($choicesList)
  }, 1000)
})

var $randomizeButton = document.querySelector('#randomize')
$randomizeButton.addEventListener('click', function (e) {
  e.preventDefault()
  if (choices.length > 1) {
    var randomNum = randomNumber(choices)
    var decision = renderDecision(choices, randomNum)
    fadeOutOtherChoices(decision)
    var $removeButton = document.querySelectorAll('#remove')[decision.winningId]
    disableButton($removeButton)
    disableButton($submitButton)
    disableButton($randomizeButton)
  }
})

var $choicesList = document.querySelector('#choices-list')
$choicesList.addEventListener('click', function (e) {
  if (e.target.getAttribute('id') === 'remove') {
    var $choice = e.target.closest('.choice')
    var choiceIndex = $choice.getAttribute('data-id')
    choices.splice(choiceIndex, 1)
    removeChoice($choicesList, $choice)
  }
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
