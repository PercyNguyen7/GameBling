const coin = document.querySelector(`.thecoin`);
const chamber = document.querySelector(`.thechamber`);
const chamberBox = document.querySelector(`.thechamber-box`)
const headsBtn = document.querySelector(`.heads-button`);
const tailsBtn = document.querySelector(`.tails-button`);
const coinWrapper =document.querySelector(`.coin-wrapper`);
const allInBtn = document.querySelector(`.all-in-btn`)
const rouletteGame = document.querySelector(`#roulette-game`)

const balanceTxt = document.querySelector(`.balance-txt`);
const dayTxt = document.querySelector(`.day-txt`);
const shootTxt = document.querySelector(`.shoot-txt`)

const glassBG = document.querySelector(`.broken-glass`);
const playerBetInput = document.querySelector(`.coinBetAmount`);

const pickSFX = new Audio(`assets/sounds/pick.mp3`);
const coinSpinSFX = new Audio(`assets/sounds/coin-spin.mp3`);

const casinoSoundtrack = new Audio(`assets/sounds/casinoBG.mp3`);
const cockRevSFX = new Audio(`assets/sounds/cocking2.mp3`);
const shootSFX = new Audio(`assets/sounds/shoot.mp3`)
const chamberSpinSFX = new Audio(`assets/sounds/spin.mp3`);

const emptyRevSFX =new Audio(`assets/sounds/empty-chamber.mp3`);

const winSFX =new Audio(`assets/sounds/win.mp3`);
const loseSFX =new Audio(`assets/sounds/lose.wav`);
let proDayMark = 10;
let day = 0;
let playerCash = 100;
let previousBet =0;
let coinTurning = false;
let chamberTurning = false;
let once = false;
let onceBroke = false;
let guessChosen = false;

let sideChosen = false;
let coinGuess = `none`;
let coinResult;
let playerBet;

let rouletteResult;
let roulettePlaying = false;

playerBetInput.addEventListener('input', function () {
    // allInBtn.classList.remove(`active`);
	// As a number
	playerBet = parseFloat(playerBetInput.value);
    console.log(playerBet)
	// console.log(typeof playerBet, playerBet);
});
// greeting();

// function greeting() {
//     let person = prompt("Please enter your casino alias", "Blackjack Champ");
//     if (person != null) {
//       person = `player`;
//     }
// }

updateBalance();
updateDay();

// allInBtn.addEventListener(`click`,()=>{
//     if (!coinTurning && !roulettePlaying){
       
//         // if (allInBtn.classList.contains(`activated`)){

//         // }
//         playerBetInput.value = ``;
//         playerBet = parseFloat(playerBetInput.value);
//         allInBtn.classList.toggle(`active`);
//         playerBet = playerCash;
//     }
// });

headsBtn.addEventListener(`click`,()=>{
   
    if (!coinTurning && !roulettePlaying){
   updateMusic();
    tailsBtn.classList.remove(`activated`);
    headsBtn.classList.toggle(`activated`);
        if (headsBtn.classList.contains('activated')){
            pickSFX.currentTime = 0;
            pickSFX.play();
            coinGuess = `heads`;
        }
        else{
            coinGuess = `none`;
        }     
        console.log(`current guess:`+ coinGuess);
    }
});

tailsBtn.addEventListener(`click`,()=>{
    if (!coinTurning && !roulettePlaying){
     updateMusic();
    headsBtn.classList.remove(`activated`);
    tailsBtn.classList.toggle(`activated`);
        if (tailsBtn.classList.contains('activated')){
            pickSFX.currentTime = 0;
            pickSFX.play();
            coinGuess = `tails`;
        }
        else{
            coinGuess = `none`;
        }     
    }
    console.log(`current guess:`+ coinGuess);
});

coinWrapper.addEventListener(`click`,()=>{
    
    if (playerBetInput.value === `` && !roulettePlaying){
        alert(`Place your bet now!`);
    }
    else if (coinGuess === `none`){
        console.log('test')
        alert(`Select heads or tails!`);
    }
    // if conditions met, you may spin
    if (coinGuess != `none` && playerBetInput.value != `` && !roulettePlaying){
       
        if (playerBet > playerCash){
            alert(`You can't bet more than your current balance`)
        }
    
        // after a month, you must bet more than your previous bet
        else if ( day > proDayMark && playerBet <= previousBet){
            // if (!onceBroke) {
            //     onceBroke = true;

            // }

            alert(`You're now regarded as a professional gambler. And it may only be fitting for professional gambler to bet more than your previous bet ($ ${previousBet}).`);
        }
      
        // if coin isnt fliipping, then flip
        else if (!coin.classList.contains('animation-flip')){
            coin.classList.add('animation-flip');
            console.log('run');
            coinTurning = true;

            coinSpinSFX.loop = true;
            coinSpinSFX.play();
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

            coinSpinSFX.pause();
            // headsBtn.classList.remove(`activated`);
            // tailsBtn.classList.remove(`activated`);
            // coinGuess = `none`;
        }
    }

 
});

