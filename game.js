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