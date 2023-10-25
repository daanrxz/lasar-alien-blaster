const mainContainer = document.getElementById("main-container");
const gunSound = new Audio("sounds/gun-sound.mp3")
const laserSound = new Audio("sounds/laser-sound.mp3")
const song = new Audio("sounds/venice.mp3")
//Game state
let stateGame = false;
let currentLevel = 1;
let playerSpeed = 4;
let soundEffects = true;
let music = false;


window.onload = ()=>{
    mainMenu()
    soundOptions()

}
function soundOptions(){
    const container = createToDom("div", ["id", "sound-container"], mainContainer)
    const soundContainer = createToDom("div", ["class", "icon-container"], container)
    const soundIcon = createToDom("img", ["class", "icon", "sound-icon"], soundContainer, "images/sound-icon.png" )
    const crossSound = createToDom("div", ["class", "disabled-sound"], soundContainer, false, "X")
    crossSound.style.display= soundEffects ? "none" : "block"
    const musicContainer = createToDom("div", ["class", "icon-container"], container)
    const musicIcon = createToDom("img", ["class", "icon", "music-icon"], musicContainer,"images/music-icon.png" )
    const crossMusic = createToDom("div", ["class", "disabled-sound"], musicContainer, false, "X")
    crossMusic.style.display= music ? "none" : "block"
    
    soundContainer.addEventListener("click", soundToggle);
    musicContainer.addEventListener("click", musicToggle);
    function soundToggle(){
        if(!soundEffects){
            soundEffects=true;
            crossSound.style.display = "none"
        }
        else{
            soundEffects=false;
            crossSound.style.display = "block"
            laserSound.pause()
        }
    }
    function musicToggle(){
        if(music){
            music=false;
            crossMusic.style.display = "block"
            song.pause()

            console.log("test");
        }
        else{
            song.pause()
            music=true;
            crossMusic.style.display = "none"
            song.play()

        }
    }

}


function mainMenu(){
    mainContainer.innerHTML = "";
    soundOptions()
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
    soundOptions()
    const game = new Game(level);
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
                game.player.directionX = playerSpeed * -1;
            } else if (keysPressed["ArrowRight"] && lastDirectionalKeyPressed === "ArrowRight") {
                game.player.directionX = playerSpeed;
            }
        }
        if (keysPressed["Space"]) {
            startShooting();
            if(stateGame && soundEffects){
                gunSound.play()

            }
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
                        game.player.directionX = playerSpeed;
                    } else if (e.code === "ArrowRight" && keysPressed["ArrowLeft"]) {
                        lastDirectionalKeyPressed = "ArrowLeft";
                        game.player.directionX = playerSpeed * -1;
                    }
                }
            }
        }
        if (e.code === "Space") {
            stopShooting();
            
            gunSound.pause()
        }
    }
    window.addEventListener("keydown", keydownFunc);
    window.addEventListener("keyup", keyupFunc);
}