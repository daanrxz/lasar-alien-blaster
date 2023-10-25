class Game{
    constructor(level){
        this.screen = document.getElementById("main-container");
        this.player = new Player(this.screen, 400, 140, 140, this)
        this.height = 700;
        this.width = 800;
        this.lives = 5;
        this.gameIsOver = false;
        this.loadingObstacle = false;
        this.level = level;
        this.ufosLeft = this.level;
        this.ufos = [];
        this.healthPowerup = createToDom("img", ["class", "powerup", "health-powerup"], false, "images/health-power.png")
        this.speedPowerup = createToDom("img", ["class", "powerup", "speed-powerup"], false, "images/speed-power.png")
        //levels left
        const ufosLeftDiv = createToDom("div", ["id", "levels-left-div"], this.screen, false, false)
        const currentLevel = createToDom("h2", false, ufosLeftDiv, false, "Level "+ this.level)
        createToDom("p", false, ufosLeftDiv, false, "UFOs left:")
        this.ufosLeftElement = createToDom("div", false, ufosLeftDiv, false, this.ufosLeft)
    }
    powerupTimeout(){
        const randomInterval = Math.floor(Math.random() * ((30000-8000)-8000))
        const powerUpArr = [this.healthPowerup, this.speedPowerup]
        const powerUpInterval = setTimeout(()=>{
            if(this.gameIsOver){
                clearTimeout(powerUpInterval)
                return;
            }
            else{
                if(document.querySelector(".powerup")===null){
                    const random = Math.floor(Math.random() * ((powerUpArr.length)));
                    this.screen.appendChild(powerUpArr[random]);
                    powerUpArr[random].style.left = Math.floor(Math.random() * ((750+50)-50)) + "px"
                    this.powerupTimeout()
                }
            }
        }, randomInterval)
    }
    powerupCollision(){
        if(document.querySelector(".powerup")!==null){
            const powerRect = document.querySelector(".powerup").getBoundingClientRect();
            const playerRect = document.getElementById("main-character").getBoundingClientRect();
           if(playerRect.right >= powerRect.left && playerRect.left <= powerRect.left ||
                powerRect.right >= playerRect.left && powerRect.left <= playerRect.left
            ){
                const typeOfPower = document.querySelector(".powerup").classList[1].split("-")[0];
                this.powerActivate(typeOfPower);
                document.querySelector(".powerup").remove()
           }
        }
    }
    powerActivate(powerType){
        switch(powerType){
            case "speed":
                const player= document.getElementById("main-character");
                const wheels = player.querySelectorAll(".wheel");
                wheels.forEach(wheel=>{
                    wheel.classList.add("speed-wheel")
                })
                playerSpeed = 7;
                setTimeout(()=>{
                    playerSpeed = 4;
                    wheels.forEach(wheel=>{
                        wheel.classList.remove("speed-wheel")
                    })
                }, 5000);
            break;
            case "health":
                this.player.health+=50;
                if(this.player.health > 100){
                    this.player.health = 100;
                }
                this.player.updateHealth()
        }
    }
    start(){
        stateGame = true;
        this.gameLoop();
        this.ufoInterval()
        this.powerupTimeout();
    }
    ufoCreation(){
        this.ufos.push(new Ufo(this.screen, this, "images/ufo-img.png" ));
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
    removeUfo(){
        this.ufosLeft--;
        this.ufosLeftElement.innerText = this.ufosLeft;
        if(this.ufosLeft===0){
            this.youWin();
        }
    }
    youWin(){
        this.gameIsOver = true;
        laserSound.pause()
        stateGame = false;
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
        this.powerupCollision()
    }
    update(){
        this.player.move()
        for(let i=0;i<this.ufos.length;i++){
            const ufo = this.ufos[i];
            ufo.movement()
        }
    }

}