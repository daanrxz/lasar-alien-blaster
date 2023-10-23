const player = document.getElementById("main-character");
const gameContainer = document.getElementById("main-container")



window.addEventListener("keydown", moveCharacter);

class Player{
    constructor(screen, left, width, height, imgSrc){
        //player dimensions
        this.screen = screen;
        this.left = left;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        //player element
        this.element = player;
    }
    move(){
        //update the tank's position depending on the direction
        this.left += this.directionX;
        
    }
}

function moveCharacter(e){
    switch(e.key){
        case "ArrowLeft":
            move(-1, 1)
            break;
        case "ArrowRight":
            move(1, 1)
            break;
    }

}

function move(direction, speed){
        const containerStyle = getComputedStyle(gameContainer);
        const containerWidth = parseInt(containerStyle.width);
        const playerStyle = getComputedStyle(player);
        const playerLeft = parseInt(playerStyle.left)
        const playerWidth = parseInt(playerStyle.width);

        

        if(direction > 0){
            player.style.left = playerLeft + speed + "px"
        }

        if(direction < 0){
            player.style.left = playerLeft - speed + "px"
        }
        if(playerLeft + playerWidth > containerWidth){
            player.style.left = (containerWidth - playerWidth) + "px";
        }
        else if(playerLeft < 0 ){
            player.style.left = 0 +"px";
        }
}