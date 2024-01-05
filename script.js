'use strict';

// Selecting elements using id
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El=document.getElementById('current--0');
const currentScore1El=document.getElementById('current--1');
const diceEl=document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;

let playing = true;

// Selecting & Hiding the dice image
diceEl.classList.add('hidden');

function hideImg(){
    if(!diceEl.classList.contains('hidden')){
        diceEl.classList.add('hidden');
    }
    score0El.textContent=0;
    score1El.textContent=0;
    currentScore0El.textContent=0;
    currentScore1El.textContent=0;
}

function openImg(){
    if(diceEl.classList.contains('hidden')){
        diceEl.classList.remove('hidden');
    }
}

let scores = [0,0];
let currentScore = 0;
let activePlayer = 0;

function switchPlayer(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    currentScore = 0;
}

btnRoll.addEventListener('click',()=>{
    if(playing){
    const dice = Math.trunc(Math.random() * 6) + 1;
    openImg();
    diceEl.src = `dice-${dice}.png`;
    if(dice !== 1 ){
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
        //change active player and setting current to zero
        switchPlayer();
    }
}
});

// holding the state
btnHold.addEventListener('click',function(){
    if(playing){
    // adding current score to active player
    scores[activePlayer]+=currentScore;
    // checking if player wins or not
    // displaying current score
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if(scores[activePlayer]>=20){
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        diceEl.classList.add('hidden');
    }else{
        // switch the player;
        switchPlayer();
    }
}
});

btnNew.addEventListener('click',function(){
    playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    player0El.classList.add('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    hideImg();
});
