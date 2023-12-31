
let mouseState = false;
let pmouseState = false;
let state = "editWorld";
let id = null;
let objects = [];
let framecount = 0;

let ObjectEditScreenOptions = {
  r: 1,
  c: [1, 1, 1],
  fslp: 5,
  erase: false,
  propertyNumber: 0,
  animationImage: null
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  noScrollbar();
  ObjectEditScreenOptions.animationImage = createGraphics(400, 400);
}

function draw(){
  background("#2376ff");

  if(state == "editWorld"){
    /*state = "transition";
    setTimeout( () => {
        console.log("hi");
        objects.push(new Obj(objects.length + 1));
        state = "editBrain";
        id = objects.length;
      },
    200);*/
    WorldEditScreen();
  }

  if(state == "objectEdit"){
    objectEdit(objects[id - 1]);
  }

  if(state == "editProperties"){
    editProperties(objects[id - 1]);
  }

  if(state == "editBrain"){
    editBrain(objects[id - 1]);
  }

  if(state == "play"){
    play();
  }

  pmouseState = mouseState;
}

function button(image, x, y, w, h, handle){
  push();
  noStroke();
  translate(x * width, y * height);
  for(let y = 0; y < image.length; y++){
    for(let x = 0; x < image[y].length; x++){
      fill(["#000000", "#ff2343"][image[y][x]]);
      rect(w * (x / image[y].length) * width, h * (y / image.length) * height, w / image[y].length * width, h / image.length * height)
    }
  }
  pop();

  if(
    mouseState &&
    mouseX / width > x &&
    mouseX / width < x + w &&
    mouseY / height > y &&
    mouseY / height < y + h
  ){
    handle();
  }

  framecount += 1;
}

function noScrollbar() {
  var style = document.createElement('style');
  style.innerHTML = 'html, body { margin: 0; padding: 0; overflow: hidden; }';
  document.head.appendChild(style);
}

function mousePressed(){
  mouseState = true;

}

function mouseReleased(){
  mouseState = false;
}

function keyPressed(){
  if(state == "editBrain"){
    editBrainKeyPressed(keyCode);
  }
}
