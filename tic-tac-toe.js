// You have to create a tic tac toe game

// REQUIREMENTS

// 1. SHOW A 3X3 TABLE ON THE UI
// 2. ADD THE ABILITY TO INSERT PLAYER 1 NAME AND PLAYER 2 NAME
// 3. ADD THE ABILITY TO START A GAME
// 4. ADD THE ABILITY TO MAKE A MOVEMENT AND ALTERNATE PLAYERS IN TURNS
// 5. ONCE THE GAME FINISH SHOW A MESSAGE ON THE CONSOLE WITH THE NAME OF THE WINNER OR IF IT IS A TIE

// DESIRABLE
// 6. ADD THE ABILITY TO SELECT THE TABLE DIMENSION 3X3, 4X4, 5X5, ETC

let board = [];
const settings = {};

const generateBoardBox = (x, y) => {
  const div = document.createElement("div");
  div.classList.add("ttt_box");
  div.setAttribute("onclick", `makeMove(this, ${x}, ${y})`);
  return div;
};
//True for player1
let currentPlayer = true;
const getCurrentPlayerName = () =>
  currentPlayer ? settings.player1 : settings.player2;
document
  .getElementById("gameStartSettings")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.forEach((value, key) => {
      settings[key] = value;
    });
    console.log(settings);

    if (invalidSettings(settings)) {
      alert("invalidInput");
      document.forms["gameStartSettings"].reset();
    } else {
      processSettingsAndStartGame(settings);
    }
  });

const invalidSettings = (settings) => {
  return settings.player1 == "" || settings.player2 == "" || tableSize < 3;
};

const processSettingsAndStartGame = () => {
  let { tableSize, player1, player2 } = settings;
  for (let i = 0; i < tableSize; i++) {
    board.push(Array.from({ length: tableSize }, () => null));
    for (let j = 0; j < tableSize; j++) {
      document.getElementById("boardArea").appendChild(generateBoardBox(i, j));
    }
  }
  document.getElementById("gameStartSettings").hidden = true;
  document.getElementById("gameArea").style["display"] = "flex";

  document.getElementById("gameInfoArea").innerHTML = `<h1>Tic tac toe</h1>
            <div id="player1Name">${player1} <b>X</b></div>
            <div id="player2Name">${player2} <b>O</b></div>
            <h2 id="currentTurnPlayer">${getCurrentPlayerName()}'s Turn</h2>`;

  document.getElementById("boardArea").style[
    "grid-template-columns"
  ] = `repeat(${tableSize}, minmax(0, 1fr))`;
};

//TODO: change alert for popup
const makeMove = async (element, x, y) => {
  const mark = currentPlayer ? "X" : "O";
  element.innerText = mark;
  element.classList.add("noHover");
  element.removeAttribute("onclick");
  board[x][y] = mark;

  await new Promise((resolve) => requestAnimationFrame(resolve));

  if (checkWinner(mark, board)) {
    displayEndgame(getCurrentPlayerName())
    return;
  }
  if (board.every((item) => item.every((rowItem) => rowItem))) {
    displayEndgame()
    return;
  }
  currentPlayer = !currentPlayer;
  document.getElementById(
    "currentTurnPlayer"
  ).innerText = `${getCurrentPlayerName()}'s Turn`;
};

const checkWinner = (
  mark,
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
) => {
  //board is always square
  let tableSize = board.length;
  //horizontal
  if (board.some((row) => row.every((rowItem) => rowItem == mark))) return true;
  //vertical
  if (
    board.some((item, idx) =>
      board
        .map((box) => box[idx]) //Column (BEWARE: idx refers to current row, but works as board is square, item is unused)
        .every((colItem) => colItem == mark)
    )
  )
    return true;

  i = -1;
  //diagonals

  if (
    board
      .map((item) => {
        i++;
        return item[i];
      })
      .every((colItem) => colItem == mark)
  )
    return true;

  i = tableSize;
  if (
    board
      .map((item) => {
        i--;
        return item[i];
      })
      .every((colItem) => colItem == mark)
  )
    return true;

  return false;
};

const displayEndgame = (winner) => {
  let finalMessage = "";
  if (winner) finalMessage = `${winner} WINS!!!`;
  else finalMessage = "IT'S A TIE!!!";

  let boardItems =  document.getElementsByClassName("ttt_box")
 
  for( let i = 0 ; i< boardItems.length; i++){
    boardItems.item(i).classList.add("noHover");
    boardItems.item(i).removeAttribute("onclick");
  }

  console.log(finalMessage);
  let popup = document.createElement("div");
  popup.setAttribute("id", "gameOverPopupContainer");
  popup.setAttribute("onClick","reloadPage()")
  popup.innerHTML = `<div id="gameOverPopup">
    <h1 id="gameOverPopupTitle">Game over!</h1>
    <h3>The winner is ${finalMessage}</h3>
    <button onclick="reloadPage()">Sart new Game!</button>
</div>`;
  document.body.appendChild(popup);
};

const reloadPage = ()=>{
    window.location.reload()
}
/*Test data

let board = [["X","X","X"],[null, "O", "O"],["X","O","O"]];

let board = [["X","O","X"],["X", "O", "O"],["X",null,"O"]];

let board = [["X","O","X"],[null, "X", "O"],["O","O","X"]];

let board = [["O","O","X"],[null, "X", "O"],["X","O","O"]];

let settings = {player1:"Carlos",player2:"roberto",tableSize:3};
*/
