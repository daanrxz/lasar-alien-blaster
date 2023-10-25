class Player{
    constructor(screen, left, width, height, game){
        this.game = game
        //player dimensions
        this.screen = screen;
        this.left = left;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        //player element
        const tank = this.createTank();
        this.element = tank[0];
        this.shootDiv = tank[1];
        
        this.element.id = "main-character";
        this.screen.appendChild(this.element)
        this.bullets = [];
        this.element.elementObj = this;
        this.shootDiv.classList.add("shooting-div");


        //player healthbar
        this.health = 100;
        this.playerHealth = document.createElement("div");
      
        const healthbar = this.createHealthBar();
        this.element.appendChild(healthbar[0])
        this.healthElement = healthbar[1]


    }
    createHealthBar(){
        const main = createToDom("div", ["class", "player-health-bar"], false);
        const inner = createToDom("div", false, main);
        return [main, inner]
    }
    createTank(){
        const main = createToDom("div", ["class", "main-part"], false);

        const gunDiv = createToDom("div", ["class", "gun-div"], main);
        const blasterGun= createToDom("div", ["class", "blaster-gun"], gunDiv);
        const upperGun = createToDom("div", ["class", "upper-gun"], gunDiv);
        const gunBase = createToDom("div", ["class", "gun-base"], gunDiv);

        const upperDiv = createToDom("div", ["class", "upper-div"], main);
        const innerUpperDiv = createToDom("div", ["class", "inner-upper-div"], upperDiv);

        const lowerDiv = createToDom("div", ["class", "lower-div"], main);
        for(let i=0;i<4;i++){
            const wheel = createToDom("div", ["class", "wheel"], lowerDiv);
            const line1 = createToDom("div", ["class", "line-1"], wheel);
            const line2 = createToDom("div", ["class", "line-2"], wheel);
            const innerWheel = createToDom("div", ["class", "inner-wheel"], wheel)
        }
        return [main, gunDiv];
    }
    move(){
        this.left += this.directionX;

        if(this.left + this.width >= this.screen.offsetWidth){
            this.left = this.screen.offsetWidth - this.width
        }
        else if(this.left <= 0){
            this.left = 0
        }
        this.updatePosition();

    }
    updatePosition(){
        this.element.style.left = this.left + "px";

    }

    shoot(){
        const bullet = new Bullet(this.shootDiv, this.screen);
        bullet.bulletMovement();

    }  
    updateHealth(){
        this.playerHealth.innerText = this.health;
        this.healthElement.style.width = this.health + "%";
        const reversePercentage = (100-Math.abs(this.health))/100
        const newHSL = (1 - reversePercentage)*120;
        this.healthElement.style.backgroundColor = `hsl(${newHSL}, 100%, 50%)`
        if(this.health<1){
            this.gameOver();
        }
    }
    gameOver(){
        this.element.remove()
        gameIsOver();
        this.game.gameIsOver = true;
        stateGame = false;
        laserSound.pause()
    }



}

class Bullet{
    constructor(shootDiv, screen){
        //bullet creation
        this.bullet = document.createElement("div");
        this.bullet.classList.add("bullet");
        const shootDivPos= shootDiv.getBoundingClientRect();
        const shootDivStyleTop = shootDivPos.top
        const shootDivStyleLeft = shootDivPos.left
        this.bullet.style.top = shootDivStyleTop - 15 +"px";
        this.bullet.style.left = shootDivStyleLeft + 18.5 + "px";
        const bulletStyle = getComputedStyle(this.bullet);
        this.bulletTop = parseInt(bulletStyle.top);
        shootDiv.appendChild(this.bullet)
        this.screen = screen;
    }
    bulletMovement(){
        const allUfos = document.querySelectorAll(".ufo-style");
        //interval for the bullet movement to the top of the screen
        const bulletMove = setInterval(()=>{
            this.bullet.style.top = this.bulletTop - 10 + "px";
            this.bulletTop = parseInt(getComputedStyle(this.bullet).top);
    
        }, 8)
        
        const bulletDetect = setInterval(()=>{
            const bulletRect = this.bullet.getBoundingClientRect();
            const screenRect = this.screen.getBoundingClientRect();
            if(bulletRect.top < screenRect.top ){
                this.bullet.remove()
                clearInterval(bulletDetect)
                clearInterval(bulletMove)
            }
            allUfos.forEach(ufo=>{
                const ufoRect = ufo.getBoundingClientRect();
                if(
                    bulletRect.left < ufoRect.right &&
                    bulletRect.right > ufoRect.left &&
                    bulletRect.top < ufoRect.bottom &&
                    bulletRect.bottom > ufoRect.top
                )
                {   
                    ufo.classList.add("ufo-taking-damage")
                    setTimeout(()=>{
                        ufo.classList.remove("ufo-taking-damage")
                    }, 500)
                    //this controls the damage
                    ufo.elementObj.health -=5;
                    //this updates the health
                    ufo.elementObj.updateHealth();
                    //this removes the bullet if it hits the ufo
                    this.bullet.remove()
                    clearInterval(bulletDetect)
                    clearInterval(bulletMove)
                }
            })
        }, 5)

    }

}