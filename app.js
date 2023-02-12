const coin = document.querySelector(`.thecoin`);
const chamber = document.querySelector(`.thechamber`);
const headsBtn = document.querySelector(`.heads-button`);
const tailsBtn = document.querySelector(`.tails-button`);
const coinWrapper =document.querySelector(`.coin-wrapper`);
const balanceTxt = document.querySelector(`.balance-txt`);
const dayTxt = document.querySelector(`.day-txt`);
const playerBetInput = document.querySelector(`.coinBetAmount`);

let day = 0;
let playerCash = 100;
let previousBet =0;
let coinTurning = false;
let chamberTurning = false;

let guessChosen = false;

let sideChosen = false;
let coinGuess = `none`;
let coinResult;
let playerBet;

let rouletteResult;

playerBetInput.addEventListener('input', function () {

	// As a number
	playerBet = parseFloat(playerBetInput.value);
	// console.log(typeof playerBet, playerBet);
});

updateBalance();
updateDay();

headsBtn.addEventListener(`click`,()=>{
    if (!coinTurning ){
    tailsBtn.classList.remove(`activated`);
    headsBtn.classList.toggle(`activated`);
        if (headsBtn.classList.contains('activated')){
            coinGuess = `heads`;
        }
        else{
            coinGuess = `none`;
        }     
        console.log(`current guess:`+ coinGuess);
    }
});

tailsBtn.addEventListener(`click`,()=>{
    if (!coinTurning ){
    headsBtn.classList.remove(`activated`);
    tailsBtn.classList.toggle(`activated`);
        if (tailsBtn.classList.contains('activated')){
            coinGuess = `tails`;
        }
        else{
            coinGuess = `none`;
        }     
    }
    console.log(`current guess:`+ coinGuess);
});

coinWrapper.addEventListener(`click`,()=>{

    if (playerBetInput.value === ``){
        alert(`Place your bet now!`);
    }
    // if conditions met, you may spin
    if (coinGuess != `none` && playerBetInput.value != `` ){
       
        if (playerBet > playerCash){
            alert(`You can't bet more than your current balance`)
        }
        // after a month, you must bet more than your previous bet
        else if ( day >31 && playerBet <= previousBet){
            alert(`You're now regarded as a professional gambler. And it may only be fitting for professional gambler to bet more than your previous bet ($ ${previousBet})`);
        }

        // if coin isnt fliipping, then flip
        else if (!coin.classList.contains('animation-flip')){
            coin.classList.add('animation-flip');
            console.log('run');
            coinTurning = true;
        }
        // else remove flip and pick a side
        else if (coin.classList.contains('animation-flip')){
            previousBet = playerBet;
            coin.classList.remove(`animation-flip`);
            coinTurning = false;
            randomizeResult();
            calculateResult();
            updateBalance(); 
            updateDay();
            reset_animation();
            // headsBtn.classList.remove(`activated`);
            // tailsBtn.classList.remove(`activated`);
            // coinGuess = `none`;
        }
    }
});

chamber.addEventListener(`click`,()=>{
    // if conditions met, you may spin
    
       
     
        // after a month, you must bet more than your previous bet
   

        // if coin isnt fliipping, then flip
        if (!chamber.classList.contains('animation-spin')){
            chamber.classList.add('animation-spin');
     
            chamberTurning = true;
        }
        // else remove flip and pick a side
        else if (chamber.classList.contains('animation-spin')){
            chamber.classList.remove(`animation-spin`);
            chamberTurning = false;
            randomizeRoulette();


            // randomizeResult();
            // calculateResult();
            // updateBalance(); 
            // updateDay();
            // reset_animation();
        }
    
});
function randomizeRoulette(){

    let rouletteNumber = getRandomInt(6);
    if (rouletteNumber === 1){
        
    }
    else if(rouletteNumber>1){
        if (rouletteNumber === 2){
            
        }
        else if (rouletteNumber === 3){
            
        }
        else if (rouletteNumber === 4){
            
        } 
        else if (rouletteNumber === 5){
            
        }
        else if (rouletteNumber === 6){
            
        }
    }

}

function randomizeResult(){
    let houseCoinInfluence = 0;
    // day 1-20, win probability is 20% 
    if (day <=20){
        console.log('influenced');
        if (coinGuess ===`heads`){
            houseCoinInfluence = 20;
            console.log('heads cheat on')
        }
        else if (coinGuess === `tails`){
            houseCoinInfluence = -20;
            console.log('tail cheat on')
        }
    }
    // after day 20, win probability becomes 45%
    else if (day > 20){
        if (coinGuess ===`heads`){
            houseCoinInfluence = -5;
        }
        else if (coinGuess === `tails`){
            houseCoinInfluence = 5;
        }
    }

    // if head
    let coinSide = getRandomInt(99);
    console.log(`roll #:`+ coinSide);
    /// probability of head is 0 to 49
    if(coinSide >=0 && coinSide <= 49 + houseCoinInfluence ){
        coin.setAttribute("data-side","heads");
        if (coinGuess ===`heads`){
            coinResult = `won`;
        }
        else if (coinGuess === `tails`){
            coinResult = `lost`;
        }
    }
    //probability of tails is 50 to 99
    else if (coinSide > 49 + houseCoinInfluence && coinSide <= 99){
        coin.setAttribute("data-side","tails");
        if (coinGuess === `heads`){
            coinResult =`lost`;
        }
        else if (coinGuess === `tails`){
            coinResult =`won`;
            console.log('fuk yea')
        }
    }
    console.log(coinResult);
 
}
    
    // if(sideChosen === `heads`){
        
    // }
    // else if (sideChosen ===`tail`){

    // }
    


function calculateResult(){
    
    const coinResultTxt = document.querySelector(`.coin-result-txt`);
  
    let coinOutput = 0;

    if (coinResult === `won`){
    coinOutput = playerBet;
    // console.log(playerBet);
 
    playerCash = playerCash + playerBet;
    coinResultTxt.innerHTML = `You won $ ${coinOutput}`;
    }
    else if (coinResult === `lost`){
        coinOutput = playerBet;
        // console.log(playerBet);
        playerCash -= coinOutput;
        coinResultTxt.innerHTML = `You lost $ ${coinOutput}`;
    }
     
}

function reset_animation() {
    const coinResultTxt = document.querySelector(`.coin-result-txt`);
    coinResultTxt.style.animation = 'none';
    coinResultTxt.offsetHeight; /* trigger reflow */
    coinResultTxt.style.animation = null; 
  }


function updateBalance(){
    balanceTxt.innerHTML = `Cash: $${playerCash}`;
    console.log(playerCash);
}

function updateDay(){
    day +=1;
    dayTxt.innerHTML = `Day: ${day}`;
    // console.log(playerCash);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

