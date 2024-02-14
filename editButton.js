
function buttonEdit(obj){
    screen.imageMode(CORNER);
    screen.fill("gray");
    obj.image.noStroke();
    screen.rect(0, 0, width * 0.4, height * 0.4);
    screen.image(obj.image, 0, 0, width * 0.4, height * 0.4);

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
        obj.image.push();
        obj.image.rectMode(CORNER);
        if(ObjectEditScreenOptions.erase){
            obj.image.erase();
            obj.image.noStroke();
            obj.image.fill("red");
            obj.image.rect(
                int(mouseX * 1 / (width / 16 * 0.4)), int(mouseY * 1 / (height / 16 * 0.4)), 1, 1
            );
            obj.image.noErase();
        }
        else{
            obj.image.noStroke();
            obj.image.fill(c);
            obj.image.rect(
                int(mouseX * 1 / (width / 16 * 0.4)), int(mouseY * 1 / (height / 16 * 0.4)), 1, 1
            );
        }
    }

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
            if(mouseState != pmouseState){
                ObjectEditScreenOptions.c[0] = !ObjectEditScreenOptions.c[0];
            }

            ObjectEditScreenOptions.fslp = 0;
        }
    );

    screen.push();
    screen.fill("red");
    screen.rect(width * 0.5, height * 0.85, width * 0.1, height * 0.1);
    screen.fill(ObjectEditScreenOptions.c[0] * 255);
    screen.rect(width * 0.5, height * 0.8, width * 0.1, height * 0.04);
    screen.pop();

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

    screen.push();
    screen.fill("yellow");
    screen.rect(width * 0.65, height * 0.85, width * 0.1, height * 0.1);
    screen.fill(ObjectEditScreenOptions.c[1] * 255);
    screen.rect(width * 0.65, height * 0.8, width * 0.1, height * 0.04);
    screen.pop();

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

    screen.push();
    screen.fill("blue");
    screen.rect(width * 0.8, height * 0.85, width * 0.1, height * 0.1);
    screen.fill(ObjectEditScreenOptions.c[2] * 255);
    screen.rect(width * 0.8, height * 0.8, width * 0.1, height * 0.04);
    screen.pop();

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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
        0.1, 0.8, 0.15, 0.15, () => {
            state = "deletionGameButton";
        }
    )

    ObjectEditScreenOptions.fslp += 1;
}