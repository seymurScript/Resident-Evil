const cardHeader = document.querySelector("#card-header");
const cardBody = document.querySelector("#card-body");
const info = document.querySelector("#info");
const input = document.querySelector("#input");
const modal = document.querySelector("#modal");
const keyboard = document.querySelector("#keyboard");
const mymusic = document.querySelector("#myMusic");
const lost = document.querySelector("#lost");
const won = document.querySelector("#won")
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const wrongs = document.querySelector("#maxWrong");

startBtn.addEventListener("click",generateButtons);
keyboard.addEventListener("click",handleGuess);
resetBtn.addEventListener("click",reset);

var programming_langs = ["axe","sword","knife","bat" ,"machete","shotgun","rifle","molotov","pistol","sniper","grenade","chainsaw","acid"];
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus;

answer = programming_langs[Math.floor(Math.random() * programming_langs.length)];
answer = answer.toUpperCase();
// console.log(answer);

function generateButtons(){
    startBtn.style.display = "none";
    info.removeAttribute("style");
    input.removeAttribute("style");
    wrongs.removeAttribute("style");
    resetBtn.removeAttribute("style");
    input.removeAttribute("style");
    let button = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(letter=>
        `
            <button
                class =  btn btn-light m-1 btn-lg"
                id = "` + letter + `"
                onclick = "handleGuess('` + letter +`')"
            >
            ` + letter + `
            </button>
        `).join("");
    keyboard.innerHTML = button;
}
function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : 0;
    document.getElementById(chosenLetter).setAttribute("disabled",true);
    if(answer.indexOf(chosenLetter)>=0){
        guessedWord();
        checkWon();

    }
    else{
        mistakes++;
        if(mistakes ===maxWrong){
            gameOver();
        }
    }
    wrongs.innerHTML = `Wrong Guesses: ${mistakes} of ${maxWrong}`
};
function guessedWord(){
    wordStatus = answer.split("").map(letter=>(guessed.indexOf(letter) >=0 ? letter : "—")).join("");
    input.innerHTML = wordStatus;
};
function checkWon(){
    if(wordStatus === answer){
        cardBody.style.display = "none";
        cardHeader.style.display = "none";
        modal.removeAttribute("style");
        modal.innerHTML = `YOU ARE FIND ${answer} <br> AND ESCAPE `
        modal.style.color = "white";
        themeMusic();
        wonMusic();
        
    }
    
}
function reset(){
    window.location.reload();
};
function gameOver(){
    cardBody.style.display = "none";
    cardHeader.style.display = "none";
    modal.removeAttribute("style");
    modal.innerHTML = `YOU ARE DIED VIA ${answer}`
    themeMusic();
    lostMusic();
    setTimeout(reset,10000);
    
};
function themeMusic(){
    mymusic.pause()
}
function lostMusic(){
    lost.play()
}
function wonMusic(){
    won.play()
}
guessedWord()