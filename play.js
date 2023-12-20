
function play(){
    for(let b = 0; b < objects.length; b++){
        let i = objects[b];

        i.update();
        i.show();

        for(let a = b; a < objects.length; a++){
            let j = objects[a]

            if(i === j){
                continue;
            }

            if(j.id == i.touching){
                if(
                    abs(i.ax - j.ax) < abs(i.w + j.w) / 2
                        &&
                    abs(i.ay - j.ay) < abs(i.h + j.h) / 2
                ){} else{
                    i.touching = 0;
                }

                continue;
            }

            if(
                abs(i.ax - j.ax) < abs(i.w + j.w) / 2
                    &&
                abs(i.ay - j.ay) < abs(i.h + j.h) / 2
            ){
                let dx = abs(i.ax - j.ax) - abs(i.w + j.w) / 2;
                let dy = abs(i.ay - j.ay) - abs(i.h + j.h) / 2;
                if(dx / abs(i.vx + j.vx) > dy / abs(i.vy + j.vy)){
                    
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
                        continue;
                    }
                    if(j.properties.fixed){
                        i.vx *= -i.properties.bounciness;
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
                }
                else {
                    if(i.ay < j.ay && (j.collisionSides[3] == 0 || i.collisionSides[1] == 0)){
                        i.touching = j.id;
                        continue;
                    }

                    if(j.ay < i.ay && (j.collisionSides[1] == 0 || i.collisionSides[3] == 0)){
                        i.touching = j.id;
                        continue;
                    }

                    if(i.properties.fixed){
                        j.vy *= -j.properties.bounciness;
                        continue;
                    }
                    if(j.properties.fixed){
                        i.vy *= -i.properties.bounciness;
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
                    state = "editWorld";
                }, 200
            )
        }
    })
}
