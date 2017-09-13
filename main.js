/* eslint-disable no-unused-vars */
var Typed = require('typed.js')

var $submitButton = document.querySelector('#submit')
var $clearButton = document.querySelector('#clear')

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

function renderList(choiceList, choice) {
  var $userChoice = document.querySelector('#user-choice')
  var $userName = document.querySelector('#user')
  if ($userChoice.value !== '' && $userName.value !== '') {
    var $removeButton = document.createElement('button')

    choice.setAttribute('class', 'list col s12')
    $removeButton.setAttribute('class', 'waves-effect waves-circle waves-light btn-floating secondary-content')
    $removeButton.setAttribute('id', 'remove')

    choice.textContent = $userChoice.value
    $removeButton.textContent = 'X'

    $userChoice.value = ''
    $userName.value = ''

    choiceList.appendChild(choice)
    choice.appendChild($removeButton)

    $removeButton.addEventListener('click', function (e) {
      choiceList.removeChild(choice)
    })
  }
}

function clearList(choiceList, choices) {
  for (var i = 0; i < choices.length; i++) {
    choiceList.removeChild(choices[i])
  }
}

$submitButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choice = document.createElement('li')
  renderList($choiceList, $choice)
})

$clearButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choices = document.querySelectorAll('.list')
  clearList($choiceList, $choices)
})
