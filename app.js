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
        blank,
        initGameBoard,
        cellClicked,
    };
})();


Gameboard.initGameBoard()
console.log(Gameboard.gameboard)


// Game Logic

const GameLogic = (()=>{
    

    const checkWin = () => {
        
        // Check row
        for (let i = 0; i < Gameboard.gameboard.length; i+=3) {
            let gridCell1 = document.getElementById(i)
            let gridCell2 = document.getElementById(i+1)
            let gridCell3 = document.getElementById(i+2)

            if(gridCell1.innerText === Gameboard.blank){
                
                continue;
            }
            if((gridCell1.innerText === gridCell2.innerText ) && (gridCell2.innerText === gridCell3.innerText) ){
                
                gridCell1.classList.add('three-in-a-row')
                gridCell2.classList.add('three-in-a-row')
                gridCell3.classList.add('three-in-a-row')
                return true
            }
            
        }

        // Check column
        for (let i = 0; i < 3; i++) {
            let gridCell1 = document.getElementById(i)
            let gridCell2 = document.getElementById(i+3)
            let gridCell3 = document.getElementById(i+6)
            if(gridCell1.innerText === Gameboard.blank){
                
                continue;
            }
            if((gridCell1.innerText === gridCell2.innerText ) && (gridCell2.innerText === gridCell3.innerText) ){
                
                gridCell1.classList.add('three-in-a-row')
                gridCell2.classList.add('three-in-a-row')
                gridCell3.classList.add('three-in-a-row')
                return true
            }
            
        }

        // Check downwards right diagonal
        for (let i = 0; i < 2; i+=2) {
            let gridCell1 = document.getElementById(i)
            let gridCell2 = document.getElementById(i+4)
            let gridCell3 = document.getElementById(i+8)
            if(gridCell1.innerText === Gameboard.blank){
                
                continue;
            }
            if((gridCell1.innerText === gridCell2.innerText ) && (gridCell2.innerText === gridCell3.innerText) ){
                
                gridCell1.classList.add('three-in-a-row')
                gridCell2.classList.add('three-in-a-row')
                gridCell3.classList.add('three-in-a-row')
                return true
            }
            
            
        }

        // Check downwards left diagonal
        for (let i = 2; i < 4; i+=2) {
            let gridCell1 = document.getElementById(i)
            let gridCell2 = document.getElementById(i+2)
            let gridCell3 = document.getElementById(i+4)
            if(gridCell1.innerText === Gameboard.blank){
                
                continue;
            }
            if((gridCell1.innerText === gridCell2.innerText ) && (gridCell2.innerText === gridCell3.innerText) ){
                
                gridCell1.classList.add('three-in-a-row')
                gridCell2.classList.add('three-in-a-row')
                gridCell3.classList.add('three-in-a-row')
                return true
            }
            
            
        }
        return false
         
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
            
            
            
        } else{
            activePlayer=player1
            
            
            
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
        let threeInARow = document.getElementsByClassName('three-in-a-row')
        if(threeInARow.length != 0 ){
            return 
        }
        
        let cellClicked = Gameboard.cellClicked(gridCell,activePlayer);

        if(cellClicked ==="success"){
            activePlayer = Players.switchActivePlayer()
            
            console.log(Gameboard.gameboard)
            let checkWin = GameLogic.checkWin()
            if (checkWin){
                let backgroundDiv = document.getElementById('background-div');
                
                let winMessage = document.createElement('div')
                winMessage.classList.add('win-message')
                backgroundDiv.appendChild(winMessage)
                winMessage.innerHTML = "You Win!"
                
            }
        }
        
    })
    
}