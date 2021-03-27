var player,playerImg;
var opponent,opponentImg,opponentGroup;
var bullet,bulletImg,bulletGroup;
var coin,coinImg;
var backgroundImg,background1;
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart,restartImg;

function preload(){
  playerImg=loadImage("Images/p.png");
  opponentImg=loadImage("Images/E.png");
  bulletImg=loadImage("Images/b.png");
  backgroundImg=loadImage("Images/Background.jpg");
  restartImg=loadImage("Images/restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background1=createSprite(windowWidth/2, windowHeight/2, windowWidth, 50);
  background1.addImage(backgroundImg);
  background1.velocityY=1;

  player=createSprite(windowWidth/2,windowHeight-50,10,10);
  player.addImage(playerImg);
  player.scale=0.2;
  player.setCollider("rectangle",0,0,600,300);
  //player.debug = true;


  restart=createSprite(windowWidth/2,windowHeight/2,10,10);
  restart.addImage(restartImg);
  restart.scale=0.2;
  restart.visible=false;

  bulletGroup=new Group();
  opponentGroup=new Group();
  
}

function draw() {
  background(255,255,255); 

  if(background1.y>windowHeight){
    background1.y=windowHeight/2
    console.log(background1.y);
  }

  if(gameState===PLAY){
    
    if(keyDown(LEFT_ARROW)){
      player.x=player.x-10;
    }
    if(keyDown(RIGHT_ARROW)){
      player.x=player.x+10;
    }

    if(keyWentDown("space")){
      bulletCall();
    }
    opponentCall();

    background1.velocityY=1;    

    for(var i=0; i<opponentGroup.length; i++){
    if(bulletGroup.isTouching(opponentGroup)){
      opponentGroup.get(i).destroy();
      bulletGroup.destroyEach();
    }
    }
    for(var i=0; i<opponentGroup.length; i++){
    if(player.isTouching(opponentGroup)){
      opponentGroup.get(i).destroy();
      gameState=END;
    }
    }
  }
  if(gameState===END){
    opponent.velocityY=0;
    bulletGroup.velocityY=0;
    player.x=windowWidth/2;
    restart.visible=true;
    console.log("End");
    background1.velocityY=0;
    if(mousePressedOver(restart)){
    opponent.velocityY=5;
    bulletGroup.velocityY=-3;
    player.x=windowWidth/2;
    restart.visible=false;
    background1.velocityY=1;
    gameState=PLAY;
    }
    console.log(opponentGroup.y);
  }

  drawSprites();
}
function bulletCall(){

  bullet=createSprite(player.x,player.y,10,10);
  bullet.addImage(bulletImg);
  bullet.velocityY=-3;
  bullet.scale=0.1;
  bullet.depth=player.depth;
  player.depth+=1;
  bulletGroup.add(bullet);

  bullet.setCollider("rectangle",0,0,100,400);
  //bullet.debug = true;

}

function opponentCall(){

  if(frameCount%60===0){

    opponent=createSprite(Math.round(random(100,windowWidth-100)),0,10,10);
    opponent.addImage(opponentImg);
    opponent.velocityY=5;
    opponent.scale=0.7;
    opponentGroup.add(opponent);

    opponent.setCollider("rectangle",0,0,100,100);
    //opponent.debug = true;

  }

}