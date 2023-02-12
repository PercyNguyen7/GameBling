const coin = document.querySelector(`.thecoin`);
const headBtn = document.querySelector(`.heads-button`);
const tailsBtn = document.querySelector(`.tails-button`);


let coinTurning = true;

let guessChosen = false;

let sideChosen = false;
let coinGuess;

headBtn.addEventListener(`click`,()=>{
    headBtn.classList.toggle(`activated`);
        if (headBtn.classList.contains('activated')){
            coinGuess = `head`;
        }
        else{
            coinGuess = ``;
        }     
        console.log(coinGuess);
});

tailsBtn.addEventListener(`click`,()=>{
    
});

coin.addEventListener(`click`,()=>{
    if (!guessChosen){
        if (!coin.classList.contains('animation-flip')){
            coin.classList.add('animation-flip');
            console.log('run');
            coinTurning = true;
        }
        else if (coin.classList.contains('animation-flip')){
            coin.classList.remove(`animation-flip`);
            coinTurning = false;
            randomizeSide();
        }
    }
});




function randomizeSide(){
    let coinSide = getRandomInt(2);
    if(coinSide ===0){
        coin.setAttribute("data-side","head");
    }
    else if (coinSide ===1){
        coin.setAttribute("data-side","tails");
    }
    console.log(coinSide);
    
    // if(sideChosen === `head`){
        
    // }
    // else if (sideChosen ===`tail`){

    // }
    
    sideChosen = false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }