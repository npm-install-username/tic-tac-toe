// Gameboard interface

const Gameboard = (()=>{
    const x = "x";
    const o = "o";
    const blank = "-";
    let gameboard = []
    const initGameBoard = function(){
        gameboard = []
        for (let index = 0; index < 9; index++) {
            gameboard[index] = blank;
        }
        paintGameBoard(gameboard)
        
    }

    const paintGameBoard = function(gameboard) {
        
        for (let i in gameboard){
            let gridCellTarget = document.getElementById(i);
            gridCellTarget.innerText = gameboard[i];
        };
    }


    const cellClicked = function(gridCell){
        let gridCellid = gridCell.getAttribute('id')
        console.log(gridCellid)
        if(gameboard[gridCellid]===blank){
            gameboard[gridCellid] = 'x'
            paintGameBoard(gameboard)
        }

    }


    return {
        gameboard,
        initGameBoard,
        paintGameBoard,
        cellClicked,
    };
})();


Gameboard.initGameBoard()


// Game Logic

const GameLogic = (()=>{
    



})

// Players

// Events 

let gridCellArray = document.getElementsByClassName('grid-cell')
gridCellArray = Array.from(gridCellArray)
for (let index = 0; index < gridCellArray.length; index++) {
    const gridCell = gridCellArray[index];
    gridCell.addEventListener("click",()=>{
        Gameboard.cellClicked(gridCell);
    })
    
}