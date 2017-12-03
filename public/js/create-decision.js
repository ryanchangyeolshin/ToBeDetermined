/* eslint-disable no-unused-vars */

function randomNumber(data) {
  if (data.length !== 0) {
    const number = Math.round(Math.random() * (data.length - 1))
    return number
  }
}

function createDecision(data, number) {
  for (let i = 0; i < data.length; i++) {
    if (i === number) {
      const decision = {
        winningId: data[i].id,
        winningChoice: data[i].choice,
        winner: data[i].author,
        choices: data
      }
      return decision
    }
  }
}

function fadeOutOtherChoices(data) {
  const $choices = document.querySelectorAll('.choice')
  for (var i = 0; i < $choices.length; i++) {
    const choiceDataId = $choices[i].getAttribute('data-id')
    if (choiceDataId !== data.winningId.toString()) {
      $choices[i].setAttribute('class', 'choice card-panel animated fadeOut')
    }
    else {
      $choices[i].setAttribute('class', 'choice winner yellow accent-4 card-panel')
    }
  }
}
