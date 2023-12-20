
class Obj {
    constructor(id){
        this.image = createGraphics(400, 400);
        this.w = 0.05;
        this.h = 0.05;
        this.x = 0.5;
        this.y = 0.5;
        this.ax = this.x;
        this.ay = this.y;
        this.id = id;
        this.vy = 0;
        this.vx = 0;

        this.properties = {
            gravity: 0,
            bounciness: 1,
            mass: 1,
            fixed: 0,
            collisionSides: 15
        }

        this.touching = 0;

        this.collisionSides = [1, 1, 1, 1];
    }

    show(){
        imageMode(CENTER);
        if(state == "editWorld"){
            image(this.image, this.x * width, this.y * height, this.w * width, this.h * height);
        }
        if(state == "play"){
            image(this.image, this.ax * width, this.ay * height, this.w * width, this.h * height);
        }
    }

    update(){
        if(this.properties.fixed){
            return;
        }

        this.vy += this.properties.gravity;
        this.ay += this.vy;
        this.ax += this.vx;
    }

    stop(){
        this.ax = this.x;
        this.ay = this.y;
        this.vy = 0;
        this.vx = 0;

        let colSideNum = this.properties.collisionSides;
        let sides = [
            colSideNum >= 8,
            (colSideNum % 8) >= 4,
            (colSideNum % 4) >= 2,
            (colSideNum % 2) == 1,
        ];

        this.collisionSides = sides;
    }
}
