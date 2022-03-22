// Gameboard interface

const Gameboard = (()=>{
    const x = "x";
    const o = "o"
    let gameboard = [[x,o,x],[o,x,o],[x,o,o]];

    const paintGameBoard = function(gameboard) {
        gameboard = gameboard.flat();
        console.log(gameboard);
        let gridCellArrary = document.querySelectorAll('grid-cell')
        for (let i in gameboard){
            console.log(i)
            let gridCellTarget = document.getElementById(i);
            console.log(gridCellTarget)
            gridCellTarget.innerText = gameboard[i];
        };
    }
    return {
        gameboard,
        paintGameBoard,
        
    };
})();


Gameboard.paintGameBoard(Gameboard.gameboard)


// Game Logic

const GameLogic = (()=>{

})