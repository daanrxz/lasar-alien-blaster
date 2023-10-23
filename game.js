class Game{
    constructor(){
        this.screen = document.getElementById("main-container");
        this.player = new Player(this.screen, 400, 70, 30)
        this.height = 700;
        this.width = 800;
        this.lives = 5;
        this.gameIsOver = false;
        this.loadingObstacle = false;
        this.level = 1;
        this.ufos = [new Ufo(this.screen)];

    }
    start(){
        //this will be the logic to add more ufos depending on level 
        const createUfo = setInterval(()=>{
            if(this.ufos.length>0){
                clearInterval(createUfo)
            }
            const ufo = new Ufo(this.screen)
            this.ufos.push(ufo)

        }, 7000)

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

        for(let i=0;i<this.ufos.length;i++){
            const ufo = this.ufos[i];
            ufo.movement()
        }
    }

}