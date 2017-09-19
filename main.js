/* eslint-disable no-unused-vars */
var choices = []
var choiceId = 0

function renderChoice(data) {
  if (data) {
    var $choice = document.createElement('li')
    $choice.setAttribute('class', 'choice card-panel animated bounceInUp')
    $choice.setAttribute('data-id', choiceId)
    $choice.textContent = data.choice
    var $removeButton = renderRemoveButton()
    $choice.appendChild($removeButton)
    return $choice
  }
}

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

function fadeOutAllChoices($choices) {
  for (var i = 0; i < $choices.children.length; i++) {
    $choices.children[i].setAttribute('class', 'choice card-panel animated fadeOut')
  }
}

function clearAllChoices($choices) {
  while ($choices.firstChild) {
    $choices.removeChild($choices.firstChild)
  }
}

function renderRemoveButton() {
  var $removeButton = document.createElement('button')
  $removeButton.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
  $removeButton.setAttribute('id', 'remove')
  $removeButton.textContent = 'X'

  return $removeButton
}

function removeChoice($choices, $choice) {
  $choice.setAttribute('class', 'choice card-panel animated fadeOut')
  setTimeout(function () {
    $choices.removeChild($choice)
  }, 1000)
}

function randomNumber(data) {
  if (data.length !== 0) {
    var number = Math.round(Math.random() * (data.length - 1))
  }
  return number
}

function createDecision(data, number) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === number) {
      var decision = {
        winningId: data[i].id,
        winningChoice: data[i].choice,
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
  setTimeout(function () {
    for (var i = 0; i < $lists.length; i++) {
      $unorderedList.removeChild($lists[i])
    }
  }, 1000)
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

  $submitButton.setAttribute('class', 'hidden')

  setTimeout(function () {
    for (var i = 0; i < $lists.length; i++) {
      if (randomrandomIndex !== i) {
        $unorderedList.removeChild($lists[i])
      }
    }
  }, 1000)
}

function clearUserInput($choice, $author) {
  $choice.value = ''
  $author.value = ''
}

var $submitButton = document.querySelector('#submit')
$submitButton.addEventListener('click', function (e) {
  e.preventDefault()
  var choice = createChoice(
    document.querySelector('#choice'),
    document.querySelector('#author')
  )

  if (choice) {
    choices.push(choice)
    var $choice = renderChoice(choice)
    var $choices = document.querySelector('#choices')
    $choices.appendChild($choice)
    choiceId++
  }

  clearUserInput(
    document.querySelector('#choice'),
    document.querySelector('#author')
  )
})

var $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function (e) {
  e.preventDefault()
  choices = []
  choiceId = 0
  var $choices = document.querySelector('#choices')
  fadeOutAllChoices($choices)
  setTimeout(function () {
    clearAllChoices($choices)
  }, 1000)

  enableButton($submitButton)
  enableButton($randomizeButton)
})

var $randomizeButton = document.querySelector('#randomize')
$randomizeButton.addEventListener('click', function (e) {
  e.preventDefault()
  if (choices.length > 1) {
    var randomNum = randomNumber(choices)
    var decision = createDecision(choices, randomNum)
    fadeOutOtherChoices(decision)

    var $removeButton = document.querySelectorAll('#remove')[decision.winningId]
    disableButton($removeButton)
    disableButton($submitButton)
    disableButton($randomizeButton)
  }
})

var $choices = document.querySelector('#choices')
$choices.addEventListener('click', function (e) {
  if (e.target.getAttribute('id') === 'remove') {
    var $choice = e.target.closest('.choice')
    var choiceIndex = $choice.getAttribute('data-id')
    choices.splice(choiceIndex, 1)
    removeChoice($choices, $choice)
  }
})

var Typed = require('typed.js')

var header = new Typed('.site-name', {
  strings: ["Let's grab: McDonalds", "Let's grab: Burger King", "Let's grab: Pizza Hut", 'To Be Determined...'],
  typeSpeed: 50,
  backSpeed: 50,
  smartBackSpace: true,
  showCursor: false
})

var slogan = new Typed('.slogan', {
  strings: ["^10000 Can't decide? Let us decide."],
  typeSpeed: 80,
  showCursor: false
})
