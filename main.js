/* eslint-disable no-unused-vars */
var $choiceList = document.querySelector('.choice-list')
var $submitButton = document.querySelector('#submit')
var $userChoice = document.querySelector('#user-choice')
var $userName = document.querySelector('#user')

function renderList() {
  var $choice = document.createElement('li')
  $choice.setAttribute('class', 'list')
  $choice.textContent = $userChoice.value
  $choiceList.appendChild($choice)
}

$submitButton.addEventListener('click', function (e) {
  renderList()
})
