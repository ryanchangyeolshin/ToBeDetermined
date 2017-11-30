/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var choices = []
var choiceId = 0

function renderChoice(data) {
  if (data) {
    var $choice = document.createElement('li')
    $choice.setAttribute('class', 'choice card-panel animated bounceInUp')
    $choice.setAttribute('data-id', choiceId)
    $choice.setAttribute('data-author', data.author)
    $choice.textContent = data.choice
    var $removeButton = renderRemoveButton()
    $choice.appendChild($removeButton)
    return $choice
  }
}

function createChoice($choice, $author) {
  if ($choice.value && $author.value) {
    var choice = {
      id: choiceId,
      choice: $choice.value,
      author: $author.value
    }
    return choice
  }
}

function fadeOutAllChoices($choices) {
  for (var i = 0; i < $choices.children.length; i++) {
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

function renderRemoveButton() {
  var $removeButton = document.createElement('button')
  $removeButton.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
  $removeButton.setAttribute('id', 'remove')

  var $removeButtonIcon = document.createElement('i')
  $removeButtonIcon.setAttribute('class', 'fa fa-trash')
  $removeButtonIcon.setAttribute('aria-hidden', 'true')
  $removeButton.appendChild($removeButtonIcon)

  return $removeButton
}

function removeChoice($choices, $choice) {
  $choice.setAttribute('class', 'choice card-panel animated fadeOut')
  setTimeout(function () {
    $choices.removeChild($choice)
  }, 1000)
}

function randomNumber(data) {
  if (data.length !== 0) {
    var number = Math.round(Math.random() * (data.length - 1))
  }
  return number
}

function createDecision(data, number) {
  for (var i = 0; i < data.length; i++) {
    if (i === number) {
      var decision = {
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
  var $choices = document.querySelectorAll('.choice')
  for (var i = 0; i < $choices.length; i++) {
    var choiceDataId = $choices[i].getAttribute('data-id')
    if (choiceDataId !== data.winningId.toString()) {
      $choices[i].setAttribute('class', 'choice card-panel animated fadeOut')
    }
    else {
      $choices[i].setAttribute('class', 'choice winner yellow accent-4 card-panel')
    }
  }
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

function renderGif() {
  var $justDoItGif = document.createElement('iframe')
  $justDoItGif.setAttribute('src', 'https://giphy.com/embed/b7f0X8Okk1uyk')
  $justDoItGif.setAttribute('width', '480')
  $justDoItGif.setAttribute('height', '270')
  $justDoItGif.setAttribute('frameBorder', '0')
  $justDoItGif.setAttribute('class', 'giphy-embed col s12')

  return $justDoItGif
}

function renderWinner(winner) {
  var $winner = document.createElement('h5')
  $winner.setAttribute('class', 'card-title col s8 offset-s2')
  $winner.textContent = `${winner} is the winner!`
  return $winner
}

function renderResult(winner) {
  var $result = document.createElement('li')
  $result.setAttribute('class', 'card-panel row winner yellow accent-4 animated bounceInUp')

  var $winner = renderWinner(winner)
  var $justDoItGif = renderGif()

  $result.appendChild($winner)
  $result.appendChild($justDoItGif)

  return $result
}

function clearUserInput($choice, $author) {
  $choice.value = ''
  $author.value = ''
}

var $submitButton = document.querySelector('#submit')
$submitButton.addEventListener('click', function (e) {
  e.preventDefault()
  var choice = createChoice(
    document.querySelector('#choice'),
    document.querySelector('#author')
  )

  if (choice) {
    choices.push(choice)
    var $choice = renderChoice(choice)
    var $choices = document.querySelector('#choices')
    $choices.appendChild($choice)
    choiceId++
  }

  clearUserInput(
    document.querySelector('#choice'),
    document.querySelector('#author')
  )
})

var $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function (e) {
  e.preventDefault()
  choices = []
  choiceId = 0
  var $choices = document.querySelector('#choices')
  fadeOutAllChoices($choices)
  setTimeout(function () {
    clearAllChoices($choices)
  }, 1000)

  enableButton($submitButton)
  enableButton($randomizeButton)
})

var $randomizeButton = document.querySelector('#randomize')
$randomizeButton.addEventListener('click', function (e) {
  e.preventDefault()
  if (choices.length > 1) {
    var randomNum = randomNumber(choices)
    var decision = createDecision(choices, randomNum)
    fadeOutOtherChoices(decision)

    var $winningChoice = document.querySelector('.winner')
    $winningChoice.setAttribute('class', 'choice winner yellow accent-4 card-panel animated pulse infinite')

    var $removeButton = document.querySelectorAll('#remove')[decision.winningId]
    disableButton($removeButton)
    disableButton($submitButton)
    disableButton($randomizeButton)
  }
})

var $choices = document.querySelector('#choices')
$choices.addEventListener('click', function (e) {
  if (e.target.getAttribute('class') === 'fa fa-trash') {
    var $choice = e.target.closest('.choice')
    var choiceIndex = $choice.getAttribute('data-id')
    choices.splice(choiceIndex, 1)
    removeChoice($choices, $choice)
  }
  else if (e.target.getAttribute('class') === 'choice winner yellow accent-4 card-panel animated pulse infinite') {
    clearAllChoices($choices)
    var winningChoice = e.target.textContent
    var winner = e.target.getAttribute('data-author')
    var $result = renderResult(winningChoice, winner)
    $choices.appendChild($result)
  }
})

var header = new Typed('.site-name', {
  strings: ["Let's grab: McDonalds", "Let's grab: Taco Bell", "Let's grab: Pizza Hut", 'To Be Determined...'],
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
