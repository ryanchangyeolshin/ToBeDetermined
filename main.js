/* eslint-disable no-unused-vars */
var Typed = require('typed.js')

var decisionId = 0
var choiceId = 0
var decisions = []
var choices = []

var $submitButton = document.querySelector('#submit')
var $clearButton = document.querySelector('#clear')
var $randomizeButton = document.querySelector('#randomize')

var header = new Typed('.header', {
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

function saveDecisionData(id, winningChoice, winner, listOfChoices) {
  var decisionObject = {}
  decisionObject.id = id
  decisionObject.winningChoice = winningChoice
  decisionObject.winner = winner
  decisionObject.choices = listOfChoices

  decisions.push(decisionObject)
  decisionId++
  choiceId = 0
}

function saveChoiceData(choice, author) {
  var choiceObject = {}
  choiceObject.id = 'c' + choiceId
  choiceObject.choice = choice
  choiceObject.author = author

  choices.push(choiceObject)
  choiceId++
}

function findChoiceData(list, id) {
  var parsedId = parseInt(id)
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === 'c' + parsedId) {
      return list[i]
    }
  }
}

function renderList($unorderedList, $list) {
  var $userChoice = document.querySelector('#user-choice')
  var $userName = document.querySelector('#user')
  if ($userChoice.value !== '' && $userName.value !== '') {
    var $removeButton = document.createElement('button')

    $list.setAttribute('data-winner', $userName.value)
    $removeButton.setAttribute('class', 'waves-effect waves-circle waves-light btn-floating secondary-content')
    $removeButton.setAttribute('id', 'remove')
    $removeButton.setAttribute('data-id', choiceId)

    $list.textContent = $userChoice.value
    $removeButton.textContent = 'X'

    $unorderedList.appendChild($list)
    $list.appendChild($removeButton)

    saveChoiceData($userChoice.value, $userName.value)

    $userChoice.value = ''
    $userName.value = ''

    $removeButton.addEventListener('click', function (e) {
      choices.pop(findChoiceData(choices, e.target.getAttribute('data-id')))

      $list.setAttribute('class', 'choice col s12 animated fadeOut')
      setTimeout(function () {
        $unorderedList.removeChild($list)
      }, 1000)
    })
  }
}

function clearList($unorderedList, $lists) {
  for (var i = 0; i < $lists.length; i++) {
    $lists[i].setAttribute('class', 'choice col s12 animated fadeOut')
  }
  setTimeout(function () {
    for (var i = 0; i < $lists.length; i++) {
      $unorderedList.removeChild($lists[i])
    }
  }, 1000)
}

function randomizeList($unorderedList, $lists) {
  var index = Math.round(Math.random() * ($lists.length - 1))

  for (var i = 0; i < $lists.length; i++) {
    if (index !== i) {
      $lists[i].setAttribute('class', 'choice col s12 animated fadeOut')
    }
    else {
      var id = $lists[i].getAttribute('data-id')
      var winningChoice = $lists[i].textContent
      var winner = $lists[i].getAttribute('data-winner')
      saveDecisionData(id, winningChoice, winner, choices)
    }
  }

  $submitButton.setAttribute('class', 'hidden waves-effect waves-light btn-large')

  setTimeout(function () {
    for (var i = 0; i < $lists.length; i++) {
      if (index !== i) {
        $unorderedList.removeChild($lists[i])
      }
    }
  }, 1000)
}

$submitButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choice = document.createElement('li')
  $choice.setAttribute('class', 'choice col s12 animated bounceInUp')
  $choice.setAttribute('data-id', choiceId)
  renderList($choiceList, $choice)
})

$clearButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choices = document.querySelectorAll('.choice')
  clearList($choiceList, $choices)
  $submitButton.setAttribute('class', 'waves-effect waves-light btn-large')
  choices = []
})

$randomizeButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choices = document.querySelectorAll('.choice')

  if ($choices.length > 1) {
    randomizeList($choiceList, $choices)
  }
})
