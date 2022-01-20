// canvas setup
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

// mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener('mousedown', (e) => {
  mouse.click = true;
  mouse.x = e.x - canvasPosition.x;
  mouse.y = e.y - canvasPosition.y;
});

canvas.addEventListener('mouseup', () => {
  mouse.click = false;
});

// player
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
    this.spriteHeight = 327;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    if (mouse.x !== this.x) this.x -= dx / 30;

    if (mouse.y !== this.y) this.y -= dy / 30;
  }

  draw() {
    if (mouse.click) {
      ctx.linewidth = 0.2;
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
  }
}
const player = new Player();
// bubbles

// animation loop
const animate = () => {
  player.update();
  player.draw();

  requestAnimationFrame(animate);
};

animate();
