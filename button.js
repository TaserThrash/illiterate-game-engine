

class Button {
    constructor(){
        this.index = buttons.length;
        this.image = createGraphics(16, 16);
        this.w = 0.05;
        this.h = 0.05;
        this.x = 0.5;
        this.y = 0.5;
    }

    show(){
        screen.imageMode(CENTER);
        if(state == "editWorld"){
            screen.image(this.image, this.x * width, this.y * height, this.w * width, this.h * height);
        }
        if(state == "play"){
            screen.image(this.image, this.x * width, this.y * height, this.w * width, this.h * height);
        }
    }
    
    check(){
        let dx = this.x - mouseX / width;
        let dy = this.y - mouseY / height;

        if(abs(dx) <= this.w / 2 && abs(dy) <= this.h / 2 && mouseState){
            return true;
        }
        else{
            return false;
        }
    }
}

