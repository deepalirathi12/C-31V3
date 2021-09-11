const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, rope, fruit, fruit_con,rabbit
var bgImg, fruitImg, rabbitImg

function preload(){
  bgImg = loadImage("background.png")
  fruitImg = loadImage("melon.png")
  rabbitImg = loadImage("Rabbit-01.png")
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat= loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")

 
  eat.looping = false;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(250,620,500,20)
  rope= new Rope(7,{x:255,y:30})

  var f_options={
    density: 0.0001
  }

  fruit=Bodies.circle(300,300,30,f_options)
  World.add(world,fruit)
 
  //Matter.Composite.add(rope.body,fruit)

  fruit_con = new Link(rope,fruit)
  blink.frameDelay = 10;
  sad.frameDelay=20;
  eat.frameDelay=20
  rabbit = createSprite(270,570,20,50)
  rabbit.addImage(rabbitImg)
  rabbit.scale = 0.15

  rabbit.addAnimation("blink",blink)
  rabbit.addAnimation("eat",eat)
  rabbit.addAnimation("sad",sad)
  rabbit.changeAnimation("blink")

  cutbut = createImg("cut_btn.png")
  cutbut.position(240,25)
  cutbut.size(40,40)
  cutbut.mouseClicked(drop)


 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(bgImg);
  Engine.update(engine);
  ground.display()
  rope.show()

  if(fruit!=null){
    image(fruitImg,fruit.position.x,fruit.position.y,70,70);
  }
  //ellipse(fruit.position.x,fruit.position.y,30,30)
  //image(fruitImg,fruit.position.x,fruit.position.y,60,60)
  if(collide(fruit,rabbit)===true){
    rabbit.changeAnimation("eat",eat)
  }
  
  if(collide(fruit,ground.body)===true )
  {
     rabbit.changeAnimation('sad',sad);
   }

  
  drawSprites()
}

function drop(){
  rope.break();
  fruit_con.detach()
  fruit_con=null
} 

function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)

    if(d<80){
      World.remove(world,body)
      fruit=null;
      return true
    }
    else{
      return false
    }
  }
}
