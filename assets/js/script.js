let gameCards = document.getElementById('game-cards')
let firstCardClicked
let secondCardClicked
let firstCardClasses
let secondCardClasses
let maxMatches = 1
let matches = 0
let attempts = 0
let gamesPlayed = 0

let cards = [
    'left-starter',
    'right-starter',
    'left-blood',
    'right-blood',
    'left-latency',
    'right-latency',
    'left-bat',
    'right-bat',
    'left-sexual',
    'right-sexual',
    'left-mother',
    'right-mother',
    'left-animal',
    'right-animal',
    'left-human',
    'right-human',
    'left-finale',
    'right-finale'
]

document.addEventListener('DOMContentLoaded', (event) => {
    // shuffleCards()
    startModal()
})

gameCards.addEventListener('click', handleClick)

function shuffleCards() {
    let currentIndex = cards.length
    let temporaryValue
    let randomIndex
    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
    }
    for(let index = 0; index < cards.length; index++) {
        let cardContainer = document.createElement('div')
        let cardFront = document.createElement('div')
        let cardBack = document.createElement('div')
        cardContainer.className = 'card col-2'
        cardFront.className = `card-front ${cards[index]}`
        cardBack.className = 'card-back'
        cardContainer.append(cardFront, cardBack)
        gameCards.append(cardContainer)
    }
}

function handleClick(event) {
    if(event.target.className.indexOf('card-back') === -1) {
        return
    }
    event.target.classList.add('hidden')

    if(!firstCardClicked) {
        firstCardClicked = event.target
        const cardClass = firstCardClicked.previousElementSibling.className;
        firstCardClasses = cardClass.slice(cardClass.length - 3, cardClass.length)
    } else {
        secondCardClicked = event.target
        const cardClass = secondCardClicked.previousElementSibling.className;
        secondCardClasses = cardClass.slice(cardClass.length - 3, cardClass.length)
        gameCards.removeEventListener('click', handleClick)
        if(firstCardClasses === secondCardClasses) {
            matches++
            attempts++
            displayStats()
            if(matches === maxMatches) {
                resetGame()
            }
            firstCardClicked = null
            secondCardClicked = null
            gameCards.addEventListener('click', handleClick)
        } else {
            attempts++
            displayStats()
            gameCards.removeEventListener('click', handleClick)
            setTimeout(() => {
                firstCardClicked.classList.remove('hidden')
                secondCardClicked.classList.remove('hidden')
                firstCardClicked = null
                secondCardClicked = null
                gameCards.addEventListener('click', handleClick)
            }, 1500)
        }
    }
}

function displayStats() {
    let gamesPlayedStats = document.querySelector('#games-played')
    let attemptsStats = document.querySelector('#attempts')
    let accuracyStats = document.querySelector('#accuracy')
    attemptsStats.textContent = attempts
    accuracyStats.textContent = calculateAccuracy(attempts, matches)
    gamesPlayedStats.textContent = gamesPlayed
}

function calculateAccuracy(attempts, matches) {
    let percentage = Math.trunc((matches / attempts) * 100)
    if(!percentage) {
        return `0%`
    }
    return `${percentage}%`
}

function resetGame() {
    let body = document.body
    let modalOverlay = document.createElement('div')
    let modalContent = document.createElement('div')
    let modalText = document.createElement('p')
    let resetButton = document.createElement('button')
    modalOverlay.className = 'modal-overlay'
    modalContent.className = 'modal-content'
    resetButton.className = 'modal-button'
    modalText.textContent = `All Cards Matched!`
    resetButton.textContent = 'Reset Deck'
    body.prepend(modalOverlay)
    modalOverlay.prepend(modalContent)
    modalContent.prepend(resetButton)
    modalContent.prepend(modalText)
    resetButton.addEventListener('click', () => {
        $(".modal-overlay").remove()
        shuffleCards()
    });
    matches = 0;
    attempts = 0;
    gamesPlayed++;
    resetCards();
    displayStats();
}

function resetCards() {
    for(let index = 0; index < cards.length; index++) {
        $(".card").remove()
    }
}

function startModal() {
    let body = document.body
    let startModal = document.createElement('div')
    let modalDescription = document.createElement('div')
    let modalHeader = document.createElement('h1')
    let modalText = document.createElement('p')
    let howToPlay = document.createElement('div')
    modalHeader.textContent = "Click Anywhere To Begin!"
    modalText.textContent = "Match the inkblots for a successful match."
    startModal.className = "start-modal"
    modalDescription.className = "modal-description"
    howToPlay.className = "how-to-play"
    body.prepend(startModal)
    startModal.prepend(howToPlay)
    startModal.prepend(modalDescription)
    modalDescription.prepend(modalHeader)
    modalDescription.prepend(modalText)
}