var brickGroup
var score=0
var gamestate="play"
function preload()
{
  brickimage=loadImage("images/brick.png")
  bgimg=loadImage("images/bgnew.jpg")
  marioimg=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png")
  coinimage=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png",)
  coinsound=loadSound("sounds/coinSound.mp3")
  turtleimg=loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")
  mushimg=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
}

function setup() 
{
  createCanvas(1000, 600);
  // creating background sprite
  bg=createSprite(500,300);
  bg.addImage(bgimg)
  bg.scale=0.4
  // creating mario sprite
  mario=createSprite(100,430);
  mario.addAnimation("running",marioimg)
  mario.scale=0.25
  //creating platform sprite
  ground=createSprite(100,525,300,10)
  ground.visible=false;
  // grouping sprites together
  brickGroup=new Group
  coinGroup=new Group
  obstacleGroup=new Group
}

function draw()
{
  background("lightblue")
  // drawing sprites
  drawSprites()
  if(gamestate=="play")
  {
       bg.velocityX=-5   
    if(bg.x<240){
        bg.x=500
    }
    //making mario jump
    if(keyDown("up")){
        mario.velocityY=-10
    }
    //to bring mario down
    mario.velocityY+=0.5
    // preventing mario from falling
    mario.collide(ground)
    //caliing functions to generate

    generateBrick()
    generateCoin()
    generateObstacles()
    //acessing every coin in the group
    for(i=0;i<coinGroup.length;i++)
    {
        var tem=coinGroup.get(i);
        if(mario.isTouching(tem))// checking whether our player sprite is touching or not
        {
          coinsound.play()
          score++
          tem.destroy()
        }
    }
    // displaying score
      fill("black")
      textSize(50)
      text(" score "+score,300,100)
    if(obstacleGroup.isTouching(mario))
    {
      gamestate="end"
    }
  }
  else
  {
    bg.velocity=0;
    mario.velocityX=0;
    mario.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    brickGroup.setLifetimeEach(-1);
    bg.scale=0.4;
  }
}
  function generateBrick()
  {
    if(frameCount%50==0)
    {
      brick=createSprite(1100,random(150,350),45,10)
      brick.velocityX=-5
      brick.lifetime=300
      brick.addImage(brickimage)
      brickGroup.add(brick);
      brick.scale=0.5
    }
    
  }
  function generateCoin()
  {
    if(frameCount%70==0)
    {
      coin=createSprite(1100,random(150,350),45,10)
      coin.velocityX=-5
      coin.lifetime=300
      coin.addAnimation("rotating",coinimage)
      coinGroup.add(coin);
      coin.scale=0.1
  }
 }
 function generateObstacles()
{
  if(frameCount%100==0)
  {
     obstacle=createSprite(1100,480,30,45);
     obstacle.velocityX=-5
     choice=Math.round(random(1,2));
     //choosing turle or mushroom randomly
    if(choice==1)
    {
        obstacle.addAnimation("moving",turtleimg)
      }
    else
    {
        obstacle.addAnimation("moving",mushimg)
      }
    obstacle.scale=0.2
    obstacle.lifetime=300
    obstacleGroup.add(obstacle)
    }
  }