
function play(){
    if(camera.object){
        camera.x = camera.object.ax - 0.5;
        camera.y = camera.object.ay - 0.5;
    }

    for(let i of objects){
        i.update();
        i.show();
    }

    for(let b = 0; b < objects.length; b++){
        let i = objects[b];

        

        for(let a = b; a < objects.length; a++){
            let j = objects[a];

            if(i === j){
                continue;
            }

            if(j.id == i.touching){
                j.idOfTouchedObject = i.id;
                i.idOfTouchedObject = j.id;
                if(
                    abs(i.ax - j.ax) < abs(i.w + j.w) / 2
                        &&
                    abs(i.ay - j.ay) < abs(i.h + j.h) / 2
                ){} else{
                    i.touching = 0;
                }

                continue;
            }

            if (
                abs(i.ax - j.ax) < abs(i.w + j.w) / 2
                &&
                abs(i.ay - j.ay) < abs(i.h + j.h) / 2
            )
            {
                i.idOfTouchedObject = j.id;
                j.idOfTouchedObject = i.id;
                let dx = abs(i.ax - j.ax) - abs(i.w + j.w) / 2;
                let dy = abs(i.ay - j.ay) - abs(i.h + j.h) / 2;
                if(dx / abs(i.vx + j.vx) > dy / abs(i.vy + j.vy)){
                    
                    if(i.ax < j.ax > 0){
                        j.sideDidCollide[2] = 1;
                        i.sideDidCollide[0] = 1;
                    }
                    else{
                        i.sideDidCollide[2] = 1;
                        j.sideDidCollide[0] = 1;
                    }

                    if(i.ax < j.ax > 0 && (j.collisionSides[2] == 0 || i.collisionSides[0] == 0)){
                        i.touching = j.id;
                        continue;
                    }

                    if(j.ax < i.ax < 0 && (j.collisionSides[0] == 0 || i.collisionSides[2] == 0)){
                        i.touching = j.id;
                        continue;
                    }

                    if(i.properties.fixed){
                        j.vx *= -j.properties.bounciness;

                        let combinedFriction = sqrt(i.properties.friction * j.properties.friction);
                        let P = j.vy * i.properties.mass;
                        P -= P * combinedFriction;
                        j.vy = P / j.properties.mass;

                        i.ax = i.px;
                        i.ay = i.py;
                        j.ax = j.px;
                        j.ay = j.py;

                        continue;
                    }
                    if(j.properties.fixed){
                        i.vx *= -i.properties.bounciness;

                        let combinedFriction = sqrt(i.properties.friction * j.properties.friction);
                        let P = i.vy * i.properties.mass;
                        P -= P * combinedFriction;
                        i.vy = P / i.properties.mass;

                        i.ax = i.px;
                        i.ay = i.py;
                        j.ax = j.px;
                        j.ay = j.py;

                        continue;
                    }

                    let m1 = i.properties.mass;
                    let m2 = j.properties.mass;
                    let v1i = i.vx;
                    let v2i = j.vx;
                    let v1f = ((m1-m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
                    let v2f = ((m2-m1) * v2i + 2 * m1 * v1i) / (m2 + m1);
                    i.vx = v1f * i.properties.bounciness;
                    j.vx = v2f * j.properties.bounciness;

                    {
                        let combinedFriction = sqrt(i.properties.friction * j.properties.friction);
                        let m1 = i.properties.mass;
                        let m2 = j.properties.mass;
                        let v1i = i.vy;
                        let v2i = j.vy;
                        let v1f = ((m1-m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
                        let v2f = ((m2-m1) * v2i + 2 * m1 * v1i) / (m2 + m1);
                        i.vy += (v1f - i.vy) * combinedFriction;
                        j.vy += (v2f - j.vy) * combinedFriction;
                    }

                    i.ax = i.px;
                    i.ay = i.py;
                    j.ax = j.px;
                    j.ay = j.py;
                }
                else {
                    if(i.ay < j.ay > 0){
                        j.sideDidCollide[3] = 1;
                        i.sideDidCollide[1] = 1;
                    }
                    else{
                        i.sideDidCollide[3] = 1;
                        j.sideDidCollide[1] = 1;
                    }

                    if(i.ay < j.ay > 0 && (j.collisionSides[3] == 0 || i.collisionSides[1] == 0)){
                        i.touching = j.id;
                        continue;
                    }

                    if(j.ay < i.ay < 0 && (j.collisionSides[1] == 0 || i.collisionSides[3] == 0)){
                        i.touching = j.id;
                        continue;
                    }

                    let overlapY = (abs(i.ay - j.ay) - abs(i.h + j.h) / 2);
                    overlapY *= 
                        (i.ay < j.ay) ? 1 : -1;

                    i.ay = i.py;
                    j.ay = j.py;

                    if(i.properties.fixed){
                        j.ay = j.py;
                        j.vy *= -j.properties.bounciness;

                        let combinedFriction = sqrt(i.properties.friction * j.properties.friction);
                        let P = j.vx * i.properties.mass;
                        P -= P * combinedFriction;
                        nv = P / j.properties.mass;
                        i.vx += (nv - i.vx) * combinedFriction;

                        i.ax = i.px;
                        i.ay = i.py;
                        j.ax = j.px;
                        j.ay = j.py;

                        continue;
                    }
                    if(j.properties.fixed){
                        i.ay = i.py;
                        i.vy *= -i.properties.bounciness;

                        let combinedFriction = sqrt(i.properties.friction * j.properties.friction);
                        let P = i.vx * i.properties.mass;
                        P -= P * combinedFriction;
                        i.vx = P / i.properties.mass;

                        i.ax = i.px;
                        i.ay = i.py;
                        j.ax = j.px;
                        j.ay = j.py;

                        continue;
                    }

                    let m1 = i.properties.mass;
                    let m2 = j.properties.mass;
                    let v1i = i.vy;
                    let v2i = j.vy;
                    let v1f = ((m1-m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
                    let v2f = ((m2-m1) * v2i + 2 * m1 * v1i) / (m2 + m1);
                    i.vy = v1f * i.properties.bounciness;
                    j.vy = v2f * j.properties.bounciness;

                    {
                        let combinedFriction = sqrt(i.properties.friction * j.properties.friction);
                        let m1 = i.properties.mass;
                        let m2 = j.properties.mass;
                        let v1i = i.vx;
                        let v2i = j.vx;
                        let v1f = ((m1-m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
                        let v2f = ((m2-m1) * v2i + 2 * m1 * v1i) / (m2 + m1);
                        i.vx += (v1f - i.vx) * combinedFriction;
                        j.vx += (v2f - j.vx) * combinedFriction;
                    }

                    i.ax = i.px;
                    i.ay = i.py;
                    j.ax = j.px;
                    j.ay = j.py;
                }
            }
        }

    }

    button([[1]]
        , 0.85, 0.05, 0.1, 0.1, () => {
        if(mouseState != pmouseState){
            for(let i of objects){
                i.stop();
            }
            setTimeout(() => {
                    camera.x = 0;
                    camera.y = 0;
                    state = "editWorld";
                }, 200
            )
        }
    });

    for(let i of buttons){
        i.show();
    }
}
