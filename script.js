window.onload = ()=>{
    //put startGame() in the button after
    startGame();
}




function startGame(){
    const keysPressed = {
        "ArrowLeft": false,
        "ArrowRight": false,
        "Space": false
    }
    const game = new Game();
    game.start()

    function keydownFunc(e){
        console.log(keysPressed);

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
               console.log("test");
            }

        }
    }
    function keyupFunc(e){
        const key = e.key;
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
        }
    }

    function playerShoot(e){

       if(e.code==="Space"){
            keysPressed["Space"] =true;
            game.player.shoot()
       }
    }
    function playerStopShoot(e){
        if(e.code==="Space"){
            keysPressed["Space"] = false;
       }
    }
    window.addEventListener("keydown", keydownFunc)
    window.addEventListener("keyup", keyupFunc)
    window.addEventListener("keydown", playerShoot);
    window.addEventListener("keyup", playerStopShoot);


}

