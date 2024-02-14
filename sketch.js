
let mouseState = false;
let pmouseState = false;
let state = "introduction";
let id = null;
let objects = [];
let buttons = [];
let framecount = 0;
let keys = [];
let pkeys = keys;
let camera = {x:0, y:0, object: null, px:0, py:0};
let temporaryGraphicsObject;
let screen;

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
  temporaryGraphicsObject = createGraphics(512, 512);
  screen = createGraphics(width, height);
}

function draw(){
  screen.background("#2376ff");
  background("#2376ff");

  for(let i = 0; i < 256; i++){
    keys[i] = keyIsDown(i);
  }

  if(state == "introduction"){
    introduce();
  }

  if(state == "editWorld"){
    WorldEditScreen();
  }

  if(state == "objectEdit"){
    objectEdit(objects[id - 1]);
  }

  if(state == "buttonEdit"){
    buttonEdit(buttons[id - 1]);
  }

  if(state == "editProperties"){
    editProperties(objects[id - 1]);
  }

  if(state == "editBrain"){
    editBrain(objects[id - 1]);

    if(editBrainState != "main"){
      button(
        editBrainIcons.brainHome,
        0.88, 0.88, 0.1, 0.1, () => {
          if(mouseState != pmouseState){
            editBrainState = "main";
          }
        }
      );
    }
  }

  if(state == "deletionGameObject" || state == "deletionGameButton"){
    deletionGame();
  }

  if(state == "play"){
    play();
  }

  pmouseState = mouseState;
  pkeys = [];
  for(let i = 0; i < 256; i++){
    pkeys[i] = keys[i];
  }

  image(screen, 0, 0, width, height);
}

function button(img, x, y, w, h, handle, mx, my, ignore){
  if(!mx){
    mx = mouseX;
    my = mouseY;
  }
  temporaryGraphicsObject.clear();
  temporaryGraphicsObject.push();
  temporaryGraphicsObject.noStroke();
  for(let y = 0; y < img.length; y++){
    for(let x = 0; x < img[y].length; x++){
      temporaryGraphicsObject.fill(["#000000", "#ff2343"][img[y][x]]);
      temporaryGraphicsObject.rect((x / img[y].length) * 512, (y / img.length) * 512, 1 / img[y].length * 512, 1 / img.length * 512);
    }
  }
  temporaryGraphicsObject.pop();

  if(
    (mouseState || ignore) &&
    mx / width > x &&
    mx / width < x + w &&
    my / height > y &&
    my / height < y + h
  ){
    handle();
  }

  screen.push();
  screen.imageMode(CORNER);

  screen.image(
    temporaryGraphicsObject,
    x * width, y * height, w * width, h * height
  );

  screen.pop();

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
