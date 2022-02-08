const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const colours = ['#fff', 'rgba(255, 255, 255, .3)', 'rgba(173, 216, 230, .8)', 'rgba(211, 211, 211, .8)'];
const maxSize = 40;

const mouse = {
  x: null,
  y: null,
  range: 60,
};

const Paticle = class {
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

    if (
      mouse.x - this.x < mouse.range &&
      mouse.x - this.x > -mouse.range &&
      mouse.y - this.y < mouse.range &&
      mouse.y - this.y > -mouse.range
    ) {
      if (this.size < maxSize) {
        this.size += 3;
      }
    } else {
      this.size -= 0.1;
    }

    if (this.size < 0) this.size = 0;

    this.draw();
  }
};

const init = () => {
  particleArray = [];

  for (let i = 0; i < 1000; i += 1) {
    const size = 0;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);
    const directionX = Math.random() * 0.4 - 0.25;
    const directionY = Math.random() * 0.4 - 0.25;
    const color = colours[Math.floor(Math.random() * colours.length)];
    particleArray.push(new Paticle(x, y, directionX, directionY, size, color));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particleArray.forEach((particle) => {
    particle.update();
  });

  requestAnimationFrame(animate);
};

init();
animate();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 1000);
