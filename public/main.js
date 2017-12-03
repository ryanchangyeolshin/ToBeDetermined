/* eslint-disable no-unused-vars */
/* global renderResult clearAllChoices fadeOutAllChoices randomNumber
createDecision fadeOutOtherChoices renderRemoveButton enableButton
disableButton renderChoice createChoice removeChoice */

let choices = []
let choiceId = 0

function clearUserInput($choice, $author) {
  $choice.value = ''
  $author.value = ''
}

const $submitButton = document.querySelector('#submit')
$submitButton.addEventListener('click', function (e) {
  e.preventDefault()
  var choice = createChoice(
    document.querySelector('#choice'),
    document.querySelector('#author')
  )
  if (choice) {
    choices.push(choice)
    const $choice = renderChoice(choice)
    const $choices = document.querySelector('#choices')
    $choices.appendChild($choice)
    choiceId++
  }
  clearUserInput(
    document.querySelector('#choice'),
    document.querySelector('#author')
  )
})

const $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function (e) {
  e.preventDefault()
  choices = []
  choiceId = 0
  const $choices = document.querySelector('#choices')
  fadeOutAllChoices($choices)
  setTimeout(function () {
    clearAllChoices($choices)
  }, 1000)
  enableButton($submitButton)
  enableButton($randomizeButton)
})

const $randomizeButton = document.querySelector('#randomize')
$randomizeButton.addEventListener('click', function (e) {
  e.preventDefault()
  if (choices.length > 1) {
    const randomNum = randomNumber(choices)
    const decision = createDecision(choices, randomNum)
    fadeOutOtherChoices(decision)
    const $winningChoice = document.querySelector('.winner')
    $winningChoice.setAttribute('class', 'choice winner yellow accent-4 card-panel animated pulse infinite')
    const $removeButton = document.querySelectorAll('#remove')[decision.winningId]
    disableButton($removeButton)
    disableButton($submitButton)
    disableButton($randomizeButton)
  }
})

const $choices = document.querySelector('#choices')
$choices.addEventListener('click', function (e) {
  if (e.target.getAttribute('class') === 'fa fa-trash') {
    const $choice = e.target.closest('.choice')
    const choiceIndex = $choice.getAttribute('data-id')
    choices.splice(choiceIndex, 1)
    removeChoice($choices, $choice)
  }
  else if (e.target.getAttribute('class') === 'choice winner yellow accent-4 card-panel animated pulse infinite') {
    clearAllChoices($choices)
    const winner = e.target.getAttribute('data-author')
    const $result = renderResult(winner)
    $choices.appendChild($result)
  }
})
