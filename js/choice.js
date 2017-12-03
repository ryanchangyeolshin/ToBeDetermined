/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* global renderRemoveButton */

function renderChoice(data) {
  if (data) {
    const $choice = document.createElement('li')
    $choice.setAttribute('class', 'choice card-panel animated bounceInUp')
    $choice.setAttribute('data-id', choiceId)
    $choice.setAttribute('data-author', data.author)
    $choice.textContent = data.choice
    const $removeButton = renderRemoveButton()
    $choice.appendChild($removeButton)
    return $choice
  }
}

function createChoice($choice, $author) {
  if ($choice.value && $author.value) {
    const choice = {
      id: choiceId,
      choice: $choice.value,
      author: $author.value
    }
    return choice
  }
}

function removeChoice($choices, $choice) {
  $choice.setAttribute('class', 'choice card-panel animated fadeOut')
  setTimeout(function () {
    $choices.removeChild($choice)
  }, 1000)
}
