
// You have to create a tic tac toe game


// REQUIREMENTS

// 1. SHOW A 3X3 TABLE ON THE UI
// 2. ADD THE ABILITY TO INSERT PLAYER 1 NAME AND PLAYER 2 NAME
// 3. ADD THE ABILITY TO START A GAME
// 4. ADD THE ABILITY TO MAKE A MOVEMENT AND ALTERNATE PLAYERS IN TURNS
// 5. ONCE THE GAME FINISH SHOW A MESSAGE ON THE CONSOLE WITH THE NAME OF THE WINNER OR IF IT IS A TIE

// DESIRABLE
// 6. ADD THE ABILITY TO SELECT THE TABLE DIMENSION 3X3, 4X4, 5X5, ETC
document.getElementById("gameStartSettings").addEventListener("submit",(e)=>{
    e.preventDefault()
    if (validateSettings()){
        alert("invalidInput")
        document.forms["gameStartSettings"].reset()
    }
    else
        processSettingsAndStartGame()
})

let processSettingsAndStartGame = ()=>{
    let settings = document.forms["gameStartSettings"]

    startGame(settings)
}


let startGame = (settings)=>{
    let {player1,player2,boardSize} = settings;
    let board = [];
    for(let i = 0; i<boardSize; i++){
        board.push(new Array(boardSize))
    }
    let end = false
    while (!end)
    {
        
    }
}

