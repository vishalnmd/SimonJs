let gameseq = [];
let userseq = [];
let chance = ['pink', 'blue', 'purple', 'orange'];
let count = -1;

let start = false;
let level = 0;

let btns = document.querySelectorAll('.col');
for (btn of btns) {
    btn.addEventListener("click", buttonPressed);
} 

function onstart () {
    if (start === false) {
        start = true;
        leveup();
    }
}

document.addEventListener('keypress', function (event) {
    onstart();
});

document.addEventListener('touchend', function (event) {
    onstart();
});

function leveup() {
    level++;
    count =-1;
    userseq = [];
    let randBtnIdx = Math.floor(Math.random() * 4);
    let randBtn = document.querySelector(`.${chance[randBtnIdx]}`);
    gameseq.push(randBtnIdx);
    blink(randBtn);

    let h4 = document.querySelector('h4');
    h4.innerHTML = `level ${level}`;
}

let blink = function (btn) {

    if (start == true) {
        btn.classList.add('blink');

        setTimeout(function () {
            btn.classList.remove('blink');
        }, 250);
    }
}

function buttonPressed(event) {
    
    if (start == true) {
        blink(event.target);
        let idx = parseInt(event.target.innerText) - 1;
        userseq.push(idx);
        count++ ;
        
        if(count < gameseq.length && !checkUserchoice(count)){
            gameOver();
        }

        if(count === gameseq.length-1 && level!=-1){
            setTimeout(() => {
                leveup();
            }, 1000)
        }
        

    }
}


function checkUserchoice(i) {
    if(gameseq[i]!=userseq[i])
        return false;
    
    return true;
}

function gameOver() {
    let h4 = document.querySelector('h4');
    h4.innerHTML = `Game Over ! your score is ${level} <br> Please press any button to start the same`;
    start = false;
    gameseq = [];
    level = -1;
    count = -1;
}
