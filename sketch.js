var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, bananaGroup;
var score



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

 }


function setup() {
  createCanvas(600,400);
 
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
console.log(ground.x);  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   //generate random numbers
  var rand =  Math.round(random(1,100))


  
  // create banana and obstacles group
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
   score=0;

}


function draw() {
  
  //Food
    Food();
//Obstacles  
  Obstacle();
  background(225);
  
   var survivalTime=0;

stroke("white");
textSize(20);
fill("white");
text("Score: "+ score, 500,50);

stroke("black");
textSize(20);
fill("black");
survivalTime= Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 100,50);

 //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    }

  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space") ){
    monkey.velocityY=-12;
  }
  // add gravity
  monkey.velocityY=monkey.velocityY + 0.8;
  
  
     monkey.collide(ground);
  
 
 
 drawSprites();

  
}
 // Function of the food
function Food(){
if(frameCount % 80===0){
  var banana=createSprite(600,180,40,10);
  banana.y=Math.round(random(110,200));
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-3;
  
  //assign lifetime to the variables
  banana.lifetime=200;
  
  banana.depth=monkey.depth
  monkey.depth=monkey.depth+1;
  
  //add each banana to the group
  bananaGroup.add(banana);
  
  } 
  
  }


  function Obstacle(){
    if(frameCount% 60===0){
      var obstacle = createSprite(600,310,10,40);
      obstacle.velocityX=-(6+ score/100);
      var rand =Math. round (random(1,4));
      switch(rand){
        case 1: obstacle . addImage(obstacleImage);
          break;
          default : break;
      }
      
      //assign scale and lifetime to the obstacle
      obstacle.scale=0.2;
      obstacle.lifetime=300;
      
      //add each obstacle to the group
      obstacleGroup.add(obstacle);
    }
  }
  


  
  