chamber.addEventListener(`click`,()=>{
    // if conditions met, you may spin
    if(!coinTurning){

        if (!casinoSoundtrack.paused ){
        casinoSoundtrack.pause();
        }
    chamberBox.classList.remove(`animation-trigger`);
       roulettePlaying = true;
        
        // after a month, you must bet more than your previous bet
   headsBtn.classList.remove(`activated`);
    tailsBtn.classList.remove(`activated`);
    coinGuess = `none`;

        // if chamber isnt rotating, then rotate
        if (!chamber.classList.contains('animation-spin')){
            chamber.classList.add('animation-spin');
            
            chamberTurning = true;
            chamberSpinSFX.currentTime=0;
            chamberSpinSFX.loop = true;
            chamberSpinSFX.play();

        }
        // else remove animation and pick a chamber
        else if (chamber.classList.contains('animation-spin')){
            chamber.classList.remove(`animation-spin`);
            shootTxt.innerHTML =`shoot`;
            shootTxt.classList.add(`active`);
            chamberTurning = false;
            chamber.classList.add(`hidden`);
            once = true;
            //sfx
            chamberSpinSFX.pause();
            cockRevSFX.currentTime =0;
            cockRevSFX.play();
            resetRouletteAnimations();
            randomizeRoulette();

        }
    }
});

shootTxt.addEventListener(`click`,()=>{
 
    if(!chamberTurning && once){
        once =  false;
        chamber.classList.remove(`hidden`);
        chamberBox.classList.add(`animation-trigger`);
      

        shootTxt.innerHTML =`safe`;
        shootTxt.classList.remove(`active`);
    
        calculateRouletteResult();
      
        console.log(playerCash)
        updateBalance(); 
        updateDay();
        roulettePlaying = false;
        console.log('sadad');
    }
});

function randomizeRoulette(){

    let rouletteNumber = getRandomInt(6);
    console.log(rouletteNumber);
    
    if (rouletteNumber === 0){
        rouletteResult=`lost`;
        chamber.setAttribute(`data-number`,1);
   
    }
    else if(rouletteNumber>0){
        rouletteResult=`won`;
  
        if (rouletteNumber === 1){
        chamber.setAttribute(`data-number`,2);
        }
        else if (rouletteNumber === 2){
         chamber.setAttribute(`data-number`,3);   
        }
        else if (rouletteNumber === 3){
        chamber.setAttribute(`data-number`,4);    
        } 
        else if (rouletteNumber === 4){
        chamber.setAttribute(`data-number`,5);    
        }
        else if (rouletteNumber === 5){
        chamber.setAttribute(`data-number`,6);    
        }
    }

}

function calculateRouletteResult(){

    if (rouletteResult === `lost`){
        // playerCash -= 1000;
        shootSFX.play();
        glassBG.classList.add('active');
        setTimeout(()=>{alert(`You spent the last ${day} days gambling away your life...`)},3000);
    }
    else if(rouletteResult === `won`){
        playerCash += 1000;
        emptyRevSFX.play();
    }
}

function randomizeResult(){
    let houseCoinInfluence = 0;
    // day 1-20, win probability is 20% 
    if (day <=5){
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
    else if (day > 5){
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
        winSFX.currentTime = 0;
        winSFX.play();

 
    playerCash = playerCash + playerBet;
    coinResultTxt.innerHTML = `You won $${coinOutput}`;
    }
    else if (coinResult === `lost`){
        coinOutput = playerBet;
        // console.log(playerBet);
        loseSFX.currentTime = 0;
        loseSFX.play();

        playerCash -= coinOutput;
        coinResultTxt.innerHTML = `You lost $${coinOutput}`;

    }
// if lost coin, 
    if(playerCash <=0 && !onceBroke || playerCash < previousBet && day >= proDayMark && !onceBroke){
    setTimeout(()=>{ alert('It seems like you have run out of coin! Why not join our newest game, RUSSIAN ROULETTE?');
    rouletteGame.classList.add('active');
    rouletteGame.scrollIntoView();},1000);
    casinoSoundtrack.pause();
    onceBroke = true;
}
     
}

function reset_animation() {
    const coinResultTxt = document.querySelector(`.coin-result-txt`);
    coinResultTxt.style.animation = 'none';
    coinResultTxt.offsetHeight; /* trigger reflow */
    coinResultTxt.style.animation = null; 
}

function resetRouletteAnimations(){
    // const shootTxt = document.querySelector(`.shoot-txt`);
    shootTxt.style.animation = 'none';
    shootTxt.offsetHeight; /* trigger reflow */
    shootTxt.style.animation = null; 

    chamber.style.animation = 'none';
    chamber.offsetHeight; /* trigger reflow */
    chamber.style.animation = null; 
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

  function updateMusic(){
    if (casinoSoundtrack.paused ){
    casinoSoundtrack.loop = true;
    casinoSoundtrack.volume=0.1;
    casinoSoundtrack.play();
    }
}