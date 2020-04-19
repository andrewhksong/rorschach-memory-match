let gameCards = document.getElementById('game-cards');
gameCards.addEventListener('click', handleClick);

function handleClick(event) {
    if(event.target.className.indexOf('card-back') === -1) {
        return
    }
    event.target.className = 'hidden';
} 