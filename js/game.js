var canvas = document.querySelector("canvas");

var c = canvas.getContext("2d");
var centerX = canvas.width/2;
var centerY = canvas.height/2;

var keyUp = false;
var keyDown = false;
var keyLeft = false;
var keyRight = false;
var shooting = false;
var mousePosX = canvas.width/2;
var mousePosY = canvas.height/2;
var bullets = []

var navePosX = canvas.width/2;
var navePosY = canvas.height/2;
var speed = 3;

var enemy1 = new Enemy(300, 100, 0, 0);
var enemy2 = new Enemy(400, 400, 0);

draw();
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    updateNavePos();
    c.beginPath();
    c.rect(navePosX - 20, navePosY - 20, 40, 40);
    c.fillStyle = "black";
    c.fill();
    c.closePath(); 
    enemy1.draw();
    enemy2.draw();
    requestAnimationFrame(draw);
}

function updateNavePos(){
    if (keyUp){
        if ( navePosY >= 0)
            navePosY -= speed;
    } 
    if (keyDown){
        if ( navePosY <= canvas.height)
            navePosY += speed;
    }
    if (keyRight){
        if ( navePosX <= canvas.width)
            navePosX += speed;
    } 
    if (keyLeft){
        if ( navePosX >= 0)
            navePosX -= speed;
    }
    if (shooting) {
        var bullet = new Bullet(navePosX, navePosY, (mousePosX-navePosX)/10, (mousePosY-navePosY)/10)
        bullets.push(bullet)
    }
    for(var index in bullets) { 
        bullets[index].draw();
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

function mouseDownHandler(e) {
    shooting = true;
}

function mouseUpHandler(e) {
    shooting = false;
}

function keyDownHandler(e) {
    if(e.keyCode == 87 || e.keyCode == 38) {
        keyUp = true;
    }
    else if(e.keyCode == 68 || e.keyCode == 39) {
        keyRight = true;
    }
    else if(e.keyCode == 83 || e.keyCode == 40){
        keyDown = true;
    }
    else if(e.keyCode == 65 || e.keyCode == 37){
        keyLeft = true;
    }
    else if (e.keyCode == 32){
        shooting = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 87 || e.keyCode == 38) {
        keyUp = false;
    }
    else if(e.keyCode == 68 || e.keyCode == 39) {
        keyRight = false;
    }
    else if(e.keyCode == 83 || e.keyCode == 40){
        keyDown = false;
    }
    else if(e.keyCode == 65 || e.keyCode == 37){
        keyLeft = false;
    }
    else if (e.keyCode == 32){
        shooting = false;
    }
}

canvas.addEventListener('mousemove', function(evt) { 
    mousePosX = getMousePos(canvas, evt).x;
    mousePosY = getMousePos(canvas, evt).y;
}, false);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }


function Bullet(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.out = false;

    this.draw = function(){
        if (this.x > canvas.width || this.y > canvas.height || this.x < 0 || this.y < 0){
            this.out = true;
        }
        this.x += this.dx;
        this.y += this.dy;
        c.beginPath();
        c.arc(this.x, this.y, 8, 0, Math.PI * 2, false);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
    }

    
}

function Enemy(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.angle = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speed = 1;

    this.draw = function(){
        dx = (x-navePosX)
        dy = (y-navePosY)
        angle = Math.atan2(dy,dx) * 180 / Math.PI;
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        speedX = speed * Math.cos(angle);
        speedY = speed * Math.sin(angle);
        x += speedX;
        y += speedY;
        c.beginPath();
        c.arc(x, y, 20, 0, Math.PI * 2, false);
        c.fillStyle = "white";
        c.fill();
        c.closePath();
    }
}

setInterval(function() {
    for(var index in bullets) 
        if (bullets[index].out == true){
            delete bullets[index]
            bullets.splice(index, 1);
        }
            
    
}, 2000)