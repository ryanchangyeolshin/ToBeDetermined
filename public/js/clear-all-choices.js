/* eslint-disable no-unused-vars */

function fadeOutAllChoices($choices) {
  for (let i = 0; i < $choices.children.length; i++) {
    if ($choices.children[i].getAttribute('class') === 'card-panel row winner yellow accent-4 animated bounceInUp') {
      $choices.children[i].setAttribute('class', 'card-panel row winner yellow accent-4 animated fadeOut')
    }
    else {
      $choices.children[i].setAttribute('class', 'choice card-panel animated fadeOut')
    }
  }
}

function clearAllChoices($choices) {
  while ($choices.firstChild) {
    $choices.removeChild($choices.firstChild)
  }
}
