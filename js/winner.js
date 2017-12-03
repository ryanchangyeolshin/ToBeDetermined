/* eslint-disable no-unused-vars */

function renderGif() {
  const $justDoItGif = document.createElement('iframe')
  $justDoItGif.setAttribute('src', 'https://giphy.com/embed/b7f0X8Okk1uyk')
  $justDoItGif.setAttribute('width', '480')
  $justDoItGif.setAttribute('height', '270')
  $justDoItGif.setAttribute('frameBorder', '0')
  $justDoItGif.setAttribute('class', 'giphy-embed col s12')
  return $justDoItGif
}

function renderWinner(winner) {
  const $winner = document.createElement('h4')
  $winner.setAttribute('class', 'card-title col s8 offset-s2')
  const $bold = document.createElement('strong')
  $bold.textContent = `${winner} is the winner!`
  $winner.appendChild($bold)
  return $winner
}

function renderResult(winner) {
  const $result = document.createElement('li')
  $result.setAttribute('class', 'card-panel row winner yellow accent-4 animated bounceInUp')
  const $winner = renderWinner(winner)
  const $justDoItGif = renderGif()
  $result.appendChild($winner)
  $result.appendChild($justDoItGif)
  return $result
}
