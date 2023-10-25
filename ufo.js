class Ufo{
    constructor(screen, game, imgSrc){
        this.game = game
        this.screen = screen;
        this.left = Math.floor(Math.random() * (this.screen.offsetWidth - 200))
        this.top =  Math.floor(Math.random() * (100 - 10) + 10)
        this.width = 100;
        this.height = 150;
        this.startDirection = Math.floor(Math.random() * 2);
        this.shooting = false;
        this.laser = null;
        //element creation
        this.element = createToDom("div", ["class", "ufo-style"])
        const ufoImg = createToDom("img", ["id", "ufo-img"],this.element, imgSrc)


        this.element.style.left = this.left+ "px";
        this.element.style.top = this.top +"px";
        this.element.elementObj = this;
        this.screen.appendChild(this.element);

        this.ufoLaserGun = createToDom("div", ["class", "ufo-laser-gun"], this.element)

        //health bar
        this.health = 100;
        const healthbar = this.createHealthBar();
        this.healthElement = healthbar[1];
        this.element.appendChild(healthbar[0])
        this.ufoShoot()

    }
    createHealthBar(){
        const main = createToDom("div", ["class", "ufo-health-bar"], false);
        const inner = createToDom("div", false, main);
        return [main, inner]
    }
    movement(){
        const leftPos = parseInt(getComputedStyle(this.element).left)

       if(this.startDirection === 0){
            this.left += 3;
            this.updatePosition();

       }
       else{
            this.left -= 3;
            this.updatePosition();
       }
       if(leftPos<0){
        this.startDirection = 0;
       }
       else if(leftPos > 700 - this.width){
        this.startDirection = 1;
       }


    }
    updatePosition(){
        this.element.style.left = this.left + "px";
        if(this.laser!==null){
            this.laserCollision()
        }
    }
    updateHealth(){
        this.healthElement.style.width = this.health + "%";
        const reversePercentage = (100-Math.abs(this.health))/100
        const newHSL = (1 - reversePercentage)*120;
        this.healthElement.style.backgroundColor = `hsl(${newHSL}, 100%, 50%)`
        if(this.health<1){
            this.element.remove()
           this.game.removeUfo(this.element);
        }
    }
    ufoShoot(){
        const randomInterval = Math.floor(Math.random() * ((10-2)+2))*1000;
        setInterval(()=>{
            if(this.shooting === false){
                this.shooting = true;
                this.shootLaser()
            }
        }, randomInterval)
    }
    shootLaser(){
        if(stateGame){
            laserSound.play()
        }
        const laser = document.createElement("div");
        this.laser = laser;
        this.ufoLaserGun.appendChild(laser);
        laser.classList.add("ufo-laser")
        setTimeout(()=>{
            this.shooting = false;
            laser.remove()
        }, 1000)
    }
    laserCollision(){

        const player = document.getElementById("main-character");
        if(player === null){
            return
        }
        const laserLeft = this.laser.getBoundingClientRect().left;
        const playerRect = player.getBoundingClientRect();
        const playerLeft = playerRect.left;
        const playerRight = playerRect.right
        const playerObj = player.elementObj;

        if((laserLeft> playerLeft && laserLeft < playerRight)){
            playerObj.health -=0.5;
            playerObj.updateHealth();
            player.classList.add("player-taking-damage");
            setTimeout(()=>{player.classList.remove("player-taking-damage")}, 600)
        }

       
    }
}