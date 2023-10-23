class Ufo{
    constructor(screen){
        this.screen = screen;
        this.left = Math.floor(Math.random() * (this.screen.offsetWidth - 200))
        this.top =  Math.floor(Math.random() * 80)
        this.width = 100;
        this.height = 150;
        this.startDirection = Math.floor(Math.random() * 2);
        this.shooting = false;
        this.laser = null;
        //element creation
        this.element = document.createElement("div");
        this.element.classList.add("ufo-style");

        this.element.style.left = this.left+ "px";
        this.element.style.top = this.top +"px";
        this.element.elementObj = this;
        this.screen.appendChild(this.element);

        this.ufoLaserGun = document.createElement("div");
        this.ufoLaserGun.classList.add("ufo-laser-gun")
        this.element.appendChild(this.ufoLaserGun);
        

        //health bar
        this.health = 100;
        this.healthBar = document.createElement("div");
        this.healthBar.classList.add("healthbar-style")
        this.element.appendChild(this.healthBar);
        this.healthBar.innerText = this.health;

        this.ufoShoot()

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
        this.healthBar.innerText = this.health;
        if(this.health<1){
            
            this.element.remove()
        }
    }
    ufoShoot(){
        const randomInterval = Math.floor(Math.random() * 10)*1000;
        setInterval(()=>{
            if(this.shooting === false){
                this.shooting = true;
                this.shootLaser()
            }
        }, randomInterval)
    }
    shootLaser(){
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

        if((laserLeft> playerLeft && laserLeft < playerRight)){
            const playerObj = player.elementObj;
            playerObj.health -=1;
            playerObj.updateHealth();
        }
   
    }
}