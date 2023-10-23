

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
    window.addEventListener("keydown", keydownFunc)
    window.addEventListener("keyup", keyupFunc)
}




class Player{
    constructor(screen, left, width, height, imgSrc){
        //player dimensions
        this.screen = screen;
        this.left = left;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        //player element
        this.element = document.createElement("div");
        this.element.id = "main-character";
        this.screen.appendChild(this.element)
    }
    move(){
        console.log("tedst");

        //update the tank's position depending on the direction
        this.left += this.directionX;
        //right and left
        if(this.left + this.width >= this.screen.offsetWidth){
            this.left = this.screen.offsetWidth - this.width
        }
        else if(this.left <= 0){
            this.left = 0;
        }
        this.updatePosition();

    }
    updatePosition(){
        this.element.style.left = this.left + "px";

    }
}

class Game{
    constructor(){
        this.screen = document.getElementById("main-container");
        this.player = new Player(this.screen, 400, 70, 30)
        this.height = 700;
        this.width = 800;
        this.obstacles = [];
        this.lives = 5;
        this.gameIsOver = false;
        this.loadingObstacle = false;

    }
    start(){

        this.gameLoop();
    }
    gameLoop(){
        if(this.gameIsOver){ return }
        this.update();
        
        window.requestAnimationFrame(()=>{
            this.gameLoop()
            }
        ) 
    }
    update(){
        this.player.move()
    }

}