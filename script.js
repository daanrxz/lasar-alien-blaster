const mainContainer = document.getElementById("main-container");
let currentLevel = 1;
window.onload = ()=>{
    mainMenu()
}

function mainMenu(){
    mainContainer.innerHTML = "";
    const startMenu = createToDom("div", ["id", "start-menu"], mainContainer);
    const logoContainer = createToDom("div", ["id", "logo-container"], startMenu);
    const alienTitle = createToDom("img", ["class", "alien-title"], logoContainer, "/images/alien-title.png")
    const blasterTitle = createToDom("img", ["class", "blaster-title"], logoContainer, "/images/blaster-title.png")
    const logoTitle = createToDom("img", ["class", "logo-title"], logoContainer, "/images/logo-title.png")
    const btnsContainer = createToDom("div", ["id", "buttons-container"], startMenu)
    const startBtn = createToDom("div", ["class", "menu-btn"], startMenu, false, "Start Game")
    startBtn.addEventListener("click", ()=>{
        startGame(currentLevel)
    })
}
function gameIsOver(){
    mainContainer.innerHTML = "";
    const gameOverDiv= createToDom("div", ["id", "game-over-div"], mainContainer);
    const title = createToDom("div", ["id", "game-over-title"], gameOverDiv, false, "Game Over");
    const retryBtn = createToDom("div", ["class", "menu-btn"], gameOverDiv, false, "Retry")
    const menuBtn = createToDom("div", ["class", "menu-btn"], gameOverDiv, false, "Back To Main")
    retryBtn.addEventListener("click", ()=>{
        startGame(currentLevel)
    })
    menuBtn.addEventListener("click", mainMenu)
}

function startGame(level) {
    mainContainer.innerHTML="";
    const game = new Game(currentLevel);
    game.start();
    // Object to track the current state of keys
    const keysPressed = {
        "ArrowLeft": false,
        "ArrowRight": false,
        "Space": false
    };
    // Additional variable to keep track of the last directional key pressed
    let lastDirectionalKeyPressed = null;
    let shootingInterval = null;
    function startShooting() {
        if (shootingInterval === null) {
            shootingInterval = setInterval(() => {
                game.player.shoot();
            }, 100);
        }
    }
    function stopShooting() {
        if (shootingInterval) {
            clearInterval(shootingInterval);
            shootingInterval = null;
        }
    }
    function keydownFunc(e) {
        if (e.code in keysPressed) {
            // Prevent multiple firing of keydown event while holding the key
            if (!keysPressed[e.code]) {
                keysPressed[e.code] = true;
                if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
                    // Update the last directional key pressed
                    lastDirectionalKeyPressed = e.code;
                }
            }
            e.preventDefault();
        }
        // Handle player actions based on the most recent directional key pressed
        if (game) {
            if (keysPressed["ArrowLeft"] && lastDirectionalKeyPressed === "ArrowLeft") {
                game.player.directionX = -3;
            } else if (keysPressed["ArrowRight"] && lastDirectionalKeyPressed === "ArrowRight") {
                game.player.directionX = 3;
            }
        }
        if (keysPressed["Space"]) {
            startShooting();
        }
    }
    function keyupFunc(e) {
        if (e.code in keysPressed) {
            keysPressed[e.code] = false;
            e.preventDefault();
        }
        // Stop the player's movement if the released key was the last directional key pressed
        if (game) {
            if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
                if (e.code === lastDirectionalKeyPressed) {
                    game.player.directionX = 0;
                    // If one arrow key is lifted, and the other is still pressed, move in that direction
                    if (e.code === "ArrowLeft" && keysPressed["ArrowRight"]) {
                        lastDirectionalKeyPressed = "ArrowRight";
                        game.player.directionX = 3;
                    } else if (e.code === "ArrowRight" && keysPressed["ArrowLeft"]) {
                        lastDirectionalKeyPressed = "ArrowLeft";
                        game.player.directionX = -3;
                    }
                }
            }
        }
        if (e.code === "Space") {
            stopShooting();
        }
    }
    window.addEventListener("keydown", keydownFunc);
    window.addEventListener("keyup", keyupFunc);
}