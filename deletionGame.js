
let deletionGameProperties = {
    upperCards: [],
    lowerCards: [],
    revealedUpperCards: [0, 0, 0, 0],
    revealedLowerCards: [0, 0, 0, 0],
    currentUpperCard: -1,
    currentLowerCard: -1
};

function deletionGame(){
    background("#2323ff");
    let p = deletionGameProperties;
    let colors = ["#ff0000", "#0000ff", "#ffff00", "#00ff00"];
    if(p.upperCards.length == 0){
        let colorsToPick = ["#ff0000", "#0000ff", "#ffff00", "#00ff00"];
        
        while(colorsToPick.length > 0){
            let choice = int(random(0, colorsToPick.length));
            p.upperCards.push(colorsToPick[choice]);
            colorsToPick.splice(choice, 1);
        }

        colorsToPick = ["#ff0000", "#0000ff", "#ffff00", "#00ff00"];
        
        while(colorsToPick.length > 0){
            let choice = int(random(0, colorsToPick.length));
            p.lowerCards.push(colorsToPick[choice]);
            colorsToPick.splice(choice, 1);
        }
    }

    button(
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        0.05, 0.05, 0.1, 0.1, () => {
            if(state == "deletionGameObject"){
                state = "objectEdit";
            }
            else{
                state = "buttonEdit";
            }
        }
    )

    for(let i = 0; i < 4; i++){
        button([[0]], 1 / 6 * (i + 1), 1 / 6, 1 / 12, 1 / 12, () => {
            if(mouseState == pmouseState || (p.currentLowerCard >= 0 && p.currentUpperCard >= 0)){
                return;
            }
            
            deletionGameProperties.currentUpperCard = i;
        });
        push();
        fill(
            p.revealedUpperCards[i] != 0 || i == p.currentUpperCard ?
            p.upperCards[i] : "gray"
            );
        rect(width / 6 * (i + 1), height / 6, width / 12, height / 12);
        pop();

        button([[0]], 1 / 6 * (i + 1), 1 - 1 / 6, 1 / 12, 1 / 12, () => {
            if(mouseState == pmouseState || (p.currentLowerCard >= 0 && p.currentUpperCard >= 0)){
                return;
            }
            deletionGameProperties.currentLowerCard = i;
        });

        push();
        fill(
            p.revealedLowerCards[i] != 0 || i == p.currentLowerCard ?
            p.lowerCards[i] : "gray"
            );
        rect(width / 6 * (i + 1), height - height / 6, width / 12, height / 12);
        pop();
    }

    if(p.currentLowerCard >= 0 && p.currentUpperCard >= 0){
        setTimeout(() => {
            if(
                p.upperCards[p.currentUpperCard]
                    ==
                p.lowerCards[p.currentLowerCard]
            ){
                p.revealedUpperCards[p.currentUpperCard] = 1;
                p.revealedLowerCards[p.currentLowerCard] = 1;
                p.currentUpperCard = -1;
                p.currentLowerCard = -1;
            } else{
                p.currentUpperCard = -1;
                p.currentLowerCard = -1;
            }
        }, 500);
    }

    let finished = true;
    for(let i of p.revealedUpperCards){
        if(i == 0){
            finished = false;
        }
    }

    if(finished){
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
            0.8, 0.05, 0.1, 0.1, () => {
                if(state == "deletionGameObject"){
                    objects[id - 1] = null;
                    objects.splice(id - 1, 1);
                }
                if(state == "deletionGameButton"){
                    buttons[id - 1] = null;
                    buttons.splice(id - 1, 1);
                }

                state = "editWorld";

                deletionGameProperties = {
                    upperCards: [],
                    lowerCards: [],
                    revealedUpperCards: [0, 0, 0, 0],
                    revealedLowerCards: [0, 0, 0, 0],
                    currentUpperCard: -1,
                    currentLowerCard: -1
                };
            }
        );
    }
}
