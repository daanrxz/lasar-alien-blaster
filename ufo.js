class Ufo{
    constructor(screen){
        this.screen = screen;
        this.left = Math.floor(Math.random() * (this.screen.offsetWidth - 200))
        this.top =  Math.floor(Math.random() * 80)
        this.width = 100;
        this.height = 150;
        this.startDirection = Math.floor(Math.random() * 2);
        this.element = document.createElement("div");
        this.element.classList.add("ufo-style");

        this.element.style.left = this.left+ "px";
        this.element.style.top = this.top +"px";

        this.screen.appendChild(this.element);
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
    }

}