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


        this.shootDiv.classList.add("shooting-div");
    }
    move(){
        this.left += this.directionX;

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

        //bullet creation
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
        //interval for the bullet movement to the top of the screen
        setInterval(()=>{
            bullet.style.top = bulletTop - 10 + "px";
            bulletTop = parseInt(getComputedStyle(bullet).top);
        }, 8)
        //timeout that deletes that bullets that left the screen
        setTimeout(()=>{
            bullet.remove()
        }, 540)

        //bullet collision

    }


}


class Bullet{
    constructor(){
        
    }
}