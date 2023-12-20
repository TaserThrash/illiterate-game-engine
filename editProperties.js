
let animationProperties = {
    y: 0,
    vy: 0,
    x: 0,
    vx: 0,
    bx: 0,
    bvx: 0
};

function editProperties(obj){
    let propertyNames = ["gravity", "bounciness", "mass", "fixed", "collisionSides"];
    let properyDelta = [0.00001, 0.05, 0.125, 1, 0];

    let animation = [
        () => {
            animationProperties.vy += obj.properties.gravity;
            animationProperties.y += animationProperties.vy;
            if(animationProperties.y > 0.5){
                animationProperties.y = 0;
                animationProperties.vy = 0;
            }

            rect(width / 2, height * (0.3 + animationProperties.y), 10);
        },
        () => {
            push();
            rectMode(CENTER);
            animationProperties.vy += obj.properties.gravity;
            animationProperties.y += animationProperties.vy;
            if(animationProperties.y > 0.4 - 0.01){
                animationProperties.vy *= -obj.properties.bounciness;
                animationProperties.y = 0.4 - 0.01;
            }

            rect(width / 2, height * (0.3 + animationProperties.y), height / 100);
            rect(width * 0.5, height * 0.72, width * 0.4, height * 0.05);
            pop();
        },
        () => {
            push();
            rectMode(CENTER);
            ellipse(width * (animationProperties.bx + 0.3), height / 2, width * 0.01, height * 0.01);
            rect(width * (animationProperties.x + 0.3), height / 2, width * 0.05, height * 0.05)
            animationProperties.bx += animationProperties.bvx;
            animationProperties.x += animationProperties.vx;

            if(abs(animationProperties.x - animationProperties.bx) <= 0.0255){
                let m1 = obj.properties.mass;
                let m2 = 1;
                let v1i = animationProperties.vx;
                let v2i = animationProperties.bvx;
                let v1f = ((m1-m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
                let v2f = ((m2-m1) * v2i + 2 * m1 * v1i) / (m2 + m1);
                animationProperties.vx = v1f;
                animationProperties.bvx = v2f;
            }

            pop();
        },
        () => {
            obj.properties.fixed %= 2;

            push();
            rectMode(CENTER);
            ellipse(width * (animationProperties.bx + 0.3), height / 2, width * 0.01, height * 0.01);
            rect(width * (animationProperties.x + 0.3), height / 2, width * 0.05, height * 0.05)
            animationProperties.bx += animationProperties.bvx;
            animationProperties.x += animationProperties.vx;

            if(abs(animationProperties.x - animationProperties.bx) <= 0.0255){
                let m1 = obj.properties.mass;

                let m2 = 1;
                let v1i = animationProperties.vx;
                let v2i = animationProperties.bvx;
                let v1f = ((m1-m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
                let v2f = ((m2-m1) * v2i + 2 * m1 * v1i) / (m2 + m1);
                
                if(obj.properties.fixed != 0){
                    animationProperties.bvx *= -1;
                } else {
                    animationProperties.vx = v1f;
                    animationProperties.bvx = v2f;
                }

            }

            pop();
        },
        () => {
            let aP = animationProperties;

            let colSideNum = obj.properties.collisionSides;
            let sides = [
                colSideNum >= 8,
                (colSideNum % 8) >= 4,
                (colSideNum % 4) >= 2,
                (colSideNum % 2) == 1,
            ];

            button(
                [[sides[3] ? 1 : 0]],
                0.4,
                0.2,
                0.2,
                0.04,
                () => {
                    if(mouseState != pmouseState){
                        sides[3] = 1 - sides[3];
                    }
                }
            )

            button(
                [[sides[2] ? 1 : 0]],
                0.2,
                0.4,
                0.04,
                0.2,
                () => {
                    if(mouseState != pmouseState){
                        sides[2] = 1 - sides[2];
                    }
                }
            )

            button(
                [[sides[1] ? 1 : 0]],
                0.4,
                0.8 - 0.04,
                0.2,
                0.04,
                () => {
                    if(mouseState != pmouseState){
                        sides[1] = 1 - sides[1];
                    }
                }
            )

            button(
                [[sides[0] ? 1 : 0]],
                0.8 - 0.04,
                0.4,
                0.04,
                0.2,
                () => {
                    if(mouseState != pmouseState){
                        sides[0] = 1 - sides[0];
                    }
                }
            )

            push();
            rectMode(CENTER);
            rect(width / 2, height / 2, width * 0.2, height * 0.2);
            pop();

            aP.x1 += aP.vx1;
            aP.x2 += aP.vx2;
            aP.y1 += aP.vy1;
            aP.y2 += aP.vy2;

            push();
            rectMode(CENTER);
            rect(aP.x1 * width, height / 2, width * 0.01, height * 0.01);
            rect(aP.x2 * width, height / 2, width * 0.01, height * 0.01);
            rect(width / 2, aP.y1 * height, width * 0.01, height * 0.01);
            rect(width / 2, aP.y2 * height, width * 0.01, height * 0.01);
            pop();

            if(aP.x1 > 0.4 && sides[2]){
                aP.vx1 *= -1;
            }

            if(aP.x2 < 0.6 && sides[0]){
                aP.vx2 *= -1;
            }

            if(aP.y1 > 0.4 && sides[3]){
                aP.vy1 *= -1;
            }

            if(aP.y2 < 0.6 && sides[1]){
                aP.vy2 *= -1;
            }

            colSideNum = 0;
            colSideNum += 8 * sides[0];
            colSideNum += 4 * sides[1];
            colSideNum += 2 * sides[2];
            colSideNum += sides[3];
            
            obj.properties.collisionSides = colSideNum;
        }
    ]

    button(
        [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1]
        ],
        0.45, 0.05, 0.1, 0.1,
        () => {
            if(mouseState && !pmouseState){
                obj.properties[propertyNames[ObjectEditScreenOptions.propertyNumber]] += properyDelta[ObjectEditScreenOptions.propertyNumber];
            }
        }
    );

    button(
        [
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ],
        0.45, 0.85, 0.1, 0.1,
        () => {
            if(
                0 < obj.properties[propertyNames[ObjectEditScreenOptions.propertyNumber]]
                    &&
                mouseState && !pmouseState
                ){
                    obj.properties[propertyNames[ObjectEditScreenOptions.propertyNumber]] -= properyDelta[ObjectEditScreenOptions.propertyNumber];
            }
        }
    );

    button(
        [
            [0, 0, 0, 0, 1],
            [0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 1]
        ],
        0.05, 0.45, 0.1, 0.1,
        () => {
            if(mouseState != pmouseState){
                ObjectEditScreenOptions.propertyNumber--;
                if(ObjectEditScreenOptions.propertyNumber < 0){
                    ObjectEditScreenOptions.propertyNumber = propertyNames.length - 1;
                }

                reset();
            }
        }
    );

    button(
        [
            [1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0]
        ],
        0.85, 0.45, 0.1, 0.1,
        () => {
            if(mouseState != pmouseState){
                ObjectEditScreenOptions.propertyNumber++;
                if(ObjectEditScreenOptions.propertyNumber >= propertyNames.length){
                    ObjectEditScreenOptions.propertyNumber = 0;
                }

                reset();
            }
        }
    );

    button([
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ], 0.05, 0.05, 0.1, 0.1, () => {
        reset();
    });

    button(
        [
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0],
            [1, 1, 1, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 0, 1, 1],
            [0, 1, 1, 1, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
        ],
        0.85, 0.05, 0.1, 0.1,
        () => {
            setTimeout( () => {
                state = "editWorld";
            }, 500)
        }
    );

    animation[ObjectEditScreenOptions.propertyNumber]();
    push();
    imageMode(CENTER);
    image(ObjectEditScreenOptions.animationImage, width * 0.5, height * 0.5, width * 0.5, height * 0.5);
    pop();

    text(obj.properties[propertyNames[ObjectEditScreenOptions.propertyNumber]], 20, 20);
}

function reset(){
    animationProperties = [{
        y: 0,
        vy: 0,
        x: 0,
        vx: 0
    },
    {
        y: 0,
        vy: 0,
        x: 0,
        vx: 0
    },
    {
        y: 0,
        vy: 0,
        x: 0.2,
        vx: 0,
        bx: 0,
        bvx: 0.005
    },
    {
        y: 0,
        vy: 0,
        x: 0.2,
        vx: 0,
        bx: 0,
        bvx: 0.005
    },
    {
        x1: 0.2,
        x2: 0.8,
        y1: 0.2,
        y2: 0.8,
        vx1: 0.001,
        vx2: -0.001,
        vy1: 0.001,
        vy2: -0.001
    }
    ][ObjectEditScreenOptions.propertyNumber];
}
