//Memory Game

const startBtn = document.querySelector('button.start');
const gameContainer = document.querySelector('#game');
const currentScore = document.querySelector('.current-score span');
const bestScore = document.querySelector('.best-score span');
let score = 0;
let messageEnd = document.querySelector('.game-message');
let messageScore = document.querySelector('.game-message .high-score');
let messageScoreNum = document.querySelector('.game-message .high-score span');

//array of images
let allGifs = ['images/gif-1.gif','images/gif-2.gif','images/gif-3.webp',
'images/gif-4.webp','images/gif-5.webp','images/gif-6.webp',
'images/gif-7.webp','images/gif-8.webp','images/gif-9.webp',
'images/gif-10.webp','images/gif-11.webp','images/gif-12.webp'];
let allGifsCopy = [...allGifs];
let gameGifs = allGifs.concat(allGifsCopy);

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function updateCards() {
    let cardImgs = document.querySelectorAll('.flip-card-back');
    let matched = document.querySelectorAll('.matched');
    document.querySelector('#game').classList.add('started');
    for(let i=0; i<cardImgs.length; i++) {
        cardImgs[i].style.backgroundImage = `url(${gameGifs[i]})`;
    }
    if(matched.length) {
        for(let flipped of matched){
            flipped.classList.remove('matched');
            flipped.classList.add('active');
        }
    }
    score = 0;
    currentScore.innerHTML = score;
    startBtn.innerHTML = "Restart Game";
    messageScore.classList.add('hide');
    messageEnd.classList.add('hide');
}

function secondCard(event) {
    event.target.closest('.flip-card').classList.add('flipped');
    const activeCards = document.querySelectorAll('.active');
    for(let active of activeCards){
        active.classList.remove('active')
    }
    let cardBack = document.querySelectorAll('.flipped .flip-card-back');
    let matched = document.querySelectorAll('.flipped');
    if(cardBack[0].style.backgroundImage == cardBack[1].style.backgroundImage){
        setTimeout(function(){
            for(let flipped of matched){
                flipped.classList.add('matched');
                flipped.classList.remove('active');
            }
            finishedGame();
        }, 600);
    }
    setTimeout(function(){
        for(let flipped of matched){
            flipped.classList.remove('flipped');
        }
        for(let active of activeCards){
            active.classList.add('active')
        }
    }, 1000);
    score++;
    currentScore.innerHTML = score;
}

function firstCard(event) {
    event.target.closest('.flip-card').classList.add('flipped');
    score++;
    currentScore.innerHTML = score;
}

function finishedGame() {
    let allMatches = document.querySelectorAll('.matched');
    let topScore = localStorage.getItem("highScore");
    if(allMatches.length == 24) {
        if ((topScore && topScore > score) || !topScore) {
            localStorage.setItem("highScore", score);
            topScore = score;
            messageScoreNum.innerHTML = score;
            messageScore.classList.remove('hide');
        }
        startBtn.innerHTML = "New Game";
        messageEnd.classList.remove('hide');
    }
    if (topScore) {bestScore.innerHTML = topScore;}
}

//Add event listeners
document.addEventListener('click', function (event) {

	if (event.target.matches('button.start')) {
		window.scroll({
            top: 500,
            left: 100,
            behavior: 'smooth'
          });
        shuffle(gameGifs);
        updateCards();
        finishedGame();
	}

	if (event.target.matches('.flip-card-front.active')) {
        let flippedCards = document.querySelectorAll('.flipped');
        flippedCards.length ? secondCard(event) : firstCard(event);
    }
}, false);