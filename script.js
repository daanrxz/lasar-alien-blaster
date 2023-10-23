window.onload = ()=>{
    //put startGame() in the button after
    startGame();
}

function startGame() {
    const game = new Game();
    game.start();
    // Object to track the current state of keys
    const keysPressed = {
        "ArrowLeft": false,
        "ArrowRight": false,
        "Space": false
    };
    let shootingInterval = null; //
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
            keysPressed[e.code] = true;
            e.preventDefault(); 
        }

        if (game) {
            if (keysPressed["ArrowLeft"]) {
                game.player.directionX = -3; 
            }
            if (keysPressed["ArrowRight"]) {
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

        if (game) {
            if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
                game.player.directionX = 0; 
            }
        }

        if (e.code === "Space") {
            stopShooting();
        }
    }

    window.addEventListener("keydown", keydownFunc);
    window.addEventListener("keyup", keyupFunc);
}
