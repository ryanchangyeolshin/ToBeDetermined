/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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

function saveDecision(id, winningChoice, winner, listOfChoices) {
  var decision = {
    id: id,
    winningChoice: winningChoice,
    winner: winner,
    choices: listOfChoices
  }

  decisions.push(decision)
  decisionId++
  choiceId = 0
}

function saveChoice(userChoice, user) {
  var choice = {
    id: 'c' + choiceId,
    choice: userChoice,
    author: user
  }

  choices.push(choice)
  choiceId++
}

function findChoice(list, id) {
  var parsedId = parseInt(id)
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === 'c' + parsedId) {
      return list[i]
    }
  }
}

function createChoice() {
  var $choice = document.createElement('li')
  $choice.setAttribute('class', 'choice col s12 animated bounceInUp')
  $choice.setAttribute('data-id', choiceId)
  return $choice
}

function createRemoveButton($list) {
  var $unorderedList = document.querySelector('.choice-list')
  var $removeButton = document.createElement('button')

  $removeButton.setAttribute('class', 'waves-effect waves-circle waves-light btn-floating secondary-content')
  $removeButton.setAttribute('id', 'remove')
  $removeButton.setAttribute('data-id', choiceId)

  $removeButton.textContent = 'X'

  $removeButton.addEventListener('click', function (e) {
    choices.pop(findChoice(choices, e.target.getAttribute('data-id')))
    $list.setAttribute('class', 'choice col s12 animated fadeOut')
    setTimeout(function () {
      $unorderedList.removeChild($list)
    }, 1000)
  })
  return $removeButton
}

function clearUserInput($userChoice, $userName) {
  $userChoice.value = ''
  $userName.value = ''
}

function returnChoiceWithAttributes($list, $userChoice, $userName) {
  if ($userChoice.value !== '' && $userName.value !== '') {

    $list.setAttribute('data-winner', $userName.value)
    $list.textContent = $userChoice.value
    $list.appendChild(createRemoveButton($list))

    saveChoice($userChoice.value, $userName.value)
    return $list
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

function returnRandomChoice($unorderedList, $lists) {
  var randomIndex = Math.round(Math.random() * ($lists.length - 1))

  for (var i = 0; i < $lists.length; i++) {
    if (randomIndex !== i) {
      $lists[i].setAttribute('class', 'choice col s12 animated fadeOut')
    }
    else {
      var $winningElement = $lists[i]
      var id = $lists[i].getAttribute('data-id')
      var winningChoice = $lists[i].textContent
      var winner = $lists[i].getAttribute('data-winner')
      saveDecision(id, winningChoice, winner, choices)
    }
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

$submitButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choice = createChoice()
  var $userChoice = document.querySelector('#user-choice')
  var $userName = document.querySelector('#user')
  $choiceList.appendChild(returnChoiceWithAttributes($choice, $userChoice, $userName))
  clearUserInput($userChoice, $userName)
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
    returnRandomChoice($choiceList, $choices)
  }
})
