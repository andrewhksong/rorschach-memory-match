let gameCards = document.getElementById('game-cards')
let firstCardClicked
let secondCardClicked
let firstCardClasses
let secondCardClasses
let maxMatches = 2
let matches = 0
let attempts = 0
let gamesPlayed = 0

gameCards.addEventListener('click', handleClick)

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
    modalText.textContent = `You've Won!`
    resetButton.textContent = 'Start A New Challenge'
    body.prepend(modalOverlay)
    modalOverlay.prepend(modalContent)
    modalContent.prepend(modalText)
    modalContent.prepend(resetButton)
    resetButton.addEventListener('click', () => {
        $(".modal-overlay").remove()
    });
    matches = 0;
    attempts = 0;
    gamesPlayed++;
    resetCards();
    displayStats();
}

function resetCards() {
    var hiddenCards = document.querySelectorAll('.card-back');
    for (var listItem = 0; listItem < hiddenCards.length; listItem++) {
        hiddenCards[listItem].classList.remove('hidden');
    }
}


