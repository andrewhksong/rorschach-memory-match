let gameCards = document.getElementById('game-cards')
let firstCardClicked
let secondCardClicked
let firstCardClasses
let secondCardClasses
let maxMatches = 9
let matches = 0

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
        console.log('1st class:', firstCardClasses);
    } else {
        secondCardClicked = event.target
        const cardClass = secondCardClicked.previousElementSibling.className;
        secondCardClasses = cardClass.slice(cardClass.length - 3, cardClass.length)
        console.log('2nd class:', secondCardClasses);
        gameCards.removeEventListener('click', handleClick)
        if(firstCardClasses === secondCardClasses) {
            matches++
            console.log('matches:', matches)
            if(matches === maxMatches) {
                let body = document.body
                let modalOverlay = document.createElement('div')
                let modalContent = document.createElement('div')
                let modalText = document.createElement('p')
                modalOverlay.className = 'modal-overlay'
                modalContent.className = 'modal-content'
                modalText.textContent = `You've Won!`
                body.prepend(modalOverlay)
                modalOverlay.prepend(modalContent)
                modalContent.prepend(modalText)
            }
            firstCardClicked = null
            secondCardClicked = null
            gameCards.addEventListener('click', handleClick)
            console.log(firstCardClicked, secondCardClicked)
            console.log('success')
        } else {
            gameCards.removeEventListener('click', handleClick)
            setTimeout(() => {
                firstCardClicked.classList.remove('hidden')
                secondCardClicked.classList.remove('hidden')
                firstCardClicked = null
                secondCardClicked = null
                gameCards.addEventListener('click', handleClick)
            }, 1500)
            console.log(firstCardClicked, secondCardClicked)
        }
    }
}