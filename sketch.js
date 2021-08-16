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
var ground;

function preload(){
  bg_img = loadImage('images/background.png');
  food = loadImage('images/melon.png');
  rabbit = loadImage('images/Rabbit-01.png');
  blink =loadAnimation("images/blink_1.png","images/blink_2.png","images/blink_3.png")
  eat = loadAnimation("images/eat_0.png","images/eat_1.png","images/eat_2.png","images/eat_3.png","images/eat_4.png");
  sad = loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png");
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
  backgroundsound=loadSound('images/sound1.mp3')
  sadsound=loadSound('images/sad.wav')
  eatingsound=loadSound('images/eating_sound.mp3')
  ropesound=loadSound('images/rope_cut.mp3')
  airsound=loadSound('images/air.wav')
  
  
}

function setup() 
{
  createCanvas(500,600);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  backgroundsound.play()
  backgroundsound.setVolume(0.5)
  rope = new Rope(5,{x:220,y:30});
  ground = new Ground(200,590,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  bunny=createSprite(300,520)
  bunny.addAnimation('blinking',blink)
  bunny.addAnimation('eating',eat)
  bunny.addAnimation('crying',sad)
  
  bunny.scale=0.2

  button=createImg('images/cut_btn.png')
  button.position(200,30)
  button.size(50,50)
  button.mouseClicked(drop)

  mutebtn=createImg('images/mute.png')
  mutebtn.position(450,20)
  mutebtn.size(50,50)
  mutebtn.mouseClicked(mute)

  blower=createImg('images/balloon.png')
  blower.position(10,180)
  blower.size(150,100)
  blower.mouseClicked(airblow)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(bg_img);
  ground.show();
  rope.show()
  Engine.update(engine);
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
if(collide(fruit,bunny)){
  bunny.changeAnimation('eating',eat)
  eatingsound.play()
}

if(fruit!=null && fruit.position.y>=550){
   bunny.changeAnimation('crying',sad);
   sadsound.play()
 }
 drawSprites()
   
}

function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con= null
}

function airblow(){
  Matter.Body.applyForce(fruit,fruit.position,{x:0.01,y:0})
  airsound.play()
}

function mute(){
  if(backgroundsound.isPlaying()){
    backgroundsound.stop()
  }else {
    backgroundsound.play()
  }
}
function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true; 
    } else {
      return false; 
    }
  }
}