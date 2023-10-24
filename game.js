class Game{
    constructor(level){
        this.screen = document.getElementById("main-container");
        this.player = new Player(this.screen, 400, 140, 140)
        this.height = 700;
        this.width = 800;
        this.lives = 5;
        this.gameIsOver = false;
        this.loadingObstacle = false;
        this.level = level;
        this.ufosLeft = this.level;
        this.ufos = [];

        //levels left
        const ufosLeftDiv = createToDom("div", ["id", "levels-left-div"], this.screen, false, false)
        const currentLevel = createToDom("h2", false, ufosLeftDiv, false, "Level "+ this.level)
        createToDom("p", false, ufosLeftDiv, false, "UFOs left:")
        this.ufosLeftElement = createToDom("div", false, ufosLeftDiv, false, this.ufosLeft)
    }
    start(){
        this.gameLoop();
        this.ufoInterval()
    }
    ufoCreation(){
        this.ufos.push(new Ufo(this.screen, this));
    }
    ufoInterval(){
        //this will be the logic to add more ufos depending on level 

        for(let i=1;i<=this.level;i++){
            let randomInterval = Math.floor(Math.random() * ((7-3)+1) +3)*1000;
            const self = this;
            timeoutFunc(randomInterval + (i*1000), self)

        }
        function timeoutFunc(interval, self){
            setTimeout(()=>{
                self.ufoCreation()
            }, interval)
        }

    }
    removeUfo(ufo){
        this.ufosLeft--;
        this.ufosLeftElement.innerText = this.ufosLeft;
        if(this.ufosLeft===0){
            this.youWin();
        }
    }
    youWin(){
        this.screen.innerHTML = "";
        const youWinDiv = createToDom("div", ["id", "you-win-div"], this.screen);
        const title = createToDom("div", ["id", "you-win-title"], youWinDiv, false, "YOU WIN!");
        const nextLevelBtn = createToDom("div", ["class", "menu-btn"], youWinDiv, false, "Next Level")
        const menuBtn = createToDom("div", ["class", "menu-btn"], youWinDiv, false, "Back To Main")
        menuBtn.addEventListener("click", mainMenu)
        nextLevelBtn.addEventListener("click", ()=>{
            currentLevel++;
            startGame(currentLevel);
        })
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