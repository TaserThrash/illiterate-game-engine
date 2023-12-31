
const ERASE = "destination-out";

function objectEdit(obj){
    imageMode(CORNER);
    fill("gray");
    obj.image.noStroke();
    rect(0, 0, width * 0.4, height * 0.4);
    image(obj.image, 0, 0, width * 0.4, height * 0.4);

    if(mouseState){
        let c = "#ffffff";
        let n = (
            ObjectEditScreenOptions.c[0] +
            ObjectEditScreenOptions.c[1] * 2 +
            ObjectEditScreenOptions.c[2] * 4
        )
        c = [
            "#000000", // 0: No color
            "#ff0000", // 1: Red
            "#ffcc00", // 2: Yellow
            "#ff9900", // 3: Orange (Red + Yellow)
            "#0000ff", // 4: Blue
            "#9900cc", // 5: Purple (Red + Blue)
            "#33cc33", // 6: Green (Yellow + Blue)
            "#ffffff", // 7: White (Red + Yellow + Blue)
        ][n];
        if(ObjectEditScreenOptions.erase){
            console.log(obj.image);
            obj.image.erase();
            obj.image.ellipse(
                mouseX * 1 / (width / 400 * 0.4), mouseY * 1 / (height / 400 * 0.4), ObjectEditScreenOptions.r
            );
            obj.image.noErase();
        }
        else{
            obj.image.fill(c);
            obj.image.ellipse(
                mouseX * 1 / (width / 100 * 0.4), mouseY * 1 / (height / 100 * 0.4), ObjectEditScreenOptions.r
            );
        }
    }

    button(
        [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1]
        ],
        0.5,
        0.05,
        0.1,
        0.1,
        () => {
            if(ObjectEditScreenOptions.fslp > 5){
                ObjectEditScreenOptions.r += 1;
            }

            ObjectEditScreenOptions.fslp = 0;
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
        0.5,
        0.20,
        0.1,
        0.1,
        () => {
            if(ObjectEditScreenOptions.fslp > 5){
                ObjectEditScreenOptions.r -= 1;
            }

            ObjectEditScreenOptions.fslp = 0;
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
        0.5,
        0.85,
        0.1,
        0.1,
        () => {
            if(ObjectEditScreenOptions.fslp > 5){
                ObjectEditScreenOptions.c[0] = !ObjectEditScreenOptions.c[0];
            }

            ObjectEditScreenOptions.fslp = 0;
        }
    );

    push();
    fill("red");
    rect(width * 0.5, height * 0.85, width * 0.1, height * 0.1);
    fill(ObjectEditScreenOptions.c[0] * 255);
    rect(width * 0.5, height * 0.8, width * 0.1, height * 0.04);
    pop();

    button(
        [
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ],
        0.65,
        0.85,
        0.1,
        0.1,
        () => {
            if(mouseState != pmouseState){
                ObjectEditScreenOptions.c[1] = !ObjectEditScreenOptions.c[1];
            }

            ObjectEditScreenOptions.fslp = 0;
        }
    );

    push();
    fill("yellow");
    rect(width * 0.65, height * 0.85, width * 0.1, height * 0.1);
    fill(ObjectEditScreenOptions.c[1] * 255);
    rect(width * 0.65, height * 0.8, width * 0.1, height * 0.04);
    pop();

    button(
        [
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ],
        0.80,
        0.85,
        0.1,
        0.1,
        () => {
            if(mouseState != pmouseState){
                ObjectEditScreenOptions.c[2] = !ObjectEditScreenOptions.c[2];
            }

            ObjectEditScreenOptions.fslp = 0;
        }
    );

    push();
    fill("blue");
    rect(width * 0.8, height * 0.85, width * 0.1, height * 0.1);
    fill(ObjectEditScreenOptions.c[2] * 255);
    rect(width * 0.8, height * 0.8, width * 0.1, height * 0.04);
    pop();

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

    button(
        [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0]
        ],
        0.3,
        0.85,
        0.1,
        0.1,
        () => {
            if(ObjectEditScreenOptions.fslp > 5){
                ObjectEditScreenOptions.erase = !ObjectEditScreenOptions.erase;
            }

            ObjectEditScreenOptions.fslp = 0;
        }
    );

    button(
        [
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [0, 0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
        ],
        0.85, 0.25, 0.1, 0.1,
        () => {
            setTimeout( () => {
                state = "editProperties";
            }, 500)
        }
    );

    button(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        0.85, 0.45, 0.1, 0.1,
        () => {
            setTimeout( () => {
                state = "editBrain";
            }, 500)
        }
    );

    ObjectEditScreenOptions.fslp += 1;
}
