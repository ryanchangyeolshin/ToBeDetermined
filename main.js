/* eslint-disable no-unused-vars */
var Typed = require('typed.js')

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

function renderList($unorderedList, $list) {
  var $userChoice = document.querySelector('#user-choice')
  var $userName = document.querySelector('#user')
  if ($userChoice.value !== '' && $userName.value !== '') {
    var $removeButton = document.createElement('button')

    $removeButton.setAttribute('class', 'waves-effect waves-circle waves-light btn-floating secondary-content')
    $removeButton.setAttribute('id', 'remove')

    $list.textContent = $userChoice.value
    $removeButton.textContent = 'X'

    $userChoice.value = ''
    $userName.value = ''

    $unorderedList.appendChild($list)
    $list.appendChild($removeButton)

    $removeButton.addEventListener('click', function (e) {
      $list.setAttribute('class', 'choice animated fadeOut')
      setTimeout(function () {
        $unorderedList.removeChild($list)
      }, 1000)
    })
  }
}

function clearList($unorderedList, $lists) {
  for (var i = 0; i < $lists.length; i++) {
    $lists[i].setAttribute('class', 'choice animated fadeOut')
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
      $lists[i].setAttribute('class', 'choice animated fadeOut')
    }
  }

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
  renderList($choiceList, $choice)
})

$clearButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choices = document.querySelectorAll('.choice')
  clearList($choiceList, $choices)
})

$randomizeButton.addEventListener('click', function (e) {
  var $choiceList = document.querySelector('.choice-list')
  var $choices = document.querySelectorAll('.choice')

  if ($choices.length > 1) {
    randomizeList($choiceList, $choices)
  }
})
