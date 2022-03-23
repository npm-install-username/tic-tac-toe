// Gameboard interface

const Gameboard = (()=>{

    const blank = "-";
    let gameboard = []
    const initGameBoard = () => {
        
        for (let index = 0; index < 9; index++) {
            
            gameboard[index] = blank;
            
        }
        paintGameBoard(gameboard)
        
    }
    

    const paintGameBoard = (gameboard) => {
        
        for (let i in gameboard){
            let gridCellTarget = document.getElementById(i);
            gridCellTarget.innerText = gameboard[i];
        };
    }


    const cellClicked = (gridCell,activePlayer) => {
        let gridCellid = gridCell.getAttribute('id')
        
        if(gameboard[gridCellid]===blank){
            gameboard[gridCellid] = activePlayer
            paintGameBoard(gameboard)
            return "success"
        } else {
            
            document.getElementById(gridCellid).classList.add("already-used")
            setTimeout(function(){
                document.getElementById(gridCellid).classList.remove("already-used")
            }, 1000)

            return "fail"
        }

    }


    return {
        gameboard,
        initGameBoard,
        cellClicked,
    };
})();


Gameboard.initGameBoard()
console.log(Gameboard.gameboard)


// Game Logic

const GameLogic = (()=>{
    
    const checkWin = () => {

    }

    return{
        checkWin
    }

})();

// Players
const Players = (()=>{
    const player1 = 'X';
    const player2 = 'O';
    let activePlayer = player1;
    let activeSide = document.getElementById('left');

    const setActiveSide = (activePlayer) => {
        if(activePlayer === player1){
            activeSide = 'left'
            inactiveSide = 'right'
            document.getElementById(activeSide).classList.add('left-active');
            document.getElementById(inactiveSide).classList.remove('right-active');
        } else{
            activeSide = 'right'
            inactiveSide = 'left'
            document.getElementById(activeSide).classList.add('right-active');
            document.getElementById(inactiveSide).classList.remove('left-active');
        }
    }
    
    const switchActivePlayer = () => {
        if(activePlayer===player1){
            activePlayer=player2
            console.log(`active player after switch ${activePlayer}`)
            
            
        } else{
            activePlayer=player1
            console.log(`active player after switch ${activePlayer}`)
            
            
        }
        setActiveSide(activePlayer)
        return activePlayer
    };
    return{
        activePlayer,
        switchActivePlayer,
    };
})();

// Events 

let gridCellArray = document.getElementsByClassName('grid-cell')
gridCellArray = Array.from(gridCellArray)
let activePlayer = Players.activePlayer
for (let index = 0; index < gridCellArray.length; index++) {
    const gridCell = gridCellArray[index];
  
    gridCell.addEventListener("click",()=>{
        
        console.log(`active player before click ${activePlayer}`)
        let cellClicked = Gameboard.cellClicked(gridCell,activePlayer);
        if(cellClicked ==="success"){
            activePlayer = Players.switchActivePlayer()
            console.log(`new active ${activePlayer}`)
        }

    })
    
}