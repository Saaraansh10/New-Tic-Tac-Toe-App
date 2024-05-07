const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
//initials
let currentPlayer;
let gameGrid;
//winning positions yesb hoskti hai
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//let's create a function to initialise the game
//initialise krega boxes ko khaali krdega, current player x ko bnadega,new game ke button ko remove krdega,css properties restore krdega
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega saare boxes ko
    boxes.forEach((box, index) => {
        //empty krre saare boxes ko
        box.innerText = "";
        //pointer events ko vapis layenge
        boxes[index].style.pointerEvents = "all";
        //initialising box with css properties again (win color htare)
        box.classList = `box box${index+1}`;
    });
    //active class htadenge new game wale button se taaki vo invisible hojayenge
    newGameBtn.classList.remove("active");
    //current player kon hai vobhi btayenge
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
//khulte sath hi init function call krk initialise krdenge game ko
initGame();
//turn chnge krenge , x hoga to o krenge ,o hoga to x krenge,current player ke aage jo bhi hoga usko bhi update krdenge
function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update ki current player kon hai
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
//gameover to ni hogya vo check krenge
function checkGameOver() {
    let answer = "";
    //hr winning positions pe iterate krre hai ek ek krk ki tino me x ya 0 to ni hai
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                //agr winner X hai
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                //pointer events bnd krre jb winner miljaye
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })
                //winner x ya o hai to pta chl gya hai to color chnge krenge
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
    //koi winner agya hai
    if(answer !== "" ) {
        //winner player ko update krre
        gameInfo.innerText = `Winner Player - ${answer}`;
        //new game wale button ko active krre
        newGameBtn.classList.add("active");
        return;
    }
    //winner ni milra to tie wala check krenge
    let fillCount = 0;
    //box empty na ho to cnt bdha denge
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });
    //agr pura board bhr gya mtlb game tie hogya
    if(fillCount === 9) {
        //game tied display krenge
        gameInfo.innerText = "Game Tied !";
        //new game button ko active krdenge
        newGameBtn.classList.add("active");
    }
}
//box pe click krne pe kya hoga
function handleClick(index) {
    //box empty hona chaiye
    if(gameGrid[index] === "" ) {
        //box ke andr current player ko daalna
        boxes[index].innerText = currentPlayer; //ye UI me chnge krega
        gameGrid[index] = currentPlayer; //ye inner logic me chnge krra hai
        boxes[index].style.pointerEvents = "none"; //jisme fill hojayega x ya o uspe cursor pointer htadenge 
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}
//hr ek box pe event listener lgare taaki click hoga to kya hoga usko handle krske
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        //index btayega taaki pta chle ki konse box pe click hua hai
        handleClick(index);
    })
});
//new game button dbane se init game ko initialise krdo
newGameBtn.addEventListener("click", initGame);



