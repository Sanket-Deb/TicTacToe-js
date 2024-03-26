const cell = document.querySelectorAll(".cell");
const StatusText = document.querySelector(".gameStatus");
const restartBtn = document.querySelector(".gameRestart");
const winConditions= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X";
let active = false;

initializeGame();

function initializeGame(){
    cell.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    StatusText.innerHTML = `It's ${currentPlayer}'s turn`;
    active = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("data-cell-index");
    if(options[cellIndex] != "" || !active){
        return;
    }

    UpdateCell(this, cellIndex);
    checkWinner();
}

function UpdateCell(cell, index){
    options[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    StatusText.innerHTML = `It's ${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i=0; i<winConditions.length; i++){
        const conditions = winConditions[i];
        const cellA = options[conditions[0]];
        const cellB = options[conditions[1]];
        const cellC = options[conditions[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        StatusText.innerHTML =`${currentPlayer} wins`
        active = false;
    }
    else if(!options.includes("")){
        StatusText.innerHTML ="Draw!!"
        active = false;
    }
    else {
        changePlayer();
    }
}

function restartGame(){
    options = ["", "", "", "", "", "", "", "", ""]
    currentPlayer = "X";
    StatusText.innerHTML = `It's ${currentPlayer}'s turn`;
    cell.forEach(cell => cell.innerHTML = "");
    active = true;
}