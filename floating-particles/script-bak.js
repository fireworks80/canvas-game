const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray;

// create constructor function
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particleArray = [];

  for (let i = 0; i < 100; i += 1) {
    let size = Math.random() * 20;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = Math.random() * 1 - 0.6;
    let directionY = Math.random() * 1.4 - 0.2;
    let color = 'white';

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  } // for
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i += 1) {
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// const particle1 = new Particle(10, 10, 1, 1, 20, 'white');
// particle1.draw();
