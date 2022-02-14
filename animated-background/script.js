const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray;

const mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// craete particle
const Particle = class {
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
    ctx.fillStyle = '#bc5523';
    ctx.fill();
  }

  // check particle position, check mouse position, move the particle,
  // draw thie particle
  update() {
    // check if particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // check collision detection - mouse position / particle position
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }

      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }

      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  } // update
};

const init = () => {
  particleArray = [];

  const numberOfParticles = (canvas.height * canvas.width) / 9999;

  for (let i = 0; i < numberOfParticles; i += 1) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * (window.innerWidth - size * 2) + size * 2;
    const y = Math.random() * (window.innerHeight - size * 2) + size * 2;
    const directionX = Math.random() * 5 - 2.5;
    const directionY = Math.random() * 5 - 2.5;
    const color = '#bc5523';

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  } // for
};

// check if particles are close enough to draw line between them
const connect = () => {
  for (let i = 0; i < particleArray.length; i += 1) {
    for (let j = i; j < particleArray.length; j += 1) {
      const distance =
        (particleArray[i].x - particleArray[j].x) * (particleArray[i].x - particleArray[j].x) +
        (particleArray[i].y - particleArray[j].y) * (particleArray[i].y - particleArray[j].y);

      if (distance < (canvas.width / 5) * (canvas.height / 5)) {
        ctx.strokeStyle = 'rgba(140, 85, 31,1)';
        ctx.beginPath();
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    } // for
  } // for
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particleArray.forEach((particle) => {
    particle.update();
  });
  connect();
  requestAnimationFrame(animate);
};

init();
animate();
