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

/*
function startGame(){
    const keysPressed = {
        "ArrowLeft": false,
        "ArrowRight": false,
        "Space": false
    }
    const game = new Game();
    game.start()

    function keydownFunc(e){
        const key = e.code;
        const keys = [ "ArrowLeft", "ArrowRight"];
        if(keys.includes(key)){
            e.preventDefault();
        }
        if(game){
            switch(key){
                case "ArrowLeft":
                    keysPressed["ArrowLeft"] = true;
                    game.player.directionX = -3;
                    break;
                case "ArrowRight":
                    keysPressed["ArrowRight"] = true;
                    game.player.directionX = 3;
                    break;
            }

            if(keysPressed["ArrowLeft"] === true && keysPressed["Space"] === true){
                game.player.shoot()
            }
            if(keysPressed["ArrowRight"] === true && keysPressed["Space"] === true){
                game.player.shoot()
            }
        }
    }
    function keyupFunc(e){
        const key = e.code;
        const keys = [ "ArrowLeft", "ArrowRight"];
        if(keys.includes(key)){
            e.preventDefault();
        }
        if(game){
            switch(key){
                case "ArrowLeft":
                    keysPressed["ArrowLeft"] = false;
                    game.player.directionX = 0;
                    break;
                case "ArrowRight":
                    keysPressed["ArrowRight"] = false;
                    game.player.directionX = 0;
            }
            if(e.code==="Space"){
                keysPressed["Space"] = false;
           }
        }
    }


    window.addEventListener("keydown", keydownFunc)
    window.addEventListener("keyup", keyupFunc)
    window.addEventListener("keydown", shootFunc )

}

*/