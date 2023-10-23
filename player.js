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

        //place where the bullets come out of
        this.shootDiv.classList.add("shooting-div");
    }
    move(){
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

    shoot(){
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        const shootDivPos= this.shootDiv.getBoundingClientRect();
        const shootDivStyleTop = shootDivPos.top
        const shootDivStyleLeft = shootDivPos.left
        bullet.style.top = shootDivStyleTop + 1 +"px";
        bullet.style.left = shootDivStyleLeft + + 1.5 + "px";

        const bulletStyle = getComputedStyle(bullet);
        let bulletTop = parseInt(bulletStyle.top);
        this.shootDiv.appendChild(bullet)

        setInterval(()=>{
            bullet.style.top = bulletTop - 10 + "px";
            bulletTop = parseInt(getComputedStyle(bullet).top);
        }, 8)




        setTimeout(()=>{
            bullet.remove()
        }, 650)

    
    }
}
