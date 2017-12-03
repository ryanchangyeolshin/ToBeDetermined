/* eslint-disable no-unused-vars */

function renderRemoveButton() {
  const $removeButton = document.createElement('button')
  $removeButton.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
  $removeButton.setAttribute('id', 'remove')
  const $removeButtonIcon = document.createElement('i')
  $removeButtonIcon.setAttribute('class', 'fa fa-trash')
  $removeButtonIcon.setAttribute('aria-hidden', 'true')
  $removeButton.appendChild($removeButtonIcon)
  return $removeButton
}

function disableButton($button) {
  if ($button.getAttribute('id') === 'remove') {
    $button.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red disabled')
  }
  else {
    $button.setAttribute('class', 'waves-effect waves-light btn-large disabled')
  }
}

function enableButton($button) {
  if ($button.getAttribute('id') === 'remove') {
    $button.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
  }
  else if ($button.getAttribute('id') === 'randomize') {
    $button.setAttribute('class', 'waves-effect waves-light btn-large orange')
  }
  else {
    $button.setAttribute('class', 'waves-effect waves-light btn-large')
  }
}
