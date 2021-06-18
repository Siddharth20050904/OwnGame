var player;
var road;
var distance;
var timeLeft;
var gameState = 0;
var startB;
function preload(){
  playerImg = loadImage("Bike.png");
  roadImg = loadImage("road.png");

  carImg1 = loadImage("Car2.png");
  carImg2 = loadImage("Car3.png");
  carImg3 = loadImage("Cars4.png");
  carImg4 = loadImage("Cars5.png");
  carImg5 = loadImage("Cars6.png");
  carImg6 = loadImage("Car7.png");
}

function setup(){
  createCanvas(600,800);

  edges = createEdgeSprites();

  road = createSprite(300,400,600, 800);
  road.addImage(roadImg);
  road.scale = 0.39;

  road2 = createSprite(300,-400,600, 800);
  road2.addImage(roadImg);
  road2.scale = 0.39

  player = createSprite(300,700, 30, 30);
  player.addImage(playerImg);
  player.scale = 0.2;
  player.setCollider("rectangle", 0, 0, 200,400);

  carGroup = new Group();

distance  = 100000;
timeLeft = 2400;

}

function draw(){
  background(250);
  if(gameState === 0){
    textSize(30);
    textAlign(CENTER);
    text("Deliver the food within 4 minutes", 300, 400);
    text("Click 'Space Bar' to start", 300, 450);
    if(keyWentDown(32)){
      gameState = 1;
    }
  }
  if(gameState===1){
    player.bounceOff(edges)
  road.velocityY -= 0.01;
  road2.velocityY -=  0.01 ; 
  if(keyDown(UP_ARROW) && road2.velocityY < 50 && road.velocityY < 50){
    road.velocityY += 0.2;
    road2.velocityY += 0.2;
  }
  else if(keyDown(DOWN_ARROW) && keyDown(UP_ARROW)){
    road.velocityY -= 0.2;
    road2.velocityY -= 0.2;
}

if(keyDown(LEFT_ARROW) && keyDown(UP_ARROW)){
  player.x -=5; 
}else if(keyDown(RIGHT_ARROW)){
  player.x +=5;
}

if(road.y >= 1200){
  road.y = -400;
}
if(road2.y >= 1200){
  road2.y = -400;
}
if(carGroup.isTouching(player)){
  road2.velocityY = 0.01;
  road.velocityY = 0.01;
}
timeLeft = timeLeft - Math.round(getFrameRate()/60);
distance = distance - Math.round(road2.velocityY);
console.log("distance = " + distance);
  drawSprites();
  spawnObs();
  textSize(20);
  textAlign(CENTER);
  fill(0)
  text("Time Left = "+timeLeft+ "sec", 125, 40);
  text("Distance = "+distance, 475,40);
  if(distance <= 0){
    gameState = 2;
  }
  if(timeLeft <= 0){
    gameState = 3;
  }
}
if(gameState === 2){
  clear();
  textSize(20);
  textAlign(CENTER);
  fill("black");
  text("You Have Delivered The Food In Time !!", 300, 400);
}
if(gameState === 3){
  clear();
  textSize(30);
  textAlign(CENTER);
  fill("black");
  text("Time Over !!", 300, 400);
}
}
function spawnObs(){
  if(frameCount%60===0){
    var cars = createSprite(random(100,500), 0, 10,10);
    carGroup.add(cars);
    cars.velocityY = road.velocityY;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1 : cars.addImage(carImg1);
      break;
      case 2 : cars.addImage(carImg2);
      break; 
      case 3 : cars.addImage(carImg3);
      break;
      case 4 : cars.addImage(carImg4);
      break; 
      case 5 : cars.addImage(carImg5);
      break;
      case 6 : cars.addImage(carImg6);
      break; 
    }
  }
}