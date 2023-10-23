window.onload = ()=>{
    //put startGame() in the button after
    startGame();
}

function startGame(){
    const game = new Game();
    game.start()

    function keydownFunc(e){
        const key = e.key;
        const keys = [ "ArrowLeft", "ArrowRight"];
        if(keys.includes(key)){
            e.preventDefault();
        }
        if(game){
            switch(key){
                case "ArrowLeft":
                    game.player.directionX = -3;
                    break;
                case "ArrowRight":
                    game.player.directionX = 3;
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
                    game.player.directionX = 0;
                    break;
                case "ArrowRight":
                    game.player.directionX = 0;
            }
        }
    }

    function playerShoot(e){

       if(e.code==="Space"){
            game.player.shoot()
            
       }
    }
    function playerStopShoot(){
        
    }
    window.addEventListener("keydown", keydownFunc)
    window.addEventListener("keyup", keyupFunc)
    window.addEventListener("keydown", playerShoot);
    window.addEventListener("keyup", playerStopShoot);


}


