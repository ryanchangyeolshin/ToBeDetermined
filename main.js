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
    choice = document.createElement('li')
    choice.setAttribute('class', 'list')
    choice.textContent = $userChoice.value
    choiceList.appendChild(choice)
  }
}

function clearList(choiceList, choice) {
  for (var i = 0; i < choice.length; i++) {
    choiceList.removeChild(choice[i])
  }
}

$submitButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choice = document.querySelector('.list')
  renderList($choiceList, $choice)
})

$clearButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choice = document.querySelectorAll('.list')
  clearList($choiceList, $choice)
})
