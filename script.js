// canvas setup
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

// Mouse Interactivity
const canvasPosition = canvas.getBoundingClientRect();

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

const canvasActiveEvent = (e) => {
  const currentX = e.x ?? e.pageX;
  const currentY = e.y ?? e.pageY;
  mouse.click = true;
  mouse.x = currentX - canvasPosition.left;
  mouse.y = currentY - canvasPosition.top;
};

const canvasDeactiveEvent = () => {
  mouse.click = false;
};

canvas.addEventListener('mousedown', canvasActiveEvent);
canvas.addEventListener('touchend', canvasActiveEvent);
canvas.addEventListener('mouseup', canvasDeactiveEvent);
canvas.addEventListener('touchcancel', canvasDeactiveEvent);

// Playser
class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.prriteHeight = 327;
  }

  update() {
    const SPEED = 10;
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    if (mouse.x !== this.x) this.x -= dx / SPEED;
    if (mouse.y !== this.y) this.y -= dy / SPEED;
  } // update

  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  } // draw
}

const player = new Player();

// Bubbles
const bubblesArray = [];
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 * 1;
    this.distance;
  }

  update() {
    const dx = this.x - player.x;
    const dy = this.y - player.y;

    this.y -= this.speed;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  } // update

  draw() {
    ctx.fillStyle = '#e78a65';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

const bubbleLoop = (cb) => {
  for (let i = 0; i < bubblesArray.length; i += 1) {
    cb(bubblesArray[i], i);
  } // for
};

const handleBubbles = () => {
  const bubbleAnim = (bubble, idx) => {
    bubble.update();
    bubble.draw();
  };

  const bubblesArrOptimise = (bubble, idx) => {
    if (bubble.y < 0 - bubble.radius * 2) {
      bubblesArray.splice(idx, 1);
    }
  };

  const bubbleCollision = (bubble, idx) => {
    if (bubble.distance < bubble.radius + player.radius) {
      console.log('collision');
      bubblesArray.splice(idx, 1);
      score += 1;
    }
  };

  if (gameFrame % 50 === 0) {
    bubblesArray.push(new Bubble());
    console.log(bubblesArray.length);
  } // if

  bubbleLoop(bubbleAnim);
  bubbleLoop(bubblesArrOptimise);
  bubbleLoop(bubbleCollision);
};

// Amination Loop
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBubbles();

  player.update();
  player.draw();

  ctx.fillStyle = 'black';
  ctx.fillText(`score: ${score}`, 10, 50);

  gameFrame += 1;
  requestAnimationFrame(animate);
};

animate();
