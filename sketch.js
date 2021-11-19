
var score=0;
var gameState="play"
var gameover1
function preload(){
  
run1=loadImage("run1.gif");
run2=loadImage("run2.gif");
run3=loadImage("run3.gif");
run4=loadImage("run4.gif");
gengarImg=loadImage("Gengar.webp");
haunterImg=loadImage("Haunter.webp");
onixImg=loadImage("Onix.webp")
bgImg=loadImage("bgimg.png")
gameover=loadImage("gameover.jpg")

}

function setup() {
  createCanvas(1000,600);
  backgrnd=createSprite(0,300,1000,600);
  backgrnd.x=width/2
  backgrnd.addImage(bgImg)
  o=createSprite(10,520,800,800)
  o.addImage("oggy",run1)
  o.scale=0.4;
  o.debug=true
  ground=createSprite(000,580,1600,20);
  ground.visible=false
  gameover1=createSprite(500,150)
  gameover1.addImage(gameover)
  gameover1.visible=false 
  gameover1.scale=0.5
  gengargrp=createGroup();
  hauntergrp=createGroup();
  onixgrp=createGroup();
  
  enemyGroup=createGroup();
  

  //rectMode(CENTER);


}

function draw() {
  background(0);
  
  o.setCollider("rectangle",0,0,350,200)
  o.collide(ground);
 if(gameState==="play"){
 
  backgrnd.velocityX = -2;
  
  if (backgrnd.x < 0) {
    backgrnd.x = backgrnd.width/2;
  }
  
  if (keyDown("space")) {
    o.velocityY=-10;
  }
  o.velocityY+=1
  
  score=score+Math.round(getFrameRate()/60);
 
 if(score>0 && score%1000===0){
   var rand=Math.round(random(0,4));
   switch(rand){
    case 0: o.addImage("oggy",run1);
    o.scale=0.4;
    break;
    case 1: o.addImage("friend1",run2);
    o.scale=0.4;
     break;
     case 2:o.addImage("friend2",run3);
     o.scale=0.4;
     break;
     case 3:o.addImage("friend3",run4);
     o.scale=0.4;
     break;
     default:break;
   }
 }
  
  
  
  var select_enemy = Math.round(random(0,2));
  
  if (World.frameCount % 80 == 0) {
    if (select_enemy == 0) {
      createGengar();
    } else if (select_enemy == 1) {
      createHaunter();
    } else if (select_enemy == 2) {
      createOnix();
    } 
    
  }

  if(o.isTouching(enemyGroup)){
    
    gameState="end"
  }

 }

  if(gameState==="end"){
  
   enemyGroup.setLifetimeEach(-1);
   enemyGroup.setVelocityXEach(0);
   backgrnd.velocityX=0;
   o.velocityY=0;
   gameover1. visible=true
   
 }

  

  
  drawSprites();
  textSize(20);
  fill("green")
  text("SCORE: "+ score, 10, 30);
}


function createGengar() {
  var posy=Math.round(random(400,520))
  var enemy1 = createSprite(1000,posy);
  enemy1.addImage(gengarImg);
  enemy1.scale=0.1;
  enemy1.velocityX=-5;
  gengargrp.add(enemy1);
  enemyGroup.add(enemy1)
}

function createHaunter() {
  var posy=Math.round(random(400,520))
  var enemy2 = createSprite(1000,posy);
  enemy2.scale=0.1;
  enemy2.velocityX=-5
  enemy2.addImage(haunterImg)
  hauntergrp.add(enemy2);
  enemyGroup.add(enemy2)
}

function createOnix() {
  var posy=Math.round(random(400,520))
  var enemy3 = createSprite(1000,posy);
  enemy3.velocityX=-5
  enemy3.scale=0.3
  enemy3.addImage(onixImg)
  onixgrp.add(enemy3);
  enemyGroup.add(enemy3);
}




  
  
