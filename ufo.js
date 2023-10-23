class Ufo{
    constructor(screen){
        this.screen = screen;
        this.left = Math.floor(Math.random() * (this.screen.offsetWidth - 100))
        this.top = 0;
        this.width = 100;
        this.height = 150;

        this.element = document.createElement("div");
        this.classList.add("ufo-style");

        this.element.style.width = this.width + "px";
        this.element.style.height = this.height +"px";
        this.element.style.left = this.left+ "px";
        this.element.style.top = this.top + "px";
    }
}