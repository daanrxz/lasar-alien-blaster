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
        this.shootDiv = document.createElement("div");
        
        this.element.id = "main-character";
        this.screen.appendChild(this.element)
        this.element.appendChild(this.shootDiv);
        this.bullets = [];
        this.element.elementObj = this;
        this.shootDiv.classList.add("shooting-div");


        //player healthbar
        this.health = 100;
        this.playerHealth = document.createElement("div");
        this.playerHealth.classList.add("player-health-style")
        this.playerHealth.innerText = this.health;
        this.element.appendChild(this.playerHealth);
        
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
        const bullet = new Bullet(this.shootDiv);
        bullet.bulletMovement();

    }  
    updateHealth(){
        this.playerHealth.innerText = this.health;
        if(this.health<0){
            this.gameOver();
        }
    }
    gameOver(){
        this.element.remove()
        console.log("gameover");
    }



}

class Bullet{
    constructor(shootDiv){
        //bullet creation
        this.bullet = document.createElement("div");
        this.bullet.classList.add("bullet");
        const shootDivPos= shootDiv.getBoundingClientRect();
        const shootDivStyleTop = shootDivPos.top
        const shootDivStyleLeft = shootDivPos.left
        this.bullet.style.top = shootDivStyleTop + 1 +"px";
        this.bullet.style.left = shootDivStyleLeft + + 1.5 + "px";
        const bulletStyle = getComputedStyle(this.bullet);
        this.bulletTop = parseInt(bulletStyle.top);
        shootDiv.appendChild(this.bullet)
    }
    bulletMovement(){
        const allUfos = document.querySelectorAll(".ufo-style");

        //interval for the bullet movement to the top of the screen
        setInterval(()=>{
            this.bullet.style.top = this.bulletTop - 10 + "px";
            this.bulletTop = parseInt(getComputedStyle(this.bullet).top);
    
        }, 8)
        //timeout that deletes that bullets that left the screen
        const bulletTimeout = setTimeout(()=>{
            this.bullet.remove()
            clearInterval(bulletDetect)
        }, 540)

        const bulletDetect = setInterval(()=>{
            allUfos.forEach(ufo=>{
                const bulletRect = this.bullet.getBoundingClientRect();
                const ufoRect = ufo.getBoundingClientRect();
                if(
                    bulletRect.left < ufoRect.right &&
                    bulletRect.right > ufoRect.left &&
                    bulletRect.top < ufoRect.bottom &&
                    bulletRect.bottom > ufoRect.top
                )
                {
                    //this controls the damage
                    ufo.elementObj.health -=5;
                    //this updates the health
                    ufo.elementObj.updateHealth();
                    //this removes the bullet if it hits the ufo
                    this.bullet.remove()
                }

            })
        }, 5)

    }

}